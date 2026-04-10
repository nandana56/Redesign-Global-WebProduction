import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DynamicPartnerCTA = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section 
            className="relative w-full h-[65vh] min-h-[500px] flex items-center justify-center bg-[#020617] overflow-hidden border-t border-white/5 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            
            {/* Morphing Image Container - Acts as a massive pill that expands to full screen on hover */}
            <motion.div 
                className="absolute z-10 overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                initial={false}
                animate={{
                    width: isHovered ? "100%" : "70%",
                    height: isHovered ? "100%" : "220px",
                    borderRadius: isHovered ? "0px" : "150px",
                }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
            >
                <motion.img 
                    src="/products/patnership.jpg" 
                    alt="Partnership"
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.05 : 1.2 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                />
                {/* Dynamic overlay that darkens the image when expanded so the text and button stand out */}
                <motion.div 
                    className="absolute inset-0 bg-[#020617]"
                    animate={{ opacity: isHovered ? 0.75 : 0.4 }}
                    transition={{ duration: 0.8 }}
                />
                
                {/* Dynamic Glowing border inside the image container */}
                <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    animate={{ 
                        border: isHovered ? "0px solid rgba(87,194,255,0)" : "1.5px solid rgba(87,194,255,0.4)" ,
                        borderRadius: isHovered ? "0px" : "150px"
                    }}
                    transition={{ duration: 0.8 }}
                />
            </motion.div>

            {/* Text & Button Layer (Shifted higher via negative margin) */}
            <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none space-y-10 w-full max-w-6xl px-4 text-center -mt-24">
                
                {/* Typography matching requested classes */}
                <motion.div
                    animate={{ 
                        y: isHovered ? -20 : 0,
                        scale: isHovered ? 1.05 : 1
                    }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                        PARTNER WITH <br/> 
                        <motion.span 
                            className="inline-block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-[#57C2FF] to-blue-600"
                            animate={{ textShadow: isHovered ? "0px 0px 30px rgba(87,194,255,0.4)" : "0px 0px 0px rgba(87,194,255,0)" }}
                            transition={{ duration: 0.5 }}
                        >
                            GLOBAL WEB PRODUCTION
                        </motion.span>
                    </h2>
                </motion.div>

                {/* Expanding Action Button */}
                <AnimatePresence>
                    {isHovered ? (
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            transition={{ type: "spring", damping: 15, stiffness: 150, delay: 0.1 }}
                            className="pointer-events-auto mt-32"
                        >
                            <button className="relative px-10 py-4 bg-[#57C2FF] text-black font-semibold rounded-full text-lg shadow-[0_0_40px_rgba(87,194,255,0.6)] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 group overflow-hidden">
                                <span className="relative z-10">Request a Demo</span>
                                <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute bottom-[-130px] text-[#57C2FF] text-sm tracking-[0.3em] font-black uppercase opacity-60"
                        >
                            Hover to Expand
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

        </section>
    );
};

export default DynamicPartnerCTA;
