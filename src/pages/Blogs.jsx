import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { content } from '../content_data';
import LiquidCaseStudySection from '../components/LiquidCaseStudySection';
import BlogLetters3D from '../components/BlogLetters3D';
import WebGLDisposer from '../components/WebGLDisposer';

const Blogs = () => {
    const posts = content?.blog?.posts ?? [];

    return (
        <div className="bg-[#020617] min-h-screen pb-20">

            {/* ===== HERO SECTION ===== */}
            <section className="relative w-full pt-32 pb-16 overflow-hidden flex flex-col items-center">
                {/* Background Image and Decor */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/blogs/1000_F_289031631_Jf7Rotuqrz6OSnV2O5UxaPJZsbEi7IwH.jpg"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay for Readability */}
                    <div className="absolute inset-0 bg-[#020617]/25 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/10 to-[#020617]"></div>
                </div>

                {/* Title Overlay */}
                <div className="relative z-20 text-center px-6 mt-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight font-poppins text-white drop-shadow-lg max-w-4xl mx-auto"
                    >
                        The Machine-Speed Mandate: Rewriting the Security Blueprint for 2026
                    </motion.h1>
                    <div className="w-20 h-1.5 bg-[#52b8f4] mt-6 mb-6 rounded-full mx-auto"></div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden md:block text-base sm:text-lg text-gray-200 max-w-xl md:max-w-2xl leading-relaxed mx-auto font-poppins"
                    >
                        Cybersecurity in 2026 runs at machine speed. Continuous monitoring, exploit-first prioritization, agentic AI SOCs, and rebootless
                        patching help organizations detect and stop threats in minutes, not months—at scale. AI
                    </motion.p>
                </div>
            </section>

            {/* ===== BLOG GRID ===== */}
            <section
                className="relative overflow-hidden rounded-3xl mx-6 max-w-7xl lg:mx-auto px-6 py-16 bg-[#0a1628] shadow-xl mb-20 border border-[#57c2ff]/10"
            >
                
                {/* 3D Title Wrapper */}
                <div className="w-full h-[150px] md:h-[200px] mb-8 relative z-20 pointer-events-none">
                    <Suspense fallback={null}>
                        <Canvas
                            camera={{ position: [0, 0, 22], fov: 45 }}
                            gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
                            frameloop="demand"
                        >
                            <WebGLDisposer />
                            <BlogLetters3D />
                        </Canvas>
                    </Suspense>
                </div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 },
                        },
                    }}
                    className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {posts.slice(0, 6).map((post) => (
                        <motion.article
                            key={post.slug}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="group bg-[#0d1f3c] rounded-2xl overflow-hidden border border-[#57c2ff]/20 shadow-md hover:shadow-[#57c2ff]/30 hover:border-[#57c2ff]/50 transition-all duration-500 flex flex-col"
                        >
                            {/* IMAGE */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                                <span className="absolute top-4 left-4 bg-[#57c2ff] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    {post.category}
                                </span>
                            </div>

                            {/* CONTENT */}
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[#57c2ff] transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-[#57c2ff]/10">
                                    <span className="text-xs text-slate-400">
                                        {post.date}
                                    </span>

                                    <span className="text-[#57c2ff] font-bold text-sm flex items-center gap-2">
                                        Read More →
                                    </span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                {/* EMPTY STATE */}
                {posts.length === 0 && (
                    <p className="relative z-10 text-center text-slate-400 mt-20">
                        No blog posts available.
                    </p>
                )}
            </section>

            {/* ===== LIQUID CASE STUDIES & CONTACT ===== */}
            <LiquidCaseStudySection />
        </div>
    );
};

export default Blogs;
