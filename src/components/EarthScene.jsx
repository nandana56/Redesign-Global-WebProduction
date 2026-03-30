import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

// --- FRESNEL SHADER ---
const FresnelMaterial = () => {
  const uniforms = useMemo(() => ({
    color1: { value: new THREE.Color(0x0088ff) },
    color2: { value: new THREE.Color(0x000000) },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 4.0 },
  }), []);

  const vs = `
    varying float vReflectionFactor;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
      vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
      vec3 I = worldPosition.xyz - cameraPosition;
      vReflectionFactor = 0.1 + 1.0 * pow( 1.0 + dot( normalize( I ), worldNormal ), 4.0 );
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fs = `
    uniform vec3 color1;
    uniform vec3 color2;
    varying float vReflectionFactor;
    void main() {
      float f = clamp( vReflectionFactor, 0.0, 1.0 );
      gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
    }
  `;

  return <shaderMaterial uniforms={uniforms} vertexShader={vs} fragmentShader={fs} transparent blending={THREE.AdditiveBlending} />;
};

// --- STARFIELD COMPONENT ---
export const Starfield = ({ numStars = 2000 }) => {
  const starsRef = useRef();
  
  const [verts, colors] = useMemo(() => {
    const verts = [];
    const colors = [];
    for (let i = 0; i < numStars; i++) {
      const radius = Math.random() * 25 + 25;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      verts.push(radius * Math.sin(phi) * Math.cos(theta));
      verts.push(radius * Math.sin(phi) * Math.sin(theta));
      verts.push(radius * Math.cos(phi));
      
      const col = new THREE.Color().setHSL(0.6, 0.2, Math.random());
      colors.push(col.r, col.g, col.b);
    }
    return [new Float32Array(verts), new Float32Array(colors)];
  }, [numStars]);

  const starTexture = useLoader(THREE.TextureLoader, "/textures/stars/circle.png");

  useFrame(() => {
    // Exact rotation from your index.js: stars.rotation.y -= 0.0002
    starsRef.current.rotation.y -= 0.0002;
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={verts.length / 3} array={verts} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.2} vertexColors map={starTexture} transparent />
    </points>
  );
};

// --- MAIN EARTH COMPONENT ---
export const Earth = ({ scale = 1, speed = 1 }) => {
  const groupRef = useRef();
  const earthRef = useRef();
  const lightsRef = useRef();
  const cloudsRef = useRef();
  const glowRef = useRef();

  const [day, bump, spec, lights, clouds, cloudsTrans] = useLoader(THREE.TextureLoader, [
    "/textures/00_earthmap1k.jpg",
    "/textures/01_earthbump1k.jpg",
    "/textures/02_earthspec1k.jpg",
    "/textures/03_earthlights1k.jpg",
    "/textures/04_earthcloudmap.jpg",
    "/textures/05_earthcloudmaptrans.jpg",
  ]);

  useFrame((state) => {
    // Continuous rotation
    earthRef.current.rotation.y += 0.002 * speed;
    lightsRef.current.rotation.y += 0.002 * speed;
    glowRef.current.rotation.y += 0.002 * speed;
    cloudsRef.current.rotation.y += 0.0023 * speed;

    // Mouse movement response
    const mouseX = state.mouse.x * 0.5;
    const mouseY = -state.mouse.y * 0.5;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseX + ( -23.4 * Math.PI / 180 ), // Base tilt + mouse
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseY,
      0.05
    );
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Earth Body */}
      <mesh ref={earthRef}>
        <icosahedronGeometry args={[1, 12]} />
        <meshPhongMaterial map={day} bumpMap={bump} bumpScale={0.04} specularMap={spec} />
      </mesh>

      {/* City Lights */}
      <mesh ref={lightsRef}>
        <icosahedronGeometry args={[1, 12]} />
        <meshBasicMaterial map={lights} blending={THREE.AdditiveBlending} transparent />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudsRef} scale={1.003}>
        <icosahedronGeometry args={[1, 12]} />
        <meshStandardMaterial 
          map={clouds} 
          alphaMap={cloudsTrans} 
          transparent 
          opacity={0.8} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>

      {/* Atmospheric Glow */}
      <mesh ref={glowRef} scale={1.01}>
        <icosahedronGeometry args={[1, 12]} />
        <FresnelMaterial />
      </mesh>
    </group>
  );
};

export function EarthScene({ showStars = true, earthScale = 1, earthSpeed = 1 }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[-2, 0.5, 1.5]} intensity={2.0} />
      
      {showStars && <Starfield numStars={2000} />}
      <Earth scale={earthScale} speed={earthSpeed} />
    </>
  );
}

export default EarthScene;