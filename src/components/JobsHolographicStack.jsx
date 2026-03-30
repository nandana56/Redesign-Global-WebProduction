import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HolographicCard = ({ job, index }) => {
    const cardRef = useRef(null);
    
    // Mouse Parallax Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="job-holographic-card relative w-full bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl cursor-pointer group hover:bg-white/10 transition-colors"
        >
            {/* Holographic Shimmer Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 mix-blend-overlay"></div>
                <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[spin_4s_linear_infinite]"></div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ transform: "translateZ(50px)" }}>
                <div>
                    <span className="text-blue-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-2 block">
                        Position {index + 1}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white font-poppins mb-2 group-hover:text-blue-200 transition-colors">
                        {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-slate-400 text-sm font-medium">
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {job.location}
                        </span>
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {job.type}
                        </span>
                    </div>
                </div>

                <div className="relative group/btn">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover/btn:opacity-60 transition duration-300"></div>
                    <button className="relative px-6 py-3 bg-[#0A1A40] text-white font-bold rounded-xl border border-white/10 group-hover/btn:border-blue-400/50 transition-all flex items-center gap-2">
                        View Details
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const JobsHolographicStack = ({ jobs }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const cards = gsap.utils.toArray('.job-holographic-card');
        
        gsap.set(cards, { 
            opacity: 0, 
            scale: 0.8, 
            y: 50,
            rotateX: 45
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        tl.to(cards, {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            stagger: {
                each: 0.1,
                from: "center"
            },
            duration: 1.2,
            ease: "elastic.out(1, 0.75)"
        });

    }, []);

    return (
        <section ref={containerRef} className="w-full bg-[#071433] py-24 px-6 overflow-hidden">
            <div className="max-w-5xl mx-auto flex flex-col gap-6">
                {jobs.map((job, i) => (
                    <HolographicCard key={i} job={job} index={i} />
                ))}
            </div>

            {/* Background elements */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        </section>
    );
};

export default JobsHolographicStack;
