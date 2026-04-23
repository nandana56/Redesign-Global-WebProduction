import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { 
    User, Mail, Briefcase, MessageSquare, Send, 
    Facebook, Linkedin, ArrowUpRight, Globe, Sparkles, 
    CheckCircle2, Search, MapPin
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NeuralNetworkScene from './NeuralNetworkScene';
import LazyCanvas from './LazyCanvas';

gsap.registerPlugin(ScrollTrigger);

const NexusCard = ({ children, className = "", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`bg-[#000021]/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl hover:border-blue-500/30 transition-colors duration-700 p-8 ${className}`}
    >
        {children}
    </motion.div>
);

const BUSINESS_AREAS = [
    {
        label: "── Agentic AI – Copilot ──",
        options: [
            { value: "AI-Powered-Agentic-Sales-Assistant", text: "AI-Powered Agentic Sales Assistant | Co-Pilot Based" },
            { value: "Ask-Me-Role-Specific", text: "Ask Me – Role Specific | Finetuned & Orchestrated" },
            { value: "Ask-Me-Knowledge-Agent", text: "Ask Me – Knowledge Agent | Corporate Brain" },
            { value: "Request-Intake-Agent", text: "Request Intake Agent | Reporting & Dashboards" },
            { value: "Content-Update-Agent-WebOps", text: "Content Update Agent for WebOps (Connected to WP)" },
            { value: "Content-Checker-Agent", text: "Aria Label / Alt Text Generator / Content Checker Agent" }
        ]
    },
    {
        label: "── Agentic AI – Custom ──",
        options: [
            { value: "Supervisor-Agent", text: "Supervisor Agent" },
            { value: "AI-Document-Extractor", text: "AI Document Extractor" },
            { value: "HR-Assistant", text: "HR Assistant" },
            { value: "Aptitude-IQ-Assessment", text: "AI-Powered Aptitude & IQ Assessment" }
        ]
    },
    {
        label: "── Products ──",
        options: [
            { value: "Site360ai", text: "Site360.ai" },
            { value: "Quality-Checker-Extension", text: "Quality Checker Extension" },
            { value: "Content-Search-Tools", text: "Content Search Tools" }
        ]
    },
    {
        label: "── Services ──",
        options: [
            { value: "Accelerated-WordPress-Development", text: "Accelerated WordPress Development with AI" },
            { value: "web-development", text: "Web Development" },
            { value: "Managed-Services", text: "Managed Services" },
            { value: "Testing-QA", text: "Testing / QA" },
            { value: "Accessibility-Compliance", text: "Web Accessibility" },
            { value: "Experimentation", text: "Experimentation" },
            { value: "Salesforce", text: "CRM Solutions" },
            { value: "seo", text: "SEO & Site Performance" },
            { value: "Staffing-Solutions", text: "Staffing Solutions" },
            { value: "Analytics-Technology-Implementation", text: "Analytics Technology Implementation" },
            { value: "Automation", text: "Automation" },
            { value: "AI-Enablement", text: "AI Enablement" },
            { value: "Content-Services", text: "Content Services" }
        ]
    }
];

const ContactNeuralNexus = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFormActive, setIsFormActive] = useState(false);
    const containerRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pl-14 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 font-public-sans";

    return (
        <section ref={containerRef} className="relative w-full py-24 px-6 lg:px-16 bg-[#040816] overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    
                    {/* FORM MODULE - Main Card */}
                    <NexusCard className="lg:col-span-8 p-10 lg:p-14" delay={0.1}>
                        <div className="flex flex-col gap-2 mb-10">
                            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter">
                                Send us a <span className="text-blue-500 italic">message.</span>
                            </h2>
                            <p className="text-white/40 max-w-xl text-lg font-light leading-relaxed">
                                We want to hear from you! Contact our team to learn about the services and language solutions we can provide to aid your business.
                            </p>
                        </div>

                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.form 
                                    key="form"
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                    onFocus={() => setIsFormActive(true)}
                                    onBlur={() => setIsFormActive(false)}
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="relative">
                                            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500/50" />
                                            <input type="text" placeholder="First Name*" required className={inputClasses} />
                                        </div>
                                        <div className="relative">
                                            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500/50" />
                                            <input type="text" placeholder="Last Name*" required className={inputClasses} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="relative">
                                            <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500/50" />
                                            <input type="text" placeholder="Company" className={inputClasses} />
                                        </div>
                                        <div className="relative">
                                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500/50" />
                                            <input type="email" placeholder="Email*" required className={inputClasses} />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500/50" />
                                        <select required className={`${inputClasses} appearance-none cursor-pointer pr-12`}>
                                            <option value="" disabled selected className="bg-[#000021]">Select a Business Area*</option>
                                            {BUSINESS_AREAS.map((group, idx) => (
                                                <optgroup key={idx} label={group.label} className="bg-[#000021] text-blue-400 font-bold py-2">
                                                    {group.options.map((opt, oIdx) => (
                                                        <option key={oIdx} value={opt.value} className="bg-[#000021] text-white py-1">
                                                            {opt.text}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                        <ArrowUpRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none rotate-45" />
                                    </div>

                                    <div className="relative">
                                        <MessageSquare className="absolute left-6 top-6 w-4 h-4 text-blue-500/50" />
                                        <textarea placeholder="How can we help you?*" rows="4" required className={`${inputClasses} resize-none pt-5`}></textarea>
                                    </div>

                                    <motion.button 
                                        type="submit" 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white font-black uppercase tracking-[0.3em] rounded-2xl flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:bg-blue-500 transition-all duration-300"
                                    >
                                        <Send className="w-5 h-5" /> Send Message
                                    </motion.button>
                                </motion.form>
                            ) : (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-16 text-center"
                                >
                                    <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/50">
                                        <CheckCircle2 className="w-12 h-12 text-blue-400" />
                                    </div>
                                    <h3 className="text-4xl font-bold text-white mb-4">Message Transmission Complete</h3>
                                    <p className="text-white/40 text-lg">Establishing connection... Our team will respond shortly.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </NexusCard>

                    {/* INTERACTIVE MODULES - Right Panel */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        
                        {/* 3D Visualizer Tile */}
                        <NexusCard className="h-full min-h-[300px] flex flex-col p-0 relative group" delay={0.2}>
                            <div className="absolute inset-0 z-0">
                                <LazyCanvas>
                                    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                                        <NeuralNetworkScene isFormActive={isFormActive} />
                                    </Canvas>
                                </LazyCanvas>
                            </div>
                            <div className="relative z-10 p-8 flex flex-col h-full justify-between pointer-events-none">
                                <span className="text-blue-500 font-black text-xs tracking-[0.4em] uppercase">Status: Online</span>
                                <h4 className="text-white font-bold text-xl leading-snug">Neural Connection established.</h4>
                            </div>
                        </NexusCard>

                        {/* Featured Article Tile */}
                        <NexusCard className="flex flex-col gap-6" delay={0.3}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-wider">Featured</span>
                                <Sparkles className="w-4 h-4 text-blue-500" />
                            </div>
                            <div className="aspect-video rounded-2xl overflow-hidden border border-white/5">
                                <img src="/Assets/aiblog-.webp" alt="AI Optimizer" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-2">AI-Powered Web Content Optimizer</h4>
                                <p className="text-white/40 text-sm leading-relaxed mb-6 font-light">
                                    Enhancing UX through intelligent content orchestration...
                                </p>
                                <a href="/blogs" className="flex items-center gap-2 text-blue-400 font-black text-xs tracking-widest uppercase hover:text-white transition-colors group">
                                    Read Full Article <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            </div>
                        </NexusCard>
                    </div>

                    {/* BOTTOM MODULES */}
                    
                    {/* Locations Tile */}
                    <NexusCard className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8" delay={0.4}>
                        <div className="flex flex-col gap-6">
                            <h4 className="text-blue-500 font-black text-[10px] tracking-[0.4em] uppercase flex items-center gap-3">
                                <Globe className="w-4 h-4" /> GWP Nodes
                            </h4>
                            <div className="space-y-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-8 rounded overflow-hidden shadow-lg border border-white/20">
                                        <img src="/Assets/usa-flag.webp" alt="USA" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm tracking-widest uppercase">United States</div>
                                        <div className="text-white/30 text-xs font-light">Temecula, California</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-8 rounded overflow-hidden shadow-lg border border-white/20">
                                        <img src="/Assets/indian-flag.webp" alt="India" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm tracking-widest uppercase">India</div>
                                        <div className="text-white/30 text-xs font-light">Trivandrum, Kerala</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex flex-col justify-end">
                            <p className="text-white/20 text-xs font-mono uppercase text-right">Coordinate established: [8.52N 76.93E]</p>
                        </div>
                    </NexusCard>

                    {/* Socials Tile */}
                    <NexusCard className="lg:col-span-4 flex flex-col justify-between" delay={0.5}>
                        <div>
                            <h4 className="text-blue-500 font-black text-[10px] tracking-[0.4em] uppercase mb-8">Social Sync</h4>
                            <div className="flex gap-4">
                                <a href="https://www.facebook.com/globalwebproduction/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-blue-600 hover:scale-110 transition-all duration-500">
                                    <Facebook className="w-6 h-6" />
                                </a>
                                <a href="https://www.linkedin.com/company/global-web-production/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-blue-700 hover:scale-110 transition-all duration-500">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] mt-8">Establishing persistent uplink...</p>
                    </NexusCard>
                </div>
            </div>
        </section>
    );
};

export default ContactNeuralNexus;
