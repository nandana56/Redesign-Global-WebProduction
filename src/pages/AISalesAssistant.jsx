import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Zap, Activity, BarChart, Settings, ArrowRight, Network } from "lucide-react";

export default function AISalesAssistant() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bentoItems = [
    {
      title: "Understands Customer Intent",
      desc: "AI analyses conversations in real time to identify buying intent and guide customers to the right products.",
      icon: <Target className="w-8 h-8 text-[#57C2FF]" />,
    },
    {
      title: "Accelerates Sales Outcomes",
      desc: "Sales teams focus only on high-intent leads, reducing cycle time and improving conversion rates.",
      icon: <Zap className="w-8 h-8 text-[#57C2FF]" />,
    },
    {
      title: "Auto-Qualifies Leads",
      desc: "Customers are automatically classified as Hot, Warm, or Cold, with insights synced directly into the database or CRM.",
      icon: <Activity className="w-8 h-8 text-[#57C2FF]" />,
    },
    {
      title: "Delivers Real-Time Intelligence",
      desc: "Autonomous reporting agents generate daily sales, enquiry, and product demand insights.",
      icon: <BarChart className="w-8 h-8 text-[#57C2FF]" />,
    },
    {
      title: "Custom Executive Dashboards",
      desc: "Live, role-based dashboards provide instant visibility into pipeline health, trends, and performance.",
      icon: <Settings className="w-8 h-8 text-[#57C2FF]" />,
    },
  ];

  return (
    <div className="bg-black min-h-screen text-slate-100 font-poppins relative">
      
      {/* ── CARD 1: HERO (Sticky) ── */}
      <section className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617] z-10 origin-top">
        <div className="absolute inset-0">
          <img src="/solution/1.jfif" alt="AI Hero Background" className="w-full h-full object-cover opacity-20 mix-blend-screen scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center max-w-5xl px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.1] drop-shadow-xl mb-6"
          >
            AI-Powered Agentic <br/>
            <span className="text-[#57C2FF]">Sales Assistant</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-white font-poppins drop-shadow-md max-w-3xl mx-auto mb-10"
          >
            An intelligent sales assistant that understands customer intent, recommends the right products, and automatically qualifies leads. Delivering real-time insights to CRM systems for faster decisions and higher conversion rates.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
             <Link to="/contact" className="inline-block px-6 py-3 lg:px-8 rounded-full bg-white text-black text-sm sm:text-base font-semibold hover:bg-gray-100 transition-all duration-200 border border-white">
               Request Demo
             </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CARD 2: CAPABILITIES (Sticky over Hero) ── */}
      <section className="sticky top-0 min-h-screen w-full flex items-center justify-center bg-[#061430] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] py-20">
        <div className="max-w-[1440px] mx-auto px-6 w-full">
          
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left: Huge Graphic Box */}
            <div className="w-full lg:w-1/2 relative group perspective-1000">
              <div className="absolute inset-0 bg-[#57C2FF] blur-[100px] opacity-20 rounded-full pointer-events-none" />
              <div className="relative bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl hover:rotate-y-12 hover:rotate-x-12 transition-transform duration-700 ease-out transform-gpu">
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Scalable Multi-Agent Architecture</h3>
                <p className="text-slate-400 mb-8 relative z-10 leading-relaxed font-poppins">Secure, modular AI agents collaborate across channels, systems, and data sources.</p>
                <img src="/solution/4.png" alt="Supervisor Agent Hierarchy" className="w-full h-auto rounded-xl shadow-lg mix-blend-screen opacity-80" />
                
                <div className="mt-8 space-y-4">
                  {["Hierarchical agent orchestration", "Real-time cross-agent communication", "Secure data-source isolation"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-300 text-sm font-poppins">
                      <div className="w-2 h-2 bg-[#57C2FF] rounded-full shadow-[0_0_8px_rgba(87,194,255,0.5)]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Scrolling Feature List */}
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
              <div className="mb-6">
                <span className="text-[#57C2FF] font-bold uppercase tracking-widest text-sm mb-4 block">Capabilities</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">Core Platform Features</h2>
              </div>
              
              {bentoItems.map((item, i) => (
                <div key={i} className="flex gap-6 items-start group bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-[#57C2FF]/30 transition-all duration-500">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#0a1f4d] flex items-center justify-center border border-[#57C2FF]/20 group-hover:bg-[#57C2FF]/20 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#57C2FF] transition-colors">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-poppins">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── CARD 3: ARCHITECTURE (Sticky over Capabilities) ── */}
      <section className="sticky top-0 h-screen w-full flex items-center justify-center bg-blue-950 z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/solution/2.jfif')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-white">Architectural Diagram - Agentic Sales Assistant</h2>
          <div className="relative rounded-xl p-4 md:p-8 bg-slate-800/40 border border-white/5 backdrop-blur-2xl shadow-2xl mx-auto inline-block hover:scale-105 transition-transform duration-700">
             <img src="/solution/2.jfif" alt="Architectural Diagram" className="w-full max-w-4xl h-auto rounded-lg shadow-inner" />
          </div>
          <div className="mt-12 text-center text-white max-w-2xl mx-auto italic font-poppins">
            Our multi-agent system uses a Co-Pilot Memory core to synchronize intent analysis, product specialization, and lead qualification across your entire tech stack.
          </div>
        </div>
      </section>

      {/* ── CARD 4: SCREENS & CTA (Sticky over Architecture) ── */}
      <section className="sticky top-0 min-h-screen w-full flex flex-col items-center justify-center bg-[#020617] z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] py-20">
        <div className="max-w-[1440px] mx-auto px-6 w-full flex flex-col items-center">
          
          <div className="w-full max-w-5xl mb-32">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-12 text-center lg:text-left text-white">Sample Result Screens</h2>
            <div className="relative group p-3 rounded-3xl border border-white/10 bg-white/5 shadow-2xl overflow-hidden hover:border-[#57C2FF]/50 transition-colors duration-500">
               <img src="/solution/3.jfif" alt="Sample Result Screens" className="w-full h-auto rounded-2xl group-hover:scale-[1.02] transition-transform duration-700" />
            </div>
          </div>

          <div className="w-full max-w-4xl p-8 sm:p-12 md:p-20 rounded-3xl sm:rounded-[3rem] bg-white/5 text-center border border-white/10 relative overflow-hidden shadow-2xl backdrop-blur-xl">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(0,212,255,0.15)_0%,transparent_60%)] pointer-events-none" />
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 tracking-tight leading-[1.1] relative z-10">
                Ready to Revolutionize Your <br className="hidden sm:block"/> <span className="text-[#57C2FF] italic">Digital Storefront?</span>
             </h2>
             <p className="text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 md:mb-12 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto leading-relaxed font-poppins relative z-10">
                Join the next generation of AI-driven commerce. Schedule a personalized consultation to optimize your brand's visibility and conversion in the age of AI search.
             </p>
             <Link to="/contact" className="relative z-10 w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-[#57C2FF] text-white font-semibold uppercase text-xs sm:text-sm hover:scale-105 transition-all duration-300 tracking-wider shadow-[0_0_20px_rgba(87,194,255,0.3)]">
                Book a Consultation
             </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
