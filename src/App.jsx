import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import RegisterModal from './components/RegisterModal';
import TracksModal from './components/TracksModal';
import Preloader from './components/Preloader';
import './App.css';

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isTracksOpen, setIsTracksOpen] = useState(false);
  const [isHeroReady, setIsHeroReady] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* Initial Visit Loading Animation */}
      <Preloader
        onStartExit={() => setIsHeroReady(true)}
        onComplete={() => setIsHeroReady(true)}
      />

      {/* Main Content with smooth cinematic reveal */}
      <div
        className={`w-full min-h-screen transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isHeroReady
            ? 'opacity-100 scale-100 filter blur-0'
            : 'opacity-40 scale-[0.97] filter blur-[1px]'
        }`}
      >
        {/* Floating Navigation Bar */}
        <Navbar
          onOpenRegister={() => setIsRegisterOpen(true)}
          onOpenTracks={() => setIsTracksOpen(true)}
        />

        {/* Main Full-Viewport Hero Section */}
        <main id="main-content" className="w-full h-screen">
          <HeroSection
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
