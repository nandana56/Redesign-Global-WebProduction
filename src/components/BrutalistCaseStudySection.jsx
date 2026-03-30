import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, Terminal, ArrowRight, User, Mail, 
  Smartphone, MessageSquare, Briefcase, 
  Send, Maximize2, Hash, Activity 
} from 'lucide-react';

// ── UI COMPONENTS ─────────────────────────────────────────────────────────

const TerminalWindow = ({ item, index }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
    >
      {/* Terminal Title Bar */}
      <div className="bg-black text-white px-4 py-2 flex items-center justify-between border-b-4 border-black">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-yellow-500" />
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
            {item.category.replace(/ /g, '_')}_CORE_v1.0
          </span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 border-2 border-white" />
          <X className="w-3 h-3 text-white" />
        </div>
      </div>

      <div className="p-6">
        <div className="aspect-video bg-gray-100 border-4 border-black mb-6 overflow-hidden relative group">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover filter contrast-125 group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 bg-yellow-500 text-black px-2 py-1 font-mono text-[9px] font-black border-2 border-black rotate-[-5deg]">
             SECURE_ASSET
          </div>
        </div>

        <div className="space-y-4">
           <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-black" />
              <h3 className="text-2xl font-black uppercase tracking-tighter font-poppins">{item.title}</h3>
           </div>
           
           <p className="font-mono text-sm text-gray-700 leading-tight">
             {">"} {item.desc}
           </p>

           <div className="pt-4 border-t-2 border-black/10 flex items-center justify-between">
              <a 
                href={item.link}
                className="bg-black text-white px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-yellow-500 hover:text-black transition-colors"
              >
                EXECUTE_CASE <ArrowRight className="w-4 h-4" />
              </a>
              <span className="font-mono text-[9px] text-gray-400 font-bold">SHA_256: FF03x...</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const BrutalistInput = ({ label, icon: Icon, type = "text", placeholder }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
       <Icon className="w-4 h-4 text-black" />
       <label className="font-mono text-[10px] font-black uppercase tracking-widest text-black/60">{label}</label>
    </div>
    <div className="relative group">
       <input 
         type={type} 
         placeholder={placeholder}
         className="w-full bg-white border-4 border-black p-4 text-black font-mono font-bold focus:outline-none focus:bg-yellow-500/10 placeholder:text-gray-300 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-focus-within:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
       />
    </div>
  </div>
);

const BrutalistCaseStudySection = () => {
  const caseStudies = [
    {
      title: "AI Shopping Experience",
      category: "Retail AI",
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
    <section className="relative w-full py-32 bg-[#f0f0f0] overflow-hidden border-t-8 border-black font-mono" id="case-studies">
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 2px, transparent 2px)`, backgroundSize: '30px 30px' }} 
      />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Page Header */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
           <div>
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-4 h-4 bg-yellow-500 border-2 border-black animate-pulse" />
                 <span className="text-xs font-black uppercase tracking-[0.5em] text-black/40">INDUSTRIAL_ARCHIVE_v4</span>
              </div>
              <h2 className="text-6xl md:text-9xl font-black text-black tracking-tighter leading-[0.8]">
                 MODULAR <br />
                 <span className="text-yellow-500">SYSTEMS</span>
              </h2>
           </div>
           
           <div className="bg-black text-[#52b8f4] p-6 border-4 border-black font-mono text-xs leading-relaxed hidden lg:block">
              <span className="block opacity-50">// SYSTEM_DIAGNOSTICS</span>
              <span className="block text-white">UP_TIME: 99h 07m 33s</span>
              <span className="block text-yellow-500">STATUS: OPTIMAL</span>
              <span className="block underline decoration-2 underline-offset-4 mt-2 cursor-pointer hover:bg-white hover:text-black">REBOOT_CORE_PROTOCOL_</span>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* ── LEFT: CASE STUDIES ── */}
          <div className="lg:w-2/3">
             <div className="grid md:grid-cols-2 gap-12">
                {caseStudies.map((item, idx) => (
                  <TerminalWindow key={idx} item={item} index={idx} />
                ))}
                
                {/* Loader Slot */}
                <div className="flex flex-col items-center justify-center border-4 border-black border-dashed p-10 bg-white/50 min-h-[400px]">
                   <Activity className="w-12 h-12 text-black mb-6 animate-spin-slow" />
                   <div className="text-center">
                     <span className="block font-black text-xs uppercase tracking-widest mb-2">Awaiting Commands</span>
                     <span className="block text-[8px] text-gray-400">SYNCING_REMOTE_NODES...</span>
                   </div>
                </div>
             </div>
          </div>

          {/* ── RIGHT: COMMAND CONTACT ── */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24 bg-white border-4 border-black p-10 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
               <div className="flex items-center gap-4 mb-2">
                  <div className="px-2 py-0.5 bg-yellow-500 text-black text-[10px] font-black border-2 border-black">
                     C:\RUN_CONTACT.EXE
                  </div>
               </div>
               
               <h3 className="text-3xl font-black text-black mb-1 font-poppins uppercase">GET_IN_TOUCH</h3>
               <p className="text-[10px] text-gray-500 font-bold mb-10 leading-relaxed uppercase tracking-widest">
                  Establish connection via direct terminal uplink.
               </p>

               <form className="space-y-8">
                  <BrutalistInput label="User_ID" icon={User} placeholder="ENTER_NAME" />
                  <BrutalistInput label="Auth_Email" icon={Mail} type="email" placeholder="ENTER_EMAIL" />
                  <BrutalistInput label="Phone_Uplink" icon={Smartphone} placeholder="ENTER_PHONE" />

                  <div className="space-y-3">
                     <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-black" />
                        <label className="font-mono text-[10px] font-black uppercase tracking-widest text-black/60">Module_Selection</label>
                     </div>
                     <select className="w-full bg-white border-4 border-black p-4 text-black font-mono font-bold focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <option value="">-- CHOOSE_MODULE --</option>
                        <option value="ai">AI_AGENTIC_SYS</option>
                        <option value="web">WEB_PRODUCTION</option>
                        <option value="consult">CORE_CONSULT</option>
                     </select>
                  </div>

                  <div className="space-y-3">
                     <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-black" />
                        <label className="font-mono text-[10px] font-black uppercase tracking-widest text-black/60">Message_Payload</label>
                     </div>
                     <textarea 
                        rows="4"
                        placeholder="APPEND_DATA_HERE..."
                        className="w-full bg-white border-4 border-black p-4 text-black font-mono font-bold focus:outline-none resize-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-300"
                     />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-black text-white hover:bg-yellow-500 hover:text-black font-black uppercase tracking-[0.5em] py-5 transition-all flex items-center justify-center gap-3 border-4 border-black text-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
                  >
                    TRANSMIT <Send className="w-4 h-4" />
                  </motion.button>
               </form>

               <div className="mt-8 flex justify-between pt-8 border-t-4 border-black/5 opacity-20">
                  {[1,2,3,4,5,6].map(i => <div key={i} className="w-2 h-2 bg-black" />)}
               </div>
            </div>
          </aside>

        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default BrutalistCaseStudySection;
