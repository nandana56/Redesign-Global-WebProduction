import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CUSTOM_AGENTS = [
  {
    id: 0,
    title: "Supervisor Agent",
    subtitle: "Multi-Agent Orchestration",
    image: "/solution/7.webp",
    link: "/solutions/supervisor-agent",
    gradient: "from-blue-400 to-blue-800"
  },
  {
    id: 1,
    title: "AI Document Extractor",
    subtitle: "Unstructured Data Analysis",
    image: "/solution/8.avif",
    link: "/solutions/ai-document-extractor",
    gradient: "from-blue-400 to-blue-800"
  },
  {
    id: 2,
    title: "HR Assistant",
    subtitle: "Employee Lifecycle Automation",
    image: "/solution/9.png",
    link: "/solutions/hr-assistant",
    gradient: "from-blue-400 to-blue-800"
  },
  {
    id: 3,
    title: "Aptitude & IQ Assessment",
    subtitle: "AI-Powered Evaluation",
    image: "/solution/10.png",
    link: "/solutions/aptitude-iq-assessment",
    gradient: "from-blue-400 to-blue-400"
  }
];

export default function SolutionsCustomAgents() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play cycling mechanism (5 seconds per slide)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CUSTOM_AGENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex, isPaused]); // resets the cycle if a user manually clicks a tab or toggles pause

  return (
    <section id="custom-ai-section" className="relative w-full bg-[#061e4f] border-t border-white/5 py-12 md:py-16 min-h-[80vh] flex flex-col items-center justify-center scroll-mt-24 md:scroll-mt-32">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#061e4f] via-[#04153b] to-[#0a2e7a] pointer-events-none opacity-80" />

      {/* Header Container */}
      <div className="relative z-20 w-full max-w-[1500px] mx-auto px-6 sm:px-12 mb-10 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0">
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tighter uppercase whitespace-normal md:whitespace-nowrap drop-shadow-xl inline-block">
            Agentic <span className="text-blue-500 text-3xl md:text-4xl lg:text-6xl border-b-4 border-blue-500/50 pb-2 drop-shadow-md">AI-Custom</span>
          </h2>
          
          <div className="flex-1 hidden md:flex items-center px-12">
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 via-blue-500/10 to-transparent"></div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => document.getElementById('case-studies-fold')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[10px] font-black text-blue-400/80 hover:text-white hover:bg-blue-500/20 border border-blue-500/30 px-5 py-3 rounded-lg uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(75,181,248,0.15)] bg-[#04153b]/50 backdrop-blur-md"
            >
              Case Studies
            </button>
            <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
            <button 
              onClick={() => document.getElementById('copilot-ai-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[10px] font-black text-blue-400/80 hover:text-white hover:bg-blue-500/20 border border-blue-500/30 px-5 py-3 rounded-lg uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(75,181,248,0.15)] bg-[#04153b]/50 backdrop-blur-md"
            >
              Copilot AI
            </button>
          </div>
          
        </div>
      </div>

      {/* 
        The Command Center Layout Structure
      */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-12 flex flex-col-reverse lg:flex-row gap-12 lg:gap-24">
        
        {/* LEFT COLUMN: The Control Tabs List */}
        <div className="w-full lg:w-[45%] xl:w-[35%] flex flex-col justify-center gap-4 md:gap-6">
          
          {/* Pause / Play Controls */}
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] text-[#57C2FF] uppercase tracking-[0.3em] font-black opacity-60">Sequence Control</span>
            <button 
              onClick={() => setIsPaused(!isPaused)} 
              className="flex items-center gap-2 text-[9px] font-bold text-white uppercase tracking-widest bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 px-3 py-1.5 rounded-full transition-all duration-300"
            >
              {isPaused ? 'Paused' : 'Auto-Playing'}
              {isPaused ? (
                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"/></svg>
              ) : (
                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"/></svg>
              )}
            </button>
          </div>

          {CUSTOM_AGENTS.map((agent, i) => {
            const isActive = activeIndex === i;
            
            return (
              <div 
                key={agent.id}
                onClick={() => setActiveIndex(i)}
                className={`relative p-6 sm:p-8 rounded-[2rem] cursor-pointer border transform transition-all duration-500 group overflow-hidden
                  ${isActive ? 'bg-[#04153b]/80 border-[#57C2FF]/40 shadow-[0_20px_40px_rgba(0,0,0,0.4)] translate-x-0 lg:translate-x-4 scale-100' : 'bg-[#04153b]/20 border-white/5 hover:border-white/10 hover:bg-[#04153b]/40 scale-[0.98] blur-[0.5px] hover:blur-none'}
                `}
              >
                
                {/* Visual active state backglow */}
                <div className={`absolute inset-0 bg-gradient-to-r from-[#4bb5f8]/10 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                <div className="relative z-10">
                   
                  {/* Exact typography from pasted code */}
                  <h3 className={`text-xl md:text-2xl font-black mb-2 transition-colors leading-tight
                    ${isActive ? 'text-[#57C2FF] drop-shadow-md' : 'text-white/60 group-hover:text-white/90'}
                  `}>
                    {agent.title}
                  </h3>
                  
                  {/* Exact subtitle typography mapped */}
                  <p className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 backdrop-blur-md inline-block
                    ${isActive ? 'text-[#57C2FF] opacity-100' : 'text-white/40 opacity-70 group-hover:text-white/70'}
                  `}>
                    {agent.subtitle}
                  </p>
                  
                </div>

                {/* The auto-play animated gradient bar mapping directly to their exact color constraints */}
                {isActive && (
                  <div className="absolute left-0 bottom-0 top-0 w-1 bg-white/5">
                    {isPaused ? (
                      <div className={`w-full h-full bg-gradient-to-b ${agent.gradient} shadow-[0_0_15px_rgba(75,181,248,0.8)] opacity-50`} />
                    ) : (
                      <motion.div 
                        key={activeIndex} // Force re-animate when index changes
                        initial={{ height: 0 }} 
                        animate={{ height: "100%" }} 
                        transition={{ duration: 5, ease: "linear" }} 
                        className={`w-full bg-gradient-to-b ${agent.gradient} shadow-[0_0_15px_rgba(75,181,248,0.8)]`} 
                      />
                    )}
                  </div>
                )}
                
              </div>
            );
          })}
        </div>


        {/* RIGHT COLUMN: Massive Dynamic Display Window */}
        <div className="w-full lg:w-[55%] xl:w-[65%] h-[400px] md:h-[500px] lg:h-[550px] relative rounded-[3rem] overflow-hidden bg-[#04153b] shadow-[0_40px_100px_rgba(0,0,0,0.8),_0_0_40px_rgba(75,181,248,0.1)] border-2 border-white/5 flex-shrink-0">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              
              {/* Linked image mapping */}
              <img 
                src={CUSTOM_AGENTS[activeIndex].image} 
                alt={CUSTOM_AGENTS[activeIndex].title} 
                className="w-full h-full object-cover"
              />
              
              {/* Overlays to make the display window look incredibly premium */}
              <div className="absolute inset-0 bg-[#061e4f]/20 mix-blend-color"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#04153b] via-transparent to-transparent opacity-80"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#04153b]/60 via-transparent to-transparent"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] pointer-events-none"></div>

              {/* Internal HUD inside display window */}
              <div className="absolute left-8 bottom-8 md:left-12 md:bottom-12 z-20">
                 <Link to={CUSTOM_AGENTS[activeIndex].link} className="inline-flex items-center gap-4 group">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(75,181,248,0.3)] transition-transform duration-500 group-hover:scale-110 group-hover:bg-blue-500/20">
                       <svg className="w-6 h-6 text-white translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                       </svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#57C2FF] drop-shadow-md group-hover:text-white transition-colors">
                       Initialize Portal
                    </span>
                 </Link>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Aesthetic Scanner line (pure CSS animation overlay) */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
             <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" style={{ animation: "scanLine 6s linear infinite" }}></div>
          </div>
          
        </div>
        
      </div>
      
      {/* Required CSS for the aesthetic scanner overlay */}
      <style>{`
        @keyframes scanLine {
          0% { transform: translateY(-100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(800px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
