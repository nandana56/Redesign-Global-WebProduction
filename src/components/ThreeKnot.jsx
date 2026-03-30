// src/components/ThreeKnotScene.jsx
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import WebGLDisposer from './WebGLDisposer';


// Particle sprite generator
function generateSprite() {
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.2, "rgba(0,255,255,1)");
    gradient.addColorStop(0.4, "rgba(0,0,64,1)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}

// TorusKnot mesh / particle system
function TorusKnot({ params }) {
    const meshRef = useRef();

    // Memoize geometry to avoid unnecessary recalculation
    const geometry = useMemo(() => {
        return new THREE.TorusKnotGeometry(
            params.radius,
            params.tube,
            Math.round(params.radialSegments),
            Math.round(params.tubularSegments),
            Math.round(params.p),
            Math.round(params.q),
            params.heightScale
        );
    }, [
        params.radius,
        params.tube,
        params.radialSegments,
        params.tubularSegments,
        params.p,
        params.q,
        params.heightScale
    ]);
    


    // Rotate the knot
    useFrame(() => {
        if (params.rotate && meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    // Return particle system or normal mesh
    if (params.asParticles) {
        const particleMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.2,
            transparent: true,
            blending: THREE.AdditiveBlending,
            map: generateSprite(),
            depthWrite: false
        });
        return <points ref={meshRef} geometry={geometry} material={particleMaterial} />;
    }

    const meshMaterial = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    return <mesh ref={meshRef} geometry={geometry} material={meshMaterial} />;
}

// Main Scene Component
export default function ThreeKnotScene() {
    // Leva controls for all parameters
    const params = useControls({
        radius: { value: 40, min: 0, max: 50, step: 0.1 },
        tube: { value: 28.2, min: 0, max: 50, step: 0.1 },
        radialSegments: { value: 600, min: 3, max: 1000, step: 1 },
        tubularSegments: { value: 12, min: 1, max: 50, step: 1 },
        p: { value: 5, min: 1, max: 10, step: 1 },
        q: { value: 4, min: 1, max: 15, step: 1 },
        heightScale: { value: 4, min: 0, max: 5, step: 0.1 },
        asParticles: true,
        rotate: true
    });

    return (
        
<Canvas
            camera={{ position: [-30, 40, 50], fov: 45 }}
            style={{ width: "100vw", height: "100vh", background: "black" }}
        >
                <WebGLDisposer />
            <ambientLight intensity={0.5} />
            <pointLight position={[50, 50, 50]} />
            <TorusKnot params={params} />
            <OrbitControls />
        </Canvas>

    );
}