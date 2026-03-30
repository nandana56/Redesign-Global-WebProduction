import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, animate, useMotionValue } from 'framer-motion';

const servicesData = [
    {
        icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", // Code icon
        title: "Application Services & Engineering",
        content: "Global Web Production delivers end-to-end application services and engineering solutions, covering the full lifecycle from strategy and development to modernisation and support. Our expert teams streamline business processes, implement CRM systems, integrate enterprise platforms, and build tailored software solutions to meet specific business needs. We specialise in transforming legacy systems into agile, future-ready architectures, with a strong focus on quality, performance, and scalability. Backed by continuous R&D and emerging technologies, we drive innovation and operational efficiency. At Global Web Production, we engineer outcomes that align with your vision and accelerate digital growth."
    },
    {
        icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", // Data icon
        title: "Data, AI & Automation",
        content: "At Global Web Production, we harness the power of data, artificial intelligence, and automation to build intelligent systems that drive smarter decisions and improved business outcomes. Our expert team leverages advanced analytics, machine learning models, and automation tools to streamline operations, uncover insights, and enable predictive capabilities. From data strategy and AI implementation to workflow automation and intelligent dashboards, we deliver end-to-end solutions tailored to your unique needs. Our focus on precision, scalability, and business impact ensures your systems not only perform better but also evolve with your goals. With GWP Insights, we provide actionable intelligence and continuous optimisation, empowering you to make informed decisions, reduce manual effort, and stay ahead in a rapidly changing digital landscape."
    },
    {
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", // Chart icon
        title: "Strategy & Transformation Consulting",
        content: "Global Web Production empowers organisations to navigate change and drive enterprise transformation through strategic thinking, innovation, and sustainable practices. Our consulting team blends deep industry knowledge with modern methodologies to help you reimagine your business for long-term success. We offer tailored services in technology consulting, digital strategy, and sustainability & resilience. Our experts collaborate closely with your leadership to align business goals with digital capabilities, identify growth opportunities, and future-proof operations. With a strong focus on measurable impact and industry best practices, we guide you through every stage of your transformation journey—ensuring agility, resilience, and competitive advantage in an ever-evolving landscape."
    },
    {
        icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122", // Magic/Creative icon
        title: "Creative & Experience Services",
        content: "At Global Web Production, our Creative & Experience Services are designed to enhance brand value and customer engagement through strategy, design, content, and innovation. From branding and content creation to game development and accessibility, we deliver purposeful, user-centric experiences that are visually compelling and inclusive. Our Experience Studio brings ideas to life with a focus on creativity, functionality, and results—helping your brand connect, stand out, and grow."
    }
];

const ServicesVariety = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
    const [radius, setRadius] = useState(220);
    const autoPlayRef = useRef(null);
    const [orbitSize, setOrbitSize] = useState({ w: 500, h: 500 });
    const orbitContainerRef = useRef(null);
    const lineRotMV = useMotionValue(0);
    const anglePerItem = 360 / servicesData.length;

    // Explicit MotionValues for line endpoint — updated via subscriber so they always reflect
    // the latest orbitSize and radius (useTransform closures go stale after state updates)
    const lineX2MV = useMotionValue(orbitSize.w / 2);
    const lineY2MV = useMotionValue(orbitSize.h / 2 - radius);

    useEffect(() => {
        const updateEndpoint = (deg) => {
            const rad = (deg * Math.PI) / 180;
            lineX2MV.set(orbitSize.w / 2 + radius * Math.sin(rad));
            lineY2MV.set(orbitSize.h / 2 - radius * Math.cos(rad));
        };
        updateEndpoint(lineRotMV.get()); // sync immediately with current angle
        return lineRotMV.on('change', updateEndpoint); // subscribe to future changes
    }, [orbitSize, radius]);

    useEffect(() => {
        const update = () => {
            if (window.innerWidth < 640) setRadius(140);
            else if (window.innerWidth < 1024) setRadius(180);
            else setRadius(220);
            if (orbitContainerRef.current) {
                setOrbitSize({
                    w: orbitContainerRef.current.offsetWidth,
                    h: orbitContainerRef.current.offsetHeight,
                });
            }
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    useEffect(() => {
        if (!isAutoPlayPaused) {
            autoPlayRef.current = setInterval(() => {
                handleNext();
            }, 6000);
        }
        return () => clearInterval(autoPlayRef.current);
    }, [isAutoPlayPaused, activeIndex]);

    // Icons stay at fixed positions; only the line rotates
    const getAngleForIndex = (index) => {
        return index * anglePerItem;
    };

    const handleNodeClick = (index) => {
        animate(lineRotMV, index * anglePerItem, { type: "spring", stiffness: 60, damping: 15 });
        setActiveIndex(index);
        setIsAutoPlayPaused(true);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => {
            const newIndex = (prev - 1 + servicesData.length) % servicesData.length;
            animate(lineRotMV, newIndex * anglePerItem, { type: "spring", stiffness: 60, damping: 15 });
            return newIndex;
        });
        setIsAutoPlayPaused(true);
    };

    const handleNext = () => {
        setActiveIndex((prev) => {
            const newIndex = (prev + 1) % servicesData.length;
            animate(lineRotMV, newIndex * anglePerItem, { type: "spring", stiffness: 60, damping: 15 });
            return newIndex;
        });
        // Don't auto-pause if triggered by the timer
    };

    return (
        <section
            className="relative py-16 lg:py-24 overflow-hidden text-white min-h-[90vh] flex flex-col justify-center bg-[#050B1C]"
        >
            {/* Background Image with Dark Overlay - Adjusted for visibility */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/home/istockphoto-1270899501-2048x2048.jpg" 
                    alt="Orbit Background" 
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050B1C] via-transparent to-[#050B1C] opacity-70" />
                {/* Technical Pattern Overlay */}
                <div className="absolute inset-0 opacity-20" 
                     style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #57C2FF 1px, transparent 0)', backgroundSize: '60px 60px' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col items-center">

                {/* Header Group */}
                <div className="text-center mb-16 max-w-3xl">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block text-white/70 text-sm font-poppins font-semibold uppercase tracking-widest mb-4"
                    >
                        Our Expertise
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 1 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6 font-poppins text-white"
                    >
                        WE OFFER A WIDE VARIETY OF SERVICES
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-block"
                    >
                        <p className="text-white/90 text-sm sm:text-base font-poppins bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full shadow-lg">
                            Click on the orbits to explore. We can also tailor projects to your specific needs.
                        </p>
                    </motion.div>
                </div>

                {/* Main Orbital Layout Container: Grid with Orbit on Left, Content on Right */}
                <div className="flex flex-col lg:flex-row items-center justify-between w-full mt-8 lg:mt-12 gap-12 lg:gap-8">

                    {/* LEFT SIDE: The Interactive Orbit Component */}
                    <div ref={orbitContainerRef} className="w-full lg:w-1/2 flex justify-center items-center relative h-[350px] sm:h-[450px] lg:h-[500px] perspective-1000">
                        {/* Center Decorative Core */}
                        <div className="absolute inset-0 m-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center bg-white/5 backdrop-blur-sm z-10">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full rounded-full border-2 border-dashed border-white/20 absolute"
                            />
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-white to-gray-300 shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-pulse" />
                        </div>

                        {/* Connecting Lines SVG Layer */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                            <defs>
                                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                                    <stop offset="50%" stopColor="rgba(87,194,255,0.5)" />
                                    <stop offset="100%" stopColor="rgba(87,194,255,1)" />
                                </linearGradient>
                            </defs>

                            {/* Main Orbital Path Circle */}
                            <circle 
                                cx="50%" 
                                cy="50%" 
                                r={radius} 
                                fill="none" 
                                stroke="rgba(255,255,255,0.05)" 
                                strokeWidth="1" 
                                strokeDasharray="10, 15"
                            />

                            {/* Rotating Orbit Glow */}
                            <motion.circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                fill="none"
                                stroke="rgba(87,194,255,0.2)"
                                strokeWidth="2"
                                strokeDasharray="50, 200"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                style={{ originX: "50%", originY: "50%" }}
                            />

                            {/* Faint static guide lines to all nodes */}
                            {servicesData.map((_, index) => {
                                const angle = getAngleForIndex(index);
                                const rad = (angle * Math.PI) / 180;
                                const xEnd = orbitSize.w / 2 + radius * Math.sin(rad);
                                const yEnd = orbitSize.h / 2 - radius * Math.cos(rad);
                                return (
                                    <line
                                        key={index}
                                        x1={orbitSize.w / 2}
                                        y1={orbitSize.h / 2}
                                        x2={xEnd}
                                        y2={yEnd}
                                        stroke="rgba(255,255,255,0.05)"
                                        strokeWidth="1"
                                        strokeDasharray="5, 5"
                                    />
                                );
                            })}
                        </svg>

                        {/* Foreground SVG: indicator line above orbit icons (z-30 > icon z-20) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible">
                            <defs>
                                <filter id="glow2" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <motion.line
                                x1={orbitSize.w / 2}
                                y1={orbitSize.h / 2}
                                x2={lineX2MV}
                                y2={lineY2MV}
                                stroke="#57C2FF"
                                strokeWidth="3"
                                strokeLinecap="round"
                                opacity={0.85}
                                filter="url(#glow2)"
                            />
                            <motion.circle
                                cx={lineX2MV}
                                cy={lineY2MV}
                                r="5"
                                fill="#57C2FF"
                                filter="url(#glow2)"
                                opacity={0.9}
                            />
                        </svg>

                        {/* Orbit Mapping */}
                        {servicesData.map((service, index) => {
                            const angle = getAngleForIndex(index);
                            const isActive = activeIndex === index;

                            // Convert angle to radians for coordinates
                            const rad = (angle * Math.PI) / 180;
                            const x = radius * Math.sin(rad);
                            const y = -radius * Math.cos(rad); // Negative because SVG/CSS Y goes down

                            return (
                                <motion.div
                                    key={index}
                                    style={{ position: 'absolute' }}
                                    animate={{
                                        x: x,
                                        y: y,
                                        scale: isActive ? 1.15 : 0.85,
                                        opacity: isActive ? 1 : 0.5,
                                        zIndex: isActive ? 50 : 10
                                    }}
                                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                                    className="z-20 flex flex-col items-center"
                                >
                                    {/* Orbital Node Indicator - Changed from blue to white */}
                                    <button
                                        onClick={() => handleNodeClick(index)}
                                        className={`group relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full transition-all duration-300 ${isActive ? 'bg-gradient-to-b from-white to-gray-200 shadow-[0_0_25px_rgba(255,255,255,0.5)]' : 'bg-white/5 border-2 border-white/30 hover:border-white hover:bg-white/20'}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`w-6 h-6 ${isActive ? 'text-[#050B1C]' : 'text-white'}`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                                        </svg>

                                        {/* Hover Tooltip for inactive nodes */}
                                        {!isActive && (
                                            <span className="absolute -bottom-10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded border border-white/20 pointer-events-none">
                                                {service.title.substring(0, 20)}...
                                            </span>
                                        )}
                                    </button>
                                </motion.div>
                            );
                        })}

                        {/* Mobile Navigation Arrows (Inside Orbit Container) */}
                        <div className="absolute flex justify-between w-full max-w-[320px] top-1/2 -translate-y-1/2 z-30 lg:hidden px-4">
                            <button onClick={() => { setIsAutoPlayPaused(true); handlePrev(); }} className="w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
                                &lt;
                            </button>
                            <button onClick={() => { setIsAutoPlayPaused(true); handleNext(); }} className="w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
                                &gt;
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Dynamic Content Panel - Enhanced Glassmorphism */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center min-h-[400px] bg-white/10 backdrop-blur-xl border border-white/20 p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden transition-all duration-500">
                        {/* Decorative glow inside glass */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                        {/* Auto-play indicator toggle */}
                        <div className="absolute top-6 right-6 z-20">
                            <button
                                onClick={() => setIsAutoPlayPaused(!isAutoPlayPaused)}
                                className={`p-2 rounded-full flex items-center justify-center transition-all duration-300 border ${isAutoPlayPaused ? 'bg-white/10 text-white/50 border-white/20' : 'bg-white/20 text-white border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]'}`}
                                title={isAutoPlayPaused ? "Play" : "Pause"}
                            >
                                {isAutoPlayPaused ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" /></svg>
                                )}
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="w-full"
                            >
                                {/* Step Counter Badge */}
                                <div className="inline-block bg-white/10 border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                                    0{activeIndex + 1} / 0{servicesData.length}
                                </div>

                                <h3 className="text-white text-2xl sm:text-3xl font-bold font-poppins mb-6">
                                    {servicesData[activeIndex].title}
                                </h3>

                                <p className="text-white/80 text-sm sm:text-base font-poppins leading-relaxed mb-8">
                                    {servicesData[activeIndex].content}
                                </p>

                                <Link to="/services">
                                    {/* Using a modernized sweeping button equivalent */}
                                    <button className="group relative overflow-hidden inline-flex items-center justify-center bg-white text-[#050B1C] px-8 py-3 rounded-full font-bold text-sm font-poppins border border-white transition-all duration-300">
                                        <span className={`absolute inset-0 bg-gray-200 w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-[400ms] ease-out z-0`}>
                                            <svg className={`absolute w-[20%] h-full right-[-19%] top-0 text-gray-200`} fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                <path d="M0,0 Q100,50 0,100 Z" />
                                            </svg>
                                        </span>
                                        <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                                            Learn More Details
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    </button>
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ServicesVariety;
