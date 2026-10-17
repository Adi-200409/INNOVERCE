import React, { useState, useEffect } from 'react';
import { ArrowRight, Eye, Sparkles, Radio, Compass } from 'lucide-react';
import ThreeEarthGlobe from './ThreeEarthGlobe';
import confetti from 'canvas-confetti';

export default function HeroSection({ onOpenRegister, onOpenTracks }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showArcs, setShowArcs] = useState(true);
  const [atmosphereGlow, setAtmosphereGlow] = useState(true);

  // Live countdown to Hackathon launch
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 28,
    seconds: 53
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
    // Quick burst of confetti on CTA click
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#a855f7', '#e4007c', '#38bdf8']
    });
    if (onOpenRegister) onOpenRegister();
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-between select-none">
      {/* =========================================================================
          REQUIREMENT 2: 3D Background Layer
          Absolute positioned div (inset-0, z-0) covering the entire screen.
          Interactive to mouse/touch drag rotation.
          ========================================================================= */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <ThreeEarthGlobe
          autoRotate={autoRotate}
          atmosphereGlow={atmosphereGlow}
          showArcs={showArcs}
        />
      </div>

      {/* Subtle Matrix Dot Grid Background Overlay (Agency Tech texture) */}
      <div className="pointer-events-none absolute inset-0 bg-tech-dots opacity-30 z-[1]" />

      {/* Cinematic Vignette Radial Gradient (Darkens edges to focus attention on Earth) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.45)_70%,#000000_100%)] z-[2]" />

      {/* Top spacer to accommodate floating navbar */}
      <div className="h-20 sm:h-24 pointer-events-none" />

      {/* =========================================================================
          REQUIREMENT 3: Foreground Content Layer
          Centered flex-column container (z-10, pointer-events-none so 3D background
          remains fully interactive to drag and rotate).
          ========================================================================= */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 pointer-events-none max-w-5xl mx-auto my-auto">
        
        {/* WeEvolveIT-Style Pill Badge */}
        <div className="pointer-events-auto inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-md mb-6 hover:border-fuchsia-500/50 hover:bg-black/80 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e4007c] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e4007c]" />
          </span>
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white/90">
            24-HOUR NATIONAL LEVEL HACKATHON <span className="text-white/30">•</span> OCT 24-25, 2026
          </span>
        </div>

        {/* =========================================================================
            TYPOGRAPHY 1: Headline
            Extra large, bold, sans-serif font. Text is white with subtle drop shadow.
            "INNOVERSE" with year "2026" in vibrant electric purple / neon blue accent.
            ========================================================================= */}
        <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-tight select-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          <span className="glow-text-white inline-block">INNOVERSE</span>
          <span className="ml-3 sm:ml-5 inline-block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.7)] font-black">
            2026
          </span>
        </h1>



        {/* =========================================================================
            TYPOGRAPHY 3: Call to Action (CTA) Buttons
            Restore pointer-events (pointer-events-auto) for a flex row of two buttons.
            - Primary: Solid electric purple, white text, pill shape, glowing box-shadow, slight scale-up.
            - Secondary: Transparent, thin border, white text, pill shape.
            ========================================================================= */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 pointer-events-auto w-full sm:w-auto">
          {/* Primary Button */}
          <button
            id="hero-register-btn"
            onClick={handleRegisterClick}
            className="w-full sm:w-auto group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#9333ea] bg-[length:200%_auto] px-8 sm:px-9 py-3.5 sm:py-4 font-mono text-xs sm:text-sm uppercase tracking-wider font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-fuchsia-200 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Register Now</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Secondary Button */}
          <button
            id="hero-tracks-btn"
            onClick={onOpenTracks}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 hover:border-white/60 bg-black/40 hover:bg-white/[0.08] backdrop-blur-md px-7 sm:px-8 py-3.5 sm:py-4 font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold text-white hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
          >
            <Eye className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            <span>View Tracks</span>
            <span className="font-mono text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              $150K
            </span>
          </button>
        </div>

        {/* National Key Metrics Row */}
        <div className="mt-10 sm:mt-12 hidden md:flex items-center gap-8 text-white/50 font-mono text-[11px] uppercase tracking-widest border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">$150,000+</span>
            <span>PRIZE POOL</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">1,500+</span>
            <span>NATIONAL HACKERS</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">24 HOURS</span>
            <span>NATIONAL SPRINT</span>
          </div>
        </div>

      </div>

      {/* =========================================================================
          AGENCY HUD FOOTER & 3D CONTROLS (Inspired by WeEvolveIT)
          ========================================================================= */}
      <div className="relative z-20 pointer-events-auto px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 bg-black/60 backdrop-blur-xl">
        
        {/* Left: Hackathon Countdown Telemetry */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono">
          <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest">
            <Radio className="w-3.5 h-3.5 text-[#e4007c] animate-pulse" />
            <span className="hidden sm:inline">LAUNCH COUNTDOWN:</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm">
            <div className="flex flex-col items-center">
              <span className="font-bold text-white tracking-wider font-mono">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-[8px] text-white/40 uppercase">DAYS</span>
            </div>
            <span className="text-white/30 font-bold">:</span>
            <div className="flex flex-col items-center">
              <span className="font-bold text-white tracking-wider font-mono">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[8px] text-white/40 uppercase">HRS</span>
            </div>
            <span className="text-white/30 font-bold">:</span>
            <div className="flex flex-col items-center">
              <span className="font-bold text-white tracking-wider font-mono">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[8px] text-white/40 uppercase">MIN</span>
            </div>
            <span className="text-white/30 font-bold">:</span>
            <div className="flex flex-col items-center">
              <span className="font-bold text-fuchsia-400 tracking-wider font-mono">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[8px] text-white/40 uppercase">SEC</span>
            </div>
          </div>
        </div>

        {/* Center: Live Orbit Hint */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-white/40 uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5 text-purple-400" />
          <span>DRAG GLOBE TO ROTATE 3D PERSPECTIVE</span>
        </div>

        {/* Right: Telemetry Status */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-white/40 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="uppercase text-[10px]">3D CORE ACTIVE</span>
        </div>

      </div>

    </section>
  );
}
