import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImpactSectionOption2 = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRefs = useRef([]);
    textRefs.current = [];

    const addToRefs = (el) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            
            // Pin the entire section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2000", // The amount of scroll distance for the entire animation sequence
                    pin: true,
                    scrub: 1, // Smooth scrubbing
                    anticipatePin: 1,
                }
            });

            // 1. Title dramatically scales down and moves up
            tl.fromTo(titleRef.current,
                { 
                    scale: 4, 
                    opacity: 0,
                    y: "50vh" // Start in center
                },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 2,
                    ease: "power3.out"
                }
            );

            // 2. Paragraph sentences reveal sequentially
            textRefs.current.forEach((textElement, index) => {
                tl.fromTo(textElement,
                    { 
                        opacity: 0.1, 
                        y: 20, 
                        color: "#64748b" // Dimmer slate color
                    },
                    {
                        opacity: 1,
                        y: 0,
                        color: "#f8fafc", // Bright white/slate when highlighted
                        duration: 1,
                        ease: "power2.out",
                        // Make it stay highlighted briefly, then dim again when the next one highlights
                    },
                    ">-=0.5" // Overlap slightly with previous animation
                );
                
                // Dim it back slightly as the next one comes into focus, unless it's the last one
                if(index < textRefs.current.length - 1) {
                    tl.to(textElement, {
                        opacity: 0.3,
                        color: "#94a3b8",
                        duration: 0.8,
                        ease: "power2.inOut"
                    }, ">");
                }
            });
            
            // Keep the final state pinned for a bit before unpinning
            tl.to({}, { duration: 1 });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={sectionRef} 
            className="w-full h-screen bg-[#020617] text-white flex flex-col items-center justify-center overflow-hidden relative"
        >
            {/* Ambient Background Lights */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-slate-400/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="w-full max-w-5xl mx-auto px-6 lg:px-12 flex flex-col items-center space-y-12 z-10">
                
                <div ref={titleRef} className="text-center w-full">
                    <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight font-poppins bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                        Be You.<br/>Make an Impact
                    </h2>
                </div>

                <div className="w-full max-w-4xl text-center font-poppins text-2xl sm:text-3xl md:text-4xl leading-snug space-y-6">
                    <p ref={addToRefs} className="font-light">
                        We believe there's room for <strong className="font-bold text-blue-400">everyone</strong> at Global Web Production Company.
                    </p>
                    <p ref={addToRefs} className="font-light">
                        We are all different, and each of us brings something unique that helps build the <strong className="font-bold text-blue-400">community spirit</strong> that drives our success.
                    </p>
                    <p ref={addToRefs} className="font-light">
                        We celebrate diversity, we aim to always be <strong className="font-bold text-blue-400">inclusive</strong>, and we know this is a journey that constantly evolves.
                    </p>
                    <p ref={addToRefs} className="font-light">
                        That's why we keep learning—through workshops, webinars, and events we organize with support from our internal communities and external partners.
                    </p>
                    <p ref={addToRefs} className="font-light">
                        After all, we are <strong className="font-bold text-blue-400">creators, collaborators, and life-long learners.</strong>
                    </p>
                </div>

            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-pulse">
                <span className="text-xs uppercase tracking-widest mb-2 font-light">Scroll Down</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
            </div>

        </section>
    );
};

export default ImpactSectionOption2;
