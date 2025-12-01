import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSimulation } from '../contexts/SimulationContext';

export const TimeDisplay: React.FC = () => {
  const { t } = useLanguage();
  const { speed, setSpeed, isPaused, setIsPaused } = useSimulation();
  const dateRef = useRef(new Date());
  const displayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined && !isPaused) {
      const delta = (time - previousTimeRef.current) / 1000;
      
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
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [speed, isPaused]);

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center pointer-events-auto z-50 w-full max-w-md px-4">
        <div className="w-full bg-black/80 border border-hologram-blue px-6 py-4 rounded-2xl backdrop-blur-md flex flex-col items-center gap-3 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
          <div className="text-xs text-hologram-blue font-orbitron text-center tracking-widest uppercase">{t.timeAxis}</div>
          <div ref={displayRef} className="text-2xl font-mono text-white tracking-[0.2em] font-bold text-shadow-glow">
            {dateRef.current.toISOString().split('T')[0]}
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between w-full gap-4">
            <button 
                onClick={() => setSpeed(speed > 0 ? -1 : 1)}
                className="text-hologram-blue hover:text-white hover:bg-hologram-blue/20 text-xs border border-hologram-blue px-3 py-1.5 rounded transition-all font-orbitron"
            >
                {speed > 0 ? 'REV' : 'FWD'}
            </button>

            <div className="flex-1 flex items-center gap-2">
                <span className="text-xs text-gray-400 font-mono">0.1x</span>
                <input 
                    type="range" 
                    min="0.1" 
                    max="5" 
                    step="0.1" 
                    value={Math.abs(speed)}
                    onChange={(e) => setSpeed(parseFloat(e.target.value) * (speed < 0 ? -1 : 1))}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-hologram-blue"
                />
                <span className="text-xs text-gray-400 font-mono">5x</span>
            </div>

            <button 
                onClick={() => setIsPaused(!isPaused)}
                className={`w-8 h-8 flex items-center justify-center rounded-full border ${isPaused ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'} hover:bg-white/10 transition-all`}
            >
                {isPaused ? '▶' : '❚❚'}
            </button>
          </div>
          
          {/* Progress Bar Decoration */}
          <div className="w-full h-0.5 bg-gray-800 relative overflow-hidden rounded-full mt-1">
             <div ref={progressRef} className="absolute top-0 left-0 w-1/3 h-full bg-hologram-blue shadow-[0_0_10px_#00f3ff]" />
          </div>
        </div>
    </div>
  );
};
