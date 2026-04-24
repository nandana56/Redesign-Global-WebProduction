/**
 * A robust requestIdleCallback wrapper with fallback for Safari/older browsers.
 * Used to defer non-critical tasks and reduce main-thread blocking time.
 */
export const runOnIdle = (callback, timeout = 2000) => {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback, { timeout });
    } else {
        // Fallback for Safari
        setTimeout(callback, 1);
    }
};

/**
 * Hook-friendly version of idle execution
 */
export const useIdleEffect = (callback, deps = []) => {
    const React = window.React; // Fallback if not imported, though usually we import it
    
    // Using global React if available, or just use the logic directly in components
    // For this project, we'll use the logic directly in useEffect for better type safety
};
