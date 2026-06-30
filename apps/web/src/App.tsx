import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import Dashboard from './pages/Dashboard.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import TermsOfUse from './pages/TermsOfUse.tsx';
import ComingSoon from './pages/ComingSoon.tsx';
import Contact from './pages/Contact.tsx';
import AmbientSystem from './components/AmbientSystem.tsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#05050a] text-slate-100 font-sans selection:bg-[#0DF2C9]/30 overflow-x-hidden relative">
        <AmbientSystem />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/talent-coming-soon" element={<ComingSoon />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
