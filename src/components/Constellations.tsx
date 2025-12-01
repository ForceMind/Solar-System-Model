import React, { useMemo } from 'react';
import { Line, Html } from '@react-three/drei';
import { constellations, getStarPosition } from '../data/constellations';
import { useLanguage } from '../contexts/LanguageContext';
import * as THREE from 'three';

export const Constellations: React.FC = () => {
  const { language } = useLanguage();
  const radius = 400; // Slightly smaller than background sphere

  return (
    <group>
      {constellations.map((constellation, idx) => {
        const starPositions = constellation.stars.map(star => 
          new THREE.Vector3(...getStarPosition(star.ra, star.dec, radius))
        );

        // Calculate center for label
        const center = starPositions.reduce((acc, pos) => acc.add(pos), new THREE.Vector3()).divideScalar(starPositions.length);

        return (
          <group key={idx}>
            {/* Stars */}
            {starPositions.map((pos, i) => (
              <mesh key={i} position={pos}>
                <sphereGeometry args={[0.8, 8, 8]} />
                <meshBasicMaterial color="#FFF" />
              </mesh>
            ))}

            {/* Lines */}
            {constellation.lines.map((lineIndices, i) => (
              <Line
                key={i}
                points={[starPositions[lineIndices[0]], starPositions[lineIndices[1]]]}
                color="#4444ff"
                opacity={0.4}
                transparent
                lineWidth={1}
              />
            ))}

            {/* Label */}
            <Html position={center} distanceFactor={500} transform sprite>
              <div className="text-hologram-blue text-xs font-orbitron opacity-70 whitespace-nowrap select-none pointer-events-none">
                {language === 'zh' ? constellation.nameZh : constellation.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
