import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useTexture } from '@react-three/drei';

export const Sun = () => {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/sunmap.jpg');

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[8, 64, 64]} />
      <meshStandardMaterial 
        map={texture} 
        emissiveMap={texture}
        emissive="#ffffff"
        emissiveIntensity={0.6}
        color="#ffffff"
      />
      <pointLight intensity={2} distance={300} decay={1} color="#ffffff" />
    </mesh>
  );
};
