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

    // Fluid progression curve: every single integer from 0 to 100 is visited
    const getDelay = (num) => {
      if (num < 12) return 24;  // smooth launch
      if (num < 80) return 18;  // fast, silky-smooth roll
      if (num < 95) return 26;  // gentle deceleration
      if (num < 99) return 42;  // precision approach
      return 65;                // final lock into 100
    };

    const step = () => {
      if (isCancelled) return;

      current += 1;
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

        // Step 1: Hold at 100% (180ms)
        setTimeout(() => {
          if (isCancelled) return;
          setIsContentFading(true);
          setIsExiting(true);
          if (onStartExitRef.current) onStartExitRef.current();

          // Smooth handoff to warp transition (320ms)
          setTimeout(() => {
            if (isCancelled) return;
            setIsDone(true);
            if (onCompleteRef.current) onCompleteRef.current();
          }, 320);
        }, 180);
      }
    };

    // Kick off progression from 0
    timeoutId = setTimeout(step, 24);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between p-6 sm:p-12 bg-black text-white select-none transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${isExiting
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
        className={`relative z-10 flex items-center justify-between font-mono text-[11px] text-white/40 uppercase tracking-widest transition-all duration-500 ${isContentFading ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
          }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#f59e0b]" />
          <span>INNOVERSE // 3.0</span>
        </div>
        <div>
          <span>NATIONAL LEVEL AI SPRINT</span>
        </div>
      </div>

      {/* Center Cinematic Wordmark & Progress Indicator */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center my-auto transition-all duration-500 ease-out ${isContentFading ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
          }`}
      >
        {/* Brand Logo with Innoverse Animated Dots */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-wider text-white">
            Innoverse<span className="font-mono text-stroke-amber ml-2 [font-variant-numeric:lining-nums_slashed-zero]">3.0</span>
          </h1>

          {/* Glowing Animated Sequence Dots */}
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${progress > 15 ? 'bg-white shadow-[0_0_8px_white]' : 'bg-white/20'
                }`}
            />
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${progress > 40 ? 'bg-white shadow-[0_0_8px_white]' : 'bg-white/20'
                }`}
            />
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${progress > 70 ? 'bg-white shadow-[0_0_8px_white]' : 'bg-white/20'
                }`}
            />
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${isCompleted
                ? 'bg-amber-400 shadow-[0_0_14px_#fbbf24] scale-125'
                : progress > 90
                  ? 'bg-amber-500 shadow-[0_0_12px_#f59e0b] scale-110'
                  : 'bg-white/20'
                }`}
            />
          </div>
        </div>

        {/* Large Monospace Progress Counter (Smooth Non-Skipping 000 to 100) */}
        <div className="flex items-baseline justify-center gap-1 font-mono select-none">
          <span
            className={`text-6xl sm:text-8xl md:text-9xl font-black tracking-tight tabular-nums transition-all duration-300 ${isCompleted
              ? 'text-white drop-shadow-[0_0_35px_rgba(245,158,11,0.85)] scale-105'
              : 'text-white/90'
              }`}
          >
            {String(progress).padStart(3, '0')}
          </span>
          <span
            className={`text-xl sm:text-3xl font-bold transition-all duration-300 ${isCompleted ? 'text-amber-400 drop-shadow-[0_0_15px_#fbbf24]' : 'text-amber-500'
              }`}
          >
            %
          </span>
        </div>

        {/* Dynamic Telemetry Status */}
        <div className="mt-6 flex items-center gap-2.5 font-mono text-xs sm:text-sm text-gray-400 tracking-widest uppercase transition-all duration-300">
          {isCompleted ? (
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
          ) : (
            <span className="inline-block w-2 h-2 rounded-full border border-amber-400 border-t-transparent animate-spin" />
          )}
          <span className={isCompleted ? 'text-emerald-400 font-semibold tracking-wider' : ''}>
            {statusText}
          </span>
        </div>

        {/* Thin Glowing Laser Progress Bar */}
        <div className="w-64 sm:w-80 md:w-96 h-[2px] bg-white/10 rounded-full mt-8 overflow-hidden relative">
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
              className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white transition-all duration-300 ${isCompleted ? 'scale-150 shadow-[0_0_14px_white]' : 'shadow-[0_0_10px_white]'
                }`}
            />
          </div>
        </div>
      </div>

      {/* Footer Info in Loader */}
      <div
        className={`relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] text-white/30 uppercase tracking-widest transition-all duration-500 ${isContentFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
      >
        <div>
          <span>24-HOUR NATIONAL LEVEL HACKATHON • ₹35K PRIZE POOL</span>
        </div>
        <div className="flex items-center gap-4">
          <span>LAT: 20.59° N</span>
          <span>•</span>
          <span>LNG: 78.96° E</span>
          <span>•</span>
          <span className="text-emerald-400/80">PING: 14MS</span>
        </div>
      </div>
    </div>
  );
}
