import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HeroParticleBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 5;

        // Particle configuration
        const count = 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colorPool = [
            new THREE.Color("#57C2FF"),
            new THREE.Color("#0066cc"),
            new THREE.Color("#ffffff")
        ];

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            velocities[i * 3] = (Math.random() - 0.5) * 0.005;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;

            const color = colorPool[Math.floor(Math.random() * colorPool.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.03,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            const positionsArray = geometry.attributes.position.array;
            for (let i = 0; i < count; i++) {
                positionsArray[i * 3] += velocities[i * 3];
                positionsArray[i * 3 + 1] += velocities[i * 3 + 1];
                positionsArray[i * 3 + 2] += velocities[i * 3 + 2];

                if (Math.abs(positionsArray[i * 3]) > 7.5) velocities[i * 3] *= -1;
                if (Math.abs(positionsArray[i * 3 + 1]) > 7.5) velocities[i * 3 + 1] *= -1;
                if (Math.abs(positionsArray[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
            }
            geometry.attributes.position.needsUpdate = true;
            points.rotation.y += 0.0005;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (!container) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};

const ProductCard = ({ title, description, image, buttons, fullWidth = false, index }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 50, scale: 0.95 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, [index]);

    return (
        <div 
            ref={cardRef}
            className={`group relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-[#57C2FF]/30 hover:shadow-[0_0_30px_rgba(87,194,255,0.1)] ${fullWidth ? 'md:col-span-3 h-[500px]' : 'md:col-span-1 h-[450px]'}`}
        >
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover transition-all duration-700 md:group-hover:blur-sm md:group-hover:scale-110"
                    style={{ objectPosition: 'center 30%' }}
                />
                <div className="absolute inset-0 bg-black/60 md:group-hover:bg-black/70 transition-all"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 h-full">
                <div className="transition-all duration-500 md:group-hover:scale-95 md:group-hover:opacity-20">
                    <h3 className={`font-black text-white ${fullWidth ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'}`}>{title}</h3>
                </div>

                <div className="mt-8 opacity-100 md:opacity-0 md:translate-y-8 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 max-w-xl">
                    <p className="text-base md:text-lg text-gray-200 mb-8 mx-auto">{description}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {buttons.map((btn, i) => (
                            <button 
                                key={i}
                                className={`px-8 py-3 rounded-full font-bold text-sm transition-all active:scale-95 ${btn.primary ? 'bg-[#57C2FF] text-black hover:bg-[#45b1f0]' : 'border border-white/50 text-white hover:bg-white hover:text-black'}`}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Products = () => {
    return (
        <main className="bg-[#020617] text-white overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/Assets/Product1.webp" 
                        alt="Hero background" 
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-transparent to-[#020617]"></div>
                    <HeroParticleBackground />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto text-center space-y-8">
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter"
                    >
                        PRODUCTS
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light"
                    >
                        Grade solutions designed to scan, analyze, and protect your entire digital ecosystem with precision.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <button className="px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            Contact Us
                        </button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer hidden md:block"
                >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="text-white/50">
                        <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </motion.div>
            </section>

            {/* Product Grid Section */}
            <section className="relative py-32 px-4 sm:px-8 bg-[url(/Assets/Section-Background-B.webp)] bg-cover bg-fixed">
                <div className="max-w-7xl mx-auto pt-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ProductCard 
                            index={0}
                            title="Site360.ai"
                            description="Site 360.ai provides a single, real-time intelligence layer across the entire enterprise website ecosystem."
                            image="/Assets/Site360.webp"
                            fullWidth={true}
                            buttons={[
                                { label: "Explore Platform", primary: true },
                                { label: "Learn More", primary: false }
                            ]}
                        />
                        <ProductCard 
                            index={1}
                            title="Content Search Tool"
                            description="The Content Search Tool is a custom internal application designed to automatically scan large sets of web pages and identify specific keywords, references, and dependencies."
                            image="/Assets/ContentChecker1.webp"
                            buttons={[
                                { label: "Learn More", primary: false }
                            ]}
                        />
                        <ProductCard 
                            index={2}
                            title="Quality Checker Extension"
                            description="The Quality Checker Extension enables QA teams to perform fast, accurate pre-publish audits directly within the browser."
                            image="/Assets/QualityChecker.webp"
                            buttons={[
                                { label: "Learn More", primary: false }
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-4 bg-[#003C70] relative overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#57C2FF]/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full"></div>

                <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold leading-tight"
                    >
                        PARTNER WITH <br /> 
                        <span className="text-[#57C2FF]">GLOBAL WEB PRODUCTION</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <button className="px-12 py-5 bg-[#57C2FF] text-black font-black rounded-full text-xl hover:bg-[#45b1f0] transition-all hover:scale-110 active:scale-95 shadow-[0_10px_40px_rgba(87,194,255,0.3)]">
                            Request a Demo
                        </button>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default Products;
