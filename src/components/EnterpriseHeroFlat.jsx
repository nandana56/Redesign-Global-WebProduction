import React from 'react';
import { motion } from 'framer-motion';

const EnterpriseHeroFlat = () => {
    return (
        <section className="relative w-full h-[80vh] min-h-[500px] md:h-screen flex items-center justify-center overflow-hidden font-poppins selection:bg-red-500/30">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/enterprise/hero_v2.png" 
                    alt="Enterprise Collaboration Space" 
                    className="w-full h-full object-cover"
                />
                {/* Dark Contrast Overlay */}
                <div className="absolute inset-0 bg-neutral-950/60 transition-opacity duration-700" />
            </div>

            {/* Centered Glassmorphic Content Card */}
            <div className="relative z-10 container mx-auto px-6 flex flex-col items-center">
                <div className="max-w-4xl p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all duration-500 hover:border-white/20">
                    <div className="flex flex-col items-center text-center">
                        
                        {/* Content from Snippet */}
                        <div className="space-y-6 md:space-y-8">
                            <h1 
                                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white mb-4"
                                style={{ opacity: 1, transform: 'none' }}
                            >
                                Future-Ready Enterprise Platforms Built for Scale and Performance
                            </h1>

                            <div className="space-y-2">
                                <p 
                                    className="text-sm sm:text-lg font-bold text-white/90"
                                    style={{ opacity: 1, transform: 'none' }}
                                >
                                    <span className="text-sm sm:text-lg font-semibold text-white">
                                        Seamlessly Integrated. Strategically Engineered. Intelligently
                                    </span>
                                </p>
                            </div>

                            <div className="pt-4">
                                <a href="/contact">
                                    <button 
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-10 rounded-full transition-all duration-300 text-xs sm:text-sm active:scale-110 active:shadow-inner shadow-lg shadow-red-950/20"
                                    >
                                        Talk to Our Experts
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Static Accents (No Animation as requested) */}
            <div className="absolute bottom-10 left-10 w-32 h-1 bg-gradient-to-r from-red-600 to-transparent rounded-full opacity-50 hidden lg:block" />
            <div className="absolute top-10 right-10 w-1 h-32 bg-gradient-to-b from-red-600 to-transparent rounded-full opacity-50 hidden lg:block" />
        </section>
    );
};

export default EnterpriseHeroFlat;
