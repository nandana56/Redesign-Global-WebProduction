import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const JobCard = ({ job, onClick }) => {
    return (
        <motion.div
            layoutId={`job-${job.title}`}
            onClick={() => onClick(job)}
            className="flex-shrink-0 mx-4 px-8 py-4 bg-[#16406f]/20 backdrop-blur-md border border-white/10 rounded-full cursor-pointer hover:bg-[#1e4b8a]/40 hover:border-blue-400/50 transition-all duration-300 group"
        >
            <span className="text-white text-lg font-bold font-poppins uppercase tracking-wider group-hover:text-blue-300">
                {job.title}
            </span>
        </motion.div>
    );
};

const MarqueeRow = ({ jobs, speed, direction = 1, onJobClick }) => {
    const rowRef = useRef(null);

    const tweenRef = useRef(null);

    useEffect(() => {
        const row = rowRef.current;
        if (!row) return;

        const totalWidth = row.scrollWidth / 2;
        
        tweenRef.current = gsap.to(row, {
            x: direction > 0 ? -totalWidth : 0,
            duration: speed,
            ease: "none",
            repeat: -1,
            onStart: () => {
                if (direction < 0) {
                    gsap.set(row, { x: -totalWidth });
                }
            }
        });

        return () => {
            if (tweenRef.current) tweenRef.current.kill();
        };
    }, [speed, direction]);

    const handleMouseEnter = () => tweenRef.current?.pause();
    const handleMouseLeave = () => tweenRef.current?.resume();

    // Duplicate jobs for infinite loop
    const displayJobs = [...jobs, ...jobs];

    return (
        <div className="overflow-hidden py-4 w-full">
            <div 
                ref={rowRef} 
                className="flex whitespace-nowrap will-change-transform"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {displayJobs.map((job, i) => (
                    <JobCard key={i} job={job} onClick={onJobClick} />
                ))}
            </div>
        </div>
    );
};

const BentoDetails = ({ job, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                layoutId={`job-${job.title}`}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0f172a] border border-blue-500/30 rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden"
            >
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full"></div>
                
                <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <span className="text-blue-400 font-bold text-xs tracking-[0.2em] uppercase">
                                New Opening
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white font-poppins leading-tight">
                                {job.title}
                            </h2>
                        </div>
                        <button 
                            onClick={onClose}
                            className="bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <p className="text-slate-400 text-xs uppercase mb-1 font-semibold tracking-wider">Location</p>
                            <p className="text-white text-lg font-medium">{job.location}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <p className="text-slate-400 text-xs uppercase mb-1 font-semibold tracking-wider">Type</p>
                            <p className="text-white text-lg font-medium">{job.type}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-slate-300 leading-relaxed font-poppins">
                            Join our world-class team at Global Web Production. We are looking for passionate individuals who want to push the boundaries of digital experiences.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/40">
                                APPLY NOW
                            </button>
                            <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/10 transition-all">
                                VIEW DETAILS
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const JobsMarqueeSection = ({ jobs }) => {
    const [selectedJob, setSelectedJob] = useState(null);

    const row1 = jobs.slice(0, 4);
    const row2 = jobs.slice(4, 8);
    const row3 = jobs.slice(8, 12);

    return (
        <section className="w-full bg-[#020617] py-20 relative overflow-hidden">
            {/* Outline backgrounds */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none flex flex-col justify-center items-center select-none overflow-hidden">
                <span className="text-[200px] font-black text-white leading-none">CAREERS</span>
                <span className="text-[200px] font-black text-white leading-none">FUTURE</span>
                <span className="text-[200px] font-black text-white leading-none">OPENINGS</span>
            </div>

            <div className="relative z-10 max-w-full">
                <MarqueeRow jobs={row1} speed={30} direction={1} onJobClick={setSelectedJob} />
                <MarqueeRow jobs={row2} speed={40} direction={-1} onJobClick={setSelectedJob} />
                <MarqueeRow jobs={row3} speed={35} direction={1} onJobClick={setSelectedJob} />
            </div>

            <div className="mt-12 text-center relative z-10">
                <p className="text-blue-400/60 font-poppins text-sm uppercase tracking-[0.3em]">
                    Click any title to explore opportunities
                </p>
            </div>

            <AnimatePresence>
                {selectedJob && (
                    <BentoDetails 
                        job={selectedJob} 
                        onClose={() => setSelectedJob(null)} 
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default JobsMarqueeSection;
