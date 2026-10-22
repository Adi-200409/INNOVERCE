import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import ThreeEarthGlobe from './ThreeEarthGlobe';
import confetti from 'canvas-confetti';

export default function HeroSection({ onOpenRegister, onOpenTracks }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showArcs, setShowArcs] = useState(true);
  const [atmosphereGlow, setAtmosphereGlow] = useState(true);

  // Live countdown to Hackathon launch matching Orbit24
  const [timeLeft, setTimeLeft] = useState({
    days: 46,
    hours: 20,
    minutes: 34,
    seconds: 40
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRegisterClick = () => {
    // Burst of Golden Amber & Solar Orange confetti
    confetti({
      particleCount: 90,
      spread: 65,
      origin: { y: 0.72 },
      colors: ['#f59e0b', '#fbbf24', '#f97316', '#2563eb', '#ffffff']
    });
    if (onOpenRegister) onOpenRegister();
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#060608] flex flex-col justify-between select-none pt-20 sm:pt-24">
      {/* =========================================================================
          3D EARTH & DEEP SPACE BACKGROUND LAYER
          ========================================================================= */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <ThreeEarthGlobe
          autoRotate={autoRotate}
          atmosphereGlow={atmosphereGlow}
          showArcs={showArcs}
        />
      </div>

      {/* Orbit24 Warm Radiant Sun Corona Glow in Top Right */}
      <div className="pointer-events-none absolute -top-12 right-0 sm:right-12 w-[460px] h-[460px] bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.22)_0%,rgba(245,158,11,0.12)_42%,transparent_70%)] blur-[75px] z-[1]" />

      {/* Cinematic Vignette Radial Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(6,6,8,0.35)_75%,rgba(6,6,8,0.75)_100%)] z-[2]" />

      {/* =========================================================================
          ORBIT24 HUD AMBIENT OVERLAYS (Bottom Right)
          ========================================================================= */}
      {/* Bottom Right: Wireframe & Rotation Controls */}
      <div className="hidden sm:flex absolute bottom-20 sm:bottom-24 right-6 sm:right-10 z-20 items-center pointer-events-auto select-none">
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md font-mono text-[11px] text-white/50 tracking-wider shadow-lg">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            {autoRotate ? '— RESET' : '+ RESUME'}
          </button>
          <span className="text-white/20">•</span>
          <button
            onClick={() => setShowArcs(!showArcs)}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            {showArcs ? 'WIRE OFF' : 'WIRE ON'}
          </button>
        </div>
      </div>

      {/* =========================================================================
          ORBIT24 HERO CONTENT LAYER (Centered Alignment)
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 my-auto py-4 sm:py-6 flex flex-col items-center text-center">
        
        {/* Innoverse Giant Dual-Tone Headline */}
        <h1 className="font-display font-black tracking-tight leading-[0.88] select-none text-center mb-8 sm:mb-10 pointer-events-none">
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-extrabold drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            Innoverse
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-stroke-amber tracking-tight mt-1 drop-shadow-[0_0_40px_rgba(245,158,11,0.35)]">
            2026
          </span>
        </h1>

        {/* Orbit24 Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6 sm:mb-8 pointer-events-auto">
          {/* Primary Golden Amber Pill: "Get your boarding pass" */}
          <button
            id="hero-register-btn"
            onClick={handleRegisterClick}
            className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-amber-400 text-black hover:bg-amber-300 px-7 sm:px-8 py-3.5 sm:py-4 font-mono text-xs sm:text-sm font-bold tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Get your boarding pass</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary Dark Frosted Capsule: "Explore tracks" */}
          <button
            id="hero-tracks-btn"
            onClick={onOpenTracks}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 hover:border-amber-400/50 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl px-6 sm:px-7 py-3.5 sm:py-4 font-mono text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-all cursor-pointer"
          >
            <span>Explore tracks</span>
          </button>
        </div>

        {/* Orbit24 Countdown Timer HUD */}
        <div className="flex flex-col items-center justify-center gap-2 pointer-events-auto mx-auto">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            <span>HACKING BEGINS IN</span>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 font-mono">
            <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[#0d0d12]/90 backdrop-blur-md px-3 sm:px-4 py-2 min-w-[54px] sm:min-w-[62px]">
              <span className="font-bold text-lg sm:text-xl text-white tracking-wider">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[8px] text-white/40 uppercase">DAYS</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[#0d0d12]/90 backdrop-blur-md px-3 sm:px-4 py-2 min-w-[54px] sm:min-w-[62px]">
              <span className="font-bold text-lg sm:text-xl text-white tracking-wider">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[8px] text-white/40 uppercase">HRS</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[#0d0d12]/90 backdrop-blur-md px-3 sm:px-4 py-2 min-w-[54px] sm:min-w-[62px]">
              <span className="font-bold text-lg sm:text-xl text-white tracking-wider">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[8px] text-white/40 uppercase">MIN</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[#0d0d12]/90 backdrop-blur-md px-3 sm:px-4 py-2 min-w-[54px] sm:min-w-[62px]">
              <span className="font-bold text-lg sm:text-xl text-amber-400 tracking-wider">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[8px] text-white/40 uppercase">SEC</span>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          AGENCY HUD FOOTER (Orbit24 Navigation Hint & Telemetry)
          ========================================================================= */}
      <div className="relative z-20 pointer-events-auto px-4 sm:px-8 py-3.5 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 bg-black/70 backdrop-blur-xl">
        
        {/* Left: Hub Telemetry */}
        <div className="flex items-center gap-3 font-mono text-xs text-white/40">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="uppercase text-[11px]">INNOVERSE SYSTEM • KLS GIT ACTIVE NODE</span>
        </div>

        {/* Center: Scroll to About Section */}
        <div className="hidden md:flex items-center gap-4 font-mono text-[11px] text-white/40 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>DRAG GLOBE TO ROTATE</span>
          </div>
          <span className="text-white/20">•</span>
          <a
            href="#about"
            className="text-white/70 hover:text-amber-400 transition-colors flex items-center gap-1 group cursor-pointer"
          >
            <span>ABOUT & TRACKS</span>
            <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
          </a>
        </div>

        {/* Right: National Sprint Status */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-white/40 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="uppercase text-[10px]">3D CORE ACTIVE</span>
        </div>

      </div>

    </section>
  );
}
