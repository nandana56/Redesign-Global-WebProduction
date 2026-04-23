import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
    PerspectiveCamera, MeshTransmissionMaterial, Float, 
    Environment, ContactShadows, Text, 
    PresentationControls, Center 
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Send, User, Mail, Briefcase, MessageSquare, 
    CheckCircle2, ArrowUpRight, Globe, Info, 
    Facebook, Linkedin, Sparkles, MapPin
} from "lucide-react";
import gsap from "gsap";

// --- The Core Refractive Prism ---
const KineticPrism = () => {
    const meshRef = useRef();
    const { mouse } = useThree();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Constant gentle rotation
        meshRef.current.rotation.y = time * 0.15;
        meshRef.current.rotation.z = time * 0.1;
        
        // React to mouse movement for slight tilt
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            mouse.y * 0.5,
            0.05
        );
    });

    return (
        <group>
            {/* The Multifaceted Prism Geometry */}
            <mesh ref={meshRef} castShadow>
                <icosahedronGeometry args={[2.2, 0]} />
                <MeshTransmissionMaterial
                    backside
                    samples={10}
                    thickness={1.5}
                    chromaticAberration={0.06}
                    anisotropy={0.3}
                    distortion={0.5}
                    distortionScale={0.5}
                    temporalDistortion={0.1}
                    clearcoat={1}
                    attenuationDistance={0.5}
                    attenuationColor="#ffffff"
                    color="#4bb5f8"
                    ior={1.2}
                />
            </mesh>

            {/* Inner Glow Core */}
            <mesh scale={0.4}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial 
                    color="#4bb5f8" 
                    emissive="#4bb5f8" 
                    emissiveIntensity={2} 
                />
            </mesh>
        </group>
    );
};

// --- Reusable Glass Module ---
const PrismModule = ({ children, className = "", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-10 p-8 sm:p-10 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl ${className}`}
    >
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        {children}
    </motion.div>
);

const ContactPrismPortal = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all duration-500";

    return (
        <section className="relative w-full min-h-[140vh] bg-[#020617] py-32 px-6 lg:px-16 overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[200px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Header: Centered & Kinetic */}
                <header className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold tracking-[0.4em] uppercase text-xs mb-8"
                    >
                        <Sparkles className="w-4 h-4" /> Protocol Selection
                    </motion.div>
                    <h2 className="text-6xl sm:text-8xl font-black text-white tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                        REFRACTION <span className="italic">CONTACT.</span>
                    </h2>
                    <p className="text-white/40 text-xl font-light leading-relaxed max-w-2xl mx-auto">
                        Your vision, refracted through our intelligence core. Initiate transmission to begin the architectural process.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* LEFT: THE PRISM (Canvas) */}
                    <div className="lg:col-span-12 h-[500px] relative pointer-events-none mb-12">
                        <div className="absolute inset-0 pointer-events-auto">
                            <Canvas shadows dpr={[1, 2]}>
                                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
                                <Environment preset="city" />
                                <ambientLight intensity={0.5} />
                                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#4bb5f8" />
                                
                                <PresentationControls
                                    global
                                    config={{ mass: 2, tension: 500 }}
                                    snap={{ mass: 4, tension: 1500 }}
                                    rotation={[0, 0.3, 0]}
                                    polar={[-Math.PI / 4, Math.PI / 4]}
                                    azimuth={[-Math.PI / 3, Math.PI / 3]}
                                >
                                    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                                        <KineticPrism />
                                    </Float>
                                </PresentationControls>
                                
                                <ContactShadows opacity={0.5} scale={15} blur={3} far={10} color="#000000" position={[0, -4, 0]} />
                            </Canvas>
                        </div>
                    </div>

                    {/* FLEXIBLE GRID FOR CONTENT */}
                    <div className="lg:col-span-7 flex flex-col gap-12">
                        <PrismModule className="p-10 lg:p-14">
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form 
                                        key="form"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-10"
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <div className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-black ml-2">Identity.First</div>
                                                <div className="relative">
                                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                                    <input type="text" placeholder="First Name" required className={`${inputClasses} pl-16`} />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-black ml-2">Identity.Last</div>
                                                <input type="text" placeholder="Last Name" required className={inputClasses} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <div className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-black ml-2">Entity</div>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                                    <input type="text" placeholder="Company Name" className={`${inputClasses} pl-16`} />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-black ml-2">Vector.Email</div>
                                                <div className="relative">
                                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                                    <input type="email" placeholder="Email Address" required className={`${inputClasses} pl-16`} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-black ml-2">Protocol_Select</div>
                                            <select required className={`${inputClasses} appearance-none cursor-pointer text-sm`}>
                                                <option value="" disabled selected className="bg-[#020617]">Select Protocol</option>
                                                <optgroup label="── Agentic AI – Copilot ──" className="bg-[#020617] text-blue-400 font-bold">
                                                    <option value="AI-Sales" className="bg-[#020617]">AI AGENT SALES ASSISTANT</option>
                                                    <option value="Custom-AI" className="bg-[#020617]">CUSTOM AGENT SYSTEM</option>
                                                </optgroup>
                                                <optgroup label="── Digital Products ──" className="bg-[#020617] text-blue-400 font-bold">
                                                    <option value="Site360" className="bg-[#020617]">SITE360.AI DEMO</option>
                                                    <option value="Web-Dev" className="bg-[#020617]">WEB DEVELOPMENT</option>
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-black ml-2">Body.Transmission</div>
                                            <div className="relative">
                                                <MessageSquare className="absolute left-6 top-6 w-5 h-5 text-white/20" />
                                                <textarea placeholder="Describe your architecture..." rows="3" required className={`${inputClasses} pl-16 resize-none`}></textarea>
                                            </div>
                                        </div>

                                        <motion.button 
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit" 
                                            className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.5em] text-xs hover:bg-blue-600 hover:text-white transition-all shadow-2xl shadow-blue-500/10"
                                        >
                                            Initiate Prism Port
                                        </motion.button>
                                    </motion.form>
                                ) : (
                                    <motion.div 
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-20 text-center space-y-8"
                                    >
                                        <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto border border-blue-500/40">
                                            <CheckCircle2 className="w-12 h-12 text-blue-400" />
                                        </div>
                                        <h3 className="text-4xl font-bold text-white uppercase tracking-tighter">Port Secured.</h3>
                                        <p className="text-white/40 text-lg font-light">Transmission acknowledged. Our architectural core is processing your request.</p>
                                        <button onClick={() => setIsSubmitted(false)} className="text-blue-400 text-xs font-black uppercase tracking-widest border-b border-blue-400/20 pb-2">New Transmission</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </PrismModule>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-8 h-full">
                        {/* Featured Insight node */}
                        <PrismModule className="p-10 group" delay={0.2}>
                            <header className="flex justify-between items-start mb-10">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-black">Data.Node</span>
                                <Info className="w-5 h-5 text-white/20 group-hover:text-blue-400 transition-colors" />
                            </header>
                            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-8 border border-white/5">
                                <img src="/images/Industry-Articles-Card-3.webp" alt="Featured" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent opacity-60" />
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-4 leading-tight">AI CONTENT<br />OPTIMIZER</h4>
                            <p className="text-white/40 text-sm font-light leading-relaxed mb-10">Enhancing user experience through real-time architectural mapping and intelligent content delivery.</p>
                            <a href="/blogs" className="flex items-center gap-2 text-white font-bold text-xs tracking-widest uppercase hover:gap-4 transition-all">
                                READ_FULL <ArrowUpRight className="w-4 h-4 text-blue-500" />
                            </a>
                        </PrismModule>

                        {/* Location / Social Connect node */}
                        <PrismModule className="p-10" delay={0.4}>
                            <h4 className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-black mb-10">Global_Sync</h4>
                            <div className="grid grid-cols-2 gap-8 mb-12">
                                <div>
                                    <div className="text-white font-bold text-lg mb-1 flex items-center gap-2"><Globe className="w-4 h-4 text-white/40" /> USA</div>
                                    <div className="text-white/20 text-xs uppercase tracking-widest">Temecula, CA</div>
                                </div>
                                <div>
                                    <div className="text-white font-bold text-lg mb-1 flex items-center gap-2"><MapPin className="w-4 h-4 text-white/40" /> IND</div>
                                    <div className="text-white/20 text-xs uppercase tracking-widest">Trivandrum, KL</div>
                                </div>
                            </div>
                            <div className="pt-10 border-t border-white/5 flex gap-8">
                                <a href="https://facebook.com" className="text-white/20 hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
                                <a href="https://www.linkedin.com/company/global-web-production/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>
                            </div>
                        </PrismModule>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactPrismPortal;
