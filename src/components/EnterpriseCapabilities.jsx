import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const serviceData = [
  {
    id: 1,
    title: "Comprehensive Web Production and Management",
    description: "Our Enterprise Services encompass a wide array of web production and management solutions to empower your organization’s online presence. From concept to execution, we provide end-to-end web development services, ensuring that your website not only reflects your brand identity but also delivers an exceptional user experience. Our team of skilled developers, designers, and project managers work collaboratively to create seamless and scalable digital solutions that accommodate your enterprise’s ever-changing needs.",
    stats: "24/7 Managed Support",
    gradient: "from-[#57C2FF]/20 to-transparent"
  },
  {
    id: 2,
    title: "Gaining Valuable Insights through Analytics and Reports",
    description: "As a strategic partner, we understand that data is the backbone of informed decision-making. That’s why our Enterprise Services focus on harnessing the power of data through advanced SEO strategies and comprehensive analytics implementation. By conducting in-depth keyword research, optimizing on-page and off-page elements, and tracking key performance indicators, we extract actionable insights to optimize your digital strategy continually.",
    stats: "Data-Driven Strategies",
    gradient: "from-[#00E5FF]/20 to-transparent"
  },
  {
    id: 3,
    title: "Ensuring Accessibility Compliance and User-Centric Experiences",
    description: "Inclusivity and user experience are at the core of our Enterprise Services. We prioritize accessibility compliance, making sure your website is usable and navigable by all users, including those with disabilities. Our team adheres to industry best practices and web accessibility standards, such as WCAG, to ensure that your enterprise’s digital assets are fully accessible and compliant. Additionally, our user-centric approach focuses on delivering seamless experiences.",
    stats: "WCAG 2.1 Compliant",
    gradient: "from-[#7000FF]/2b to-transparent"
  },
  {
    id: 4,
    title: "Scalable Solutions with a Customer-Centric Approach",
    description: "At Global Web Production, scalability is not just a feature; it’s ingrained in every aspect of our Enterprise Services. We understand that enterprises evolve and expand, so we design solutions that can grow with your business. Our customer-centric approach involves continuous collaboration and feedback, allowing us to adapt our services according to your changing requirements and industry trends. We empower your enterprise to thrive in a rapidly changing digital world.",
    stats: "Infinite Scalability",
    gradient: "from-[#57C2FF]/20 to-transparent"
  }
];

const HelixCard = ({ service, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative w-full flex ${isEven ? 'justify-start' : 'justify-end'} mb-24 md:mb-32`}
    >
      {/* Decorative Helix Connector Line */}
      <div className={`absolute top-0 ${isEven ? 'right-0 -mr-4' : 'left-0 -ml-4'} w-8 h-[1px] bg-[#57C2FF]/30 hidden lg:block overflow-hidden`}>
        <motion.div 
           initial={{ x: "-100%" }}
           whileInView={{ x: "100%" }}
           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
           className="w-full h-full bg-[#57C2FF]"
        />
      </div>

      <div className={`w-full lg:w-[45%] group perspective-1000`}>
        <div className={`relative p-[1px] rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-white/20 to-transparent transition-all duration-500 group-hover:from-[#57C2FF]/50`}>
          {/* Card Body */}
          <div className="relative bg-[#061a47]/80 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 h-full overflow-hidden">
            {/* Hover Glow Effect */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 blur-[60px] transition-opacity duration-700 pointer-events-none`} />
            
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#57C2FF] font-poppins text-xs font-bold uppercase tracking-widest mb-6">
              Core Service {service.id.toString().padStart(2, '0')}
            </span>

            <h3 className="text-2xl md:text-3xl font-poppins font-bold text-white mb-6 group-hover:text-[#57C2FF] transition-colors duration-300 leading-tight">
              {service.title}
            </h3>

            <p className="text-gray-400 font-poppins text-sm md:text-base leading-relaxed mb-8 group-hover:text-gray-200 transition-colors duration-300">
              {service.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#57C2FF] animate-pulse" />
                <span className="text-xs font-poppins font-semibold text-white/50 tracking-wider">
                  {service.stats}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#57C2FF]/50 group-hover:bg-[#57C2FF]/10 transition-all duration-300">
                <svg className="w-4 h-4 text-[#57C2FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EnterpriseCapabilities = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-40 bg-[#06153d] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-[#57C2FF]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-[#7000FF]/5 rounded-full blur-[150px] animate-pulse" />
        
        {/* Helix Pattern Background */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2357C2FF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24 md:mb-40">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-poppins font-bold text-white mb-8"
          >
            Tailored Solutions for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#57C2FF] to-[#00E5FF]">
              Enterprise Excellence
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-poppins text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            At Global Web Production, we understand that enterprise-level organizations face unique challenges. 
            Our Enterprise Services are specifically crafted to provide bespoke solutions that align with your company’s vision.
          </motion.p>
        </div>

        {/* The Helix (Vertical Spine) */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 hidden lg:block">
            <motion.div 
               style={{ scaleY: lineHeight }}
               className="w-full h-full bg-gradient-to-b from-[#57C2FF] via-[#00E5FF] to-transparent origin-top"
            />
          </div>

          {/* Cards */}
          <div className="flex flex-col">
            {serviceData.map((service, index) => (
              <HelixCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseCapabilities;
