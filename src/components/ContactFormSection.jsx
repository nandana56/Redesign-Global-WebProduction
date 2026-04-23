import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User, Briefcase, MessageSquare, Send, MapPin, Share2, Rocket, ArrowRight, ShieldCheck } from "lucide-react";

// --- SVGS ---
const IndiaFlagSVG = () => (
    <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
        <rect width="900" height="200" fill="#f93" />
        <rect width="900" height="200" y="200" fill="#fff" />
        <rect width="900" height="200" y="400" fill="#128807" />
        <g transform="translate(450,300)">
            <circle r="45" fill="none" stroke="#000080" strokeWidth="2" />
            {[...Array(24)].map((_, i) => (
                <line key={i} x1="0" y1="0" x2="0" y2="-45" stroke="#000080" strokeWidth="1" transform={`rotate(${i * 15})`} />
            ))}
        </g>
    </svg>
);

const USAFlagSVG = () => (
    <svg viewBox="0 0 741 390" className="w-full h-full object-cover">
        <rect width="741" height="390" fill="#b22234" />
        {[...Array(7)].map((_, i) => (
            <rect key={i} width="741" height="30" y={i * 60 + 30} fill="#fff" />
        ))}
        <rect width="296.4" height="210" fill="#3c3b6e" />
        {[...Array(9)].map((_, row) => (
            [...Array(6)].map((_, col) => {
                const x = col * 48 + (row % 2 === 0 ? 24 : 48);
                const y = row * 21 + 18;
                if (row % 2 !== 0 && col === 5) return null;
                return <circle key={`${row}-${col}`} cx={x} cy={y} r="3" fill="#fff" />;
            })
        ))}
    </svg>
);

// --- 3D WARP TUNNEL COMPONENT ---
const WarpTunnel = ({ isWarping }) => {
    const pointsRef = useRef();
    
    // Generate starfield cylinder geometry
    const [positions, targetSpeeds] = useMemo(() => {
        const count = 3000;
        const pos = new Float32Array(count * 3);
        const spd = new Float32Array(count);
        
        for (let i = 0; i < count; i++) {
            // Cylindrical distribution for a "tunnel" feel
            const radius = 3 + Math.random() * 20;
            const theta = Math.random() * 2 * Math.PI;
            
            pos[i * 3] = radius * Math.cos(theta); // x
            pos[i * 3 + 1] = radius * Math.sin(theta); // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 100; // z (depth: -50 to 50)
            
            spd[i] = Math.random() * 0.2 + 0.1; // Individual varying speeds
        }
        return [pos, spd];
    }, []);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;
        
        const posArray = pointsRef.current.geometry.attributes.position.array;
        
        // Base idle speed vs Hyper-Warp speed
        const globalSpeedMult = isWarping ? 70.0 : 0.5;

        for (let i = 0; i < 3000; i++) {
            // Move on Z axis towards camera
            posArray[i * 3 + 2] += (targetSpeeds[i] * globalSpeedMult * delta * 60);

            // If star passes camera (z > 10), reset it far back into the tunnel
            if (posArray[i * 3 + 2] > 10) {
                posArray[i * 3 + 2] = -50 - Math.random() * 20;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        
        // Gentle rotation of the entire tunnel
        pointsRef.current.rotation.z -= delta * (isWarping ? 0.05 : 0.02);
    });

    return (
        <group>
            <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
                {/* Notice the color shifts slightly towards white during warp via bloom/exposure in a real app, here we use pure glow */}
                <PointMaterial transparent color="#57C2FF" size={0.08} sizeAttenuation={true} depthWrite={false} opacity={0.8} />
            </Points>
        </group>
    );
};

const ContactFormSection = () => {
    // Checkpoint State
    const [step, setStep] = useState(0);
    const [isWarping, setIsWarping] = useState(false);
    
    const [formData, setFormData] = useState({
        name: "", lastname: "",
        company: "", email: "",
        service: "",
        message: ""
    });

    const triggerWarp = (nextStep) => {
        setIsWarping(true);
        setTimeout(() => {
            setStep(nextStep);
        }, 300); // UI switches halfway through warp
        setTimeout(() => {
            setIsWarping(false);
        }, 800); // Warp engines power down
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step < 3) triggerWarp(step + 1);
        else triggerWarp(4); // Submit step
    };

    const inputCSS = "w-full bg-[#050811]/90 backdrop-blur-md border border-[#57C2FF]/30 rounded-lg px-5 py-4 text-white text-lg sm:text-xl focus:outline-none focus:border-[#57C2FF] focus:shadow-[0_0_20px_rgba(87,194,255,0.3)] transition-all placeholder:text-white/20 font-mono tracking-wide";

    // Reusable Checkpoint Glass Card
    const CheckpointCard = ({ title, subtitle, children }) => (
        <motion.div
            key={title}
            initial={{ opacity: 0, scale: 0.8, z: -1000 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            exit={{ opacity: 0, scale: 1.5, z: 1000, filter: "blur(10px)" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            className="w-full max-w-2xl mx-auto bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative"
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-[#57C2FF] shadow-[0_0_15px_#57C2FF]"></div>
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 text-[#57C2FF] font-mono text-[10px] tracking-[0.3em] uppercase mb-4 border border-[#57C2FF]/30 px-3 py-1 bg-[#57C2FF]/10 rounded-full">
                    Checkpoint 0{step + 1}
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">{title}</h2>
                <p className="text-white/40 text-sm font-mono">{subtitle}</p>
            </div>
            
            <form onSubmit={handleNext} className="space-y-6">
                {children}
                <div className="pt-6">
                    <button type="submit" className="w-full h-16 bg-[#57C2FF] hover:bg-white text-black rounded-lg font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all duration-300 active:scale-95 shadow-[0_0_30px_rgba(87,194,255,0.4)]">
                        {step === 3 ? "Initiate Core Upload" : "Engage Warp to Next"} 
                        {step === 3 ? <Rocket className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                    </button>
                </div>
            </form>
        </motion.div>
    );

    return (
        <section className="relative w-full h-screen min-h-[800px] bg-[#020306] overflow-hidden font-['Inter',sans-serif] text-white">
            
            {/* --- 3D WARP TUNNEL BACKGROUND --- */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                    <WarpTunnel isWarping={isWarping} />
                </Canvas>
                
                {/* Intense Vignette to darken edges and focus on the tunnel */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020306_80%)] pointer-events-none z-10"></div>
                
                {/* Warp speed light flare effect */}
                <div className={`absolute inset-0 bg-[#57C2FF] mix-blend-screen pointer-events-none z-10 transition-opacity duration-300 ${isWarping ? 'opacity-10' : 'opacity-0'}`}></div>
            </div>

            {/* --- PERSISTENT HUD OVERLAY (Sci-Fi Dashboard) --- */}
            <div className="absolute inset-0 z-20 pointer-events-none p-6 sm:p-10 flex flex-col justify-between">
                
                {/* Top HUD */}
                <div className="flex justify-between items-start">
                    {/* Locations Data-Panel */}
                    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4 w-[240px] pointer-events-auto shadow-2xl">
                        <div className="flex items-center gap-2 text-[#57C2FF] text-[9px] uppercase tracking-widest font-mono mb-4">
                            <MapPin className="w-3 h-3" /> Navigation Nodes
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-4 overflow-hidden rounded-sm"><USAFlagSVG /></div>
                                <div className="text-white/80 text-[10px] font-mono tracking-widest">USA: CA Base</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-4 overflow-hidden rounded-sm"><IndiaFlagSVG /></div>
                                <div className="text-white/80 text-[10px] font-mono tracking-widest">IND: KL Base</div>
                            </div>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="bg-[#57C2FF]/10 border border-[#57C2FF]/30 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#57C2FF]" />
                        <span className="text-[#57C2FF] text-[9px] font-mono uppercase tracking-[0.2em]">Secure Channel</span>
                    </div>
                </div>

                {/* Bottom HUD */}
                <div className="flex justify-between items-end">
                    {/* Featured Insight Log */}
                    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4 w-[280px] pointer-events-auto cursor-pointer group hover:border-[#57C2FF]/50 transition-colors" onClick={() => window.location.href = '/blogs'}>
                        <div className="flex items-center gap-2 text-[#57C2FF] text-[9px] uppercase tracking-widest font-mono mb-3">
                            <MessageSquare className="w-3 h-3" /> Latest Comms Log
                        </div>
                        <div className="flex gap-3">
                            <img src="/images/aiblog-.webp" alt="Blog" className="w-12 h-12 object-cover rounded grayscale group-hover:grayscale-0 transition-all border border-white/10" />
                            <div>
                                <h4 className="text-white font-bold text-[11px] leading-tight mb-1 group-hover:text-[#57C2FF] transition-colors">AI Content Optimizer</h4>
                                <p className="text-white/40 text-[9px] line-clamp-2 leading-none font-mono">Decrypted insight on modern technical requirements...</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Uplinks */}
                    <div className="flex gap-2 pointer-events-auto">
                        <a href="https://www.linkedin.com/company/global-web-production/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center rounded text-white/50 hover:text-white hover:border-[#57C2FF] hover:bg-[#57C2FF]/20 transition-all">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                        </a>
                        <a href="https://www.facebook.com/globalwebproduction/" className="w-10 h-10 bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center rounded text-white/50 hover:text-white hover:border-[#57C2FF] hover:bg-[#57C2FF]/20 transition-all">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* --- CENTRAL CHECKPOINT STAGES --- */}
            <div className="absolute inset-0 z-30 flex items-center justify-center p-4">
                <AnimatePresence mode="wait">
                    
                    {/* STEP 0: IDENTITY */}
                    {step === 0 && (
                        <CheckpointCard title="Identity Verification" subtitle="Provide your designation parameters.">
                            <div className="space-y-4">
                                <input type="text" required placeholder="User Given Name" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className={inputCSS} />
                                <input type="text" required placeholder="User Surname" value={formData.lastname} onChange={e=>setFormData({...formData, lastname: e.target.value})} className={inputCSS} />
                            </div>
                        </CheckpointCard>
                    )}

                    {/* STEP 1: ENTITY */}
                    {step === 1 && (
                        <CheckpointCard title="Corporate Architecture" subtitle="Specify your organization and comms link.">
                            <div className="space-y-4">
                                <input type="text" placeholder="Organization / Entity" value={formData.company} onChange={e=>setFormData({...formData, company: e.target.value})} className={inputCSS} />
                                <input type="email" required placeholder="Secure Email Address" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} className={inputCSS} />
                            </div>
                        </CheckpointCard>
                    )}

                    {/* STEP 2: PROTOCOL */}
                    {step === 2 && (
                        <CheckpointCard title="System Protocol" subtitle="Select the agentic framework required.">
                            <select 
                                required value={formData.service} onChange={e=>setFormData({...formData, service: e.target.value})} 
                                className={`${inputCSS} appearance-none cursor-pointer`}
                            >
                                <option value="" disabled className="text-gray-500">Select Architecture Area</option>
                                <optgroup label="── Agentic AI – Copilot ──">
                                    <option value="AI-Sales">AI-Powered Agentic Sales Assistant</option>
                                    <option value="Ask-Me">Ask Me – Role Specific / Knowledge</option>
                                    <option value="Intake">Request Intake Agent</option>
                                    <option value="Content">Content Update / Checker Agent</option>
                                </optgroup>
                                <optgroup label="── Custom & Products ──">
                                    <option value="Supervisor">Supervisor Agent</option>
                                    <option value="Extractor">AI Document Extractor</option>
                                    <option value="HR">HR Assistant</option>
                                    <option value="Site360">Site360.ai</option>
                                </optgroup>
                                <optgroup label="── Core Services ──">
                                    <option value="WebDev">Web Development & WordPress</option>
                                    <option value="Testing">Testing / QA & Accessibility</option>
                                    <option value="SEO">SEO, CRM & Analytics</option>
                                </optgroup>
                            </select>
                        </CheckpointCard>
                    )}

                    {/* STEP 3: TRANSMISSION */}
                    {step === 3 && (
                        <CheckpointCard title="Transmission Data" subtitle="Inject additional parameters into the payload.">
                            <textarea 
                                rows="5" required placeholder="Data payload here..." 
                                value={formData.message} onChange={e=>setFormData({...formData, message: e.target.value})} 
                                className={`${inputCSS} resize-none`}
                            ></textarea>
                        </CheckpointCard>
                    )}

                    {/* STEP 4: COMPLETE */}
                    {step === 4 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="w-24 h-24 bg-[#57C2FF]/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_#57C2FF]">
                                <ShieldCheck className="w-12 h-12 text-[#57C2FF]" />
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-widest">UPLOAD SUCCESS</h2>
                            <p className="text-[#57C2FF] font-mono tracking-widest">Transmission securely acquired by GWP Core.</p>
                            <button onClick={()=>setStep(0)} className="mt-12 text-white/50 hover:text-white underline font-mono text-xs">Initialize new sequence</button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
            
        </section>
    );
};

export default ContactFormSection;
