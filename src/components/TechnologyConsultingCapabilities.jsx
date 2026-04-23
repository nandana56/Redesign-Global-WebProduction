import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const TechnologyConsultingCapabilities = () => {
    return (
        <section className="bg-neutral-50 py-24 px-6 md:px-12 font-poppins selection:bg-blue-500/30 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-16">
                
                {/* 1. Intro Section - Massive Glassmorphic Split */}
                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center bg-white p-8 sm:p-12 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-neutral-100"
                >
                    <div className="space-y-8">
                        <p className="text-base text-black leading-relaxed font-poppins">
                            At Global Web Production, our Technology Consulting practice helps enterprises harness the full potential of IT infrastructure, digital platforms, and customer technology ecosystems. We deliver end-to-end consulting services that align business goals with scalable, future-ready technology strategies.
                        </p>
                    </div>
                    <div className="relative overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/3] group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                        <img 
                            src="/Assets/Site360.webp" 
                            alt="Technology Consulting" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </motion.div>

                {/* 2. The Asymmetrical Bento Grid for Capabilities */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Bento Box 1: IT Assessments */}
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                        variants={fadeUp}
                        className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-lg border border-neutral-100 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
                    >
                        <div>
                            <div className="bg-neutral-50 border border-neutral-200 p-2 rounded-xl shrink-0 w-12 h-12 mb-6 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-neutral-700">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                </svg>
                            </div>
                            <h2 className="text-base sm:text-xl font-bold text-black mb-6 leading-tight">
                                IT Assessments & Architecture Roadmaps
                            </h2>
                            <p className="text-sm sm:text-base font-poppins text-black mb-12 leading-relaxed">
                                We conduct comprehensive IT assessments to evaluate current-state capabilities, identify performance gaps, and benchmark against industry best practices.
                            </p>
                        </div>

                        <div>
                            <ul className="mt-3 space-y-4 list-disc list-outside pl-5 text-sm sm:text-base text-black font-medium">
                                <li>Current-state infrastructure analysis</li>
                                <li>Gap assessment & opportunity identification</li>
                                <li>Cloud, hybrid, and on-premise architecture planning</li>
                                <li>Roadmap development & prioritization frameworks</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Bento Box 2: Martech & CRM (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                            variants={fadeUp}
                            className="bg-neutral-900 p-8 md:p-10 rounded-[2.5rem] shadow-lg flex-1 flex flex-col hover:bg-neutral-950 transition-colors duration-300 border border-neutral-800"
                        >
                            <div className="bg-neutral-800 p-2 rounded-xl shrink-0 w-12 h-12 mb-6 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3M12 22.5V19.5m6-12a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-6-4.5v.008M9.75 6.75v.008m4.5-.008v.008M9.75 9h.008m4.5-.008h.008M12 11.25v.008" />
                                </svg>
                            </div>
                            <h3 className="text-base sm:text-xl font-bold mb-6 text-white leading-tight">
                                Martech & CRM Landscape Consulting
                            </h3>
                            <p className="text-sm sm:text-base mb-8 text-neutral-400 leading-relaxed">
                                We help businesses assess, optimize, and transform their marketing technology stack and CRM capabilities to create connected customer journeys.
                            </p>
                            <div className="mt-auto">
                                <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base text-neutral-300">
                                    <li>Martech & CRM audits and maturity models</li>
                                    <li>Vendor evaluation and platform recommendations</li>
                                    <li>Integration strategy across marketing, sales & service</li>
                                    <li>Data governance and personalization frameworks</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bento Box 3: Digital Platform Rationalisation (Full width) */}
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                        variants={fadeUp}
                        className="lg:col-span-12 bg-[#06153d] rounded-[2.5rem] overflow-hidden mt-2"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-5">
                            {/* Left accent panel */}
                            <div className="lg:col-span-2 bg-[#06265e] p-10 md:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                                <div className="bg-white/10 p-2 rounded-xl shrink-0 w-12 h-12 mb-8 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                                    </svg>
                                </div>
                                <h3 className="text-base sm:text-xl font-bold text-white leading-tight mb-8">
                                    Digital Platform Rationalisation
                               </h3>
                                <p className="text-sm sm:text-base text-blue-100 leading-relaxed mb-6">
                                    We help you streamline digital assets, eliminate redundancies, and rationalize your platform portfolio to reduce cost and improve security.
                                </p>
                            </div>

                            {/* Right approach panel */}
                            <div className="lg:col-span-3 p-10 md:p-14 flex flex-col justify-center">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <ul className="space-y-4 list-disc list-outside pl-5 text-sm sm:text-base text-neutral-300">
                                        <li>Platform discovery and usage analytics</li>
                                        <li>Consolidation and sunset planning</li>
                                    </ul>
                                    <ul className="space-y-4 list-disc list-outside pl-5 text-sm sm:text-base text-neutral-300">
                                        <li>License optimization and cost reduction</li>
                                        <li>Strategic replatforming advisory</li>
                                    </ul>
                                </div>
                                <div className="mt-12 hidden md:block">
                                    {/* Accent Element */}
                                    <div className="w-full max-w-[400px] h-[150px] rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-blue-400/20 flex items-center justify-center backdrop-blur-sm">
                                        <div className="w-20 h-1 bg-blue-400/50 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* 3. The Why Choose Us Section */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    variants={fadeUp}
                    className="mt-20 lg:mt-32"
                >
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8 sm:mb-12">
                            Why Choose Global Web Production?
                        </h2>
                        <div className="text-sm sm:text-lg text-neutral-600 mb-8 sm:mb-12 leading-relaxed">
                            Our consultants blend deep technical knowledge with business acumen, helping organizations transform digital complexity into strategic advantage. Whether you're modernizing legacy systems or building an innovation-ready foundation, we partner with you every step of the way—from assessment to execution.
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                        <div className="bg-white p-8 rounded-3xl shadow-md border border-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <h4 className="text-xl font-bold text-black">Global delivery capability with local insight</h4>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-md border border-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <h4 className="text-xl font-bold text-black">Proven methodologies & scalable frameworks</h4>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-md border border-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <h4 className="text-xl font-bold text-black">Technology-agnostic guidance tailored to your goals</h4>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-md border border-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <h4 className="text-xl font-bold text-black">Transparent, collaborative engagement model</h4>
                        </div>
                    </div>
                </motion.div>

                {/* 4. Split CTA Section */}
                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    variants={fadeUp}
                    className="mt-20 lg:mt-32 rounded-lg bg-neutral-950 flex flex-col relative text-center py-12"
                >
                    {/* Background glow */}
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                    <div className="p-6 sm:p-12 max-w-4xl mx-auto relative z-10">
                        <h2 className="text-xl sm:text-xl md:text-base lg:text-2xl font-bold p-4 mb-6 text-white leading-tight">
                            Whether you need a strategic roadmap, a Martech overhaul, or a complete IT realignment, we’re here to help.
                        </h2>
                        <div>
                            <Link to="/contact">
                                <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 transition duration-300 active:scale-110 active:shadow-inner">
                                    Let’s Start a Conversation
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default TechnologyConsultingCapabilities;
