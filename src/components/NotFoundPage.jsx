import React from 'react';
import {
  Compass,
  ArrowLeft,
  Home,
  FileText,
  UserPlus,
  LogIn,
  AlertTriangle,
  Radio,
  Sparkles
} from 'lucide-react';
import CosmicBackground from './CosmicBackground';

export default function NotFoundPage({ currentPath }) {
  const displayPath = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '');

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoRules = () => {
    window.location.href = '/rules';
  };

  const handleGoRegister = () => {
    window.location.href = '/register.html';
  };

  const handleGoLogin = () => {
    window.location.href = '/login.html';
  };

  return (
    <div className="relative min-h-screen w-full bg-[#060608] text-white overflow-hidden flex flex-col justify-between selection:bg-amber-400 selection:text-black">
      {/* Background Cosmic Starfield */}
      <CosmicBackground />

      {/* Ambient Nebula Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-amber-500/10 blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 -right-20 w-[550px] h-[450px] bg-blue-600/10 blur-[160px] rounded-full" />

      {/* Top Telemetry Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={handleGoHome}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0d0d14]/80 px-4 py-2 font-mono text-xs uppercase tracking-wider text-gray-300 transition-all hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-white backdrop-blur-xl cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-amber-400" />
          <span>Return to Home</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/25 bg-amber-400/10 text-amber-300 font-mono text-[11px] uppercase tracking-wider backdrop-blur-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>RADAR STATUS: SIGNAL LOST</span>
        </div>
      </header>

      {/* Main 404 Visual Content */}
      <main className="relative z-10 w-full max-w-3xl mx-auto px-4 py-12 sm:py-20 flex flex-col items-center text-center">
        {/* Radar Scanning Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 font-mono text-xs uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <Radio className="w-3.5 h-3.5 animate-pulse text-red-400" />
          <span>ERROR 404 // TRAJECTORY NOT FOUND</span>
        </div>

        {/* Giant Glowing 404 Display */}
        <div className="relative select-none my-2 sm:my-4">
          <span className="font-display text-8xl min-[480px]:text-9xl sm:text-[11rem] md:text-[13rem] font-black tracking-tighter text-amber-400 drop-shadow-[0_0_45px_rgba(245,158,11,0.45)] [font-variant-numeric:lining-nums_slashed-zero] leading-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-stroke-white font-display text-8xl min-[480px]:text-9xl sm:text-[11rem] md:text-[13rem] font-black tracking-tighter opacity-40 leading-none">
              404
            </span>
          </div>
        </div>

        {/* Headline & Description */}
        <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mt-2">
          Coordinates Lost in Space
        </h1>

        <p className="mt-4 max-w-lg text-sm sm:text-base font-sans text-gray-400 leading-relaxed">
          The orbital vector or quadrant you attempted to access does not exist in the INNOVERSE 3.0 mission database.
        </p>

        {/* Path Coordinates Pill */}
        {displayPath && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] font-mono text-xs text-gray-300">
            <span className="text-amber-400/80">TARGET PATH:</span>
            <code className="text-white font-semibold">{displayPath}</code>
          </div>
        )}

        {/* Fast Action Buttons Grid */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-md w-full">
          <button
            type="button"
            onClick={handleGoHome}
            className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Mission Control</span>
          </button>

          <button
            type="button"
            onClick={handleGoRules}
            className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-gray-200 transition-all hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Rules &amp; Protocols</span>
          </button>
        </div>

        {/* Secondary Links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-400">
          <button
            type="button"
            onClick={handleGoRegister}
            className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5 text-amber-400" />
            <span>Register Squad</span>
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={handleGoLogin}
            className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5 text-blue-400" />
            <span>Team Login</span>
          </button>
        </div>
      </main>

      {/* Telemetry Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-4 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-gray-500 gap-2">
        <span>INNOVERSE 3.0 // NAVIGATION RECOVERY NODE</span>
        <span>STATUS: 404_PAGE_NOT_FOUND</span>
      </footer>
    </div>
  );
}
