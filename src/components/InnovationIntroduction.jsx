import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ── Shared Button Component ──
const ThemeButton = ({ to, text, isOutlined = false }) => {
    const baseClasses = isOutlined
        ? "group relative overflow-hidden inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-white font-poppins text-xs sm:text-sm border border-white hover:border-gray-100 transition-all duration-300"
        : "group relative overflow-hidden inline-flex items-center justify-center bg-white text-black px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-poppins text-xs sm:text-sm border border-white hover:bg-gray-100 transition-all duration-300";

    const sweepColor = isOutlined ? "bg-[#57C2FF]" : "bg-[#dbe8f0]";
    const textColorOnHover = isOutlined ? "group-hover:text-white" : "group-hover:text-black";

    return (
        <Link to={to} className={baseClasses}>
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

const innovationSlides = [
    {
        label: "Who We Are",
        heading: "Your Partner in Digital Innovation",
        description: "Global Web Production is your digital solutions partner specializing in web and mobile development, UI/UX design, branding, business transformation, and AI-powered automation. We combine creative expertise with strategic insight to deliver scalable, results-driven solutions—from building intuitive platforms and compelling brand identities to optimizing business processes and enabling intelligent, data-driven decisions. Our mission is to help organizations innovate, grow, and thrive in a fast-changing digital world.",
        btnText: "Discover More",
        link: "/about",
        bgImage: "/home/digital_transformation_era_en_top_img.jpg"
    },
    {
        label: "Scale · Transform · Innovate",
        heading: "Enterprise Solutions",
        description: "Our Enterprise Solutions empower organizations to streamline operations, enhance scalability, and drive innovation through a blend of advanced technology and strategic insight. From custom enterprise application development and high-performance, SEO-optimized enterprise website builds to CRM implementation, AI-driven automation, data analytics, and cloud transformation, we deliver solutions tailored to complex business needs. We also support change management, process optimization, and enterprise-grade cybersecurity, ensuring every solution we deploy is secure, compliant, and future-ready. With a focus on measurable outcomes, we help enterprises adapt quickly, optimize resources, and gain a competitive edge in a rapidly evolving digital landscape.",
        btnText: "Explore Enterprise",
        link: "/services/enterprise",
        bgImage: "/images/enterprise.jpg"
    }
];

const InnovationIntroduction = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
    const [isPaused, setIsPaused] = useState(false);
    const autoPlayRef = useRef();

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? "20%" : "-20%",
            opacity: 0,
            filter: "blur(10px)"
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                x: { type: "spring", stiffness: 100, damping: 20 },
                opacity: { duration: 0.5 },
                filter: { duration: 0.5 }
            }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? "20%" : "-20%",
            opacity: 0,
            filter: "blur(10px)",
            transition: {
                x: { type: "spring", stiffness: 100, damping: 20 },
                opacity: { duration: 0.5 },
                filter: { duration: 0.5 }
            }
        })
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
        visible: { 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    const nextSlide = () => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % innovationSlides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + innovationSlides.length) % innovationSlides.length);
    };

    useEffect(() => {
        if (!isPaused) {
            autoPlayRef.current = setInterval(nextSlide, 10000);
        }
        return () => clearInterval(autoPlayRef.current);
    }, [current, isPaused]);

    return (
        <section className="relative w-full py-12 lg:py-20 bg-[#003153] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-20" 
                 style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #57C2FF 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="relative z-10 w-full"
                >
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
                        
                        {/* Text Content Column */}
                        <div className="w-full lg:w-[55%] flex flex-col justify-center order-2 lg:order-1">
                            {/* Glassmorphism Content Card */}
                            <motion.div 
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="w-full p-6 sm:p-7 md:p-8 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-3xl relative overflow-hidden group"
                            >
                                {/* Animated border beam effect */}
                                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#57C2FF] to-transparent animate-[shimmer_4s_infinite]" />
                                    <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#57C2FF] to-transparent animate-[shimmer_4s_infinite_reverse]" />
                                </div>

                                {/* Pause/Play toggle in the top right of the card */}
                                <div className="absolute top-5 right-5 sm:top-7 sm:right-7 z-20">
                                    <button 
                                        onClick={() => setIsPaused(!isPaused)}
                                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 border backdrop-blur-md ${isPaused ? 'bg-[#57C2FF]/20 text-[#57C2FF] border-[#57C2FF]/30' : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'}`}
                                        title={isPaused ? "Play" : "Pause"}
                                        aria-label={isPaused ? "Play Auto-Scroll" : "Pause Auto-Scroll"}
                                    >
                                        {isPaused ? (
                                            <svg className="w-4 h-4 ml-0.5 fill-current" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                {/* Floating effect container */}
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {/* Label */}
                                    <motion.span
                                        variants={itemVariants}
                                        className="inline-block text-[#57C2FF] text-xs sm:text-sm font-poppins font-bold uppercase tracking-[0.3em] mb-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/5"
                                    >
                                        {innovationSlides[current].label}
                                    </motion.span>

                                    {/* Heading */}
                                    <motion.h2
                                        variants={itemVariants}
                                        className="text-white text-xl sm:text-2xl md:text-3xl lg:text-5xl font-poppins font-bold leading-tight mb-6"
                                    >
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#57C2FF] via-white to-white">
                                            {innovationSlides[current].heading}
                                        </span>
                                    </motion.h2>

                                    {/* Animated underline */}
                                    <motion.div
                                        variants={itemVariants}
                                        className="h-1.5 w-20 bg-gradient-to-r from-[#57C2FF] to-white rounded-full mb-8 shadow-[0_0_15px_rgba(87,194,255,0.4)]"
                                    />

                                    {/* Description */}
                                    <motion.p
                                        variants={itemVariants}
                                        className="text-white/80 text-sm sm:text-base font-poppins leading-relaxed mb-10 max-w-xl"
                                    >
                                        {innovationSlides[current].description}
                                    </motion.p>

                                    {/* Button */}
                                    <motion.div variants={itemVariants}>
                                        <ThemeButton to={innovationSlides[current].link} text={innovationSlides[current].btnText} isOutlined={false} />
                                    </motion.div>
                                </motion.div>

                                {/* Decorative glow inside card */}
                                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#57C2FF]/5 rounded-full blur-[100px] pointer-events-none" />
                            </motion.div>
                        </div>

                        {/* Image Column (Thematic Image) */}
                        <div className="w-full lg:w-[45%] flex justify-center order-1 lg:order-2">
                            <div className="relative w-full max-w-[480px] group">
                                {/* Large background glow for image */}
                                <div className="absolute inset-0 m-auto w-[80%] h-[80%] bg-[#57C2FF]/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
                                
                                <motion.div 
                                    variants={itemVariants}
                                    className="relative z-10 aspect-[4/5] sm:aspect-square rounded-[2.5rem] overflow-hidden border border-white/10 shadow-4xl"
                                >
                                    <motion.img 
                                        key={innovationSlides[current].bgImage}
                                        initial={{ scale: 1.15, filter: "brightness(0.8)" }}
                                        animate={{ scale: 1, filter: "brightness(1)" }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                        src={innovationSlides[current].bgImage} 
                                        alt={innovationSlides[current].heading}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    {/* Stylish overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                                </motion.div>

                                {/* Floating decorative element */}
                                <motion.div
                                    animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hidden sm:block z-20"
                                />
                                <motion.div
                                    animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -top-6 -left-6 w-16 h-16 bg-[#57C2FF]/10 backdrop-blur-md rounded-2xl border border-white/10 hidden sm:block z-20"
                                />
                            </div>
                        </div>

                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Pagination Controls */}
            <div className="relative z-40 mt-10 mb-4 flex justify-center w-full">
                <div className="flex items-center gap-8 bg-[#001f33]/60 backdrop-blur-2xl border border-white/10 px-8 py-3.5 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    {/* Subtle internal animated glow */}
                    <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#57C2FF]/10 to-transparent -translate-x-full animate-[shimmer_5s_infinite] pointer-events-none" />

                    {/* Previous Button */}
                    <motion.button 
                        whileHover={{ scale: 1.1, x: -4 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => { clearInterval(autoPlayRef.current); prevSlide(); }}
                        className="relative z-10 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300 group p-1"
                        aria-label="Previous Slide"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 12H5M5 12L12 19M5 12L12 5" />
                        </svg>
                        {/* Glow on hover */}
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300" />
                    </motion.button>

                    {/* Slide Indicators */}
                    <div className="relative z-10 flex items-center gap-3">
                        {innovationSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    clearInterval(autoPlayRef.current);
                                    if (index > current) setDirection(1);
                                    else if (index < current) setDirection(-1);
                                    setCurrent(index);
                                }}
                                className="group relative py-2 flex items-center justify-center outline-none"
                                aria-label={`Go to slide ${index + 1}`}
                            >
                                <div 
                                    className={`h-1.5 w-10 rounded-full transition-all duration-500 ease-out origin-left ${
                                        index === current 
                                        ? 'bg-gradient-to-r from-[#57C2FF] to-white shadow-[0_0_12px_rgba(87,194,255,0.7)] scale-x-100 opacity-100' 
                                        : 'bg-white/20 scale-x-[0.25] opacity-50 group-hover:scale-x-[0.4] group-hover:opacity-70'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <motion.button 
                        whileHover={{ scale: 1.1, x: 4 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => { clearInterval(autoPlayRef.current); nextSlide(); }}
                        className="relative z-10 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300 group p-1"
                        aria-label="Next Slide"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12H19M19 12L12 19M19 12L12 5" />
                        </svg>
                        {/* Glow on hover */}
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300" />
                    </motion.button>
                </div>
            </div>

        </section>
    );
};

export default InnovationIntroduction;
