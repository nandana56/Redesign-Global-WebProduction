import React, { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, MeshDistortMaterial, 
  OrbitControls, PerspectiveCamera, 
  Text, ScreenSpace,
  Float as DreiFloat,
  PresentationControls,
  MeshWobbleMaterial,
  Decal,
  useTexture
} from '@react-three/drei';
import * as THREE from 'three';
import { 
  ArrowRight, User, Mail, Smartphone, 
  MessageSquare, Briefcase, Send, ChevronRight 
} from 'lucide-react';
import WebGLDisposer from './WebGLDisposer';

// ── THREE.JS COMPONENTS ───────────────────────────────────────────────────

const HologramGlobe = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z += 0.002;
    }
  });

  return (
    <DreiFloat speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <MeshDistortMaterial
          color="#52b8f4"
          speed={2}
          distort={0.4}
          radius={1}
          emissive="#113468"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.3}
        />
        <points>
          <sphereGeometry args={[2.52, 32, 24]} />
          <pointsMaterial color="#52b8f4" size={0.05} sizeAttenuation />
        </points>
      </mesh>
    </DreiFloat>
  );
};

// ── UI COMPONENTS ─────────────────────────────────────────────────────────

const CaseStudyCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col md:flex-row gap-8 group cursor-pointer"
    >
      {/* 3D Visual Indicator */}
      <div className="md:w-12 flex flex-col items-center pt-2">
         <div className="w-px h-full bg-gradient-to-b from-[#52b8f4]/50 to-transparent relative">
            <motion.div 
              animate={{ top: isHovered ? "100%" : "0%" }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-8 bg-gradient-to-b from-[#52b8f4] to-transparent blur-sm"
            />
            <div className="w-3 h-3 rounded-full border border-[#52b8f4] bg-black absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
               <div className="w-1 h-1 rounded-full bg-[#52b8f4]" />
            </div>
         </div>
         <span className="font-mono text-[10px] text-[#52b8f4]/40 rotate-90 mt-16 whitespace-nowrap tracking-[0.3em]">
            MOD_0{index + 1}
         </span>
      </div>

      <div className="flex-grow bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500 overflow-hidden relative">
        {/* Holographic light sweep */}
        <motion.div 
          animate={{ x: isHovered ? ["-100%", "200%"] : "-100%" }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#52b8f4]/5 to-transparent skew-x-[-25deg] pointer-events-none"
        />

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="w-full lg:w-2/5 aspect-video overflow-hidden rounded-2xl relative border border-white/10">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
               <span className="text-[10px] font-bold text-[#52b8f4] uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  {item.category}
               </span>
            </div>
          </div>

          <div className="w-full lg:w-3/5">
            <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#52b8f4] transition-colors font-poppins">
              {item.title}
            </h3>
            <p className="text-gray-400 text-base leading-relaxed mb-6 font-poppins">
              {item.desc}
            </p>
            
            <div className="flex items-center gap-6">
               <a 
                 href={item.link}
                 className="flex items-center gap-2 text-[#52b8f4] text-xs font-bold uppercase tracking-[0.2em] group/btn"
               >
                 Initialize_Protocol <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
               </a>
               
               <div className="flex-grow h-px bg-white/5" />
               
               <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#52b8f4]/20 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-[#52b8f4]/20" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const FormInput = ({ icon: Icon, type = "text", name, placeholder, required = false }) => (
  <div className="group relative">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52b8f4]/40 group-focus-within:text-[#52b8f4] transition-colors">
      <Icon className="w-4 h-4" />
    </div>
    <input 
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white text-sm focus:outline-none focus:border-[#52b8f4]/50 focus:bg-white/[0.05] transition-all font-poppins placeholder:text-gray-600"
    />
    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#52b8f4] transition-all duration-500 group-focus-within:w-full" />
  </div>
);

const HolographicCaseStudySection = () => {
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
    <section className="relative w-full py-32 bg-[#020617] overflow-hidden border-t border-white/5" id="case-studies">
      {/* ── BACKGROUND HOLOGRAPHIC FIELD ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0" 
             style={{ 
               backgroundImage: `radial-gradient(circle at 1px 1px, #52b8f4 1px, transparent 0)`, 
               backgroundSize: '80px 80px' 
             }} />
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-[#52b8f4]/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* ── LEFT COLUMN: CASE STUDIES ── */}
          <div className="lg:w-2/3">
            <div className="mb-20">
               <motion.div
                 initial={{ opacity: 0, scaleX: 0 }}
                 whileInView={{ opacity: 1, scaleX: 1 }}
                 viewport={{ once: true }}
                 className="w-24 h-1 bg-[#52b8f4] mb-8 origin-left"
               />
               <h2 className="text-5xl md:text-7xl font-bold text-white font-poppins tracking-tighter mb-4">
                  Tactical <span className="text-[#52b8f4] italic">Archives</span>
               </h2>
               <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.5em] mb-12">
                  // AGENTIC_DEPLOYMENTS / STATUS: OPERATIONAL
               </p>
            </div>

            <div className="space-y-16">
              {caseStudies.map((item, idx) => (
                <CaseStudyCard key={idx} item={item} index={idx} />
              ))}
            </div>

            <div className="mt-20 flex justify-center">
               <button className="group relative px-10 py-4 bg-transparent border border-[#52b8f4]/30 hover:border-[#52b8f4] rounded-full text-[#52b8f4] font-bold text-xs uppercase tracking-widest transition-all overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    Sync_More_Data <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-[#52b8f4]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
               </button>
            </div>
          </div>

          {/* ── RIGHT COLUMN: INTERACTIVE FORM ── */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24">
               {/* 3D Model Area */}
               <div className="h-64 w-full mb-12 relative">
                  
<Canvas alpha transparent>
                <WebGLDisposer />
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <HologramGlobe />
                  </Canvas>

                  <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-3xl overflow-hidden">
                     <div className="absolute top-4 left-4 flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                     </div>
                     <div className="absolute bottom-4 right-4 font-mono text-[8px] text-[#52b8f4] opacity-50">
                        LATENCY: 0.04ms <br />
                        TYPE: NODE_GLOBAL
                     </div>
                  </div>
               </div>

               <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl relative overflow-hidden group">
                  {/* Subtle scanline effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 font-poppins">Get in Touch</h3>
                    <p className="text-gray-500 text-sm mb-10 leading-relaxed font-poppins">
                      Initialize a direct uplink with our core engineering team.
                    </p>

                    <form className="space-y-6">
                      <FormInput icon={User} name="name" placeholder="IDENTIFIER" required />
                      <FormInput icon={Mail} name="email" type="email" placeholder="VIRTUAL_ADDR" required />
                      <FormInput icon={Smartphone} name="phone" placeholder="UPLINK_PATH" required />
                      
                      <div className="group relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52b8f4]/40 group-focus-within:text-[#52b8f4]">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <select className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-10 text-white text-sm focus:outline-none focus:border-[#52b8f4]/50 focus:bg-white/[0.05] transition-all font-poppins appearance-none cursor-pointer">
                          <option value="" className="bg-[#020617]">Select Protocol</option>
                          <optgroup label="AGENTIC AI">
                            <option value="assistant" className="bg-[#020617]">Sales Assistant</option>
                            <option value="knowledge" className="bg-[#020617]">Knowledge Agent</option>
                          </optgroup>
                          <optgroup label="SERVICES">
                            <option value="dev" className="bg-[#020617]">Web Development</option>
                            <option value="managed" className="bg-[#020617]">Managed Services</option>
                          </optgroup>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                           <ChevronRight className="w-4 h-4 rotate-90" />
                        </div>
                      </div>

                      <div className="group relative">
                        <div className="absolute left-4 top-6 text-[#52b8f4]/40 group-focus-within:text-[#52b8f4]">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <textarea 
                          rows="4"
                          placeholder="PARAMETERS_APPEND..."
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-5 pl-12 pr-6 text-white text-sm focus:outline-none focus:border-[#52b8f4]/50 focus:bg-white/[0.05] transition-all font-poppins placeholder:text-gray-600 resize-none"
                        />
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[#52b8f4] hover:bg-[#52b8f4]/90 text-[#020617] font-black uppercase tracking-[0.3em] py-5 rounded-xl transition-all flex items-center justify-center gap-3 mt-4"
                      >
                        TRANSMIT <Send className="w-4 h-4" />
                      </motion.button>
                    </form>
                  </div>
               </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
};

export default HolographicCaseStudySection;
