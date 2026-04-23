import React, { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTopArrow = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={scrollToTop}
                    whileHover={{ 
                        scale: 1.1, 
                        backgroundColor: '#57C2FF', 
                        color: '#fff',
                        boxShadow: '0 0 30px rgba(87,194,255,0.4)'
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed top-[60%] -translate-y-1/2 right-1 z-[100] w-12 h-12 bg-[#08204d]/90 backdrop-blur-md text-white transition-all duration-300 focus:outline-none flex items-center justify-center cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 rounded-full"
                    title="Scroll to Top"
                >
                    <FaChevronUp className="text-xl" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTopArrow;
