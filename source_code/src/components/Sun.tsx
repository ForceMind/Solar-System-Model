import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useTexture } from '@react-three/drei';
import { PlanetData, sunData } from '../data/planets';

interface SunProps {
  onSelect?: (data: PlanetData) => void;
}

export const Sun: React.FC<SunProps> = ({ onSelect }) => {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/sunmap.jpg');

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh 
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(sunData);
      }}
    >
      <sphereGeometry args={[8, 64, 64]} />
      <meshStandardMaterial 
        map={texture} 
        emissiveMap={texture}
        emissive="#ffffff"
        emissiveIntensity={2}
        color="#ffffff"
      />
      <pointLight intensity={8} distance={2000} decay={0.2} color="#ffffff" />
    </mesh>
  );
};
