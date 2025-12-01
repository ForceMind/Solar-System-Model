import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, TextureLoader } from 'three';
import { Html, useTexture } from '@react-three/drei';
import { PlanetData } from '../data/planets';
import { useLanguage } from '../contexts/LanguageContext';
import { useSimulation } from '../contexts/SimulationContext';

interface PlanetProps {
  data: PlanetData;
  onSelect: (planet: PlanetData) => void;
  onFocus: (planet: PlanetData, position: [number, number, number]) => void;
}

export const Planet: React.FC<PlanetProps> = ({ data, onSelect, onFocus }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { language } = useLanguage();
  const { speed, isPaused } = useSimulation();
  
  // Load textures
  const texture = useTexture(data.textureUrl);
  const ringTexture = data.ringUrl ? useTexture(data.ringUrl) : null;

  // Random starting angle
  const initialAngle = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }, delta) => {
    if (meshRef.current && !isPaused) {
      // Use delta for smoother updates independent of frame rate, but we need accumulated time for orbit
      // Actually, we can just increment rotation based on speed * delta
      
      // Orbit
      // We need to maintain current angle state if we want to support pause/speed change correctly
      // instead of using clock.getElapsedTime() which is monotonic.
      
      // Let's store current angle in a ref
      initialAngle.current += data.speed * speed * delta * 60 * 0.01; // Adjust multiplier for reasonable speed

      const x = Math.cos(initialAngle.current) * data.distance;
      const z = Math.sin(initialAngle.current) * data.distance;
      meshRef.current.position.set(x, 0, z);
      
      // Self rotation
      meshRef.current.rotation.y += 0.005 * (speed > 0 ? 1 : -1);
    }
  });

  return (
    <group>
      {/* Orbit Path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.distance - 0.2, data.distance + 0.2, 128]} />
        <meshBasicMaterial color="#666" opacity={0.5} transparent side={2} />
      </mesh>

      {/* Planet Mesh */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
            e.stopPropagation();
            onSelect(data);
        }}
        onDoubleClick={(e) => {
            e.stopPropagation();
            if (meshRef.current) {
                onFocus(data, [meshRef.current.position.x, meshRef.current.position.y, meshRef.current.position.z]);
            }
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[data.radius, 64, 64]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.7}
          metalness={0.2}
        />
        
        {/* Rings */}
        {data.ringUrl && (
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[data.radius * 1.4, data.radius * 2.2, 64]} />
                <meshStandardMaterial map={ringTexture} side={2} transparent opacity={0.8} />
            </mesh>
        )}

        {/* Moons */}
        {data.moons && data.moons.map((moon, idx) => (
            <Moon key={idx} data={moon} planetRadius={data.radius} speedMultiplier={speed} isPaused={isPaused} />
        ))}
        
        {/* Label */}
        {hovered && (
          <Html distanceFactor={15}>
            <div className="bg-black/80 text-white px-2 py-1 rounded border border-hologram-blue text-xs font-orbitron whitespace-nowrap pointer-events-none select-none">
              {language === 'zh' ? data.nameZh : data.name}
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
};

// Sub-component for Moon to handle its own orbit relative to planet
const Moon = ({ data, planetRadius, speedMultiplier, isPaused }: { data: any, planetRadius: number, speedMultiplier: number, isPaused: boolean }) => {
    const moonRef = useRef<Mesh>(null);
    const angleRef = useRef(Math.random() * Math.PI * 2);

    useFrame((_, delta) => {
        if (moonRef.current && !isPaused) {
            angleRef.current += data.speed * speedMultiplier * delta * 60 * 0.05; // Faster than planets
            const x = Math.cos(angleRef.current) * (planetRadius + data.distance);
            const z = Math.sin(angleRef.current) * (planetRadius + data.distance);
            moonRef.current.position.set(x, 0, z);
        }
    });

    return (
        <mesh ref={moonRef}>
            <sphereGeometry args={[data.radius, 16, 16]} />
            <meshStandardMaterial color={data.color} />
        </mesh>
    );
};
