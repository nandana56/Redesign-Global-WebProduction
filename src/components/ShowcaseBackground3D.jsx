import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import WebGLDisposer from './WebGLDisposer';


const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 2.5;

function ParticleNetwork() {
    const pointsRef = useRef();
    const linesRef = useRef();

    // Generate random particle positions
    const positions = useMemo(() => {
        const pos = new Float32Array(PARTICLE_COUNT * 3);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 18;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
        }
        return pos;
    }, []);

    // Velocities for gentle drift
    const velocities = useMemo(() => {
        const vel = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            vel.push({
                x: (Math.random() - 0.5) * 0.008,
                y: (Math.random() - 0.5) * 0.005,
                z: (Math.random() - 0.5) * 0.003,
            });
        }
        return vel;
    }, []);

    // Particle colors
    const colors = useMemo(() => {
        const col = new Float32Array(PARTICLE_COUNT * 3);
        const palette = [
            new THREE.Color("#4bb5f8"),
            new THREE.Color("#57c2ff"),
            new THREE.Color("#a855f7"),
            new THREE.Color("#ffffff"),
        ];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const c = palette[Math.floor(Math.random() * palette.length)];
            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
        }
        return col;
    }, []);

    useFrame(() => {
        if (!pointsRef.current) return;
        const posAttr = pointsRef.current.geometry.attributes.position;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            posAttr.array[i * 3] += velocities[i].x;
            posAttr.array[i * 3 + 1] += velocities[i].y;
            posAttr.array[i * 3 + 2] += velocities[i].z;

            // Wrap around bounds
            if (Math.abs(posAttr.array[i * 3]) > 9) velocities[i].x *= -1;
            if (Math.abs(posAttr.array[i * 3 + 1]) > 5) velocities[i].y *= -1;
            if (Math.abs(posAttr.array[i * 3 + 2]) > 3) velocities[i].z *= -1;
        }

        posAttr.needsUpdate = true;

        // Update connection lines
        if (linesRef.current) {
            const linePositions = [];
            const lineColors = [];

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                    const ax = posAttr.array[i * 3];
                    const ay = posAttr.array[i * 3 + 1];
                    const az = posAttr.array[i * 3 + 2];
                    const bx = posAttr.array[j * 3];
                    const by = posAttr.array[j * 3 + 1];
                    const bz = posAttr.array[j * 3 + 2];

                    const dist = Math.sqrt(
                        (ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2
                    );

                    if (dist < CONNECTION_DISTANCE) {
                        const alpha = 1 - dist / CONNECTION_DISTANCE;
                        linePositions.push(ax, ay, az, bx, by, bz);
                        lineColors.push(alpha * 0.3, alpha * 0.7, alpha, alpha * 0.3, alpha * 0.7, alpha);
                    }
                }
            }

            linesRef.current.geometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(linePositions, 3)
            );
            linesRef.current.geometry.setAttribute(
                "color",
                new THREE.Float32BufferAttribute(lineColors, 3)
            );
        }
    });

    return (
        <>
            {/* Particles */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[colors, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.06}
                    vertexColors
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                />
            </points>

            {/* Connection Lines */}
            <lineSegments ref={linesRef}>
                <bufferGeometry />
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>
        </>
    );
}

const ShowcaseBackground3D = () => {
    return (
        
<Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            gl={{ antialias: true, alpha: true }}
        >
                <WebGLDisposer />
            <ambientLight intensity={0.5} />
            <ParticleNetwork />
        </Canvas>

    );
};

export default ShowcaseBackground3D;
