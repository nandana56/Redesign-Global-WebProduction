import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Center, GradientTexture } from '@react-three/drei';
import * as THREE from 'three';

// Speech Bubble component with continuous piano key press effect
const SpeechBubbleLetter = ({ letter, position, index, totalLetters }) => {
    const groupRef = useRef();
    const bubbleRef = useRef();

    // Animation state - start immediately in loop mode
    const startTime = useRef(null);

    const materialRef = useRef();

    // Extrude settings for 3D depth
    const extrudeSettings = useMemo(() => ({
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 5,
    }), []);

    // Create speech bubble shape
    const bubbleShape = useMemo(() => {
        const shape = new THREE.Shape();
        const radius = 1.8;
        shape.moveTo(radius, 0);
        shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
        shape.closePath();
        return shape;
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;

        if (startTime.current === null) {
            startTime.current = state.clock.elapsedTime;
        }

        const currentTime = state.clock.elapsedTime - startTime.current;

        const easeInOutQuad = (t) => {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        };

        const cycleDuration = 0.5;
        const totalCycleDuration = cycleDuration * totalLetters;
        const timeSinceLoop = currentTime % totalCycleDuration;

        const myTurnStart = index * cycleDuration;
        const myTurnEnd = myTurnStart + cycleDuration;

        let pressDepth = 0;
        let isPressed = false;

        if (timeSinceLoop >= myTurnStart && timeSinceLoop < myTurnEnd) {
            const localProgress = (timeSinceLoop - myTurnStart) / cycleDuration;

            if (localProgress < 0.5) {
                pressDepth = easeInOutQuad(localProgress / 0.5) * 0.6;
                isPressed = true;
            } else {
                const releaseProgress = (localProgress - 0.5) / 0.5;
                pressDepth = 0.6 * (1 - (1 - Math.pow(1 - releaseProgress, 3)));
                isPressed = releaseProgress < 0.5;
            }
        }

        // Update materials based on press state
        if (materialRef.current) {
            // When pressed, we'll try to override the map or use emissive to show solid blue
            materialRef.current.emissiveIntensity = isPressed ? 1 : 0.4;
            materialRef.current.emissive.set(isPressed ? '#57c2ff' : '#40a9ff');
            // Shift color slightly if needed, but the GradientTexture handles the main look
        }

        groupRef.current.position.y = position[1] - pressDepth;

        if (pressDepth > 0.1) {
            groupRef.current.rotation.x = (pressDepth / 0.6) * 0.1;
        } else {
            groupRef.current.rotation.x = 0;
        }

        if (!isPressed) {
            groupRef.current.position.y += Math.sin(currentTime * 0.8 + index * 0.5) * 0.03;
        }

        if (bubbleRef.current) {
            bubbleRef.current.scale.y = pressDepth > 0.1 ? 1 - (pressDepth / 0.6 * 0.2) : 1;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            <mesh ref={bubbleRef} castShadow receiveShadow>
                <extrudeGeometry args={[bubbleShape, extrudeSettings]} />
                <meshStandardMaterial
                    ref={materialRef}
                    metalness={0.2}
                    roughness={0.2}
                    side={THREE.DoubleSide}
                    emissiveIntensity={0.4}
                >
                    <GradientTexture
                        stops={[0, 1]}
                        colors={['#57c2ff', '#3b82f6']}
                        size={1024}
                    />
                </meshStandardMaterial>
            </mesh>

            <Center position={[0, 0, 0.4]}>
                <Text
                    fontSize={1.5}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    fontWeight="bold"
                >
                    {letter}
                </Text>
            </Center>

            {/* Rim/Border effect */}
            <mesh position={[0, 0, -0.05]}>
                <extrudeGeometry args={[bubbleShape, { ...extrudeSettings, depth: 0.1 }]} />
                <meshStandardMaterial
                    color="#1e3a8a"
                    metalness={0.5}
                    roughness={0.1}
                />
            </mesh>
        </group>
    );
};

// Main component
const BlogLetters3D = () => {
    const letters = ['B', 'L', 'O', 'G', 'S'];
    const spacing = 4.2;

    return (
        <>
            {/* Strong lighting for visibility */}
            <ambientLight intensity={0.6} />

            <directionalLight
                position={[5, 10, 5]}
                intensity={0.8}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />

            <directionalLight position={[-5, 5, -5]} intensity={0.5} />

            <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />

            {/* Letter bubbles - centered */}
            <group position={[-(letters.length - 1) * spacing / 2, 0, 0]}>
                {letters.map((letter, index) => (
                    <SpeechBubbleLetter
                        key={letter}
                        letter={letter}
                        position={[index * spacing, 0, 0]}
                        index={index}
                        totalLetters={letters.length}
                    />
                ))}
            </group>
        </>
    );
};

export default BlogLetters3D;
