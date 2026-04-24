import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const articles = [
  {
    id: "AIAgentCaseStudy",
    title: "Transforming U.S. Real Estate with an AI Chatbot Agent",
    desc: "A mid-sized real estate firm based in the U.S. wanted to modernize their client interaction model to meet the growing expectations of digital-first home buyers....",
    image: "/images/Real-Estate.webp",
    tag: "Case Study",
    link: "/blogs/AIAgentCaseStudy",
  },
  {
    id: "AIWebOptimizer",
    title: "AI-Powered Web Content Optimizer: Enhancing UX",
    desc: "Creating optimized content that resonates with audiences while meeting technical requirements has become increasingly complex...",
    image: "/images/aiblog-.webp",
    tag: "AI & Tech",
    link: "/blogs/WebContentOptimization",
  },
  {
    id: "WebsitePerformance",
    title: "The Importance of Website Performance",
    desc: "Website optimization, also known as page load time (PLT), is crucial for user experience and SEO rankings...",
    image: "/images/Industry-Articles-Card-1.webp",
    tag: "Performance",
    link: "/blogs/WebsitePerformance",
  },
  {
    id: "SwDevelopmentLifecycle",
    title: "The Basics of the Software Development Lifecycle",
    desc: "The Software Development Lifecycle (SDLC) is essential for structured and efficient software creation.",
    image: "/images/Industry-Articles-Card-2.webp",
    tag: "Engineering",
    link: "/blogs/3",
  },
  {
    id: "TopWebDevelopment",
    title: "Top Web Development Programs",
    desc: "In today's digital age, web development is a dynamic field that has seen exponential growth across businesses and individuals alike.",
    image: "/images/Industry-Articles-Card-3.webp",
    tag: "Web Dev",
    link: "/blogs/4",
  }
];

const TiltCard = ({ article }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

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
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-[550px] w-full max-w-[400px] rounded-[40px] bg-[#062055] border border-white/5 cursor-pointer group"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 rounded-[30px] bg-[#000e34]/80 shadow-lg flex flex-col overflow-hidden"
      >
        <div className="relative h-[220px] overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000e34] via-transparent to-transparent opacity-80" />
          <div className="absolute top-4 left-4">
             <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase text-white bg-[#4bb5f8]/80 backdrop-blur-sm">
                {article.tag}
              </span>
          </div>
        </div>

        <div className="p-6 flex-grow flex flex-col text-white">
          <h2 className="text-lg md:text-xl lg:text-[20px] text-center font-bold leading-tight mb-4 group-hover:text-[#4bb5f8] transition-colors">
            {article.title}
          </h2>
          <p className="text-sm md:text-base lg:text-md text-left text-white/60 line-clamp-4 flex-grow">
            {article.desc}
          </p>
          <div className="flex justify-center mt-4">
            <Link to={article.link}>
              <button className="text-blue-400 uppercase text-xs font-bold py-2 px-6 rounded-md hover:underline transition-all">
                CONTINUE READING
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Outer Glow on hover */}
      <div className="absolute inset-[-2px] rounded-[42px] bg-gradient-to-br from-[#4bb5f8]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </motion.div>
  );
};

const IndustryArticlesV2 = () => {
  return (
    <section className="relative w-full py-24 bg-[#000e34] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#4bb5f8]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#4bb5f8]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl text-white font-bold mb-6">
            INDUSTRY ARTICLES (V2: 3D Perspective)
          </h1>
          <Link to="/blogs">
            <button className="text-[#4bb5f8] border p-3 rounded-3xl border-[#4bb5f8] hover:bg-[#4bb5f8] hover:text-white transition-all px-8 text-sm font-medium">
              View All Articles
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
          {articles.map((article) => (
            <TiltCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryArticlesV2;
