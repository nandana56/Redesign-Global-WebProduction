import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
    Environment, 
    Float, 
    Stars, 
    Sparkles,
    Text,
    PerspectiveCamera
} from "@react-three/drei";
import { motion } from "framer-motion";

const Scene = () => {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1, 10]} fov={50} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
            
            {/* Background elements */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} scale={20} size={2} speed={0.5} color="#57C2FF" />

            {/* The Text BEHIND the sphere for refraction effect */}
            {/* Using Brand Font for High-End Aesthetic */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <Text
                    position={[0, 2, -2]}
                    fontSize={1.5}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={12}
                    textAlign="center"
                    lineHeight={1.2}
                >
                    PARTNER WITH{"\n"}GLOBAL WEB PRODUCTION
                </Text>
            </Float>

            <Environment preset="city" />
        </>
    );
};

const PartnerCTA = () => {
    return (
        <section className="relative h-[85vh] w-full bg-[#061e4f] overflow-hidden flex items-center justify-center cursor-none">
            {/* 3D Scene Layer */}
            <div className="absolute inset-0 z-0">
                <Canvas shadows dpr={[1, 2]}>
                    {/* Fallback group ensures something is always visible during load */}
                    <Suspense fallback={<group><Stars count={1000} /><Sparkles count={50} /></group>}>
                        <Scene />
                    </Suspense>
                </Canvas>
            </div>

            {/* DOM Overlay for Button */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 h-full flex flex-col items-center justify-end pb-16">
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="flex flex-col items-center gap-8"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#57C2FF] to-blue-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                        <button className="relative px-12 py-5 bg-white text-black font-black rounded-full text-xl uppercase tracking-[0.2em] hover:bg-[#57C2FF] hover:text-white transition-all duration-300 shadow-2xl active:scale-95">
                            Request a Demo
                        </button>
                    </div>

                    <p className="text-gray-500 font-mono text-[10px] tracking-[0.5em] uppercase opacity-60">
                        Experience the convergence of intelligence and design
                    </p>
                </motion.div>
            </div>

            {/* Decorative Corner Accents */}
            <div className="absolute bottom-10 left-10 w-32 h-[1px] bg-gradient-to-r from-[#57C2FF]/30 to-transparent" />
            <div className="absolute top-10 right-10 w-32 h-[1px] bg-gradient-to-l from-[#57C2FF]/30 to-transparent" />
        </section>
    );
};

export default PartnerCTA;

