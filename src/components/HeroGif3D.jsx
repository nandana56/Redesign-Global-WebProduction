import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const HeroGif3D = () => {
    // Mouse tracking
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for mouse movement
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    // Mapping mouse position to rotation and translation
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
    const translateX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
    const translateY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalize mouse position (-0.5 to 0.5)
        x.set((event.clientX - centerX) / rect.width);
        y.set((event.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            className="relative w-full h-full flex items-center justify-center perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    x: translateX,
                    y: translateY,
                    transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[500px]"
            >
                <motion.img
                    src="/space-neon.gif"
                    alt="Space Neon Visualization"
                    className="w-full h-auto"
                    style={{ mixBlendMode: "screen" }}

                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

            </motion.div>
        </div>
    );
};

export default HeroGif3D;
