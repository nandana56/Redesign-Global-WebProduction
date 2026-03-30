import React, { useRef, useMemo, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Liquid Background Component
const LiquidMesh = () => {
    const meshRef = useRef();
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color('#0f172a') }, // Slate 900
            uColor2: { value: new THREE.Color('#1e3a8a') }, // Blue 900
            uColor3: { value: new THREE.Color('#3b82f6') }  // Blue 500
        }),
        []
    );

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime * 0.4;
        }
    });

    const fragmentShader = `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec2 vUv;

        // Classic Perlin 2D Noise 
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

        float cnoise(vec2 P){
            vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
            vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
            Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
            vec4 ix = Pi.xzxz;
            vec4 iy = Pi.yyww;
            vec4 fx = Pf.xzxz;
            vec4 fy = Pf.yyww;
            vec4 i = permute(permute(ix) + iy);
            vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
            vec4 gy = abs(gx) - 0.5;
            vec4 tx = floor(gx + 0.5);
            gx = gx - tx;
            vec2 g00 = vec2(gx.x,gy.x);
            vec2 g10 = vec2(gx.y,gy.y);
            vec2 g01 = vec2(gx.z,gy.z);
            vec2 g11 = vec2(gx.w,gy.w);
            vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
            g00 *= norm.x;
            g01 *= norm.y;
            g10 *= norm.z;
            g11 *= norm.w;
            float n00 = dot(g00, vec2(fx.x, fy.x));
            float n10 = dot(g10, vec2(fx.y, fy.y));
            float n01 = dot(g01, vec2(fx.z, fy.z));
            float n11 = dot(g11, vec2(fx.w, fy.w));
            vec2 fade_xy = fade(Pf.xy);
            vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
            float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
            return 2.3 * n_xy;
        }

        void main() {
            vec2 p = vUv * 3.0;
            float noise = cnoise(p + uTime * 0.5);
            
            // Layering noise for a liquid effect
            float n2 = cnoise(p * 2.0 - uTime * 0.3);
            noise = noise * 0.5 + n2 * 0.5;

            float mix1 = smoothstep(-1.0, 0.5, noise);
            float mix2 = smoothstep(0.0, 1.0, noise);

            vec3 color = mix(uColor1, uColor2, mix1);
            color = mix(color, uColor3, mix2 * 0.7);

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

const ImpactSection3D = () => {
    // Mouse tracking for magnetic effect on title
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const titleRotateX = useTransform(springY, [-1, 1], [10, -10]);
    const titleRotateY = useTransform(springX, [-1, 1], [-10, 10]);
    const cardTranslateX = useTransform(springX, [-1, 1], [-5, 5]);
    const cardTranslateY = useTransform(springY, [-1, 1], [-5, 5]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 2 - 1;
        const y = (e.clientY - rect.top) / rect.height * 2 - 1;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Stagger text animation logic
    const text = "We believe there's room for everyone at Global Web Production Company. We are all different, and each of us brings something unique that helps build the community spirit that drives our success. We celebrate diversity, we aim to always be inclusive, and we know this is a journey that constantly evolves. That's why we keep learning—through workshops, webinars, and events we organize with support from our (internal) communities and external partners. After all, we are creators, collaborators, and life-long learners.";
    const words = text.split(" ");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.2,
            }
        }
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section 
            className="relative w-full min-h-screen py-24 flex items-center justify-center overflow-hidden bg-[#0f172a]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* 3D Liquid Canvas Background */}
            <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <LiquidMesh />
                </Canvas>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]/50" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
                
                {/* Magnetic 3D Title */}
                <motion.div
                    style={{
                        rotateX: titleRotateX,
                        rotateY: titleRotateY,
                        perspective: 1000
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-12 cursor-default"
                >
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-200 to-blue-500 leading-tight font-poppins text-center drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                        Be You.<br className="sm:hidden" /> Make an Impact
                    </h2>
                </motion.div>

                {/* Floating Glassmorphism Paragraph Container */}
                <motion.div
                    style={{
                        x: cardTranslateX,
                        y: cardTranslateY,
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-4xl p-8 sm:p-12 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group"
                >
                    {/* Subtle animated gradient glow behind text card */}
                    <div className="absolute -inset-[100%] bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-spin-slow pointer-events-none blur-3xl rounded-full" />
                    
                    <motion.p
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="text-lg sm:text-xl md:text-2xl text-blue-50 leading-relaxed font-poppins text-center font-light relative z-10"
                    >
                        {words.map((word, index) => (
                            <motion.span
                                key={index}
                                variants={wordVariants}
                                className="inline-block mr-[0.3em] font-medium"
                                // Highlight specific key phrases by making them brighter
                                style={{
                                    color: ["success.", "diversity,", "creators,", "collaborators,", "impact"].some((kw) => word.toLowerCase().includes(kw))
                                        ? "#60a5fa" // Highlighting in a bright blue
                                        : "inherit",
                                    fontWeight: ["success.", "diversity,", "creators,", "collaborators,"].some((kw) => word.toLowerCase().includes(kw))
                                        ? "700"
                                        : "inherit"
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.p>
                </motion.div>
                
            </div>
            
            {/* Ambient Lighting Accents */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
};

export default ImpactSection3D;
