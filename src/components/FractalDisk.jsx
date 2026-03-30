import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FractalMaterial = shaderMaterial(
  { iTime: 0, iResolution: new THREE.Vector2(100, 100) },
  `varying vec2 vUv;
   void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  `uniform float iTime;
   uniform vec2 iResolution;
   void mainImage( out vec4 o, vec2 u ) {
      vec2 v = iResolution.xy;
      u = .2*(u+u-v)/v.y;    
      vec4 z = o = vec4(1,2,3,0);
      for (float a = .5, t = iTime, i = 0.0; ++i < 19.; 
           o += (1. + cos(z+t)) / length((1.+i*dot(v,v)) * sin(1.5*u/(.5-dot(u,u)) - 9.*u.yx + t)))  
          v = cos(++t - 7.*u*pow(a += .03, i)) - 5.*u, 
          u += tanh(40. * dot(u *= mat2(cos(i + .02*t - z.wxzw*11.)), u) * cos(1e2*u.yx + t)) / 2e2
             + .2 * a * u + cos(4./exp(dot(o,o)/1e2) + t) / 3e2;
      o = 25.6 / (min(o, 13.) + 164. / o) - dot(u, u) / 250.;
      o.a = smoothstep(0.1, 0.5, length(o.rgb)); 
   }
   void main() { 
     mainImage(gl_FragColor, gl_FragCoord.xy); 
   }`
);

extend({ FractalMaterial });

export default function FractalDisk({ targetRotation, isHovered }) {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.material.iTime = state.clock.elapsedTime;
      if (isHovered) {
        meshRef.current.rotation.z += delta * 8; 
      } else {
        meshRef.current.rotation.z = THREE.MathUtils.lerp(
          meshRef.current.rotation.z,
          targetRotation,
          0.1
        );
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[1, 64]} />
      <fractalMaterial transparent={true} />
    </mesh>
  );
}