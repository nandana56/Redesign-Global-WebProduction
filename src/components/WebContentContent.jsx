import React from 'react';
import { motion } from 'framer-motion';

const WebContentContent = () => {
    return (
        <section className="bg-slate-50 py-24 font-poppins text-[#000e34]">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- BENTO GRID LAYOUT (Option 3 Design) --- */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* BENTO BOX: IN BRIEF (Option 3 style) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="md:col-span-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-200 flex flex-col justify-center"
                    >
                        <h3 className="font-['Noto_Serif',_serif] text-3xl font-bold mb-8">In brief</h3>
                        <ul className="list-disc pl-5 space-y-5 text-[17px] text-slate-600 font-['Public_Sans',_sans-serif] leading-relaxed marker:text-blue-600">
                            <li>AI-powered Webpage Content Optimizer analyzes and improves digital content for readability, SEO, sentiment, structure, and accessibility.</li>
                            <li>Integrated with Adobe Experience Manager (AEM), it streamlines content workflows and helps teams create optimized and engaging webpages more efficiently.</li>
                            <li>Results include improved readability, stronger search visibility, higher user engagement, and faster content creation.</li>
                        </ul>
                    </motion.div>

                    {/* BENTO BOX: AUTHOR & META (Option 3 style: Bold Blue) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-4 bg-blue-600 text-white p-8 md:p-10 rounded-[2.5rem] shadow-xl flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <div className="w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden bg-white/10 flex items-center justify-center">
                                <img 
                                    src="/sublinks/SriramPhoto.jpeg" 
                                    alt="Sriram K Moorthy" 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Published</p>
                                <p className="text-sm font-bold">Oct 12, 2024</p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h4 className="text-2xl font-bold mb-1">Sriram K Moorthy</h4>
                            <p className="text-sm opacity-80 font-medium">Software Developer</p>
                            <div className="mt-8 flex gap-3">
                                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider">7 min read</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider">Read Time</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* BENTO BOX: INTRODUCTION (Option 3 style: Large White) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="md:col-span-12 lg:col-span-7 bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-200"
                    >
                        <h2 className="font-['Noto_Serif',_serif] font-bold text-3xl lg:text-4xl mb-10 leading-tight text-[#000e34]">Introduction: The Digital Content Challenge</h2>
                        <div className="article-content text-[18px] lg:text-[19px] text-slate-800 leading-[1.85] font-light font-['Georgia',_serif]">
                            <p className="mb-10 text-left first-letter:float-left first-letter:text-[9rem] first-letter:font-bold first-letter:leading-[0.85] first-letter:mr-4 first-letter:mt-2 first-letter:text-[#000e34] first-letter:font-['Georgia',_serif]">In today's competitive digital landscape, creating optimized content that resonates with audiences while meeting technical requirements has become increasingly complex. Organizations face challenges in maintaining readability, SEO effectiveness, and audience engagement across their digital properties.</p>
                            <p className="mb-0 text-justify font-light italic text-slate-500">This case study explores how an AI-powered webpage content optimizer revolutionized the content creation process for a Fortune 100 company with one of the world's 25 most visited websites.</p>
                        </div>
                    </motion.div>

                    {/* BENTO BOX: CAPABILITIES (Option 3 style: Dark Tech Box) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-12 lg:col-span-5 bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-center"
                    >
                        <h2 className="font-['Noto_Serif',_serif] font-bold text-2xl mb-10 text-blue-400">Key capabilities include:</h2>
                        <ul className="space-y-4 list-disc pl-5 marker:text-blue-500">
                            {[
                                "Readability scoring and enhancement using metrics like Flesch Reading Ease",
                                "Sentiment analysis to align content tone with brand voice",
                                "SEO keyword optimization using KeyBERT for semantic analysis",
                                "Content structure analysis for improved scannability",
                                "Regional and cultural content adaptation",
                                "Accessibility enhancement through AI-generated ARIA labels and alt text"
                            ].map((cap, i) => (
                                <li key={i} className="text-xs font-medium text-slate-300 leading-relaxed hover:text-white transition-colors">{cap}</li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* BENTO BOX: IMAGE & CAPTION (Full Width) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="md:col-span-12"
                    >
                        <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200">
                            <img src="/Assets/webcontentoptmization.webp" alt="AI-Powered Web Content Optimization Implementation" className="w-full h-auto" />
                        </div>
                        <p className="text-center text-sm text-slate-700 italic mt-6 px-4">AI-Powered Web Content Optimization Implementation</p>
                    </motion.div>

                    {/* BENTO BOX: TAGS & SHARING ROW */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="md:col-span-12 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-6"
                    >
                        <div className="flex flex-wrap items-center gap-4">
                            {["Accessibility", "Artificial Intelligence", "Content Services", "Digital Experience"].map((tag) => (
                                <span key={tag} className="bg-white text-black px-6 py-2 rounded-full text-[11px] font-bold shadow-sm border border-slate-200 uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-row items-center gap-5">
                            <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.globalwebproduction.com%2Fblogs%2FWebContentOptimization" target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-110 hover:opacity-60" aria-label="share through facebook">
                                <svg width="24" height="24" viewBox="0 0 18 32" className="w-5 h-auto"><path fill="#111827" d="M17.1 0.2v4.7h-2.8q-1.5 0-2.1 0.6t-0.5 1.9v3.4h5.2l-0.7 5.3h-4.5v13.6h-5.5v-13.6h-4.5v-5.3h4.5v-3.9q0-3.3 1.9-5.2t5-1.8q2.6 0 4.1 0.2z"></path></svg>
                            </a>
                            <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://globalwebproduction.com/blogs/WebContentOptimization" target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-110 hover:opacity-60" aria-label="share to linked in">
                                <svg width="24" height="24" viewBox="0 0 27 32" className="w-6 h-auto"><path fill="#111827" d="M6.2 11.2v17.7h-5.9v-17.7h5.9zM6.6 5.7q0 1.3-0.9 2.2t-2.4 0.9h0q-1.5 0-2.4-0.9t-0.9-2.2 0.9-2.2 2.4-0.9 2.4 0.9 0.9 2.2zM27.4 18.7v10.1h-5.9v-9.5q0-1.9-0.7-2.9t-2.3-1.1q-1.1 0-1.9 0.6t-1.2 1.5q-0.2 0.5-0.2 1.4v9.9h-5.9q0-7.1 0-11.6t0-5.3l0-0.9h5.9v2.6h0q0.4-0.6 0.7-1t1-0.9 1.6-0.8 2-0.3q3 0 4.9 2t1.9 6z"></path></svg>
                            </a>
                            <a href="mailto:lekshmi@globalwebproduction.com" className="transition-all hover:scale-110 hover:opacity-60" aria-label="send mail">
                                <svg width="24" height="24" viewBox="0 0 32 32" className="w-6 h-auto"><path fill="#111827" d="M32 12.7v14.2q0 1.2-0.8 2t-2 0.9h-26.3q-1.2 0-2-0.9t-0.8-2v-14.2q0.8 0.9 1.8 1.6 6.5 4.4 8.9 6.1 1 0.8 1.6 1.2t1.7 0.9 2 0.4h0.1q0.9 0 2-0.4t1.7-0.9 1.6-1.2q3-2.2 8.9-6.1 1-0.7 1.8-1.6zM32 7.4q0 1.4-0.9 2.7t-2.2 2.2q-6.7 4.7-8.4 5.8-0.2 0.1-0.7 0.5t-1 0.7-0.9 0.6-1.1 0.5-0.9 0.2h-0.1q-0.4 0-0.9-0.2t-1.1-0.5-0.9-0.6-1-0.7-0.7-0.5q-1.6-1.1-4.7-3.2t-3.6-2.6q-1.1-0.7-2.1-2t-1-2.5q0-1.4 0.7-2.3t2.1-0.9h26.3q1.2 0 2 0.8t0.9 2z"></path></svg>
                            </a>
                        </div>
                    </motion.div>

                    {/* BENTO BOX: IMPLEMENTATION & TECH STACK */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="md:col-span-12 lg:col-span-8 bg-white p-10 md:p-16 rounded-[3rem] border border-slate-200 shadow-sm"
                    >
                        <h2 className="font-['Noto_Serif',_serif] font-bold text-3xl lg:text-4xl mb-8 text-[#000e34]">Implementation: From POC to Enterprise Integration</h2>
                        <p className="mb-10 text-justify font-light text-[18px] text-slate-700 leading-relaxed">What began as a proof of concept quickly demonstrated significant value. Working collaboratively with the client's content team, the solution evolved from an exploratory project to a fully integrated Adobe Experience Manager (AEM) toolkit.</p>
                        <ol className="mb-0 list-decimal pl-8 space-y-4 text-[17px] text-slate-700 font-medium">
                            <li>Initial assessment and use case identification during early GenAI adoption</li>
                            <li>Development of targeted POCs focusing on accessibility compliance</li>
                            <li>Selection of the AI-Powered ARIA Label and Alt Text Generator as the primary focus</li>
                            <li>Full integration with AEM to streamline content workflows</li>
                            <li>Progressive expansion to include broader content optimization capabilities</li>
                        </ol>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="md:col-span-12 lg:col-span-4 bg-blue-50 p-10 rounded-[3rem] border border-blue-100 flex flex-col justify-center"
                    >
                        <p className="text-justify font-light italic text-blue-900 leading-relaxed text-[17px]">The technology stack leverages Streamlit for the user interface, the Groq API for AI processing, KeyBERT for keyword extraction, and Hugging Face Transformers (BERT and DistilBERT) for sentiment analysis and intent classification.</p>
                    </motion.div>

                    {/* BENTO BOX: SOLUTION & RESULTS */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="md:col-span-12 lg:col-span-6 bg-white p-10 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-center"
                    >
                        <h2 className="font-['Noto_Serif',_serif] font-bold text-3xl mb-6 text-[#000e34]">The Solution: AI-Powered Content Optimization</h2>
                        <p className="mb-0 text-justify text-slate-600 font-light leading-relaxed text-[18px]">The Webpage Content Optimizer leverages cutting-edge AI technologies to analyze and enhance web content across multiple dimensions. Built on a foundation of advanced natural language processing, the tool provides comprehensive analysis and suggestions for improvement through a user-friendly interface.</p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="md:col-span-12 lg:col-span-6 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm"
                    >
                        <h2 className="font-['Noto_Serif',_serif] font-bold text-2xl lg:text-3xl mb-10 text-center text-[#000e34]">Results: Measurable Impact</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                "15% improvement in average Flesch Reading Ease scores",
                                "10% increase in average time spent on optimized pages",
                                "20% growth in organic search traffic within three months",
                                "15% improvement in keyword rankings for target terms",
                                "25% increase in social sharing and engagement",
                                "30% reduction in content creation time"
                            ].map((res, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="w-1 h-6 bg-blue-600 shrink-0" />
                                    <p className="text-[14px] font-bold text-slate-800">{res}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* BENTO BOX: LOOKING FORWARD */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="md:col-span-12 bg-white p-10 md:p-16 rounded-[3rem] border border-slate-200 shadow-sm"
                    >
                        <h2 className="font-['Noto_Serif',_serif] font-bold text-3xl lg:text-4xl mb-6 text-[#000e34]">Looking Forward: Expansion and Enhancement</h2>
                        <p className="mb-0 text-justify font-light text-[18px] text-slate-700 leading-relaxed">Building on this success, the roadmap includes integration with additional CMS platforms, expanded multilingual support, and the introduction of AI-powered headline generation. By combining human creativity with AI-driven analysis, the Webpage Content Optimizer demonstrates how advanced technologies can enhance digital experiences while improving operational efficiency.</p>
                    </motion.div>

                    {/* BENTO BOX: CTA (Option 3 style: Bold Navy) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="md:col-span-12 bg-[#061437] p-12 lg:p-20 rounded-[4rem] text-white relative overflow-hidden group border border-white/5 shadow-2xl"
                    >
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="max-w-2xl">
                                <h3 className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight leading-tight text-white">Ready to transform your digital strategy?</h3>
                                <p className="text-slate-300 text-lg mb-0 leading-relaxed font-light">Connect with our team of experts to explore how AI-driven optimization can scale your content operations and drive measurable ROI.</p>
                            </div>
                            <button className="rounded-full bg-white text-black px-12 py-5 text-sm font-black hover:bg-gray-100 transition-all active:scale-95 shadow-xl shrink-0">Contact Us</button>
                        </div>
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default WebContentContent;
