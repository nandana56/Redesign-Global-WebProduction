import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   SolutionsRadar — Option 4: The Core Orbit Radar (Circular)
───────────────────────────────────────────────────────────────── */

const AGENTS = [
  {
    id: 1,
    title: "AI-Powered Agentic Sales Assistant",
    subtitle: "Co-Pilot Based",
    image: "/solution/1.jfif",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Ask Me – Role Specific",
    subtitle: "Finetuned & Orchestrated",
    image: "/solution/2.jfif",
    gradient: "from-blue-600 to-indigo-500",
  },
  {
    id: 3,
    title: "Ask Me- Knowledge Agent",
    subtitle: "Corporate Brain",
    image: "/solution/3.jfif",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: 4,
    title: "Request Intake Agent",
    subtitle: "Reporting & Dashboards",
    image: "/solution/4.png",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: 5,
    title: "Content Update Agent for WebOps",
    subtitle: "WebOps Automation",
    image: "/solution/5.jfif",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: 6,
    title: "Content Checker Agent",
    subtitle: "Accessibility & SEO",
    image: "/solution/6.webp",
    gradient: "from-indigo-400 to-cyan-400",
  },
];

export default function SolutionsRadar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive radii tracking
  const [radii, setRadii] = useState({ x: 500, y: 160 });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setRadii({ x: 140, y: 80 });
      else if (w < 1024) setRadii({ x: 300, y: 120 });
      else setRadii({ x: 450, y: 180 });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => prev - 1);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Derived clamped index for array access
  const activeMod = ((activeIndex % AGENTS.length) + AGENTS.length) % AGENTS.length;

  return (
    <section className="relative w-full bg-[#061e4f] pt-10 pb-20 overflow-hidden z-10 flex flex-col border-t border-white/5">
      
      {/* Dynamic Background Image linked to Active Card */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeMod}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.15, scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('${AGENTS[activeMod].image}')`, filter: "blur(40px)" }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-[#061e4f]/90 via-transparent to-[#061e4f]/90 pointer-events-none" />

      {/* Header */}
      <div className="relative z-40 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-8">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4 md:mb-6 gap-6 md:gap-0">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tighter uppercase whitespace-normal md:whitespace-nowrap inline-block">
            Agentic <span className="text-blue-500 text-3xl md:text-4xl lg:text-6xl drop-shadow-md">AI-Copilot</span>
          </h2>
          <div className="flex-1 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
            <div className="hidden md:flex items-center gap-4">
              <div className="h-4 w-px bg-white/10 mx-2"></div>
              <button 
                onClick={() => document.getElementById('custom-ai-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[10px] font-black text-blue-400/60 hover:text-white hover:bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-lg uppercase tracking-widest transition-all duration-300"
              >
                Custom AI
              </button>
              <button className="text-[10px] font-black text-blue-400/60 hover:text-white hover:bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-lg uppercase tracking-widest transition-all duration-300">Case Studies</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── CORE ORBIT RADAR SYSTEM ── */}
      <div className="relative w-full h-[550px] sm:h-[600px] flex items-center justify-center mt-2 sm:mt-0 lg:-mt-6">
        
        {/* Central Glowing Core */}
        <div className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full border border-blue-500/10 bg-blue-500/5 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#4bb5f8]/10 blur-3xl animate-pulse" />
          <div className="w-12 h-12 rounded-full bg-[#4bb5f8] shadow-[0_0_40px_#4bb5f8] animate-ping opacity-30" />
          <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_white]" />
          
          {/* Radar Sweep Ring */}
          <div className="absolute inset-0 border border-t-[#4bb5f8]/50 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '4s' }} />
          <div className="absolute inset-[-50px] border border-b-[#4bb5f8]/20 border-r-transparent border-t-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />
        </div>

        {/* Orbiting Cards Container */}
        <div className="relative w-0 h-0" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          {AGENTS.map((agent, i) => {
            
            // Continuous math allowing sweeping circular rotation
            const targetAngle = (i * 60) - (activeIndex * 60);
            const angleRad = targetAngle * (Math.PI / 180);
            
            // 2D to fake 3D calculation
            const x = Math.sin(angleRad) * radii.x;
            const y = Math.cos(angleRad) * radii.y;
            
            // Normalize depth from 0 (farthest back, y = -180) to 1 (front center, y = 180)
            const normalizedDepth = (y + radii.y) / (radii.y * 2) || 0;
            
            const scale = 0.45 + (normalizedDepth * 0.55); // Scales from 45% size in back to 100% in front
            const zIndex = Math.round(y);
            
            // Keep opacity high so surrounding cards are clearly visible
            const opacity = 0.85 + (normalizedDepth * 0.15); 

            const isFront = Math.abs(y - radii.y) < 5; // essentially front card

            return (
              <motion.div
                key={agent.id}
                animate={{
                  x: x - 150, // -150 to center the 300px wide card
                  y: y - 200, // -200 to center the 400px high card
                  scale,
                  zIndex,
                  opacity
                }}
                transition={{ type: "spring", stiffness: 80, damping: 20, mass: 1 }}
                className={`absolute w-[300px] h-[400px] sm:w-[350px] sm:h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-colors duration-500
                  ${isFront ? 'border-2 border-[#4bb5f8] shadow-[0_0_50px_rgba(75,181,248,0.3)] bg-[#04153b]' : 'border border-white/20 bg-[#04153b]/80 hover:border-[#4bb5f8]/50'}
                `}
                onClick={() => {
                  // Calculate the shortest path offset mapping 'i' to new activeIndex
                  // We find the difference and add to activeIndex natively
                  let diff = i - activeMod;
                  // Handle wrapping rotation shortest path
                  if (diff > 3) diff -= 6;
                  if (diff < -3) diff += 6;
                  setActiveIndex(prev => prev + diff);
                }}
              >
                {/* Background Image inside card (always visible, fully contained to prevent clipping) */}
                <div 
                  className={`absolute inset-0 bg-contain bg-no-repeat bg-center transition-all duration-700 ${isFront ? 'scale-100 brightness-110' : 'scale-105 brightness-75'}`}
                  style={{ backgroundImage: `url('${agent.image}')` }}
                />

                {/* Dark Overlay mapped to depth */}
                <div className={`absolute inset-0 transition-colors duration-500 ${isFront ? 'bg-[#061e4f]/30' : 'bg-[#061e4f]/60'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061e4f] via-[#061e4f]/50 to-transparent opacity-90" />

                {/* Content HUD */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end whitespace-normal">
                  <div className={`transition-all duration-700 ${isFront ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-90'}`}>
                    
                    {/* Tiny visual tech line */}
                    <div className="flex items-center space-x-4 mb-3">
                      <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${agent.gradient}`} />
                    </div>

                    <h3 className="text-lg md:text-xl lg:text-2xl font-black text-white leading-tight mb-1 whitespace-normal max-w-[300px] group-hover:text-blue-400 transition-colors drop-shadow-md">
                      {agent.title}
                    </h3>
                    
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest opacity-60">
                      {agent.subtitle}
                    </p>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── CONTROLS ROW (Bottom Center) ── */}
      <div className="relative z-40 flex justify-center mt-12 px-4 md:px-12">
        <div className="flex items-center gap-6 sm:gap-8 backdrop-blur-md bg-white/5 px-6 py-2 rounded-full border border-white/10 shadow-xl">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full text-white/70 hover:text-white hover:bg-blue-600/50 active:scale-95 transition-all"
            aria-label="Rotate Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="group relative p-3 rounded-full text-white/70 hover:text-white hover:bg-blue-600/50 transition-all duration-300"
            title={isPaused ? "Engage Rotation" : "Halt Rotation"}
          >
            <div className="relative z-10 flex items-center justify-center">
              {isPaused ? <Play className="w-5 h-5 fill-current" /> : <Pause className="w-5 h-5 fill-current" />}
            </div>
          </button>

          <button
            onClick={handleNext}
            className="p-3 rounded-full text-white/70 hover:text-white hover:bg-blue-600/50 active:scale-95 transition-all"
            aria-label="Rotate Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </section>
  );
}
