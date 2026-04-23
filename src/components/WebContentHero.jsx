import React from 'react';
import { motion } from 'framer-motion';

const WebContentHero = () => {
    const titleText = "AI-Powered Web Content Optimizer: Enhancing UX";
    const words = titleText.split(" ");

    return (
        <section className="relative w-full h-[65vh] min-h-[500px] bg-[#030712] overflow-hidden font-poppins flex items-center">
            
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
                 style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

            <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                
                {/* Left Side: Text */}
                <div className="text-left order-2 lg:order-1">
                    <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-block text-blue-400 text-xs sm:text-sm font-bold uppercase tracking-[0.4em] mb-6"
                    >
                        Industry Insights
                    </motion.span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8">
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className="inline-block mr-3 last:mr-0"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="w-24 h-1 bg-blue-500 origin-left"
                    />
                </div>

                {/* Right Side: Image in a Frame (Prevents Blur) */}
                <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1 }}
                        className="relative w-full max-w-[500px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                    >
                        <img 
                            src="/sublinks/aipowered.jfif" 
                            alt="AI Content Optimizer" 
                            className="w-full h-full object-cover"
                        />
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
                    </motion.div>

                    {/* Decorative Elements around image */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -z-10" />
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -z-10" />
                </div>

            </div>
        </section>
    );
};

export default WebContentHero;
