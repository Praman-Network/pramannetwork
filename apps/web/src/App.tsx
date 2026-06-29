import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import Dashboard from './pages/Dashboard.tsx';
import AmbientSystem from './components/AmbientSystem.tsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#09090b] text-slate-100 font-sans selection:bg-[#00F0FF]/30 overflow-x-hidden relative">
        <AmbientSystem />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
