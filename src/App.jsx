import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TracksSection from './components/TracksSection';
import TimelineSection from './components/TimelineSection';
import PrizesSection from './components/PrizesSection';
import SponsorsSection from './components/SponsorsSection';
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

  const handlePreloaderStartExit = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsReady(true);
  };

  const handlePreloaderComplete = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsLoading(false);
    setIsReady(true);
  };

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
        onOpenRegister={() => setIsRegisterOpen(true)}
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
        <main id="main-content" className="w-full relative z-20">
          {/* 1. Hero Section */}
          <HeroSection
            onOpenRegister={() => setIsRegisterOpen(true)}
            onOpenTracks={() => setIsTracksOpen(true)}
          />

          {/* 2. About & Metrics Section */}
          <AboutSection
            onOpenRegister={() => setIsRegisterOpen(true)}
            onOpenTracks={() => setIsTracksOpen(true)}
          />

          {/* 3. 5 Mission Arenas & Problem Tracks */}
          <TracksSection
            onOpenRegister={() => setIsRegisterOpen(true)}
            onSelectTrack={(trackId) => setIsTracksOpen(true)}
          />

          {/* 4. 24-Hour Event Timeline & Flight Plan */}
          <TimelineSection />

          {/* 5. Prizes, Cash Podiums & Track Bounties */}
          <PrizesSection
            onOpenRegister={() => setIsRegisterOpen(true)}
          />

          {/* 6. Sponsors, Cloud Compute & Institutional Partners */}
          <SponsorsSection />

          {/* 7. Comprehensive FAQ Archives */}
          <FaqSection />

          {/* 8. Mission Control Footer */}
          <Footer
            onOpenRegister={() => setIsRegisterOpen(true)}
            onOpenTracks={() => setIsTracksOpen(true)}
          />
        </main>
      </div>

      {/* Interactive Registration Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      {/* Interactive Tracks Modal */}
      <TracksModal
        isOpen={isTracksOpen}
        onClose={() => setIsTracksOpen(false)}
        onSelectTrack={(trackId) => {
          setIsTracksOpen(false);
          setIsRegisterOpen(true);
        }}
      />
    </div>
  );
}

export default App;
