import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import Rules from './components/Rules';
import Contact from './components/Contact';
import TracksSection from './components/TracksSection';
import TimelineSection from './components/TimelineSection';
import PrizesSection from './components/PrizesSection';
import SponsorsSection from './components/SponsorsSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';
import TracksModal from './components/TracksModal';
import Preloader from './components/Preloader';
import CosmicBackground from './components/CosmicBackground';
import MissionControlChatbot from './components/MissionControlChatbot';
import LoginPage from './components/LoginPage';
import AuthGate from './components/AuthGate';
import './App.css';

const AUTH_SESSION_KEY = 'innoverce_auth_user';

function readStoredAuthUser() {
  try {
    const raw = sessionStorage.getItem(AUTH_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isTracksOpen, setIsTracksOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [authUser, setAuthUser] = useState(readStoredAuthUser);

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

  const normalizedPath = window.location.pathname.replace(/\/+$/, '');
  const isRulesPage = normalizedPath === '/rules';
  const isLoginPage = normalizedPath === '/login' || window.location.hash === '#login';
  const showAuthGate = !isLoading && !authUser && !isRulesPage;

  const handlePreloaderStartExit = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (authUser || isRulesPage) {
      setIsReady(true);
    }
  };

  const handlePreloaderComplete = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsLoading(false);
    if (authUser || isRulesPage) {
      setIsReady(true);
    }
  };

  const handleAuthenticated = (user) => {
    try {
      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
    } catch {
      // Ignore storage quota errors
    }
    setAuthUser(user);
    setIsReady(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  if (isLoginPage) {
    return (
      <div className="relative min-h-screen w-full bg-[#060608] text-white overflow-x-hidden selection:bg-amber-400 selection:text-black">
        <CosmicBackground />
        <div className="relative z-10 w-full min-h-screen">
          <LoginPage onBackToHome={() => window.location.assign('/')} />
        </div>
      </div>
    );
  }

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

      {/* Login / Sign Up Gate immediately after Preloader completes */}
      {showAuthGate && (
        <AuthGate onAuthenticated={handleAuthenticated} />
      )}

      {/* Sticky Top Navigation Bar */}
      {!showAuthGate && (
        <Navbar
          isReady={isReady}
          onOpenRegister={handleOpenRegister}
          onOpenTracks={() => setIsTracksOpen(true)}
        />
      )}

      {/* Main Content with smooth cinematic reveal */}
      {!showAuthGate && (
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

          {/* 7. Sponsors, Cloud Compute & Institutional Partners */}
          <SponsorsSection />

          {/* 8. The Journey So Far */}
          <GallerySection />

          {/* 9. Contact Details */}
          <Contact />

          {/* 10. Mission Control Footer */}
          <Footer
            onOpenRegister={handleOpenRegister}
            onOpenTracks={() => setIsTracksOpen(true)}
          />
          </main>
        )}
        </div>
      )}

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
      {!showAuthGate && (
        <MissionControlChatbot
          onOpenRegister={handleOpenRegister}
          onOpenTracks={() => setIsTracksOpen(true)}
        />
      )}
    </div>
  );
}

export default App;

