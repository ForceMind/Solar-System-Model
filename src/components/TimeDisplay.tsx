import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useLanguage } from '../contexts/LanguageContext';
import { useSimulation } from '../contexts/SimulationContext';

export const TimeDisplay: React.FC = () => {
  const { t } = useLanguage();
  const { speed, setSpeed, isPaused, setIsPaused } = useSimulation();
  const dateRef = useRef(new Date());
  const displayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useFrame((_, delta) => {
    if (isPaused) return;

    // Update date based on delta time and speed
    const daysToAdd = delta * 5 * speed; 
    
    const newDate = new Date(dateRef.current);
    newDate.setDate(newDate.getDate() + daysToAdd);
    dateRef.current = newDate;

    if (displayRef.current) {
        displayRef.current.innerText = newDate.toISOString().split('T')[0];
    }
    
    if (progressRef.current) {
        const progress = (newDate.getTime() / 10000000) % 100;
        progressRef.current.style.left = `${progress}%`;
    }
  });

  return (
    <Html fullscreen style={{ pointerEvents: 'none' }}>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center pointer-events-auto">
        <div className="bg-black/80 border border-hologram-blue px-6 py-4 rounded-2xl backdrop-blur-md flex flex-col items-center gap-3">
          <div className="text-xs text-hologram-blue font-orbitron text-center">{t.timeAxis}</div>
          <div ref={displayRef} className="text-xl font-mono text-white tracking-widest">
            {dateRef.current.toISOString().split('T')[0]}
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-4">
            <button 
                onClick={() => setSpeed(speed > 0 ? -1 : 1)}
                className="text-hologram-blue hover:text-white text-xs border border-hologram-blue px-2 py-1 rounded"
            >
                {speed > 0 ? 'REV' : 'FWD'}
            </button>
            
            <button 
                onClick={() => setIsPaused(!isPaused)}
                className="text-white hover:text-hologram-blue"
            >
                {isPaused ? '▶' : '⏸'}
            </button>

            <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400">{t.speed}</span>
                <input 
                    type="range" 
                    min="0.1" 
                    max="5" 
                    step="0.1" 
                    value={Math.abs(speed)}
                    onChange={(e) => setSpeed(parseFloat(e.target.value) * (speed < 0 ? -1 : 1))}
                    className="w-24 accent-hologram-blue"
                />
                <span className="text-[10px] text-hologram-blue w-8">{Math.abs(speed).toFixed(1)}x</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-64 h-1 bg-gray-800 mt-1 rounded-full overflow-hidden relative">
             <div className="absolute top-0 left-0 h-full bg-hologram-blue animate-pulse w-full opacity-50"></div>
             <div 
                ref={progressRef}
                className="absolute top-0 h-full bg-white w-2"
             />
          </div>
        </div>
      </div>
    </Html>
  );
};
