import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    id: "AIAgentCaseStudy",
    title: "Transforming U.S. Real Estate",
    desc: "A mid-sized real estate firm based in the U.S. wanted to modernize their client interaction model to meet the growing expectations of digital-first home buyers. We developed an Agentic AI solution that streamlines lead qualification and engagement.",
    image: "/images/Real-Estate.webp",
    tag: "Case Study",
    link: "/blogs/AIAgentCaseStudy",
    color: "#52b8f4"
  },
  {
    id: "AIWebOptimizer",
    title: "AI-Powered Web Content Optimizer",
    desc: "Creating optimized content that resonates with audiences while meeting technical requirements has become increasingly complex. Our AI tool simplifies this process with real-time feedback.",
    image: "/images/aiblog-.webp",
    tag: "AI & Tech",
    link: "/blogs/WebContentOptimization",
    color: "#a855f7"
  },
  {
    id: "WebsitePerformance",
    title: "Importance of Web Performance",
    desc: "Crucial for user experience and SEO rankings. We analyze core vitals and implement advanced caching and rendering strategies to ensure lightning-fast speeds.",
    image: "/images/Industry-Articles-Card-1.webp",
    tag: "Performance",
    link: "/blogs/WebsitePerformance",
    color: "#ec4899"
  },
  {
    id: "SwDevelopmentLifecycle",
    title: "The Basics of SDLC",
    desc: "Structured and efficient software creation methodologies decoded for modern engineering teams. From agile to devops workflows.",
    image: "/images/Industry-Articles-Card-2.webp",
    tag: "Engineering",
    link: "/blogs/3",
    color: "#10b981"
  },
  {
    id: "TopWebDevelopment",
    title: "Modern Web Frameworks 2024",
    desc: "A dynamic field that has seen exponential growth across businesses. We explore the latest trends in React, Next.js, and server-side rendering.",
    image: "/images/Industry-Articles-Card-3.webp",
    tag: "Web Dev",
    link: "/blogs/4",
    color: "#f59e0b"
  }
];

const IndustryArticles = () => {
  const componentRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current;
            const totalCards = cards.length;

            // Initial state for stacking - ALL cards start hidden except the first one
            gsap.set(cards, {
                zIndex: (i) => totalCards - i,
                opacity: 0,
                scale: 0.9,
                y: 50,
            });
            
            // First card should be visible immediately
            gsap.set(cards[0], { opacity: 1, scale: 1, y: 0 });

            // Main Timeline for Stacking Effect
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: componentRef.current,
                    start: "top top",
                    end: `+=${totalCards * 100}%`, // Reduced end distance for better control
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    anticipatePin: 1,
                }
            });

            cards.forEach((card, i) => {
                if (i < totalCards - 1) {
                    // Current card fades and moves up
                    tl.to(card, {
                        y: "-100%",
                        opacity: 0,
                        scale: 0.8,
                        duration: 1,
                        ease: "power2.inOut"
                    }, i);
                    
                    // Next card fades and moves in
                    tl.fromTo(cards[i + 1], 
                        { opacity: 0, scale: 0.9, y: 100 },
                        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" },
                        i
                    );
                }
            });

            // Header entrance animation
            gsap.from(".articles-header", {
                scrollTrigger: {
                    trigger: ".articles-header",
                    start: "top 90%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

        }, componentRef);

        return () => ctx.revert();
    }, []);

  return (
    <section ref={componentRef} className="relative w-full bg-[#030712] overflow-hidden pt-32">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="articles-header text-center pt-20 pb-10 px-6 max-w-4xl mx-auto relative z-10">
        <h3 className="text-4xl md:text-6xl font-bold text-white font-poppins relative z-10">
          INDUSTRY <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">ARTICLES</span>
        </h3>
      </div>

      <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center py-20 px-6 relative z-10">

        <div className="relative w-full max-w-6xl h-[550px] sm:h-[600px] md:h-[650px]">
          {articles.map((article, index) => (
            <div
              key={article.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Link
                to={article.link}
                className="group relative w-full h-full bg-[#062055] border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:border-blue-500/30 transition-colors duration-500"
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-2/5 md:h-full relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r md:bg-gradient-to-t from-[#062055] via-transparent to-transparent" />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 h-3/5 md:h-full p-6 sm:p-8 md:p-16 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 font-poppins leading-tight group-hover:text-blue-400 transition-colors duration-300">
                    {article.title}
                  </h3>

                  <p className="text-gray-300 text-sm md:text-base font-poppins line-clamp-4 md:line-clamp-none mb-8 opacity-90 leading-relaxed">
                    {article.desc}
                  </p>

                  <div className="flex items-center gap-4 text-blue-400 text-xs font-bold uppercase tracking-[0.3em] group/btn">
                    EXPLORE_ARCHIVE
                    <div className="w-8 h-8 rounded-full border border-blue-400/20 flex items-center justify-center group-hover/btn:bg-blue-500 group-hover/btn:border-blue-500 group-hover/btn:text-white transition-all duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>


              </Link>
            </div>
          ))}
        </div>

        {/* Scroll Hint */}
        <div className="mt-16 flex flex-col items-center gap-4 opacity-50">
          <span className="text-[10px] font-mono tracking-widest text-white uppercase italic">Scroll to navigate repository</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default IndustryArticles;
