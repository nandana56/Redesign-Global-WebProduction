import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const About3DNodes = ({ count = 100 }) => {
  const meshRef = useRef();
  const lineRef = useRef();
  const { size, viewport } = useThree();

  // Create random points for the nodes
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      p.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10
        ),
        speed: Math.random() * 0.01 + 0.005,
      });
    }
    return p;
  }, [count]);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    points.forEach((p, i) => {
      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;
    });
    return positions;
  }, [points, count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { mouse } = state;

    // Slowly move particles and react to mouse
    if (meshRef.current) {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.2, 0.05);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouse.y * 0.2, 0.05);
    }
  });

  return (
    <group>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#4bb5f8"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
      
      {/* Subtle glowing mesh behind */}
      <mesh scale={[15, 15, 1]} position={[0, 0, -2]}>
        <planeGeometry />
        <meshBasicMaterial color="#000821" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

export default About3DNodes;
