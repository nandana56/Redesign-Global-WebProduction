import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const HeroShadertoy3D = () => {
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
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const uniforms = {
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector3(width, height, 1) },
            iMouse: { value: new THREE.Vector2(0, 0) }
        };

        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float iTime;
            uniform vec3 iResolution;
            uniform vec2 iMouse;
            varying vec2 vUv;

            #define S(a, b, t) smoothstep(a, b, t)

            struct ray {
                vec3 o, d;
            };

            ray GetRay(vec2 uv, vec3 p, vec3 l, float z) {
                ray r;
                r.o = p;
                vec3 f = normalize(l-p),
                    r_c = normalize(cross(vec3(0,1,0), f)),
                    u = cross(f, r_c),
                    c = p+f*z,
                    i = c + uv.x*r_c + uv.y*u;
                r.d = normalize(i-p);
                return r;
            }

            vec3 ClosestPoint(ray r, vec3 p) {
                return r.o + max(0., dot(p-r.o, r.d))*r.d;
            }

            float DistRay(ray r, vec3 p) {
                return length(p-ClosestPoint(r, p));
            }

            float Bokeh(ray r, vec3 p, float size, float blur) {
                float d = DistRay(r, p);
                float c = S(size, size*(1.-blur), d);
                c *= mix(.7, 1., S(.8*size, size, d));
                return c;
            }

            vec3 StreetLights(ray r, float t) {
                float side = step(r.d.x, 0.);
                float rx = abs(r.d.x);
                
                float s = 1./10.;
                float m = fract(r.o.z*s + t*s);
                float pz = (floor(r.o.z*s + t*s)+.4)*10.;
                
                vec3 p = vec3(10., 5., pz);
                
                float b = Bokeh(r, p, .3, .1);
                
                float shadow = S(.3, .1, r.d.y);
                shadow *= S(.3, .1, abs(rx-.5));
                
                return vec3(1., .7, .3)*b*shadow;
            }

            vec3 HeadLights(ray r, float t) {
                t *= 2.;
                float side = step(r.d.x, 0.);
                float rx = abs(r.d.x);
                
                float s = 1./30.;
                float m = fract(r.o.z*s + t*s);
                float pz = (floor(r.o.z*s + t*s)+.4)*30.;
                
                float d = fract(sin(pz)*482.3)*5.;
                pz += d;
                
                vec3 p = vec3(2., 1., pz);
                
                float b = Bokeh(r, p, .15, .1);
                
                float shadow = S(.5, .1, r.d.y);
                shadow *= S(.3, .1, abs(rx-.2));
                
                return vec3(.9, .9, 1.)*b*shadow;
            }

            vec3 TailLights(ray r, float t) {
                t *= .5;
                float side = step(r.d.x, 0.);
                float rx = abs(r.d.x);
                
                float s = 1./15.;
                float m = fract(r.o.z*s - t*s);
                float pz = (floor(r.o.z*s - t*s)+.4)*15.;
                
                float d = fract(sin(pz)*482.3)*5.;
                pz += d;
                
                vec3 p = vec3(1.5, 1., pz);
                
                float b = Bokeh(r, p, .1, .1);
                
                float shadow = S(.5, .1, r.d.y);
                shadow *= S(.3, .1, abs(rx-.2));
                
                return vec3(1., .1, .03)*b*shadow;
            }

            vec3 EnvLights(ray r, float t) {
                float side = step(r.d.x, 0.);
                float rx = abs(r.d.x);
                
                float s = 1./10.;
                float m = fract(r.o.z*s + t*s);
                float pz = (floor(r.o.z*s + t*s)+.4)*10.;
                
                float d = fract(sin(pz)*482.3);
                
                vec3 n = vec3(sin(pz), cos(pz*.5), sin(pz*.3));
                n = normalize(n);
                
                vec3 p = vec3(10., 10.+sin(pz), pz);
                
                float b = Bokeh(r, p, .1 + d*.4, .1);
                
                return (n*.5+.5)*b;
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / iResolution.xy;
                uv -= .5;
                uv.x *= iResolution.x/iResolution.y;
                
                vec2 m = iMouse.xy/iResolution.xy;
                
                float t = iTime;
                
                vec3 p = vec3(0, 5, -20);
                vec3 lookat = vec3(0, 1, 10);
                
                ray r = GetRay(uv, p, lookat, 2.);
                
                vec3 col = vec3(0);
                
                col += StreetLights(r, t);
                col += HeadLights(r, t);
                col += TailLights(r, t);
                col += EnvLights(r, t);
                
                col = pow(col, vec3(.4545));
                
                gl_FragColor = vec4(col,1.0);
            }
        `;

        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        let frameId;
        const animate = (time) => {
            frameId = requestAnimationFrame(animate);
            uniforms.iTime.value = time / 1000;
            renderer.render(scene, camera);
        };
        animate(0);

        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h);
            uniforms.iResolution.value.set(w, h, 1);
        };
        window.addEventListener("resize", handleResize);

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            uniforms.iMouse.value.x = e.clientX - rect.left;
            uniforms.iMouse.value.y = rect.height - (e.clientY - rect.top);
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
        <div ref={mountRef} className="w-full h-full flex items-center justify-center opacity-90 rounded-2xl overflow-hidden shadow-2xl" />
    );
};

export default HeroShadertoy3D;
