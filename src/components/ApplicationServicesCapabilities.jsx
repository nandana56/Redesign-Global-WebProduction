import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const ApplicationServicesCapabilities = () => {
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
                        <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-poppins font-medium">
                            At Global Web Production, we engineer modern applications that drive digital transformation, enable business agility, and accelerate innovation. Our Application Services are designed to solve complex business challenges with scalable, secure, and high-performing software solutions—tailored to your needs and built to thrive in today’s cloud-first world. We partner with enterprises across industries to design, build, and manage robust applications that are aligned with strategic goals and responsive to changing market demands.
                        </p>
                    </div>
                    <div className="relative overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/3] group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                        <img 
                            src="/Assets/Enterprise-Software-Development.jpg" 
                            alt="Application Engineering" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </motion.div>

                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-black text-center">Our Core Offerings</h2>

                {/* 2. The Asymmetrical Bento Grid for Capabilities */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Bento Box 1: Custom App Dev */}
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
                            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-6 leading-tight">
                                Custom Application Development (Web & Mobile)
                            </h2>
                            <p className="text-base font-poppins text-neutral-600 mb-12 leading-relaxed">
                                We specialize in building custom applications that are engineered for performance, scalability, and user engagement. Whether it's a complex enterprise platform or a sleek mobile experience, our team delivers secure, intuitive, and fully integrated digital products.
                            </p>
                        </div>

                        <div>
                            <ul className="mt-3 space-y-4 list-disc list-outside pl-5 text-sm sm:text-base text-black font-medium">
                                <li>End-to-end application lifecycle management</li>
                                <li>Responsive web apps & native/hybrid mobile apps</li>
                                <li>Integration with existing systems and data sources</li>
                                <li>UX-driven design and agile development methodologies</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Bento Box 2: API-First (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                            variants={fadeUp}
                            className="bg-neutral-900 p-8 md:p-10 rounded-[2.5rem] shadow-lg flex-1 flex flex-col hover:bg-neutral-950 transition-colors duration-300 border border-neutral-800"
                        >
                            <div className="bg-neutral-800 p-2 rounded-xl shrink-0 w-12 h-12 mb-6 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white leading-tight">
                                API-First & Composable Architecture
                            </h3>
                            <p className="text-sm sm:text-base mb-8 text-neutral-400 leading-relaxed">
                                We embrace an API-first approach to deliver composable applications that are flexible, modular, and future-ready. This allows organizations to build and evolve their digital ecosystems efficiently, with minimal dependencies and maximum interoperability.
                            </p>
                            <div className="mt-auto">
                                <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base text-neutral-300">
                                    <li>Microservices and headless architecture</li>
                                    <li>Scalable and reusable APIs</li>
                                    <li>Seamless third-party service integrations</li>
                                    <li>Faster development cycles and easier maintenance</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bento Box 3: Cloud Native (Full width) */}
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
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-8">
                                    Cloud-Native Deployments
                                </h3>
                                <p className="text-sm sm:text-base text-blue-100 leading-relaxed mb-6">
                                    We build applications optimized for the cloud—enabling on-demand scalability, resilience, and faster time-to-market. Our cloud-native solutions are designed to leverage cloud platforms and modern DevOps practices fully.
                                </p>
                            </div>

                            {/* Right approach panel */}
                            <div className="lg:col-span-3 p-10 md:p-14 flex flex-col justify-center">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <ul className="space-y-4 list-disc list-outside pl-5 text-sm sm:text-base text-neutral-300">
                                        <li>Kubernetes, containerization & serverless frameworks</li>
                                        <li>CI/CD pipelines for rapid delivery</li>
                                    </ul>
                                    <ul className="space-y-4 list-disc list-outside pl-5 text-sm sm:text-base text-neutral-300">
                                        <li>Multi-cloud and hybrid cloud strategies</li>
                                        <li>Observability, monitoring & auto-scaling capabilities</li>
                                    </ul>
                                </div>
                                <div className="mt-12 hidden md:block">
                                    {/* Removed missing image and leaving space empty or adding visual accent */}
                                    <div className="w-full max-w-[400px] h-[150px] rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-blue-400/20 flex items-center justify-center backdrop-blur-sm">
                                        <div className="w-20 h-1 bg-blue-400/50 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default ApplicationServicesCapabilities;
