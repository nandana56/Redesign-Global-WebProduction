import { FaChevronUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ScrollToTopArrow = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, backgroundColor: '#0a2a66' }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-[#08204d] text-white transition-colors duration-300 focus:outline-none flex items-center justify-center cursor-pointer shadow-lg"
            title="Scroll to Top"
            style={{ borderRadius: '2px' }}
        >
            <FaChevronUp className="text-xs" />
        </motion.button>
    );
};

export default ScrollToTopArrow;
