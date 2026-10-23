import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
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

  const handlePreloaderStartExit = () => {
    setIsReady(true);
  };

  const handlePreloaderComplete = () => {
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
        className={`w-full min-h-screen transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isReady
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-[0.99] pointer-events-none'
          }`}
      >

        {/* Main Sections */}
        <main id="main-content" className="w-full">
          <HeroSection
            onOpenRegister={() => setIsRegisterOpen(true)}
            onOpenTracks={() => setIsTracksOpen(true)}
          />

          <AboutSection
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
