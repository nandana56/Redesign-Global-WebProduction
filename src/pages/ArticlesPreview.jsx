import React from "react";
import IndustryArticlesV1 from "../components/IndustryArticlesV1";
import IndustryArticlesV2 from "../components/IndustryArticlesV2";
import IndustryArticlesV3 from "../components/IndustryArticlesV3";

const ArticlesPreview = () => {
    return (
        <div className="bg-[#000e34]">
            {/* Version 1 */}
            <div className="border-b border-white/10">
                <div className="bg-[#062055] py-4 text-center text-white font-bold tracking-widest text-xs uppercase">
                    Design Option 1: Quantum Carousel (GSAP + Scroll Pinning)
                </div>
                <IndustryArticlesV1 />
            </div>

            {/* Version 2 */}
            <div className="border-b border-white/10">
                <div className="bg-[#062055] py-4 text-center text-white font-bold tracking-widest text-xs uppercase">
                    Design Option 2: 3D Perspective Grid (Framer Motion 3D)
                </div>
                <IndustryArticlesV2 />
            </div>

            {/* Version 3 */}
            <div className="">
                <div className="bg-[#062055] py-4 text-center text-white font-bold tracking-widest text-xs uppercase">
                    Design Option 3: Infinite Loop Stack (Interactive Deck)
                </div>
                <IndustryArticlesV3 />
            </div>
            
            <div className="py-20 text-center">
                <p className="text-white/40 text-sm mb-4">Please scroll through and interact with each version.</p>
                <div className="flex justify-center gap-4">
                     <button className="bg-[#4bb5f8] text-white px-8 py-3 rounded-full font-bold">I like Option 1</button>
                     <button className="bg-[#4bb5f8] text-white px-8 py-3 rounded-full font-bold">I like Option 2</button>
                     <button className="bg-[#4bb5f8] text-white px-8 py-3 rounded-full font-bold">I like Option 3</button>
                </div>
            </div>
        </div>
    );
};

export default ArticlesPreview;
