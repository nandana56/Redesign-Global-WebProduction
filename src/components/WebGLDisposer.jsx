import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const WebGLDisposer = () => {
    const gl = useThree((state) => state.gl);
    
    useEffect(() => {
        return () => {
            // We no longer forcefully lose the context since LazyCanvas limits concurrency natively.
            // Forcefully losing it too often causes Chrome to disable WebGL entirely for the tab.
            setTimeout(() => {
                gl.dispose();
            }, 0);
        };
    }, [gl]);

    return null;
};

export default WebGLDisposer;
