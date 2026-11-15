import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import Rules from './components/Rules';
import Contact from './components/Contact';
import TracksSection from './components/TracksSection';
import TimelineSection from './components/TimelineSection';
import PrizesSection from './components/PrizesSection';
import GallerySection from './components/GallerySection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';
import TracksModal from './components/TracksModal';
import Preloader from './components/Preloader';
import CosmicBackground from './components/CosmicBackground';
import MissionControlChatbot from './components/MissionControlChatbot';
import { hasSeenInitialPreloader, markInitialPreloaderSeen } from './utils/sessionPreloader';
import './App.css';

function App() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '');
  const isRulesPage = normalizedPath === '/rules';

  const alreadySeenPreloader = hasSeenInitialPreloader();
  const shouldShowPreloader = !isRulesPage && !alreadySeenPreloader;

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isTracksOpen, setIsTracksOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(shouldShowPreloader);
  const [isReady, setIsReady] = useState(isRulesPage || alreadySeenPreloader);

  // Guarantee that on initial load and reload, the page always starts at top: 0
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Direct navigation if user bookmarked or entered /register
    const cleanPath = window.location.pathname.replace(/\/+$/, '');
    if (cleanPath === '/register' || window.location.hash === '#register') {
      window.location.href = '/register.html';
      return;
    }

    // Direct navigation if user bookmarked /login -> redirect to main page
    if (cleanPath === '/login' || window.location.hash === '#login') {
      window.history.replaceState(null, '', '/');
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
    markInitialPreloaderSeen();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsReady(true);
  };

  const handlePreloaderComplete = () => {
    markInitialPreloaderSeen();
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

            {/* 2. About & Metrics Section (includes MCA Department) */}
            <AboutSection
              onOpenRegister={handleOpenRegister}
              onOpenTracks={() => setIsTracksOpen(true)}
            />

            {/* 3. 5 Mission Arenas & Problem Tracks */}
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

            {/* 7. Developers & Organizers */}
            <TeamSection />

            {/* 9. The Journey So Far */}
            <GallerySection />

            {/* 10. Contact Details ("Get in Touch") */}
            <Contact />

            {/* 10. Mission Control Footer */}
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

      {/* Interactive Mission Control AI Chatbot (Theme-aligned Copilot) */}
      <MissionControlChatbot
        onOpenRegister={handleOpenRegister}
        onOpenTracks={() => setIsTracksOpen(true)}
      />
    </div>
  );
}

export default App;

