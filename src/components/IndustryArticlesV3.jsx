import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const IndustryArticlesV3 = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((prev) => prev + 1);
  const handlePrev = () => setIndex((prev) => prev - 1);

  const activeIndex = wrap(0, articles.length, index);

  return (
    <section className="relative w-full py-24 bg-[#000e34] overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#4bb5f8]/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 text-center mb-16 px-6">
        <h1 className="text-3xl md:text-4xl text-white font-bold mb-6">
          INDUSTRY ARTICLES (V3: Infinite Stack)
        </h1>
        <Link to="/blogs">
          <button className="text-[#4bb5f8] border p-3 rounded-3xl border-[#4bb5f8] hover:bg-[#4bb5f8] hover:text-white transition-all px-8 text-sm font-medium">
            View All Articles
          </button>
        </Link>
      </div>

      <div className="relative w-full max-w-[500px] h-[600px] flex items-center justify-center perspective-[1000px]">
        <AnimatePresence initial={false}>
          {[-2, -1, 0, 1, 2].map((offset) => {
            const itemIndex = wrap(0, articles.length, index + offset);
            const article = articles[itemIndex];
            const isCenter = offset === 0;

            return (
              <motion.div
                key={`${itemIndex}-${offset}`}
                initial={{ opacity: 0, x: offset * 300, scale: 0.8, rotateY: offset * 45, z: -Math.abs(offset) * 100 }}
                animate={{
                  opacity: 1 - Math.abs(offset) * 0.3,
                  x: offset * 180,
                  scale: isCenter ? 1 : 0.8,
                  rotateY: offset * -25,
                  z: isCenter ? 0 : -200,
                  zIndex: 10 - Math.abs(offset),
                }}
                exit={{ opacity: 0, scale: 0.5, x: offset < 0 ? -400 : 400 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute w-[320px] md:w-[400px] h-[520px] cursor-pointer"
                onClick={() => {
                   if (offset !== 0) setIndex(index + offset);
                }}
              >
                <div className="w-full h-full bg-[#062055] rounded-[40px] shadow-2xl overflow-hidden border border-white/5 flex flex-col">
                  <div className="relative h-[45%] overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#062055] via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-8 flex-grow flex flex-col text-white">
                    <h2 className="text-lg md:text-xl lg:text-[20px] text-center font-bold leading-tight mb-4">
                      {article.title}
                    </h2>
                    <p className="text-sm md:text-base lg:text-md text-left text-white/50 line-clamp-3">
                      {article.desc}
                    </p>
                    <div className="flex justify-center mt-auto">
                      <Link to={article.link}>
                        <button className="text-blue-400 uppercase text-xs font-bold py-2 px-6 rounded-md hover:underline">
                          CONTINUE READING
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-12 flex gap-10 z-20">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-[#4bb5f8] text-[#4bb5f8] flex items-center justify-center hover:bg-[#4bb5f8] hover:text-white transition-all text-2xl"
        >
          ❮
        </button>
        <button 
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-[#4bb5f8] text-[#4bb5f8] flex items-center justify-center hover:bg-[#4bb5f8] hover:text-white transition-all text-2xl"
        >
          ❯
        </button>
      </div>
    </section>
  );
};

export default IndustryArticlesV3;
