import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';
import WebGLDisposer from './WebGLDisposer';


function TunnelPlane() {
    const meshRef = useRef();
    const texture = useTexture('/src/assets/blogs/blog.gif');

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    useFrame((state) => {
        meshRef.current.rotation.z += 0.0008;
        texture.offset.y -= 0.001;
    });

    return (
        <mesh ref={meshRef} rotation={[0, 0, 0]}>
            <planeGeometry args={[10, 6]} />
            <meshBasicMaterial
                map={texture}
                toneMapped={false}
            />
        </mesh>
    );
}

export default function BlogHero3D() {
    return (
        
<Canvas
            camera={{ position: [0, 0, 5] }}
            className="absolute inset-0"
        >
                <WebGLDisposer />
            <TunnelPlane />
        </Canvas>

    );
}