import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, Sphere, MeshDistortMaterial, Trail } from "@react-three/drei";
import WebGLDisposer from './WebGLDisposer';

function AnimatedNode() {
    const meshRef = useRef();
    const trailRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Smooth back and forth / orbital movement
        // "Hand returns" - moving in a path that brings it back
        meshRef.current.position.x = Math.sin(t * 0.8) * 1.5;
        meshRef.current.position.y = Math.cos(t * 0.5) * 0.5;
        meshRef.current.position.z = Math.sin(t * 0.3) * 0.5;

        // Subtle rotation
        meshRef.current.rotation.x = t * 0.2;
        meshRef.current.rotation.y = t * 0.5;
    });

    return (
        <group>
            <Trail
                width={1.5}
                length={8}
                color={new THREE.Color("#57c2ff")}
                attenuation={(t) => t * t}
            >
                <Sphere ref={meshRef} args={[0.08, 32, 32]}>
                    <MeshDistortMaterial
                        color="#57c2ff"
                        speed={4}
                        distort={0.4}
                        emissive="#57c2ff"
                        emissiveIntensity={2}
                    />
                </Sphere>
            </Trail>

            {/* Outer Glow Halo */}
            <Sphere scale={1.2}>
                <meshBasicMaterial color="#57c2ff" transparent opacity={0.15} />
            </Sphere>
        </group>
    );
}

export default function MovingTextObject3D() {
    const [failed, setFailed] = React.useState(false);

    if (failed) return null;

    return (
        <div className="w-48 h-32 pointer-events-none">
            
<Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance"
                }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                }}
                onError={() => setFailed(true)}
            >
                <WebGLDisposer />
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <AnimatedNode />
                </Float>
            </Canvas>

        </div>
    );
}
