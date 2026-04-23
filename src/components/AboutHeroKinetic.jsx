import React, { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const AboutHeroKinetic = () => {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const maskRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial Animation: Heading reveal
            gsap.from(".hero-content-outside", {
                y: 50,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                delay: 0.5
            });

            // 2. Scroll Animation: Mask reveal
            const maskColors = { start: "#000000", end: "#000544" };
            const interpolateColor = gsap.utils.interpolate(maskColors.start, maskColors.end);

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true,
                onUpdate: (self) => {
                    if (maskRef.current) {
                        const p = self.progress;
                        
                        // 1. Update the mask size (Directly tied to progress)
                        // Radius goes from 0.1% to 100%
                        const currentRadius = 0.1 + (p * 99.9);
                        maskRef.current.style.clipPath = `circle(${currentRadius}% at 50% 50%)`;
                        
                        // 2. Update background color based on progress
                        maskRef.current.style.backgroundColor = interpolateColor(p);
                        
                        // 3. Control content opacity inside portal
                        const content = maskRef.current.querySelector('.reveal-content-container');
                        if (content) {
                            // Start fading in content after 10% progress
                            const contentOpacity = p < 0.1 ? 0 : (p - 0.1) * 5;
                            content.style.opacity = Math.min(1, contentOpacity);
                        }

                        // 4. Control outer heading visibility
                        const outsideContent = sectionRef.current.querySelector('.hero-content-outside');
                        if (outsideContent) {
                            // Fade out outer heading immediately on scroll, restore on return
                            const outsideOpacity = 1 - (p * 8); 
                            outsideContent.style.opacity = Math.max(0, outsideOpacity);
                        }
                    }
                }
            });

            // 3. Subtle background parallax
            gsap.to(bgRef.current, {
                y: "10%",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);


    return (
        <section 
            ref={sectionRef}
            className="relative w-full h-[90vh] overflow-hidden bg-black font-poppins"
        >
            {/* BACKGROUND LAYER (Shared) */}
            <div 
                ref={bgRef}
                className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: "url('/About/About-Fourth-Estate.png')" }}
            >
                {/* Navbar Legibility Overlay */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent opacity-80 pointer-events-none" />
            </div>

            {/* LAYER 1: OUTSIDE THE SPOT (Standard Heading) */}
            <div className="hero-content-outside absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white drop-shadow-lg select-none [-webkit-text-stroke:2px_#52b8f4] md:[-webkit-text-stroke:3px_#52b8f4]">
                    Where Technology <br className="hidden md:block" /> Meets Reliability
                </h1>
                <p className="mt-8 text-white text-sm tracking-[0.5em] uppercase font-bold [-webkit-text-stroke:1px_#52b8f4]">
                    Scroll to discover
                </p>
            </div>

            {/* LAYER 2: INSIDE THE SPOT (Revealed Content) */}
            <div 
                ref={maskRef}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 bg-black"
                style={{ clipPath: 'circle(0.1% at 50% 50%)' }}
            >
                <div className="reveal-content-container max-w-4xl mx-auto space-y-12 p-12 opacity-0 transition-opacity duration-300">
                    <span className="text-[#57c2ff] font-bold uppercase tracking-[0.8em] text-sm mb-4 block">
                        Who We Are
                    </span>
                    <p className="text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
                        We are a digital innovation powerhouse specializing in future-proof web ecosystems. 
                        Founded by ex-Microsoft visionaries, we bridge the gap between 
                        high-end technical precision and human-centric design.
                    </p>
                    <div className="pt-8">
                        <Link to="/contact">
                            <button className="px-10 py-4 bg-[#57c2ff] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(87,194,255,0.4)]">
                                Connect with Us
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Cinematic Noise / Grain */}
            
            {/* Corner Decorative Elements */}
            <div className="absolute top-10 left-10 w-24 h-[1px] bg-white/10" />
            <div className="absolute top-10 left-10 w-[1px] h-24 bg-white/10" />
            <div className="absolute bottom-10 right-10 w-24 h-[1px] bg-white/10" />
            <div className="absolute bottom-10 right-10 w-[1px] h-24 bg-white/10" />

            {/* Seamless bottom fade into the next section */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#000044] z-30 pointer-events-none" />
        </section>
    );
};

export default AboutHeroKinetic;
