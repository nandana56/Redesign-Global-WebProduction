import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";

const DynamicPartnerCTA = () => {
    return (
        <section
            className="relative w-full h-[50vh] md:h-[65vh] min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: 'url("/products/patnership1.jfif")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Expanded pill — static, full-bleed, same as hovered state */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                {/* Inner image */}
                <img
                    src="/products/patnership.jpg"
                    alt="Partnership"
                    className="w-full h-full object-cover scale-105"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#020617]/75" />
            </div>

            {/* Text & Button — always visible */}
            <motion.div
                className="relative z-20 flex flex-col items-center justify-center text-center px-8 gap-8 w-full max-w-5xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
            >
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.15] text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                    PARTNER WITH <br />
                    <span className="inline-block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-[#57C2FF] to-blue-600">
                        GLOBAL WEB PRODUCTION
                    </span>
                </h2>



                <Link to="/contact" className="relative px-10 py-4 bg-[#57C2FF] text-black font-semibold rounded-full text-lg shadow-[0_0_40px_rgba(87,194,255,0.6)] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 group overflow-hidden inline-block">
                    <span className="relative z-10">Request a Demo</span>
                    <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-full" />
                </Link>
            </motion.div>
        </section>
    );
};

export default DynamicPartnerCTA;
