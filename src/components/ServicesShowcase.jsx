import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const pillars = [
    {
        id: "enterprise",
        title: "Enterprise Solutions",
        subtitle: "Scale · Transform · Innovate",
        description:
            "Our Enterprise Solutions empower organizations to streamline operations, enhance scalability, and drive innovation through a blend of advanced technology and strategic insight. From custom enterprise application development and high-performance, SEO-optimized enterprise website builds to CRM implementation, AI-driven automation, data analytics, and cloud transformation, we deliver solutions tailored to complex business needs. We also support change management, process optimization, and enterprise-grade cybersecurity, ensuring every solution we deploy is secure, compliant, and future-ready. With a focus on measurable outcomes, we help enterprises adapt quickly, optimize resources, and gain a competitive edge in a rapidly evolving digital landscape.",
        color: "#4bb5f8",
        image: "/images/enterprise.jpg",
    },
    {
        id: "smb",
        title: "SMB Solutions",
        subtitle: "Grow · Compete · Thrive",
        description:
            "Our Small and Medium Business Solutions are designed to help growing companies establish a strong digital presence, attract customers, and scale efficiently. From SEO-optimized website design and e-commerce development to cost-effective digital marketing and branding services, we deliver high-impact results without the enterprise-level complexity. Our team also implements CRM systems, AI-powered marketing automation, and streamlined workflows to boost productivity and customer engagement. With tailored strategies, creative expertise, and hands-on support, we empower SMBs to compete and thrive in today’s digital marketplace.",
        color: "#57c2ff",
        image: "/images/smb.jpg",
    },
];

const ServicesShowcase = () => {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <section className="py-20 bg-gradient-to-br from-white via-blue-50/50 to-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row h-auto md:h-[560px] gap-5">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.id}
                            onMouseEnter={() => setHoveredId(pillar.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="relative flex-1 rounded-3xl overflow-hidden cursor-pointer group min-h-[280px] md:min-h-0"
                            animate={{
                                flex: hoveredId === pillar.id ? 2.2 : 1,
                            }}
                            transition={{ type: "spring", stiffness: 180, damping: 26 }}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={pillar.image}
                                    alt={pillar.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.parentElement.style.background =
                                            index === 0
                                                ? "linear-gradient(145deg, #112866 0%, #1a3a7a 100%)"
                                                : "linear-gradient(145deg, #3a0d1e 0%, #5c1530 100%)";
                                    }}
                                />
                                {/* Dark base overlay */}
                                <div className="absolute inset-0 bg-[#050b1c]/30" />
                                {/* Color accent gradient */}
                                <div
                                    className="absolute inset-0 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(160deg, transparent 25%, ${pillar.color}88)`,
                                        opacity: hoveredId === pillar.id ? 1 : 0.75,
                                    }}
                                />
                                {/* Bottom fade */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050b1c] via-transparent to-transparent opacity-50" />
                            </div>

                            {/* Index number watermark */}
                            <span
                                className="absolute top-6 right-8 text-6xl font-black select-none pointer-events-none"
                                style={{ color: pillar.color, opacity: 0.08 }}
                            >
                                0{index + 1}
                            </span>

                            {/* Colored top border */}
                            <div
                                className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                                style={{ backgroundColor: pillar.color }}
                            />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <motion.span
                                    layout
                                    className="text-xs font-bold uppercase tracking-[0.25em] mb-2"
                                    style={{ color: pillar.color }}
                                >
                                    {pillar.subtitle}
                                </motion.span>
                                <motion.h3
                                    layout
                                    className="text-[#57C2FF] text-2xl sm:text-3xl lg:text-3xl font-semibold mb-2 sm:mb-4 text-left font-poppins"
                                >
                                    {pillar.title}
                                </motion.h3>

                                <AnimatePresence>
                                    {hoveredId === pillar.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 14 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 14 }}
                                            transition={{ duration: 0.25 }}
                                            className="mt-4"
                                        >
                                            <p className="text-white text-sm sm:text-base leading-relaxed text-left font-poppins mb-6">
                                                {pillar.description}
                                            </p>
                                            <div className="flex gap-3 flex-wrap">
                                                <Link to={`/services/${pillar.id}`}>
                                                    <button
                                                        className="rounded-full text-black bg-white px-3 py-1 sm:px-4 sm:py-2 border border-white text-xs sm:text-sm font-poppins transition-colors duration-300 font-medium hover:bg-[#dbe8f0]"
                                                    >
                                                        Learn More
                                                    </button>
                                                </Link>
                                                <Link to="/contact">
                                                    <button className="rounded-4xl text-white px-3 py-1 sm:px-4 sm:py-2 border-2 border-[#EAF3F9] text-xs sm:text-sm font-poppins transition-colors duration-300 font-medium hover:bg-[#EAF3F9] hover:text-[#2E3133]">
                                                        Contact Us
                                                    </button>
                                                </Link>
                                            </div>

                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Bottom accent bar */}
                            <motion.div
                                className="absolute bottom-0 left-0 h-1 rounded-b-3xl"
                                style={{ backgroundColor: pillar.color }}
                                animate={{ width: hoveredId === pillar.id ? "100%" : "0%" }}
                                transition={{ duration: 0.35 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesShowcase;
