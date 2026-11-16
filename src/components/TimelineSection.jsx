import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Clock,
  CheckCircle2,
  Zap,
  Compass,
  Sparkles,
  Users,
  Rocket
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import TimelineSpaceship from './TimelineSpaceship';

const TIMELINE_JOURNEY = [
  {
    time: '16 NOV - 30 NOV 2026',
    title: 'Registration Window',
    desc: 'Initial team registration opens on 16 November 2026 and closes on 30 November 2026.',
    category: 'REGISTRATION',
    icon: Rocket,
    highlight: true,
    active: true
  },
  {
    time: '1 DEC - 10 DEC 2026',
    title: 'Final Idea Submission',
    desc: 'Registered teams submit their project ideas between 1 December 2026 and 10 December 2026.',
    category: 'IDEA SUBMISSION',
    icon: Sparkles,
    active: true
  },
  {
    time: 'STEP 03',
    title: 'Idea-Based Shortlisting',
    desc: 'Teams are shortlisted based on the ideas they submitted.',
    category: 'SHORTLISTING',
    icon: CheckCircle2,
    active: true
  },
  {
    time: 'STEP 04',
    title: 'Shortlisted Team Registration',
    desc: 'Shortlisted teams complete their registration before moving on to the hackathon phases.',
    category: 'TEAM REGISTRATION',
    icon: Users,
    active: true
  },
  {
    time: 'PHASE 01',
    title: 'Online PPT Evaluation',
    desc: 'Shortlisted, registered teams present their project PPT online for evaluation by the jury.',
    category: 'ONLINE PPT EVALUATION',
    icon: Compass,
    highlight: true,
    active: true
  },
  {
    time: '5 JAN - 6 JAN 2027',
    title: '24-Hour Hackathon',
    desc: 'The on-campus 24-hour hackathon runs from 5 January 2027 to 6 January 2027, followed by project demos and judging.',
    category: '24-HOUR HACKATHON',
    icon: Zap,
    highlight: true,
    active: true
  }
];

export default function TimelineSection() {
  const [sectionRef, isVisible] = useScrollReveal();
  const spineContainerRef = useRef(null);
  const shipContainerRef = useRef(null);
  const beamRef = useRef(null);
  const nodeRefs = useRef([]);

  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(-1);
  const [shipVelocity, setShipVelocity] = useState(0);

  // References for 120 FPS decoupled animation loop
  const currentXRef = useRef(0);
  const targetXRef = useRef(0);
  const currentYRef = useRef(0);
  const targetYRef = useRef(0);
  const currentAngleRef = useRef(-38);
  const targetAngleRef = useRef(-38);
  const currentOpacityRef = useRef(0);
  const targetOpacityRef = useRef(0);
  const nodePositionsRef = useRef([]);
  const activeIdxRef = useRef(-1);
  const prevVelRef = useRef(0);
  const isInitializedRef = useRef(false);

  // Measure exact vertical pixel offsets of each node relative to the spine container
  const updateNodePositions = useCallback(() => {
    if (!spineContainerRef.current) return;
    const containerRect = spineContainerRef.current.getBoundingClientRect();

    const positions = nodeRefs.current.map((el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return rect.top - containerRect.top + rect.height / 2;
    });

    if (positions.length > 0 && positions[0] !== undefined) {
      nodePositionsRef.current = positions;
    }
  }, []);

  // Sync scroll position with the spaceship trajectory
  useEffect(() => {
    updateNodePositions();

    const handleScroll = () => {
      if (!spineContainerRef.current || nodePositionsRef.current.length < 2) return;
      const positions = nodePositionsRef.current;
      const startY = positions[0];
      const endY = positions[positions.length - 1];
      const totalTrack = endY - startY;
      if (totalTrack <= 0) return;

      const containerRect = spineContainerRef.current.getBoundingClientRect();

      // Viewport focal line: center of the reader's view (48% of screen height)
      const focalLine = window.innerHeight * 0.48;
      const currentOffset = focalLine - (containerRect.top + startY);

      // Approach distance before Milestone 0
      const entryDist = Math.max(350, window.innerHeight * 0.6);

      if (currentOffset < 0) {
        // Phase 1: Swooping in from offscreen left on a curved approach
        const t = currentOffset / entryDist; // e.g. -1.0 to 0.0
        const clampedT = Math.max(-1.2, t);
        const progressT = Math.max(0, 1.0 + clampedT); // 0 at far distance, 1.0 at Milestone 0
        const smooth = Math.pow(progressT, 2.2); // Smooth ease-out entry curve

        // Distance offscreen to the left (relative to the spine line at x = 0)
        const offscreenLeft = Math.max(containerRect.left + 160, 420);

        targetXRef.current = -(1.0 - smooth) * offscreenLeft;
        targetYRef.current = startY - (1.0 - smooth) * 140;
        targetAngleRef.current = -(1.0 - smooth) * 38;
        targetOpacityRef.current = progressT > 0.08 ? Math.min(1.0, progressT / 0.35) : 0;
      } else {
        // Phase 2: Traveling straight down the vertical spine line
        const progress = Math.min(1.0, currentOffset / totalTrack);
        targetXRef.current = 0;
        targetYRef.current = startY + progress * totalTrack;
        targetAngleRef.current = 0;
        targetOpacityRef.current = 1.0;
      }

      if (!isInitializedRef.current) {
        currentXRef.current = targetXRef.current;
        currentYRef.current = targetYRef.current;
        currentAngleRef.current = targetAngleRef.current;
        currentOpacityRef.current = targetOpacityRef.current;
        isInitializedRef.current = true;
      }
    };

    let rafId = null;

    const tick = () => {
      rafId = requestAnimationFrame(tick);

      // Spring damping lerp for X, Y, Banking Angle & Opacity
      const diffX = targetXRef.current - currentXRef.current;
      currentXRef.current += diffX * 0.12;

      const diffY = targetYRef.current - currentYRef.current;
      currentYRef.current += diffY * 0.16;

      const diffAngle = targetAngleRef.current - currentAngleRef.current;
      currentAngleRef.current += diffAngle * 0.14;

      const diffOpacity = targetOpacityRef.current - currentOpacityRef.current;
      currentOpacityRef.current += diffOpacity * 0.18;

      const instantVel = Math.abs(diffY) + Math.abs(diffX);
      const smoothVel = prevVelRef.current * 0.85 + instantVel * 0.15;
      prevVelRef.current = smoothVel;

      // Update spaceship position, banking angle & opacity via GPU-accelerated transform
      if (shipContainerRef.current) {
        shipContainerRef.current.style.transform = `translate(-50%, -50%) translate(${currentXRef.current}px, ${currentYRef.current}px) rotate(${currentAngleRef.current}deg)`;
        shipContainerRef.current.style.opacity = currentOpacityRef.current.toFixed(3);
      }

      // Update golden laser beam (only draws once the spaceship merges into the line at Node 0)
      const positions = nodePositionsRef.current;
      if (beamRef.current && positions.length > 0) {
        const startY = positions[0];
        const tailOffset = 26; // Terminates seamlessly at the main rocket nozzle
        const beamHeight = Math.max(0, currentYRef.current - startY - tailOffset);
        beamRef.current.style.top = `${startY}px`;
        beamRef.current.style.height = `${beamHeight}px`;
        beamRef.current.style.opacity = currentYRef.current >= startY - 8 ? '1' : '0';
      }

      // Determine active milestone index based on ship's current Y coordinate
      if (positions.length > 0) {
        let reached = -1;
        for (let i = 0; i < positions.length; i++) {
          if (currentYRef.current >= positions[i] - 14) {
            reached = i;
          }
        }
        if (reached !== activeIdxRef.current) {
          activeIdxRef.current = reached;
          setActiveMilestoneIndex(reached);
        }
      }

      if (Math.abs(smoothVel - shipVelocity) > 0.6) {
        setShipVelocity(smoothVel);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      updateNodePositions();
      handleScroll();
    });

    handleScroll();
    rafId = requestAnimationFrame(tick);

    const settleTimer = setTimeout(() => {
      updateNodePositions();
      handleScroll();
    }, 150);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateNodePositions);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(settleTimer);
    };
  }, [updateNodePositions, isVisible, shipVelocity]);

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative w-full scroll-mt-20 pt-20 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-[#060608] z-20 border-t border-white/5 overflow-hidden"
    >
      {/* Top Horizon Transition Beam */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="pointer-events-none absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-amber-500/[0.04] via-transparent to-transparent" />

      {/* Atmospheric Glow */}
      <div
        className={`pointer-events-none absolute top-1/4 -right-32 w-[600px] h-[500px] bg-blue-600/5 blur-[140px] rounded-full transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={`flex flex-col items-start md:items-center md:text-center mb-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-[0.98]'
            }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>INNOVERSE 3.0 • MISSION ROADMAP</span>
          </div>

          <h2 className="font-display font-black text-2xl min-[380px]:text-3xl sm:text-5xl text-white tracking-tight uppercase">
            Full Journey <span className="text-amber-400">Roadmap</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-gray-300 max-w-2xl font-sans leading-relaxed">
            Register, submit an idea, and qualify through shortlisting before the two hackathon phases.
          </p>
        </div>

        {/* Informative Round Header Note */}
        <div
          className={`mb-8 sm:mb-10 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] text-center font-mono text-[11px] sm:text-xs text-amber-300 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
        >
          📋 Registration closes <strong>30 November 2026</strong>, final idea submission runs <strong>1-10 December 2026</strong>, and the hackathon begins <strong>5 January 2027</strong> and concludes <strong>6 January 2027</strong>.
        </div>

        {/* Milestone Timeline Spine */}
        <div
          ref={spineContainerRef}
          className={`relative ml-4 sm:ml-36 pl-6 sm:pl-12 space-y-6 sm:space-y-10 transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {/* Base Spine Line Track (Full height, mathematically aligned at left-0) */}
          <div className="pointer-events-none absolute top-2 bottom-2 left-0 w-[2px] -translate-x-1/2 bg-white/15" />

          {/* Active Golden Laser Beam along the spine from Node 0 into Spaceship */}
          <div
            ref={beamRef}
            className="pointer-events-none absolute left-0 -translate-x-1/2 w-[3.5px] rounded-full bg-gradient-to-b from-amber-500 via-amber-400 to-amber-300 shadow-[0_0_14px_#f59e0b,0_0_28px_rgba(245,158,11,0.6)] z-10 transition-none"
            style={{
              top: '0px',
              height: '0px',
              opacity: 0
            }}
          />

          {/* Live Scroll-Driven Spaceship Embedded Directly in the Line */}
          <div
            ref={shipContainerRef}
            className="pointer-events-none absolute left-0 top-0 z-30 will-change-transform scale-100 sm:scale-115"
            style={{
              transform: 'translate(-50%, -50%) translate(0px, 0px) rotate(0deg)',
              opacity: 0
            }}
          >
            <TimelineSpaceship velocity={shipVelocity} />
          </div>

          {TIMELINE_JOURNEY.map((item, idx) => {
            const Icon = item.icon;
            const isPassed = activeMilestoneIndex >= idx;
            const isCurrent = activeMilestoneIndex === idx;

            return (
              <div key={idx} className="relative group">
                {/* Time Indicator on Left for larger screens */}
                <div
                  className={`hidden sm:block absolute -left-44 top-3 w-36 text-right font-mono text-xs font-semibold transition-all duration-300 ${isPassed
                    ? 'text-amber-400 font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                    : 'text-white/40'
                    }`}
                >
                  {item.time}
                </div>

                {/* Spine Node / Orb: Exactly centered at left-0 on the spine track */}
                <div
                  ref={(el) => (nodeRefs.current[idx] = el)}
                  className={`absolute left-0 -translate-x-1/2 top-3 w-4 h-4 rounded-full border-2 transition-all duration-300 group-hover:scale-125 z-20 ${isPassed
                    ? 'border-amber-400 bg-amber-400 shadow-[0_0_14px_#f59e0b] scale-110'
                    : 'border-white/30 bg-[#060608] group-hover:border-amber-400/60'
                    }`}
                >
                  {/* Expanding ping ripple when spaceship actively hovers over this node */}
                  {isCurrent && (
                    <>
                      <span className="absolute -inset-1.5 rounded-full border-2 border-amber-400 animate-ping pointer-events-none" />
                      <span className="absolute -inset-1 rounded-full bg-amber-400/40 animate-pulse pointer-events-none" />
                    </>
                  )}
                </div>

                {/* Event Card */}
                <div
                  className={`rounded-xl sm:rounded-2xl border p-4 sm:p-6 transition-all duration-300 ${isCurrent
                    ? 'border-amber-400/70 bg-gradient-to-r from-amber-500/15 via-[#0f0f18] to-[#0a0a10] shadow-[0_0_35px_rgba(245,158,11,0.22)] ring-1 ring-amber-400/30'
                    : isPassed
                      ? 'border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-[#0e0e16] to-[#0e0e16] shadow-[0_0_24px_rgba(245,158,11,0.10)]'
                      : 'border-white/10 bg-[#0a0a0f]/90 hover:border-white/20 hover:bg-[#0f0f18]'
                    }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors duration-300 ${isPassed
                          ? 'bg-amber-400/20 border-amber-400/40 text-amber-300'
                          : 'bg-white/5 border-white/10 text-white/50'
                          }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-sm sm:text-lg text-white">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`sm:hidden font-mono text-[11px] font-semibold transition-colors duration-300 ${isPassed ? 'text-amber-400 font-bold' : 'text-white/40'
                          }`}
                      >
                        {item.time}
                      </span>
                      <span
                        className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded-full border transition-colors duration-300 ${isPassed
                          ? 'bg-amber-400/10 text-amber-300 border-amber-400/30'
                          : 'bg-white/5 text-white/50 border border-white/10'
                          }`}
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed mt-2 pl-0 sm:pl-11">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
