import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import FractalDisk from './FractalDisk';
import WebGLDisposer from './WebGLDisposer';


export default function RotatingCircle() {
  const [targetRotation, setTargetRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || isHovered) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      setTargetRotation(angle);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-full select-none flex items-center justify-center"
    >
      
<Canvas 
        camera={{ position: [0, 0, 2] }} 
        gl={{ antialias: true, alpha: true }}
      >
                <WebGLDisposer />
        <FractalDisk targetRotation={targetRotation} isHovered={isHovered} />
      </Canvas>


      <div 
        style={{ transform: `rotate(${targetRotation}rad)`, opacity: isHovered ? 0 : 0.6 }}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#57c2ff] rounded-full shadow-[0_0_8px_#57c2ff]" />
      </div>
    </div>
  );
}