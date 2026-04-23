import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const NeuralNetworkScene = ({ count = 100, isFormActive = false }) => {
    const pointsRef = useRef();
    const linesRef = useRef();

    const [particles, connections] = useMemo(() => {
        const particles = new Float32Array(count * 3);
        const connections = [];
        for (let i = 0; i < count; i++) {
            particles[i * 3] = (Math.random() - 0.5) * 10;
            particles[i * 3 + 1] = (Math.random() - 0.5) * 10;
            particles[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }

        // Create connections for nearby particles
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = Math.sqrt(
                    Math.pow(particles[i * 3] - particles[j * 3], 2) +
                    Math.pow(particles[i * 3 + 1] - particles[j * 3 + 1], 2) +
                    Math.pow(particles[i * 3 + 2] - particles[j * 3 + 2], 2)
                );
                if (dist < 3) {
                    connections.push(i, j);
                }
            }
        }
        return [particles, new Uint16Array(connections)];
    }, [count]);

    const lineGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(particles, 3));
        geo.setIndex(new THREE.BufferAttribute(connections, 1));
        return geo;
    }, [particles, connections]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const positions = pointsRef.current.geometry.attributes.position.array;
        
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Add some wave motion
            positions[i3 + 1] += Math.sin(time + positions[i3]) * 0.005;
            positions[i3] += Math.cos(time + positions[i3 + 1]) * 0.005;
        }
        
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        linesRef.current.geometry.attributes.position.needsUpdate = true;
        
        pointsRef.current.rotation.y = time * 0.1;
        linesRef.current.rotation.y = time * 0.1;
        
        if (isFormActive) {
            pointsRef.current.rotation.y += 0.05;
            linesRef.current.rotation.y += 0.05;
        }
    });

    return (
        <group>
            <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#3b82f6"
                    size={0.1}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial color="#3b82f6" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
            </lineSegments>
        </group>
    );
};

export default NeuralNetworkScene;
