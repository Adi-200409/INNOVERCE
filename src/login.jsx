import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import CosmicBackground from './components/CosmicBackground';
import LoginPage from './components/LoginPage';
import { markInitialPreloaderSeen } from './utils/sessionPreloader';

// Mark preloader seen so returning to Home does not trigger loading screen
markInitialPreloaderSeen();

export default function LoginApp() {
  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="relative min-h-screen w-full bg-[#060608] text-white overflow-x-hidden selection:bg-amber-400 selection:text-black">
      <CosmicBackground />

      <div className="relative z-10 w-full min-h-screen">
        <LoginPage onBackToHome={handleBackToHome} />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <StrictMode>
      <LoginApp />
    </StrictMode>
  );
}

