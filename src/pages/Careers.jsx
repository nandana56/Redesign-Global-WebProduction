import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { content } from '../content_data';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CareerSignpost3D from '../components/CareerSignpost3D';
import ImpactSectionOption3 from '../components/ImpactSectionOption3';
import JobsHolographicStack from '../components/JobsHolographicStack';
import WebGLDisposer from '../components/WebGLDisposer';

const JOBS_DATA = [
    { title: "Technical Project Manager - AEM Lead", location: "Trivandrum, Kerala", type: "Remote" },
    { title: "WordPress Developer", location: "Trivandrum, Kerala", type: "Hybrid" },
    { title: "UI/UX Designer", location: "Trivandrum, Kerala", type: "Hybrid" },
    { title: "HR Executive", location: "Trivandrum, Kerala", type: "Onsite" },
    { title: "Development QA Intern", location: "Trivandrum, Kerala", type: "Internship" },
    { title: "Full Stack Developer (MERN) Intern", location: "Trivandrum, Kerala", type: "Internship" },
    { title: "HR Associate Intern", location: "Trivandrum, Kerala", type: "Internship" },
    { title: "WordPress Developer Intern", location: "Trivandrum, Kerala", type: "Internship" },
    { title: "Full Stack Developer (AEM) Intern", location: "Trivandrum, Kerala", type: "Internship" },
    { title: "Data Science Associate Intern", location: "Trivandrum, Kerala", type: "Internship" },
    { title: "Digital Marketing Associate Intern", location: "Trivandrum, Kerala", type: "Internship" },
    { title: "Operations Executive Intern", location: "Trivandrum, Kerala", type: "Internship" },
];



gsap.registerPlugin(ScrollTrigger);

const LiquidBackground = () => {
    const meshRef = useRef();
    const mouse = useRef(new THREE.Vector2(0, 0));

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor1: { value: new THREE.Color("#020617") },
        uColor2: { value: new THREE.Color("#1e3a8a") },
        uColor3: { value: new THREE.Color("#57c2ff") }
    }), []);

    useFrame((state) => {
        const { clock, mouse: stateMouse } = state;
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = clock.elapsedTime;
            // Smoothly interpolate mouse position
            mouse.current.lerp(stateMouse, 0.1);
            meshRef.current.material.uniforms.uMouse.value.copy(mouse.current);
        }
    });

    const fragmentShader = `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec2 vUv;

        void main() {
            vec2 p = vUv * 2.0 - 1.0;
            float t = uTime * 0.5;
            
            // Stronger liquid motion and mouse reaction
            float dist = length(vUv * 2.0 - 1.0 - uMouse);
            float force = 0.5 / (dist + 0.3);
            
            for(float i = 1.0; i < 4.0; i++) {
                p.x += 0.3 / i * sin(i * 3.0 * p.y + t + uMouse.x * 3.0);
                p.y += 0.3 / i * cos(i * 3.0 * p.x + t + uMouse.y * 3.0);
            }
            
            // Mouse "push" distortion
            p += (vUv * 2.0 - 1.0 - uMouse) * force * 0.1;
            
            float noise = 0.5 + 0.5 * sin(p.x + p.y + t);
            vec3 color = mix(uColor1, uColor2, noise);
            color = mix(color, uColor3, length(p) * 0.2);
            
            // Interactive glow
            color += uColor3 * (0.15 / (dist + 0.4)) * 0.8;

            gl_FragColor = vec4(color, 1.0);
        }
    `;

    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[20, 10]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </mesh>
    );
};

const FutureOfWebProduction = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const imageContainerRef = useRef(null);

    useEffect(() => {
        const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

        let ctx = gsap.context(() => {
            if (!isTouch) {
                // Pin the entire section ONLY on non-touch devices
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=600",
                    pin: true,
                    anticipatePin: 1,
                });
            }

            // Text staggered animation
            const textElements = gsap.utils.toArray('.future-text-reveal');
            
            // Initial state for text
            gsap.set(textElements, { opacity: 0, y: 50 });

            // Animate text as user scrolls
            gsap.to(textElements, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: isTouch ? "top 80%" : "top top",
                    end: isTouch ? "bottom 20%" : "+=600",
                    scrub: isTouch ? false : 0.3,
                    toggleActions: isTouch ? "play none none reverse" : undefined
                },
                y: 0,
                opacity: 1,
                stagger: 0.1,
                ease: "power2.out",
                duration: isTouch ? 0.8 : undefined
            });
            
            // Image subtle zoom parallax
            if (!isTouch) {
                gsap.fromTo('.future-image', 
                    { scale: 1 }, 
                    {
                        scale: 1.15,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top top",
                            end: "+=600",
                            scrub: true,
                        }
                    }
                );
            }

        }, containerRef);
        
        return () => ctx.revert(); // Cleanup on unmount
    }, []);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen lg:h-screen bg-slate-50 overflow-hidden flex items-center pt-24 pb-24">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#57c2ff]/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 w-full h-full flex flex-col lg:flex-row items-center gap-12 relative z-10">
                {/* Left Side: Text Details */}
                <div ref={textRef} className="w-full lg:w-1/2 h-full flex flex-col justify-center space-y-8">
                    <div className="future-text-reveal">
                        <h2 className="uppercase text-xs sm:text-sm md:text-base font-bold text-[#0ea5e9] tracking-widest border-b-2 border-[#0ea5e9]/30 w-max pb-2 mb-2">
                            The Future of Web Production
                        </h2>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 mb-2 font-poppins">
                            Since 2022,
                        </h2>
                    </div>

                    <div className="space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                        <p className="future-text-reveal">
                            Global Web Production Company has been a home for creators, builders, and innovators. We've reimagined what digital experiences can look like—and we're just getting started.
                        </p>
                        <p className="future-text-reveal">
                            Whether you're coding the next big platform, designing stunning interfaces, or managing projects, you'll be part of a team that's shaping the future of the web for businesses worldwide. With every line of code and every pixel, you'll help create experiences that connect, inspire, and drive results.
                        </p>
                        <p className="future-text-reveal">
                            We move fast, dream big, and put passion into everything we do. You'll find a team that's talented, quirky, driven, and endlessly creative — and we think you'll fit right in.
                        </p>
                        <p className="future-text-reveal text-slate-800 font-semibold text-xl italic mt-6 border-l-4 border-[#0ea5e9] pl-5 py-1">
                            "Come build the future of digital with us."
                        </p>
                    </div>
                </div>

                {/* Right Side: Image Parallax */}
                <div ref={imageContainerRef} className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 relative">
                    <div className="w-full aspect-[4/5] lg:aspect-square relative rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-white">
                        <img 
                            src="/career/webproduction.jpg" 
                            alt="Web Production" 
                            className="future-image absolute inset-0 w-full h-full object-cover origin-center"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const Careers = () => {
    const { career } = content;
    const sectionRef = useRef(null);

    // Mouse Tracking for Parallax (Section 2)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 120 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const textTranslateX = useTransform(springX, [-0.5, 0.5], [-35, 35]);
    const textTranslateY = useTransform(springY, [-0.5, 0.5], [-25, 25]);

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;
        if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };


    return (
        <main className="flex-grow w-full">
            <div className="relative min-h-screen bg-[#020617]">
                <section className="relative pt-20 pb-10 overflow-hidden">
                    {/* Hero Section Background */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/career/career.jpg"
                            alt="Career Hero Background"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-4 sm:space-y-6 text-center transition-all duration-700">
                                <h3 className="text-lg sm:text-xl md:text-3xl font-semibold text-white font-poppins drop-shadow-2xl">
                                    Be a part of Global Web Production
                                </h3>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight font-poppins text-white drop-shadow-lg max-w-4xl mx-auto"
                                >
                                    Be Part of Something Greater
                                </motion.h1>
                            </div>
                            <div className="relative h-[350px] sm:h-[450px] md:h-[500px] flex items-center justify-center">
                                <div className="absolute inset-0 bg-[#57c2ff]/5 blur-[100px] rounded-full pointer-events-none"></div>
                                <CareerSignpost3D />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Interactive Kinetic Section with Magnetic Parallax */}
                <section 
                    ref={sectionRef}
                    onMouseMove={handleMouseMove}
                    className="relative z-10 py-28 overflow-hidden min-h-[70vh] flex items-center bg-[#020617] group/section"
                >
                    <div className="absolute inset-0 z-0">
                        <Suspense fallback={null}>
                            <Canvas camera={{ position: [0, 0, 5] }} gl={{ powerPreference: 'low-power' }}>
                                <WebGLDisposer />
                                <LiquidBackground />
                            </Canvas>
                        </Suspense>
                    </div>
                    
                    <motion.div 
                        style={{ x: textTranslateX, y: textTranslateY }}
                        className="max-w-7xl mx-auto px-6 relative z-10 w-full"
                    >
                        <div className="flex flex-col gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight font-poppins">
                                    We Create the Future Together
                                </h2>
                            </motion.div>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="max-w-4xl"
                            >
                                <p className="text-lg text-white font-poppins font-medium leading-relaxed mt-4">
                                    At Global Web Production Company, we&apos;re more than a digital solutions provider — we&apos;re a vibrant community of innovators, creators, and trailblazers. In our dynamic, collaborative spaces, we bring together passionate minds from around the world to design, build, and inspire. Join us and be part of a global movement where ideas thrive, careers take flight, and bold thinking leads the way.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* Section 3: Future of Web Production (Pinned GSAP) */}
                <FutureOfWebProduction />

                {/* Section 4: 3D Impact Section */}
                <ImpactSectionOption3 />

                {/* Section 5: Jobs Header */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="py-12 px-4 sm:px-8 bg-gradient-to-b from-[#0A1A40] to-[#071433]"
                >
                    <div className="flex flex-col items-center justify-center text-center max-w-7xl mx-auto px-4 py-4">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
                            Jobs
                        </h1>
                        <p className="text-lg text-gray-300 max-w-4xl mx-auto font-poppins">
                            Working at Global Web Production Company is all about professional challenges, personal growth, career development, and having fun. What makes working here different? We truly care about our people.
                        </p>
                    </div>
                </motion.section>

                <JobsHolographicStack jobs={JOBS_DATA} />

            </div>
        </main>
    );
};

export default Careers;