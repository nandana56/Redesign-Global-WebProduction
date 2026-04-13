import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutOverview = () => {
    const containerRef = useRef(null);
    const overviewTextRef = useRef(null);
    const missionContainerRef = useRef(null);
    const missionImageRef = useRef(null);
    const missionTextRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Overview Text Fade & Slide Up
            gsap.fromTo(overviewTextRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: overviewTextRef.current,
                        start: "top 80%",
                    }
                }
            );

            // 2. The Apple-Style Pinned Reveal for Mission Section
            // Pin the mission container while the image and text slide in from the sides

            // Initial states (off-screen)
            gsap.set(missionImageRef.current, { xPercent: -100, opacity: 0 });
            gsap.set(missionTextRef.current, { xPercent: 100, opacity: 0 });

            // Create a timeline that is scrubbed with the scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 20%",    // Start slightly later to avoid sudden jump
                    end: "+=120%",       
                    scrub: 1,            // Smooth scrubbing
                    pin: true,           // Pin the container in place
                    pinSpacing: true,
                }
            });

            // Animate both elements sliding to their neutral (center) positions simultaneously
            tl.to(missionImageRef.current, { xPercent: 0, opacity: 1, ease: "none", duration: 1 }, 0)
                .to(missionTextRef.current, { xPercent: 0, opacity: 1, ease: "none", duration: 1 }, 0);


        }, containerRef); // Scope to the outermost container

        return () => ctx.revert(); // Cleanup on unmount
    }, []);

    return (
        <div ref={containerRef} className="bg-[url(/About/digital_transformation_era_en_top_img.jpg)] bg-cover bg-center bg-no-repeat overflow-hidden relative z-10 w-full min-h-screen">
            
            {/* Adding a dark overlay to make text pop against the background */}
            <div className="absolute inset-0 bg-[#000044]/80 z-0"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">

                {/* --- OVERVIEW SECTION --- */}
                <div ref={overviewTextRef} className="flex flex-col items-center justify-center pt-0 px-4 mb-0">
                    <h2 className="text-[#57C2FF] text-3xl sm:text-5xl md:text-4xl font-poppins font-bold text-center mb-2">
                        Overview
                    </h2>
                    <p className="text-white text-sm sm:text-base text-center max-w-5xl leading-relaxed">
                        We are a digital technology company based in Temecula, California. We specialize in web technologies and platforms with an emphasis on strategy and measurement. Global Web Production was founded by ex-Microsoft manager Byron Prather. Click the tabs below for more information on our vision, mission and purpose. Contact us to discuss your digital technology needs.
                    </p>
                </div>

                {/* --- MISSION SECTION (PINNED REVEAL) --- */}
                <div ref={missionContainerRef} className="flex items-center justify-center pb-20 mt-20">
                    <div className="flex flex-col md:flex-row items-stretch justify-center w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl shadow-cyan-900/20">

                        {/* Image Side (Sliding from Left) */}
                        <div ref={missionImageRef} className="w-full md:w-1/2 relative h-[300px] sm:h-[400px] md:h-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#000026]/90 md:to-[#000026] z-10"></div>
                            <img
                                src="/About/1702059465365.png"
                                alt="Enterprise Solutions Team Meeting"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Text Side (Sliding from Right) */}
                        <div ref={missionTextRef} className="w-full lg:w-1/2 flex flex-col justify-center bg-[#000026] p-8 sm:p-12 pb-6 lg:pb-3 relative z-20">

                            <h2 className="text-[#57C2FF] text-2xl sm:text-3xl lg:text-4xl font-medium mb-3 sm:mb-4 text-left font-poppins">
                                Our Mission
                            </h2>
                            <p className="text-white text-sm sm:text-base leading-relaxed text-left font-poppins">
                                Our mission is to be the strategic partner of choice for businesses seeking to unlock their full digital potential. We provide tailor-made solutions that transcend conventional boundaries, helping our clients succeed in a fast-evolving digital landscape.
                                <br /><br />
                                We empower our clients with tools & expertise to achieve their objectives, drive sustainable growth, and make a positive global impact.
                            </p>

                            {/* Optional: Add a subtle glow behind the text block for a premium feel */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#57C2FF]/5 rounded-full blur-3xl pointer-events-none"></div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutOverview;
