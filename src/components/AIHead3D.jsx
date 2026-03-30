import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Points, PointMaterial, Line, Float, PerspectiveCamera } from "@react-three/drei";
import WebGLDisposer from './WebGLDisposer';


function AIHead() {
    const pointsRef = useRef();
    const groupRef = useRef();
    const { mouse, viewport } = useThree();

    // Generate points and lines for head profile
    const { particles, networkingLines, wavyLines } = useMemo(() => {
        const particles = [];
        const networkingLines = [];
        const wavyLines = [];
        const count = 3000;

        // Create head profile shape
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            let r = 1.6;
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.cos(phi);
            const z = r * Math.sin(phi) * Math.sin(theta);

            // Shape the profile (side view focused)
            // Use a mathematical model for a head shape or just bias points
            const isFront = z > -0.2;
            const isProfile = Math.abs(x) > 0.5 || y > 0.5;

            // Simple profile mask
            if (z > -0.8 && (x > 0 || Math.abs(z) < 1.2)) {
                // Taper for neck and cranium
                let scaleY = 1.0;
                if (y < -0.8) scaleY = (y + 2) * 0.5; // neck

                particles.push(x, y * scaleY, z);
            }
        }

        // Networking lines (connecting nearby particles)
        const particleArray = new Float32Array(particles);
        for (let i = 0; i < 400; i++) {
            const p1Idx = Math.floor(Math.random() * (particles.length / 3));
            const p1 = new THREE.Vector3(particleArray[p1Idx * 3], particleArray[p1Idx * 3 + 1], particleArray[p1Idx * 3 + 2]);

            // Find another random nearby point
            const p2Idx = Math.floor(Math.random() * (particles.length / 3));
            const p2 = new THREE.Vector3(particleArray[p2Idx * 3], particleArray[p2Idx * 3 + 1], particleArray[p2Idx * 3 + 2]);

            if (p1.distanceTo(p2) < 0.6) {
                networkingLines.push([p1, p2]);
            }
        }

        // Wavy lines trailing from the back (left)
        const lineCount = 20;
        for (let i = 0; i < lineCount; i++) {
            const points = [];
            const yStart = (Math.random() - 0.5) * 3;
            const zStart = (Math.random() - 0.5) * 1.5;
            for (let j = 0; j < 15; j++) {
                points.push(new THREE.Vector3(-1.2 - j * 0.3, yStart, zStart));
            }
            wavyLines.push(points);
        }

        return {
            particles: particleArray,
            networkingLines,
            wavyLines
        };
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Balanced camera movement based on mouse
        if (groupRef.current) {
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (mouse.x * 0.5), 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -(mouse.y * 0.3), 0.05);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Base Particles */}
            <Points ref={pointsRef} positions={particles} stride={3}>
                <PointMaterial
                    transparent
                    color="#60a5fa"
                    size={0.015}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Networking Lines (Static mesh-like connections) */}
            {networkingLines.map((pts, i) => (
                <Line
                    key={`net-${i}`}
                    points={pts}
                    color="#57c2ff"
                    lineWidth={0.5}
                    transparent
                    opacity={0.15}
                />
            ))}

            {/* Wavy lines */}
            {wavyLines.map((points, i) => (
                <WavyLine key={`wave-${i}`} points={points} delay={i * 0.2} />
            ))}

            {/* Inner Glow */}
            <mesh>
                <sphereGeometry args={[1.4, 32, 32]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.03} />
            </mesh>
        </group>
    );
}

function WavyLine({ points, delay }) {
    const lineRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const positions = lineRef.current.geometry.attributes.position.array;

        for (let i = 0; i < points.length; i++) {
            const x = points[i].x;
            const y = points[i].y + Math.sin(t * 1.5 + x * 0.8 + delay) * 0.2;
            const z = points[i].z + Math.cos(t * 1 + x * 0.5 + delay) * 0.1;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }
        lineRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Line
            ref={lineRef}
            points={points}
            color="#57c2ff"
            lineWidth={1.2}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
        />
    );
}

export default function AIHead3D() {
    return (
        <div className="w-full h-full">
            
<Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                <WebGLDisposer />
                <PerspectiveCamera makeDefault position={[3, 0.5, 6]} fov={35} />
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#57c2ff" />
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <AIHead />
                </Float>
            </Canvas>

        </div>
    );
}
