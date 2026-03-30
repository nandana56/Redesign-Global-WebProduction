import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, User, Mail, Smartphone,
  MessageSquare, Briefcase, Send, ChevronRight,
  Sparkles, Heart, Globe
} from 'lucide-react';

// ── UI COMPONENTS ─────────────────────────────────────────────────────────

const LiquidBlob = ({ className, color, size = "300px" }) => (
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      rotate: [0, 90, 0],
      borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 55%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 55%"],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }}
    className={`absolute blur-3xl opacity-20 pointer-events-none ${className}`}
    style={{
      width: size,
      height: size,
      background: color,
    }}
  />
);

const OrganicCaseStudyCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col group cursor-pointer"
    >
      <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-700">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Floating Tag */}
        <div className="absolute top-6 left-6">
          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full border border-white/30 uppercase tracking-widest">
            {item.category}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-poppins">
            {item.title}
          </h3>
          <p className="text-white/70 text-sm mb-4 line-clamp-2 font-poppins opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {item.desc}
          </p>
          <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
            <span className="text-xs font-bold uppercase tracking-widest">Explore Case</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const FluidInput = ({ label, icon: Icon, type = "text", placeholder }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-400 ml-4">{label}</label>
    <div className="relative group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors">
        <Icon className="w-4 h-4" />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 rounded-[1.5rem] py-4 pl-12 pr-6 text-gray-800 font-poppins font-medium transition-all group-hover:bg-slate-100 focus:bg-white focus:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.15)] placeholder:text-gray-300"
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
    <section className="relative w-full py-32 bg-white overflow-hidden border-t border-gray-50" id="case-studies">
      {/* ── BACKGROUND BLOBS ── */}
      <LiquidBlob color="linear-gradient(to right, #60a5fa, #3b82f6)" className="top-20 left-10" />
      <LiquidBlob color="linear-gradient(to right, #818cf8, #6366f1)" className="bottom-40 right-10" size="400px" />
      <LiquidBlob color="linear-gradient(to right, #2dd4bf, #0d9488)" className="top-1/2 left-1/3" size="250px" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">

        {/* Section Title */}
        <div className="mb-14 text-left max-w-3xl">
          <h2 className="text-gray-900 font-bold text-3xl sm:text-4xl mb-2 font-poppins">
            Case Studies
          </h2>
          <div className="w-12 h-1 bg-blue-600 mb-10" aria-hidden="true"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">

          {/* ── LEFT: CASE STUDIES ── */}
          <div className="lg:w-2/3">
            <div className="grid md:grid-cols-2 gap-10">
              {caseStudies.map((item, idx) => (
                <OrganicCaseStudyCard key={idx} item={item} index={idx} />
              ))}

              {/* Empty "Next" Card */}
              <div className="aspect-[4/5] rounded-[3rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center p-12 text-center group hover:bg-slate-50/50 transition-colors">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-slate-200" />
                </div>
                <h4 className="font-bold text-slate-400 mb-2">Ready for Next?</h4>
                <p className="text-slate-300 text-sm">Join our mission to redefine what's possible.</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: FLUID SIDEBAR ── */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-white/70 backdrop-blur-3xl border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] rounded-[3rem] p-12 relative overflow-hidden group">

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1 font-poppins tracking-tight">Get in Touch</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed font-poppins">
                    Have a question or looking to collaborate? Reach out to our team of experts.
                  </p>

                  <form className="space-y-6">
                    <FluidInput label="Full Name" icon={User} placeholder="Full Name" />
                    <FluidInput label="Email Address" icon={Mail} type="email" placeholder="Email Address" />
                    <FluidInput label="Phone Number" icon={Smartphone} placeholder="Phone Number" />

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-4">Inquiry Category</label>
                      <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <select className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] py-4 pl-12 pr-10 text-gray-800 font-poppins font-medium appearance-none cursor-pointer focus:bg-white transition-all">
                          <option value="">Select a category</option>
                          <option value="ai">AI Enablement</option>
                          <option value="web">Web Development</option>
                          <option value="consult">Technical Consulting</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                          <ChevronRight className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-4">How can we help?</label>
                      <div className="relative">
                        <div className="absolute left-5 top-6 text-gray-300">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <textarea
                          rows="4"
                          placeholder="How can we help?"
                          className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] py-5 pl-12 pr-6 text-gray-800 font-poppins font-medium placeholder:text-gray-300 focus:bg-white transition-all resize-none"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-3 mt-6"
                    >
                      Start Journey <Send className="w-4 h-4" />
                    </motion.button>
                  </form>
                </div>
              </div>

              {/* Ambient Badge */}
              <div className="mt-8 flex items-center justify-center gap-3 opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-default">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Built with Passion</span>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
};

export default LiquidCaseStudySection;
