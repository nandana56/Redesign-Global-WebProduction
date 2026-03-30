import React from "react";
import { motion } from "framer-motion";

const Aboutlearnmore = () => {
    return (
        <div className="pb-20 bg-gradient-to-br from-white via-blue-50/50 to-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
                    >
                        Our <span className="text-[#57c2ff]">Journey</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        From humble beginnings to a global leader in web production and digital transformation.
                    </motion.p>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="glass-panel p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 bg-white shadow-xl">
                            <h2 className="text-3xl font-bold mb-6 text-gray-900">Founding Vision</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                Global Web Production was founded with a single mission: to bridge the gap between complex technological capabilities and real-world business needs.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Our founder, Byron Prather, recognized that while technology was advancing rapidly, many organizations struggled to harness its full potential in a way that drove measurable growth.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] lg:h-[600px]"
                    >
                        <img
                            src="/images/vision.gif"
                            alt="Our Vision"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-end p-10">
                            <p className="text-white text-2xl font-bold italic">"Innovation is at our core."</p>
                        </div>
                    </motion.div>
                </div>

                {/* Timeline Section */}
                <div className="mt-32">
                    <h2 className="text-3xl font-bold mb-16 text-center text-[#57c2ff]">Milestones</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { year: "2022", title: "The Beginning", desc: "Launched Global Web Production in Temecula, CA, with a focus on high-performance web solutions." },
                            { year: "2023", title: "Global Expansion", desc: "Established our India office and expanded our team of engineers and creative strategists." },
                            { year: "2024", title: "AI & Future Tech", desc: "Pioneered Agentic AI solutions and integrated intelligent automation into our core offerings." },
                        ].map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-[2rem] border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all duration-300"
                            >
                                <span className="text-4xl font-black text-[#57c2ff]/20 mb-4 block">{m.year}</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{m.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{m.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aboutlearnmore;