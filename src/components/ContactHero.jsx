import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import ContactLetters3D from './ContactLetters3D';
import WebGLDisposer from './WebGLDisposer';


const ContactHero = () => {
    return (
        <section className="relative w-full h-[60vh] min-h-[400px] bg-[#020617] overflow-hidden flex flex-col items-center justify-center">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent opacity-50" />
                <div 
                    className="absolute inset-0 opacity-10" 
                    style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #57C2FF 1px, transparent 0)', backgroundSize: '40px 40px' }} 
                />
            </div>

            {/* 3D Scene */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                
<Canvas
                    camera={{ position: [0, 0, 20], fov: 45 }}
                    shadows
                    gl={{ antialias: true, alpha: true }}
                >
                <WebGLDisposer />
                    <Suspense fallback={null}>
                        <ContactLetters3D />
                    </Suspense>
                </Canvas>

            </div>

            {/* Scroll Indicator or Subtle Text */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#57C2FF] to-transparent" />
            </motion.div>
        </section>
    );
};

export default ContactHero;
