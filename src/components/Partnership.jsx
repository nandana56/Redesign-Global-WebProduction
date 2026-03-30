import React from "react";
import { motion } from "framer-motion";

const Partnership = () => {
    return (
        <section className="relative py-24 overflow-hidden min-h-[60vh] flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("/hero/digital-transformation-partner.webp")',
                }}
            >
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Transition Div */}
            <div className="absolute w-full h-full transition-all duration-300 pointer-events-none"></div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6EAFF] to-[#FFFFFF] text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-8">
                        Your Partner in Digital Innovation
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-3xl mx-auto"
                >
                    <p className="text-white text-base sm:text-lg font-poppins leading-relaxed opacity-90 mb-10">
                        Global Web Production is your digital solutions partner specializing
                        in web and mobile development, UI/UX design, branding, business
                        transformation, and AI-powered automation. We combine creative
                        expertise with strategic insight to deliver scalable,
                        results-driven solutions—from building intuitive platforms and
                        compelling brand identities to optimizing business processes and
                        enabling intelligent, data-driven decisions. Our mission is to help
                        organizations innovate, grow, and thrive in a fast-changing
                        digital world.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Partnership;
