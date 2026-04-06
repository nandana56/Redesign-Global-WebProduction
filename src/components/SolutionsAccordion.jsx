import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   SolutionsAccordion — Option 1: Cinematic Expanding Slices
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

export default function SolutionsAccordion() {
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
      
      {/* Background glow behind accordion */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[400px] rounded-[100%] bg-blue-500/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8">
        
        {/* Header (optional contextual intro) */}
        <div className="mb-12 text-center">
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

        {/* ── ACCORDION CONTAINER ── */}
        <div className="flex w-full h-[500px] md:h-[600px] gap-2 md:gap-4 group/accordion">
          {AGENTS.map((agent, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={agent.id}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setIsPaused(true);
                }}
                onMouseLeave={() => setIsPaused(false)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 border border-white/10`}
                style={{
                  // In css, flex works great for smooth horizontal expansion
                  flex: isActive ? "8 1 0%" : "1 1 0%",
                  minWidth: isActive ? "50%" : "60px",
                }}
              >
                {/* Image Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out"
                  style={{
                    backgroundImage: `url('${agent.image}')`,
                    transform: isActive ? "scale(1)" : "scale(1.15)",
                    filter: isActive ? "grayscale(0%)" : "grayscale(90%)",
                  }}
                />

                {/* Overlays */}
                <div
                  className="absolute inset-0 transition-colors duration-700"
                  style={{ backgroundColor: isActive ? "rgba(6,20,55,0.3)" : "rgba(6,20,55,0.85)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061437] via-[#061437]/60 to-transparent opacity-90 md:opacity-70" />

                {/* ── INTERNAL CONTENT ── */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                  
                  {/* Vertical title (Visible only when inactive on desktop) */}
                  <div 
                    className={`absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap transform origin-bottom-left -rotate-90 transition-opacity duration-300 md:block hidden
                      ${isActive ? "opacity-0 pointer-events-none" : "opacity-100 delay-300"}
                    `}
                  >
                    <span className="text-white/80 font-bold text-sm tracking-widest uppercase">
                      {agent.title.length > 20 ? agent.title.substring(0, 18) + "..." : agent.title}
                    </span>
                  </div>

                  {/* Active Content (Visible only when active) */}
                  <div 
                    className={`w-full max-w-xl transition-all duration-700 transform
                      ${isActive ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-10 pointer-events-none absolute"}
                    `}
                  >
                    {/* Gradient Line */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${agent.gradient}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl lg:text-3xl font-black text-white leading-tight mb-2 whitespace-normal group-hover:text-blue-400 transition-colors duration-300">
                      {agent.title}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-[10px] md:text-xs font-black text-blue-500 uppercase tracking-[0.25em] opacity-80">
                      {agent.subtitle}
                    </p>

                    {/* Faux CTA specific to expanding slices */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6 hidden md:block"
                    >
                      <span className="inline-flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white transition-colors">
                        EXPLORE AGENT <ChevronRight className="w-4 h-4" />
                      </span>
                    </motion.div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ── CONTROLS ROW ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 mt-12 px-4 md:px-0">
          <div className="flex-1 hidden md:block"></div>
          
          {/* Carousel Buttons */}
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

          {/* View Less */}
          <div className="flex-1 flex justify-center md:justify-end">
            <button className="group relative px-6 py-2.5 rounded-full border border-white/20 text-white text-[10px] font-black uppercase tracking-widest transition-all duration-300 hover:border-blue-500 hover:bg-white/5">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-blue-400">
                View Less
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
