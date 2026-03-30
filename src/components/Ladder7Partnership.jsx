import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const SaasButton = () => {
    return (
        <button className="group relative overflow-hidden rounded-full text-black bg-white px-3 py-1 sm:px-4 sm:py-2 border border-white text-xs sm:text-sm transition-colors duration-300 text-[17px] font-medium font-poppins hover:shadow-[0_15px_30px_rgba(87,194,255,0.4)] hover:-translate-y-1">
            {/* Soft background transition instead of sharp fill */}
            <span className="absolute inset-0 w-full h-full bg-[#dbe8f0] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
            
            <span className="relative z-10 flex items-center gap-3 text-black transition-colors duration-300">
                Learn More
            </span>
        </button>
    );
};

// --- MAIN COMPONENT ---
const Ladder7Partnership = () => {
    // Shared motion values for the entire section's Isometric mouse follow effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30, mass: 0.5 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30, mass: 0.5 });

    // The base Isometric rotation is roughly rotate-x: 55deg, rotate-z: 45deg
    // We add slight variations to these native axes based on mouse position.
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [65, 45]);
    const rotateZ = useTransform(mouseXSpring, [-0.5, 0.5], [35, 55]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "2500px" }}
            className="relative w-full bg-[#001c3d] py-24 md:py-40 px-6 sm:px-12 lg:px-24 overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-8 relative z-10">
                
                {/* LEFT SIDE: Typography & Content */}
                <div className="w-full lg:w-5/12 flex flex-col justify-center order-last lg:order-first z-20">
                    <motion.div 
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* High-Tech SaaS Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#57C2FF]/10 border border-[#57C2FF]/30 mb-8 shadow-[0_0_15px_rgba(87,194,255,0.2)]">
                            <span className="w-2 h-2 rounded-full bg-[#57C2FF] animate-pulse shadow-[0_0_8px_rgba(87,194,255,1)]" />
                            <span className="text-[#57C2FF] text-xs sm:text-sm font-bold tracking-widest uppercase font-poppins">Strategic Partnership</span>
                        </div>

                        <h2 className="text-[#57C2FF] text-[24pt] sm:text-xl md:text-2xl lg:text-3xl lg:mt-8 font-medium mb-3 md:mb-4 lg:mb-6 text-left font-poppins leading-tight">
                            Ladder7 <br className="hidden lg:block"/> 
                            Nextstep Solutions
                        </h2>

                        <p className="text-white text-sm sm:text-base leading-relaxed text-left font-poppins mb-12 max-w-xl">
                            Ladder7 Nextstep Solutions is a training academy based in India focused on enhancing the technical skills of their attendees. Through our partnership, we are able to provide opportunities for real-world experience to students, and also provide the companies we serve with top talent.
                        </p>

                        <div className="mt-4">
                            <SaasButton />
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT SIDE: Isometric 3D Object (Framer Motion) */}
                <div className="w-full lg:w-7/12 h-[450px] sm:h-[550px] lg:h-[650px] flex items-center justify-center relative order-first lg:order-last">
                    
                    {/* The 3D Scene Container */}
                    <motion.div 
                        style={{
                            rotateX,
                            rotateZ,
                            transformStyle: "preserve-3d",
                        }}
                        className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] pointer-events-none"
                    >
                        {/* Continuous floating animation wrapper */}
                        <motion.div
                            animate={{ y: [0, -30, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full h-full relative"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Layer 3: Drop Shadow Plate (bottom-most) */}
                            <div 
                                className="absolute inset-0 bg-[#57C2FF]/15 blur-2xl rounded-3xl"
                                style={{ transform: "translateZ(-80px)" }}
                            />

                            {/* Layer 2: Abstract Blue Glass Plate */}
                            <div 
                                className="absolute inset-0 bg-gradient-to-tr from-[#57C2FF]/40 to-blue-700/20 backdrop-blur-md border-[2px] border-[#57C2FF]/40 rounded-3xl"
                                style={{ transform: "translateZ(-40px) scale(1.05)" }}
                            />
                            
                            {/* Layer 1: Solid Image Plate (top-most) */}
                            <div 
                                className="absolute inset-0 bg-white/5 border-[3px] border-white/20 rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
                                style={{ transform: "translateZ(0px)" }}
                            >
                                <img 
                                    src="/home/ladder7.jpg" 
                                    alt="Ladder7 Nextstep Solutions Isometric" 
                                    loading="lazy" 
                                    className="w-full h-full object-cover rounded-3xl" 
                                />
                                
                                {/* Inner Glass Shine */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/30 pointer-events-none" />
                            </div>

                            {/* Extra Floating Decor Layers */}
                            <motion.div 
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -top-12 -right-12 w-28 h-28 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl"
                                style={{ transform: "translateZ(80px)" }}
                            >
                                {/* Mini glass detail */}
                                <div className="absolute inset-2 border border-white/10 rounded-xl" />
                            </motion.div>

                            <motion.div 
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                className="absolute -bottom-8 -left-8 w-20 h-20 bg-[#57C2FF]/20 backdrop-blur-xl border border-[#57C2FF]/40 rounded-xl shadow-xl flex items-center justify-center p-3"
                                style={{ transform: "translateZ(50px)" }}
                            >
                                <div className="w-full h-full bg-[#57C2FF]/30 rounded-lg animate-pulse" />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            {/* Ambient Background Light (Softened for the lighter background) */}
            <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#57C2FF]/15 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#001c3d] via-[#002b5e] to-[#001c3d] opacity-50 pointer-events-none" />
        </section>
    );
};

export default Ladder7Partnership;
