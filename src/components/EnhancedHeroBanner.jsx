import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Custom Arrows for the Slider
const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} z-50 right-6 before:content-[''] group`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#57C2FF] hover:border-[#57C2FF] transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} z-50 left-6 before:content-[''] group`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#57C2FF] hover:border-[#57C2FF] transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </div>
        </div>
    );
};

// Reusable Background Shapes Overlay
const BackgroundShapes = () => (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Shape 1: Top Right Animated Ring */}
        <motion.div
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] right-[10%] w-32 h-32 rounded-full border-[6px] border-[#57C2FF]/20"
        />
        {/* Shape 2: Bottom Left Dashed Rotating Box */}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[20%] left-[5%] w-24 h-24 border-dashed border-2 border-white/20 rounded-lg"
        />
        {/* Shape 3: Center Left Small Pulsing Dot */}
        <motion.div
            animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[30%] left-[45%] w-4 h-4 rounded-full bg-[#57C2FF]"
        />
        {/* Shape 4: Right Glowing Blue Orb */}
        <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[-5%] w-96 h-96 bg-[#57C2FF]/20 rounded-full blur-[80px]"
        />
        {/* Shape 5: Bottom Center White Dash */}
        <motion.div
            animate={{ x: [0, -40, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[10%] left-[40%] w-16 h-2 bg-white/10 rounded-full"
        />
        {/* Shape 6: Top Left Large Blue Overlay Glow */}
        <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"
        />
    </div>
);

// Reusable Theme Button with Sweep Effect
const ThemeButton = ({ to, text, isOutlined = false }) => {
    // Determine the base styles depending on if it's the primary filled button or a secondary outlined one
    const baseClasses = isOutlined
        ? "group relative overflow-hidden inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-white font-bold text-xs sm:text-sm font-poppins border-2 border-white hover:border-[#57C2FF] transition-all duration-300"
        : "group relative overflow-hidden inline-flex items-center justify-center bg-white text-black px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm font-poppins border border-white transition-all duration-300";

    const sweepColor = isOutlined ? "bg-[#57C2FF]" : "bg-[#dbe8f0]";
    const textColorOnHover = isOutlined ? "group-hover:text-white" : "group-hover:text-black";

    return (
        <Link to={to} className={baseClasses}>
            {/* Sweeping curve effect (SVG Mask Transition) */}
            <span className={`absolute inset-0 ${sweepColor} w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-[400ms] ease-out z-0`}>
                <svg className={`absolute w-[20%] h-full right-[-19%] top-0 text-${isOutlined ? '[#57C2FF]' : '[#dbe8f0]'}`} fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,0 Q100,50 0,100 Z" />
                </svg>
            </span>
            <span className={`relative z-10 flex items-center gap-2 ${textColorOnHover} transition-colors duration-300`}>
                {text}
            </span>
        </Link>
    );
};


const EnhancedHeroBanner = () => {
    // Track the current slide index to trigger animations when the slide changes
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500, // 1.5s fade transition to match procainconsulting
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: false,
        fade: true, // Seamless fade effect
        beforeChange: (current, next) => setCurrentSlideIndex(next),
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        appendDots: dots => (
            <div style={{ bottom: "30px", zIndex: 50 }}>
                <ul className="m-0 flex justify-center gap-2">{dots}</ul>
            </div>
        ),
        customPaging: i => (
            <div className="w-3 h-3 border border-white rounded-full bg-transparent hover:bg-white transition-all duration-300 cursor-pointer 
               slick-active:bg-white slick-active:scale-125" />
        )
    };

    const slides = [
        {
            id: 1,
            // Original HeroBanner content
            title: "TECHNOLOGY SOLUTIONS",
            titleHighlight: "WITH GLOBAL IMPACT",
            btnLink: "/services",
            btnText: "All Services",
            secondaryBtnLink: "/about",
            secondaryBtnText: "About Us",
            bgImage: "/home/bg-1.webp",
            // For custom styling to match original precisely
            titleClassName: "text-transparent bg-clip-text bg-gradient-to-r from-[#C6EAFF] to-[#FFFFFF] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins font-bold mb-2",
        },

        {
            id: 3,
            // Original Ladder7 content
            title: "Ladder7 Nextstep Solutions",
            desc: "Ladder7 Nextstep Solutions is a training academy based in India focused on enhancing the technical skills of their attendees. Through our partnership, we are able to provide opportunities for real-world experience to students, and also provide the companies we serve with top talent.",
            btnLink: "#",
            btnText: "Learn More",
            bgImage: "/home/bg-3.webp",
            titleClassName: "text-[#57C2FF] text-[24pt] sm:text-xl md:text-2xl lg:text-3xl font-medium mb-3 md:mb-4 lg:mb-6 font-poppins",
            descClassName: "text-white text-sm sm:text-base leading-relaxed font-poppins",
        }
    ];

    return (
        <section className="relative overflow-hidden w-full bg-[#050B1C]">
            <Slider {...settings} className="h-screen min-h-[600px] w-full relative z-20">
                {slides.map((slide, index) => {
                    // Check if this slide is the current one (slider sends beforeChange to update index)
                    const isActive = currentSlideIndex === index;

                    return (
                        <div key={slide.id} className="relative h-screen min-h-[600px] w-full outline-none flex items-center">
                            {/* Slide Background Image Layer */}
                            <motion.div
                                className="absolute inset-0 z-0 origin-center"
                                // Zoom out subtly while slide is active
                                animate={{ scale: isActive ? 1 : 1.15 }}
                                transition={{ duration: 6, ease: "easeOut" }}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(${slide.bgImage})`,
                                        backgroundColor: '#0a192f',
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/60 sm:bg-black/50" />
                            </motion.div>

                            {/* Geometric Floating Shapes */}
                            <BackgroundShapes />

                            {/* Slide Content Box */}
                            <div className={`h-full max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-20 flex items-center pt-20 ${slide.centered ? "justify-center text-center" : "justify-start"}`}>
                                <div className={`${slide.centered ? "max-w-3xl" : "max-w-4xl"} w-full`}>

                                    {/* Main Title Animation Container */}
                                    <div className="overflow-hidden mb-6">
                                        <motion.div
                                            initial={{ y: 50, opacity: 0 }}
                                            animate={isActive ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        >
                                            <h1 className={slide.titleClassName}>
                                                {slide.title}
                                            </h1>
                                            {slide.titleHighlight && (
                                                <h1 className={slide.titleClassName}>
                                                    {slide.titleHighlight}
                                                </h1>
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Description Animation Container */}
                                    {slide.desc && (
                                        <div className="overflow-hidden mb-8">
                                            <motion.div
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={isActive ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                                                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                                            >
                                                <p className={slide.descClassName}>
                                                    {slide.desc}
                                                </p>
                                            </motion.div>
                                        </div>
                                    )}

                                    {/* Buttons Animation Container */}
                                    <div className="overflow-hidden">
                                        <motion.div
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={isActive ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                                            className={`flex flex-wrap gap-4 sm:gap-6 mt-4 ${slide.centered ? "justify-center" : "justify-start"}`}
                                        >
                                            <ThemeButton to={slide.btnLink} text={slide.btnText} isOutlined={false} />

                                            {slide.secondaryBtnLink && (
                                                <ThemeButton to={slide.secondaryBtnLink} text={slide.secondaryBtnText} isOutlined={true} />
                                            )}
                                        </motion.div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>

            {/* Custom inject CSS to style the active slick dot */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .slick-dots li.slick-active div {
                    background-color: white !important;
                    transform: scale(1.3);
                }
            `}} />
        </section>
    );
};

export default EnhancedHeroBanner;
