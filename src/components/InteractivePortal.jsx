import React, { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const InteractivePortal = () => {
  const meshRef = useRef();
  const { size } = useThree();
  const [isOpen, setIsOpen] = useState(false);

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3() },
      uOpen: { value: 0 }, // 0 is closed, 1 is open
    }),
    []
  );

  useFrame((state) => {
    uniforms.iTime.value = state.clock.getElapsedTime();
    uniforms.iResolution.value.set(size.width, size.height, 1);

    // Smoothly interpolate the portal opening
    const target = isOpen ? 1.0 : 0.0;
    uniforms.uOpen.value = THREE.MathUtils.lerp(uniforms.uOpen.value, target, 0.05);
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
    uniform float uOpen;
    varying vec2 vUv;

    float H = 1.8;
    float pi = 3.14159265;

    float sabs(float x ) { float a = 0.3; return sqrt(x*x+a*a)-a; }

    float f(vec3 p) {
        float sdf = p.y;
        for(float j = .04; j < 6.; j+=j)
            sdf += (abs(dot(sin(p.z*.1 + p/j), vec3(.2)))-.1)*j;
        return sdf;
    }

    float f2(vec3 p) {
        float sdf = p.y;
        for(float j = 2.56; j < 6.; j+=j)
            sdf += (sabs(dot(sin(p.z*.1 + p/j), vec3(.2)))-.1)*j;
        sdf = min(sdf, p.y+H);
        return sdf;
    }

    vec4 portal_target(float time, in vec3 ro, in vec3 rd ) {
        vec3 col = vec3(0.0);
        ro -= vec3(0,.8,4.*time);
        ro.x += -sin(time*.2) * 10.;
        rd.xy *= mat2(cos(cos(time*.2)*.25 + vec4(0,-11,11,0)));
        
        float t = 0.;
        ro.y += .2-1.5*f2(ro);
        ro.y = .5*(ro.y + H) + .5*sabs(ro.y + H)-H;
        
        float angle = .2 * (
            ((f2(ro) - f2(ro+vec3(0,0,1)))*.75+.15) +
            ((f2(ro+vec3(0,0,-.5)) - f2(ro+vec3(0,0,.5)))*.75+.15)
        );
        mat2 M = mat2(cos(angle), sin(angle), -sin(angle), cos(angle));
        rd.yz *= M;
        
        float T = 1.;
        for(int i = 0; i < 40; i++) {
            vec3 p = rd * t + ro;
            if(p.y < -H) {
                p.y = abs(p.y+H)-H;
                T = pow( clamp(1.+rd.y,0.,1.), 5. );
            }
            float sdf = f(p);
            t += sdf*.65 + 1e-3;
            if(abs(sdf) < 1e-3 || t > 50.0) {
                if(abs(sdf) < 1e-3) {
                    vec2 e = 5e-2*vec2(0,1);
                    vec3 n = normalize(vec3(f(p+e.yxx), f(p+e.xyx), f(p+e.xxy))-sdf);
                    col += pow( clamp(1.+dot(n,rd),0.,1.), 5. );
                }
                break;
            }
            col += (.75+.25*sin(vec3(-1.75,2.5,1.3)+2.4*vec3(.3,.6,1)*sdf))*.1*sdf * exp2(-.5*sdf)*exp2(-.1*t) * T;
        }
        return vec4(col, 0);
    }

    vec3 triwave(vec3 x) {
        return abs(fract(.5*x/pi-.25)-.5)*4.-1.;
    }

    void main() {
        vec2 r = iResolution.xy;
        vec2 uv = (gl_FragCoord.xy*2.-r) / r.y;
        float t = iTime, d, z = 0.;
        float focal = 1.4;
        vec4 o = vec4(0.0);
        vec3 cam_pos = vec3(0, 1.5, 10.);
        vec3 rd = normalize(vec3(uv, -focal));

        float time = iTime*.25;
        cam_pos += vec3(1.5*cos(time), 0, 2.*sin(time));
        float c = cos(cos(time)*.25), s = sin(cos(time)*.25);
        rd.xz *= mat2(c,s,-s,c);  
        
        vec3 P = vec3(0,2.3,2.5); 
        float h = 1.; 
        float radius = uOpen * 3.5;

        vec4 portal_target_color = vec4(0);
        if(length(dot(P - cam_pos, rd) * rd + cam_pos - P) < radius + 1.0) {
            portal_target_color = portal_target(iTime, cam_pos, rd);
        }
        
        portal_target_color *= portal_target_color * 300.0;
        float transmission = 1.;
        
        for(float i = 0.; i < 50.; i++) {
            vec3 p = z*rd + cam_pos;
            float D = length(p-P)-radius;
            float D2 = length((p-vec3(P.x,-h,P.z))*vec3(1.5,10.,1.5))-radius;
            
            if(p.y < -h) {
                p.y= abs(p.y+h)-h;
                transmission = .8 * (0.15 + 0.85*pow(clamp(1.+rd.y,0.,1.), 5.));
            } else {
                transmission = 1.;
            }
        
            p.y += .8*sin(p.z*2. + iTime*2. - d*12.)*.3;
            float T_rot = 2.5*t-d*14.;
            vec3 q = p-P;
            q.xy *= mat2(cos(T_rot), sin(T_rot), -sin(T_rot), cos(T_rot));

            for(d=1.; d<7.; d++) q += triwave((q*d+t*2.)).yzx/d;
            d = .1*abs(length(p-P)-radius) + abs(q.z)*.1;
            
            o += transmission * mix(
                (cos(d/.1+vec4(1,2,2.5,0))+1.)/d*z,
                portal_target_color,
                smoothstep(0.0, -0.2, max(length(p-P) - radius, (p.z-P.z)))
            )
            + 2.*(cos(-4.5*iTime+D/.1+vec4(1,2,2.5,0))+1.)*exp2(-D*D)*z
            + 10.*(cos(vec4(1,2,2.5,0))+1.)*exp2(-abs(D2))*z;

            z += min(abs(p.y+h)*.4+.03, d);
            if (z > 100.0) break;
        }
        
        o = o/1e4;
        vec3 color = o.rgb;
        float alpha = clamp(length(color) * 8.0, 0.0, 1.0);
        
        // Use vUv for the mask to be coordinate-independent
        vec2 centeredUv = vUv * 2.0 - 1.0;
        float mask = smoothstep(1.0, 0.2, length(centeredUv));
        
        gl_FragColor = vec4(sqrt(1.-exp(-1.5*color*color)), alpha * mask);
    }
  `;

  return (
    <mesh
      ref={meshRef}
      onClick={() => setIsOpen(!isOpen)}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

export default InteractivePortal;