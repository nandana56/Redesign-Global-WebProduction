import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const articles = [
  {
    id: "AIAgentCaseStudy",
    title: "Transforming U.S. Real Estate",
    desc: "A mid-sized real estate firm based in the U.S. wanted to modernize their client interaction model to meet the growing expectations of digital-first home buyers. We developed an Agentic AI solution that streamlines lead qualification and engagement.",
    image: "/images/Real-Estate.webp",
    tag: "Case Study",
    link: "/blogs/AIAgentCaseStudy",
    color: "#52b8f4",
  },
  {
    id: "AIWebOptimizer",
    title: "AI-Powered Web Content Optimizer",
    desc: "Creating optimized content that resonates with audiences while meeting technical requirements has become increasingly complex. Our AI tool simplifies this process with real-time feedback.",
    image: "/images/aiblog-.webp",
    tag: "AI & Tech",
    link: "/blogs/WebContentOptimization",
    color: "#52b8f4",
  },
  {
    id: "WebsitePerformance",
    title: "Importance of Web Performance",
    desc: "Crucial for user experience and SEO rankings. We analyze core vitals and implement advanced caching and rendering strategies to ensure lightning-fast speeds.",
    image: "/images/Industry-Articles-Card-1.webp",
    tag: "Performance",
    link: "/blogs/WebsitePerformance",
    color: "#52b8f4",
  },
  {
    id: "SwDevelopmentLifecycle",
    title: "The Basics of SDLC",
    desc: "Structured and efficient software creation methodologies decoded for modern engineering teams. From agile to devops workflows.",
    image: "/images/Industry-Articles-Card-2.webp",
    tag: "Engineering",
    link: "/blogs/3",
    color: "#52b8f4",
  },
  {
    id: "TopWebDevelopment",
    title: "Modern Web Frameworks 2024",
    desc: "A dynamic field that has seen exponential growth across businesses. We explore the latest trends in React, Next.js, and server-side rendering.",
    image: "/images/Industry-Articles-Card-3.webp",
    tag: "Web Dev",
    link: "/blogs/4",
    color: "#52b8f4",
  },
];

// Perfect Pointy-Topped Hexagon Math
const hexClip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

const HexCard = ({ article, index, setSelectedId, isFeatured }) => {
  return (
    <div className="relative z-10 w-[160px] h-[185px] sm:w-[200px] sm:h-[230px] md:w-[230px] md:h-[265px] lg:w-[280px] lg:h-[320px]">
      
      {/* 
        This acts as our physical anchor point in the DOM so the layout doesn't collapse 
        when the framer-motion component shifts to fixed positioning during expansion.  
      */}
      
      <motion.div 
        layoutId={`card-container-${article.id}`}
        onClick={() => setSelectedId(article.id)}
        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glowing Outer Neon Ring */}
        <div 
          className="absolute inset-0 transition-opacity duration-500 opacity-60 group-hover:opacity-100 mix-blend-screen"
          style={{ clipPath: hexClip, backgroundColor: article.color, filter: 'blur(8px)' }}
        />
        
        {/* Solid Border Core */}
        <div 
          className="absolute inset-[1px] transition-colors duration-500"
          style={{ clipPath: hexClip, backgroundColor: isFeatured ? article.color : '#ffffff30' }}
        />

        {/* Deep Dark Content Interior */}
        <div 
          className="absolute inset-[3px] bg-[#061530] overflow-hidden"
          style={{ clipPath: hexClip }}
        >
          {/* Subtle Cyberpunk Overlay Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />
           
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[800ms] ease-out" 
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-[#030712]/40 to-transparent group-hover:from-[#030712]/60 transition-colors duration-500 flex flex-col items-center justify-center px-4 md:px-6 text-center z-10 w-full">
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-[0.3em] mb-2 lg:mb-3 shadow-sm drop-shadow-md" style={{ color: article.color }}>
                 SYS.{String(index + 1).padStart(2, '0')}
              </span>
              <h4 className="text-white text-[11px] sm:text-xs md:text-base lg:text-lg font-bold leading-snug font-poppins drop-shadow-[0_4px_10px_rgba(0,0,0,1)] w-[90%]">
                 {article.title}
              </h4>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

const ExpandedHUD = ({ article, index, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
    >
      {/* Background click listener to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />
      
      {/* The Morphing Dashboard Window */}
      <motion.div 
        layoutId={`card-container-${article.id}`}
        className="relative w-full max-w-[1400px] h-[90vh] md:h-[85vh] bg-[#061530]/95 backdrop-blur-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_150px_rgba(0,0,0,0.8)] border border-white/10"
        style={{
          // Forcibly clear any clipPath that was persisting from the Hexagon origin state!
          clipPath: "none", 
          borderRadius: "2rem"
        }}
      >
        
        {/* Left Side: Media Display Node */}
        <div className="w-full md:w-[45%] h-[35%] md:h-full relative shrink-0 border-b md:border-b-0 md:border-r border-white/10">
           {/* Cyberpunk Scanner Line sweeping image */}
           <motion.div 
             animate={{ top: ["0%", "100%", "0%"] }} 
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             className="absolute left-0 right-0 h-[2px] z-20 shadow-[0_0_15px_currentColor]"
             style={{ backgroundColor: article.color, color: article.color }}
           />
           
           <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-80" />
           
           {/* Terminal Scanlines Overlay */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none mix-blend-overlay" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#061530] via-transparent to-transparent md:bg-gradient-to-r" />
           
           <div className="absolute bottom-6 left-6 font-mono text-xs opacity-50 tracking-widest hidden md:block">
              NODE // {article.id.toUpperCase()}<br/>
              STATUS // ONLINE<br/>
              UPLINK // ACTIVE
           </div>
        </div>
        
        {/* Right Side: Data Payload Node */}
        <div className="w-full md:w-[55%] flex flex-col p-6 md:p-12 lg:p-16 justify-center relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-overlay">
           
           {/* Close System Button */}
           <button 
             onClick={onClose} 
             className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 flex items-center justify-center border border-white/20 rounded-full text-white hover:bg-white/10 hover:scale-110 transition-all z-30"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
           
           {/* Content Injection */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }} 
             animate={{ opacity: 1, x: 0 }} 
             transition={{ delay: 0.3, duration: 0.6 }}
           >
             <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 border border-current" style={{ color: article.color }} />
                <span className="text-xs md:text-sm font-black uppercase tracking-[0.4em]" style={{ color: article.color }}>
                   DATA_LOG // {article.tag}
                </span>
             </div>
             
             <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase leading-[1.1] font-poppins drop-shadow-md">
                {article.title}
             </h2>
             
             <p className="text-gray-400 text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-2xl mb-8 md:mb-12 border-l-2 border-white/10 pl-6">
                {article.desc}
             </p>
             
             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                 <Link 
                   to={article.link} 
                   onClick={onClose}
                   className="flex-1 inline-flex items-center justify-center gap-3 px-4 md:px-8 py-4 border font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] transition-all duration-300 hover:scale-[1.02] hover:bg-white/5"
                   style={{ borderColor: article.color, color: article.color }}
                 >
                    <div className="w-2 h-2 rounded-full animate-pulse bg-current shrink-0" />
                    <span>INITIATE UPLINK</span>
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </Link>
                 
                 <button 
                   onClick={onClose}
                   className="flex-1 inline-flex items-center justify-center gap-3 px-4 md:px-8 py-4 border border-white/20 text-gray-300 font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:text-white hover:border-white/50 bg-black/30"
                 >
                    <svg className="w-4 h-4 shrink-0 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    <span>RETURN TO DATABASE</span>
                 </button>
             </div>
           </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
};


const IndustryArticles = () => {
  const [selectedId, setSelectedId] = useState(null);

  // Reorder articles specifically for the visual symmetry of the 2-3 honeycomb row split
  // Top row: [Index 1, Index 2]
  // Bottom row: [Index 3, Index 0 (Featured), Index 4]

  return (
    <section className="relative w-full min-h-[110vh] bg-[#030712] flex flex-col items-center justify-center py-20 px-4 md:px-0 overflow-hidden">
      
      {/* HUD Glitch Ambience Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[150vh] bg-[#52b8f4]/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[1px] bg-[#52b8f4]/30" />
        <div className="absolute w-[800px] h-[800px] border border-[#52b8f4]/10 rounded-full" />
        <div className="absolute w-[1200px] h-[1200px] border border-white/5 rounded-full border-dashed" />
      </div>

      <div className="relative z-10 text-center mb-16 md:mb-24">
         <h3 className="text-4xl md:text-6xl font-black text-white font-poppins drop-shadow-[0_0_20px_rgba(0,0,0,1)] uppercase tracking-tight">
           INDUSTRY <span style={{ color: "#52b8f4" }}>DATABASE</span>
         </h3>
         <p className="mt-4 text-xs md:text-sm font-mono tracking-[0.4em] uppercase opacity-70" style={{ color: "#52b8f4" }}>
           Select Module For Uplink
         </p>
      </div>

      {/* The Central Honeycomb Cluster Grid Engine */}
      <div className="relative z-20 w-full max-w-[1200px] mx-auto flex flex-col items-center">
         
         {/* Row 1: 2 Hexagons */}
         <div className="flex justify-center gap-2 sm:gap-4 lg:gap-6 z-10 relative">
            <HexCard article={articles[0]} index={0} setSelectedId={setSelectedId} />
            <HexCard article={articles[1]} index={1} setSelectedId={setSelectedId} />
         </div>
         
         {/* Row 2: 3 Hexagons. Aggressive negative margin strictly pulls the points up perfectly into the Row 1 gaps */}
         <div className="flex justify-center gap-2 sm:gap-4 lg:gap-6 -mt-[45px] sm:-mt-[55px] md:-mt-[65px] lg:-mt-[80px] z-20 relative">
            <HexCard article={articles[2]} index={2} setSelectedId={setSelectedId} />
            {/* Center Featured Payload */}
            <HexCard article={articles[3]} index={3} setSelectedId={setSelectedId} isFeatured={true} />
            <HexCard article={articles[4]} index={4} setSelectedId={setSelectedId} />
         </div>

      </div>

      {/* Cross-Fade Framer Motion Root Portal processing layout morphs globally safely out of DOM tree constraints */}
      <AnimatePresence>
        {selectedId && (
            <ExpandedHUD 
               article={articles.find(a => a.id === selectedId)} 
               index={articles.findIndex(a => a.id === selectedId)}
               onClose={() => setSelectedId(null)} 
            />
        )}
      </AnimatePresence>

    </section>
  );
};

export default IndustryArticles;

