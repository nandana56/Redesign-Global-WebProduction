import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import WebGLDisposer from './WebGLDisposer';


const Constellation = () => {
    const pointsRef = useRef();
    const lineRef = useRef();

    // Create random points
    const count = 40;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const range = 15;
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * range;
            pos[i * 3 + 1] = (Math.random() - 0.5) * (range * 0.6);
            pos[i * 3 + 2] = (Math.random() - 0.5) * (range * 0.3);
        }
        return pos;
    }, [count]);

    // Animation loop
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (pointsRef.current) {
            pointsRef.current.rotation.y = time * 0.05;
            pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
        }
        if (lineRef.current) {
            lineRef.current.rotation.y = time * 0.05;
            lineRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
        }
    });

    // Create lines between points
    const lines = useMemo(() => {
        const linePositions = [];
        const maxDistance = 4;

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < maxDistance) {
                    linePositions.push(
                        positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                        positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                    );
                }
            }
        }
        return new Float32Array(linePositions);
    }, [positions, count]);

    return (
        <group>
            <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#22d3ee"
                    size={0.12}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
            <lineSegments ref={lineRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={lines.length / 3}
                        array={lines}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#57c2ff" transparent opacity={0.15} />
            </lineSegments>
        </group>
    );
};

const ServicesBackground3D = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            
<Canvas
                camera={{ position: [0, 0, 12], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <WebGLDisposer />
                <ambientLight intensity={1} />
                <Constellation />
            </Canvas>

        </div>
    );
};

export default ServicesBackground3D;
