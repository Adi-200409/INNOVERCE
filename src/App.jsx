import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import RegisterModal from './components/RegisterModal';
import TracksModal from './components/TracksModal';
import Preloader from './components/Preloader';
import CosmicBackground from './components/CosmicBackground';
import SpaceshipTransition from './components/SpaceshipTransition';
import './App.css';

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isTracksOpen, setIsTracksOpen] = useState(false);
  const [appPhase, setAppPhase] = useState('loading'); // 'loading' | 'spaceship_warp' | 'ready'
  const [warpFlash, setWarpFlash] = useState(false);

  const handlePreloaderComplete = () => {
    setAppPhase('spaceship_warp');
  };

  const handleWarpComplete = () => {
    // 1. Arm the stellar flash bloom
    setWarpFlash(true);
    // 2. Transition phase to ready
    setAppPhase('ready');

    // 3. Smoothly dissolve the flash to reveal the majestic home page
    setTimeout(() => {
      setWarpFlash(false);
    }, 750);
  };

  const isHeroReady = appPhase === 'ready';

  return (
    <div className="relative w-full min-h-screen bg-[#060608] text-white overflow-x-hidden selection:bg-amber-400 selection:text-black">
      {/* Moving Cosmic Starfield Background (paused during transition to free GPU) */}
      <CosmicBackground paused={!isHeroReady} />

      {/* Phase 1: Initial Visit Loading Animation */}
      {appPhase === 'loading' && (
        <Preloader
          onComplete={handlePreloaderComplete}
        />
      )}

      {/* Phase 2: Cinematic 3D Spaceship Warp Launch Transition */}
      {appPhase === 'spaceship_warp' && (
        <SpaceshipTransition
          onComplete={handleWarpComplete}
        />
      )}

      {/* Cinematic Warp Dissolve Flash Overlay */}
      <div
        className={`fixed inset-0 z-[80] pointer-events-none transition-opacity duration-700 ease-out ${
          warpFlash ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,1) 35%, rgba(254,243,199,0.95) 70%, rgba(245,158,11,0.4) 100%)'
        }}
      />

      {/* Sticky Top Navigation Bar */}
      <Navbar
        isReady={isHeroReady}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenTracks={() => setIsTracksOpen(true)}
      />

      {/* Main Content with smooth cinematic reveal (pure GPU transform, zero blur lag) */}
      <div
        className={`w-full min-h-screen transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isHeroReady
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
