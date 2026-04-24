import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EarthScene } from "./EarthScene";
import WebGLDisposer from './WebGLDisposer';

const HeroEarthCanvas = () => {
    const [canvasKey, setCanvasKey] = React.useState(0);

    const handleContextLost = React.useCallback((e, canvasEl) => {
        e.preventDefault();
        // After a short delay, bump the key to force a full remount
        setTimeout(() => {
            setCanvasKey(k => k + 1);
        }, 1000);
    }, []);

    return (
        <div className="absolute top-[-2%] sm:top-[-4%] right-[0%] sm:right-[5%] md:right-[8%] w-[280px] sm:w-[450px] md:w-[550px] h-[280px] sm:h-[450px] md:h-[550px] z-30 pointer-events-none">
            <Suspense fallback={null}>
                <Canvas
                    key={canvasKey}
                    camera={{ position: [0, 0, 3.0], fov: 45 }}
                    gl={{ antialias: true, alpha: true }}
                    style={{ background: "transparent", width: "100%", height: "100%" }}
                    frameloop="always"
                    onCreated={({ gl }) => {
                        const canvas = gl.domElement;
                        const lostHandler = (e) => handleContextLost(e, canvas);
                        canvas.addEventListener('webglcontextlost', lostHandler);
                        // Cleanup is handled by the key-based remount
                    }}
                >
                    <WebGLDisposer />
                    <EarthScene showStars={false} earthScale={0.6} earthSpeed={0.85} />
                </Canvas>
            </Suspense>
        </div>
    );
};

export default HeroEarthCanvas;
