import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Environment } from '@react-three/drei';
import * as THREE from 'three';
import WebGLDisposer from './WebGLDisposer';


function makeArrowShape(w, h, tip) {
    const s = new THREE.Shape();
    const hw = w / 2;
    const hh = h / 2;
    s.moveTo(-hw, hh);
    s.lineTo(hw - tip, hh);
    s.lineTo(hw, 0);
    s.lineTo(hw - tip, -hh);
    s.lineTo(-hw, -hh);
    s.closePath();
    return s;
}

/* Each sign gets its own unique sway profile — amplitudes: 30°, 45°, 90° */
const DEG = (d) => (d * Math.PI) / 180;

const SIGN_CONFIGS = [
    {
        // Top sign: swings ±30°
        yPos: 1.45,
        text: 'CAREER',
        flipDir: -1,
        color: '#4B5563',
        textColor: '#F9FAFB',
        phaseOffset: 0,
        swayY: { amp: DEG(30), freq: 1.1, amp2: DEG(5), freq2: 2.3 },
        swayZ: { amp: DEG(4), freq: 0.7 },
        swayX: { amp: DEG(3), freq: 1.9 },
    },
    {
        // Middle sign: swings ±45°
        yPos: 0.6,
        text: 'FUTURE',
        flipDir: 1,
        color: '#D4C5A9',
        textColor: '#1F2937',
        phaseOffset: 1.8,
        swayY: { amp: DEG(45), freq: 0.75, amp2: DEG(8), freq2: 1.5 },
        swayZ: { amp: DEG(6), freq: 1.1 },
        swayX: { amp: DEG(5), freq: 0.9 },
    },
    {
        // Bottom sign: swings ±90°
        yPos: -0.25,
        text: 'OPPORTUNITY',
        flipDir: -1,
        color: '#374151',
        textColor: '#F9FAFB',
        phaseOffset: 3.5,
        swayY: { amp: DEG(90), freq: 0.55, amp2: DEG(12), freq2: 1.2 },
        swayZ: { amp: DEG(8), freq: 0.8 },
        swayX: { amp: DEG(4), freq: 1.4 },
    },
];

function SignLeaf({ config }) {
    const { yPos, text, flipDir, color, textColor, phaseOffset, swayY, swayZ, swayX } = config;
    const groupRef = useRef();

    const geo = useMemo(() => {
        const shape = makeArrowShape(2.8, 0.62, 0.42);
        return new THREE.ExtrudeGeometry(shape, {
            depth: 0.12,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.02,
            bevelSegments: 2,
        });
    }, []);

    const mat = useMemo(() => new THREE.MeshStandardMaterial({
        color,
        roughness: 0.7,
        metalness: 0.05,
    }), [color]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime() + phaseOffset;
        if (!groupRef.current) return;
        // Y-axis: left-right swing (primary sway)
        groupRef.current.rotation.y =
            flipDir * (Math.sin(t * swayY.freq) * swayY.amp + Math.sin(t * swayY.freq2) * swayY.amp2);
        // Z-axis: tilt / lean
        groupRef.current.rotation.z = Math.sin(t * swayZ.freq + phaseOffset * 0.5) * swayZ.amp;
        // X-axis: forward-back nod
        groupRef.current.rotation.x = Math.sin(t * swayX.freq + phaseOffset) * swayX.amp;
    });

    return (
        <group ref={groupRef} position={[flipDir * 0.1, yPos, 0]}>
            <mesh geometry={geo} material={mat} castShadow />
            <Text
                position={[-0.15, 0, 0.15]}
                fontSize={0.24}
                color={textColor}
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.1}
            >
                {text}
            </Text>
            {/* Bolts */}
            {[-1.05, 0.85].map((x, i) => (
                <mesh key={i} position={[x, 0, 0.14]}>
                    <cylinderGeometry args={[0.045, 0.045, 0.05, 12]} />
                    <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.15} />
                </mesh>
            ))}
        </group>
    );
}

function WoodenPost() {
    return (
        <group>
            <mesh castShadow>
                <cylinderGeometry args={[0.13, 0.16, 5.2, 12]} />
                <meshStandardMaterial color="#8B6343" roughness={0.9} metalness={0} />
            </mesh>
            {[-1.8, -1.0, -0.2, 0.6, 1.4].map((y, i) => (
                <mesh key={i} position={[0.14, y, 0]}>
                    <boxGeometry args={[0.01, 0.015, 0.22]} />
                    <meshBasicMaterial color="#6B4C2A" transparent opacity={0.6} />
                </mesh>
            ))}
            <mesh position={[0, 2.62, 0]}>
                <cylinderGeometry args={[0.14, 0.14, 0.07, 12]} />
                <meshStandardMaterial color="#6B4C2A" roughness={0.85} />
            </mesh>
        </group>
    );
}

function SceneContent() {
    const rootRef = useRef();
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (rootRef.current) {
            rootRef.current.position.y = Math.sin(t * 0.5) * 0.07;
        }
    });

    return (
        <group ref={rootRef} position={[0, 0.2, 0]}>
            <WoodenPost />
            {SIGN_CONFIGS.map((cfg, i) => (
                <SignLeaf key={i} config={cfg} />
            ))}
            {/* Ground shadow */}
            <mesh position={[0, -2.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.1, 32]} />
                <meshBasicMaterial color="#000000" transparent opacity={0.15} />
            </mesh>
        </group>
    );
}

export default function CareerSignpost3D() {
    return (
        <div style={{ width: '100%', height: '500px' }}>
            
<Canvas
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                camera={{ position: [0, 0.5, 7.5], fov: 36 }}
            >
                <WebGLDisposer />
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 8, 5]} intensity={2} color="#ffffff" castShadow />
                <pointLight position={[-4, 2, 3]} intensity={0.7} color="#38bdf8" />
                <SceneContent />
                <Environment preset="sunset" />
            </Canvas>

        </div>
    );
}
