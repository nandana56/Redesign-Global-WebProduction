import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, OrbitControls, Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import WebGLDisposer from './WebGLDisposer';

const JobCard = ({ job, position, rotation, index, active, onClick }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Subtle floating animation
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current && !active) {
            meshRef.current.position.y = position[1] + Math.sin(t + index) * 0.1;
            meshRef.current.rotation.z = rotation[2] + Math.cos(t * 0.5 + index) * 0.05;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group 
                position={position} 
                rotation={rotation}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(index);
                }}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {/* Glass card background */}
                <mesh ref={meshRef}>
                    <planeGeometry args={[3, 1.8]} />
                    <meshPhysicalMaterial
                        transparent
                        opacity={0.4}
                        roughness={0.1}
                        metalness={0.1}
                        transmission={0.8}
                        thickness={0.5}
                        color={hovered || active ? "#60a5fa" : "#ffffff"}
                        ior={1.2}
                    />
                </mesh>

                {/* Border / Frame */}
                <mesh position={[0, 0, -0.01]}>
                    <planeGeometry args={[3.1, 1.9]} />
                    <meshBasicMaterial color={hovered || active ? "#3b82f6" : "#1e293b"} />
                </mesh>

                {/* Text Content */}
                <group position={[0, 0, 0.1]}>
                    <Text
                        position={[0, 0.4, 0]}
                        fontSize={0.18}
                        color="#ffffff"
                        maxWidth={2.6}
                        textAlign="center"
                        material-toneMapped={false}
                    >
                        {job.title}
                    </Text>
                    <Text
                        position={[0, -0.1, 0]}
                        fontSize={0.12}
                        color="#e2e8f0"
                        material-toneMapped={false}
                    >
                        {job.location}
                    </Text>
                    <Text
                        position={[0, -0.4, 0]}
                        fontSize={0.1}
                        color="#94a3b8"
                        material-toneMapped={false}
                    >
                        {job.type}
                    </Text>
                    
                    {/* View Details Button Visual */}
                    <mesh position={[0, -0.7, 0]}>
                        <planeGeometry args={[1, 0.25]} />
                        <meshBasicMaterial color={hovered ? "#3b82f6" : "#2563eb"} rounded={0.1} />
                        <Text
                            position={[0, 0, 0.01]}
                            fontSize={0.08}
                            color="#ffffff"
                        >
                            VIEW DETAILS
                        </Text>
                    </mesh>
                </group>

                {/* Glow effect when hovered */}
                {hovered && (
                    <mesh position={[0, 0, -0.05]}>
                        <planeGeometry args={[3.5, 2.2]} />
                        <meshBasicMaterial 
                            color="#3b82f6" 
                            transparent 
                            opacity={0.2} 
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                )}
            </group>
        </Float>
    );
};

const JobOrbit3D = ({ jobs }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const orbitRef = useRef();
    const { camera } = useThree();

    const handleCardClick = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
            // Reset camera
            gsap.to(camera.position, { x: 0, y: 0, z: 12, duration: 1.5, ease: "power3.inOut" });
            gsap.to(camera.lookAt, { x: 0, y: 0, z: 0, duration: 1.5 });
        } else {
            setActiveIndex(index);
            const angle = (index / jobs.length) * Math.PI * 2;
            const radius = 6;
            const targetX = Math.cos(angle) * radius * 1.5;
            const targetZ = Math.sin(angle) * radius * 1.5;
            
            // Zoom camera to card
            gsap.to(camera.position, { 
                x: Math.cos(angle) * (radius - 2), 
                y: 0, 
                z: Math.sin(angle) * (radius - 2), 
                duration: 1.5, 
                ease: "power3.inOut" 
            });
        }
    };

    const cardData = useMemo(() => {
        const radius = 6;
        return jobs.map((job, i) => {
            const angle = (i / jobs.length) * Math.PI * 2;
            return {
                job,
                position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
                rotation: [0, -angle + Math.PI / 2, 0],
            };
        });
    }, [jobs]);

    useFrame((state) => {
        if (orbitRef.current && activeIndex === null) {
            orbitRef.current.rotation.y += 0.002;
        }
    });

    return (
        <>
            <group ref={orbitRef}>
                {cardData.map((data, i) => (
                    <JobCard
                        key={i}
                        index={i}
                        job={data.job}
                        position={data.position}
                        rotation={data.rotation}
                        active={activeIndex === i}
                        onClick={handleCardClick}
                    />
                ))}
            </group>
            
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <OrbitControls 
                enableZoom={activeIndex === null} 
                enablePan={false}
                autoRotate={activeIndex === null}
                autoRotateSpeed={0.5}
            />
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        </>
    );
};

const JobsSection3D = ({ jobs }) => {
    return (
        <div className="w-full h-[600px] md:h-[800px] bg-[#020617] relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
                    <WebGLDisposer />
                    <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
                    <JobOrbit3D jobs={jobs} />
                </Canvas>
            </div>
            
            {/* UI Overlays */}
            <div className="absolute top-8 left-8 z-10 pointer-events-none">
                <h2 className="text-white text-2xl font-bold font-poppins opacity-50">Current Openings</h2>
            </div>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 pointer-events-none">
                <p className="text-white/60 text-sm font-poppins">Drag to explore • Click cards to zoom</p>
            </div>
        </div>
    );
};

export default JobsSection3D;
