import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Cpu, 
  BarChart, 
  Users, 
  Settings, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Layers,
  Lock
} from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const enterpriseServices = [
  {
    title: "Comprehensive Web Production and Management",
    desc: "Our Enterprise Services encompass a wide array of web production and management solutions to empower your organization’s online presence. From concept to execution, we provide end-to-end web development services, ensuring that your website not only reflects your brand identity but also delivers an exceptional user experience.",
    icon: <Globe className="w-8 h-8" />,
    tech: ["End-to-End Dev", "Brand Identity", "UX Design"],
    color: "from-blue-400 to-blue-600"
  },
  {
    title: "Gaining Valuable Insights through Analytics and Reports",
    desc: "As a strategic partner, we understand that data is the backbone of informed decision-making. That’s why our Enterprise Services focus on harnessing the power of data through advanced SEO strategies and comprehensive analytics implementation to ensure your enterprise website ranks high and attracts organic traffic.",
    icon: <BarChart className="w-8 h-8" />,
    tech: ["Data Strategy", "SEO Optimization", "KPI Tracking"],
    color: "from-purple-400 to-blue-500"
  },
  {
    title: "Ensuring Accessibility Compliance and User-Centric Experiences",
    desc: "Inclusivity and user experience are at the core of our Enterprise Services. We prioritize accessibility compliance, making sure your website is usable and navigable by all users, including those with disabilities, following industry standards like WCAG.",
    icon: <Users className="w-8 h-8" />,
    tech: ["WCAG Compliance", "Inclusive Design", "Multi-Device"],
    color: "from-cyan-400 to-blue-600"
  },
  {
    title: "Scalable Solutions with a Customer-Centric Approach",
    desc: "At Global Web Production, scalability is not just a feature; it’s ingrained in every aspect of our Enterprise Services. We design solutions that can grow with your business through continuous collaboration and feedback, allowing us to adapt to changing requirements and trends.",
    icon: <Cpu className="w-8 h-8" />,
    tech: ["Scalable Architecture", "Agile Flow", "Future-Proof"],
    color: "from-blue-500 to-indigo-600"
  }
];

const Enterprise = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from(".hero-content", {
        opacity: 0,
        y: 60,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2
      });

      // Background mesh movement
      gsap.to(".bg-mesh", {
        opacity: 0.15,
        duration: 2,
        ease: "power2.inOut"
      });

      // Continuous floating physics for ambient rings
      gsap.to(".ambient-orb", {
        y: 40,
        x: 20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#061e4f] min-h-screen font-poppins text-white overflow-hidden selection:bg-[#4bb5f8] selection:text-white pb-32">
      
      {/* ── AMBIENT BACKGROUND SYSTEM ─────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Deep blue majestic gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#061e4f] via-[#04153b] to-[#0a2e7a]" />
        
        {/* Animated Grid Mesh */}
        <div className="absolute inset-0 bg-mesh opacity-0 transition-opacity duration-1000" 
             style={{ 
               backgroundImage: `linear-gradient(rgba(75,181,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(75,181,248,0.05) 1px, transparent 1px)`,
               backgroundSize: '50px 50px' 
             }} 
        />
        
        {/* Floating Majestic Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[200px] ambient-orb" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[180px] ambient-orb" style={{ animationDelay: '2s' }} />
      </div>

      {/* ── HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative pt-48 pb-10 px-6 z-10 flex flex-col items-center">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-blue-400/30 bg-blue-400/5 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10 hero-content"
            >
              <ShieldCheck className="w-4 h-4" />
              Scale with Precision
            </motion.div>
            
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black mb-8 tracking-tighter leading-none uppercase hero-content">
              ENTERPRISE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-600 drop-shadow-[0_0_60px_rgba(75,181,248,0.3)]">
                SOLUTIONS
              </span>
            </h1>
            
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-transparent rounded-full mb-12 hero-content"></div>
            
            <h2 className="text-xl md:text-3xl text-white/70 font-light mb-16 max-w-4xl leading-relaxed hero-content">
              Tailored Systems for <span className="text-blue-400 font-semibold italic">Enterprise Excellence</span>. <br className="hidden md:block" />
              Engineering the future of large-scale digital architecture with bank-grade security.
            </h2>

            {/* Performance Ticker */}
            <div className="flex flex-wrap justify-center gap-12 hero-content">
              {[
                { icon: <Zap className="w-5 h-5"/>, label: "High Performance", color: "text-blue-400" },
                { icon: <Globe className="w-5 h-5"/>, label: "Global Presence", color: "text-indigo-400" },
                { icon: <ShieldCheck className="w-5 h-5"/>, label: "Secure Infrastructure", color: "text-cyan-400" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
                    {item.icon}
                  </div>
                  <span className="text-[9px] uppercase tracking-widest font-black text-white/40 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STRATEGIC FEATURE STACK ──────────────────────────────────── */}
      <section className="relative py-32 px-6 z-10">
        <div className="container mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {enterpriseServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-1000`} />
                
                <div className="relative h-full p-10 md:p-14 rounded-[3rem] bg-[#04153b]/40 backdrop-blur-2xl border border-white/5 group-hover:border-blue-500/30 flex flex-col transition-all duration-700 hover:shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-8 right-8 text-blue-500/10 font-black text-8xl pointer-events-none select-none italic group-hover:text-blue-500/20 transition-colors">
                    0{index + 1}
                  </div>

                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-14 px-1 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                      {service.icon}
                    </div>
                    <div className={`h-px flex-1 bg-gradient-to-r ${service.color} opacity-30`} />
                  </div>

                  <h3 className="text-2xl md:text-4xl font-black mb-8 text-white group-hover:text-blue-300 transition-colors leading-[1.1] tracking-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/60 leading-relaxed text-lg mb-12 font-light">
                    {service.desc}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-3">
                    {service.tech.map((tag, t) => (
                      <span key={t} className="px-4 py-2 rounded-xl bg-blue-900/20 border border-blue-500/10 text-[9px] font-black text-blue-300 tracking-[.25em] uppercase backdrop-blur-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hover visual anchor */}
                  <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-700">
                    <ArrowRight className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CALL TO ACTION ───────────────────────────────────────────── */}
      <section className="relative py-40 px-6 z-10">
        <div className="container mx-auto max-w-[1200px]">
          
          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            className="relative p-12 md:p-24 rounded-[4rem] overflow-hidden bg-[#04153b] border border-blue-500/20 shadow-[0_60px_120px_rgba(0,0,0,0.6)] group"
          >
            {/* Inner background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-20 flex flex-col items-center text-center">
              
              <div className="w-16 h-1 px-1 py-1 rounded-full bg-gradient-to-r from-blue-400 to-blue-800 mb-10 shadow-[0_0_20px_#4bb5f8]" />
              
              <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none uppercase">
                READY TO ARCHITECT <br /> YOUR <span className="text-blue-500 drop-shadow-[0_0_30px_#4bb5f8]">FUTURE?</span>
              </h2>
              
              <p className="text-white/70 text-lg md:text-2xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                Global Web Production provides the technical backbone your enterprise needs to thrive. Transform your infrastructure today.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
                <Link to="/contact">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 rounded-2xl bg-blue-500 text-white font-black text-xs uppercase tracking-[.3em] hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-[0_20px_40px_rgba(75,181,248,0.3)] flex items-center justify-center gap-4"
                  >
                    Consult an Architect
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[9px] uppercase tracking-[.3em] hover:bg-white/10 transition-all flex items-center justify-center"
                >
                  Download Infrastructure Case Study
                </motion.button>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ── FOOTER OVERLAY ───────────────────────────────────────────── */}
      <div className="py-20 border-t border-white/5 bg-black/10 text-center relative z-10">
        <p className="text-white/20 text-[10px] font-black tracking-[0.6em] uppercase">
          GLOBAL WEB PRODUCTION • ENTERPRISE DIVISION • INTEGRATED ARCHITECTURE
        </p>
      </div>

    </div>
  );
};

export default Enterprise;