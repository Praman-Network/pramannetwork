import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AmbientSystem from './components/AmbientSystem.tsx';

const LandingPage = lazy(() => import('./pages/LandingPage.tsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.tsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.tsx'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse.tsx'));
const ComingSoon = lazy(() => import('./pages/ComingSoon.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));

// Blog Pages
const BlogHome = lazy(() => import('./pages/BlogHome.tsx'));
const ArticlePage = lazy(() => import('./pages/ArticlePage.tsx'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-[#05050a] flex items-center justify-center flex-col space-y-4" role="status" aria-label="Loading page content">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-2 border-t-[#0DF2C9] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
    </div>
    <div className="text-[10px] tracking-[0.25em] text-[#0DF2C9] font-semibold uppercase font-display animate-pulse">
      Loading Proofs
    </div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-[#05050a] text-slate-100 font-sans selection:bg-[#0DF2C9]/30 overflow-x-hidden relative">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0DF2C9] focus:text-black focus:font-bold focus:rounded-lg transition-all font-mono text-xs">
            Skip to main content
          </a>
          <AmbientSystem />
          
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfUse />} />
              <Route path="/talent-coming-soon" element={<ComingSoon />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Blog Routes */}
              <Route path="/blog" element={<BlogHome />} />
              <Route path="/blog/:slug" element={<ArticlePage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
