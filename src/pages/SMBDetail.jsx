import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { 
  TrendingUp, 
  Search, 
  BarChart3, 
  Server, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Rocket,
  MousePointer2
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const SMBDetail = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // Background dot movement
      gsap.to(".bg-dots", {
        backgroundPosition: "40px 40px",
        duration: 4,
        repeat: -1,
        ease: "none"
      });

      // Majestic orb pulse
      gsap.to(".majestic-orb", {
        scale: 1.1,
        opacity: 0.15,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#061e4f] text-white font-poppins selection:bg-blue-500/20 overflow-hidden">
      
      {/* ── AMBIENT CANVAS ────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#061e4f] via-[#04153b] to-[#0a2e7a]" />
        
        {/* Growth Matrix dots */}
        <div className="absolute inset-0 bg-dots opacity-[0.07]" 
             style={{ 
               backgroundImage: `radial-gradient(#4bb5f8 1px, transparent 1px)`,
               backgroundSize: '30px 30px' 
             }} 
        />
        
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] majestic-orb" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[130px] majestic-orb" style={{ animationDelay: '3s' }} />
      </div>

      {/* ── HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative w-full pt-48 pb-20 px-6 z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-blue-400/30 bg-blue-400/5 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12"
          >
            <Rocket className="w-4 h-4" />
            Accelerate Growth
          </motion.div>

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-12">
            SMALL TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white drop-shadow-[0_0_40px_rgba(75,181,248,0.2)]">MEDIUM</span> <br /> 
            BUSINESS
          </h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 0.6, duration: 1 }}
            className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full shadow-[0_0_20px_#4bb5f8]" 
          />
        </motion.div>
      </section>

      {/* ── STRATEGIC PARTNER SECTION ─────────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 lg:py-40 z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="h-px w-20 bg-blue-500/50 mb-10" />
            <h2 className="text-[40px] md:text-[56px] lg:text-[72px] font-black text-white leading-[1.1] uppercase tracking-tighter">
              WE ARE YOUR <br /> 
              <span className="text-blue-500">STRATEGIC</span> PARTNER
            </h2>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-1/2 text-white/60 text-[18px] md:text-[22px] leading-relaxed font-light"
          >
            <p>
              Welcome to <span className="text-white font-bold italic underline decoration-blue-500/50 underline-offset-8">Global Web Production</span> — your strategic partner in driving web technologies with a global impact. We specialized in delivering end-to-end digital excellence.
            </p>
            <p className="mt-10">
              We lead with a strong focus on measurement and reporting. Our goal is to empower your online presence, driving sustainable success and unlocking new possibilities in the evolving digital landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SOLUTIONS SERVICE MOSAIC ──────────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-6 pb-40 z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* Card 1: Tailored Digital Solutions */}
          <motion.div 
            variants={fadeInUp} 
            className="group relative p-10 md:p-16 rounded-[3.5rem] bg-[#04153b]/40 backdrop-blur-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-700 hover:shadow-[0_40px_100px_rgba(0,0,0,0.4)] md:col-span-2"
          >
            <TrendingUp className="w-12 h-12 text-blue-400 mb-10 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl md:text-5xl font-black text-white mb-10 leading-tight tracking-tight uppercase">
              Empowering Businesses with <br className="hidden md:block" />
              <span className="text-blue-400">Tailored Digital Solutions</span>
            </h3>
            <p className="text-white/60 leading-relaxed text-xl font-light">
              At Global Web Production, we are passionate about empowering small to medium businesses with the tools and expertise needed to thrive in the digital world. Our Small to Medium Business Solutions are meticulously designed to cater to the unique requirements and aspirations of enterprises in this dynamic market segment. 
            </p>
          </motion.div>

          {/* Card 2: SEO Strategies */}
          <motion.div 
            variants={fadeInUp} 
            className="group p-10 md:p-14 rounded-[3.5rem] bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10 hover:scale-[1.02] transition-all duration-500"
          >
            <Search className="w-10 h-10 mb-8 opacity-70" />
            <h3 className="text-2xl md:text-3xl font-black mb-8 leading-tight tracking-tight uppercase">
              DRIVING GROWTH <br /> WITH <span className="opacity-70 italic">SEO STRATEGIES</span>
            </h3>
            <p className="text-white/80 leading-relaxed font-light text-lg">
              In the fiercely competitive digital landscape, visibility is key. Our results-driven SEO strategies aimed at improving your search engine rankings and attracting organic traffic to your website.
            </p>
          </motion.div>

          {/* Card 3: Analytics & Reports */}
          <motion.div 
            variants={fadeInUp} 
            className="group p-10 md:p-14 rounded-[3.5rem] bg-[#04153b]/40 backdrop-blur-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-700"
          >
            <BarChart3 className="w-10 h-10 mb-8 text-blue-400" />
            <h3 className="text-2xl md:text-3xl font-black text-white mb-8 leading-tight tracking-tight uppercase">
              Valuable Insights through <br />
              <span className="text-blue-500">Analytics and Reports</span>
            </h3>
            <p className="text-white/60 leading-relaxed font-light text-lg">
              Understanding your audience and their interactions with your website is crucial. Our solutions provide comprehensive analytics implementation and reporting services to help you gain actionable insights.
            </p>
          </motion.div>

          {/* Card 4: Hosting Services */}
          <motion.div 
            variants={fadeInUp} 
            className="group relative p-10 md:p-16 rounded-[3.5rem] bg-[#020c28] border border-white/5 hover:border-indigo-500/30 transition-all duration-700 md:col-span-2 overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] pointer-events-none" />
             <Server className="w-12 h-12 text-indigo-400 mb-10 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl md:text-4xl font-black text-white mb-8 leading-tight tracking-tight uppercase">
              Secure and <span className="text-indigo-400 shadow-indigo-500/50">Reliable Hosting</span> Services
            </h3>
            <p className="text-white/50 leading-relaxed text-xl font-light max-w-4xl">
              To ensure a seamless online experience, we offer secure and reliable hosting services. Our hosting is tailored to meet unique needs, providing a stable and high-performance platform for your enterprise.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER CTA SECTION ────────────────────────────────────────── */}
      <section className="relative py-40 px-6 text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[1000px] mx-auto p-12 md:p-24 rounded-[4rem] bg-[#04153b] border border-blue-500/20 shadow-[0_60px_120px_rgba(0,0,0,0.6)] group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <h3 className="text-4xl md:text-6xl text-white font-black leading-[0.9] uppercase tracking-tighter mb-10 relative z-10">
            PARTNER WITH <br /> 
            <span className="text-blue-500 drop-shadow-[0_0_40px_#4bb5f8]">GLOBAL WEB PRODUCTION</span>
          </h3>
          
          <p className="text-white/60 text-lg md:text-2xl mt-10 font-light leading-relaxed mb-16 relative z-10">
            Experience the transformative power of our SMB Solutions. Let us be your trusted partner in driving success, and achieving your objectives.
          </p>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10"
          >
            <button className="bg-blue-500 hover:bg-white text-white hover:text-blue-600 font-black py-6 px-16 rounded-2xl transition-all text-[11px] uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(75,181,248,0.3)]">
              Let's get started
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER OVERLAY ───────────────────────────────────────────── */}
      <div className="py-20 border-t border-white/5 bg-black/10 text-center relative z-10">
        <p className="text-white/20 text-[10px] font-black tracking-[0.6em] uppercase">
          GLOBAL WEB PRODUCTION • SMB DIVISION • GROWTH CORE
        </p>
      </div>

    </div>
  );
};

export default SMBDetail;