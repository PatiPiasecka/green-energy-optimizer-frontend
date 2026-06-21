import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home'; // Importujesz swój komponent
import { EnergyMixWidget } from './components/EnergyMixWidget';
import { ChargingOptimizer } from './components/ChargingOptimizer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mix" element={<EnergyMixWidget />} />
      <Route path="/optimizer" element={<ChargingOptimizer />} />
    </Routes>
  );
}

export default App;
