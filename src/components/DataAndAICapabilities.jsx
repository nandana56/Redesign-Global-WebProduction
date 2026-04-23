import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const DataAndAICapabilities = () => {
    return (
        <section className="bg-neutral-50 py-24 px-6 md:px-12 font-poppins selection:bg-red-500/30 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-16">
                
                {/* 1. Intro Section - Massive Glassmorphic Split */}
                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center bg-white p-8 sm:p-12 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-neutral-100"
                >
                    <div className="space-y-8">
                        <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-poppins font-medium">
                            At Global Web Production, we help organizations navigate the data-driven era by delivering intelligent solutions that power personalization, automation, and performance at scale. From building production-grade machine learning models to architecting robust data lakes, our expertise spans the full data and AI lifecycle. With a focus on scalability, governance, and real-world impact, we partner with enterprises to turn raw data into actionable insights and smarter business outcomes.
                        </p>
                    </div>
                    <div className="relative overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/3] group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                        <img 
                            src="/Assets/Data_and_Ai_Sub.jfif" 
                            alt="Data and AI Strategy" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </motion.div>

                {/* 2. The Asymmetrical Bento Grid for Capabilities */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Bento Box 1: Machine Learning (Spans 12 cols on mobile, 7 cols on Desktop) */}
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                        variants={fadeUp}
                        className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-lg border border-neutral-100 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
                    >
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-6 leading-tight">
                                Machine Learning Model Development & Deployment
                            </h2>
                            <p className="text-base font-poppins text-neutral-600 mb-12 leading-relaxed">
                                We build and operationalize custom ML models tailored to your business goals. Our approach combines advanced data science, rigorous validation, and MLOps best practices to ensure reliable, explainable, and high-performing models in production.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-8">
                                Key capabilities
                            </h2>
                            <div className="space-y-6">
                                {[
                                    { 
                                        svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-700 group-hover:text-red-600 transition-colors"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" /></svg>,
                                        text: 'Supervised, unsupervised, and deep learning models' 
                                    },
                                    { 
                                        svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-700 group-hover:text-red-600 transition-colors"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>,
                                        text: 'Scalable training & model tuning pipelines' 
                                    },
                                    { 
                                        svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-700 group-hover:text-red-600 transition-colors"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
                                        text: 'MLOps for CI/CD, monitoring & governance' 
                                    },
                                    { 
                                        svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-700 group-hover:text-red-600 transition-colors"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
                                        text: 'Cross-industry expertise (Finance, Retail, etc.)' 
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-5 group">
                                        <div className="bg-neutral-50 p-4 rounded-2xl shrink-0 border border-neutral-200 group-hover:bg-red-50 group-hover:border-red-200 transition-colors duration-300">
                                            {item.svg}
                                        </div>
                                        <h3 className="text-base sm:text-lg font-medium text-neutral-800 leading-snug group-hover:text-red-600 transition-colors duration-300">
                                            {item.text}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Bento Box 2 & 3: Stacked vertically on Desktop right side (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        
                        {/* Predictive Analytics */}
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                            variants={fadeUp}
                            className="bg-neutral-900 p-8 md:p-10 rounded-[2.5rem] shadow-lg flex-1 flex flex-col hover:bg-neutral-950 transition-colors duration-300 border border-neutral-800"
                        >
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white leading-tight">
                                Predictive Analytics & Personalization
                            </h3>
                            <p className="text-sm sm:text-base mb-4 text-neutral-400 leading-relaxed">
                                Transform historical data into future-ready insights with our predictive analytics solutions. Whether it’s customer behavior forecasting or risk modeling, we deliver real-time intelligence to drive proactive decisions.
                            </p>
                            <p className="text-sm sm:text-base mb-10 text-neutral-400 flex-grow leading-relaxed">
                                Our personalization engines tailor digital experiences based on behavioral and contextual signals—improving engagement, retention, and revenue.
                            </p>
                            <div className="mt-auto">
                                <h4 className="text-base font-semibold mb-4 text-white">Use Cases Include</h4>
                                <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base text-neutral-300">
                                    <li>Customer lifetime value prediction</li>
                                    <li>Demand forecasting</li>
                                    <li>Dynamic pricing & churn models</li>
                                    <li>Real-time content & product recommendations</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* NLP & Vision */}
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                            variants={fadeUp}
                            className="bg-[#06265e] p-8 md:p-10 rounded-[2.5rem] shadow-lg flex-1 flex flex-col hover:bg-[#061539] transition-colors duration-300"
                        >
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white leading-tight">
                                NLP, Computer Vision & Recommender Systems
                            </h3>
                            <p className="text-sm sm:text-base mb-4 text-blue-100 leading-relaxed">
                                We bring cognitive intelligence to your applications through Natural Language Processing (NLP), Computer Vision, and recommender system technologies.
                            </p>
                            <p className="text-sm sm:text-base mb-10 text-blue-100 flex-grow leading-relaxed">
                                From intelligent document processing to image recognition and conversational AI, we help you create smarter, human-centric digital products.
                            </p>
                            <div className="mt-auto">
                                <h4 className="text-base font-semibold mb-4 text-white">Solutions Include:</h4>
                                <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base text-blue-100">
                                    <li>Chatbots & sentiment analysis</li>
                                    <li>OCR & intelligent data extraction</li>
                                    <li>Visual inspection & defect detection</li>
                                    <li>Collaborative & content-based recommenders</li>
                                </ul>
                            </div>
                        </motion.div>
                        
                    </div>

                    {/* Bento Box 4: Data Lakes - Full-bleed dark layout, completely different */}
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                        variants={fadeUp}
                        className="lg:col-span-12 bg-[#06153d] rounded-[2.5rem] overflow-hidden mt-2"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-5">
                            {/* Left accent panel */}
                            <div className="lg:col-span-2 bg-[#06265e] p-10 md:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                                <div className="w-12 h-1 bg-blue-400 mb-8" />
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-8">
                                    Data Lakes & Transformation Pipelines
                                </h3>
                                <p className="text-sm sm:text-base text-blue-100 leading-relaxed mb-6">
                                    Our data engineering team designs and builds modern data architectures that scale. We enable seamless data ingestion, transformation, and consumption through robust pipelines and cloud-native platforms.
                                </p>
                                <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                                    Whether you're building a new data lake or modernizing legacy systems, we ensure your data is clean, accessible, and analytics-ready.
                                </p>
                            </div>

                            {/* Right approach panel */}
                            <div className="lg:col-span-3 p-10 md:p-14 flex flex-col justify-center">
                                <h4 className="text-base font-bold mb-8 text-blue-300 uppercase tracking-widest">Our Approach Covers</h4>
                                <div className="space-y-6">
                                    {[
                                        "Data lake design (AWS, Azure, GCP)",
                                        "ETL/ELT pipeline development",
                                        "Data quality & governance frameworks",
                                        "Real-time data streaming & batch processing"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-5 group">
                                            <span className="text-3xl font-bold text-white/10 leading-none shrink-0 group-hover:text-blue-400 transition-colors duration-300 select-none">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed pt-1 group-hover:text-white transition-colors duration-300">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default DataAndAICapabilities;
