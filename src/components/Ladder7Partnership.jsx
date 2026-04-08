import React, { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

// --- BUTTON SAAS ---
const SaasButton = () => {
    return (
        <a 
            href="https://ladder7.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-full text-black bg-white px-3 py-1 sm:px-4 sm:py-2 border border-white text-xs sm:text-sm transition-colors duration-300 text-[17px] font-medium font-poppins hover:shadow-[0_15px_30px_rgba(87,194,255,0.4)] hover:-translate-y-1 inline-flex"
        >
            <span className="absolute inset-0 w-full h-full bg-[#dbe8f0] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
            <span className="relative z-10 flex items-center gap-3 text-black transition-colors duration-300">
                Learn More
            </span>
        </a>
    );
};

// --- MAIN COMPONENT: OPTION 9 ---
const Ladder7Partnership = () => {
    // Mouse tracking for the entire parallax radar layout
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    // Smooth framer-motion physical springs
    const springX = useSpring(0, { stiffness: 50, damping: 20 });
    const springY = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        springX.set(mousePosition.x);
        springY.set(mousePosition.y);
    }, [mousePosition, springX, springY]);

    const handleMouseMove = (e) => {
        // Normalize mouse coordinates from -1 to 1 based on screen size so center is 0,0
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setMousePosition({ x, y });
    };

    // Parallax Multipliers for the central core and various floating satellites 
    // They move in opposing directions and at different speeds to create a 3D orbit feel
    const coreX = useTransform(springX, [-1, 1], [-15, 15]);
    const coreY = useTransform(springY, [-1, 1], [-15, 15]);
    
    const badgeX = useTransform(springX, [-1, 1], [-40, 40]);
    const badgeY = useTransform(springY, [-1, 1], [-40, 40]);

    const headingX = useTransform(springX, [-1, 1], [30, -30]);
    const headingY = useTransform(springY, [-1, 1], [30, -30]);

    const textX = useTransform(springX, [-1, 1], [-25, 25]);
    const textY = useTransform(springY, [-1, 1], [50, -50]);

    const buttonX = useTransform(springX, [-1, 1], [45, -45]);
    const buttonY = useTransform(springY, [-1, 1], [-20, 20]);

    return (
        <section 
            onMouseMove={handleMouseMove}
            className="relative w-full min-h-[700px] lg:h-[85vh] lg:min-h-[800px] flex items-center justify-center overflow-hidden bg-[#001c3d] py-20 lg:py-0"
        >
            {/* Ambient Core Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#57C2FF]/10 rounded-full blur-[150px] pointer-events-none z-0" />

            {/* RADAR SVG BACKPACK */}
            <svg className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none">
                {/* Concentric Tech Rings */}
                <circle cx="50%" cy="50%" r="20%" stroke="#57C2FF" strokeWidth="1" fill="none" strokeDasharray="4 6" opacity="0.5" />
                <circle cx="50%" cy="50%" r="35%" stroke="#00b4d8" strokeWidth="1" fill="none" strokeDasharray="4 12" opacity="0.3" />
                <circle cx="50%" cy="50%" r="50%" stroke="#57C2FF" strokeWidth="1" fill="none" strokeDasharray="2 20" opacity="0.1" />
                
                {/* Crosshairs Tracker Lines */}
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#57C2FF" strokeWidth="1" opacity="0.2" strokeDasharray="4 8" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#57C2FF" strokeWidth="1" opacity="0.2" strokeDasharray="4 8" />
            </svg>

            {/* 3D SCENE CONTAINER */}
            <div className="relative w-full max-w-[1400px] h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-[6%] sm:px-[10%] gap-12 lg:gap-0 z-10 pointer-events-none">

                {/* --- WRITINGS COLUMN (Left Side on Desktop, Top on Mobile) --- */}
                <div className="flex flex-col gap-6 w-full lg:max-w-[600px] z-30 order-2 lg:order-1 items-center lg:items-start text-center lg:text-left">
                    
                    {/* SATELLITE 1: STRATEGIC PARTNERSHIP BADGE */}
                    <motion.div 
                        style={{ x: badgeX, y: badgeY }}
                        className="pointer-events-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#001c3d]/80 backdrop-blur-md border border-[#57C2FF]/40 shadow-[0_0_20px_rgba(87,194,255,0.3)] hover:scale-105 transition-transform cursor-default">
                            <span className="w-2 h-2 rounded-full bg-[#57C2FF] animate-pulse" />
                            <span className="text-[#57C2FF] text-xs sm:text-sm font-bold tracking-widest uppercase font-poppins">Strategic Partnership</span>
                        </div>
                    </motion.div>

                    {/* SATELLITE 2: MAIN HEADING */}
                    <motion.div 
                        style={{ x: headingX, y: headingY }}
                        className="pointer-events-auto w-full"
                    >
                        <div className="p-4 sm:p-6 rounded-[24px] bg-[#001c3d]/60 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-[#57C2FF]/40 transition-all hover:translate-x-0 lg:hover:translate-x-2">
                            <h2 className="text-[#57C2FF] text-[20pt] sm:text-3xl md:text-4xl lg:text-5xl font-medium font-poppins leading-tight">
                                Ladder7 <br className="hidden sm:block"/> 
                                Nextstep Solutions
                            </h2>
                        </div>
                    </motion.div>

                    {/* SATELLITE 3: PARAGRAPH BLOCK */}
                    <motion.div 
                        style={{ x: textX, y: textY }}
                        className="pointer-events-auto w-full"
                    >
                        <div className="p-5 sm:p-8 rounded-[32px] bg-[#001c3d]/60 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-[#57C2FF]/30 transition-all">
                            <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed font-poppins text-justify sm:text-left">
                                Ladder7 Nextstep Solutions is a training academy based in India focused on enhancing the technical skills of their attendees. Through our partnership, we are able to provide opportunities for real-world experience to students, and also provide the companies we serve with top talent.
                            </p>
                        </div>
                    </motion.div>

                    {/* SATELLITE 4: THE SAAS BUTTON */}
                    <motion.div 
                        style={{ x: buttonX, y: buttonY }}
                        className="pointer-events-auto"
                    >
                        <div className="relative group/btn cursor-pointer">
                            <SaasButton />
                            <div className="absolute inset-0 rounded-full border-[2px] border-[#57C2FF] animate-ping opacity-30 group-hover/btn:border-white transition-colors" />
                        </div>
                    </motion.div>
                </div>

                {/* THE CORE: PUSHED TO THE RIGHT (Desktop) or BOTTOM (Mobile) */}
                <motion.div 
                    style={{ x: coreX, y: coreY }}
                    className="relative lg:absolute lg:right-[6%] xl:right-[10%] w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] rounded-full overflow-hidden border-[2px] sm:border-[4px] border-[#57C2FF]/30 shadow-[0_0_80px_rgba(87,194,255,0.4)] z-20 group cursor-crosshair pointer-events-auto order-1 lg:order-2"
                >
                    {/* Hover reveal mechanic: dims without hover, fully reveals image on hover */}
                    <div className="absolute inset-0 bg-[#001c3d]/30 z-10 transition-colors duration-700 group-hover:bg-transparent pointer-events-none" />
                    <img 
                        src="/home/ladder7.jpg" 
                        alt="Ladder7 Core" 
                        className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    />
                    
                    {/* Internal lens edge light */}
                    <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none mix-blend-overlay z-20" />
                </motion.div>

            </div>
        </section>
    );
};

export default Ladder7Partnership;
