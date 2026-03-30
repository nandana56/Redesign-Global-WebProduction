import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const HeroShader3D = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 2;

        // Shader setup
        const uniforms = {
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector3(width, height, 1) },
            iChannel0: { value: new THREE.TextureLoader().load("/space-neon.gif") }
        };

        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float iTime;
            uniform vec3 iResolution;
            uniform sampler2D iChannel0;
            varying vec2 vUv;

            void mainImage( out vec4 fragColor, in vec2 fragCoord )
            {
                // Normalized pixel coordinates (from 0 to 1)
                vec2 uv = fragCoord/iResolution.xy;
                fragColor = texture2D(iChannel0, uv);
            }

            void main() {
                mainImage(gl_FragColor, vUv * iResolution.xy);
            }
        `;

        const geometry = new THREE.PlaneGeometry(2.5, 2.5);
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            side: THREE.DoubleSide
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        let frameId;
        const animate = (time) => {
            frameId = requestAnimationFrame(animate);
            uniforms.iTime.value = time / 1000;

            // Subtle rotation/parallax
            plane.rotation.y = Math.sin(time / 2000) * 0.1;
            plane.rotation.x = Math.cos(time / 3000) * 0.05;

            renderer.render(scene, camera);
        };
        animate(0);

        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            uniforms.iResolution.value.set(w, h, 1);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div ref={mountRef} className="w-full h-full flex items-center justify-center pointer-events-none" />
    );
};

export default HeroShader3D;
