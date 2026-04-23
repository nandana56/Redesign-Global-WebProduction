import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const text = "Unleashing Intelligence from Data";
const textVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.04 }
    }
};

const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } }
};

const DataAndAIHero = () => {
    return (
        <section className="relative w-full h-[600px] flex overflow-hidden font-poppins selection:bg-red-500/30 bg-neutral-950">
            
            {/* Left Side: Dark Background with Kinetic Text */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-12 lg:px-20 z-10">
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={textVariants}
                    className="space-y-6"
                >
                    {/* Character-by-character animated heading */}
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight text-white flex flex-wrap">
                        {text.split(' ').map((word, wordIndex) => (
                            <span key={wordIndex} className="mr-3 sm:mr-4 overflow-hidden flex">
                                {word.split('').map((char, charIndex) => (
                                    <motion.span 
                                        key={charIndex} 
                                        variants={charVariants}
                                        className="inline-block"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>
                    
                    {/* Delayed fade-in for the button */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
                        className="pt-2 sm:pt-4"
                    >
                        <Link to="/contact">
                            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-full transition duration-300 text-sm sm:text-base active:scale-110 active:shadow-inner shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                                Let’s Connect
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            <div className="hidden md:block w-1/2 h-full relative bg-neutral-900">
                {/* Gradient blend to seamlessly transition from solid black to the image */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
                <img 
                    src="/sublinks/herosection.jfif" 
                    alt="Data and AI" 
                    className="w-full h-full object-contain"
                />
            </div>
            
            {/* Mobile Fallback: Image sits in background with heavy dark overlay */}
            <div className="md:hidden absolute inset-0 z-0 bg-neutral-900">
                <img 
                    src="/sublinks/herosection.jfif" 
                    alt="Data and AI Background" 
                    className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-neutral-950/85" />
            </div>

        </section>
    );
};

export default DataAndAIHero;
