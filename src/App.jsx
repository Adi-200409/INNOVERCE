import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import DomainSection from './components/DomainSection';
import Rules from './components/Rules';
import Contact from './components/Contact';
import TracksSection from './components/TracksSection';
import TimelineSection from './components/TimelineSection';
import PrizesSection from './components/PrizesSection';
import SponsorsSection from './components/SponsorsSection';
import GallerySection from './components/GallerySection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';
import TracksModal from './components/TracksModal';
import Preloader from './components/Preloader';
import CosmicBackground from './components/CosmicBackground';
import './App.css';

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isTracksOpen, setIsTracksOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // Guarantee that on initial load and reload, the page always starts at top: 0
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Direct navigation if user bookmarked or entered /register or #register
    if (window.location.pathname === '/register' || window.location.hash === '#register') {
      window.location.href = '/register.html';
      return;
    }

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleOpenRegister = () => {
    window.location.href = '/register.html';
  };

  const handlePreloaderStartExit = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsReady(true);
  };

  const handlePreloaderComplete = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsLoading(false);
    setIsReady(true);
  };

  const isRulesPage = window.location.pathname.replace(/\/+$/, '') === '/rules';

  return (
    <div className="relative w-full min-h-screen bg-[#060608] text-white overflow-x-hidden selection:bg-amber-400 selection:text-black">
      {/* Moving Cosmic Starfield Background */}
      <CosmicBackground />

      {/* Initial Full-Screen Loading State */}
      {isLoading && (
        <Preloader
          onStartExit={handlePreloaderStartExit}
          onComplete={handlePreloaderComplete}
        />
      )}

      {/* Sticky Top Navigation Bar */}
      <Navbar
        isReady={isReady}
        onOpenRegister={handleOpenRegister}
        onOpenTracks={() => setIsTracksOpen(true)}
      />

      {/* Main Content with smooth cinematic reveal */}
      <div
        className={`w-full min-h-screen transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isReady
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-[0.99] pointer-events-none'
        }`}
      >
        {/* Main Hackathon Mission Sections */}
        {isRulesPage ? (
          <main className="w-full relative z-20">
            <Rules />
          </main>
        ) : (
          <main id="main-content" className="w-full relative z-20">
          {/* 1. Hero Section */}
          <HeroSection
            onOpenRegister={handleOpenRegister}
            onOpenTracks={() => setIsTracksOpen(true)}
          />

          {/* 2. About & Metrics Section */}
          <AboutSection
            onOpenRegister={handleOpenRegister}
            onOpenTracks={() => setIsTracksOpen(true)}
          />

          {/* 3. Hackathon Domains */}
          <DomainSection />

          {/* 4. 5 Mission Arenas & Problem Tracks */}
          <TracksSection
            onOpenRegister={handleOpenRegister}
            onSelectTrack={(trackId) => setIsTracksOpen(true)}
          />

          {/* 5. 24-Hour Event Timeline & Flight Plan */}
          <TimelineSection />

          {/* 6. Prizes, Cash Podiums & Track Bounties */}
          <PrizesSection
            onOpenRegister={handleOpenRegister}
          />

          {/* 7. Sponsors, Cloud Compute & Institutional Partners */}
          <SponsorsSection />

          {/* 8. Comprehensive FAQ Archives */}
          <FaqSection />

          {/* 9. The Journey So Far */}
          <GallerySection />

          {/* 10. Contact Details */}
          <Contact />

          {/* 11. Mission Control Footer */}
          <Footer
            onOpenRegister={handleOpenRegister}
            onOpenTracks={() => setIsTracksOpen(true)}
          />
          </main>
        )}
      </div>

      {/* Interactive Registration Modal (Fallback) */}
      {!isRulesPage && (
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
        />
      )}

      {/* Interactive Tracks Modal */}
      {!isRulesPage && (
        <TracksModal
          isOpen={isTracksOpen}
          onClose={() => setIsTracksOpen(false)}
          onSelectTrack={(trackId) => {
            setIsTracksOpen(false);
            handleOpenRegister();
          }}
        />
      )}
    </div>
  );
}

export default App;

