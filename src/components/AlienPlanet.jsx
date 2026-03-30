import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const AlienPlanet = () => {
  const meshRef = useRef();
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3() },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    const { clock, pointer } = state;
    uniforms.iTime.value = clock.getElapsedTime();
    uniforms.iResolution.value.set(size.width, size.height, 1);

    // pointer.x/y range from -1 to +1. 
    // We lerp (Linear Interpolate) for a smooth, premium camera feel.
    uniforms.uMouse.value.x = THREE.MathUtils.lerp(uniforms.uMouse.value.x, pointer.x, 0.1);
    uniforms.uMouse.value.y = THREE.MathUtils.lerp(uniforms.uMouse.value.y, pointer.y, 0.1);
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
    uniform vec2 uMouse;
    varying vec2 vUv;

    #define PI  3.141592654
    #define TAU (2.0*PI)
    #define TOLERANCE       0.00001
    #define MAX_ITER        65
    #define MIN_DISTANCE    0.01
    #define MAX_DISTANCE    9.0

    const vec3 skyCol1 = vec3(0.35, 0.45, 0.6);
    const vec3 skyCol2 = vec3(0.4, 0.7, 1.0);
    const vec3 skyCol3 = pow(skyCol1, vec3(0.25));
    const vec3 sunCol1 = vec3(1.0, 0.6, 0.4);
    const vec3 sunCol2 = vec3(1.0, 0.9, 0.7);
    const vec3 mountainColor = 1.0*sqrt(vec3(0.95, 0.65, 0.45));
    const float cellWidth = 1.0;
    const vec4 planet = vec4(80.0, -20.0, 100.0, 50.0)*1000.0;

    void rot(inout vec2 p, float a) {
      float c = cos(a); float s = sin(a);
      p = vec2(p.x*c + p.y*s, -p.x*s + p.y*c);
    }

    vec2 mod2(inout vec2 p, vec2 size) {
      vec2 c = floor((p + size*0.5)/size);
      p = mod(p + size*0.5,size) - size*0.5;
      return c;
    }

    float circle(vec2 p, float r) { return length(p) - r; }

    float egg(vec2 p, float ra, float rb) {
      const float k = sqrt(3.0);
      p.x = abs(p.x);
      float r = ra - rb;
      return ((p.y<0.0) ? length(vec2(p.x, p.y)) - r : (k*(p.x+r)<p.y) ? length(vec2(p.x, p.y-k*r)) : length(vec2(p.x+r,p.y)) - 2.0*r) - rb;
    }

    vec2 hash(vec2 p) {
      p = vec2(dot (p, vec2 (127.1, 311.7)), dot (p, vec2 (269.5, 183.3)));
      return -1. + 2.*fract (sin (p)*43758.5453123);
    }

    vec2 raySphere(vec3 ro, vec3 rd, vec4 sphere) {
      vec3 m = ro - sphere.xyz;
      float b = dot(m, rd);
      float c = dot(m, m) - sphere.w*sphere.w;
      if(c > 0.0 && b > 0.0) return vec2(-1.0);
      float discr = b*b - c;
      if(discr < 0.0) return vec2(-1.0);
      float s = sqrt(discr);
      return vec2(-b - s, -b + s);
    }

    float noise1(vec2 p) {
      vec2 n = mod2(p, vec2(cellWidth));
      vec2 hh = hash(sqrt(2.0)*(n+1000.0));
      hh.x *= hh.y;
      float r = 0.225*cellWidth;
      return hh.x*smoothstep(0.0, r, -circle(p, 2.0*r))*0.25;
    }

    float noise2(vec2 p) {
      vec2 n = mod2(p, vec2(cellWidth));
      vec2 hh = hash(sqrt(2.0)*(n+1000.0));
      hh.x *= hh.y;
      rot(p, TAU*hh.y);
      float r = 0.45*cellWidth;
      return (hh.x)*smoothstep(0.0, r, -2.0*egg(p, 0.75*r, 0.5*r*abs(hh.y)))*0.275;
    }

    float height(vec2 p, float dd, int mx) {
      const float aa = 0.45, ff = 2.03, tt = 1.2, oo = 3.93;
      const float near = 0.25, far = 0.65;
      float a = 1.0, o = 0.2, s = 0.0, d = 0.0;
      for (int i = 0; i < 4; i++) {
        float nn = a * noise2(p);
        s += nn; d += abs(a);
        p += o; a *= aa; p *= ff; o *= oo; rot(p, tt);
      }
      float lod = s/d;
      float rdd = dd/MAX_DISTANCE;
      int local_mx = int(mix(float(4), float(mx), step(rdd, far)));
      for (int i = 4; i < 12; i++) {
        if (i >= local_mx) break;
        float nn = a * noise1(p);
        s += nn; d += abs(a);
        p += o; a *= aa; p *= ff; o *= oo; rot(p, tt);
      }
      return mix(s/d, lod, smoothstep(near, far, rdd));
    }

    vec3 normal(vec2 p, float d) {
      vec2 eps = vec2(0.00125, 0.0);
      return normalize(vec3(height(p - eps.xy, d, 8) - height(p + eps.xy, d, 8), 2.0*eps.x, height(p - eps.yx, d, 8) - height(p + eps.yx, d, 8)));
    }

    float march(vec3 ro, vec3 rd, out int max_iter) {
      float d = MIN_DISTANCE;
      int currentStep = 0;
      float lastd = d;
      for (int i = 0; i < MAX_ITER; i++) {
        vec3 p = ro + d*rd;
        float h = height(p.xz, d, 6);
        if (d > MAX_DISTANCE) { max_iter = i; return MAX_DISTANCE; }
        float hd = p.y - h;
        if (hd < TOLERANCE) {
          if (++currentStep >= 2) { max_iter = i; return d; }
          d = lastd; continue;
        }
        d += max(hd, TOLERANCE) * (currentStep == 0 ? 0.9 : 0.25) + 0.0025 * d;
        lastd = d;
      }
      max_iter = MAX_ITER; return MAX_DISTANCE;
    }

    vec3 skyColor(vec3 ro, vec3 rd) {
      vec3 sunDir = normalize(vec3(-0.5, 0.085, 1.0));
      float sunDot = max(dot(rd, sunDir), 0.0);
      float angle = atan(rd.y, length(rd.xz))*2.0/PI;
      vec3 sky = mix(mix(skyCol1, skyCol2, max(0.0, angle)), skyCol3, clamp(-angle*2.0, 0.0, 1.0));
      vec3 sun = 0.5*sunCol1*pow(sunDot, 20.0) + 8.0*sunCol2*pow(sunDot, 2000.0);
      vec2 si = raySphere(ro, rd, planet);
      vec3 pCol = vec3(0.0);
      if(si.x > 0.0) {
        vec3 pSurf = ro + si.x*rd;
        vec3 pNorm = normalize(pSurf - planet.xyz);
        float pDiff = max(dot(pNorm, sunDir), 0.0);
        pCol = pow(pDiff, 0.75)*vec3(0.5)*smoothstep(-0.075, 0.0, rd.y);
      }
      return pCol + sky + sun;
    }

    vec3 customTanh(vec3 x) {
      vec3 e2x = exp(2.0 * x);
      return (e2x - vec3(1.0)) / (e2x + vec3(1.0));
    }

    void main() {
      vec2 p = (gl_FragCoord.xy * 2.0 - iResolution.xy) / min(iResolution.y, iResolution.x);
      float off = 0.5 * iTime;
      vec3 ro = vec3(0.5, 0.75, -2.0 + off);
      // uMouse X and Y are used here to tilt the camera target (la)
      vec3 la = ro + vec3(uMouse.x * 2.0, -0.30 + uMouse.y * 1.0, 2.5);
      
      vec3 ww = normalize(la - ro);
      vec3 uu = normalize(cross(vec3(0.0, 1.0, 0.0), ww));
      vec3 vv = normalize(cross(ww, uu));
      vec3 rd = normalize(p.x * uu + p.y * vv + 2.0 * ww);

      int iter = 0;
      float d = march(ro, rd, iter);
      vec3 sky = skyColor(ro, rd);
      vec3 col = sky;

      if (d < MAX_DISTANCE) {
        vec3 sunDir = normalize(vec3(-0.5, 0.085, 1.0));
        vec3 pos = ro + d * rd;
        vec3 n = normal(pos.xz, d);
        float dif1 = max(0.0, dot(sunDir, n));
        vec3 shd1 = sunCol2 * mix(0.2, 1.0, pow(dif1, 0.75));
        col = mountainColor * 0.2 * skyCol3 + shd1 * mountainColor;   
        col = mix(customTanh(col), sky, smoothstep(0.5 * MAX_DISTANCE, MAX_DISTANCE, d));
      }
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

export default AlienPlanet;