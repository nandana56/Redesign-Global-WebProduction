import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
    PerspectiveCamera, Html, 
    Environment, ContactShadows, PresentationControls, Float
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Send, Globe, ArrowUpRight, 
    User, Mail, Briefcase, MessageSquare, 
    CheckCircle2, Info, Facebook, Linkedin 
} from "lucide-react";

// --- 3D Monolith Component ---
const Monolith = ({ activeTab }) => {
    const meshRef = useRef();
    
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.15;
        meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    });

    return (
        <group>
            <mesh ref={meshRef}>
                <boxGeometry args={[3.8, 5.5, 0.4]} />
                <meshStandardMaterial 
                    color="#020617" 
                    roughness={0.05} 
                    metalness={0.9} 
                    envMapIntensity={2}
                />
                
                <mesh position={[0, 0, 0.201]}>
                    <planeGeometry args={[3.5, 5.1]} />
                    <meshStandardMaterial 
                        color="#0a192f" 
                        emissive="#4bb5f8" 
                        emissiveIntensity={0.2}
                        transparent
                        opacity={0.95}
                    />
                    
                    <Html 
                        transform 
                        distanceFactor={2.5} 
                        position={[0, 0, 0.01]} 
                        className="pointer-events-none select-none"
                    >
                        <div className="w-[850px] h-[1250px] p-16 text-white flex flex-col font-public-sans">
                            <AnimatePresence mode="wait">
                                {activeTab === 'featured' ? (
                                    <motion.div 
                                        key="featured"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="space-y-12"
                                    >
                                        <div className="flex items-center gap-6 text-blue-400 font-black tracking-[0.5em] uppercase text-2xl">
                                            <Info className="w-10 h-10" />
                                            Active_Transmission
                                        </div>
                                        <div className="w-full aspect-[16/10] rounded-[3rem] overflow-hidden border-4 border-white/5 shadow-2xl">
                                            <img 
                                                src="/Assets/aiblog-.webp" 
                                                alt="Featured" 
                                                className="w-full h-full object-cover" 
                                            />
                                        </div>
                                        <div className="space-y-6">
                                            <h3 className="text-7xl font-black leading-tight tracking-tighter uppercase italic">
                                                AI-Powered <br /> <span className="text-blue-500 not-italic">Optimizer.</span>
                                            </h3>
                                            <p className="text-3xl text-white/40 leading-relaxed font-light">
                                                Enhancing UX through intelligent content orchestration and real-time user mapping. Creating optimized resonance.
                                            </p>
                                        </div>
                                        <div className="pt-12 flex items-center justify-between border-t-2 border-white/5">
                                            <span className="text-2xl text-blue-400 font-black tracking-widest">GWP_STREAM // 01</span>
                                            <div className="flex items-center gap-4 text-white text-3xl font-black">
                                                UPLINK <ArrowUpRight className="w-10 h-10" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="locations"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="space-y-20"
                                    >
                                        <div className="flex items-center gap-6 text-blue-400 font-black tracking-[0.5em] uppercase text-2xl">
                                            <Globe className="w-10 h-10" />
                                            Global_Nodes
                                        </div>
                                        
                                        <div className="space-y-12">
                                            <div className="flex gap-12 items-center bg-white/5 p-12 rounded-[3.5rem] border-2 border-white/5 group">
                                                <div className="w-40 h-24 rounded-2xl overflow-hidden shadow-xl">
                                                    <img src="/Assets/usa-flag.webp" alt="USA" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="text-5xl font-black mb-2 uppercase tracking-tighter">United States</div>
                                                    <div className="text-3xl text-white/30 font-light">Temecula, California Node</div>
                                                </div>
                                            </div>

                                            <div className="flex gap-12 items-center bg-white/5 p-12 rounded-[3.5rem] border-2 border-white/5 group">
                                                <div className="w-40 h-24 rounded-2xl overflow-hidden shadow-xl">
                                                    <img src="/Assets/indian-flag.webp" alt="India" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="text-5xl font-black mb-2 uppercase tracking-tighter">India</div>
                                                    <div className="text-3xl text-white/30 font-light">Trivandrum, Kerala Node</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-12 border-t-2 border-white/5">
                                            <div className="text-3xl text-white/10 uppercase tracking-[0.6em] font-black italic">
                                                Persistence Established.
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Html>
                </mesh>
            </mesh>
        </group>
    );
};

// --- Scrambled Text Hook ---
const useScrambledText = (text, delay = 0) => {
    const [displayedText, setDisplayedText] = useState("");
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayedText(
                text.split("")
                    .map((char, index) => {
                        if (index < iterations) return text[index];
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 2;
        }, 30);
        
        return () => clearInterval(interval);
    }, [text]);

    return displayedText;
};

const BUSINESS_AREAS = [
    {
        label: "── Agentic AI – Copilot ──",
        options: [
            { value: "AI-Powered-Sales", text: "AI-Powered Agentic Sales Assistant" },
            { value: "Role-Specific", text: "Ask Me – Role Specific" },
            { value: "Knowledge-Agent", text: "Ask Me – Knowledge Agent" },
            { value: "Request-Intake", text: "Request Intake Agent" },
            { value: "WebOps-Agent", text: "Content Update Agent for WebOps" },
            { value: "Content-Checker", text: "Aria Label / Alt Text Generator" }
        ]
    },
    {
        label: "── Agentic AI – Custom ──",
        options: [
            { value: "Supervisor", text: "Supervisor Agent" },
            { value: "Document-Extractor", text: "AI Document Extractor" },
            { value: "HR-Assistant", text: "HR Assistant" },
            { value: "IQ-Assessment", text: "AI-Powered Aptitude & IQ" }
        ]
    },
    {
        label: "── Products & Services ──",
        options: [
            { value: "Site360ai", text: "Site360.ai" },
            { value: "Quality-Checker", text: "Quality Checker Extension" },
            { value: "Web-Dev", text: "Web Development" },
            { value: "Managed-Services", text: "Managed Services" },
            { value: "SEO-Performance", text: "SEO & Site Performance" }
        ]
    }
];

const ContactMonolith = () => {
    const [activeTab, setActiveTab] = useState('featured');
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const title = useScrambledText("TRANSMIT VISION.", 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const inputClasses = "w-full bg-transparent border-white/10 border-b py-6 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500 transition-all duration-700 font-light text-2xl uppercase tracking-widest";

    return (
        <section className="relative min-h-[120vh] bg-[#020617] overflow-hidden py-32">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[250px]" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[200px]" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-[1920px] mx-auto min-h-screen">
                
                {/* LEFT: THE 3D SPATIAL WINDOW */}
                <div className="relative h-[700px] lg:h-screen lg:sticky lg:top-0 order-2 lg:order-1 flex items-center justify-center">
                    <Canvas shadows dpr={[1, 2]} className="w-full h-full">
                        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={35} />
                        <Environment preset="city" />
                        <ambientLight intensity={0.4} />
                        <pointLight position={[10, 10, 10]} intensity={2} color="#4bb5f8" />
                        
                        <PresentationControls
                            global
                            config={{ mass: 2, tension: 500 }}
                            snap={{ mass: 4, tension: 1500 }}
                            rotation={[0, -0.2, 0]}
                            polar={[-Math.PI / 8, Math.PI / 8]}
                            azimuth={[-Math.PI / 4, Math.PI / 4]}
                        >
                            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                                <Monolith activeTab={activeTab} />
                            </Float>
                        </PresentationControls>
                        
                        <ContactShadows 
                            opacity={0.4} scale={15} blur={3} far={4} resolution={512} color="#000000" 
                            position={[0, -4, 0]}
                        />
                    </Canvas>
                    
                    {/* Floating Controls for the Monolith */}
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-6 bg-white/5 backdrop-blur-3xl p-3 rounded-3xl border border-white/10 shadow-2xl">
                        <button 
                            onClick={() => setActiveTab('featured')}
                            className={`px-10 py-4 rounded-2xl font-black transition-all text-xs uppercase tracking-[0.4em] ${activeTab === 'featured' ? 'bg-blue-600 text-white shadow-[0_0_40px_rgba(37,99,235,0.4)]' : 'text-white/20 hover:text-white'}`}
                        >
                            Insight
                        </button>
                        <button 
                            onClick={() => setActiveTab('locations')}
                            className={`px-10 py-4 rounded-2xl font-black transition-all text-xs uppercase tracking-[0.4em] ${activeTab === 'locations' ? 'bg-blue-600 text-white shadow-[0_0_40px_rgba(37,99,235,0.4)]' : 'text-white/20 hover:text-white'}`}
                        >
                            Nodes
                        </button>
                    </div>
                </div>

                {/* RIGHT: THE MINIMALIST FORM PANEL */}
                <div className="relative px-8 sm:px-20 lg:px-32 py-24 lg:py-48 flex flex-col justify-center order-1 lg:order-2 border-l border-white/5">
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <header className="mb-24">
                            <h2 className="text-7xl sm:text-9xl font-black text-white mb-8 tracking-tighter leading-none">
                                {title}
                            </h2>
                            <p className="text-white/30 text-2xl font-light leading-relaxed max-w-xl">
                                Direct uplink established. Transmit your project requirements through our secure neural portal.
                            </p>
                        </header>

                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.form 
                                    key="form"
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-20"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                        <div className="relative group">
                                            <input type="text" placeholder="FIRST IDENTITY" required className={inputClasses} />
                                            <User className="absolute right-0 top-8 text-white/5 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                        <div className="relative group">
                                            <input type="text" placeholder="LAST IDENTITY" required className={inputClasses} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                        <div className="relative group">
                                            <input type="text" placeholder="ENTITY NAME" className={inputClasses} />
                                            <Briefcase className="absolute right-0 top-8 text-white/5 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                        <div className="relative group">
                                            <input type="email" placeholder="VECTOR ADDRESS" required className={inputClasses} />
                                            <Mail className="absolute right-0 top-8 text-white/5 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <label className="text-[10px] uppercase tracking-[0.6em] text-blue-500 font-black mb-4 block">Protocol_Selection</label>
                                        <select required className={`${inputClasses} appearance-none cursor-pointer outline-none border-blue-500/20`}>
                                            <option value="" disabled selected className="bg-[#020617] text-white/10 uppercase">Select Target Area</option>
                                            {BUSINESS_AREAS.map((group, idx) => (
                                                <optgroup key={idx} label={group.label} className="bg-[#020617] text-blue-400 font-black py-4">
                                                    {group.options.map((opt, oIdx) => (
                                                        <option key={oIdx} value={opt.value} className="bg-[#020617] text-white py-2">
                                                            {opt.text}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="relative group">
                                        <textarea placeholder="TRANSMISSION DATA" rows="2" required className={`${inputClasses} resize-none`}></textarea>
                                        <MessageSquare className="absolute right-0 top-8 text-white/5 group-hover:text-blue-500 transition-colors" />
                                    </div>

                                    <div>
                                        <motion.button 
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit" 
                                            className="group flex items-center gap-16"
                                        >
                                            <span className="text-5xl font-black uppercase tracking-tighter group-hover:text-blue-500 transition-colors italic">
                                                INITIALIZE
                                            </span>
                                            <div className="relative w-28 h-28 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:border-blue-500 transition-colors shadow-2xl">
                                                <Send className="w-10 h-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity blur-xl" />
                                            </div>
                                        </motion.button>
                                    </div>
                                    
                                    <div className="pt-32 flex gap-12 items-center border-t border-white/5">
                                        <span className="text-[10px] uppercase tracking-[0.8em] text-white/10 font-black">Social Uplink</span>
                                        <div className="flex gap-10">
                                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white/20 hover:text-white hover:scale-125 transition-all">
                                                <Facebook className="w-8 h-8" />
                                            </a>
                                            <a href="https://www.linkedin.com/company/global-web-production/posts/?feedView=all" target="_blank" rel="noreferrer" className="text-white/20 hover:text-white hover:scale-125 transition-all">
                                                <Linkedin className="w-8 h-8" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.form>
                            ) : (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 space-y-16"
                                >
                                    <h3 className="text-[10rem] font-black text-white tracking-tighter leading-none italic uppercase">Sent.</h3>
                                    <div className="flex items-center gap-6 text-blue-500">
                                        <CheckCircle2 className="w-12 h-12" />
                                        <span className="text-3xl font-black uppercase tracking-[0.4em]">Propagating...</span>
                                    </div>
                                    <p className="text-white/30 text-3xl font-light leading-relaxed max-w-lg">
                                        Your vision is currently being decoded by the GWP central intelligence. Expect a response on this vector shortly.
                                    </p>
                                    <button 
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-white/10 hover:text-blue-500 uppercase tracking-[0.5em] text-sm font-black border-b border-white/5 pb-4 transition-all"
                                    >
                                        New Transmission
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactMonolith;
