import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, User, Mail, Smartphone, 
  MessageSquare, Briefcase, Send, ChevronRight, 
  Maximize2, Activity, ShieldCheck, Database
} from 'lucide-react';

// ── UI COMPONENTS ─────────────────────────────────────────────────────────

const BlueprintGrid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-10">
    <div className="absolute inset-0" 
         style={{ 
           backgroundImage: `linear-gradient(#52b8f4 1px, transparent 1px), linear-gradient(90deg, #52b8f4 1px, transparent 1px)`,
           backgroundSize: '50px 50px'
         }} />
    <div className="absolute inset-0" 
         style={{ 
           backgroundImage: `radial-gradient(circle, #52b8f4 1px, transparent 1px)`,
           backgroundSize: '10px 10px'
         }} />
  </div>
);

const ModularCaseStudyCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white border border-gray-100 rounded-[2rem] p-6 group hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      {/* Technical Metadata Corner */}
      <div className="absolute top-6 right-8 font-mono text-[8px] text-gray-400 uppercase tracking-widest hidden lg:block">
         SYSTEM_0{index + 1} <br />
         REV_B.02
      </div>

      <div className="flex flex-col gap-6">
        <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-gray-50 bg-gray-50 flex-shrink-0">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          {/* Animated SVG Border on Hover */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <rect 
               x="4" y="4" width="calc(100% - 8px)" height="calc(100% - 8px)" 
               fill="none" stroke="#52b8f4" strokeWidth="2" strokeDasharray="10 5" 
               className="animate-[dash_20s_linear_infinite]"
             />
          </svg>
        </div>

        <div className="px-2">
          <div className="flex items-center gap-2 mb-3">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
             <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{item.category}</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors font-poppins leading-tight">
            {item.title}
          </h3>
          
          <p className="text-gray-500 text-sm leading-relaxed mb-6 font-poppins line-clamp-2">
            {item.desc}
          </p>
          
          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
             <a 
               href={item.link}
               className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 hover:text-blue-600 transition-colors"
             >
               View_Documentation <ChevronRight className="w-4 h-4" />
             </a>
             <div className="flex gap-1">
                {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-gray-200" />)}
             </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const TactileInput = ({ label, icon: Icon, type = "text", placeholder }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between px-1">
       <label className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
       <Icon className="w-3 h-3 text-gray-300" />
    </div>
    <div className="relative">
       <input 
         type={type} 
         placeholder={placeholder}
         className="w-full bg-gray-50 border-b-2 border-gray-200 px-0 py-3 text-gray-800 text-sm font-poppins focus:outline-none focus:border-blue-600 transition-all placeholder:text-gray-300"
       />
       <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-gray-300" />
    </div>
  </div>
);

const BlueprintCaseStudySection = () => {
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
    <section className="relative w-full py-32 bg-white overflow-hidden" id="case-studies">
      <BlueprintGrid />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-12">
           <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                 <div className="px-3 py-1 bg-gray-900 text-white text-[9px] font-black uppercase tracking-[0.3em]">Module_v6.1</div>
                 <div className="h-px w-24 bg-gray-200" />
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none mb-6">
                ARCHIVE <br />
                <span className="text-blue-600 italic">SYSTEMS</span>
              </h2>
           </div>
           
           <div className="hidden lg:flex flex-col items-end gap-2 font-mono text-[9px] text-gray-400 font-bold">
              <span>LAT: 34.0522° N</span>
              <span>LON: 118.2437° W</span>
              <div className="w-32 h-[1px] bg-blue-600 mt-2" />
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* ── LEFT: CASE STUDIES ── */}
          <div className="lg:w-2/3">
            <div className="grid md:grid-cols-2 gap-8">
               {caseStudies.map((item, idx) => (
                 <ModularCaseStudyCard key={idx} item={item} index={idx} />
               ))}
               
               {/* "Request more" placeholder card */}
               <motion.div 
                 className="hidden md:flex flex-col items-center justify-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 p-8 h-full min-h-[400px]"
                 whileHover={{ borderColor: "#52b8f4", backgroundColor: "#f0f9ff" }}
               >
                  <Activity className="w-10 h-10 text-gray-300 mb-4 animate-pulse" />
                  <p className="font-mono text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">
                    Awaiting_Further <br /> Parameters...
                  </p>
               </motion.div>
            </div>
          </div>

          {/* ── RIGHT: TACTILE SIDEBAR ── */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24 bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative">
               {/* Technical details badge */}
               <div className="absolute top-10 left-0 w-12 h-6 bg-blue-600 text-white text-[8px] font-black flex items-center justify-center origin-left rotate-90 translate-x-3 translate-y-3">
                  ST_99
               </div>

               <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 font-poppins">Get in Touch</h3>
                  <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest mb-10 leading-relaxed">
                    Direct_Uplink_Channel_01
                  </p>

                  <form className="space-y-8">
                    <TactileInput label="Identifier" icon={User} placeholder="ENTER_NAME" />
                    <TactileInput label="Virtual_Address" icon={Mail} type="email" placeholder="ENTER_EMAIL" />
                    <TactileInput label="Uplink_Path" icon={Smartphone} placeholder="ENTER_PHONE" />

                    <div className="space-y-2">
                       <label className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest block px-1">Mission_Scope</label>
                       <select className="w-full bg-gray-50 border-b-2 border-gray-200 py-3 text-gray-800 text-sm font-poppins focus:outline-none focus:border-blue-600 cursor-pointer">
                          <option value="">SELECT_MISSION</option>
                          <option value="ai">AGENTIC_AI_DEV</option>
                          <option value="web">WEB_ARCHITECTURE</option>
                          <option value="demo">PRODUCT_DEMO</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest block px-1">Specifications</label>
                       <textarea 
                         rows="3"
                         placeholder="APPEND_PROJECT_DETAILS..."
                         className="w-full bg-gray-50 border-b-2 border-gray-200 py-3 text-gray-800 text-sm font-poppins focus:outline-none focus:border-blue-600 resize-none h-32"
                       />
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-600 hover:bg-gray-900 text-white font-black uppercase tracking-[0.4em] py-5 rounded-2xl transition-all flex items-center justify-center gap-3 mt-4 text-xs"
                    >
                      INITIALIZE <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </form>
               </div>
            </div>
            
            {/* Ambient detail below form */}
            <div className="mt-8 flex justify-between px-8 opacity-20 hidden lg:flex">
               <ShieldCheck className="w-4 h-4 text-gray-400" />
               <Database className="w-4 h-4 text-gray-400" />
               <Activity className="w-4 h-4 text-gray-400" />
            </div>
          </aside>

        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
      `}</style>
    </section>
  );
};

export default BlueprintCaseStudySection;
