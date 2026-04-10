import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Share2, Mail, User, Briefcase, Globe, ExternalLink, Linkedin, Facebook } from "lucide-react";

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

const BentoTile = ({ children, className = "", title = "", icon: Icon }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className={`relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 group overflow-hidden ${className}`}
    >
        {/* Subtle Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        
        {title && (
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-[#57C2FF]/10 rounded-2xl border border-[#57C2FF]/20 group-hover:bg-[#57C2FF]/20 transition-colors duration-500">
                    <Icon className="w-5 h-5 text-[#57C2FF]" />
                </div>
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-white/50">{title}</h3>
            </div>
        )}
        
        <div className="relative z-10 h-full">
            {children}
        </div>
    </motion.div>
);

const ContactBento = () => {
    const [formData, setFormData] = useState({
        name: "", lastname: "",
        company: "", email: "",
        service: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="relative py-20 lg:py-32 px-4 sm:px-8 lg:px-16 bg-[#040816] overflow-hidden">
            
            {/* Background Ambient Lights */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
                
                {/* --- 1. THE MAIN FORM TILE (6 COLS) --- */}
                <BentoTile 
                    title="Direct Transmission" 
                    icon={Mail} 
                    className="md:col-span-12 lg:col-span-7 bg-gradient-to-br from-white/[0.07] to-white/[0.02]"
                >
                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Identity</label>
                            <input 
                                type="text" name="name" placeholder="First Name" 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#57C2FF]/50 transition-all focus:bg-white/[0.08]"
                            />
                        </div>
                        <div className="space-y-2 pt-6 sm:pt-0">
                            <label className="text-[10px] uppercase tracking-widest text-white/30 invisible sm:visible">Last Name</label>
                            <input 
                                type="text" name="lastname" placeholder="Last Name" 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#57C2FF]/50 transition-all focus:bg-white/[0.08]"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Digital Link</label>
                            <input 
                                type="email" name="email" placeholder="Professional Email Address" 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#57C2FF]/50 transition-all focus:bg-white/[0.08]"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Sector & Architecture</label>
                            <select 
                                name="service" 
                                className="w-full bg-[#0a1128] border border-white/10 rounded-2xl px-6 py-4 text-white/50 focus:outline-none focus:border-[#57C2FF]/50 transition-all appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select Business Area</option>
                                <optgroup label="── Agentic AI Copilot ──">
                                    <option value="AI Sales">AI-Powered Sales Assistant</option>
                                    <option value="Role-AI">Role Specific / Knowledge Agent</option>
                                    <option value="Intake">Request Intake Agent</option>
                                </optgroup>
                                <optgroup label="── Custom Solutions ──">
                                    <option value="WebDev">Web Development & Wordpress</option>
                                    <option value="QA">Testing / QA & Accessibility</option>
                                    <option value="Site360">Site360.ai Experience</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Data Payload</label>
                            <textarea 
                                rows="4" placeholder="Briefly describe your requirements..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#57C2FF]/50 transition-all focus:bg-white/[0.08] resize-none"
                            />
                        </div>
                        <div className="md:col-span-2 pt-4">
                            <button className="w-full bg-[#57C2FF] hover:bg-white text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-[0_10px_30px_rgba(87,194,255,0.3)] transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 group/btn">
                                Initiate Uplink
                                <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </form>
                </BentoTile>

                {/* --- 2. THE FEATURED INSIGHT TILE (5 COLS) --- */}
                <BentoTile 
                    title="Latest Insight" 
                    icon={Briefcase} 
                    className="md:col-span-12 lg:col-span-5 relative group/blog cursor-pointer"
                >
                    <div className="h-full flex flex-col justify-between" onClick={() => window.location.href='/blogs'}>
                        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-8 border border-white/10">
                            <img 
                                src="/images/aiblog-.webp" 
                                alt="Blog" 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover/blog:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#040816]/80 to-transparent" />
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-widest text-white">Engineering</div>
                                <div className="text-white/60 text-[9px] font-mono">5 MIN READ</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover/blog:text-[#57C2FF] transition-colors duration-500 leading-tight">AI-Powered Web Content Optimizer</h4>
                            <p className="text-white/40 text-sm leading-relaxed mb-8">Creating optimized content that resonates with audiences while meeting technical requirements has become increasingly complex... discover how our AI can help.</p>
                        </div>
                        <div className="flex items-center gap-2 text-[#57C2FF] text-xs font-bold uppercase tracking-widest mt-auto group-hover/blog:gap-4 transition-all">
                            Read Full Insight <ExternalLink className="w-4 h-4" />
                        </div>
                    </div>
                </BentoTile>

                {/* --- 3. GLOBAL NODES TILE (6 COLS) --- */}
                <BentoTile 
                    title="Active Regions" 
                    icon={MapPin} 
                    className="md:col-span-12 lg:col-span-6"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl group/loc hover:bg-white/[0.08] transition-all duration-500">
                            <div className="w-12 h-8 overflow-hidden rounded mb-6 opacity-60 group-hover/loc:opacity-100 transition-opacity">
                                <USAFlagSVG />
                            </div>
                            <h5 className="text-white text-lg font-bold mb-2">United States</h5>
                            <p className="text-white/30 text-xs font-mono mb-4 uppercase tracking-widest">Temecula, California</p>
                            <div className="flex items-center gap-2 text-[#57C2FF]/50 text-[10px] group-hover/loc:text-[#57C2FF] transition-colors">
                                <div className="w-2 h-2 rounded-full bg-[#57C2FF] animate-pulse" />
                                Operational Node
                            </div>
                        </div>
                        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl group/loc hover:bg-white/[0.08] transition-all duration-500">
                            <div className="w-12 h-8 overflow-hidden rounded mb-6 opacity-60 group-hover/loc:opacity-100 transition-opacity">
                                <IndiaFlagSVG />
                            </div>
                            <h5 className="text-white text-lg font-bold mb-2">India</h5>
                            <p className="text-white/30 text-xs font-mono mb-4 uppercase tracking-widest">Trivandrum, Kerala</p>
                            <div className="flex items-center gap-2 text-[#57C2FF]/50 text-[10px] group-hover/loc:text-[#57C2FF] transition-colors">
                                <div className="w-2 h-2 rounded-full bg-[#57C2FF] animate-pulse" />
                                Operational Node
                            </div>
                        </div>
                    </div>
                </BentoTile>

                {/* --- 4. SOCIAL HUB TILE (6 COLS) --- */}
                <BentoTile 
                    title="Network Hub" 
                    icon={Share2} 
                    className="md:col-span-12 lg:col-span-6"
                >
                    <div className="flex flex-col justify-between h-full gap-8">
                        <div>
                            <p className="text-white/50 mb-8 leading-relaxed">Join the conversation at our digital frontiers. We maintain active pipelines across professional and social ecosystems.</p>
                            <div className="flex flex-wrap gap-4">
                                <a 
                                    href="https://www.linkedin.com/company/global-web-production/" 
                                    className="flex items-center gap-4 bg-[#0A66C2]/10 border border-[#0A66C2]/30 px-6 py-4 rounded-2xl hover:bg-[#0A66C2]/20 transition-all group/soc"
                                >
                                    <Linkedin className="w-6 h-6 text-[#0A66C2]" />
                                    <div className="text-left">
                                        <div className="text-white font-bold text-sm">LinkedIn</div>
                                        <div className="text-white/30 text-[10px] uppercase font-mono tracking-widest">Global Network</div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-white/20 group-hover/soc:text-white transition-colors ml-4" />
                                </a>
                                <a 
                                    href="https://www.facebook.com/globalwebproduction/" 
                                    className="flex items-center gap-4 bg-blue-600/10 border border-blue-600/30 px-6 py-4 rounded-2xl hover:bg-blue-600/20 transition-all group/soc"
                                >
                                    <Facebook className="w-6 h-6 text-blue-600" />
                                    <div className="text-left">
                                        <div className="text-white font-bold text-sm">Facebook</div>
                                        <div className="text-white/30 text-[10px] uppercase font-mono tracking-widest">Social Feed</div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-white/20 group-hover/soc:text-white transition-colors ml-4" />
                                </a>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-white/10 flex justify-between items-center text-white/30 text-[10px] font-mono tracking-widest">
                            <span>ENCRYPTION ACTIVE</span>
                            <div className="flex gap-2">
                                <div className="w-1 h-1 bg-white/30 rounded-full" />
                                <div className="w-1 h-1 bg-white/30 rounded-full" />
                                <div className="w-1 h-1 bg-white/30 rounded-full" />
                            </div>
                        </div>
                    </div>
                </BentoTile>

            </div>
        </section>
    );
};

export default ContactBento;
