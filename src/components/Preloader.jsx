import React, { useState, useEffect, useRef } from 'react';
import { preloadShuttleModel } from '../utils/shuttleLoader';

export default function Preloader({ onComplete, onStartExit }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING 3D WEBGL CORE...');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isContentFading, setIsContentFading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Stable references so parent re-renders never restart the animation
  const onStartExitRef = useRef(onStartExit);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onStartExitRef.current = onStartExit;
    onCompleteRef.current = onComplete;
  }, [onStartExit, onComplete]);

  useEffect(() => {
    preloadShuttleModel();

    let timeoutId;
    let current = 0;
    let isCancelled = false;

    // Fast, responsive progression curve (completes in ~600ms instead of 3000ms)
    const getDelay = (num) => {
      if (num < 20) return 10;
      if (num < 80) return 12;
      if (num < 95) return 16;
      return 22;
    };

    const step = () => {
      if (isCancelled) return;

      current = Math.min(100, current + Math.floor(Math.random() * 3) + 3);
      setProgress(current);

      if (current < 25) {
        setStatusText('INITIALIZING 3D WEBGL CORE...');
      } else if (current < 55) {
        setStatusText('SAMPLING CONTINENTAL PARTICLE MESH...');
      } else if (current < 80) {
        setStatusText('SYNCHRONIZING NATIONAL HACKATHON NODES...');
      } else if (current < 99) {
        setStatusText('CALIBRATING ORBITAL TELEMETRY...');
      } else {
        setStatusText('SYSTEMS NOMINAL • WELCOME TO INNOVERSE 3.0');
      }

      if (current < 100) {
        timeoutId = setTimeout(step, getDelay(current));
      } else {
        // Reached 100% cleanly
        setIsCompleted(true);
        setStatusText('SYSTEMS NOMINAL • INITIATING HYPER-LAUNCH');

        // Step 1: Hold at 100% (100ms)
        setTimeout(() => {
          if (isCancelled) return;
          setIsContentFading(true);
          setIsExiting(true);
          if (onStartExitRef.current) onStartExitRef.current();

          // Smooth handoff to main view (180ms)
          setTimeout(() => {
            if (isCancelled) return;
            setIsDone(true);
            if (onCompleteRef.current) onCompleteRef.current();
          }, 180);
        }, 100);
      }
    };

    // Kick off progression from 0
    timeoutId = setTimeout(step, 10);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between p-4 sm:p-10 bg-[#060608] text-white select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${isExiting
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
        }`}
    >
      {/* Background Matrix Dots */}
      <div className="pointer-events-none absolute inset-0 bg-tech-dots opacity-30" />

      {/* Radiant bottom light-sweep border line during exit */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent transition-opacity duration-700 ${isExiting ? 'opacity-100 shadow-[0_0_25px_#f59e0b]' : 'opacity-0'
          }`}
      />

      {/* Top Header in Loader */}
      <div
        className={`relative z-10 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider sm:tracking-widest transition-all duration-500 ${isContentFading ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
          }`}
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#f59e0b]" />
          <span className="font-mono font-bold text-white/70 tracking-wider text-[10px] sm:text-xs">
            SYS.INIT // <span className="text-amber-400">CORE 3.0</span>
          </span>
        </div>
        <div className="text-[9px] sm:text-[10px] tracking-wider text-white/50">
          <span className="hidden min-[380px]:inline">NATIONAL LEVEL AI SPRINT</span>
          <span className="min-[380px]:hidden">AI SPRINT</span>
        </div>
      </div>

      {/* Center Cinematic Wordmark & Progress Indicator */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center my-auto py-2 sm:py-4 transition-all duration-500 ease-out ${isContentFading ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
          }`}
      >
        {/* Brand Logo with Innoverse Animated Dots */}
        <div className="flex flex-col items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
          <h1 className="font-display font-black text-2xl min-[360px]:text-3xl sm:text-6xl md:text-7xl tracking-tight uppercase text-white flex items-center justify-center whitespace-nowrap">
            <span>INNO<span className="text-amber-400">VERSE</span></span>
            <span className="ml-2 sm:ml-3 px-1.5 sm:px-3 py-0.5 rounded-full border border-amber-400/40 bg-amber-400/10 font-mono font-bold text-xs sm:text-2xl text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)] [font-variant-numeric:lining-nums_slashed-zero]">
              3.0
            </span>
          </h1>

          {/* Glowing Animated Sequence Dots */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-2">
            <span
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${progress > 15 ? 'bg-white shadow-[0_0_8px_white]' : 'bg-white/20'
                }`}
            />
            <span
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${progress > 40 ? 'bg-white shadow-[0_0_8px_white]' : 'bg-white/20'
                }`}
            />
            <span
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${progress > 70 ? 'bg-white shadow-[0_0_8px_white]' : 'bg-white/20'
                }`}
            />
            <span
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${isCompleted
                ? 'bg-amber-400 shadow-[0_0_14px_#fbbf24] scale-125'
                : progress > 90
                  ? 'bg-amber-500 shadow-[0_0_12px_#f59e0b] scale-110'
                  : 'bg-white/20'
                }`}
            />
          </div>
        </div>

        {/* Large Progress Counter (High-Tech JetBrains Mono with generous tracking to prevent any merging on mobile) */}
        <div className="flex items-baseline justify-center gap-1 sm:gap-2 font-mono select-none mt-2 sm:mt-4">
          <span
            className={`text-5xl min-[360px]:text-6xl sm:text-8xl md:text-9xl font-bold tracking-wider tabular-nums transition-all duration-300 ${isCompleted
              ? 'text-white drop-shadow-[0_0_35px_rgba(245,158,11,0.85)] scale-105'
              : 'text-white/95'
              }`}
          >
            {String(progress).padStart(3, '0')}
          </span>
          <span
            className={`text-xl min-[360px]:text-2xl sm:text-4xl font-bold transition-all duration-300 ${isCompleted ? 'text-amber-400 drop-shadow-[0_0_15px_#fbbf24]' : 'text-amber-500'
              }`}
          >
            %
          </span>
        </div>

        {/* Dynamic Telemetry Status (Fixed height to prevent layout shifts on mobile) */}
        <div className="mt-3 sm:mt-5 h-6 flex items-center justify-center gap-1.5 sm:gap-2 font-mono text-[9px] min-[360px]:text-[10px] sm:text-xs text-gray-400 tracking-wider uppercase text-center px-2">
          {isCompleted ? (
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] shrink-0" />
          ) : (
            <span className="inline-block w-1.5 h-1.5 rounded-full border border-amber-400 border-t-transparent animate-spin shrink-0" />
          )}
          <span className={`truncate max-w-[85vw] sm:max-w-md ${isCompleted ? 'text-emerald-400 font-semibold' : ''}`}>
            {statusText}
          </span>
        </div>

        {/* Thin Glowing Laser Progress Bar */}
        <div className="w-52 min-[360px]:w-64 sm:w-80 md:w-96 h-[2px] bg-white/10 rounded-full mt-5 sm:mt-8 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 transition-all duration-75 ease-out relative"
            style={{
              width: `${progress}%`,
              boxShadow: isCompleted
                ? '0 0 25px rgba(245, 158, 11, 0.95), 0 0 10px rgba(251, 191, 36, 0.8)'
                : '0 0 12px rgba(245, 158, 11, 0.8)'
            }}
          >
            {/* Bright leading spark */}
            <span
              className={`absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white transition-all duration-300 ${isCompleted ? 'scale-150 shadow-[0_0_14px_white]' : 'shadow-[0_0_10px_white]'
                }`}
            />
          </div>
        </div>
      </div>

      {/* Footer Info in Loader */}
      <div
        className={`relative z-10 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-3 font-mono text-[9px] sm:text-[10px] text-white/30 uppercase tracking-wider text-center transition-all duration-500 ${isContentFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
      >
        <div className="truncate max-w-xs sm:max-w-none">
          <span>24-HR NATIONAL HACKATHON • ₹35K POOL</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-white/30">
          <span>LAT: 20.59°</span>
          <span>•</span>
          <span>LNG: 78.96°</span>
          <span>•</span>
          <span className="text-emerald-400/80">14MS</span>
        </div>
      </div>
    </div>
  );
}
