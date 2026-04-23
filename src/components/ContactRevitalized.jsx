import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    User, Mail, Briefcase, MessageSquare, Send, 
    Facebook, Linkedin, ArrowUpRight, Globe, Info, Search 
} from 'lucide-react';

const BlueprintGrid = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        {/* Main Grid */}
        <div className="absolute inset-0" 
             style={{ 
                 backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
                 backgroundSize: '40px 40px' 
             }} 
        />
        {/* Sub Grid */}
        <div className="absolute inset-0" 
             style={{ 
                 backgroundImage: `linear-gradient(to right, #3b82f6 0.5px, transparent 0.5px), linear-gradient(to bottom, #3b82f6 0.5px, transparent 0.5px)`,
                 backgroundSize: '10px 10px',
                 opacity: 0.3
             }} 
        />
        {/* Glowing Circuit Lines */}
        <div className="absolute h-[1px] w-full bg-blue-500 top-1/4 animate-[pulse_4s_infinite]" />
        <div className="absolute h-[1px] w-full bg-blue-500 top-2/3 opacity-30" />
        <div className="absolute w-[1px] h-full bg-blue-500 left-1/4 opacity-40" />
        <div className="absolute w-[1px] h-full bg-blue-500 left-3/4 animate-[pulse_6s_infinite]" />
    </div>
);

const SatelliteModule = ({ children, title, className = "", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -5 }}
        className={`relative bg-[#000021]/80 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] group ${className}`}
    >
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-500/30 group-hover:border-blue-500 transition-colors" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500/30 group-hover:border-blue-500 transition-colors" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-500/30 group-hover:border-blue-500 transition-colors" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-500/30 group-hover:border-blue-500 transition-colors" />
        
        {title && (
            <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500/80">{title}</h4>
            </div>
        )}
        {children}
    </motion.div>
);

const BUSINESS_AREAS = [
    {
        label: "── Agentic AI – Copilot ──",
        options: [
            { value: "Sales-Assistant", text: "AI-Powered Agentic Sales Assistant" },
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
            { value: "Doc-Extractor", text: "AI Document Extractor" },
            { value: "HR-Assistant", text: "HR Assistant" },
            { value: "IQ-Assessment", text: "AI-Powered Aptitude & IQ" }
        ]
    },
    {
        label: "── Products & Services ──",
        options: [
            { value: "Site360ai", text: "Site360.ai" },
            { value: "Quality-Extension", text: "Quality Checker Extension" },
            { value: "Web-Development", text: "Web Development" },
            { value: "Managed-Services", text: "Managed Services" },
            { value: "Web-Accessibility", text: "Web Accessibility" },
            { value: "CRM-Solutions", text: "CRM Solutions" },
            { value: "SEO-Performance", text: "SEO & Site Performance" }
        ]
    }
];

const IndiaFlagSVG = () => (
    <svg width="24" height="16" viewBox="0 0 900 600" className="w-6 h-4 object-cover shadow-sm">
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
    <svg width="24" height="16" viewBox="0 0 741 390" className="w-6 h-4 object-cover shadow-sm">
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

const ContactRevitalized = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        businessArea: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First Identity Required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last Identity Required';
        if (!formData.email.trim()) {
            newErrors.email = 'Vector Address Required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid Vector Syntax';
        }
        if (!formData.businessArea) newErrors.businessArea = 'Protocol Selection Required';
        if (!formData.message.trim()) newErrors.message = 'Transmission Data Required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Save to Local Storage
            const submissions = JSON.parse(localStorage.getItem('gwp_contact_submissions') || '[]');
            submissions.push({ ...formData, timestamp: new Date().toISOString() });
            localStorage.setItem('gwp_contact_submissions', JSON.stringify(submissions));
            
            setIsSubmitted(true);
            // In a real app, you'd send this to an API here
        }
    };

    const inputClasses = (name) => `w-full bg-blue-900/10 border ${errors[name] ? 'border-red-500/50' : 'border-blue-500/10'} rounded-xl px-5 py-4 text-white placeholder:text-blue-100/20 focus:outline-none focus:border-blue-500/50 transition-all font-public-sans text-sm`;

    return (
        <section className="relative w-full py-32 bg-[#020617] min-h-screen overflow-hidden px-6 lg:px-12">
            <BlueprintGrid />
            
            <AnimatePresence>
                {isSubmitted && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center p-6 text-center"
                    >
                        <BlueprintGrid />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative z-10"
                        >
                            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-8 mx-auto shadow-[0_0_50px_rgba(37,99,235,0.5)]">
                                <Send className="w-10 h-10 text-white animate-bounce" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-4 uppercase italic">Transmission Received.</h2>
                            <p className="text-blue-400 font-black tracking-[0.3em] mb-12 uppercase">Protocol_Confirmed</p>
                            <p className="text-gray-400 max-w-md mx-auto mb-12 text-lg">
                                Your data has been successfully written to the local transmission log. We will decode your vision shortly.
                            </p>
                            <button 
                                onClick={() => { setIsSubmitted(false); setFormData({ firstName: '', lastName: '', company: '', email: '', businessArea: '', message: '' }); }}
                                className="px-10 py-4 border-2 border-blue-500/20 text-blue-500 font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all rounded-xl"
                            >
                                New Transmission
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Main Form Satellite (Staggered Left) */}
                    <div className="lg:col-span-8 lg:mt-12">
                        <SatelliteModule className="p-6 sm:p-8 lg:p-12 border-blue-500/40">
                            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-xl lg:text-3xl xl:text-3xl 2xl:text-4xl font-bold text-white mb-2 xs:mb-2 sm:mb-3 md:mb-2 lg:mb-4 xl:mb-4">Send us a message.</h2>
                            <p className="text-gray-400 mb-4 xs:mb-5 sm:mb-6 md:mb-5 lg:mb-8 xl:mb-10 text-xs xs:text-sm sm:text-base md:text-sm lg:text-base xl:text-lg max-w-xl">
                                We want to hear from you! Contact our team to learn about the services and language solutions we can provide to aid your business.
                            </p>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500/30 group-focus-within:text-blue-500" />
                                        <input 
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            type="text" 
                                            placeholder="First Name*" 
                                            className={`${inputClasses('firstName')} pl-12`} 
                                        />
                                        {errors.firstName && <span className="text-[10px] text-red-500 mt-1 absolute -bottom-4 left-0 uppercase font-black tracking-widest">{errors.firstName}</span>}
                                    </div>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500/30 group-focus-within:text-blue-500" />
                                        <input 
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            type="text" 
                                            placeholder="Last Name*" 
                                            className={`${inputClasses('lastName')} pl-12`} 
                                        />
                                        {errors.lastName && <span className="text-[10px] text-red-500 mt-1 absolute -bottom-4 left-0 uppercase font-black tracking-widest">{errors.lastName}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                                    <div className="relative group">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500/30 group-focus-within:text-blue-500" />
                                        <input 
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            type="text" 
                                            placeholder="Company" 
                                            className={`${inputClasses('company')} pl-12`} 
                                        />
                                    </div>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500/30 group-focus-within:text-blue-500" />
                                        <input 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email" 
                                            placeholder="Email*" 
                                            className={`${inputClasses('email')} pl-12`} 
                                        />
                                        {errors.email && <span className="text-[10px] text-red-500 mt-1 absolute -bottom-4 left-0 uppercase font-black tracking-widest">{errors.email}</span>}
                                    </div>
                                </div>
                                <div className="relative group pt-2">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500/30 group-focus-within:text-blue-500" />
                                    <select 
                                        name="businessArea"
                                        value={formData.businessArea}
                                        onChange={handleChange}
                                        className={`${inputClasses('businessArea')} pl-12 appearance-none cursor-pointer`}
                                    >
                                        <option value="" disabled className="bg-[#020617]">Select a Business Area*</option>
                                        {BUSINESS_AREAS.map((group, i) => (
                                            <optgroup key={i} label={group.label} className="bg-[#020617] text-blue-500 font-bold">
                                                {group.options.map((opt, j) => (
                                                    <option key={j} value={opt.value} className="bg-[#020617] text-white py-1">{opt.text}</option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                    {errors.businessArea && <span className="text-[10px] text-red-500 mt-1 absolute -bottom-4 left-0 uppercase font-black tracking-widest">{errors.businessArea}</span>}
                                </div>
                                <div className="relative group pt-2">
                                    <MessageSquare className="absolute left-4 top-5 w-4 h-4 text-blue-500/30 group-focus-within:text-blue-500" />
                                    <textarea 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="How can we help you?*" 
                                        rows="4" 
                                        className={`${inputClasses('message')} pl-12 resize-none pt-4`}
                                    ></textarea>
                                    {errors.message && <span className="text-[10px] text-red-500 mt-1 absolute -bottom-4 left-0 uppercase font-black tracking-widest">{errors.message}</span>}
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.02, backgroundColor: '#3b82f6' }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full sm:w-auto px-12 py-4 bg-blue-600/80 text-white font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(59,130,246,0.2)] mt-4"
                                >
                                    <Send className="w-5 h-5" /> Send Message
                                </motion.button>
                            </form>
                        </SatelliteModule>
                    </div>

                    {/* Sidebar Satellites */}
                    <div className="lg:col-span-4 space-y-8 flex flex-col items-center lg:items-end">
                        
                        {/* Featured Node */}
                        <SatelliteModule className="w-full" delay={0.2}>
                            <div className="mb-4 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                <img src="/images/aiblog-.webp" alt="Insight" className="w-full h-auto object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                            </div>
                            <h3 className="font-bold text-white text-sm xs:text-base sm:text-lg md:text-base lg:text-xl xl:text-xl 2xl:text-2xl mb-1 xs:mb-2 italic">AI-Powered Web Content Optimizer: Enhancing UX</h3>
                            <p className="text-gray-400 text-xs xs:text-xs sm:text-sm md:text-xs lg:text-sm xl:text-base 2xl:text-lg leading-relaxed mb-6 font-light">Creating optimized content that resonates with audiences while meeting technical requirements has become increasingly complex.</p>
                            <a href="/blogs/WebContentOptimization" className="flex items-center gap-2 text-blue-400 font-bold text-[10px] tracking-widest uppercase group/link hover:text-white transition-colors">
                                READ FULL ARTICLE <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                            </a>
                        </SatelliteModule>

                        {/* Location Node */}
                        <SatelliteModule className="w-full" delay={0.4}>
                            <h3 className="font-bold text-white text-sm xs:text-base sm:text-lg md:text-base lg:text-xl xl:text-xl 2xl:text-2xl mb-4 xs:mb-6">Global Node</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-6 shrink-0 rounded border border-blue-500/20"><USAFlagSVG /></div>
                                    <div>
                                        <div className="text-white font-bold text-xs tracking-widest uppercase">USA [33.49N 117.14W]</div>
                                        <div className="text-blue-100/30 text-[10px]">Temecula, California</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-6 shrink-0 rounded border border-blue-500/20"><IndiaFlagSVG /></div>
                                    <div>
                                        <div className="text-white font-bold text-xs tracking-widest uppercase">India [8.52N 76.93E]</div>
                                        <div className="text-blue-100/30 text-[10px]">Trivandrum, Kerala</div>
                                    </div>
                                </div>
                            </div>
                        </SatelliteModule>

                        {/* Social Node */}
                        <SatelliteModule className="w-full lg:w-auto" delay={0.6}>
                            <h3 className="font-bold text-white text-sm xs:text-base sm:text-lg md:text-base lg:text-xl xl:text-xl 2xl:text-2xl mb-4 xs:mb-6">Stay Connected</h3>
                            <div className="flex gap-4">
                                <a href="https://facebook.com" className="w-12 h-12 rounded-xl bg-blue-500/5 flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                                    <Facebook className="w-6 h-6" />
                                </a>
                                <a href="https://www.linkedin.com/company/global-web-production/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-blue-500/5 flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            </div>
                        </SatelliteModule>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactRevitalized;
