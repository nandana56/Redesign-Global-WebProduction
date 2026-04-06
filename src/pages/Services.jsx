import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesIconsHub from "../components/ServicesIconsHub";

gsap.registerPlugin(ScrollTrigger);

const services = [
    { id: "enterprise", title: "Enterprise Solutions", desc: "Scale · Transform · Innovate" },
    { id: "smb", title: "SMB Solutions", desc: "Grow · Compete · Thrive" },
    { id: "consulting", title: "Global Consulting", desc: "Strategize · Implement · Succeed" },
];

const Services = () => {
    const mainContainerRef = useRef(null);
    const heroSectionRef = useRef(null);
    const leftBlockRef = useRef(null);
    const rightBlockRef = useRef(null);

    useEffect(() => {
        // Simple entrance animation instead of split reveal
        gsap.fromTo([leftBlockRef.current, rightBlockRef.current], 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
        );
    }, []);

    return (
        <div ref={mainContainerRef} className="bg-[#062055] min-h-screen">
            {/* Unified Hero Section */}
            <div 
                ref={heroSectionRef} 
                className="relative min-h-[80vh] w-full flex flex-col md:flex-row shadow-sm border-b border-white/10 overflow-hidden bg-[#062055]"
                style={{
                    backgroundImage: "url('/services/New%20Project.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                
                {/* Ambient Subtle Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#52b8f4]/5 rounded-full blur-[100px] translate-y-1/2 pointer-events-none"></div>


                {/* Left Block: 3D Component */}
                <div 
                    ref={leftBlockRef} 
                    className="w-full md:w-1/2 min-h-[40vh] md:min-h-full relative flex items-center justify-center bg-transparent z-20"
                >
                    {/* Content */}
                    <div className="w-full flex items-center justify-center">
                        <ServicesIconsHub />
                    </div>
                </div>

                {/* Right Block: 'Our Services' text */}
                <div 
                    ref={rightBlockRef} 
                    className="w-full md:w-1/2 min-h-[40vh] md:min-h-full relative flex items-center justify-center bg-transparent z-20"
                >
                    {/* Content */}
                    <div className="p-8 md:p-16 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-[#52b8f4] drop-shadow-sm font-poppins">
                                Our Services
                            </h1>
                            <p className="text-white max-w-xl text-xl md:text-2xl leading-relaxed font-poppins font-medium drop-shadow-lg">
                                We offer a comprehensive suite of digital solutions to help your business innovate and grow.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content Sections (Expanded) */}
            <div className="w-full relative z-40">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative overflow-hidden border-y border-white/10 bg-[#0d2b4b]/60 backdrop-blur-sm"
                >
                    {/* Background Animation (Optional: adjusted opacity for subtle feel) */}
                    <div
                        className="absolute inset-0 z-0 pointer-events-none"
                        style={{
                            backgroundImage: "url('/images/High Tech Animation.gif')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.4
                        }}
                    />

                    <div className="relative z-[2] grid md:grid-cols-2 lg:grid-cols-4 gap-12 px-8 py-24 md:px-16 lg:px-24">
                        {/* Application Services & Engineering */}
                        <div className="space-y-8">
                            <h2 className="text-xl font-bold leading-tight min-h-[3.5rem] flex items-start text-white border-l-2 border-[#52b8f4] pl-4">
                                Application Services & Engineering
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    "Application Support Services",
                                    "Enterprise Platform Services",
                                    "CRM Implementation",
                                    "Software Product Development",
                                    "Quality Engineering & Assurance",
                                    "Engineering Research and Development",
                                    "Business Process Services"
                                ].map((item) => (
                                    <li key={item} className="text-gray-300 text-sm hover:text-[#52b8f4] transition-colors cursor-default">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-xs text-[#52b8f4] leading-relaxed italic">
                                    Future-ready applications built to scale, focusing on modern application engineering, business agility, and cloud-first solutions.
                                </p>
                            </div>
                        </div>

                        {/* Data, AI & Automation */}
                        <div className="space-y-8">
                            <h2 className="text-xl font-bold leading-tight min-h-[3.5rem] flex items-start text-white border-l-2 border-[#52b8f4] pl-4">
                                Data, AI & Automation
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    "Data & AI",
                                    "Agentic AI Solutions",
                                    "Intelligent Business Automations",
                                    "GWP Insights",
                                    "Experimentation & Optimization"
                                ].map((item) => (
                                    <li key={item} className="text-gray-300 text-sm hover:text-[#52b8f4] transition-colors cursor-default">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-xs text-[#52b8f4] leading-relaxed italic">
                                    Unleashing intelligence from data to power personalization, automation, and performance through machine learning, predictive analytics, and AI lifecycle management.
                                </p>
                            </div>
                        </div>

                        {/* Strategy & Transformation Consulting */}
                        <div className="space-y-8">
                            <h2 className="text-xl font-bold leading-tight min-h-[3.5rem] flex items-start text-white border-l-2 border-[#52b8f4] pl-4">
                                Strategy & Transformation Consulting
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    "Technology Consulting",
                                    "Digital Strategy",
                                    "Sustainability & Resilience"
                                ].map((item) => (
                                    <li key={item} className="text-gray-300 text-sm hover:text-[#52b8f4] transition-colors cursor-default">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-xs text-[#52b8f4] leading-relaxed italic">
                                    Aligning technology with strategic business objectives and ensuring long-term digital resilience.
                                </p>
                            </div>
                        </div>

                        {/* Creative & Experience Services */}
                        <div className="space-y-8">
                            <h2 className="text-xl font-bold leading-tight min-h-[3.5rem] flex items-start text-white border-l-2 border-[#52b8f4] pl-4">
                                Creative & Experience Services
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    "Experience Studio",
                                    "Content Services",
                                    "Branding",
                                    "Games Production & Development",
                                    "Accessibility"
                                ].map((item) => (
                                    <li key={item} className="text-gray-300 text-sm hover:text-[#52b8f4] transition-colors cursor-default">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-xs text-[#52b8f4] leading-relaxed italic">
                                    Building human-centric digital products, experience-driven design, and inclusive branding.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Services;
