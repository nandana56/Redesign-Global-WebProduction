import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import WebGLDisposer from './WebGLDisposer';


const LandscapeMaterial = shaderMaterial(
  {
    iTime: 0,
    iResolution: new THREE.Vector2(),
    iChannel0: null,
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform sampler2D iChannel0;

  const vec4 hsv2rgb_K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  #define HSV2RGB(c)  (c.z * mix(hsv2rgb_K.xxx, clamp(abs(fract(c.xxx + hsv2rgb_K.xyz) * 6.0 - hsv2rgb_K.www) - hsv2rgb_K.xxx, 0.0, 1.0), c.y))

  vec3 hsv2rgb(vec3 c) {
    vec3 p = abs(fract(c.xxx + hsv2rgb_K.xyz) * 6.0 - hsv2rgb_K.www);
    return c.z * mix(hsv2rgb_K.xxx, clamp(p - hsv2rgb_K.xxx, 0.0, 1.0), c.y);
  }

  const float fft_limit=0.5, fov=2., OFF=.7, tomb_probability=0.3;
  const vec2 camera_direction=vec2(-.5,.1), camera_pos=vec2(25,3.3);
  const vec3 LD=normalize(vec3(1,-.5,1)), RN=normalize(vec3(-0.2,1,-1.1));
  const vec4 GG=vec4(vec3(-700,300,1000),400.);
  const float PI=3.141592654, TAU=2.*PI, PI_2=.5*PI, ZZ =11.;
  const vec2 PA=vec2(6,1.41), PB=vec2(.056,.035);
  const mat2 R_mat=mat2(1.2,1.6,-1.6,1.2);

  float hash(vec2 co) { return fract(sin(dot(co.xy ,vec2(12.9898,58.233))) * 13758.5453); }

  float beat() {
    float b=0., c=0., f;
    for(float x=.025;x<.2;x+=.025) {
      f=textureLod(iChannel0,vec2(x,.25),0.).x*(1.+.5*x);
      b+=smoothstep(.0,.1,f-.7);
      ++c;
    }
    return 2.*b/c;
  }

  float freq(float x) {
    x=fract(x)*.5+0.025;
    return textureLod(iChannel0,vec2(x,.25),0.).x*(1.+.5*x);
  }

  vec3 tanh_approx(vec3 x) {
    vec3 x2 = x*x;
    return clamp(x*(27.0 + x2)/(27.0+9.0*x2), -1.0, 1.0);
  }

  float atan_approx(float y, float x) {
    float cosatan2 = x / (abs(x) + abs(y));
    float t = PI_2 - cosatan2 * PI_2;
    return y < 0.0 ? -t : t;
  }

  float acos_approx(float x) { return atan_approx(sqrt(max(.0, 1. - x*x)), x); }

  vec3 to_spherical(vec3 p) {
    float r = length(p);
    return vec3(r, acos_approx(p.z/r), atan_approx(p.y, p.x));
  }

  vec3 stars(vec3 R_vec) {
    float Z_stars=TAU/200.;
    vec3 col=vec3(0);
    float a=1.;
    for(int i=0;i<3;++i) {
      R_vec=R_vec.zxy;
      vec3 sph = to_spherical(R_vec);
      vec2 s=sph.yz, n=floor(s/Z_stars+.5), c=s-Z_stars*n;
      float h=sin(s.x), h0=hash(n+123.4*float(i+1)), h1=fract(8887.*h0), h3=fract(9677.*h0);
      c.y*=h;
      col += a*hsv2rgb(vec3(-.4*h1,sqrt(h3),step(h0,.1*h)*h1*vec3(7e-6)/max(7e-7,dot(c,c))));
      Z_stars*=.5; a*=.5;
    }
    return col;
  }

  float ray_sphere(vec3 ro, vec3 rd, vec4 sph) {
    vec3 oc=ro - sph.xyz;
    float b=dot(oc, rd), c=dot(oc, oc)- sph.w*sph.w, h=b*b-c;
    if(h<0.) return -1.;
    return -b-sqrt(h);
  }

  float ray_plane(vec3 ro, vec3 rd, vec4 p) { return -(dot(ro,p.xyz)+p.w)/dot(rd,p.xyz); }
  float doctahedron(vec3 p, float s) { p = abs(p); return (p.x+p.y+p.z-s)*0.57735027; }
  vec3 path(float z) { return vec3(camera_pos+PA*cos(PB*z),z); }
  vec3 dpath(float z) { return vec3(-PA*PB*sin(PB*z),1); }
  vec3 ddpath(float z) { return vec3(-PA*PB*PB*cos(PB*z),0); }

  float dfbm(vec3 p) {
    float d=p.y+.6, a=1.;
    vec2 D=vec2(0), P_vec=.23*p.xz;
    vec4 o_vec;
    for(int j=0;j<7;++j) {
      o_vec=cos(P_vec.xxyy+vec4(11,0,11,0));
      vec3 next_p=o_vec.yxx*o_vec.zwz;
      D+=next_p.xy;
      d-=a*(1.+next_p.z)/(1.+3.*dot(D,D));
      P_vec*=R_mat;
      a*=.55;
    }
    return d;
  }

  float dpyramid(vec3 p, out vec3 oo) {
    vec2 n=floor(p.xz/ZZ+.5);
    p.xz-=n*ZZ;
    float h0=hash(n), h1=fract(9677.*h0), h =.3*ZZ*h0*h0+0.1, d =doctahedron(p,h);
    oo=vec3(1e3,0,0);
    if(h1>tomb_probability) return 1e3;
    oo=vec3(d,h0,h);
    return d;
  }

  float df(vec3 p, out vec3 oo) {
    float d0=dfbm(vec3(p.x, abs(p.y), p.z)), d1=dpyramid(p,oo);
    return min(d0,d1);
  }

  float fbm(float x) {
    float a=1., h=0.;
    for(int i=0;i<5;++i) {
      h+=a*sin(x); x*=2.03; x+=123.4; a*=.55;
    }
    return abs(h);
  }

  vec4 render(vec2 p2, vec2 q2) {
    vec3 BY=HSV2RGB(vec3(.05+OFF,.7,.8)), BG=HSV2RGB(vec3(.95+OFF,.6,.3)), BW=HSV2RGB(vec3(.55+OFF,.3,2.)), BF=HSV2RGB(vec3(.82+OFF,.6,2.)), FC=HSV2RGB(vec3(.3,.7,.15));
    float d=1., z=0., T=3.*iTime, B=beat(), F, L;
    vec3 O = vec3(0.0);
    vec3 oo, p, P=path(T), ZZ_vec=normalize(dpath(T)+vec3(camera_direction,0)), XX=normalize(cross(ZZ_vec,vec3(0,1,0)+ddpath(T))), YY=cross(XX,ZZ_vec), R_vec=normalize(-p2.x*XX+p2.y*YY+fov*ZZ_vec), Y=(1.+R_vec.x)*BY, S=(1.+R_vec.y)*BW*Y;
    vec4 M;
    for(int i=0;i<50&&d>1e-5&&z<2e2;++i) {
      p=z*R_vec+P; d=df(p,oo);
      if(p.y>0.) O+=BG+min(d,9.)*Y; else { O+=S; oo.x*=9.; }
      O+= B * smoothstep(oo.z*.78,oo.z*.8,abs(p.y)) / max(oo.x+oo.x*oo.x*oo.x*oo.x*9.,3e-2) * BF;
      z+=d*.7;
    }
    O*=9E-3;
    if(R_vec.y>0.0) {
      M=GG; vec3 S_sky=M.xyz+P; M.xyz=S_sky; float d_sph=ray_sphere(P,R_vec,M);
      F=smoothstep(0.0,0.2,R_vec.y);
      vec3 Y_sky=clamp((hsv2rgb(vec3(OFF-.4*R_vec.y,.5+1.*R_vec.y,3./(1.+800.*R_vec.y*R_vec.y*R_vec.y)))),0.,1.);
      L=dot(vec3(0.2126, 0.7152, 0.0722),Y_sky);
      if(d_sph>0.) { vec3 p_sky=P+R_vec*d_sph; vec3 ZZ_sky=normalize(p_sky-M.xyz); Y_sky+= max(dot(LD,ZZ_sky),0.) * F * smoothstep(1.0,.89,1.+dot(R_vec,ZZ_sky)) * fbm(2e-2*dot(p_sky-S_sky,RN)); }
      M=vec4(RN,-dot(RN,S_sky)); float z_plane=ray_plane(P,R_vec,M);
      if(z_plane>0.&&(d_sph>0.&&z_plane<d_sph||d_sph==-1.)) {
        vec3 p_plane=P+R_vec*z_plane; float dist=distance(S_sky,p_plane);
        Y_sky+= F * smoothstep(GG.w*1.41,GG.w*1.46,dist) * smoothstep(GG.w*2.,GG.w*1.95,dist) * ( smoothstep(fft_limit , 1.01 , freq(1.5*abs(dist-GG.w*1.48)/GG.w)) * hsv2rgb(vec3(OFF-.7+dist/GG.w,.9,9.)) + abs(dot(LD,RN))*fbm(.035*dist) );
      }
      if(d_sph==-1.) Y_sky+=pow(max(0.,1.-L),4.)*stars(R_vec);
      O*=Y_sky;
    }
    // O-=(length(-1.+2.*q2)+.2)*FC; 
    O=tanh_approx(O); O=max(O,0.0); O*=smoothstep(0.,6., iTime-p2.y*p2.y); O=sqrt(O);
    return vec4(O,1.0);
  }

  void main() {
    vec2 p2 = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;
    vec2 q2 = gl_FragCoord.xy / iResolution.xy;
    gl_FragColor = render(p2, q2);
  }
  `
);

extend({ LandscapeMaterial });

const ShaderCanvas = () => {
  const meshRef = useRef();
  const { size, viewport } = useThree();

  const dummyAudioTexture = useMemo(() => {
    const data = new Uint8Array(512 * 4);
    const texture = new THREE.DataTexture(data, 512, 1, THREE.RGBAFormat);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.iTime = state.clock.getElapsedTime();
      meshRef.current.iResolution.set(size.width, size.height);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <landscapeMaterial
        ref={meshRef}
        iChannel0={dummyAudioTexture}
      />
    </mesh>
  );
};

export default function FractalLandscape() {
  return (
    <div className="w-full h-full"> {/* Remove bg-black here if the parent has it */}
      
<Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{
          antialias: true,
          alpha: false, // Set to false for deep, rich blacks from the shader
          powerPreference: "high-performance"
        }}
        style={{ pointerEvents: 'none' }} // Ensures clicks pass through to text/buttons
      >
                <WebGLDisposer />
        <ShaderCanvas />
      </Canvas>

    </div>
  );
}