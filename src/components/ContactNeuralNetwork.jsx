import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { 
  User, Mail, Briefcase, MessageSquare, Send, 
  Linkedin, Facebook, ArrowUpRight, Globe, MapPin, Search
} from "lucide-react";

// --- NEURAL NETWORK BACKGROUND COMPONENT ---
function NeuralParticles({ count = 2000 }) {
    const pointsRef = useRef();
    
    const [positions, step] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const step = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
            step[i] = Math.random() * 0.5 + 0.1;
        }
        return [positions, step];
    }, [count]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const time = state.clock.getElapsedTime();
        
        // Gentle undulating motion
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            pointsRef.current.geometry.attributes.position.array[i3 + 1] += Math.sin(time * step[i]) * 0.002;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.rotation.y = time * 0.05;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#57C2FF"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

const IndiaFlagSVG = () => (
    <svg viewBox="0 0 900 600" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
        <rect width="900" height="200" fill="#f93" />
        <rect width="900" height="200" y="200" fill="#fff" />
        <rect width="900" height="200" y="400" fill="#128807" />
    </svg>
);

const USAFlagSVG = () => (
    <svg viewBox="0 0 741 390" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
        <rect width="741" height="390" fill="#b22234" />
        <rect width="296.4" height="210" fill="#3c3b6e" />
    </svg>
);

// --- CYBER NODE COMPONENT ---
const CyberNode = ({ children, className, title }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className={`relative bg-[#020617]/80 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition-colors shadow-[0_0_30px_rgba(0,0,0,0.5)] group ${className}`}
    >
        {/* Animated Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500/30 group-hover:border-blue-500 transition-colors rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500/30 group-hover:border-blue-500 transition-colors rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500/30 group-hover:border-blue-500 transition-colors rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500/30 group-hover:border-blue-500 transition-colors rounded-br-lg" />
        
        {title && (
            <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <h3 className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em]">{title}</h3>
            </div>
        )}
        {children}
    </motion.div>
);

const ContactNeuralNetwork = () => {
    const inputClasses = "w-full bg-blue-500/5 border border-blue-500/10 rounded-lg px-5 py-3 pl-12 text-white placeholder:text-blue-200/20 focus:outline-none focus:border-blue-500/60 focus:bg-blue-500/10 transition-all font-mono text-sm";

    return (
        <section className="relative min-h-screen bg-[#040816] overflow-hidden py-24 flex items-center justify-center">
            
            {/* THREE.JS BACKGROUND LAYER */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
                <Suspense fallback={null}>
                    <Canvas camera={{ position: [0, 0, 8] }}>
                        <NeuralParticles />
                    </Canvas>
                </Suspense>
            </div>

            {/* SCANNING GRID OVERLAY */}
            <div className="absolute inset-0 z-1 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] opacity-20" />

            {/* CONTENT LAYER */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* FORM NODE (8 COLS) */}
                    <div className="lg:col-span-8">
                        <CyberNode title="Protocol: Engagement" className="relative">
                            <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">Send us a message.</h2>
                            <p className="text-blue-100/40 mb-10 max-w-xl text-sm font-mono leading-relaxed uppercase tracking-wider">
                                We want to hear from you! Contact our team to learn about the services and language solutions we can provide to aid your business.
                            </p>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500/40 group-focus-within:text-blue-500 transition-colors" />
                                        <input type="text" placeholder="First Name*" required className={inputClasses} />
                                    </div>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500/40 group-focus-within:text-blue-500 transition-colors" />
                                        <input type="text" placeholder="Last Name*" required className={inputClasses} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="relative group">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500/40 group-focus-within:text-blue-500 transition-colors" />
                                        <input type="text" placeholder="Company" className={inputClasses} />
                                    </div>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500/40 group-focus-within:text-blue-500 transition-colors" />
                                        <input type="email" placeholder="Email*" required className={inputClasses} />
                                    </div>
                                </div>

                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500/40 group-focus-within:text-blue-500 transition-colors z-10" />
                                    <select required className={`${inputClasses} appearance-none relative z-0`}>
                                        <option value="" disabled selected className="bg-[#021027]">Select a business area</option>
                                        <optgroup label="── Agentic AI – Copilot ──" className="bg-[#021027] text-blue-400 font-mono">
                                            <option value="AI-Powered-Agentic-Sales-Assistant">AI-Powered Agentic Sales Assistant | Co-Pilot Based</option>
                                            <option value="Ask-Me-Role-Specific">Ask Me – Role Specific | Finetuned & Orchestrated</option>
                                            <option value="Ask-Me-Knowledge-Agent">Ask Me – Knowledge Agent | Corporate Brain</option>
                                            <option value="Request-Intake-Agent">Request Intake Agent | Reporting & Dashboards</option>
                                            <option value="Content-Update-Agent-WebOps">Content Update Agent for WebOps (Connected to WP)</option>
                                            <option value="Content-Checker-Agent">Aria Label / Alt Text Generator / Content Checker Agent</option>
                                        </optgroup>
                                        <optgroup label="── Agentic AI – Custom ──" className="bg-[#021027] text-blue-400 font-mono">
                                            <option value="Supervisor-Agent">Supervisor Agent</option>
                                            <option value="AI-Document-Extractor">AI Document Extractor</option>
                                            <option value="HR-Assistant">HR Assistant</option>
                                            <option value="Aptitude-IQ-Assessment">AI-Powered Aptitude & IQ Assessment</option>
                                        </optgroup>
                                        <optgroup label="── Products ──" className="bg-[#021027] text-blue-400 font-mono">
                                            <option value="Site360ai">Site360.ai</option>
                                            <option value="Quality-Checker-Extension">Quality Checker Extension</option>
                                            <option value="Content-Search-Tools">Content Search Tools</option>
                                        </optgroup>
                                        <optgroup label="── Services ──" className="bg-[#021027] text-blue-400 font-mono">
                                            <option value="Accelerated-WordPress-Development">Accelerated WordPress Development with AI</option>
                                            <option value="web-development">Web Development</option>
                                            <option value="Managed-Services">Managed Services</option>
                                            <option value="Testing-QA">Testing / QA</option>
                                            <option value="Accessibility-Compliance">Web Accessibility</option>
                                            <option value="Experimentation">Experimentation</option>
                                            <option value="Salesforce">CRM Solutions</option>
                                            <option value="seo">SEO & Site Performance</option>
                                            <option value="Staffing-Solutions">Staffing Solutions</option>
                                            <option value="Analytics-Technology-Implementation">Analytics Technology Implementation</option>
                                            <option value="Automation">Automation</option>
                                            <option value="AI-Enablement">AI Enablement</option>
                                            <option value="Content-Services">Content Services</option>
                                        </optgroup>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500/40 group-focus-within:text-blue-500">
                                        <ArrowUpRight className="w-4 h-4 rotate-45" />
                                    </div>
                                </div>

                                <div className="relative group">
                                    <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-blue-500/40 group-focus-within:text-blue-500 transition-colors" />
                                    <textarea name="message" placeholder="How can we help you?*" rows="4" required className={`${inputClasses} resize-none py-5`}></textarea>
                                </div>

                                <button type="submit" className="relative w-full overflow-hidden group/btn bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] py-5 rounded-lg transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                    <Send className="w-5 h-5" /> Initialize Transmission
                                </button>
                            </form>
                        </CyberNode>
                    </div>

                    {/* SIDE PANEL NODES (4 COLS) */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* FEATURED NODE */}
                        <CyberNode title="Holographic Insight">
                            <div className="mb-6 rounded-xl overflow-hidden border border-blue-500/10 grayscale hover:grayscale-0 transition-all duration-700">
                                <img src="/images/aiblog-.webp" alt="Blog" className="w-full h-auto object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
                            </div>
                            <h4 className="text-white font-bold text-lg mb-2 leading-tight">AI-Powered Web Content Optimizer: Enhancing UX</h4>
                            <p className="text-blue-100/40 text-xs font-mono uppercase tracking-widest leading-relaxed mb-6">Creating optimized content that resonates with audiences while meeting technical requirements has become increasingly complex...</p>
                            <a href="/blogs" className="flex items-center gap-2 text-blue-400 font-bold text-xs tracking-widest group/link">
                                READ LOG <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                            </a>
                        </CyberNode>

                        {/* NODES: LOCATIONS */}
                        <CyberNode title="Network Nodes">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 group/loc">
                                    <div className="w-10 h-6 shrink-0 rounded border border-blue-500/20"><USAFlagSVG /></div>
                                    <div>
                                        <div className="text-white font-bold text-sm tracking-widest">USA NODE [33.49N 117.14W]</div>
                                        <div className="text-blue-100/40 text-[10px] font-mono uppercase">Temecula, California</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group/loc">
                                    <div className="w-10 h-6 shrink-0 rounded border border-blue-500/20"><IndiaFlagSVG /></div>
                                    <div>
                                        <div className="text-white font-bold text-sm tracking-widest">IND NODE [8.52N 76.93E]</div>
                                        <div className="text-blue-100/40 text-[10px] font-mono uppercase">Trivandrum, Kerala</div>
                                    </div>
                                </div>
                            </div>
                        </CyberNode>

                        {/* SOCIAL UPLINK */}
                        <CyberNode title="Social Uplink">
                            <div className="flex gap-4">
                                <a href="https://www.linkedin.com/company/global-web-production/" className="w-12 h-12 rounded border border-blue-500/20 flex items-center justify-center text-blue-500/50 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="https://www.facebook.com/globalwebproduction/" className="w-12 h-12 rounded border border-blue-500/20 flex items-center justify-center text-blue-500/50 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            </div>
                        </CyberNode>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactNeuralNetwork;
