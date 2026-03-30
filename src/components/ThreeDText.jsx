import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Text, Float, Center, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import WebGLDisposer from './WebGLDisposer';


function TextLayer({ children, color, offset = [0, 0, 0], wireframe = false, floatIntensity = 1, speed = 2, opacity = 1 }) {
    return (
        <Float speed={speed} rotationIntensity={0.2} floatIntensity={floatIntensity}>
            <Center position={offset} top left>
                <Text
                    fontSize={0.65}
                    maxWidth={12}
                    lineHeight={1.1}
                    letterSpacing={-0.02}
                    textAlign="left"
                    anchorX="left"
                    anchorY="middle"
                >
                    {children}
                    {wireframe ? (
                        <meshBasicMaterial
                            color={color}
                            wireframe={true}
                            transparent
                            opacity={opacity * 0.4}
                        />
                    ) : (
                        <meshStandardMaterial
                            color="#fff"
                            emissive={color}
                            emissiveIntensity={0.8}
                            metalness={0.9}
                            roughness={0.1}
                            transparent
                            opacity={opacity}
                        />
                    )}
                </Text>
            </Center>
        </Float>
    );
}

function StylizedText() {
    const text = "TECHNOLOGY SOLUTIONS\nWITH GLOBAL IMPACT";
    const primaryColor = "#4bb5f8"; // Light blue/teal from reference

    return (
        <group>
            {/* Outline Layer (Background) */}
            <TextLayer color={primaryColor} offset={[-0.05, 0.05, -0.2]} wireframe opacity={0.6} floatIntensity={1.5} speed={1.5}>
                {text}
            </TextLayer>

            {/* Main Solid Layer */}
            <TextLayer color={primaryColor} offset={[0, 0, 0]} floatIntensity={0.5} speed={2}>
                {text}
            </TextLayer>

            {/* Accent Outline Layer (Foreground) */}
            <TextLayer color={primaryColor} offset={[0.08, -0.08, 0.2]} wireframe opacity={0.4} floatIntensity={1.2} speed={2.5}>
                {text}
            </TextLayer>
        </group>
    );
}

export default function ThreeDText() {
    return (
        <div className="w-full h-[350px] pointer-events-none -ml-4">
            
<Canvas
                key="stylized-3d-text"
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <WebGLDisposer />
                <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={35} />
                <ambientLight intensity={0.6} />
                <pointLight position={[5, 10, 5]} intensity={2} color="#4bb5f8" />
                <pointLight position={[-5, -5, 2]} intensity={1} color="#ffffff" />
                <spotLight position={[0, 10, 10]} angle={0.2} penumbra={1} intensity={3} color="#4bb5f8" />
                <StylizedText />
            </Canvas>

        </div>
    );
}
