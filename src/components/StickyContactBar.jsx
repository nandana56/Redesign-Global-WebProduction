import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const StickyContactBar = () => {
    return (
        <div className="fixed right-0 top-[48%] -translate-y-1/2 flex flex-col gap-0 z-[110] shadow-2xl">
            {/* Email */}
            <div className="group relative">
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 duration-300 scale-90 group-hover:scale-100 transition-all pointer-events-none shadow-xl border border-white/10">
                    Send us an Email
                </div>
                <div className="relative">
                    <div className="absolute -inset-[1px] bg-white/20 opacity-0 group-hover:opacity-100 transition duration-300 z-0"></div>
                    <a 
                        href="mailto:lekshmi@globalwebproduction.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="relative w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center transition-all duration-300 hover:scale-[1.05] hover:z-10 z-1"
                        aria-label="Send us an Email"
                    >
                        <FaEnvelope className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                    </a>
                </div>
            </div>

            {/* LinkedIn */}
            <div className="group relative">
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 duration-300 scale-90 group-hover:scale-100 transition-all pointer-events-none shadow-xl border border-white/10">
                    Connect with us on LinkedIn
                </div>
                <div className="relative">
                    <div className="absolute -inset-[1px] bg-white/20 opacity-0 group-hover:opacity-100 transition duration-300 z-0"></div>
                    <a 
                        href="https://www.linkedin.com/company/global-web-production/posts/?feedView=all" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="relative w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center transition-all duration-300 hover:scale-[1.05] hover:z-10 z-1"
                        aria-label="Connect with us on LinkedIn"
                    >
                        <FaLinkedinIn className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                    </a>
                </div>
            </div>

            {/* Contact Phone */}
            <div className="group relative">
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 duration-300 scale-90 group-hover:scale-100 transition-all pointer-events-none shadow-xl border border-white/10">
                    Contact us now
                </div>
                <div className="relative">
                    <div className="absolute -inset-[1px] bg-white/20 opacity-0 group-hover:opacity-100 transition duration-300 z-0"></div>
                    <a 
                        href="/contact" 
                        className="relative w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center transition-all duration-300 hover:scale-[1.05] hover:z-10 z-1"
                        aria-label="Contact us now"
                    >
                        <FaPhoneAlt className="w-4 h-4 text-white transition-transform duration-300 group-hover:scale-110" />
                    </a>
                </div>
            </div>

            {/* Scroll to Top */}
            <div className="group relative">
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 duration-300 scale-90 group-hover:scale-100 transition-all pointer-events-none shadow-xl border border-white/10">
                    Scroll to Top
                </div>
                <div className="relative">
                    <div className="absolute -inset-[1px] bg-white/20 opacity-0 group-hover:opacity-100 transition duration-300 z-0"></div>
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="relative w-10 h-10 bg-gradient-to-r from-blue-700 to-[#003153] flex items-center justify-center transition-all duration-300 hover:scale-[1.05] hover:z-10 z-1 border-t border-white/10"
                        aria-label="Scroll to Top"
                    >
                        <motion.div
                            animate={{ y: [2, -2, 2] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
                            </svg>
                        </motion.div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StickyContactBar;
