import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const About3DTechnicalMesh = () => {
    const meshRef = useRef();
    const pointsRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = time * 0.1;
            meshRef.current.rotation.z = time * 0.05;
        }
        if (pointsRef.current) {
            pointsRef.current.rotation.y = -time * 0.05;
        }
    });

    const particles = useMemo(() => {
        const temp = new Float32Array(500 * 3);
        for (let i = 0; i < 500; i++) {
            temp[i * 3] = (Math.random() - 0.5) * 10;
            temp[i * 3 + 1] = (Math.random() - 0.5) * 10;
            temp[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return temp;
    }, []);

    return (
        <group scale={1.5}>
            {/* Core Mesh */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={meshRef}>
                    <sphereGeometry args={[1.5, 64, 64]} />
                    <MeshDistortMaterial
                        color="#57c2ff"
                        speed={2}
                        distort={0.3}
                        radius={1.5}
                        emissive="#57c2ff"
                        emissiveIntensity={0.2}
                        wireframe
                    />
                </mesh>
            </Float>

            {/* Glowing Aura */}
            <Sphere args={[1.6, 64, 64]}>
                <meshStandardMaterial
                    color="#57c2ff"
                    transparent
                    opacity={0.05}
                    emissive="#57c2ff"
                    emissiveIntensity={1}
                />
            </Sphere>

            {/* Background Particles */}
            <Points positions={particles}>
                <PointMaterial
                    transparent
                    color="#57c2ff"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                />
            </Points>
        </group>
    );
};

export default About3DTechnicalMesh;
