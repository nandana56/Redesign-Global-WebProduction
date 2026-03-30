import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const IndustryArticlesV1 = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(".article-card-v1");
      
      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (slides.length - 1),
          start: "top top",
          end: () => `+=${sliderRef.current.offsetWidth}`,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#000e34] overflow-hidden flex flex-col justify-center">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#4bb5f8]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#4bb5f8]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 mb-10 text-center">
        <h1 className="text-3xl md:text-4xl text-white font-bold mb-6">
          INDUSTRY ARTICLES (V1: Quantum Carousel)
        </h1>
        <Link to="/blogs">
          <button className="text-[#4bb5f8] border p-3 rounded-3xl border-[#4bb5f8] hover:bg-[#4bb5f8] hover:text-white transition-all px-8 text-sm font-medium">
            View All Articles
          </button>
        </Link>
      </div>

      <div ref={sliderRef} className="flex flex-nowrap gap-8 px-12 md:px-24">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className="article-card-v1 flex-shrink-0 w-[85vw] md:w-[400px] h-[550px]"
          >
            <div className="bg-[#062055] rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-full border border-white/5 group hover:border-[#4bb5f8]/50 transition-colors duration-500">
              {/* Image Section */}
              <div className="relative h-[280px] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062055] via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase text-white bg-[#4bb5f8]/80 backdrop-blur-md">
                    {article.tag}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex-grow flex flex-col text-white">
                <div className="h-20 mb-4 flex items-start">
                  <h2 className="text-lg md:text-xl lg:text-[20px] text-center font-bold leading-tight w-full">
                    {article.title}
                  </h2>
                </div>
                <p className="text-sm md:text-base lg:text-md text-left text-white/70 line-clamp-4 flex-grow">
                  {article.desc}
                </p>

                <div className="flex justify-center mt-6">
                  <Link to={article.link} className="w-full text-center">
                    <button className="text-blue-400 uppercase text-xs font-bold py-2 px-6 rounded-md transition-all hover:underline">
                      CONTINUE READING
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GSAP Progress Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-none">
        {articles.map((_, i) => (
          <div key={i} className="h-1 w-8 bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-[#4bb5f8] origin-left scale-x-0" id={`dot-${i}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default IndustryArticlesV1;
