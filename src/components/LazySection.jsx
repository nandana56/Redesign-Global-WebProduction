import React, { useState, useEffect, useRef } from 'react';

/**
 * LazySection
 * Defers the rendering of its children until the user scrolls near it.
 * This prevents the main thread from being blocked by heavy components 
 * that aren't visible on the initial screen.
 */
const LazySection = ({ children, offset = "200px" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: offset, // Start loading before it's actually visible
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [offset]);

    return (
        <div ref={containerRef} className="w-full min-h-[10px]">
            {isVisible ? children : <div className="h-[50vh]" />}
        </div>
    );
};

export default LazySection;
