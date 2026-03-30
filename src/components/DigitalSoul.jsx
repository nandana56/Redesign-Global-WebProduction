import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import WebGLDisposer from './WebGLDisposer';

const DataFace = ({ mouse }) => {
  const group = useRef();
  const points = useMemo(() => {
    const p = [];
    const count = 4000;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      let x = Math.cos(theta) * Math.sin(phi);
      let y = Math.sin(theta) * Math.sin(phi);
      let z = Math.cos(phi);
      x *= 2.2; y *= 3.5; z *= 2.0;
      if (x > 0) z *= 1.4;
      p.push(x, y, z);
    }
    return new Float32Array(p);
  }, []);

  useFrame(() => {
    // Smoothly tilt the head toward the mouse
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.current.x * 0.25, 0.1);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -mouse.current.y * 0.15, 0.1);
  });

  return (
    <group ref={group}>
      <Points positions={points} stride={3}>
        <PointMaterial
          transparent
          color="#22d3ee"
          size={0.03}
          sizeAttenuation={true}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const HairLine = ({ index, mouse }) => {
  const mesh = useRef();
  const points = useMemo(() => {
    const p = [];
    const segments = 60;
    const yBase = (index - 30) * 0.15;
    for (let i = 0; i < segments; i++) {
      const x = -i * 0.35 + 1.2;
      const wave = Math.sin(i * 0.2 + index) * 0.4;
      p.push(new THREE.Vector3(x, yBase + wave, Math.sin(index * 0.5) * 1.5));
    }
    return new THREE.BufferGeometry().setFromPoints(p);
  }, [index]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor: { value: new THREE.Color("#22d3ee") }
  }), []);

  useFrame((state) => {
    // Calculate distance for speed boost
    const dist = mouse.current.distanceTo(new THREE.Vector2(0, 0));
    const speedMultiplier = 1.0 + (1.0 - dist) * 2.0;

    uniforms.uTime.value += state.clock.getDelta() * speedMultiplier;
    uniforms.uMouse.value.lerp(mouse.current, 0.1);
  });

  return (
    <line geometry={points}>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          varying float vX;
          varying float vDist;
          uniform vec2 uMouse;
          void main() {
            vX = position.x;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vDist = distance(uMouse, mvPosition.xy * 0.1);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying float vX;
          varying float vDist;
          uniform float uTime;
          uniform vec3 uColor;
          void main() {
            // Pulse accelerates and brightens near mouse
            float pulse = step(0.9, fract(vX * 0.3 - uTime * 2.5));
            float interactionGlow = smoothstep(1.2, 0.0, vDist);
            float alpha = mix(0.05, 1.0, pulse + (interactionGlow * 0.5));
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </line>
  );
};

export default function DigitalSoul() {
  const mouse = useRef(new THREE.Vector2(0, 0));

  return (
    <div className="w-full h-full transparent pointer-events-auto">
      
<Canvas
        camera={{ position: [0, 0, 15], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        }}
      >
        <WebGLDisposer />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
          <group position={[1, 0, 0]}>
            <DataFace mouse={mouse} />
            {Array.from({ length: 70 }).map((_, i) => (
              <HairLine key={i} index={i} mouse={mouse} />
            ))}
          </group>
        </Float>

        <EffectComposer>
          <Bloom intensity={1.5} luminanceThreshold={0.1} mipmapBlur />
        </EffectComposer>
      </Canvas>

    </div>
  );
}