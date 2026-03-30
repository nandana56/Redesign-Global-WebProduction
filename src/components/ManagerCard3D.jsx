import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import WebGLDisposer from './WebGLDisposer';

const InteractiveShape = ({ color, isHovered }) => {
    const meshRef = useRef();
    const [distort, setDistort] = useState(0.4);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;

            // React to hover
            const targetDistort = isHovered ? 0.8 : 0.4;
            setDistort(THREE.MathUtils.lerp(distort, targetDistort, 0.1));

            const targetScale = isHovered ? 1.2 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial
                color={color}
                speed={isHovered ? 4 : 2}
                distort={distort}
                radius={1}
                emissive={color}
                emissiveIntensity={isHovered ? 1.5 : 0.5}
                transparent
                opacity={0.9}
            />
        </mesh>
    );
};

const ManagerCard3D = ({ color = "#57c2ff", isHovered = false }) => {
    const [failed, setFailed] = useState(false);

    if (failed) return null;

    return (
        <div className="w-full h-full relative">
            
<Canvas
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance"
                }}
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 3], fov: 45 }}
                onError={() => setFailed(true)}
            >
                <WebGLDisposer />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color={color} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <InteractiveShape color={color} isHovered={isHovered} />
                </Float>
            </Canvas>

        </div>
    );
};

export default ManagerCard3D;
