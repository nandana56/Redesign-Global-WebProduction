import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const UniverseWithin = () => {
  const meshRef = useRef();
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector3() },
    iMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state) => {
    const { clock, mouse, size } = state;
    uniforms.iTime.value = clock.getElapsedTime();
    uniforms.iResolution.value.set(size.width, size.height, 1);
    uniforms.iMouse.value.set(
      (mouse.x * 0.5 + 0.5) * size.width,
      (mouse.y * 0.5 + 0.5) * size.height
    );
  });

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
    uniform vec2 iMouse;
    varying vec2 vUv;

    #define S(a, b, t) smoothstep(a, b, t)
    #define NUM_LAYERS 4.

    float N21(vec2 p) {
      vec3 a = fract(vec3(p.xyx) * vec3(213.897, 653.453, 253.098));
      a += dot(a, a.yzx + 79.76);
      return fract((a.x + a.y) * a.z);
    }

    vec2 GetPos(vec2 id, vec2 offs, float t) {
      float n = N21(id+offs);
      float n1 = fract(n*10.);
      float n2 = fract(n*100.);
      float a = t+n;
      return offs + vec2(sin(a*n1), cos(a*n2))*.4;
    }

    float df_line( in vec2 a, in vec2 b, in vec2 p) {
      vec2 pa = p - a, ba = b - a;
      float h = clamp(dot(pa,ba) / dot(ba,ba), 0., 1.);	
      return length(pa - ba * h);
    }

    float line(vec2 a, vec2 b, vec2 uv) {
      float r1 = .04;
      float r2 = .01;
      float d = df_line(a, b, uv);
      float d2 = length(a-b);
      float fade = S(1.5, .5, d2);
      fade += S(.05, .02, abs(d2-.75));
      return S(r1, r2, d)*fade;
    }

    float NetLayer(vec2 st, float n, float t) {
      vec2 id = floor(st)+n;
      st = fract(st)-.5;
      vec2 p[9];
      int k=0;
      for(float y=-1.; y<=1.; y++) {
        for(float x=-1.; x<=1.; x++) {
          p[k++] = GetPos(id, vec2(x,y), t);
        }
      }
      float m = 0.;
      float sparkle = 0.;
      for(int i=0; i<9; i++) {
        m += line(p[4], p[i], st);
        float d = length(st-p[i]);
        float s = (.005/(d*d));
        s *= S(1., .7, d);
        float pulse = sin((fract(p[i].x)+fract(p[i].y)+t)*5.)*.4+.6;
        pulse = pow(pulse, 20.);
        s *= pulse;
        sparkle += s;
      }
      m += line(p[1], p[3], st);
      m += line(p[1], p[5], st);
      m += line(p[7], p[5], st);
      m += line(p[7], p[3], st);
      float sPhase = (sin(t+n)+sin(t*.1))*.25+.5;
      sPhase += pow(sin(t*.1)*.5+.5, 50.)*5.;
      return m + sparkle*sPhase;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - iResolution.xy * .5) / iResolution.y;
      vec2 M = iMouse.xy / iResolution.xy - .5;
      
      float t = iTime * .1;
      float s = sin(t);
      float c = cos(t);
      mat2 rot = mat2(c, -s, s, c);
      vec2 st = uv * rot;  
      M *= rot * 2.;
      
      float m = 0.;
      for(float i=0.; i<1.; i+=1./NUM_LAYERS) {
        float z = fract(t+i);
        float size = mix(15., 1., z);
        float fade = S(0., .6, z) * S(1., .8, z);
        m += fade * NetLayer(st * size - M * z, i, iTime);
      }
      
      float pulseGlow = sin(iTime) * 0.1 + 0.2;
      float glow = -uv.y * pulseGlow;
   
      vec3 baseCol = vec3(s, cos(t*.4), -sin(t*.24)) * .4 + .6;
      vec3 col = baseCol * m;
      col += baseCol * glow;
      
      col *= 1. - dot(uv, uv);
      float fadeInOut = S(0., 2.0, iTime) * S(230., 200., mod(iTime, 230.));
      col *= fadeInOut;

      // Mix the animated lines with a base blue background (#57c2ff)
      vec3 bgColor = vec3(0.11, 0.224, 0.733);
      col = col + bgColor;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default UniverseWithin;