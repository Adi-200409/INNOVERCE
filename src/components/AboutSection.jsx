import React from 'react';
import {
  Users,
  GraduationCap,
  Trophy,
  Layers,
  ArrowRight,
  Sparkles,
  Cpu,
  ShieldCheck,
  Zap,
  Code2
} from 'lucide-react';
import AboutConstellation3D from './AboutConstellation3D';

export default function AboutSection({ onOpenRegister, onOpenTracks }) {
  const METRICS = [
    {
      id: 'participants',
      stat: '1,500+',
      label: 'EXPECTED PARTICIPANTS',
      subtext: '500+ shortlisted hacker squads competing non-stop across India',
      badge: 'NATIONWIDE APPLICANTS',
      icon: Users,
      glowColor: 'rgba(245, 158, 11, 0.4)',
      accentColor: '#f59e0b',
      gradient: 'from-amber-500/20 via-amber-500/5 to-transparent'
    },
    {
      id: 'colleges',
      stat: '200+',
      label: 'COLLEGES & TECH ORGS',
      subtext: 'Premier IITs, NITs, IIITs, state universities & elite developer clubs',
      badge: '28 STATES & UTS',
      icon: GraduationCap,
      glowColor: 'rgba(59, 130, 246, 0.4)',
      accentColor: '#3b82f6',
      gradient: 'from-blue-500/20 via-blue-500/5 to-transparent'
    },
    {
      id: 'prizes',
      stat: '₹50,000+',
      secondaryStat: '(₹50K CASH & BOUNTIES)',
      label: 'TOTAL PRIZE POOL',
      subtext: 'Cash awards, sponsored track winner bounties, compute grants & certificates',
      badge: 'DIRECT CASH & BOUNTIES',
      icon: Trophy,
      glowColor: 'rgba(251, 191, 36, 0.4)',
      accentColor: '#fbbf24',
      gradient: 'from-yellow-500/20 via-amber-500/5 to-transparent'
    },
    {
      id: 'tracks',
      stat: '5 Tracks',
      secondaryStat: '+ 8 Workshops',
      label: 'TRACKS & WORKSHOPS',
      subtext: 'Deep-dive problem arenas and hands-on technical masterclasses by staff engineers',
      badge: 'LIVE WORKSHOPS',
      icon: Layers,
      glowColor: 'rgba(249, 115, 22, 0.4)',
      accentColor: '#f97316',
      gradient: 'from-orange-500/20 via-orange-500/5 to-transparent'
    }
  ];

  const HIGHLIGHTS = [
    {
      icon: Cpu,
      title: 'Free GPU & API Compute Grants',
      description: 'Zero financial friction. Qualified teams receive direct cloud compute tokens and model credits to power high-parameter AI prototypes.'
    },
    {
      icon: Zap,
      title: '1-on-1 Senior Tech Mentorship',
      description: 'Continuous checkpoint guidance from engineering leads, startup CTOs, and AI researchers throughout the 24-hour sprint.'
    },
    {
      icon: ShieldCheck,
      title: 'Fast-Track Hiring & Internships',
      description: 'Sponsoring partner companies and national startups interview standout developers on-site and post-demo day.'
    },
    {
      icon: Code2,
      title: 'Real-World Production Scenarios',
      description: 'Say goodbye to toy projects. Hackers tackle authentic industry problem statements designed for real societal and economic impact.'
    }
  ];

  return (
    <section
      id="about"
      className="relative w-full min-h-screen scroll-mt-20 bg-black/40 backdrop-blur-sm text-white py-24 sm:py-32 px-4 sm:px-6 md:px-12 overflow-hidden border-t border-white/10"
    >
      {/* 3D Neural Constellation & Star Plexus Background Layer */}
      <AboutConstellation3D />

      {/* Atmospheric Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-amber-500/10 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* =========================================================================
            HEADER: Section Tag & Catchy Headline
            ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          {/* Cyber Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md mb-5 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white/90">
              ABOUT INNOVERSE // 2026 NATIONAL SPRINT
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-white leading-tight">
            WHERE VISION BECOMES{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              PRODUCTION CODE.
            </span>
          </h2>

          {/* Purpose & Vision Summary (2-3 Sentences) */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-gray-300 font-sans leading-relaxed text-balance">
            <strong className="text-white font-semibold">INNOVERSE 2026</strong> is a premier 24-hour national level hackathon uniting over 1,500+ of the country's most ambitious student developers, researchers, and innovators into a high-intensity crucible of engineering. Designed to bridge academic brilliance with real-world industry breakthroughs, teams build across autonomous AI, decentralized protocols, and next-generation interfaces. In just one nonstop day, bold ideas transform into deployable, production-ready architectures with nationwide impact.
          </p>
        </div>

        {/* =========================================================================
            KEY METRICS BAR / GRID: 4 High-Impact Metric Cards
            ========================================================================= */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>KEY IMPACT BENCHMARKS</span>
            </div>
            <span className="font-mono text-[11px] text-white/40 uppercase tracking-widest hidden sm:inline">
              LIVE TELEMETRY // 2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {METRICS.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.id}
                  className="group relative rounded-2xl border border-white/10 bg-[#0c0c10]/80 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-[#121218] hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle Top Gradient Accent */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${metric.gradient}`}
                  />
                  <div
                    className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: metric.accentColor }}
                  />

                  <div>
                    {/* Top row with icon & status badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 group-hover:scale-110 transition-transform duration-300"
                        style={{
                          boxShadow: `0 0 15px ${metric.glowColor}`
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: metric.accentColor }} />
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03]">
                        {metric.badge}
                      </span>
                    </div>

                    {/* Numeric Value */}
                    <div className="mb-2 min-h-[58px] flex flex-col justify-end">
                      <div className="font-display font-black text-2xl sm:text-3xl xl:text-3xl text-white tracking-tight flex items-baseline gap-1.5 whitespace-nowrap leading-none">
                        <span>{metric.stat}</span>
                      </div>
                      {metric.secondaryStat ? (
                        <div className="font-mono text-xs text-amber-400 font-semibold tracking-wider mt-1.5">
                          {metric.secondaryStat}
                        </div>
                      ) : (
                        <div className="h-4" />
                      )}
                    </div>

                    {/* Label */}
                    <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-white/80 mb-2">
                      {metric.label}
                    </h3>

                    {/* Subtext description */}
                    <p className="text-xs text-gray-400 font-sans leading-relaxed">
                      {metric.subtext}
                    </p>
                  </div>

                  {/* Bottom edge micro-indicator */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-white/30 uppercase tracking-widest">
                    <span>VERIFIED</span>
                    <span className="text-emerald-400/80">● ACTIVE</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            WHY PARTICIPATE / ECOSYSTEM HIGHLIGHTS
            ========================================================================= */}
        <div className="rounded-3xl border border-white/10 bg-[#0a0a0e]/90 p-8 sm:p-12 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl mb-10">
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>WHY JOIN INNOVERSE 2026</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              A Launchpad Engineered for Builders
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              Everything you need to focus 100% on building game-changing software without infrastructure friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {HIGHLIGHTS.map((h, i) => {
              const Icon = h.icon;
              return (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-400/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-white mb-1">
                      {h.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                      {h.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTAs inside About */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10">
            <div className="flex items-center gap-3 font-mono text-xs text-white/50 tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>OCTOBER 24-25, 2026 • 24 HOURS NON-STOP SPRINT</span>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenTracks}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/20 hover:border-amber-400/40 bg-white/5 hover:bg-white/10 font-mono text-xs uppercase tracking-wider font-semibold text-white transition-all cursor-pointer"
              >
                View 5 Arenas
              </button>
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.65)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
