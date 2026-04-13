import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
    PerspectiveCamera, MeshDistortMaterial, Html, 
    Text, Float, Center, PresentationControls, 
    Environment, ContactShadows 
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { 
    Send, MapPin, Globe, ArrowUpRight, 
    User, Mail, Briefcase, MessageSquare, 
    CheckCircle2, Info, Facebook, Linkedin 
} from "lucide-react";

// --- 3D Monolith Component ---
const Monolith = ({ activeTab }) => {
    const meshRef = useRef();
    
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Gentle rotation
        meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.15;
        meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    });

    return (
        <group>
            {/* The Main Obsidian Monolith */}
            <mesh ref={meshRef}>
                <boxGeometry args={[3.5, 5, 0.4]} />
                <meshStandardMaterial 
                    color="#020617" 
                    roughness={0.05} 
                    metalness={0.9} 
                    envMapIntensity={2}
                />
                
                {/* Holographic "Screen" on the front face */}
                <mesh position={[0, 0, 0.201]}>
                    <planeGeometry args={[3.2, 4.6]} />
                    <meshStandardMaterial 
                        color="#0a192f" 
                        emissive="#4bb5f8" 
                        emissiveIntensity={0.2}
                        transparent
                        opacity={0.9}
                    />
                    
                    {/* Content embedded on the Monolith face */}
                    <Html 
                        transform 
                        distanceFactor={2.5} 
                        position={[0, 0, 0.01]} 
                        className="pointer-events-none select-none"
                    >
                        <div className="w-[800px] h-[1150px] p-12 text-white flex flex-col font-outfit">
                            <AnimatePresence mode="wait">
                                {activeTab === 'featured' ? (
                                    <motion.div 
                                        key="featured"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-10"
                                    >
                                        <div className="flex items-center gap-4 text-blue-400 font-bold tracking-[0.3em] uppercase text-2xl">
                                            <Info className="w-8 h-8" />
                                            Transmission Insight
                                        </div>
                                        <div className="w-full aspect-video rounded-3xl overflow-hidden border-2 border-white/10">
                                            <img 
                                                src="/images/Industry-Articles-Card-3.webp" 
                                                alt="Featured" 
                                                className="w-full h-full object-cover" 
                                            />
                                        </div>
                                        <h3 className="text-6xl font-bold leading-tight">
                                            AI-Powered Web Content Optimizer
                                        </h3>
                                        <p className="text-3xl text-white/40 leading-relaxed font-light">
                                            Creating optimized content that resonates with audiences while meeting technical requirements has become increasingly complex.
                                        </p>
                                        <div className="pt-10 flex items-center justify-between border-t border-white/10">
                                            <span className="text-2xl text-blue-400/60 font-medium">Protocol 04 // GWP</span>
                                            <div className="flex items-center gap-4 text-white text-3xl font-bold">
                                                READ <ArrowUpRight className="w-10 h-10" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="locations"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-16"
                                    >
                                        <div className="flex items-center gap-4 text-blue-400 font-bold tracking-[0.3em] uppercase text-2xl">
                                            <Globe className="w-8 h-8" />
                                            Global Positioning
                                        </div>
                                        
                                        <div className="space-y-16 py-10">
                                            <div className="flex gap-10 items-center bg-white/5 p-10 rounded-[3rem] border border-white/10">
                                                <div className="w-32 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-5xl font-black">USA</div>
                                                <div>
                                                    <div className="text-5xl font-bold mb-2">Temecula</div>
                                                    <div className="text-3xl text-white/40">California, US District</div>
                                                </div>
                                            </div>

                                            <div className="flex gap-10 items-center bg-white/5 p-10 rounded-[3rem] border border-white/10">
                                                <div className="w-32 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center text-5xl font-black">IND</div>
                                                <div>
                                                    <div className="text-5xl font-bold mb-2">Trivandrum</div>
                                                    <div className="text-3xl text-white/40">Kerala, Southern India</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-10 border-t border-white/10">
                                            <div className="text-2xl text-white/20 uppercase tracking-[0.5em] font-black">
                                                &copy; GWP DIGITAL PRODUCTIONS
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
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

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
            iterations += 1 / 3;
        }, 30);
        
        return () => clearInterval(interval);
    }, [text]);

    return displayedText;
};

const ContactMonolith = () => {
    const [activeTab, setActiveTab] = useState('featured');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hoveredField, setHoveredField] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const inputClasses = "w-full bg-transparent border-white/20 border-b py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500 transition-all duration-500 font-light text-xl";

    return (
        <section className="relative min-h-[120vh] bg-[#020617] overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[200px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[180px]" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-screen">
                
                {/* LEFT: THE 3D SPATIAL WINDOW */}
                <div className="relative h-[600px] lg:h-screen lg:sticky lg:top-0 order-2 lg:order-1">
                    <Canvas shadows dpr={[1, 2]}>
                        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
                        <Environment preset="city" />
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1.5} color="#4bb5f8" />
                        
                        <PresentationControls
                            global
                            config={{ mass: 2, tension: 500 }}
                            snap={{ mass: 4, tension: 1500 }}
                            rotation={[0, -0.3, 0]}
                            polar={[-Math.PI / 6, Math.PI / 6]}
                            azimuth={[-Math.PI / 4, Math.PI / 4]}
                        >
                            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                                <Monolith activeTab={activeTab} />
                            </Float>
                        </PresentationControls>
                        
                        <ContactShadows 
                            opacity={0.4} scale={10} blur={2.5} far={4} resolution={256} color="#000000" 
                            position={[0, -3.5, 0]}
                        />
                    </Canvas>
                    
                    {/* Floating Controls for the Monolith */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 bg-white/5 backdrop-blur-3xl p-2 rounded-2xl border border-white/10">
                        <button 
                            onClick={() => setActiveTab('featured')}
                            className={`px-6 py-3 rounded-xl font-bold transition-all text-sm uppercase tracking-widest ${activeTab === 'featured' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-white/40 hover:text-white'}`}
                        >
                            Article
                        </button>
                        <button 
                            onClick={() => setActiveTab('locations')}
                            className={`px-6 py-3 rounded-xl font-bold transition-all text-sm uppercase tracking-widest ${activeTab === 'locations' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-white/40 hover:text-white'}`}
                        >
                            Positions
                        </button>
                    </div>
                </div>

                {/* RIGHT: THE MINIMALIST FORM PANEL */}
                <div className="relative px-8 sm:px-16 lg:px-24 py-24 lg:py-48 flex flex-col justify-center order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <header className="mb-20">
                            <h2 className="text-6xl sm:text-7xl font-bold text-white mb-6 tracking-tighter">
                                SEND <span className="text-blue-500 italic">MESSAGE.</span>
                            </h2>
                            <p className="text-white/40 text-xl font-light leading-relaxed max-w-lg">
                                Initiating direct connection protocol. Complete the fields below to transmit your vision to our core team.
                            </p>
                        </header>

                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.form 
                                    key="form"
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-16"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                        <div className="relative group">
                                            <input 
                                                type="text" 
                                                placeholder="FIRST NAME" 
                                                required 
                                                className={inputClasses}
                                                onFocus={() => setHoveredField('name')}
                                                onBlur={() => setHoveredField(null)}
                                            />
                                            <User className={`absolute right-0 top-6 transition-all ${hoveredField === 'name' ? 'text-blue-500 scale-110' : 'text-white/10'}`} />
                                        </div>
                                        <div className="relative">
                                            <input type="text" placeholder="LAST NAME" required className={inputClasses} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                        <div className="relative">
                                            <input type="text" placeholder="COMPANY" className={inputClasses} />
                                            <Briefcase className="absolute right-0 top-6 text-white/10" />
                                        </div>
                                        <div className="relative">
                                            <input type="email" placeholder="EMAIL ADDRESS" required className={inputClasses} />
                                            <Mail className="absolute right-0 top-6 text-white/10" />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-black mb-2 block">Protocol Selection / Business Area</label>
                                        <select required className={`${inputClasses} appearance-none cursor-pointer outline-none`}>
                                            <option value="" disabled selected className="bg-[#020617] text-white/20">SELECT AREA</option>
                                            <optgroup label="── CO-PILOT ──" className="bg-[#020617] text-blue-400">
                                                <option value="Agentic-Sales" className="bg-[#020617]">AGENTIC SALES ASSISTANT</option>
                                                <option value="Role-Specific" className="bg-[#020617]">ROLE SPECIFIC ORCHESTRATION</option>
                                                <option value="Knowledge-Agent" className="bg-[#020617]">KNOWLEDGE AGENT</option>
                                            </optgroup>
                                            <optgroup label="── PRODUCTS & SERVICES ──" className="bg-[#020617] text-blue-400">
                                                <option value="Site360" className="bg-[#020617]">SITE360.AI</option>
                                                <option value="Web-Dev" className="bg-[#020617]">WEB DEVELOPMENT</option>
                                                <option value="AI-Enablement" className="bg-[#020617]">AI ENABLEMENT</option>
                                            </optgroup>
                                        </select>
                                    </div>

                                    <div className="relative">
                                        <textarea placeholder="HOW CAN WE HELP YOU?" rows="2" required className={`${inputClasses} resize-none`}></textarea>
                                        <MessageSquare className="absolute right-0 top-6 text-white/10" />
                                    </div>

                                    <div>
                                        <motion.button 
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="submit" 
                                            className="group flex items-center gap-12"
                                        >
                                            <span className="text-4xl font-black uppercase tracking-tighter group-hover:text-blue-500 transition-colors">
                                                TRANSMIT
                                            </span>
                                            <div className="relative w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                                                <Send className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                                            </div>
                                        </motion.button>
                                    </div>
                                    
                                    {/* Social Connect (Minimalist) */}
                                    <div className="pt-24 flex gap-12 items-center">
                                        <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-black">Social Sync</span>
                                        <div className="flex gap-8">
                                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white hover:text-blue-500 transition-colors">
                                                <Facebook className="w-6 h-6" />
                                            </a>
                                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white hover:text-blue-500 transition-colors">
                                                <Linkedin className="w-6 h-6" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.form>
                            ) : (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 space-y-10"
                                >
                                    <h3 className="text-8xl font-black text-white tracking-tighter">SENT.</h3>
                                    <div className="flex items-center gap-4 text-emerald-500">
                                        <CheckCircle2 className="w-8 h-8" />
                                        <span className="text-2xl font-bold uppercase tracking-widest">Protocol Confirmed</span>
                                    </div>
                                    <p className="text-white/40 text-xl font-light leading-relaxed max-w-sm">
                                        Your transmission has been received and added to our priority queue. Expect a response shortly.
                                    </p>
                                    <button 
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-white/20 hover:text-white uppercase tracking-widest text-sm font-black border-b border-white/10 pb-2 transition-all"
                                    >
                                        Transmit Again
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
