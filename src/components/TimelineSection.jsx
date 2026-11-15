import React from 'react';
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
        className={`pointer-events-none absolute top-1/4 -right-32 w-[600px] h-[500px] bg-blue-600/5 blur-[140px] rounded-full transition-opacity duration-1000 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={`flex flex-col items-start md:items-center md:text-center mb-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.98]'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>INNOVERSE 3.0 • MISSION ROADMAP</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            Full Journey <span className="text-amber-400">Roadmap</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl font-sans">
            Register, submit an idea, and qualify through shortlisting before the two hackathon phases.
          </p>
        </div>

        {/* Informative Round Header Note */}
        <div
          className={`mb-10 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] text-center font-mono text-xs text-amber-300 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          📋 Registration closes <strong>30 November 2026</strong>, final idea submission runs <strong>1-10 December 2026</strong>, and the hackathon begins <strong>5 January 2027</strong> and concludes <strong>6 January 2027</strong>.
        </div>

        {/* Milestone Timeline Spine */}
        <div
          className={`relative border-l-2 border-white/10 ml-4 sm:ml-32 pl-6 sm:pl-10 space-y-8 sm:space-y-10 transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {TIMELINE_JOURNEY.map((item, idx) => {
            const Icon = item.icon;
            const isHighlight = item.highlight;

            return (
              <div key={idx} className="relative group">
                {/* Time Indicator on Left for larger screens */}
                <div className="hidden sm:block absolute -left-44 top-1 w-32 text-right font-mono text-xs font-semibold text-amber-400">
                  {item.time}
                </div>

                {/* Spine Node / Orb */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                    isHighlight
                      ? 'border-amber-400 bg-amber-400 shadow-[0_0_12px_#f59e0b]'
                      : 'border-white/30 bg-[#060608] group-hover:border-amber-400'
                  }`}
                />

                {/* Event Card */}
                <div
                  className={`rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
                    isHighlight
                      ? 'border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-[#0e0e16] to-[#0e0e16] shadow-[0_0_30px_rgba(245,158,11,0.12)]'
                      : 'border-white/10 bg-[#0a0a0f]/90 hover:border-white/20 hover:bg-[#0f0f18]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                          isHighlight
                            ? 'bg-amber-400/20 border-amber-400/40 text-amber-300'
                            : 'bg-white/5 border-white/10 text-white/70'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-white">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="sm:hidden font-mono text-xs text-amber-400 font-semibold">
                        {item.time}
                      </span>
                      <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/10">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed mt-2 pl-11">
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

