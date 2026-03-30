import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const HeroParticle3D = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 5;

        // Particle configuration
        const count = 1500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            velocities[i * 3] = (Math.random() - 0.5) * 0.01;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

            sizes[i] = Math.random();
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            color: 0x2563eb,
            size: 0.05,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Animation loop
        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);

            const positionsArray = geometry.attributes.position.array;
            for (let i = 0; i < count; i++) {
                positionsArray[i * 3] += velocities[i * 3];
                positionsArray[i * 3 + 1] += velocities[i * 3 + 1];
                positionsArray[i * 3 + 2] += velocities[i * 3 + 2];

                // Boundary check
                if (Math.abs(positionsArray[i * 3]) > 5) velocities[i * 3] *= -1;
                if (Math.abs(positionsArray[i * 3 + 1]) > 5) velocities[i * 3 + 1] *= -1;
                if (Math.abs(positionsArray[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
            }
            geometry.attributes.position.needsUpdate = true;

            points.rotation.y += 0.001;
            points.rotation.x += 0.0005;

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", handleResize);

        // Mouse Parallax
        const handleMouseMove = (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            points.rotation.y += mouseX * 0.01;
            points.rotation.x += mouseY * 0.01;
        };
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div ref={mountRef} className="w-full h-full min-h-[400px] flex items-center justify-center pointer-events-none opacity-80" />
    );
};

export default HeroParticle3D;
