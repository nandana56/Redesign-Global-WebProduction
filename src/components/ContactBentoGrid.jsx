import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { 
    User, Mail, Briefcase, MessageSquare, Send, 
    Facebook, Linkedin, ArrowUpRight, Globe, MapPin,
    CheckCircle2, Sparkles, Zap
} from "lucide-react";
import gsap from "gsap";

// --- Three.js Quantum Nebula Background ---
const QuantumNebula = () => {
    const pointsRef = useRef();
    const { mouse, viewport } = useThree();

    // Create a sphere of points
    const count = 3000;
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const radius = 5;
        for (let i = 0; i < count; i++) {
            const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
            const phi = THREE.MathUtils.randFloat(0, Math.PI);
            const r = THREE.MathUtils.randFloat(0, radius);
            
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        return positions;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        
        // Distort points slightly based on mouse and time
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Add subtle wave motion
            pointsRef.current.geometry.attributes.position.array[i3] += Math.sin(time * 0.5 + i) * 0.002;
            pointsRef.current.geometry.attributes.position.array[i3 + 1] += Math.cos(time * 0.3 + i) * 0.002;
            
            // Mouse interaction (gentle attraction/repulsion)
            const x = pointsRef.current.geometry.attributes.position.array[i3];
            const y = pointsRef.current.geometry.attributes.position.array[i3 + 1];
            const dx = x - (mouse.x * viewport.width) / 2;
            const dy = y - (mouse.y * viewport.height) / 2;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 2) {
                pointsRef.current.geometry.attributes.position.array[i3] -= dx * 0.01;
                pointsRef.current.geometry.attributes.position.array[i3 + 1] -= dy * 0.01;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.rotation.y = time * 0.05;
        pointsRef.current.rotation.x = time * 0.02;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#4bb5f8"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.4}
            />
        </Points>
    );
};

// --- Reusable Glass Card ---
const BentoCard = ({ children, className = "", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`relative overflow-hidden group rounded-[2.5rem] border border-white/10 bg-[#09182e]/40 backdrop-blur-xl shadow-2xl ${className}`}
    >
        {/* Hover Border Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-blue-400 to-transparent" />
        </div>
        {children}
    </motion.div>
);

// --- Custom SVG Flags ---
const USAFlag = () => (
    <svg viewBox="0 0 741 390" className="w-full h-full object-cover">
        <rect width="741" height="390" fill="#b22234" />
        <path d="M0 30h741M0 90h741M0 150h741M0 210h741M0 270h741M0 330h741" stroke="#fff" strokeWidth="30" />
        <rect width="296" height="210" fill="#3c3b6e" />
    </svg>
);

const IndiaFlag = () => (
    <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
        <rect width="900" height="200" fill="#f93" />
        <rect width="900" height="200" y="200" fill="#fff" />
        <rect width="900" height="200" y="400" fill="#128807" />
        <circle cx="450" cy="300" r="80" fill="none" stroke="#000080" strokeWidth="2" />
    </svg>
);

// --- Magnetic Component Hook ---
const useMagnetic = (ref) => {
    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        const mouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
        };
        const mouseLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
        };
        el.addEventListener("mousemove", mouseMove);
        el.addEventListener("mouseleave", mouseLeave);
        return () => {
            el.removeEventListener("mousemove", mouseMove);
            el.removeEventListener("mouseleave", mouseLeave);
        };
    }, [ref]);
};

const ContactBentoGrid = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const submitBtnRef = useRef(null);
    useMagnetic(submitBtnRef);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const inputClasses = `
        w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white 
        placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 
        transition-all duration-300 backdrop-blur-sm hover:bg-white/10
    `;

    return (
        <section className="relative w-full py-24 px-6 lg:px-16 overflow-hidden bg-[#040816]">
            {/* Background 3D Canvas */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                    <QuantumNebula />
                </Canvas>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT: FORM CARD (Span 8) */}
                    <BentoCard className="lg:col-span-8 p-8 sm:p-12">
                        <div className="max-w-3xl">
                            <motion.h2 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-400"
                            >
                                Send us a message.
                            </motion.h2>
                            <p className="text-blue-100/60 mb-12 text-lg font-light leading-relaxed">
                                We want to hear from you! Contact our team to learn about the services and language solutions we can provide to aid your business.
                            </p>

                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form 
                                        key="form"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        onSubmit={handleSubmit} 
                                        className="space-y-8"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="text-sm font-medium text-blue-400/80 ml-1 uppercase tracking-widest">First Name*</label>
                                                <div className="relative group">
                                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                                                    <input type="text" placeholder="First Name" required className={`${inputClasses} pl-14`} />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-medium text-blue-400/80 ml-1 uppercase tracking-widest">Last Name*</label>
                                                <input type="text" placeholder="Last Name" required className={inputClasses} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="text-sm font-medium text-blue-400/80 ml-1 uppercase tracking-widest">Company</label>
                                                <div className="relative group">
                                                    <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                                                    <input type="text" placeholder="Your Company" className={`${inputClasses} pl-14`} />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-medium text-blue-400/80 ml-1 uppercase tracking-widest">Email*</label>
                                                <div className="relative group">
                                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                                                    <input type="email" placeholder="Email Address" required className={`${inputClasses} pl-14`} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-blue-400/80 ml-1 uppercase tracking-widest">Business Areas*</label>
                                            <select required className={`${inputClasses} appearance-none cursor-pointer text-sm`}>
                                                <option value="" disabled selected className="bg-[#040816]">Select a Protocol</option>
                                                <optgroup label="── Agentic AI – Copilot ──" className="bg-[#040816] text-blue-400 font-bold">
                                                    <option value="AI-Powered-Sales-Assistant" className="bg-[#040816]">AI-Powered Agentic Sales Assistant | Co-Pilot Based</option>
                                                    <option value="Role-Specific" className="bg-[#040816]">Ask Me – Role Specific | Finetuned & Orchestrated</option>
                                                    <option value="Knowledge-Agent" className="bg-[#040816]">Ask Me – Knowledge Agent | Corporate Brain</option>
                                                    <option value="Request-Intake-Agent" className="bg-[#040816]">Request Intake Agent | Reporting & Dashboards</option>
                                                    <option value="WebOps-Agent" className="bg-[#040816]">Content Update Agent for WebOps (Connected to WP)</option>
                                                    <option value="Accessibility-Agent" className="bg-[#040816]">Aria Label / Alt Text Generator / Content Checker Agent</option>
                                                </optgroup>
                                                <optgroup label="── Agentic AI – Custom ──" className="bg-[#040816] text-blue-400 font-bold">
                                                    <option value="Supervisor-Agent" className="bg-[#040816]">Supervisor Agent</option>
                                                    <option value="Document-Extractor" className="bg-[#040816]">AI Document Extractor</option>
                                                    <option value="HR-Assistant" className="bg-[#040816]">HR Assistant</option>
                                                    <option value="IQ-Assessment" className="bg-[#040816]">AI-Powered Aptitude & IQ Assessment</option>
                                                </optgroup>
                                                <optgroup label="── Products ──" className="bg-[#040816] text-blue-400 font-bold">
                                                    <option value="Site360ai" className="bg-[#040816]">Site360.ai</option>
                                                    <option value="Quality-Checker" className="bg-[#040816]">Quality Checker Extension</option>
                                                    <option value="Content-Search" className="bg-[#040816]">Content Search Tools</option>
                                                </optgroup>
                                                <optgroup label="── Services ──" className="bg-[#040816] text-blue-400 font-bold">
                                                    <option value="Wordpress-AI" className="bg-[#040816]">Accelerated WordPress Development with AI</option>
                                                    <option value="Web-Dev" className="bg-[#040816]">Web Development</option>
                                                    <option value="Managed-Services" className="bg-[#040816]">Managed Services</option>
                                                    <option value="Testing-QA" className="bg-[#040816]">Testing / QA</option>
                                                    <option value="Web-Accessibility" className="bg-[#040816]">Web Accessibility</option>
                                                    <option value="Experimentation" className="bg-[#040816]">Experimentation</option>
                                                    <option value="CRM-Solutions" className="bg-[#040816]">CRM Solutions</option>
                                                    <option value="SEO" className="bg-[#040816]">SEO & Site Performance</option>
                                                    <option value="Staffing" className="bg-[#040816]">Staffing Solutions</option>
                                                    <option value="Analytics" className="bg-[#040816]">Analytics Technology Implementation</option>
                                                    <option value="Automation" className="bg-[#040816]">Automation</option>
                                                    <option value="AI-Enablement" className="bg-[#040816]">AI Enablement</option>
                                                    <option value="Content-Services" className="bg-[#040816]">Content Services</option>
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-blue-400/80 ml-1 uppercase tracking-widest">How can we help you?*</label>
                                            <div className="relative group">
                                                <MessageSquare className="absolute left-5 top-6 w-5 h-5 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                                                <textarea placeholder="Tell us about your project..." rows="4" required className={`${inputClasses} pl-14 resize-none`}></textarea>
                                            </div>
                                        </div>

                                        <div className="flex justify-start">
                                            <motion.button 
                                                ref={submitBtnRef}
                                                type="submit" 
                                                className="group relative px-12 py-5 rounded-2xl bg-blue-600 font-bold text-white overflow-hidden shadow-[0_10px_40px_rgba(37,99,235,0.4)]"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                <span className="relative flex items-center gap-3">
                                                    Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </span>
                                            </motion.button>
                                        </div>
                                    </motion.form>
                                ) : (
                                    <motion.div 
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-20 text-center space-y-6"
                                    >
                                        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                                            <CheckCircle2 className="w-12 h-12 text-green-500" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white">Transmission Successful</h3>
                                        <p className="text-blue-100/60 max-w-sm mx-auto">
                                            Your message has been encrypted and sent to our team. We will contact you shortly.
                                        </p>
                                        <button 
                                            onClick={() => setIsSubmitted(false)}
                                            className="text-blue-400 font-bold border-b border-blue-400/30 hover:border-blue-400 transition-all"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </BentoCard>

                    {/* RIGHT COLUMN: CARDS */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        
                        {/* Featured Insight Card */}
                        <BentoCard className="p-8 flex-1 group/article" delay={0.2}>
                            <div className="h-full flex flex-col">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 w-fit">
                                    <Sparkles className="w-3 h-3" /> Featured Article
                                </span>
                                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6">
                                    <img 
                                        src="/images/Industry-Articles-Card-3.webp" 
                                        alt="AI Optimizer" 
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover/article:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#09182e] via-transparent to-transparent opacity-60" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3 group-hover/article:text-blue-400 transition-colors">
                                    AI-Powered Web Content Optimizer
                                </h4>
                                <p className="text-white/40 text-sm font-light mb-8 line-clamp-3">
                                    Creating optimized content that resonates with audiences while meeting technical requirements has become increasingly complex.
                                </p>
                                <motion.a 
                                    href="/blogs" 
                                    className="mt-auto flex items-center gap-2 text-white font-bold group-hover/article:gap-4 transition-all duration-300"
                                >
                                    READ FULL ARTICLE <ArrowUpRight className="w-5 h-5 text-blue-400" />
                                </motion.a>
                            </div>
                        </BentoCard>

                        {/* Locations Card */}
                        <BentoCard className="p-8" delay={0.4}>
                            <h4 className="text-white font-bold mb-8 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-blue-500" /> GWP Locations
                            </h4>
                            <div className="space-y-8">
                                <div className="flex gap-5 items-start">
                                    <div className="w-12 h-8 rounded-lg overflow-hidden border border-white/10 shrink-0 shadow-lg">
                                        <USAFlag />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm tracking-wide">USA</div>
                                        <div className="text-white/40 text-xs mt-1">Temecula, California</div>
                                    </div>
                                </div>
                                <div className="flex gap-5 items-start">
                                    <div className="w-12 h-8 rounded-lg overflow-hidden border border-white/10 shrink-0 shadow-lg">
                                        <IndiaFlag />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm tracking-wide">INDIA</div>
                                        <div className="text-white/40 text-xs mt-1 text-nowrap">Trivandrum, Kerala</div>
                                    </div>
                                </div>
                            </div>
                        </BentoCard>

                        {/* Social Connect Card */}
                        <BentoCard className="p-8 bg-blue-600" delay={0.6}>
                            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-400" /> Stay Connected
                            </h4>
                            <div className="flex gap-4">
                                <motion.a 
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    href="https://facebook.com" 
                                    className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all"
                                >
                                    <Facebook className="w-6 h-6" />
                                </motion.a>
                                <motion.a 
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                    href="https://linkedin.com" 
                                    className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all"
                                >
                                    <Linkedin className="w-6 h-6" />
                                </motion.a>
                            </div>
                        </BentoCard>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactBentoGrid;
