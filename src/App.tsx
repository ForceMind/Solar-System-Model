import { useState } from 'react';
import { SolarSystem } from './components/SolarSystem';
import { HUD } from './components/HUD';
import { PlanetData } from './data/planets';
import { LanguageProvider } from './contexts/LanguageContext';
import { SimulationProvider } from './contexts/SimulationContext';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);

  return (
    <LanguageProvider>
      <SimulationProvider>
        <div className="w-full h-screen bg-black relative overflow-hidden">
          <SolarSystem onPlanetSelect={setSelectedPlanet} />
          <HUD 
            selectedPlanet={selectedPlanet} 
            onClose={() => setSelectedPlanet(null)} 
          />
        </div>
      </SimulationProvider>
    </LanguageProvider>
  );
}

export default App;
