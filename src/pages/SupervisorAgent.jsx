import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SupervisorAgent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    { title: "Single Control Layer", desc: "Central authority to manage and orchestrate all AI agents across platforms and use cases." },
    { title: "Intelligent Decision Engine", desc: "Dynamically selects, coordinates, and sequences agents based on context, intent, and policies." },
    { title: "Enterprise Agent Governance", desc: "Enforces rules, permissions, monitoring, and lifecycle management for all agents." },
    { title: "Persistent Memory & Context", desc: "Maintains shared state and long-term memory to ensure consistency across agents." },
    { title: "Multi-Framework Compatibility", desc: "Framework-agnostic design supporting multiple agent stacks and LLM ecosystems." },
    { title: "Scalable & Secure by Design", desc: "Built for enterprise scale, reliability, and compliance." },
  ];

  return (
    <div className="bg-[#010614] min-h-screen text-white font-poppins relative selection:bg-[#57C2FF] selection:text-black">
      
      {/* ── RADICAL HERO: HUD OVERLAY ── */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden border-b border-white/10 bg-[#00000a]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(87,194,255,0.15)_0%,transparent_70%)]" />
          <motion.div 
             animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] border-[1px] border-dashed border-[#57C2FF]/30 rounded-full"
          />
          <motion.div 
             animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] border-[1px] border-[#57C2FF]/10 rounded-full"
          />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white"
            >
              Supervisor Agent<br/>
              <span className="text-[#57C2FF]">(AI Control Plane)</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
              className="text-sm sm:text-base lg:text-base leading-relaxed text-white/90 font-poppins max-w-lg border-l-2 border-[#57C2FF] pl-6"
            >
              A centralized AI control layer that orchestrates, governs, and optimizes all enterprise agents across platforms and frameworks. It ensures intelligent decision-making, consistency, and secure scalability across the entire agent ecosystem.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="pt-4">
              <Link to="/contact" className="inline-block rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-[#57C2FF] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Request Demo
              </Link>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2 relative h-[50vh] min-h-[400px]">
             <motion.div 
               initial={{ opacity: 0, scale: 0.8, rotateY: 30 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 1.5, ease: "easeOut" }}
               className="absolute inset-0 rounded-3xl overflow-hidden border border-[#57C2FF]/30 shadow-[0_0_50px_rgba(87,194,255,0.2)]"
               style={{ perspective: 1000 }}
             >
               {/* FIX: Using valid image from public/solution/ */}
               <img src="/solution/5.jfif" alt="Supervisor Agent AI" className="w-full h-full object-cover mix-blend-screen opacity-80" />
               <div className="absolute inset-0 bg-gradient-to-tr from-[#00000a] to-transparent" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* ── ZIG-ZAG ECOSYSTEM (Fixes scroll issue) ── */}
      <section className="relative py-32 bg-[#020510]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          
          <div className="mb-24 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white">Strategic Agent Ecosystem</h2>
            <div className="w-24 h-1 bg-[#57C2FF] mt-6 mx-auto rounded-full" />
          </div>

          <div className="space-y-32">
            {/* Row 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row items-center gap-16"
            >
              <div className="w-full lg:w-1/2 rounded-[3rem] overflow-hidden border border-white/10 relative group">
                <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen z-10 pointer-events-none" />
                <img src="/solution/6.webp" alt="Architecture" className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="text-[#57C2FF] text-lg sm:text-xl font-bold tracking-tight uppercase">Supervisor Agent Architecture (Custom Build)</h3>
                <p className="text-white/80 text-sm leading-relaxed font-poppins">A centralized controller that coordinates multiple specialized agents, manages task flow, and ensures consistent decision-making across a custom AI system.</p>
              </div>
            </motion.div>

            {/* Row 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row-reverse items-center gap-16"
            >
              <div className="w-full lg:w-1/2 rounded-[3rem] overflow-hidden border border-white/10 relative group">
                <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen z-10 pointer-events-none" />
                <img src="/solution/7.webp" alt="Accessibility" className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="text-[#57C2FF] text-lg sm:text-xl font-bold tracking-tight uppercase">Supervisor AI – Accessibility Agent Dashboard</h3>
                <p className="text-white/80 text-sm leading-relaxed font-poppins">An AI agent running automated accessibility checks across ARIA roles, buttons, color contrast, and form elements.</p>
              </div>
            </motion.div>

            {/* Row 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row items-center gap-16"
            >
              <div className="w-full lg:w-1/2 rounded-[3rem] overflow-hidden border border-white/10 relative group">
                <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen z-10 pointer-events-none" />
                <img src="/solution/8.avif" alt="SEO Output" className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="text-[#57C2FF] text-lg sm:text-xl font-bold tracking-tight uppercase">SEO Agent – Analysis Output</h3>
                <p className="text-white/80 text-sm leading-relaxed font-poppins">The SEO agent displays a structured accessibility and metadata report with tool responses for a live website.</p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── CIRCULAR/ORBITAL FEATURES ── */}
      <section className="relative w-full min-h-screen py-32 bg-[#00000a] border-t border-white/10 overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[url('/Assets/Section-Background-B.webp')] opacity-10 bg-cover bg-center mix-blend-screen" />
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4 relative z-10 px-6">
          <span className="text-[#57C2FF] text-sm uppercase tracking-widest font-bold">Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Enterprise-Grade Features</h2>
          <p className="text-white/80 text-lg leading-relaxed pt-2 font-poppins">
            Powering the next generation of autonomous enterprise agents with unparalleled control and intelligence.
          </p>
        </div>

        <div className="relative z-10 max-w-[1440px] w-full px-6 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
             {features.map((feat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-[#57C2FF]/40 transition-colors"
                >
                  <div className="h-full bg-[#030917] p-8 sm:p-10 rounded-[calc(1.5rem-1px)] relative overflow-hidden">
                    <div className="absolute -inset-10 bg-[#57C2FF]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <h4 className="text-[#57C2FF] text-xl font-bold mb-4 relative z-10">{feat.title}</h4>
                    <p className="text-white/80 text-sm leading-relaxed font-poppins relative z-10">{feat.desc}</p>
                    
                    <div className="absolute bottom-4 right-4 w-12 h-12 border border-[#57C2FF]/20 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-90">
                       <div className="w-1 h-1 bg-[#57C2FF] rounded-full absolute top-1" />
                       <div className="w-1 h-1 bg-[#57C2FF] rounded-full absolute bottom-1" />
                    </div>
                  </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* ── HIGH-CONTRAST NEON CTA ── */}
      <section className="relative w-full py-32 overflow-hidden bg-black flex items-center justify-center border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[300px] bg-[#57C2FF]/20 blur-[150px] rounded-[100%]" />
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
          <div className="rounded-[3rem] sm:rounded-[4rem] bg-[#020510] border-2 border-[#57C2FF]/30 p-12 sm:p-20 text-center shadow-[0_0_100px_rgba(87,194,255,0.15)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/Assets/Section-Background-B.webp')] opacity-20 mix-blend-screen" />
            
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
                Ready to scale your<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#57C2FF]">AI workforce?</span>
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed font-poppins">
                Deploy the Supervisor Agent to gain full visibility and control over your agent ecosystem.
              </p>
              
              <div className="pt-8">
                <Link to="/contact" className="inline-block bg-[#57C2FF] text-black px-8 py-3.5 sm:px-10 sm:py-5 rounded-full font-semibold uppercase text-xs sm:text-sm hover:scale-105 hover:bg-white transition-all duration-300 tracking-wider shadow-[0_0_30px_rgba(87,194,255,0.4)]">
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
