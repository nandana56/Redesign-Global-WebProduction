import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const HeroEarthCanvas = lazy(() => import('./HeroEarthCanvas'));


// ── CURVE-SWEEP BUTTON ─────────────────────────────────────────────────────────
const ThemeButton = ({ to, text, isOutlined = false }) => {
    const baseClasses = isOutlined
        ? "group relative overflow-hidden inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-white font-poppins text-xs sm:text-sm border border-white hover:border-gray-100 transition-all duration-300"
        : "group relative overflow-hidden inline-flex items-center justify-center bg-white text-black px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-poppins text-xs sm:text-sm border border-white hover:bg-gray-100 transition-all duration-300";

    const sweepColor = isOutlined ? "bg-[#57C2FF]" : "bg-[#dbe8f0]";
    const textColorOnHover = isOutlined ? "group-hover:text-white" : "group-hover:text-black";

    return (
        <Link to={to} className={baseClasses}>
            {/* Sweeping curve effect */}
            <span className={`absolute inset-0 ${sweepColor} w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-[400ms] ease-out z-0`}>
                <svg
                    className={`absolute w-[20%] h-full right-[-19%] top-0 ${isOutlined ? "text-[#57C2FF]" : "text-[#dbe8f0]"}`}
                    fill="currentColor"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <path d="M0,0 Q100,50 0,100 Z" />
                </svg>
            </span>
            <span className={`relative z-10 flex items-center gap-2 ${textColorOnHover} transition-colors duration-300`}>
                {text}
            </span>
        </Link>
    );
};

// ── SLIDER DOT NAVIGATION ──────────────────────────────────────────────────────
const SliderDots = ({ total, current, onSelect }) => (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {Array.from({ length: total }).map((_, i) => (
            <button
                key={i}
                onClick={() => onSelect(i)}
                className={`transition-all duration-500 rounded-full border border-white/60 ${i === current
                    ? "w-8 h-3 bg-white scale-110"
                    : "w-3 h-3 bg-transparent hover:bg-white/50"
                    }`}
                aria-label={`Go to slide ${i + 1}`}
            />
        ))}
    </div>
);

// ── ARROW NAVIGATION ───────────────────────────────────────────────────────────
const ArrowBtn = ({ direction, onClick }) => (
    <button
        onClick={onClick}
        aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
        className="absolute top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#57C2FF] hover:border-[#57C2FF] transition-all duration-300"
        style={{ [direction === "prev" ? "left" : "right"]: "24px" }}
    >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
            />
        </svg>
    </button>
);

// ── SLIDE DATA ─────────────────────────────────────────────────────────────────
const slides = [
    {
        id: "hero",
        bgImage: "/home/digital-app-innovation-banner-image.jpg",
    },
    {
        id: "innovation",
        bgImage: "/home/istockphoto-477698565-170667a.jpg",
    },
];



// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
const HeroPartnership = () => {
    const [shouldMount, setShouldMount] = React.useState(false);

    React.useEffect(() => {
        // Defer mounting WebGL to not block the main thread during initial LCP paint
        // A longer delay (1500ms) ensures heavily throttled devices (like PageSpeed Insights)
        // have enough time to finish FCP and LCP before spinning up the GPU.
        const timer = setTimeout(() => setShouldMount(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const contentVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (delay) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: "easeOut" } }),
    };

    return (
        <section className="relative overflow-hidden w-full h-[85vh] min-h-[550px] bg-[#050B1C]">

            {/* ── BACKGROUND ── */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/home/digital-app-innovation-banner-image.jpg"
                    alt="Technology Solutions Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    fetchPriority="high"
                    loading="eager"
                    decoding="sync"
                />
            </div>

            {/* ── 3D Earth Overlay (auto-remounts on context loss) ── */}
            {shouldMount && (
                <Suspense fallback={<div className="absolute top-[-2%] sm:top-[-4%] right-[0%] sm:right-[5%] md:right-[8%] w-[280px] sm:w-[450px] md:w-[550px] h-[280px] sm:h-[450px] md:h-[550px] z-30 pointer-events-none" />}>
                    <HeroEarthCanvas />
                </Suspense>
            )}

            {/* ── UI content (Extreme Left) ── */}
            <div className="relative z-20 h-full w-full flex items-center justify-start px-6 sm:pl-12 md:pl-20 pt-20 md:pt-0">
                <div className="max-w-4xl">
                    {/* Title */}
                    <div className="overflow-hidden mb-4">
                        <motion.h1
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            custom={0}
                            className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6EAFF] to-[#FFFFFF] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins font-bold mb-2 text-left"
                        >
                            TECHNOLOGY SOLUTIONS
                        </motion.h1>
                        <motion.h1
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            custom={0.1}
                            className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6EAFF] to-[#FFFFFF] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-left drop-shadow-sm"
                        >
                            WITH GLOBAL IMPACT
                        </motion.h1>
                    </div>

                    {/* Buttons */}
                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0.4}
                        className="flex flex-row justify-start gap-4 sm:gap-6 mt-8"
                    >
                        <ThemeButton to="/services" text="All Services" isOutlined={false} />
                        <ThemeButton to="/about" text="About Us" isOutlined={true} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroPartnership;
