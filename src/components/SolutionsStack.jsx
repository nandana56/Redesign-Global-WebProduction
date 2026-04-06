import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   SolutionsStack — Option 2: Vertical 3D Card Stack
───────────────────────────────────────────────────────────────── */

const AGENTS = [
  {
    id: 1,
    title: "AI-Powered Agentic Sales Assistant",
    subtitle: "Co-Pilot Based",
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Ask Me – Role Specific",
    subtitle: "Finetuned & Orchestrated",
    image: "/Assets/AskMeHeroGenerated.webp",
    gradient: "from-blue-600 to-indigo-500",
  },
  {
    id: 3,
    title: "Ask Me- Knowledge Agent",
    subtitle: "Corporate Brain",
    image: "/Assets/KnowledgeAgentHeroGenerated.webp",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: 4,
    title: "Request Intake Agent",
    subtitle: "Reporting & Dashboards",
    image: "/Assets/RequestIntakeHeroGenerated.webp",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: 5,
    title: "Content Update Agent for WebOps",
    subtitle: "WebOps Automation",
    image: "/Assets/WebOpsContentHeroGenerated.webp",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: 6,
    title: "Content Checker Agent",
    subtitle: "Accessibility & SEO",
    image: "/Assets/AccessibilityHeroGenerated.webp",
    gradient: "from-indigo-400 to-cyan-400",
  },
];

export default function SolutionsStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % AGENTS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + AGENTS.length) % AGENTS.length);
  }, []);

  // Auto-play loop
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 4500);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <section className="relative w-full bg-[#000e34] py-20 lg:py-32 overflow-hidden z-10 border-t border-white/5">
      
      {/* Background ambient glow matching layout depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] rounded-[100%] bg-blue-500/10 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="mb-8 text-center relative z-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.03em" }}
          >
            Intelligent Agent <span className="text-blue-400">Ecosystem</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-2xl mx-auto font-medium"
          >
            Explore our specialized suites designed to automate, verify, and orchestrate across your entire organization.
          </motion.p>
        </div>

        {/* ── 3D CARD STACK CONTAINER ── */}
        <div 
          className="relative w-full h-[550px] sm:h-[600px] flex justify-center mt-16 perspective-1000"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {AGENTS.map((agent, index) => {
            // Calculate absolute rotational position relative to active activeIndex
            const pos = (index - activeIndex + AGENTS.length) % AGENTS.length;
            
            // Map 'pos' to 3D Space coordinates
            let scale = 1;
            let y = 0;
            let opacity = 1;
            let zIndex = 10;
            let blur = 0;

            if (pos === 0) {
              scale = 1; y = 0; opacity = 1; zIndex = 10; blur = 0;
            } else if (pos === 1) {
              scale = 0.9; y = -50; opacity = 0.7; zIndex = 9; blur = 3;
            } else if (pos === 2) {
              scale = 0.8; y = -90; opacity = 0.3; zIndex = 8; blur = 6;
            } else if (pos === AGENTS.length - 1) {
              // The card that just left (animates towards the screen and fades)
              scale = 1.15; y = 60; opacity = 0; zIndex = 11; blur = 0;
            } else {
              // Deep background hidden cards
              scale = 0.75; y = -120; opacity = 0; zIndex = 0; blur = 10;
            }

            return (
              <motion.div
                key={agent.id}
                animate={{ scale, y, opacity, zIndex, filter: `blur(${blur}px)` }}
                transition={{ duration: 0.85, ease: [0.25, 1, 0.35, 1] }}
                className="absolute top-10 w-[95%] sm:w-[80%] max-w-[800px] h-[400px] sm:h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/10 group"
                onClick={() => {
                  if (pos !== 0) {
                    setActiveIndex(index);
                  }
                }}
                style={{
                  transformOrigin: "bottom center"
                }}
              >
                {/* Background Image inside Card */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-105"
                  style={{ backgroundImage: `url('${agent.image}')` }}
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-[#061437]/60 group-hover:bg-[#061437]/40 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061437] via-transparent to-transparent opacity-80" />

                {/* Content Container */}
                <div className="absolute inset-0 p-8 sm:p-10 md:p-14 flex flex-col justify-end">
                  <div className="transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                    
                    {/* Gradient Line */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`h-px w-12 bg-gradient-to-r ${agent.gradient}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight mb-2 whitespace-normal max-w-lg group-hover:text-blue-400 transition-colors">
                      {agent.title}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-[10px] md:text-xs font-black text-blue-500 uppercase tracking-widest opacity-80">
                      {agent.subtitle}
                    </p>

                  </div>
                </div>

                {/* Glassy spec highlight edge */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </motion.div>
            );
          })}
        </div>

        {/* ── CONTROLS ROW ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 mt-6 px-4 md:px-0">
          <div className="flex-1 hidden md:block"></div>
          
          <div className="flex items-center gap-6 sm:gap-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-500 active:scale-95 transition-all shadow-lg"
              aria-label="Previous Batch"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="group relative p-3 rounded-full bg-white/5 border border-white/20 text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 shadow-2xl"
              title={isPaused ? "Play Carousel" : "Pause Carousel"}
            >
              <div className="absolute inset-0 rounded-full bg-blue-400 blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10 flex items-center justify-center">
                {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
              </div>
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-500 active:scale-95 transition-all shadow-lg"
              aria-label="Next Batch"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <button className="group relative px-6 py-2 rounded-full border border-white/20 text-white text-[10px] font-black uppercase tracking-widest transition-all duration-500 hover:border-blue-500">
              <span className="relative z-10 transition-colors duration-500 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
                View Less
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
