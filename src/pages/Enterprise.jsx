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
  Globe
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const enterpriseServices = [
  {
    title: "Comprehensive Web Production and Management",
    desc: "Our Enterprise Services encompass a wide array of web production and management solutions to empower your organization’s online presence. From concept to execution, we provide end-to-end web development services, ensuring that your website not only reflects your brand identity but also delivers an exceptional user experience.",
    icon: <Globe className="w-8 h-8" />,
    tech: ["End-to-End Dev", "Brand Identity", "UX Design"]
  },
  {
    title: "Gaining Valuable Insights through Analytics and Reports",
    desc: "As a strategic partner, we understand that data is the backbone of informed decision-making. That’s why our Enterprise Services focus on harnessing the power of data through advanced SEO strategies and comprehensive analytics implementation to ensure your enterprise website ranks high and attracts organic traffic.",
    icon: <BarChart className="w-8 h-8" />,
    tech: ["Data Strategy", "SEO Optimization", "KPI Tracking"]
  },
  {
    title: "Ensuring Accessibility Compliance and User-Centric Experiences",
    desc: "Inclusivity and user experience are at the core of our Enterprise Services. We prioritize accessibility compliance, making sure your website is usable and navigable by all users, including those with disabilities, following industry standards like WCAG.",
    icon: <Users className="w-8 h-8" />,
    tech: ["WCAG Compliance", "Inclusive Design", "Multi-Device"]
  },
  {
    title: "Scalable Solutions with a Customer-Centric Approach",
    desc: "At Global Web Production, scalability is not just a feature; it’s ingrained in every aspect of our Enterprise Services. We design solutions that can grow with your business through continuous collaboration and feedback, allowing us to adapt to changing requirements and trends.",
    icon: <Cpu className="w-8 h-8" />,
    tech: ["Scalable Architecture", "Agile Flow", "Future-Proof"]
  }
];

const Enterprise = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Progress line animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: true,
          }
        }
      );

      // Hero animation
      gsap.to(".blueprint-hero", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2
      });

      // Technical elements rotation
      gsap.to(".tech-ring", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#000e34] min-h-screen font-poppins text-white overflow-hidden selection:bg-[#4bb5f8] selection:text-white pb-32">
      
      {/* --- BACKGROUND BLUEPRINT LAYER --- */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(#4bb5f8 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#4bb5f8]/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#4bb5f8]/20 to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4bb5f8]/20 to-transparent" />
        
        {/* Animated Technical Rings */}
        <div className="absolute -top-20 -left-20 w-96 h-96 border border-[#4bb5f8]/10 rounded-full tech-ring" />
        <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] border border-[#4bb5f8]/5 rounded-full tech-ring" style={{ animationDirection: 'reverse' }} />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-48 pb-20 px-6 z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#4bb5f8]/30 bg-[#4bb5f8]/10 text-[#4bb5f8] text-xs font-bold uppercase tracking-widest mb-8"
            >
              <ShieldCheck className="w-4 h-4" />
              Scale with Precision
            </motion.div>
            
            <h1 className="blueprint-hero opacity-0 translate-y-10 text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-none">
              ENTERPRISE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4bb5f8] to-white">SOLUTIONS</span>
            </h1>
            
            <h2 className="blueprint-hero opacity-0 translate-y-10 text-xl md:text-3xl text-white/80 font-light mb-12 max-w-3xl leading-relaxed">
              Tailored Systems for <span className="text-[#4bb5f8]">Enterprise Excellence</span>. 
              Engineering the future of large-scale digital architecture.
            </h2>

            <div className="blueprint-hero opacity-0 translate-y-10 flex flex-wrap justify-center gap-6">
              {[
                { icon: <Zap />, label: "High Performance" },
                { icon: <Globe />, label: "Global Presence" },
                { icon: <ShieldCheck />, label: "Bank-Grade Security" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/60 font-medium">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#4bb5f8]">
                    {item.icon}
                  </div>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT ROADMAP --- */}
      <section ref={triggerRef} className="relative py-24 px-6 z-10">
        {/* Central "Laser" Line */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] hidden lg:block overflow-hidden">
          <div className="absolute inset-0 bg-white/5" />
          <div ref={lineRef} className="absolute inset-0 bg-gradient-to-b from-[#4bb5f8] via-white to-transparent origin-top scale-y-0" />
        </div>

        <div className="container mx-auto max-w-6xl">
          <div className="space-y-32">
            {enterpriseServices.map((service, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Visual Connector Node (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#000e34] border-2 border-[#4bb5f8] items-center justify-center shadow-[0_0_20px_rgba(75,181,248,0.4)] z-20">
                  <div className="w-4 h-4 rounded-full bg-[#4bb5f8] animate-pulse" />
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="p-8 md:p-12 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 relative group hover:bg-white/[0.08] transition-all duration-500"
                  >
                    {/* Corner accents */}
                    <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#4bb5f8]/40 rounded-tl-lg" />
                    <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#4bb5f8]/40 rounded-br-lg" />

                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-[#4bb5f8]/20 flex items-center justify-center text-[#4bb5f8]">
                        {service.icon}
                      </div>
                      <div className="h-0.5 flex-grow bg-gradient-to-r from-[#4bb5f8]/50 to-transparent" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white group-hover:text-[#4bb5f8] transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-white/60 leading-relaxed text-lg mb-8">
                      {service.desc}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-auto">
                      {service.tech.map((tag, t) => (
                        <span key={t} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-[#4bb5f8] tracking-widest uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Empty spacer for alignment */}
                <div className="hidden lg:block lg:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="relative py-32 px-6 z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-[#4bb5f8]/20 to-transparent border border-[#4bb5f8]/30 text-center relative overflow-hidden group"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4bb5f8]/10 blur-[100px] pointer-events-none" />
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              READY TO ARCHITECT YOUR <span className="text-[#4bb5f8]">FUTURE?</span>
            </h2>
            
            <p className="text-white/70 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
              Global Web Production provides the technical backbone your enterprise needs to thrive. Let's build something exceptional.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-10 py-4 rounded-full bg-[#4bb5f8] text-[#000e34] font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_rgba(75,181,248,0.3)] flex items-center justify-center gap-2">
                Consult an Architect
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-10 py-4 rounded-full bg-white/5 border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all">
                Download Infrastructure Case Study
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER OVERLAY --- */}
      <div className="py-12 border-t border-white/5 bg-black/20 text-center">
        <p className="text-white/30 text-xs font-poppins tracking-[0.5em] uppercase">
          GLOBAL WEB PRODUCTION • ENTERPRISE DIVISION • V1.0.ARCH
        </p>
      </div>

    </div>
  );
};

export default Enterprise;