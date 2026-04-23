import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";

/* ─────────────────────────────────────────────────────────────────
   SolutionsHero — Option 4: Holographic Orbit
   Left : Glitch-text heading · paragraph · animated-border CTA
   Right: Circular-clip image + multi-ring SVG orbits + glow halo
   BG   : Deep gradient + animated mesh grid
───────────────────────────────────────────────────────────────── */
export default function SolutionsHero() {
  const cyanRef = useRef(null);
  const redRef  = useRef(null);

  /* ── Chromatic-aberration glitch on heading ── */
  useEffect(() => {
    const burst = () => {
      gsap.timeline()
        .set([cyanRef.current, redRef.current], { opacity: 0.75 })
        .to(cyanRef.current, { x: -7, y: 1,  duration: 0.05 })
        .to(redRef.current,  { x:  7, y: -1, duration: 0.05 }, "<")
        .to([cyanRef.current, redRef.current], { opacity: 0, x: 0, y: 0, duration: 0.06, delay: 0.07 })
        .to([cyanRef.current, redRef.current], { opacity: 0.6, duration: 0.03, delay: 0.04 })
        .to(cyanRef.current, { x: -4, duration: 0.04 })
        .to(redRef.current,  { x:  4, duration: 0.04 }, "<")
        .to([cyanRef.current, redRef.current], { opacity: 0, x: 0, duration: 0.07 });
    };

    const t = setTimeout(burst, 600);
    const id = setInterval(burst, 1500);
    return () => { clearTimeout(t); clearInterval(id); };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden flex items-center"
      style={{ minHeight: "100vh", background: "linear-gradient(140deg, #04153b 0%, #061e4f 55%, #04153b 100%)" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

        /* Mesh grid */
        .sol4-grid {
          background-image:
            linear-gradient(rgba(75,181,248,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75,181,248,0.06) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        /* Rotating gradient border button */
        @property --sol4-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes sol4Border {
          to { --sol4-angle: 360deg; }
        }
        .sol4-btn-wrap {
          background: conic-gradient(
            from var(--sol4-angle),
            #4bb5f8 0%,
            #ffffff 25%,
            #4bb5f8 50%,
            #062157 75%,
            #4bb5f8 100%
          );
          animation: sol4Border 2.8s linear infinite;
          border-radius: 9999px;
          padding: 2px;
        }
        .sol4-btn-inner {
          background: #000e34;
          border-radius: 9999px;
          transition: background 0.25s;
        }
        .sol4-btn-wrap:hover .sol4-btn-inner {
          background: #051540;
        }

        /* Dot ping */
        @keyframes sol4Ping {
          0%   { transform: scale(1);   opacity: 0.9; }
          80%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      {/* Animated mesh grid */}
      <div className="absolute inset-0 sol4-grid opacity-100 pointer-events-none z-0" />

      {/* Ambient glow blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#4bb5f8] blur-[200px] opacity-[0.05] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-[#062157] blur-[160px] opacity-[0.4] pointer-events-none" />

      {/* ════════════════════════════════════════════════════════
          LAYOUT — two columns
      ════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center gap-16 lg:gap-0 py-36 lg:py-0">

        {/* ── LEFT: Text content ─────────────────────────── */}
        <div className="w-full lg:w-[52%] flex flex-col justify-center">

          {/* Tag */}


          {/* Glitch heading */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-8 select-none"
            style={{ isolation: "isolate" }}
          >
            {/* Cyan channel */}
            <span
              ref={cyanRef}
              aria-hidden
              className="absolute inset-0 font-bold leading-none pointer-events-none"
              style={{
                fontSize: "clamp(42px, 12vw, 80px)",
                fontFamily: "'Poppins', sans-serif",
                color: "transparent",
                WebkitTextStroke: "2px #00e5ff",
                opacity: 0,
                mixBlendMode: "screen",
              }}
            >
              Solutions
            </span>

            {/* Red channel */}
            <span
              ref={redRef}
              aria-hidden
              className="absolute inset-0 font-bold leading-none pointer-events-none"
              style={{
                fontSize: "clamp(42px, 12vw, 80px)",
                fontFamily: "'Poppins', sans-serif",
                color: "transparent",
                WebkitTextStroke: "2px #ff2d55",
                opacity: 0,
                mixBlendMode: "screen",
              }}
            >
              Solutions
            </span>

            {/* Base white heading */}
            <h1
              className="font-bold text-white leading-none"
              style={{
                fontSize: "clamp(42px, 12vw, 80px)",
                fontFamily: "'Poppins', sans-serif",
                textShadow: "0 0 60px rgba(75,181,248,0.2)",
              }}
            >
              Solutions
            </h1>
          </motion.div>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mb-10 leading-relaxed max-w-sm"
            style={{
              fontSize: "clamp(16px, 1.8vw, 20px)",
              fontFamily: "'Poppins', sans-serif",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            Empowering enterprises with cutting-edge Agentic AI and custom intelligent systems.
          </motion.p>

          {/* Animated gradient-border CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="inline-flex"
          >
            <Link to="/contact#contact-form">
              <div className="sol4-btn-wrap inline-flex">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="sol4-btn-inner px-9 py-3.5 text-sm font-semibold text-white"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Contact Us
                </motion.button>
              </div>
            </Link>
          </motion.div>


        </div>

        {/* ── RIGHT: Circular image + orbit rings ────────── */}
        <div className="w-full lg:w-[48%] flex items-center justify-center lg:-ml-12 relative mt-16 lg:mt-0 px-4 sm:px-0">

          {/* Outer glow halo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center w-full max-w-[320px] sm:max-w-[560px] lg:max-w-[640px] aspect-square"
          >

            {/* Halo glow */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(75,181,248,0.18) 0%, transparent 68%)",
                filter: "blur(20px)",
              }}
            />

            {/* ── Orbit ring 1 (outer) ── */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 640 640"
              style={{ animation: "spin 18s linear infinite" }}
            >
              {/* Ring track */}
              <circle cx="320" cy="320" r="300" stroke="rgba(75,181,248,0.12)" strokeWidth="1" fill="none" />
              {/* Orbiting dot */}
              <circle cx="320" cy="20" r="6" fill="#4bb5f8" style={{ filter: "drop-shadow(0 0 6px #4bb5f8)" }} />
              <circle cx="320" cy="20" r="12" fill="#4bb5f8" opacity="0.2" />
            </svg>

            {/* ── Orbit ring 2 (mid, reverse) ── */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 640 640"
              style={{ animation: "spin 12s linear infinite reverse" }}
            >
              <circle cx="320" cy="320" r="230" stroke="rgba(75,181,248,0.08)" strokeWidth="1" fill="none"
                strokeDasharray="6 14"
              />
              <circle cx="320" cy="90" r="5" fill="#7dd4fc" style={{ filter: "drop-shadow(0 0 5px #7dd4fc)" }} />
            </svg>

            {/* ── Orbit ring 3 (inner fast) ── */}
            <svg
              className="absolute w-[68%] h-[68%]"
              viewBox="0 0 440 440"
              style={{ animation: "spin 8s linear infinite" }}
            >
              <circle cx="220" cy="220" r="210" stroke="rgba(75,181,248,0.06)" strokeWidth="1" fill="none" />
              <circle cx="220" cy="10" r="4" fill="#fff" opacity="0.7" style={{ filter: "drop-shadow(0 0 4px #fff)" }} />
            </svg>

            {/* ── Image Panel ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 rounded-full overflow-hidden w-[62%] aspect-square bg-[#020a1f] p-8 lg:p-12"
              style={{
                border: "2px solid rgba(75,181,248,0.25)",
                boxShadow: "0 0 0 8px rgba(75,181,248,0.06), 0 0 60px rgba(75,181,248,0.2), 0 20px 80px rgba(0,0,0,0.6)",
              }}
            >
              <img
                src="/solution/IT-Solutions.webp"
                alt="IT Solutions"
                className="w-full h-full object-contain object-center"
                draggable={false}
              />
              {/* Blue tint + scan-line overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(160deg, rgba(6,33,87,0.45) 0%, rgba(0,14,52,0.25) 100%)",
                }}
              />
              {/* Scan lines */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
                  mixBlendMode: "overlay",
                }}
              />
            </motion.div>

            {/* Ping dot — top */}
            <div
              className="absolute"
              style={{ top: "3%", left: "50%", transform: "translateX(-50%)" }}
            >
              <span
                className="absolute inset-0 rounded-full bg-[#4bb5f8]"
                style={{ animation: "sol4Ping 2.5s ease-out infinite" }}
              />
              <span className="relative block w-3 h-3 rounded-full bg-[#4bb5f8]" />
            </div>



          </motion.div>
        </div>
      </div>

      {/* Spin keyframe */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
