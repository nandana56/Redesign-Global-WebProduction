import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   SolutionsSpotlight — Option 3: Liquid Morph & Blade Reveal
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

export default function SolutionsSpotlight() {
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
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="mb-14 text-center lg:text-left relative z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
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
              className="text-white/60 max-w-2xl font-medium"
            >
              Explore our specialized suites designed to automate, verify, and orchestrate across your entire organization.
            </motion.p>
          </div>

          <div className="flex justify-center md:justify-end">
            <button className="group relative px-6 py-2 rounded-full border border-white/20 text-white text-[10px] font-black uppercase tracking-widest transition-all duration-500 hover:border-blue-500">
              <span className="relative z-10 transition-colors duration-500 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
                View Less
              </span>
            </button>
          </div>
        </div>

        {/* ── ASYMMETRICAL SPLIT LAYOUT ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 min-h-[600px] items-stretch">
          
          {/* LEFT PANEL: Interactive List (40%) */}
          <div 
            className="w-full lg:w-[40%] flex flex-col justify-between"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex flex-col gap-2 relative z-10 w-full">
              {AGENTS.map((agent, index) => {
                const isActive = index === activeIndex;
                
                return (
                  <div
                    key={agent.id}
                    onClick={() => setActiveIndex(index)}
                    className="relative px-6 py-5 cursor-pointer group"
                  >
                    {/* Liquid Morphing Active Background Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-2xl bg-[#061437]/80 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)] z-0"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}

                    <div className="relative z-10 overflow-hidden">
                      {/* Active gradient bar */}
                      <motion.div 
                        initial={false}
                        animate={{ height: isActive ? 24 : 0, opacity: isActive ? 1 : 0 }}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full bg-gradient-to-b ${agent.gradient}`}
                      />
                      
                      <div className={`transition-all duration-300 ${isActive ? "ml-4" : "ml-0"}`}>
                        <h3 className={`text-lg lg:text-xl font-black leading-tight mb-1 transition-colors duration-300
                          ${isActive ? "text-white" : "text-white/40 group-hover:text-white/70"}
                        `}>
                          {agent.title}
                        </h3>
                        
                        <motion.div
                          initial={false}
                          animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest opacity-80 pt-2 pb-1">
                            {agent.subtitle}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-6 sm:gap-8 mt-12 px-4">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-500 active:scale-95 transition-all shadow-lg"
                aria-label="Previous Agent"
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
                aria-label="Next Agent"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* RIGHT PANEL: Massive Diagonal Blade Reveal (60%) */}
          <div className="w-full lg:w-[60%] h-[400px] sm:h-[500px] lg:h-auto relative overflow-hidden rounded-[2.5rem] bg-[#000510] border border-white/10 shadow-2xl">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeIndex}
                className="absolute inset-0 w-full h-full"
                // Diagonal shutter blade wipe
                initial={{ clipPath: "polygon(0% 0%, 0% 0%, -20% 100%, -20% 100%)", zIndex: 10 }}
                animate={{ clipPath: "polygon(0% 0%, 120% 0%, 100% 100%, -20% 100%)", zIndex: 10 }}
                exit={{ clipPath: "polygon(120% 0%, 120% 0%, 100% 100%, 100% 100%)", zIndex: 0 }}
                transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${AGENTS[activeIndex].image}')` }}
                />
                
                {/* Overlay grading */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#000e34]/90 via-[#000e34]/30 to-transparent" />
                
                {/* Visual data HUD overlay */}
                <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
                  <div className="max-w-md">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="flex items-center space-x-4 mb-4"
                    >
                      <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${AGENTS[activeIndex].gradient}`} />
                    </motion.div>
                    
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-2 drop-shadow-lg"
                    >
                      {AGENTS[activeIndex].title}
                    </motion.h3>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="hidden sm:flex items-center justify-center w-24 h-24 rounded-full border border-white/20 backdrop-blur-md bg-white/5 backdrop-saturate-150"
                  >
                    <div className="text-center">
                      <div className="text-blue-400 font-black text-2xl leading-none">0{activeIndex + 1}</div>
                      <div className="text-[8px] text-white/50 uppercase tracking-widest mt-1">Agent</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
