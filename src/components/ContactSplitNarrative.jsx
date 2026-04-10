import React from "react";
import { motion } from "framer-motion";
import { 
    User, Mail, Briefcase, MessageSquare, Send, 
    Linkedin, Facebook, ArrowUpRight, Globe, MapPin 
} from "lucide-react";

const IndiaFlagSVG = () => (
    <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
        <rect width="900" height="200" fill="#f93" />
        <rect width="900" height="200" y="200" fill="#fff" />
        <rect width="900" height="200" y="400" fill="#128807" />
    </svg>
);

const USAFlagSVG = () => (
    <svg viewBox="0 0 741 390" className="w-full h-full object-cover">
        <rect width="741" height="390" fill="#b22234" />
        <rect width="296.4" height="210" fill="#3c3b6e" />
    </svg>
);

const TextMaskReveal = ({ children, delay = 0 }) => (
    <div className="overflow-hidden">
        <motion.div
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
        >
            {children}
        </motion.div>
    </div>
);

const NarrativeModule = ({ children, className }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`relative ${className}`}
    >
        {children}
    </motion.div>
);

const ContactSplitNarrative = () => {
    const inputClasses = "w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500 transition-all font-light text-lg";

    return (
        <section className="relative min-h-screen bg-[#040816] text-white overflow-hidden">
            {/* Split Layout Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                
                {/* LEFT COLUMN: VISUAL MARQUEE */}
                <div className="hidden lg:flex sticky top-0 h-screen bg-blue-600 items-center justify-center overflow-hidden">
                    <motion.div 
                        initial={{ opacity: 0, scale: 1.2 }}
                        whileInView={{ opacity: 0.1, scale: 1 }}
                        transition={{ duration: 2 }}
                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" 
                    />
                    <div className="relative z-10 select-none pointer-events-none">
                        <motion.h2 
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-[15rem] font-black leading-none flex flex-col items-center"
                        >
                            <span className="text-white">GWP</span>
                            <span className="text-transparent border-text" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)" }}>CONNECT</span>
                        </motion.h2>
                    </div>
                </div>

                {/* RIGHT COLUMN: SCROLLING NARRATIVE */}
                <div className="relative px-6 sm:px-12 lg:px-20 py-24 space-y-32">
                    
                    {/* Module: Intro */}
                    <div className="max-w-xl">
                        <TextMaskReveal>
                            <h2 className="text-5xl sm:text-7xl font-bold mb-8 leading-tight">Send us a message.</h2>
                        </TextMaskReveal>
                        <NarrativeModule delay={0.2}>
                            <p className="text-xl text-white/60 font-light leading-relaxed">
                                We want to hear from you! Contact our team to learn about the services and language solutions we can provide to aid your business.
                            </p>
                        </NarrativeModule>
                    </div>

                    {/* Module: The Form */}
                    <NarrativeModule className="max-w-xl">
                        <form className="space-y-12">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-[0.2em] text-blue-500 font-bold">First Name*</label>
                                    <input type="text" placeholder="Your Name" required className={inputClasses} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-[0.2em] text-blue-500 font-bold">Last Name*</label>
                                    <input type="text" placeholder="Your Surname" required className={inputClasses} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-[0.2em] text-blue-500 font-bold">Company</label>
                                    <input type="text" placeholder="Entity" className={inputClasses} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-[0.2em] text-blue-500 font-bold">Email*</label>
                                    <input type="email" placeholder="Address" required className={inputClasses} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-[0.2em] text-blue-500 font-bold">Business Areas*</label>
                                <select required className={`${inputClasses} appearance-none cursor-pointer`}>
                                    <option value="" disabled selected className="bg-[#040816]">Select a Protocol</option>
                                    <optgroup label="── Agentic AI – Copilot ──" className="bg-[#040816] text-blue-400">
                                        <option value="AI-Powered-Agentic-Sales-Assistant">AI-Powered Agentic Sales Assistant | Co-Pilot Based</option>
                                        <option value="Ask-Me-Role-Specific">Ask Me – Role Specific | Finetuned & Orchestrated</option>
                                        <option value="Ask-Me-Knowledge-Agent">Ask Me – Knowledge Agent | Corporate Brain</option>
                                        <option value="Request-Intake-Agent">Request Intake Agent | Reporting & Dashboards</option>
                                        <option value="Content-Update-Agent-WebOps">Content Update Agent for WebOps (Connected to WP)</option>
                                        <option value="Content-Checker-Agent">Aria Label / Alt Text Generator / Content Checker Agent</option>
                                    </optgroup>
                                    <optgroup label="── Agentic AI – Custom ──" className="bg-[#040816] text-blue-400">
                                        <option value="Supervisor-Agent">Supervisor Agent</option>
                                        <option value="AI-Document-Extractor">AI Document Extractor</option>
                                        <option value="HR-Assistant">HR Assistant</option>
                                        <option value="Aptitude-IQ-Assessment">AI-Powered Aptitude & IQ Assessment</option>
                                    </optgroup>
                                    <optgroup label="── Products ──" className="bg-[#040816] text-blue-400">
                                        <option value="Site360ai">Site360.ai</option>
                                        <option value="Quality-Checker-Extension">Quality Checker Extension</option>
                                        <option value="Content-Search-Tools">Content Search Tools</option>
                                    </optgroup>
                                    <optgroup label="── Services ──" className="bg-[#040816] text-blue-400">
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
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-[0.2em] text-blue-500 font-bold">How can we help you?*</label>
                                <textarea name="message" placeholder="Describe your vision..." rows="3" required className={`${inputClasses} resize-none`}></textarea>
                            </div>

                            <button type="submit" className="group flex items-center gap-6 text-2xl font-black uppercase tracking-[0.2em] hover:text-blue-500 transition-colors">
                                Send Message <span className="w-16 h-px bg-white/20 group-hover:w-24 group-hover:bg-blue-500 transition-all duration-500" />
                                <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </form>
                    </NarrativeModule>

                    {/* Module: Featured Insight */}
                    <NarrativeModule className="max-w-2xl bg-white/5 p-10 rounded-[3rem] border border-white/5 group hover:bg-white/10 transition-colors">
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="w-full md:w-1/2 aspect-square overflow-hidden rounded-3xl">
                                <img src="/images/aiblog-.webp" alt="Blog" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                            </div>
                            <div className="w-full md:w-1/2">
                                <h3 className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-4 font-black">Featured Article</h3>
                                <h4 className="text-2xl font-bold mb-4 leading-tight">AI-Powered Web Content Optimizer: Enhancing UX</h4>
                                <p className="text-white/40 text-sm mb-8 leading-relaxed">
                                    Creating optimized content that resonates with audiences while meeting technical requirements has become complex.
                                </p>
                                <a href="/blogs" className="inline-flex items-center gap-2 text-white font-bold text-sm tracking-widest group/link">
                                    READ MORE <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </NarrativeModule>

                    {/* Module: Locations & Socials */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-2xl">
                        <NarrativeModule className="space-y-10">
                            <h3 className="text-xs uppercase tracking-[0.3em] text-blue-400 font-black">Global Positioning</h3>
                            <div className="space-y-10">
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-8 rounded shrink-0 overflow-hidden border border-white/10"><USAFlagSVG /></div>
                                    <div>
                                        <div className="text-lg font-bold">USA</div>
                                        <div className="text-white/40 font-light">Temecula, California</div>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-8 rounded shrink-0 overflow-hidden border border-white/10"><IndiaFlagSVG /></div>
                                    <div>
                                        <div className="text-lg font-bold">India</div>
                                        <div className="text-white/40 font-light">Trivandrum, Kerala</div>
                                    </div>
                                </div>
                            </div>
                        </NarrativeModule>

                        <NarrativeModule className="space-y-10">
                            <h3 className="text-xs uppercase tracking-[0.3em] text-blue-400 font-black">Stay Connected</h3>
                            <div className="flex gap-6">
                                <a href="https://www.facebook.com/globalwebproduction/" target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                                    <Facebook className="w-6 h-6" />
                                </a>
                                <a href="https://www.linkedin.com/company/global-web-production/" target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            </div>
                            <div className="pt-8 text-white/20 text-[10px] uppercase tracking-[0.5em] font-black">
                                &copy; GWP DIGITAL PRODUCTIONS
                            </div>
                        </NarrativeModule>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSplitNarrative;
