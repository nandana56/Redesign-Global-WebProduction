import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   SolutionsParallax — Option 5: Horizontal Parallax Scroll Strip
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

export default function SolutionsParallax() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % AGENTS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + AGENTS.length) % AGENTS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Calculate Track Translate
  // Default offset centers the active card if we say cards are 80vw wide + padding.
  // We'll trust flex gap and translation math.
  // A cleaner approach: Use absolute positioning or layout animations for smooth sliding.
  // We'll calculate a percentage based translate: x = -(activeIndex * 100)%
  
  return (
    <section className="relative w-full bg-[#000510] py-24 overflow-hidden z-10 border-t border-white/10" ref={containerRef}>
      
      {/* Header Overlay */}
      <div className="absolute top-10 left-6 sm:left-12 lg:left-24 z-30 flex gap-8 items-end pointer-events-none w-[calc(100%-3rem)] sm:w-[calc(100%-6rem)] justify-between">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mix-blend-difference" style={{ fontFamily: "'Inter', sans-serif" }}>
            AGENTIC <span className="text-[#4bb5f8]">ECOSYSTEM</span>
          </h2>
          <p className="hidden md:block text-[10px] text-white/50 uppercase tracking-[0.3em] font-bold mt-2 ml-1 mix-blend-difference">
            System Array v2.0 // Active Count: 06
          </p>
        </div>

        <div className="pointer-events-auto mt-[-10px]">
          <button className="group relative px-6 py-2 rounded-full border border-white/20 text-white text-[10px] font-black uppercase tracking-widest transition-all duration-500 hover:border-blue-500 hover:bg-blue-900/20 backdrop-blur-md">
            <span className="relative z-10 transition-colors duration-500 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
              View Less
            </span>
          </button>
        </div>
      </div>

      {/* ── PARALLAX SLIDER TRACK ── */}
      <div className="relative w-full mt-20 sm:mt-24">
        {/* Active Index indicator background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#4bb5f8]/10 blur-[150px] rounded-full pointer-events-none" />

        <motion.div 
          className="flex whitespace-nowrap items-center px-[8vw] sm:px-[12vw] gap-[6vw] sm:gap-[4vw]"
          animate={{ x: `x: "calc(-${activeIndex * (85 + 4)}vw)"` }} // 85vw width + 4vw gap
          // We will use standard JS transform applied directly to avoid complex layout calc bugs in flex
          style={{
            transform: `translate3d(calc(-${activeIndex * 100}% - ${activeIndex * 4}vw), 0, 0)`,
            transition: 'transform 1.1s cubic-bezier(0.77, 0, 0.175, 1)'
          }}
        >
          {AGENTS.map((agent, index) => {
            const isActive = index === activeIndex;

            // Simple parallax calculation: if it's inactive to the right, image shifts left. If active, center.
            const offsetParam = index - activeIndex;

            return (
              <div 
                key={agent.id}
                onClick={() => setActiveIndex(index)}
                className={`relative w-[85vw] max-w-[1100px] h-[550px] sm:h-[650px] rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 cursor-pointer transition-all duration-1000 ${isActive ? 'scale-100 border border-white/20 opacity-100' : 'scale-90 border border-white/5 opacity-40 hover:opacity-70'}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Parallax Image Wrapper */}
                <div 
                  className="absolute inset-y-0 w-[140%] h-full pointer-events-none transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)]"
                  style={{ 
                    left: "-20%",
                    transform: `translate3d(${offsetParam * 15}%, 0, 0)` 
                  }}
                >
                  <img 
                    src={agent.image} 
                    alt={agent.title} 
                    className="w-full h-full object-cover object-center" 
                    draggable={false}
                  />
                  {/* Heavy dark gradient to ensure text readability */}
                  <div className="absolute inset-0 bg-[#000510]/50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000510] via-[#000510]/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#000510]/90 via-[#000510]/10 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className={`absolute inset-0 p-8 sm:p-14 md:p-20 flex flex-col justify-end whitespace-normal transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                  
                  {/* Decorative Gradient Line */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`h-1.5 w-24 rounded-full bg-gradient-to-r ${agent.gradient}`} />
                  </div>

                  {/* 
                     Massive typography. 
                     We keep the requested classes but bump logical sizing aggressively 
                     for the ultra-widescreen layout style. 
                   */}
                  <div className="relative">
                    <h3 
                      className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-4 tracking-tighter"
                      style={{ textShadow: "0 10px 40px rgba(0,0,0,0.8)" }}
                    >
                      {agent.title}
                    </h3>
                  </div>
                  
                  <p className="text-[12px] sm:text-sm font-black text-[#4bb5f8] uppercase tracking-[0.3em] opacity-90 drop-shadow-md">
                    {agent.subtitle}
                  </p>
                  
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* ── CONTROLS ROW ── */}
      <div className="flex justify-center md:justify-start px-6 sm:px-12 lg:px-24 mt-16 relative z-30">
        <div className="flex items-center gap-6 sm:gap-8 backdrop-blur-md bg-white/5 p-2 rounded-full border border-white/10">
          <button
            onClick={handlePrev}
            className="p-4 rounded-full text-white hover:bg-[#4bb5f8] active:scale-95 transition-all"
            aria-label="Previous Agent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-4 rounded-full text-white hover:bg-[#4bb5f8] active:scale-95 transition-all text-xs font-bold tracking-widest uppercase flex items-center gap-3 w-28 justify-center"
            title={isPaused ? "Play Array" : "Pause Array"}
          >
            {isPaused ? (
              <><Play className="w-4 h-4 fill-current" /> PLAY</>
            ) : (
              <><Pause className="w-4 h-4 fill-current" /> PAUSE</>
            )}
          </button>

          <button
            onClick={handleNext}
            className="p-4 rounded-full text-white hover:bg-[#4bb5f8] active:scale-95 transition-all"
            aria-label="Next Agent"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </section>
  );
}
