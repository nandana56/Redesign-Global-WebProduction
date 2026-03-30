import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, User, Mail, Smartphone, 
  MessageSquare, Briefcase, Send, ChevronRight,
  TrendingUp, BarChart3, Fingerprint
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ── UI COMPONENTS ─────────────────────────────────────────────────────────

const KineticCaseStudyCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    
    gsap.fromTo(imageRef.current, 
      { scale: 1.2, y: -50 },
      { 
        scale: 1, 
        y: 0,
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }, []);

  return (
    <div ref={cardRef} className="relative w-full mb-32 group">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Cinematic Image Container */}
        <div className="w-full lg:w-3/5 aspect-[16/10] rounded-[2rem] overflow-hidden relative shadow-2xl">
          <img 
            ref={imageRef}
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute bottom-10 left-10 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                   <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <span className="font-poppins text-white font-bold tracking-widest text-xs uppercase">Open Case_Study</span>
             </div>
          </div>
        </div>

        {/* Narrative Content */}
        <div className="w-full lg:w-2/5">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
               <span className="font-mono text-[10px] text-blue-600 font-black tracking-[0.4em] uppercase">PROJECT_0{index + 1}</span>
               <div className="h-px w-12 bg-blue-600/30" />
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-[0.9] font-poppins tracking-tighter group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            
            <p className="text-gray-500 text-lg font-medium leading-relaxed font-poppins max-w-md">
              {item.desc}
            </p>
            
            <div className="flex flex-wrap gap-3">
               {['MISSION_READY', 'CORE_TECH', 'VERIFIED'].map(tag => (
                 <span key={tag} className="text-[9px] font-bold text-gray-400 border border-gray-200 px-3 py-1 rounded-full uppercase tracking-widest group-hover:border-blue-200 group-hover:text-blue-400 transition-colors">
                    {tag}
                 </span>
               ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const KineticInput = ({ label, type = "text", placeholder, icon: Icon }) => (
  <div className="relative border-b-2 border-gray-200 py-4 group hover:border-blue-400 transition-all">
    <div className="flex justify-between items-center mb-2">
       <span className="font-poppins text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{label}</span>
       <Icon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
    </div>
    <input 
      type={type}
      placeholder={placeholder}
      className="w-full bg-transparent text-gray-900 text-xl font-poppins font-bold focus:outline-none placeholder:text-gray-200"
    />
  </div>
);

const KineticCaseStudySection = () => {
  const caseStudies = [
    {
      title: "Neural Retail Dynamics",
      category: "Retail & AI",
      desc: "Revolutionizing retail with agentic AI recommendations and personalized journeys.",
      image: "/Assets/AI-Shopping.png",
      link: "/solutions/ai-shopping-experience"
    },
    {
      title: "Market Insight Engine",
      category: "Analytics",
      desc: "Real-time market insights using advanced NLP models to track global trends.",
      image: "/Assets/sentiment-analysis-stock-market.png",
      link: "/solutions/market-sentiment-analysis"
    },
    {
      title: "Copilot Gate Protocol",
      category: "E-Commerce",
      desc: "Seamless payment integration with AI-powered security and checkout optimization.",
      image: "/Assets/Copilot-Checkout-Integration.png",
      link: "/solutions/copilot-checkout-integration"
    }
  ];

  return (
    <section className="relative w-full bg-white overflow-hidden" id="case-studies">
      
      {/* ── SPLIT SCREEN BACKGROUND ── */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-slate-50 border-l border-gray-100 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-8 relative z-10 py-32">
        <div className="flex flex-col lg:flex-row gap-32">
          
          {/* ── LEFT: BOLD ARCHIVE ── */}
          <div className="lg:w-1/2">
            <header className="mb-32">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: 100 }}
                 className="h-2 bg-blue-600 mb-10" 
               />
               <h2 className="text-7xl md:text-9xl font-black text-gray-900 tracking-tighter leading-[0.8] mb-8 font-poppins">
                  CASE <br />
                  <span className="text-blue-600 italic">STUDY</span>
               </h2>
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full border border-gray-100 flex items-center justify-center animate-spin-slow">
                     <TrendingUp className="w-6 h-6 text-gray-300" />
                  </div>
                  <p className="text-gray-400 font-mono text-xs uppercase tracking-[0.3em] max-w-[200px] leading-relaxed">
                     DEPLOYED_SOLUTIONS // DATA_DRIVEN_RESULTS
                  </p>
               </div>
            </header>

            <div className="relative">
              {caseStudies.map((item, idx) => (
                <KineticCaseStudyCard key={idx} item={item} index={idx} />
              ))}
            </div>

            <button className="relative group px-12 py-6 overflow-hidden rounded-full border-2 border-gray-900">
               <span className="relative z-10 text-gray-900 font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                  Load_Greater_Archive
               </span>
               <div className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* ── RIGHT: PINNED CONTACT NARRATIVE ── */}
          <aside className="lg:w-1/2">
            <div className="sticky top-24 pt-10">
               <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 className="bg-transparent"
               >
                  <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-widest uppercase mb-4 font-poppins">
                     GET IN <br />
                     <span className="text-blue-600 italic">TOUCH</span>
                  </h2>
                  <p className="text-gray-500 text-lg mb-20 font-poppins max-w-md font-medium">
                     Have a question or looking to collaborate? Reach out to our team of experts.
                  </p>

                  <form className="space-y-12">
                    <KineticInput label="The_Name" icon={User} placeholder="ENTER IDENTITY" />
                    <KineticInput label="The_Email" icon={Mail} type="email" placeholder="ENTER ADDRESS" />
                    <KineticInput label="The_Phone" icon={Smartphone} placeholder="ENTER UPLINK" />

                    <div className="group border-b-2 border-gray-200 py-4 hover:border-blue-400 transition-all">
                       <div className="flex justify-between items-center mb-4">
                          <span className="font-poppins text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Select_Mission</span>
                          <Briefcase className="w-4 h-4 text-gray-400" />
                       </div>
                       <select className="w-full bg-transparent text-gray-900 text-xl font-poppins font-bold focus:outline-none cursor-pointer appearance-none">
                          <option value="" className="bg-white text-gray-400">CHOICES_AVAILABLE</option>
                          <option value="ai" className="bg-white text-gray-900">AGENTIC_AI</option>
                          <option value="web" className="bg-white text-gray-900">WEB_TECH</option>
                          <option value="consult" className="bg-white text-gray-900">CONSULTATION</option>
                       </select>
                    </div>

                    <div className="group border-b-2 border-gray-200 py-4 hover:border-blue-400 transition-all">
                        <div className="flex justify-between items-center mb-4">
                           <span className="font-poppins text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">The_Message</span>
                           <MessageSquare className="w-4 h-4 text-gray-400" />
                        </div>
                        <textarea 
                           placeholder="DESCRIBE_PROJECT..."
                           className="w-full bg-transparent text-gray-900 text-xl font-poppins font-bold focus:outline-none h-40 resize-none placeholder:text-gray-200"
                        />
                    </div>

                    <motion.button 
                      whileHover={{ x: 10 }}
                      className="group flex items-center gap-8 py-8"
                    >
                       <span className="text-gray-900 text-4xl font-black uppercase tracking-tighter group-hover:text-blue-600 transition-colors">
                          TRANSMIT_NOW
                       </span>
                       <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                          <Send className="w-8 h-8 text-white" />
                       </div>
                    </motion.button>
                  </form>
               </motion.div>
            </div>
          </aside>

        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default KineticCaseStudySection;
