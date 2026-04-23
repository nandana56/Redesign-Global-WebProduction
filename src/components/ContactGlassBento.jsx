import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  User, Mail, Briefcase, MessageSquare, Send, 
  Linkedin, Facebook, ArrowUpRight, Globe, MapPin 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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

const GlassBentoBox = ({ children, className }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ 
                scale: 1.01, 
                rotateX: 1, 
                rotateY: -1,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(59, 130, 246, 0.2)" 
            }}
            className={`bento-box relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] overflow-hidden transition-all duration-300 group ${className}`}
        >
            {/* Dynamic Glow Layer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(59,130,246,0.15)_0%,transparent_50%)] pointer-events-none" />
            {children}
        </motion.div>
    );
};

const ContactGlassBento = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const boxes = document.querySelectorAll('.group');
            boxes.forEach(box => {
                const rect = box.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                box.style.setProperty('--mouse-x', `${x}px`);
                box.style.setProperty('--mouse-y', `${y}px`);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white/10";

    return (
        <section ref={containerRef} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#040816] overflow-hidden z-20">
            {/* DEBUG HEADING */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 text-white/20 text-[10px] uppercase tracking-widest pointer-events-none">
                CONTACT_GLASS_BENTO_MOUNTED
            </div>
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Panel: Contact Form (8 cols) */}
                    <GlassBentoBox className="lg:col-span-8 p-8 sm:p-12 relative">
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Send us a message.</h2>
                            <p className="text-gray-400 mb-10 max-w-xl text-lg leading-relaxed">
                                We want to hear from you! Contact our team to learn about the services and language solutions we can provide to aid your business.
                            </p>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <label className="block text-gray-400 text-sm font-medium mb-2 ml-1">First name*</label>
                                        <User className="absolute left-4 top-[52px] w-5 h-5 text-gray-500" />
                                        <input type="text" placeholder="Your First Name" required className={inputClasses} />
                                    </div>
                                    <div className="relative">
                                        <label className="block text-gray-400 text-sm font-medium mb-2 ml-1">Last name*</label>
                                        <User className="absolute left-4 top-[52px] w-5 h-5 text-gray-500" />
                                        <input type="text" placeholder="Your Last Name" required className={inputClasses} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <label className="block text-gray-400 text-sm font-medium mb-2 ml-1">Company</label>
                                        <Briefcase className="absolute left-4 top-[52px] w-5 h-5 text-gray-500" />
                                        <input type="text" placeholder="Your Company" className={inputClasses} />
                                    </div>
                                    <div className="relative">
                                        <label className="block text-gray-400 text-sm font-medium mb-2 ml-1">Email*</label>
                                        <Mail className="absolute left-4 top-[52px] w-5 h-5 text-gray-500" />
                                        <input type="email" placeholder="Your Email" required className={inputClasses} />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-gray-400 text-sm font-medium mb-2 ml-1">Business Areas*</label>
                                    <Briefcase className="absolute left-4 top-[52px] w-5 h-5 text-gray-500 z-10" />
                                    <select required className={`${inputClasses} appearance-none`}>
                                        <option value="" disabled selected className="bg-[#0a1128]">Select a Service / Product Demo</option>
                                        <optgroup label="── Agentic AI – Copilot ──" className="bg-[#0a1128] text-blue-400">
                                            <option value="AI-Powered-Agentic-Sales-Assistant">AI-Powered Agentic Sales Assistant | Co-Pilot Based</option>
                                            <option value="Ask-Me-Role-Specific">Ask Me – Role Specific | Finetuned & Orchestrated</option>
                                            <option value="Ask-Me-Knowledge-Agent">Ask Me – Knowledge Agent | Corporate Brain</option>
                                            <option value="Request-Intake-Agent">Request Intake Agent | Reporting & Dashboards</option>
                                            <option value="Content-Update-Agent-WebOps">Content Update Agent for WebOps (Connected to WP)</option>
                                            <option value="Content-Checker-Agent">Aria Label / Alt Text Generator / Content Checker Agent</option>
                                        </optgroup>
                                        <optgroup label="── Agentic AI – Custom ──" className="bg-[#0a1128] text-blue-400">
                                            <option value="Supervisor-Agent">Supervisor Agent</option>
                                            <option value="AI-Document-Extractor">AI Document Extractor</option>
                                            <option value="HR-Assistant">HR Assistant</option>
                                            <option value="Aptitude-IQ-Assessment">AI-Powered Aptitude & IQ Assessment</option>
                                        </optgroup>
                                        <optgroup label="── Products ──" className="bg-[#0a1128] text-blue-400">
                                            <option value="Site360ai">Site360.ai</option>
                                            <option value="Quality-Checker-Extension">Quality Checker Extension</option>
                                            <option value="Content-Search-Tools">Content Search Tools</option>
                                        </optgroup>
                                        <optgroup label="── Services ──" className="bg-[#0a1128] text-blue-400">
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
                                    <div className="absolute right-4 top-[58px] pointer-events-none text-gray-500">
                                        <ArrowUpRight className="w-4 h-4 rotate-45" />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-gray-400 text-sm font-medium mb-2 ml-1">How can we help you?*</label>
                                    <MessageSquare className="absolute left-4 top-[52px] w-5 h-5 text-gray-500" />
                                    <textarea rows="4" placeholder="Briefly describe your requirements..." required className={`${inputClasses} resize-none`}></textarea>
                                </div>

                                <button type="submit" className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-95 group/btn">
                                    Send Message <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </GlassBentoBox>

                    {/* Right Column: Featured + Locations + Socials */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        
                        {/* Featured Insight */}
                        <GlassBentoBox className="flex-1 p-8">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-blue-500" /> Featured
                            </h3>
                            <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-6 relative group/img">
                                <img src="/images/aiblog-.webp" alt="AI Web Content" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3 leading-snug">
                                AI-Powered Web Content Optimizer: Enhancing UX
                            </h4>
                            <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                                Creating optimized content that resonates with audiences while meeting technical requirements has become increasingly complex...
                            </p>
                            <a href="/blogs" className="text-blue-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2 group/link">
                                Read Full Article <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                            </a>
                        </GlassBentoBox>

                        {/* GWP Locations */}
                        <GlassBentoBox className="p-8">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-blue-500" /> GWP Locations
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 rounded-md overflow-hidden border border-white/10 shadow-lg">
                                        <USAFlagSVG />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm uppercase tracking-wider">USA</div>
                                        <div className="text-gray-400 text-sm">Temecula, California</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 rounded-md overflow-hidden border border-white/10 shadow-lg">
                                        <IndiaFlagSVG />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm uppercase tracking-wider">India</div>
                                        <div className="text-gray-400 text-sm">Trivandrum, Kerala</div>
                                    </div>
                                </div>
                            </div>
                        </GlassBentoBox>

                        {/* Stay Connected */}
                        <GlassBentoBox className="p-8">
                            <h3 className="text-xl font-bold text-white mb-6">Stay Connected</h3>
                            <div className="flex gap-4">
                                <a href="https://www.facebook.com/globalwebproduction/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-blue-600 hover:scale-110 hover:-rotate-12 transition-all duration-300 border border-white/5">
                                    <Facebook className="w-6 h-6" />
                                </a>
                                <a href="https://www.linkedin.com/company/global-web-production/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-blue-700 hover:scale-110 hover:rotate-12 transition-all duration-300 border border-white/5">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            </div>
                        </GlassBentoBox>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactGlassBento;
