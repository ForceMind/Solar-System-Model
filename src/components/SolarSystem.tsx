import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { planets, PlanetData } from '../data/planets';
import { GestureController } from './GestureController';
import { Constellations } from './Constellations';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { useLanguage } from '../contexts/LanguageContext';

interface SolarSystemProps {
  onPlanetSelect: (planet: PlanetData) => void;
}

// Helper component to handle camera animation
const CameraController = ({ 
    focusedPosition, 
    controlsRef 
}: { 
    focusedPosition: [number, number, number] | null,
    controlsRef: React.RefObject<OrbitControlsImpl>
}) => {
    const { camera } = useThree();

    useEffect(() => {
        if (controlsRef.current) {
            if (focusedPosition) {
                const target = new THREE.Vector3(...focusedPosition);
                const offset = new THREE.Vector3(5, 2, 5); // Closer offset
                const newPos = target.clone().add(offset);
                
                camera.position.copy(newPos);
                controlsRef.current.target.copy(target);
            } else {
                // Reset to default view
                camera.position.set(0, 50, 100);
                controlsRef.current.target.set(0, 0, 0);
            }
            controlsRef.current.update();
        }
    }, [focusedPosition, camera, controlsRef]);

    return null;
};

export const SolarSystem: React.FC<SolarSystemProps> = ({ onPlanetSelect }) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [focusedPlanetPos, setFocusedPlanetPos] = useState<[number, number, number] | null>(null);
  const [showConstellations, setShowConstellations] = useState(false);
  const { language } = useLanguage();

  const handleGesture = (type: 'IDLE' | 'PAN' | 'ZOOM', delta: { x: number, y: number, scale: number }) => {
    if (!controlsRef.current) return;

    if (type === 'PAN') {
      // Adjust angles
      // Increase sensitivity
      const sensitivity = 10.0;
      
      // Use setAzimuthalAngle and setPolarAngle for more reliable control if rotateLeft fails
      // But rotateLeft is standard. Let's try to force update.
      // Also check if delta is significant.
      
      const currentAzimuth = controlsRef.current.getAzimuthalAngle();
      const currentPolar = controlsRef.current.getPolarAngle();
      
      controlsRef.current.setAzimuthalAngle(currentAzimuth + delta.x * sensitivity);
      controlsRef.current.setPolarAngle(currentPolar + delta.y * sensitivity);
      
      controlsRef.current.update();
    } else if (type === 'ZOOM') {
      if (delta.scale > 0) {
        controlsRef.current.dollyOut(1 + Math.abs(delta.scale));
      } else {
        controlsRef.current.dollyIn(1 + Math.abs(delta.scale));
      }
      controlsRef.current.update();
    }
  };

  const handlePlanetFocus = (planet: PlanetData, pos: [number, number, number]) => {
      setFocusedPlanetPos(pos);
      onPlanetSelect(planet);
  };

  const handleResetFocus = () => {
      setFocusedPlanetPos(null);
  };

  return (
    <>
      <GestureController onGesture={handleGesture} />
      <Canvas camera={{ position: [0, 50, 100], fov: 45, far: 20000 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <Stars radius={5000} depth={500} count={20000} factor={7} saturation={0} fade speed={1} />
          <Stars radius={3000} depth={500} count={5000} factor={10} saturation={1} fade speed={2} />
          
          {/* Background Galaxy/Nebula effect using a large sphere with backside */}
          <mesh>
             <sphereGeometry args={[450, 64, 64]} />
             <meshBasicMaterial color="#050520" side={THREE.BackSide} />
          </mesh>

          {showConstellations && <Constellations />}

          <Sun onSelect={onPlanetSelect} />
          <CameraController focusedPosition={focusedPlanetPos} controlsRef={controlsRef} />
          
          {planets.map((planet) => (
            <Planet 
              key={planet.name} 
              data={planet} 
              onSelect={onPlanetSelect} 
              onFocus={handlePlanetFocus}
            />
          ))}

          <OrbitControls 
            ref={controlsRef}
            enablePan={true} 
            minDistance={5} 
            maxDistance={500}
          />
        </Suspense>
      </Canvas>

      {/* Constellation Toggle */}
      <div className="absolute top-4 right-4 z-50 pointer-events-auto">
        <button
            onClick={() => setShowConstellations(!showConstellations)}
            className={`px-4 py-2 rounded-full border border-hologram-blue backdrop-blur-md font-orbitron text-xs transition-all ${
                showConstellations ? 'bg-hologram-blue text-black' : 'bg-black/50 text-hologram-blue hover:bg-hologram-blue/20'
            }`}
        >
            {language === 'zh' ? (showConstellations ? '隐藏星座' : '显示星座') : (showConstellations ? 'Hide Constellations' : 'Show Constellations')}
        </button>
      </div>

      {focusedPlanetPos && (
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 pointer-events-auto z-50">
            <button 
                onClick={handleResetFocus}
                className="bg-hologram-blue/20 hover:bg-hologram-blue/40 text-white border border-hologram-blue px-6 py-2 rounded-full backdrop-blur-md font-orbitron transition-all"
            >
                {language === 'zh' ? '返回太阳系' : 'Back to Solar System'}
            </button>
        </div>
      )}
    </>
  );
};
