import React, { useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Text, 
  Image, 
  PerspectiveCamera, 
  Environment,
  ContactShadows,
  MeshReflectorMaterial,
  Html
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X, Layers, MousePointer2 } from "lucide-react";

/**
 * Option 7: THE "INFINITE FOLD" (Origami Dimensions)
 * Stabilized No-Dependency Version (Uses Native Lerping)
 */

const caseStudies = [
  {
    id: 1,
    lines: ["From Legacy to", "Leading Edge", "AEM Migration"],
    desc: "Legacy CMS to Adobe Experience Manager transformation: 300 pages, 4,000+ assets, 4 months, zero compromises.",
    image: "/solution/11.webp",
    category: "Custom AI",
    color: "#3b82f6",
    pos: [-5, 0, 0],
  },
  {
    id: 2,
    lines: ["AI Shopping", "Experience"],
    desc: "Revolutionizing retail with agentic AI recommendations and personalized journeys that drive conversion.",
    image: "/solution/12.jfif",
    category: "Copilot AI",
    color: "#6366f1",
    pos: [-1.8, 0, 0],
  },
  {
    id: 3,
    lines: ["Market", "Sentiment", "Analysis"],
    desc: "Real-time market insights using advanced NLP models to track global trends and drive smarter decisions.",
    image: "/solution/13.webp",
    category: "Custom AI",
    color: "#06b6d4",
    pos: [1.5, 0, 0],
  },
  {
    id: 4,
    lines: ["Copilot", "Checkout", "Integration"],
    desc: "Seamless payment integration with AI-powered security and checkout optimization for higher conversions.",
    image: "/solution/14.jfif",
    category: "Copilot AI",
    color: "#2563eb",
    pos: [4.8, 0, 0],
  },
  {
    id: 5,
    lines: ["Custom", "Editor", "for WordPress"],
    desc: "Enhancing content creation with AI-driven editing tools, smart blocks, and intelligent layout suggestions.",
    image: "/solution/15.jfif",
    category: "Custom AI",
    color: "#8b5cf6",
    pos: [8, 0, 0],
  },
];

function OrigamiCard({ study, activeId, setActiveId, index }) {
  const groupRef = useRef();
  const topFlapRef = useRef();
  const bottomFlapRef = useRef();
  const [hoveredBtn, setHoveredBtn] = useState(false);
  const isActive = activeId === index;
  
  // Animation targets
  // Calculate dynamic X position based on index: starts from left (-6) with 3.3 unit spacing
  const closedX = -6.5 + (index * 3.3);
  
  const targetScale = isActive ? 1.8 : 1;
  const targetZ = isActive ? 3 : 0;
  const targetX = isActive ? 0 : closedX;
  const targetY = isActive ? 1.5 : 0;
  const targetRotation = isActive ? 0 : Math.PI / 1.2;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth lerping for the main group
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.1);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);

    // Smooth mechanical folding
    if (topFlapRef.current) {
      topFlapRef.current.rotation.x = THREE.MathUtils.lerp(topFlapRef.current.rotation.x, targetRotation, 0.1);
    }
    if (bottomFlapRef.current) {
      bottomFlapRef.current.rotation.x = THREE.MathUtils.lerp(bottomFlapRef.current.rotation.x, -targetRotation, 0.1);
    }
  });

  return (
    <group
      ref={groupRef}
      position={[closedX, 0, 0]}
      onClick={() => setActiveId(isActive ? null : index)}
    >
      {/* Front Face - Title only, Poppins ExtraBold matching original */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2.5, 3.8]} />
        <meshStandardMaterial color="#000e34" roughness={0.1} metalness={0.5} />
        <Text
          position={[0, 0, 0.05]}
          fontSize={0.28}
          color="white"
          anchorY="middle"
          maxWidth={2.2}
          textAlign="center"
          lineHeight={1.15}
        >
          {study.lines.join("\n").toUpperCase()}
        </Text>
      </mesh>

      {/* Folding Flap - Top Half: Image */}
      <group ref={topFlapRef} position={[0, 1.9, 0]}>
        <mesh position={[0, -1.3, 0.02]}>
          <planeGeometry args={[2.5, 2.6]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.1} metalness={0.8} />
          {isActive && (
            <Image 
              url={study.image} 
              scale={[2.4, 2.5]} 
              position={[0, 0, 0.01]} 
              opacity={0.95}
            />
          )}
        </mesh>
      </group>

      {/* Folding Flap - Bottom Half: Description */}
      <group ref={bottomFlapRef} position={[0, -1.9, 0]}>
        <mesh position={[0, 0.6, 0.02]}>
          <planeGeometry args={[2.5, 1.2]} />
          <meshStandardMaterial color="#020c28" roughness={0.3} metalness={0.4} />
          {isActive && (
            <>
              <Text
                position={[0, 0.15, 0.05]}
                fontSize={0.105}
                color="#d1d5db"
                maxWidth={2.3}
                textAlign="center"
                lineHeight={1.5}
                anchorY="middle"
              >
                {study.desc}
              </Text>
              
              {/* Explore Case Study 3D Button */}
              <group position={[0, -0.3, 0.05]}>
                <mesh 
                  onPointerOver={() => setHoveredBtn(true)}
                  onPointerOut={() => setHoveredBtn(false)}
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    console.log("Explore:", study.id);
                  }}
                >
                  <planeGeometry args={[1.1, 0.25]} />
                  <meshStandardMaterial 
                    color={hoveredBtn ? "#ffffff" : "#2563eb"} 
                    emissive={hoveredBtn ? "#ffffff" : "#000000"}
                    emissiveIntensity={hoveredBtn ? 0.8 : 0}
                    roughness={0.2} 
                    metalness={0.5} 
                  />
                  <Text
                    position={[0, 0, 0.01]}
                    fontSize={0.06}
                    color={hoveredBtn ? "#000000" : "#ffffff"}
                    anchorY="middle"
                    letterSpacing={0.2}
                    fontWeight={900}
                  >
                    EXPLORE CASE
                  </Text>
                </mesh>
              </group>
            </>
          )}
        </mesh>
      </group>

      {/* Shine / glow border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.6, 3.9]} />
        <meshBasicMaterial color={study.color} transparent opacity={isActive ? 0.35 : 0.12} />
      </mesh>
    </group>
  );
}

export default function SolutionsCaseStudies() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section 
      id="case-studies-fold"
      className="relative w-full h-[100vh] bg-[#000e34] overflow-hidden flex flex-col scroll-mt-24 md:scroll-mt-32"
    >
      {/* ── TOP: Heading & Filters ── */}
      <div className="relative z-20 px-12 md:px-20 pt-12 pb-4 flex flex-col md:flex-row justify-between items-start gap-6 shrink-0">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-blue-400 font-black text-[10px] uppercase tracking-[0.5em]">
            <Layers size={14} /> Real World Impact
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            Case <span className="text-blue-500">Studies</span>
          </h2>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <button 
            onClick={() => document.getElementById('custom-ai-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[10px] font-black text-blue-400/80 hover:text-white hover:bg-blue-500/20 border border-blue-500/30 px-5 py-3 rounded-lg uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(75,181,248,0.15)] bg-[#04153b]/50 backdrop-blur-md"
          >
            Custom AI
          </button>
          <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
          <button 
            onClick={() => document.getElementById('copilot-ai-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[10px] font-black text-blue-400/80 hover:text-white hover:bg-blue-500/20 border border-blue-500/30 px-5 py-3 rounded-lg uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(75,181,248,0.15)] bg-[#04153b]/50 backdrop-blur-md"
          >
            Copilot AI
          </button>
        </div>
      </div>

      {/* ── BOTTOM: 3D Canvas fills remaining space ── */}
      <div className="relative flex-1 w-full min-h-0">
        <div className="absolute inset-0 cursor-pointer">
          <Canvas dpr={[1, 2]} shadows gl={{ antialias: true }}>
            <PerspectiveCamera makeDefault position={[0, 3, 9]} fov={55} />
            <color attach="background" args={["#000e34"]} />
            <fog attach="fog" args={["#000e34", 10, 25]} />

            <Suspense fallback={<Html center><div className="text-blue-400 font-black animate-pulse tracking-[1em] uppercase bg-black/50 p-10 rounded-full">Constructing Folds...</div></Html>}>
               <Environment preset="city" />
               <ambientLight intensity={0.5} />
               <spotLight position={[10, 10, 10]} intensity={1} castShadow />

               <group position={[0, 2.5, 0]}>
                  {caseStudies.map((study, i) => (
                    <OrigamiCard 
                      key={study.id} 
                      study={study} 
                      index={i} 
                      activeId={activeId} 
                      setActiveId={setActiveId}
                    />
                  ))}
               </group>

               <ContactShadows 
                 position={[0, -4.5, 0]} 
                 opacity={0.4} 
                 scale={20} 
                 blur={1.5} 
                 far={10} 
               />

               <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
                  <planeGeometry args={[50, 50]} />
                  <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={2048}
                    mixBlur={1}
                    mixStrength={40}
                    roughness={1}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#050505"
                    metalness={0.5}
                  />
               </mesh>
            </Suspense>
          </Canvas>
        </div>

        {/* Hint and Recollapse Button */}
        <div className="absolute bottom-6 left-12 right-12 z-30 flex justify-between items-end pointer-events-none">
          <div className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold flex items-center gap-3">
            <MousePointer2 size={12} /> Click to Unfold
          </div>
          
          {activeId !== null && (
            <button 
              onClick={() => setActiveId(null)}
              className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl pointer-events-auto hover:bg-blue-600 hover:text-white transition-all flex items-center gap-4 shadow-2xl"
            >
              Recollapse Dimensions <X size={16} />
            </button>
          )}
        </div>

        {/* Gradient vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,14,52,0.6)_100%)]" />
      </div>
    </section>
  );
}
