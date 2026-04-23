import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Layers, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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

  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isTouch ? 0 : rotateX,
        rotateY: isTouch ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative flex flex-col group cursor-pointer [perspective:1000px] h-full"
      onClick={() => {
        if (item.link) {
          navigate(item.link);
        }
      }}
    >
      <div 
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="relative h-full min-h-[400px] sm:min-h-[450px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 bg-[#0d1f3c] border border-white/10 group-hover:border-[#57c2ff]/50 backdrop-blur-xl"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent opacity-90" />

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
          <p className="text-slate-300 text-sm mb-6 line-clamp-3 font-poppins opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
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

export default function SolutionsCaseStudies() {
  const caseStudies = [
    {
      id: 1,
      title: "From Legacy to Leading Edge AEM Migration",
      desc: "Legacy CMS to Adobe Experience Manager transformation: 300 pages, 4,000+ assets, 4 months, zero compromises.",
      image: "/solution/11.webp",
      category: "Custom AI",
      link: "/solutions/Fortune-50-AEM-Cloud-Migration",
    },
    {
      id: 2,
      title: "AI Shopping Experience",
      desc: "Revolutionizing retail with agentic AI recommendations and personalized journeys that drive conversion.",
      image: "/solution/12.jfif",
      category: "Copilot AI",
    },
    {
      id: 3,
      title: "Market Sentiment Analysis",
      desc: "Real-time market insights using advanced NLP models to track global trends and drive smarter decisions.",
      image: "/solution/13.webp",
      category: "Custom AI",
    },
    {
      id: 4,
      title: "Copilot Checkout Integration",
      desc: "Seamless payment integration with AI-powered security and checkout optimization for higher conversions.",
      image: "/solution/14.jfif",
      category: "Copilot AI",
    },
    {
      id: 5,
      title: "Custom Editor for WordPress",
      desc: "Enhancing content creation with AI-driven editing tools, smart blocks, and intelligent layout suggestions.",
      image: "/solution/15.jfif",
      category: "Custom AI",
    },
  ];

  return (
    <section 
      id="case-studies-fold"
      className="relative w-full py-32 bg-[#000e34] overflow-hidden flex flex-col scroll-mt-24 md:scroll-mt-32"
    >
      {/* ── BACKGROUND BLOBS ── */}
      <LiquidBlob color="linear-gradient(to right, #3b82f6, #1d4ed8)" className="top-20 -left-20" size="500px" />
      <LiquidBlob color="linear-gradient(to right, #57c2ff, #3b82f6)" className="bottom-20 right-10" size="400px" />
      <LiquidBlob color="linear-gradient(to right, #6366f1, #4338ca)" className="top-1/2 left-1/3" size="300px" />

      {/* ── TOP: Heading & Filters ── */}
      <div className="relative z-20 px-8 md:px-20 mb-20 flex flex-col md:flex-row justify-between items-start gap-6 max-w-7xl mx-auto w-full">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-blue-400 font-black text-[10px] uppercase tracking-[0.5em]">
            <Layers size={14} /> Real World Impact
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.85] font-poppins">
            Case <span className="text-blue-500">Studies</span>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-1.5 bg-[#57c2ff] rounded-full mt-6" 
            aria-hidden="true"
          />
        </div>

        <div className="flex items-center gap-4 flex-wrap mt-4 md:mt-0">
          <button 
            onClick={() => document.getElementById('custom-ai-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[10px] font-black text-blue-400/80 hover:text-white hover:bg-blue-500/20 border border-blue-500/30 px-5 py-3 rounded-lg uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(75,181,248,0.15)] bg-[#04153b]/50 backdrop-blur-md"
          >
            Custom AI
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

      {/* ── BOTTOM: Liquid Cards Grid ── */}
      <div className="relative z-10 px-8 md:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {caseStudies.map((item, idx) => (
            <OrganicCaseStudyCard key={item.id} item={item} index={idx} />
          ))}


        </div>
      </div>
    </section>
  );
}
