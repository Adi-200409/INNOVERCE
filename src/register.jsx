import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import CosmicBackground from './components/CosmicBackground';
import RegistrationPage from './components/RegistrationPage';
import { markInitialPreloaderSeen } from './utils/sessionPreloader';

// Mark preloader seen so returning to Home does not trigger loading screen
markInitialPreloaderSeen();

export default function RegisterApp() {
  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="relative min-h-screen w-full bg-[#060608] text-white overflow-x-hidden selection:bg-amber-400 selection:text-black">
      {/* Moving Cosmic Starfield Background */}
      <CosmicBackground />

      {/* Standalone Dedicated Registration Page */}
      <div className="relative z-10 w-full min-h-screen">
        <RegistrationPage onBackToHome={handleBackToHome} />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <StrictMode>
      <RegisterApp />
    </StrictMode>
  );
}
