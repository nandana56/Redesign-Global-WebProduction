import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const HeroThreeJS3D = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        // ─── Renderer ───────────────────────────────────────────────
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            if (!renderer || !renderer.getContext()) {
                throw new Error("Failed to get WebGL context");
            }
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);
            renderer.setClearColor(0x000000, 0);
            container.appendChild(renderer.domElement);
        } catch (e) {
            console.error("HeroThreeJS3D: WebGL creation failed", e);
            return;
        }

        // ─── Scene & Camera ──────────────────────────────────────────
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
        camera.position.set(0, 0, 4.5);

        // ─── Lights ──────────────────────────────────────────────────
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xd71c4c, 3, 12);
        pointLight1.position.set(3, 3, 3);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x4466ff, 2, 12);
        pointLight2.position.set(-3, -2, 2);
        scene.add(pointLight2);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(1, 2, 3);
        scene.add(dirLight);

        // ─── Globe ───────────────────────────────────────────────────
        const globeRadius = 1.6;
        const globeGeo = new THREE.SphereGeometry(globeRadius, 64, 64);

        // Custom shader for glowing globe with grid lines
        const globeMat = new THREE.MeshPhongMaterial({
            color: 0x0a1a3a,
            emissive: 0x0a0e2a,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.92,
            wireframe: false,
        });
        const globe = new THREE.Mesh(globeGeo, globeMat);
        scene.add(globe);

        // ─── Wireframe overlay ───────────────────────────────────────
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x2244aa,
            wireframe: true,
            transparent: true,
            opacity: 0.18,
        });
        const wireGeo = new THREE.SphereGeometry(globeRadius + 0.005, 32, 32);
        const wire = new THREE.Mesh(wireGeo, wireMat);
        scene.add(wire);

        // ─── Glowing outer shell ─────────────────────────────────────
        const outerMat = new THREE.MeshPhongMaterial({
            color: 0x1133cc,
            emissive: 0x0033cc,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.07,
            side: THREE.BackSide,
        });
        const outerGeo = new THREE.SphereGeometry(globeRadius + 0.12, 32, 32);
        const outerShell = new THREE.Mesh(outerGeo, outerMat);
        scene.add(outerShell);

        // ─── Orbit rings ─────────────────────────────────────────────
        const ringData = [
            { radius: 2.1, tilt: Math.PI / 6, color: 0xd71c4c, opacity: 0.7 },
            { radius: 2.35, tilt: -Math.PI / 5, color: 0x4488ff, opacity: 0.5 },
            { radius: 2.55, tilt: Math.PI / 2.5, color: 0xff4488, opacity: 0.35 },
        ];

        const rings = ringData.map(({ radius, tilt, color, opacity }) => {
            const geo = new THREE.TorusGeometry(radius, 0.012, 16, 160);
            const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.rotation.x = tilt;
            scene.add(mesh);
            return mesh;
        });

        // ─── Orbiting nodes ──────────────────────────────────────────
        const nodeData = [
            { ringIndex: 0, speed: 0.85, offset: 0 },
            { ringIndex: 0, speed: 0.85, offset: Math.PI },
            { ringIndex: 1, speed: -0.6, offset: Math.PI / 3 },
            { ringIndex: 2, speed: 0.5, offset: Math.PI * 1.3 },
            { ringIndex: 1, speed: -0.6, offset: Math.PI * 1.6 },
        ];

        const nodeColors = [0xff2255, 0x3388ff, 0xff3388, 0xffaa00, 0x33ffcc];
        const nodes = nodeData.map(({ ringIndex, speed, offset }, i) => {
            const geo = new THREE.SphereGeometry(0.065, 16, 16);
            const mat = new THREE.MeshStandardMaterial({
                color: nodeColors[i % nodeColors.length],
                emissive: nodeColors[i % nodeColors.length],
                emissiveIntensity: 1.5,
                roughness: 0,
                metalness: 0.3,
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.userData = { ringIndex, speed, offset, angle: offset };
            scene.add(mesh);

            // Glow halo around node
            const haloGeo = new THREE.SphereGeometry(0.13, 16, 16);
            const haloMat = new THREE.MeshBasicMaterial({
                color: nodeColors[i % nodeColors.length],
                transparent: true,
                opacity: 0.18,
            });
            const halo = new THREE.Mesh(haloGeo, haloMat);
            mesh.add(halo);

            return mesh;
        });

        // ─── Connection lines (dynamic) ──────────────────────────────
        const lineGroup = new THREE.Group();
        scene.add(lineGroup);

        const createLine = (p1, p2, color = 0xffffff, opacity = 0.3) => {
            const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
            const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
            return new THREE.Line(geo, mat);
        };

        // ─── Floating particles ──────────────────────────────────────
        const particleCount = 260;
        const particlePositions = new Float32Array(particleCount * 3);
        const particleSpeeds = [];

        for (let i = 0; i < particleCount; i++) {
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = Math.random() * Math.PI * 2;
            const r = globeRadius + 0.4 + Math.random() * 1.8;
            particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            particlePositions[i * 3 + 2] = r * Math.cos(phi);
            particleSpeeds.push((Math.random() - 0.5) * 0.004);
        }

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0x88aaff,
            size: 0.03,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true,
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // ─── Hot-spot dots on globe surface ──────────────────────────
        const hotspots = [
            { lat: 40, lon: -74 },  // New York
            { lat: 51, lon: 0 },    // London
            { lat: 35, lon: 139 },  // Tokyo
            { lat: 28, lon: 77 },   // Delhi
            { lat: -34, lon: 151 }, // Sydney
            { lat: 48, lon: 2 },    // Paris
            { lat: -23, lon: -43 }, // Rio
            { lat: 37, lon: -122 }, // San Francisco
        ];

        hotspots.forEach(({ lat, lon }) => {
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lon + 180) * (Math.PI / 180);
            const x = -globeRadius * Math.sin(phi) * Math.cos(theta);
            const y = globeRadius * Math.cos(phi);
            const z = globeRadius * Math.sin(phi) * Math.sin(theta);

            const dotGeo = new THREE.SphereGeometry(0.045, 12, 12);
            const dotMat = new THREE.MeshStandardMaterial({
                color: 0xd71c4c,
                emissive: 0xd71c4c,
                emissiveIntensity: 1.8,
            });
            const dot = new THREE.Mesh(dotGeo, dotMat);
            dot.position.set(x, y, z);
            globe.add(dot);

            // Pulse ring
            const pulseGeo = new THREE.RingGeometry(0.05, 0.1, 24);
            const pulseMat = new THREE.MeshBasicMaterial({
                color: 0xff3366,
                transparent: true,
                opacity: 0.5,
                side: THREE.DoubleSide,
            });
            const pulse = new THREE.Mesh(pulseGeo, pulseMat);
            pulse.position.set(x, y, z);
            pulse.lookAt(0, 0, 0);
            pulse.userData.baseScale = 1;
            globe.add(pulse);
        });

        // ─── Mouse interaction ────────────────────────────────────────
        const mouse = { x: 0, y: 0 };
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // ─── Animation ───────────────────────────────────────────────
        let frameId;
        const timer = new THREE.Timer();
        let targetRotX = 0, targetRotY = 0;
        let currentRotX = 0, currentRotY = 0;

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            timer.update();
            const t = timer.getElapsed();

            // Globe auto-rotation + mouse parallax
            targetRotY = t * 0.18 + mouse.x * 0.4;
            targetRotX = mouse.y * 0.25;
            currentRotX += (targetRotX - currentRotX) * 0.05;
            currentRotY += (targetRotY - currentRotY) * 0.05;
            globe.rotation.y = currentRotY;
            globe.rotation.x = currentRotX;
            wire.rotation.y = currentRotY + 0.3;
            wire.rotation.x = currentRotX - 0.1;

            // Rings slow rotation
            rings[0].rotation.z = t * 0.22;
            rings[1].rotation.y = t * -0.18;
            rings[2].rotation.x = t * 0.14;
            rings[2].rotation.z = t * 0.09;

            // Update orbiting nodes
            // Clear old lines
            while (lineGroup.children.length > 0) {
                lineGroup.remove(lineGroup.children[0]);
            }

            const nodePositions = [];
            nodes.forEach((node) => {
                const { ringIndex, speed, offset } = node.userData;
                node.userData.angle += speed * 0.008;
                const angle = node.userData.angle;
                const ring = rings[ringIndex];
                const r = ringData[ringIndex].radius;

                // Global position on tilted ring
                const localX = r * Math.cos(angle);
                const localY = r * Math.sin(angle);
                const localZ = 0;

                const pos = new THREE.Vector3(localX, localY, localZ);
                pos.applyEuler(ring.rotation);
                node.position.copy(pos);
                nodePositions.push(pos.clone());
            });

            // Draw lines between nearby nodes
            for (let i = 0; i < nodePositions.length; i++) {
                for (let j = i + 1; j < nodePositions.length; j++) {
                    const dist = nodePositions[i].distanceTo(nodePositions[j]);
                    if (dist < 2.2) {
                        const opacity = (1 - dist / 2.2) * 0.45;
                        const line = createLine(nodePositions[i], nodePositions[j], 0xaabbff, opacity);
                        lineGroup.add(line);
                    }
                }
            }

            // Particle drift
            const pos = particleGeo.attributes.position;
            for (let i = 0; i < particleCount; i++) {
                pos.array[i * 3 + 1] += particleSpeeds[i];
                const y = pos.array[i * 3 + 1];
                const x = pos.array[i * 3];
                const z = pos.array[i * 3 + 2];
                const r = Math.sqrt(x * x + y * y + z * z);
                if (r > 4.5 || r < globeRadius + 0.3) {
                    particleSpeeds[i] *= -1;
                }
            }
            pos.needsUpdate = true;

            // Pulsing hotspot rings
            globe.children.forEach((child) => {
                if (child.geometry instanceof THREE.RingGeometry) {
                    const s = 1 + 0.6 * Math.sin(t * 2.5 + child.position.x);
                    child.scale.setScalar(s);
                    child.material.opacity = 0.5 * (1 - (s - 1) / 0.6);
                }
            });

            // Light animation
            pointLight1.position.x = 3 * Math.cos(t * 0.5);
            pointLight1.position.z = 3 * Math.sin(t * 0.5);
            pointLight2.position.x = -3 * Math.cos(t * 0.3);
            pointLight2.position.y = -2 + Math.sin(t * 0.4);

            renderer.render(scene, camera);
        };
        animate();

        // ─── Resize handler ──────────────────────────────────────────
        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener("resize", handleResize);

        // ─── Cleanup ─────────────────────────────────────────────────
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                width: "100%",
                height: "100%",
                minHeight: "480px",
                position: "relative",
            }}
        />
    );
};

export default HeroThreeJS3D;
