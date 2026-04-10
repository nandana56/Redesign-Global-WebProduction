import React from "react";
import { motion } from "framer-motion";
import ContactLightningScene from "../components/ContactLightningScene";


const Contact = () => {
    return (
        <div className="bg-[#040816] min-h-screen">
            {/* 3D Hero Section - Rich Blue Background */}
            <div className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#09182e] to-[#040816]">
                {/* Background Glow Effects - More vibrant blue/cyan */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[140px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[160px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#57C2FF]/5 pointer-events-none" />
                </div>
                
                <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Text */}
                    <div className="text-left py-12 lg:py-0">
                        <motion.h1 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
                        >
                            Let&apos;s Build the Future Together — <br className="hidden md:block" /> Contact Us Today
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-base sm:text-md md:text-lg lg:text-xl text-blue-100/90 max-w-2xl leading-relaxed font-poppins font-light"
                        >
                            At Global Web Production, we deliver cutting-edge digital solutions and unparalleled customer support. Whether you are a potential client, a valued partner, or have a question, we&apos;d love to hear from you.
                        </motion.p>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="w-full h-[350px] sm:h-[450px] lg:h-[550px] flex items-center justify-center relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(9,24,46,0.5)] border border-white/10 bg-[#09182e]/40 backdrop-blur-xl"
                    >
                        {/* The Background Image - Centered and static */}
                        <div 
                            className="absolute inset-0 z-0 bg-no-repeat bg-center"
                            style={{ 
                                backgroundImage: "url('/contact/contacthero.jpg')",
                                backgroundSize: "88%", // Fine-tuned for overlap
                            }}
                        />

                        {/* Overlay to dim it slightly for better 3D visibility - Tinted blue for seamless look */}
                        <div className="absolute inset-0 z-1 bg-blue-500/5 pointer-events-none" />

                        <div className="w-full h-[350px] sm:h-[450px] lg:h-[550px] flex items-center justify-center">
                            <ContactLightningScene />
                        </div>
                    </motion.div>
                </div>
            </div>

        </div>
    );
};

export default Contact;