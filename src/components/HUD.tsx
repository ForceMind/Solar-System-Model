import React, { useEffect, useState } from 'react';
import { PlanetData } from '../data/planets';
import { fetchNEOs, NEO } from '../services/nasa';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface HUDProps {
  selectedPlanet: PlanetData | null;
  onClose: () => void;
}

export const HUD: React.FC<HUDProps> = ({ selectedPlanet, onClose }) => {
  const [neos, setNeos] = useState<NEO[]>([]);
  const [showNeos, setShowNeos] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    if (showNeos && neos.length === 0) {
      fetchNEOs().then(setNeos);
    }
  }, [showNeos]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-auto">
        <div>
          <h1 className="text-4xl font-orbitron text-hologram-blue tracking-widest drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
            {t.title}
          </h1>
          <div className="text-xs text-gray-400 mt-1 font-mono">
            {t.systemStatus}
          </div>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="bg-space-blue/80 border border-hologram-blue text-hologram-blue px-4 py-2 rounded hover:bg-hologram-blue/20 transition-colors font-orbitron text-sm"
          >
            {t.switchLang}
          </button>
          <button 
            onClick={() => setShowNeos(!showNeos)}
            className="bg-space-blue/80 border border-hologram-blue text-hologram-blue px-4 py-2 rounded hover:bg-hologram-blue/20 transition-colors font-orbitron text-sm"
          >
            {showNeos ? t.hideNeo : t.scanSector}
          </button>
        </div>
      </div>

      {/* Planet Info Panel */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            className="absolute right-0 top-20 bottom-20 w-80 bg-space-black/90 border-l border-hologram-blue p-6 pointer-events-auto overflow-y-auto backdrop-blur-md"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
            
            <h2 className="text-3xl font-orbitron text-white mb-2">
              {language === 'zh' ? selectedPlanet.nameZh : selectedPlanet.name}
            </h2>
            <div className="h-0.5 w-full bg-gradient-to-r from-hologram-blue to-transparent mb-6" />
            
            <div className="space-y-6 font-mono text-sm">
              <div>
                <label className="text-gray-500 block mb-1">{t.description}</label>
                <p className="text-gray-300 leading-relaxed">
                  {language === 'zh' ? selectedPlanet.descriptionZh : selectedPlanet.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-500 block mb-1">{t.distance}</label>
                  <span className="text-hologram-blue">{selectedPlanet.distance} AU</span>
                </div>
                <div>
                  <label className="text-gray-500 block mb-1">{t.radius}</label>
                  <span className="text-hologram-blue">{selectedPlanet.radius} R</span>
                </div>
                <div>
                  <label className="text-gray-500 block mb-1">{t.orbitSpeed}</label>
                  <span className="text-hologram-blue">{selectedPlanet.speed}</span>
                </div>
              </div>

              {selectedPlanet.moons && (
                <div>
                  <label className="text-gray-500 block mb-2">{t.moonsDetected}</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlanet.moons.map(moon => (
                      <span key={moon.name} className="px-2 py-1 bg-white/10 rounded text-xs">
                        {moon.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEO Data Panel */}
      <AnimatePresence>
        {showNeos && (
          <motion.div 
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            className="absolute left-6 bottom-6 w-96 max-h-96 bg-space-black/90 border border-hologram-pink p-4 pointer-events-auto overflow-y-auto backdrop-blur-md rounded-tr-2xl"
          >
            <h3 className="text-xl font-orbitron text-hologram-pink mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-hologram-pink rounded-full animate-pulse" />
              {t.nearEarthObjects}
            </h3>
            
            {neos.length === 0 ? (
              <div className="text-center py-8 text-gray-500 animate-pulse">{t.scanning}</div>
            ) : (
              <div className="space-y-3">
                {neos.slice(0, 5).map(neo => (
                  <div key={neo.id} className="bg-white/5 p-3 rounded border-l-2 border-hologram-pink/50">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-white text-sm">{neo.name}</span>
                      {neo.is_potentially_hazardous_asteroid && (
                        <span className="text-[10px] bg-red-500/20 text-red-500 px-1 rounded">{t.hazardous}</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400">
                      <div>{t.dia}: {Math.round(neo.estimated_diameter.kilometers.estimated_diameter_max * 100) / 100} km</div>
                      <div>{t.miss}: {Math.round(parseFloat(neo.close_approach_data[0].miss_distance.kilometers) / 1000000)}M km</div>
                    </div>
                  </div>
                ))}
                <div className="text-center text-[10px] text-gray-500 mt-2">
                  {t.totalObjects}: {neos.length}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
