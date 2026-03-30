import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const FireShader = () => {
  const meshRef = useRef();
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3() },
      iMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    const { clock, pointer } = state;
    uniforms.iTime.value = clock.getElapsedTime();
    uniforms.iResolution.value.set(size.width, size.height, 1);
    // Smoothing mouse input for a more organic feel
    uniforms.iMouse.value.x = THREE.MathUtils.lerp(uniforms.iMouse.value.x, pointer.x, 0.1);
    uniforms.iMouse.value.y = THREE.MathUtils.lerp(uniforms.iMouse.value.y, pointer.y, 0.1);
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

    float noise(vec3 p) {
      vec3 i = floor(p);
      vec4 a = dot(i, vec3(1., 57., 21.)) + vec4(0., 57., 21., 78.);
      vec3 f = cos((p-i)*acos(-1.))*(-.5)+.5;
      a = mix(sin(cos(a)*a),sin(cos(1.+a)*(1.+a)), f.x);
      a.xy = mix(a.xz, a.yw, f.y);
      return mix(a.x, a.y, f.z);
    }

    float sphere(vec3 p, vec4 spr) {
      return length(spr.xyz-p) - spr.w;
    }

    float flame(vec3 p) {
      // Sensitivity factor for mouse interaction
      vec3 offset = vec3(iMouse.x * 1.5, iMouse.y * 1.0, 0.0);
      
      // We keep the y position at -1.0 so the "source" of the fire is at the bottom
      float d = sphere(p*vec3(1.,.5,1.) - offset, vec4(.0,-1.0,.0,1.2));
      return d + (noise(p+vec3(.0,iTime*2.5,.0)) + noise(p*3.0)*.5)*.25*(p.y + 1.0);
    }

    float scene(vec3 p) {
      return min(100.-length(p), abs(flame(p)));
    }

    vec4 raymarch(vec3 org, vec3 dir) {
      float d = 0.0, glow = 0.0, eps = 0.02;
      vec3 p = org;
      bool glowed = false;
      
      for(int i=0; i<64; i++) {
        d = scene(p) + eps;
        p += d * dir;
        if( d > eps ) {
          if(flame(p) < .0) glowed = true;
          if(glowed) glow = float(i)/64.;
        }
      }
      return vec4(p, glow);
    }

    void main() {
      vec2 v = -1.0 + 2.0 * gl_FragCoord.xy / iResolution.xy;
      v.x *= iResolution.x/iResolution.y;
      
      vec3 org = vec3(0., -1.5, 4.0); // Slightly adjusted camera height
      vec3 dir = normalize(vec3(v.x*1.6, -v.y, -1.5));
      
      vec4 p = raymarch(org, dir);
      float glow = p.w;
      
      // Fire colors: Yellow/Orange to Blue
      vec4 col = mix(vec4(1.,.5,.1,1.), vec4(0.1,.5,1.,1.), p.y*.02+.4);
      gl_FragColor = mix(vec4(0.), col, pow(glow*2.2, 4.0));
    }
  `;

  return (
    <mesh ref={meshRef}>
      {/* 3. Changed args to 10, 10 to fit the Canvas better */}
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
};

export default FireShader;