import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight, User, Mail, Smartphone,
  MessageSquare, Briefcase, Send, ChevronRight,
  Sparkles, Heart, Globe
} from 'lucide-react';

// ── UI COMPONENTS ─────────────────────────────────────────────────────────

const LiquidBlob = ({ className, color, size = "300px" }) => (
  <motion.div
    animate={{
      scale: [1, 1.3, 1],
      rotate: [0, 180, 0],
      borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 55%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 55%"],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={`absolute blur-[100px] opacity-30 pointer-events-none ${className}`}
    style={{
      width: size,
      height: size,
      background: color,
    }}
  />
);

const OrganicCaseStudyCard = ({ item, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const shineBg = useTransform(
    [mouseXSpring, mouseYSpring],
    ([lx, ly]) => `radial-gradient(circle at ${50 + lx * 80}% ${50 + ly * 80}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative flex flex-col group cursor-pointer [perspective:1000px]"
    >
      <div 
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 bg-[#0d1f3c] border border-white/10 group-hover:border-[#57c2ff]/50 backdrop-blur-xl"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-70 group-hover:opacity-100"
        />
        
        {/* Holographic Shine Effect */}
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: shineBg }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent opacity-90" />

        {/* Floating Tag */}
        <div 
          style={{ transform: "translateZ(80px)" }}
          className="absolute top-6 left-6"
        >
          <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full border border-white/20 uppercase tracking-widest shadow-lg">
            {item.category}
          </span>
        </div>

        {/* Content Section */}
        <div 
          style={{ transform: "translateZ(60px)" }}
          className="absolute inset-x-0 bottom-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-700"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-poppins leading-tight">
            {item.title}
          </h3>
          <p className="text-slate-300 text-sm mb-6 line-clamp-2 font-poppins opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            {item.desc}
          </p>
          
          <div className="flex items-center gap-3 text-white group-hover:text-[#57c2ff] transition-all duration-500 relative overflow-hidden inline-flex px-6 py-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md group-hover:bg-[#57c2ff]/20 group-hover:border-[#57c2ff]/40 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-widest relative z-10">Explore Case</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform relative z-10" />
          </div>
        </div>
      </div>

      {/* Outer Glow Effect */}
      <div className="absolute -inset-4 bg-[#57c2ff]/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
    </motion.article>
  );
};

const FluidInput = ({ label, icon: Icon, type = "text", placeholder }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-400 ml-4 mb-2 block">{label}</label>
    <div className="relative group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#57c2ff] transition-colors">
        <Icon className="w-4 h-4" />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-slate-900/50 border-2 border-white/5 focus:border-[#57c2ff]/30 rounded-[1.5rem] py-4 pl-12 pr-6 text-white font-poppins font-medium transition-all group-hover:bg-slate-900/80 focus:bg-slate-900 focus:shadow-[0_0_30px_-5px_rgba(87,194,255,0.1)] placeholder:text-slate-600"
      />
    </div>
  </div>
);

const LiquidCaseStudySection = () => {
  const caseStudies = [
    {
      title: "AI Shopping Experience",
      category: "Retail & AI",
      desc: "Revolutionizing retail with agentic AI recommendations and personalized journeys.",
      image: "/Assets/AI-Shopping.png",
      link: "/solutions/ai-shopping-experience"
    },
    {
      title: "Market Sentiment Analysis",
      category: "Analytics",
      desc: "Real-time market insights using advanced NLP models to track global trends.",
      image: "/Assets/sentiment-analysis-stock-market.png",
      link: "/solutions/market-sentiment-analysis"
    },
    {
      title: "Copilot Checkout Integration",
      category: "E-Commerce",
      desc: "Seamless payment integration with AI-powered security and checkout optimization.",
      image: "/Assets/Copilot-Checkout-Integration.png",
      link: "/solutions/copilot-checkout-integration"
    }
  ];

  return (
    <section className="relative w-full py-32 bg-[#020617] overflow-hidden" id="case-studies">
      {/* ── BACKGROUND BLOBS ── */}
      <LiquidBlob color="linear-gradient(to right, #3b82f6, #1d4ed8)" className="top-20 -left-20" size="500px" />
      <LiquidBlob color="linear-gradient(to right, #57c2ff, #3b82f6)" className="bottom-20 right-10" size="400px" />
      <LiquidBlob color="linear-gradient(to right, #6366f1, #4338ca)" className="top-1/2 left-1/3" size="300px" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">

        {/* Section Title */}
        <div className="mb-20 text-left max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white font-bold text-4xl sm:text-5xl mb-4 font-poppins tracking-tight"
          >
            Case Studies
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-1.5 bg-[#57c2ff] rounded-full" 
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* ── LEFT: CASE STUDIES ── */}
          <div className="lg:w-2/3">
            <div className="grid md:grid-cols-2 gap-10">
              {caseStudies.map((item, idx) => (
                <OrganicCaseStudyCard key={idx} item={item} index={idx} />
              ))}

              {/* Empty "Next" Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-[4/5] rounded-[2.5rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-12 text-center group hover:bg-white/5 transition-all duration-500"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#57c2ff]/10 transition-all duration-500">
                  <Globe className="w-10 h-10 text-slate-400 group-hover:text-[#57c2ff]" />
                </div>
                <h4 className="font-bold text-white mb-2 font-poppins">Ready for Next?</h4>
                <p className="text-slate-400 text-sm font-poppins">Join our mission to redefine what's possible.</p>
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT: SIDEBAR ── */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-[3rem] p-10 relative overflow-hidden group"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#57c2ff]/50 to-transparent" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2 font-poppins tracking-tight">Get in Touch</h3>
                  <p className="text-slate-400 text-sm mb-10 leading-relaxed font-poppins">
                    Have a question or looking to collaborate? Reach out to our team of experts.
                  </p>

                  <form className="space-y-6">
                    <FluidInput label="Full Name" icon={User} placeholder="Full Name" />
                    <FluidInput label="Email Address" icon={Mail} type="email" placeholder="Email Address" />
                    <FluidInput label="Phone Number" icon={Smartphone} placeholder="Phone Number" />

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 ml-4 mb-2 block">Inquiry Category</label>
                      <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#57c2ff] transition-colors pointer-events-none">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <select className="w-full bg-slate-900/50 border-2 border-white/5 focus:border-[#57c2ff]/30 rounded-[1.5rem] py-4 pl-12 pr-10 text-white font-poppins font-medium appearance-none cursor-pointer focus:bg-slate-900 transition-all">
                          <option value="" className="bg-slate-900">Select a category</option>
                          <option value="ai" className="bg-slate-900">AI Enablement</option>
                          <option value="web" className="bg-slate-900">Web Development</option>
                          <option value="consult" className="bg-slate-900">Technical Consulting</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                          <ChevronRight className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 ml-4 mb-2 block">How can we help?</label>
                      <div className="relative group">
                        <div className="absolute left-5 top-6 text-slate-400 group-focus-within:text-[#57c2ff] transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <textarea
                          rows="4"
                          placeholder="How can we help?"
                          className="w-full bg-slate-900/50 border-2 border-white/5 focus:border-[#57c2ff]/30 rounded-[1.5rem] py-5 pl-12 pr-6 text-white font-poppins font-medium placeholder:text-slate-600 focus:bg-slate-900 transition-all resize-none"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#57c2ff] hover:bg-[#3ba8ff] text-slate-900 font-extrabold py-5 rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(87,194,255,0.4)] transition-all flex items-center justify-center gap-3 mt-6 font-poppins"
                    >
                      Start Journey <Send className="w-4 h-4" />
                    </motion.button>
                  </form>
                </div>
              </motion.div>

              {/* Ambient Badge */}
              <div className="mt-10 flex items-center justify-center gap-3 opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-default">
                <Heart className="w-4 h-4 text-[#57c2ff] fill-[#57c2ff]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Built with Passion</span>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
};

export default LiquidCaseStudySection;

