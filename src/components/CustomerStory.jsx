import React, { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const CustomerStory = () => {
    const [isHovered, setIsHovered] = useState(false);

    const { scrollYProgress } = useScroll({
        offset: ["start end", "end start"],
    });

    // Scroll transformations
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 1.2]);
    const textRevealY = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);
    const opacityReveal = useTransform(scrollYProgress, [0.3, 0.4], [0.1, 1]);

    // Architectural geometric paths for the portal reveal
    const initialPath = "polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%)";
    const hoverPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%, 100% 100%, 0 100%, 0 0, 0 0)";

    return (
        <section className="relative w-full min-h-[80vh] bg-[#030b1f] flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 lg:px-12 overflow-hidden font-poppins">
            
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                
                {/* Left Side: Image Portal (Option 3 Layout) */}
                <div 
                    className="lg:col-span-7 relative group cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* The Portal Mask */}
                    <motion.div
                        initial={false}
                        animate={{ 
                            clipPath: isHovered ? hoverPath : initialPath,
                            borderRadius: isHovered ? "1.5rem" : "4rem"
                        }}
                        transition={{ 
                            duration: 1.2, 
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative w-full aspect-video sm:aspect-[4/3] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
                    >
                        <motion.img
                            style={{ scale: imageScale }}
                            src="/home/customerstories.jpg"
                            alt="AEM Migration"
                            className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000"
                            loading="lazy"
                            decoding="async"
                        />
                    </motion.div>
                </div>

                {/* Right Side: Clean Content (Exact Font Properties) */}
                <div className="lg:col-span-5 flex flex-col gap-8 justify-center">
                    <motion.div style={{ y: textRevealY, opacity: opacityReveal }} className="flex flex-col gap-5 text-white">
                        
                        {/* Category */}
                        <p className="text-[#57C2FF] font-semibold text-md tracking-wide">
                            Customer stories
                        </p>

                        {/* Heading */}
                        <h2 className="text-white font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight">
                            From Legacy to Leading Edge: How We Moved a fortune 50 Tech Giant to AEM Cloud Without Missing a Beat
                            <span className="text-[#3b9fd6]">.</span>
                        </h2>

                        {/* Paragraph */}
                        <p className="text-gray-300 text-base leading-relaxed">
                            Global Web Production’s experts partnered with a Fortune 50 Client’s web operations team to successfully migrate their digital ecosystem to Adobe Experience Cloud. Discover how we enabled tailored functionality, accelerated content updates, and delivered exceptional customer experiences at scale.
                        </p>

                        {/* Button */}
                        <div className="pt-2">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="rounded-4xl text-white px-4 py-2 border-2 border-[#EAF3F9] font-poppins transition-all duration-300 text-[17px] font-medium hover:bg-[#EAF3F9] hover:text-[#2E3133] w-fit"
                            >
                                Read the story
                            </motion.button>
                        </div>

                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default CustomerStory;
