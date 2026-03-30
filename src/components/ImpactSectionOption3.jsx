import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Helper component for magnetic, interactive "Bento" card
const MagneticCard = ({ text, className, glowColor }) => {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    // Track mouse position specifically for the glow effect
    const glowX = useSpring(useTransform(mouseX, [-1, 1], [0, 100]), { stiffness: 500, damping: 50 });
    const glowY = useSpring(useTransform(mouseY, [-1, 1], [0, 100]), { stiffness: 500, damping: 50 });

    // Smooth physics for the card's rotational "magnetic tilt"
    const springConfig = { damping: 20, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);
    const rotateX = useTransform(springY, [-1, 1], [5, -5]);
    const rotateY = useTransform(springX, [-1, 1], [-5, 5]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        // Normalized coordinates from -1 to 1 based on center of card
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        mouseX.set(x);
        mouseY.set(y);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            style={{
                rotateX: rotateX,
                rotateY: rotateY,
                perspective: 1000
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`relative rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden p-8 sm:p-10 flex items-center group cursor-default transition-colors duration-500 hover:bg-white/[0.05] ${className}`}
        >
            {/* Dynamic Cursor Glow Effect */}
            <motion.div
                className={`absolute w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-opacity duration-300 ${glowColor}`}
                style={{
                    left: `calc(${glowX}% - 8rem)`,
                    top: `calc(${glowY}% - 8rem)`,
                    opacity: isHovered ? 0.6 : 0,
                }}
            />

            <p className="text-lg text-white mt-4 font-poppins text-center relative z-10">
                {text}
            </p>
        </motion.div>
    );
};

const ImpactSectionOption3 = () => {
    return (
        <section className="relative w-full min-h-screen py-24 flex items-center overflow-hidden bg-[#16406f]">
            {/* Animated Mesh Gradients Background */}
            <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-60">
                <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-cyan-400/20 rounded-full blur-[150px] animate-[spin_20s_linear_infinite]" />
                <div className="absolute bottom-[10%] right-[10%] w-[800px] h-[800px] bg-blue-600/30 rounded-full blur-[180px] animate-[spin_25s_reverse_linear_infinite]" />
                <div className="absolute top-[40%] left-[60%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px] animate-[ping_10s_ease-in-out_infinite]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-[250px] sm:auto-rows-[300px] items-center">
                    
                    {/* Floating Center Typography (Occupies col-span-12 on mobile, spans middle on Desktop) */}
                    <div className="lg:col-span-3 text-center mb-8 lg:mb-16">
                        <motion.h2 
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-3xl sm:text-4xl font-bold text-white leading-tight font-poppins text-center inline-block"
                        >
                            Be You. Make an Impact
                        </motion.h2>
                    </div>

                    {/* Bento Box Grid */}
                    <div className="lg:col-span-1 h-full">
                        <MagneticCard 
                            className="h-full"
                            glowColor="bg-cyan-400"
                            text={
                                <>
                                    We believe there's room for <strong className="font-semibold text-white">everyone</strong> at Global Web Production Company. We are all different, and each of us brings something unique that helps build the community spirit that drives our success.
                                </>
                            } 
                        />
                    </div>

                    <div className="lg:col-span-1 h-full flex flex-col gap-6 lg:gap-8">
                        <MagneticCard 
                            className="flex-1"
                            glowColor="bg-blue-400"
                            text={
                                <>
                                    We celebrate diversity, we aim to always be <strong className="font-semibold text-white">inclusive</strong>, and we know this is a journey that constantly evolves.
                                </>
                            } 
                        />
                        <MagneticCard 
                            className="flex-1 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-cyan-400/30"
                            glowColor="bg-cyan-200"
                            text={
                                <span className="text-2xl font-medium tracking-wide text-white">
                                    "After all, we are creators, collaborators, and life-long learners."
                                </span>
                            } 
                        />
                    </div>

                    <div className="lg:col-span-1 h-full">
                        <MagneticCard 
                            className="h-full"
                            glowColor="bg-emerald-400"
                            text="That's why we keep learning—through workshops, webinars, and events we organize with support from our (internal) communities and external partners." 
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ImpactSectionOption3;
