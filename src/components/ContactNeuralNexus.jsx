import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
    Send, MapPin, Globe, ArrowUpRight, 
    User, Mail, Briefcase, MessageSquare, 
    CheckCircle2, Sparkles, Facebook, Linkedin 
} from "lucide-react";

// --- Animated Neural Pathway Component ---
const NeuralPath = ({ start, end, active }) => {
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
            <motion.path
                d={`M ${start.x} ${start.y} C ${(start.x + end.x) / 2} ${start.y}, ${(start.x + end.x) / 2} ${end.y}, ${end.x} ${end.y}`}
                stroke={active ? "#3b82f6" : "rgba(255,255,255,0.05)"}
                strokeWidth={active ? "2" : "1"}
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ 
                    pathLength: 1,
                    stroke: active ? "#3b82f6" : "rgba(255,255,255,0.05)",
                    strokeWidth: active ? 2 : 1
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />
            {active && (
                <motion.circle
                    r="3"
                    fill="#60a5fa"
                    animate={{
                        offsetDistance: ["0%", "100%"]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ offsetPath: `path("M ${start.x} ${start.y} C ${(start.x + end.x) / 2} ${start.y}, ${(start.x + end.x) / 2} ${end.y}, ${end.x} ${end.y}")` }}
                />
            )}
        </svg>
    );
};

// --- Floating Nexus Module ---
const NexusModule = ({ children, className = "", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-10 p-8 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl hover:border-blue-500/30 transition-colors duration-700 ${className}`}
    >
        {children}
    </motion.div>
);

const ContactNeuralNexus = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activePath, setActivePath] = useState(null);
    const containerRef = useRef(null);

    // Dynamic coordinates for paths (approximate for demo, would be ref-based in production)
    const coordinates = {
        header: { x: "20%", y: "20%" },
        form: { x: "50%", y: "45%" },
        insight: { x: "80%", y: "30%" },
        locations: { x: "75%", y: "70%" },
        socials: { x: "25%", y: "75%" }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300";

    return (
        <section ref={containerRef} className="relative w-full py-32 px-6 lg:px-16 bg-[#040816] overflow-hidden min-h-screen">
            
            {/* Background Neural Network (SVGs) */}
            <div className="absolute inset-0 pointer-events-none opacity-50">
                <NeuralPath start={{x: 200, y: 200}} end={{x: 800, y: 400}} active={activePath === 'form'} />
                <NeuralPath start={{x: 1400, y: 300}} end={{x: 800, y: 450}} active={activePath === 'insight'} />
                <NeuralPath start={{x: 800, y: 600}} end={{x: 1200, y: 800}} active={activePath === 'locations'} />
                <NeuralPath start={{x: 400, y: 850}} end={{x: 700, y: 650}} active={activePath === 'socials'} />
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px]" />

            <div className="max-w-7xl mx-auto flex flex-col items-center">
                
                {/* 1. HEADER MODULE */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-24 max-w-3xl"
                >
                    <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic">
                        The <span className="text-blue-500 not-italic">Nexus.</span>
                    </h2>
                    <p className="text-white/40 text-xl font-light leading-relaxed">
                        Establishing a multi-threaded connection to the GWP brain. Transmit your data through the neural network.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
                    
                    {/* 2. FORM MODULE (Central Hub) */}
                    <div className="lg:col-span-8">
                        <NexusModule className="p-10 lg:p-16" onMouseEnter={() => setActivePath('form')} onMouseLeave={() => setActivePath(null)}>
                            <div className="flex items-center gap-4 mb-12">
                                <span className="w-12 h-1 bg-blue-500 rounded-full" />
                                <h3 className="text-3xl font-bold text-white tracking-widest uppercase">Input Module</h3>
                            </div>

                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form 
                                        key="form"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-8"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-blue-400 text-xs font-black tracking-widest uppercase ml-2">
                                                    <User className="w-3 h-3" /> Identity_First
                                                </div>
                                                <input type="text" placeholder="First Name" required className={inputClasses} />
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-blue-400 text-xs font-black tracking-widest uppercase ml-2">
                                                    <User className="w-3 h-3" /> Identity_Last
                                                </div>
                                                <input type="text" placeholder="Last Name" required className={inputClasses} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-blue-400 text-xs font-black tracking-widest uppercase ml-2">
                                                    <Briefcase className="w-3 h-3" /> Entity_Name
                                                </div>
                                                <input type="text" placeholder="Company" className={inputClasses} />
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-blue-400 text-xs font-black tracking-widest uppercase ml-2">
                                                    <Mail className="w-3 h-3" /> Vector_Address
                                                </div>
                                                <input type="email" placeholder="Email" required className={inputClasses} />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-blue-400 text-xs font-black tracking-widest uppercase ml-2">
                                                <Globe className="w-3 h-3" /> Protocol_Select
                                            </div>
                                            <select required className={`${inputClasses} appearance-none cursor-pointer`}>
                                                <option value="" disabled selected className="bg-[#040816]">Select Protocol</option>
                                                <optgroup label="── Intelligent Agents ──" className="bg-[#040816]">
                                                    <option value="Agentic-AI" className="bg-[#040816]">Agentic AI Copilot</option>
                                                    <option value="Custom-AI" className="bg-[#040816]">Custom Agent Systems</option>
                                                </optgroup>
                                                <optgroup label="── Core Services ──" className="bg-[#040816]">
                                                    <option value="Web-Performance" className="bg-[#040816]">Web Performance & SEO</option>
                                                    <option value="Managed-Services" className="bg-[#040816]">Managed Services</option>
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-blue-400 text-xs font-black tracking-widest uppercase ml-2">
                                                <MessageSquare className="w-3 h-3" /> Transmission_Body
                                            </div>
                                            <textarea placeholder="Your vision..." rows="4" required className={`${inputClasses} resize-none`}></textarea>
                                        </div>

                                        <button 
                                            type="submit" 
                                            className="w-full py-6 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] hover:bg-blue-500 hover:text-white transition-all shadow-[0_20px_50px_rgba(59,130,246,0.3)] active:scale-95"
                                        >
                                            Initiate Transmission
                                        </button>
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
                                        <h3 className="text-4xl font-bold text-white mb-4">Transmission Locked</h3>
                                        <p className="text-white/40 text-lg">Your data is currently propagating through the GWP nexus.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </NexusModule>
                    </div>

                    {/* 3. PERIPHERAL MODULES */}
                    <div className="lg:col-span-4 flex flex-col gap-12">
                        
                        {/* Featured Insight node */}
                        <NexusModule className="p-8" onMouseEnter={() => setActivePath('insight')} onMouseLeave={() => setActivePath(null)}>
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-blue-500 font-black text-[10px] tracking-[0.4em] uppercase">Data_Stream</span>
                                <Sparkles className="w-5 h-5 text-blue-500" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-4">AI Web Content Optimizer</h4>
                            <p className="text-white/40 text-sm font-light leading-relaxed mb-6">
                                Enhancing UX through intelligent content orchestration and real-time user mapping.
                            </p>
                            <a href="/blogs" className="group flex items-center gap-2 text-xs font-black text-white/60 hover:text-white transition-colors">
                                LEARN_MORE <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </NexusModule>

                        {/* Location nodes */}
                        <NexusModule className="p-8" onMouseEnter={() => setActivePath('locations')} onMouseLeave={() => setActivePath(null)}>
                            <h4 className="text-blue-500 font-black text-[10px] tracking-[0.4em] uppercase mb-8 flex items-center gap-3">
                                <Globe className="w-4 h-4" /> Global_Nodes
                            </h4>
                            <div className="space-y-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-black text-xs">US</div>
                                    <div>
                                        <div className="text-white font-bold text-sm">Temecula</div>
                                        <div className="text-white/20 text-[10px] uppercase font-black">California</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-black text-xs">IN</div>
                                    <div>
                                        <div className="text-white font-bold text-sm">Trivandrum</div>
                                        <div className="text-white/20 text-[10px] uppercase font-black">Kerala</div>
                                    </div>
                                </div>
                            </div>
                        </NexusModule>

                        {/* Social node */}
                        <NexusModule className="p-8" onMouseEnter={() => setActivePath('socials')} onMouseLeave={() => setActivePath(null)}>
                            <h4 className="text-blue-500 font-black text-[10px] tracking-[0.4em] uppercase mb-8">Social_Sync</h4>
                            <div className="flex gap-6">
                                <a href="https://facebook.com" className="text-white/20 hover:text-white transition-colors">
                                    <Facebook className="w-8 h-8" />
                                </a>
                                <a href="https://linkedin.com" className="text-white/20 hover:text-white transition-colors">
                                    <Linkedin className="w-8 h-8" />
                                </a>
                            </div>
                        </NexusModule>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactNeuralNexus;
