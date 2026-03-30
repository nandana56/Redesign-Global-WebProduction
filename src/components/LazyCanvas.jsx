import React, { useRef } from 'react';
import { useInView } from 'framer-motion';

export default function LazyCanvas({ children }) {
    const ref = useRef(null);
    // Render the canvas only when the container is in or near the viewport (100px margin avoids loading too many at once)
    const isInView = useInView(ref, { margin: "100px" });

    return (
        <div ref={ref} style={{ width: '100%', height: '100%' }}>
            {isInView && children}
        </div>
    );
}
