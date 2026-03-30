import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroBanner = () => {
  return (
    <>
      {/* ── HERO BANNER ────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image + Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/home/istockphoto-477698565-170667a.jpg")',
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 py-12 flex justify-end">
          <div className="max-w-4xl">
            <div className="relative z-10 w-full max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {/* Line 1 */}
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6EAFF] to-[#FFFFFF] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins font-bold mb-2 text-right">
                  TECHNOLOGY SOLUTIONS
                </h1>

                {/* Line 2 */}
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6EAFF] to-[#FFFFFF] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins font-bold flex flex-wrap items-center justify-end gap-x-3">
                  <span>WITH GLOBAL IMPACT</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="flex flex-row justify-end gap-4 sm:gap-6 mt-8"
              >
                <Link to="/services">
                  <button className="rounded-full bg-white text-black px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-poppins font-semibold border border-white hover:bg-gray-100 transition-all duration-300 shadow-lg">
                    All Services
                  </button>
                </Link>

                <Link to="/about">
                  <button className="rounded-full text-white px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-poppins font-semibold border-2 border-white hover:bg-white/10 transition-all duration-300 shadow-lg">
                    About Us
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroBanner;
