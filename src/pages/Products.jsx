import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DynamicPartnerCTA from "../components/DynamicPartnerCTA";

gsap.registerPlugin(ScrollTrigger);

const productsData = [
    {
        id: "site360",
        title: "Site360.ai",
        desc: "Site 360.ai provides a single, real-time intelligence layer across the entire enterprise website ecosystem.",
        img: "/Assets/Site360.webp",
        hasPrimaryBtn: true,
    },
    {
        id: "content_search",
        title: "Content Search",
        desc: "The Content Search Tool is a custom internal application designed to automatically scan large sets of web pages and identify specific keywords, references, and dependencies.",
        img: "/Assets/ContentChecker1.webp",
        hasPrimaryBtn: false,
    },
    {
        id: "quality_checker",
        title: "Quality Checker",
        desc: "The Quality Checker Extension enables QA teams to perform fast, accurate pre-publish audits directly within the browser.",
        img: "/Assets/QualityChecker.webp",
        hasPrimaryBtn: false,
    }
];

const Products = () => {
    const maskRef = useRef(null);
    const wireframeRef = useRef(null);
    const heroRef = useRef(null);
    const [activeAccordion, setActiveAccordion] = useState(0);

    useEffect(() => {
        // Geometric clip-path morphing animation using 6-point polygons
        const polygons = [
            "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)", // Hexagon Default
            "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%, 50% 0%)",   // Pentagon-ish (6 points via overlap)
            "polygon(10% 10%, 100% 0%, 85% 100%, 30% 80%, 0% 100%, 0% 50%)",   // Sharp irregular
            "polygon(30% 0%, 70% 10%, 100% 80%, 80% 100%, 10% 90%, 0% 40%)"    // Slanted irregular
        ];

        let tl = gsap.timeline({ repeat: -1, yoyo: true });
        
        polygons.forEach((poly, index) => {
             if (index === 0) return; // Skip initial state
             
             // Animate the image mask
             tl.to(maskRef.current, {
                 clipPath: poly,
                 duration: 1.2,
                 ease: "sine.inOut"
             }, index * 1.2);

             // Synchronize wireframe accent with a slight offset/delay
             if (wireframeRef.current) {
                 tl.to(wireframeRef.current, {
                     clipPath: poly,
                     duration: 1.2,
                     ease: "sine.inOut"
                 }, index * 1.2);
             }
        });

        // Add an organic floating effect to the entire mask container
        gsap.to(maskRef.current, {
            y: -20,
            rotation: 2,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, []);

    const titleLetters = "PRODUCTS".split("");

    const letterVariants = {
        hidden: { opacity: 0, x: -30, rotateY: -90 },
        visible: { 
            opacity: 1, 
            x: 0, 
            rotateY: 0,
            transition: { type: "spring", stiffness: 180, damping: 12 } 
        }
    };

    return (
        <main className="bg-[#061e4f] min-h-screen text-white overflow-hidden">
            {/* Hero container */}
            <section ref={heroRef} className="relative h-screen w-full flex items-center px-6 sm:px-10 md:px-16 lg:px-24">
                
                {/* Subtle Ambient Background Orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-[#57C2FF]/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-[50vw] h-[50vw] bg-blue-700/10 rounded-full blur-[150px]"></div>
                </div>

                {/* Left Side: Heavy Left-Aligned Content */}
                <div className="w-full lg:w-1/2 flex flex-col z-20 space-y-8 pt-20">
                    
                    {/* Cascading Title Block */}
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                        className="flex flex-col"
                        style={{ perspective: "1000px" }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white flex flex-wrap gap-x-1">
                            {titleLetters.map((letter, i) => (
                                <motion.span key={i} variants={letterVariants} className="inline-block origin-left">
                                    {letter}
                                </motion.span>
                            ))}
                        </h1>
                    </motion.div>

                    {/* Paragraph with Decorative Left Border Highlight */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                        className="flex items-stretch space-x-6 pl-2"
                    >
                        <div className="w-1 bg-gradient-to-b from-[#57C2FF] to-blue-600 rounded-full"></div>
                        <p className="text-base sm:text-lg md:text-xl max-w-md text-gray-300 font-light leading-relaxed py-2 drop-shadow-md">
                            Grade solutions designed to scan, analyze, and protect your entire digital ecosystem with precision.
                        </p>
                    </motion.div>

                    {/* Staggered Button Entrance with Interactive Aura */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
                        className="pt-4 lg:pt-8"
                    >
                        <div className="relative inline-block group cursor-pointer">
                            {/* Framer Motion Rotating Aura */}
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-8px] bg-gradient-to-r from-[#57C2FF] via-blue-600 to-indigo-500 rounded-[40px] opacity-0 group-hover:opacity-40 blur-xl transition-all duration-700 pointer-events-none"
                            />
                            
                            <button className="relative z-10 rounded-full bg-white text-black px-8 py-3 text-sm font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 active:scale-95 active:bg-gray-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                Contact Us
                            </button>
                        </div>
                    </motion.div>

                </div>

                {/* Right Side: Floating Geometric Mask Image Layer */}
                <div className="hidden lg:flex absolute right-0 w-[55%] xl:w-[60%] h-full items-center justify-start relative z-10 -ml-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                        className="relative w-full h-[85vh] max-h-[850px] drop-shadow-[0_20px_50px_rgba(87,194,255,0.2)]"
                    >
                        {/* Dynamic Geometric Clip-Path Container */}
                        <div 
                            ref={maskRef}
                            className="w-full h-full relative overflow-hidden bg-white/5"
                            style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)" }}
                        >
                            <img 
                                src="/products/laptop_meeting_test.jpg" 
                                alt="Business Workspace" 
                                className="w-full h-full object-cover scale-[1.05]"
                            />
                            {/* Inner dark gradient overlay for mood */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#020617]/80 to-transparent"></div>
                        </div>

                        {/* Faint Wireframe Outline Accent (Synchronized clip-path) */}
                        <div 
                            ref={wireframeRef}
                            className="absolute inset-0 border-[1.5px] border-[#57C2FF]/40 scale-[1.01] pointer-events-none"
                            style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)" }}
                        ></div>
                    </motion.div>
                </div>
                
                {/* Scroll Down Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none md:hidden"
                >
                    <motion.div 
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-[1px] h-10 bg-gradient-to-b from-gray-400 to-transparent"
                    />
                </motion.div>

            </section>

            {/* The Orbiting Constellation Section */}
            <section className="bg-[#061e4f] text-white pt-24 pb-10 lg:pt-40 lg:pb-16 w-full flex flex-col items-center justify-center overflow-hidden z-30 relative border-t border-white/5">
                
                {/* Section Label */}
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-xs uppercase tracking-[0.5em] text-blue-400 font-black mb-12"
                >
                    Strategic Ecosystem
                </motion.h2>

                <div className="relative w-full max-w-7xl flex flex-col lg:flex-row items-center lg:justify-center gap-12 lg:gap-16 px-4 lg:px-8">
                    
                    {/* The Constellation Map (Desktop) */}
                    <div className="hidden lg:block relative w-[650px] h-[650px] shrink-0">
                        
                        {/* Central Core */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                            <motion.div 
                                animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/30 to-[#04153b] border border-blue-500/50 flex items-center justify-center shadow-[0_0_60px_rgba(75,181,248,0.25)]"
                            >
                                <span className="text-[10px] font-black tracking-widest uppercase text-blue-400">GWP-CORE</span>
                            </motion.div>
                        </div>

                        {/* Orbiting Nodes */}
                        {productsData.map((item, idx) => {
                            const angles = [270, 30, 150]; // top, bottom-right, bottom-left
                            const angle = angles[idx];
                            const radius = 260;
                            const rad = (angle * Math.PI) / 180;
                            const x = Math.cos(rad) * radius;
                            const y = Math.sin(rad) * radius;
                            const isActive = activeAccordion === idx;

                            return (
                                <React.Fragment key={item.id}>
                                    {/* SVG Laser Line from center to node */}
                                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" viewBox="0 0 700 700">
                                        <motion.line
                                            x1="350" y1="350"
                                            x2={350 + x} y2={350 + y}
                                            stroke={isActive ? '#57C2FF' : 'rgba(87,194,255,0.15)'}
                                            strokeWidth={isActive ? 2 : 1}
                                            strokeDasharray={isActive ? '0' : '4 4'}
                                            animate={{ opacity: isActive ? 1 : 0.4 }}
                                            transition={{ duration: 0.5 }}
                                        />
                                        {isActive && (
                                            <motion.circle
                                                cx={350 + x} cy={350 + y} r="6"
                                                fill="#57C2FF"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: [1, 1.5, 1] }}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                            />
                                        )}
                                    </svg>

                                    {/* Floating Node */}
                                    <motion.div
                                        onMouseEnter={() => setActiveAccordion(idx)}
                                        onClick={() => setActiveAccordion(idx)}
                                        animate={{ 
                                            y: isActive ? -8 : [0, -6, 0],
                                            scale: isActive ? 1.15 : 1,
                                        }}
                                        transition={isActive 
                                            ? { type: 'spring', stiffness: 300, damping: 20 } 
                                            : { repeat: Infinity, duration: 3 + idx, ease: 'easeInOut' }
                                        }
                                        className={`absolute z-20 cursor-pointer flex flex-col items-center gap-3 group`}
                                        style={{ 
                                            top: `calc(50% + ${y}px - 64px)`, 
                                            left: `calc(50% + ${x}px - 64px)` 
                                        }}
                                    >
                                        <div className={`w-32 h-32 rounded-full overflow-hidden border-2 transition-all duration-500 shadow-lg ${
                                            isActive 
                                                ? 'border-[#57C2FF] shadow-[0_0_30px_rgba(87,194,255,0.5)]' 
                                                : 'border-white/20 group-hover:border-white/50'
                                        }`}>
                                            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <span className={`text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${
                                            isActive ? 'text-[#57C2FF]' : 'text-gray-500 group-hover:text-gray-300'
                                        }`}>
                                            {item.title}
                                        </span>
                                    </motion.div>
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* Detail Panel (Desktop: slides in from right | Mobile: always visible as cards) */}
                    <div className="w-full lg:w-[500px] xl:w-[550px] min-h-[400px] relative">
                        <AnimatePresence mode="wait">
                            {activeAccordion !== null ? (
                                <motion.div
                                    key={activeAccordion}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                    className="relative w-full rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                                >
                                    <div className="relative h-[220px] w-full">
                                        <img 
                                            src={productsData[activeAccordion].img} 
                                            alt={productsData[activeAccordion].title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] to-transparent"></div>
                                    </div>
                                    <div className="p-10">
                                        <h3 className="text-3xl lg:text-4xl font-black mb-4">{productsData[activeAccordion].title}</h3>
                                        <p className="text-base lg:text-lg text-gray-300 font-light leading-relaxed mb-8">
                                            {productsData[activeAccordion].desc}
                                        </p>
                                        <div className="flex flex-wrap gap-4">
                                            {productsData[activeAccordion].hasPrimaryBtn && (
                                                <button className="px-8 py-3 rounded-full font-bold text-sm bg-[#57C2FF] text-black hover:bg-white transition-all shadow-[0_0_20px_rgba(87,194,255,0.4)]">
                                                    Explore Platform
                                                </button>
                                            )}
                                            <button className="px-8 py-3 border border-white/40 rounded-full font-semibold text-sm text-white hover:bg-white hover:text-black transition-all">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hidden lg:flex w-full h-full items-center justify-center"
                                >
                                    <p className="text-gray-600 text-sm tracking-widest uppercase">Hover a node to explore</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Fallback: Simple stacked cards */}
                    <div className="lg:hidden flex flex-col gap-6 w-full">
                        {productsData.map((item) => (
                            <div key={item.id} className="relative overflow-hidden rounded-[30px] border border-white/10">
                                <div className="absolute inset-0 z-0">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-50" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20"></div>
                                </div>
                                <div className="relative z-10 p-8 flex flex-col items-start space-y-4">
                                    <h3 className="text-3xl font-black">{item.title}</h3>
                                    <p className="text-gray-300">{item.desc}</p>
                                    <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
                                        {item.hasPrimaryBtn && (
                                            <button className="w-full px-6 py-3 rounded-full font-bold text-sm bg-[#57C2FF] text-black shadow-lg">Explore Platform</button>
                                        )}
                                        <button className="w-full px-6 py-3 border border-white/50 rounded-full font-semibold text-white">Learn More</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
            
            {/* Newly Designed Partner CTA Section */}
            <DynamicPartnerCTA />
            
        </main>
    );
};

export default Products;
