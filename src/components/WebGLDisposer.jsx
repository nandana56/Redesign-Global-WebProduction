import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * WebGLDisposer – mounts inside a <Canvas> and disposes the WebGL
 * renderer when the canvas unmounts.  Also handles context-loss gracefully
 * so the "Texture is immutable" GL error is silenced.
 */
const WebGLDisposer = () => {
    const { gl, scene } = useThree();

    useEffect(() => {
        const canvas = gl.domElement;

        // Suppress "Texture is immutable" errors that appear after context loss
        const handleContextLost = (e) => {
            e.preventDefault();
        };

        const handleContextRestored = () => {
            // Force re-upload of all textures after context restore
            scene.traverse((obj) => {
                if (obj.material) {
                    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
                    mats.forEach((mat) => {
                        Object.values(mat).forEach((val) => {
                            if (val && val.isTexture) {
                                val.needsUpdate = true;
                            }
                        });
                    });
                }
            });
        };

        canvas.addEventListener('webglcontextlost', handleContextLost);
        canvas.addEventListener('webglcontextrestored', handleContextRestored);

        return () => {
            canvas.removeEventListener('webglcontextlost', handleContextLost);
            canvas.removeEventListener('webglcontextrestored', handleContextRestored);

            // Dispose all scene objects
            scene.traverse((obj) => {
                if (obj.geometry) obj.geometry.dispose();
                if (obj.material) {
                    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
                    mats.forEach((mat) => {
                        Object.values(mat).forEach((val) => {
                            if (val && val.isTexture) val.dispose();
                        });
                        mat.dispose();
                    });
                }
            });

            // Small delay lets React finish unmounting before we nuke the context
            setTimeout(() => {
                try { gl.dispose(); } catch (_) { /* already gone */ }
            }, 50);
        };
    }, [gl, scene]);

    return null;
};

export default WebGLDisposer;
