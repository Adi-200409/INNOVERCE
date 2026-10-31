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
  Code2,
  Bot,
  Brain,
  Shield,
  Blocks,
  Rocket,
  MapPin,
  Clock,
  Terminal,
  CheckCircle2,
  Scale,
  Award,
  Flame,
  Laptop,
  Ticket
} from 'lucide-react';
import AboutConstellation3D from './AboutConstellation3D';

export default function AboutSection({ onOpenRegister, onOpenTracks }) {
  // Key Telemetry Impact Benchmarks
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
      stat: '₹35,000',
      secondaryStat: '(₹35K PRIZE POOL)',
      label: 'TOTAL PRIZE POOL',
      subtext: '₹12K First & ₹6K Second Prize across separate MCA & BCA leagues',
      badge: '12K 1ST • 6K 2ND',
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

  // 4 Core Technology Pillars
  const CORE_DOMAINS = [
    {
      id: 'ai',
      title: 'Artificial Intelligence',
      tag: 'AUTONOMOUS REASONING & GENAI',
      icon: Bot,
      accentColor: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.35)',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
      bgGlow: 'group-hover:bg-amber-500/[0.08]',
      description:
        'Harness large language models, agentic workflows, autonomous reasoning systems, and generative pipelines to architect the future of intelligent computation.',
      chips: ['LLMs & RAG', 'Agentic Systems', 'Autonomous AI', 'Prompt Ops']
    },
    {
      id: 'ml',
      title: 'Machine Learning',
      tag: 'DEEP LEARNING & NEURAL MODELS',
      icon: Brain,
      accentColor: '#3b82f6',
      glowColor: 'rgba(59, 130, 246, 0.35)',
      borderColor: 'border-blue-500/30 hover:border-blue-400',
      bgGlow: 'group-hover:bg-blue-500/[0.08]',
      description:
        'Build and train high-accuracy predictive pipelines, real-time computer vision models, NLP transformers, and advanced deep learning networks on production datasets.',
      chips: ['Computer Vision', 'Deep Learning', 'Predictive AI', 'NLP Transformers']
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      tag: 'ZERO-TRUST & THREAT DEFENSE',
      icon: Shield,
      accentColor: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.35)',
      borderColor: 'border-emerald-500/30 hover:border-emerald-400',
      bgGlow: 'group-hover:bg-emerald-500/[0.08]',
      description:
        'Harden digital infrastructure against sophisticated attacks with zero-trust architectures, ethical exploit mitigation, automated threat intelligence, and cryptography.',
      chips: ['Zero-Trust Arch', 'Cryptography', 'Ethical Hacking', 'Threat Telemetry']
    },
    {
      id: 'blockchain',
      title: 'Blockchain & Web3',
      tag: 'DECENTRALIZED CONSENSUS',
      icon: Blocks,
      accentColor: '#a855f7',
      glowColor: 'rgba(168, 85, 247, 0.35)',
      borderColor: 'border-purple-500/30 hover:border-purple-400',
      bgGlow: 'group-hover:bg-purple-500/[0.08]',
      description:
        'Engineer verifiable decentralized applications (dApps), robust smart contracts, DeFi ecosystems, and cryptographic consensus protocols on modern distributed ledgers.',
      chips: ['Smart Contracts', 'Web3 Protocols', 'dApps', 'Consensus Ledgers']
    }
  ];

  // Dual Student Divisions (MCA vs BCA)
  const DIVISIONS = [
    {
      id: 'mca',
      tier: 'POSTGRADUATE LEAGUE',
      name: 'MCA Track',
      badge: 'MASTERS DIVISION',
      icon: GraduationCap,
      accentColor: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.25)',
      borderGradient: 'from-amber-500/40 via-amber-400/20 to-transparent',
      audience: 'Master of Computer Applications & PG Tech Scholars',
      focus:
        'Engineered for advanced enterprise architectures, distributed computing, deep research-grade AI/ML models, and fault-tolerant production systems.',
      perks: [
        '🥇 1st Prize: ₹12,000 Direct Cash Award + PG Trophy',
        '🥈 2nd Prize: ₹6,000 Direct Cash Award + PG Trophy',
        'Team Size: 3 Members per Squad (Fixed)',
        'Dedicated PG Evaluation Panel & Research-Grade Rubric'
      ]
    },
    {
      id: 'bca',
      tier: 'UNDERGRADUATE LEAGUE',
      name: 'BCA Track',
      badge: 'BACHELORS DIVISION',
      icon: Laptop,
      accentColor: '#3b82f6',
      glowColor: 'rgba(59, 130, 246, 0.25)',
      borderGradient: 'from-blue-500/40 via-blue-400/20 to-transparent',
      audience: 'Bachelor of Computer Applications & UG Innovators',
      focus:
        'Optimized for rapid product prototyping, creative UI/UX, agile full-stack apps, fresh problem solving, and high-impact software solutions.',
      perks: [
        '🥇 1st Prize: ₹12,000 Direct Cash Award + UG Trophy',
        '🥈 2nd Prize: ₹6,000 Direct Cash Award + UG Trophy',
        'Team Size: 3 Members per Squad (Fixed)',
        'Dedicated UG Evaluation Panel & Fair Innovation Rubric'
      ]
    }
  ];

  // Highlights
  const HIGHLIGHTS = [
    {
      icon: Cpu,
      title: 'Free GPU & API Compute Grants',
      description:
        'Zero financial friction. Qualified teams receive direct cloud compute tokens and model credits to power high-parameter AI prototypes.'
    },
    {
      icon: Zap,
      title: '1-on-1 Senior Tech Mentorship',
      description:
        'Continuous checkpoint guidance from engineering leads, startup CTOs, and AI researchers throughout the 24-hour sprint.'
    },
    {
      icon: ShieldCheck,
      title: 'Fast-Track Hiring & Internships',
      description:
        'Sponsoring partner companies and national startups interview standout developers on-site and post-demo day.'
    },
    {
      icon: Code2,
      title: 'Real-World Production Scenarios',
      description:
        'Say goodbye to toy projects. Hackers tackle authentic industry problem statements designed for real societal and economic impact.'
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
      <div className="pointer-events-none absolute top-1/3 -right-20 w-[550px] h-[450px] bg-blue-600/10 blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 -left-20 w-[500px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-20 sm:space-y-28">
        {/* =========================================================================
            HEADER & OFFICIAL MISSION DIRECTIVE DOSSIER
            ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Cyber Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/[0.06] backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">
              ABOUT INNOVERSE // 3.0 NATIONAL SPRINT
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08] mb-6">
            WHERE VISION BECOMES{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              PRODUCTION CODE.
            </span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-gray-400 uppercase tracking-widest mb-10 max-w-2xl">
            National-Level 24-Hour Hackathon • Department of MCA, KLS GIT Belagavi
          </p>

          {/* =====================================================================
              CYBERNETIC MISSION DOSSIER / TERMINAL CARD
              Contains the user's official text formatted with high aesthetic polish
              ===================================================================== */}
          <div className="w-full text-left rounded-3xl border border-white/15 bg-[#0a0a0e]/90 p-6 sm:p-10 md:p-12 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden group">
            {/* Ambient inner radial glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/[0.06] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/[0.05] rounded-full blur-3xl pointer-events-none" />

            {/* Terminal Window Header Bar */}
            <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-white/10 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-3 font-mono text-[11px] sm:text-xs text-white/50 tracking-wider flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>MISSION_DIRECTIVE // INNOVERSE-3.0.sh</span>
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>STATUS: ENCRYPTED // LIVE SPRINT</span>
              </div>
            </div>

            {/* Official Narrative Paragraphs */}
            <div className="space-y-6 text-sm sm:text-base md:text-lg text-gray-200 font-sans leading-relaxed">
              <p className="flex items-start gap-3">
                <span className="font-mono text-amber-400 text-xs sm:text-sm font-bold pt-1 select-none">
                  01 //
                </span>
                <span>
                  <strong className="text-white font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    INNOVERSE 3.0
                  </strong>{' '}
                  is a National-level hackathon designed to ignite innovation and challenge brilliant minds in the domains of{' '}
                  <span className="text-amber-300 font-semibold">Artificial Intelligence</span>,{' '}
                  <span className="text-blue-400 font-semibold">Machine Learning</span>,{' '}
                  <span className="text-emerald-400 font-semibold">Cybersecurity</span>, and{' '}
                  <span className="text-purple-400 font-semibold">Blockchain</span>.
                </span>
              </p>

              <p className="flex items-start gap-3">
                <span className="font-mono text-amber-400 text-xs sm:text-sm font-bold pt-1 select-none">
                  02 //
                </span>
                <span>
                  Organized by the{' '}
                  <span className="text-amber-400 font-bold underline decoration-amber-400/40 underline-offset-4">
                    Department of MCA, KLS Gogte Institute of Technology
                  </span>
                  , this event unites creative thinkers and tech enthusiasts to craft impactful solutions within an{' '}
                  <span className="text-white font-semibold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    intense 24-hour coding marathon
                  </span>
                  .
                </span>
              </p>

              <p className="flex items-start gap-3">
                <span className="font-mono text-amber-400 text-xs sm:text-sm font-bold pt-1 select-none">
                  03 //
                </span>
                <span>
                  With{' '}
                  <span className="text-cyan-300 font-bold bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                    separate competitive tracks for MCA and BCA students
                  </span>
                  , INNOVERSE 3.0 aims to inspire new ideas, build futuristic prototypes, and celebrate the spirit of technology and teamwork.
                </span>
              </p>
            </div>

            {/* Squad Rules & Selection Stages Dossier */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="font-mono text-[10px] text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>TEAM SIZE (FIXED)</span>
                </div>
                <div className="text-white font-bold text-sm">3 Members Per Team</div>
                <div className="text-gray-400 text-[11px] font-sans mt-0.5">Strict squad size requirement</div>
              </div>

              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5" />
                  <span>REGISTRATION FEE</span>
                </div>
                <div className="text-white font-bold text-sm">₹300 Per Team</div>
                <div className="text-gray-400 text-[11px] font-sans mt-0.5">Preliminary review & entry</div>
              </div>

              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="font-mono text-[10px] text-yellow-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>PRIZE POOL</span>
                </div>
                <div className="text-amber-400 font-bold text-sm">₹35K Pool (MCA & BCA)</div>
                <div className="text-gray-400 text-[11px] font-sans mt-0.5">₹12K (1st) • ₹6K (2nd) each</div>
              </div>

              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SELECTION STAGES</span>
                </div>
                <div className="text-white font-bold text-sm">Preliminary ➔ Final</div>
                <div className="text-gray-400 text-[11px] font-sans mt-0.5">Online review to 24h sprint</div>
              </div>
            </div>

            {/* High-Impact Callout Banner inside Terminal */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-5 rounded-2xl border border-amber-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Rocket className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="font-display font-black text-base sm:text-lg text-white flex items-center gap-2">
                    <span>See you at the hackathon!</span>
                    <span className="text-lg">🚀💻</span>
                  </h4>
                  <p className="text-xs text-gray-400 font-sans">
                    24 hours. Zero limits. Build the future with India's brightest builders.
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 shrink-0"
              >
                <span>Claim Your Spot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Micro-Telemetry Badges */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/5 font-mono text-[11px] text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>24-Hour Non-Stop</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>KLS GIT • Belagavi</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                <span>MCA & BCA Divisions</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-purple-400" />
                <span>National Hackathon</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 2: 4 CORE TECHNOLOGICAL ARENAS (AI, ML, CYBERSECURITY, BLOCKCHAIN)
            ========================================================================= */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TECHNOLOGICAL PILLARS</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
                4 Specialized Battleground Arenas
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md font-sans">
              Choose your specialized frontier or intersect multiple domains to build high-leverage software prototypes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CORE_DOMAINS.map((domain) => {
              const Icon = domain.icon;
              return (
                <div
                  key={domain.id}
                  className={`group relative rounded-2xl border ${domain.borderColor} bg-[#0c0c10]/85 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden`}
                >
                  {/* Hover ambient flare */}
                  <div
                    className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: domain.accentColor }}
                  />

                  <div>
                    {/* Top Row: Icon + Tag */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 group-hover:scale-110 transition-transform duration-300"
                        style={{
                          boxShadow: `0 0 16px ${domain.glowColor}`
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: domain.accentColor }} />
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.04] text-white/50 group-hover:text-white/80 transition-colors">
                        ARENA // 0{CORE_DOMAINS.indexOf(domain) + 1}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                      {domain.tag}
                    </span>
                    <h4 className="font-display font-black text-lg sm:text-xl text-white mb-3">
                      {domain.title}
                    </h4>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed mb-6">
                      {domain.description}
                    </p>
                  </div>

                  {/* Chips footer */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {domain.chips.map((chip, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-gray-300 group-hover:border-white/20 transition-colors"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            SECTION 3: DUAL COMPETITIVE TRACKS (MCA vs BCA LEAGUES)
            Highlights the user's specific note: "separate competitive tracks for MCA and BCA"
            ========================================================================= */}
        <div className="rounded-3xl border border-white/15 bg-[#0a0a0e]/90 p-8 sm:p-12 backdrop-blur-2xl relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/[0.06] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/[0.06] rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="max-w-2xl mb-10">
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-amber-400">
              <Scale className="w-3.5 h-3.5" />
              <span>DUAL-LEAGUE ARCHITECTURE</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              Separate Competitive Tracks for MCA & BCA
            </h3>
            <p className="text-sm text-gray-400 mt-2 font-sans">
              To inspire new ideas and celebrate technological spirit fairly, INNOVERSE 3.0 features independent judging panels and dedicated championship prize pools for each academic division.
            </p>
          </div>

          {/* Dual Division Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
            {DIVISIONS.map((div) => {
              const Icon = div.icon;
              return (
                <div
                  key={div.id}
                  className="relative rounded-2xl border border-white/15 bg-white/[0.02] p-7 sm:p-8 backdrop-blur-md hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Gradient top bar */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${div.borderGradient}`}
                  />

                  <div>
                    {/* Top pill & icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/15 bg-white/5"
                          style={{ boxShadow: `0 0 16px ${div.glowColor}` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: div.accentColor }} />
                        </div>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 block">
                            {div.tier}
                          </span>
                          <h4 className="font-display font-black text-xl sm:text-2xl text-white">
                            {div.name}
                          </h4>
                        </div>
                      </div>

                      <span
                        className="font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                        style={{
                          color: div.accentColor,
                          borderColor: `${div.accentColor}40`,
                          backgroundColor: `${div.accentColor}10`
                        }}
                      >
                        {div.badge}
                      </span>
                    </div>

                    <div className="mb-4 font-mono text-xs text-white/90 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 inline-block">
                      🎯 Target: {div.audience}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-6">
                      {div.focus}
                    </p>

                    {/* Perks / Guarantees Checklist */}
                    <div className="space-y-2.5 mb-6">
                      {div.perks.map((perk, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: div.accentColor }}
                          />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card bottom footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-gray-400">
                    <span>EVALUATION // INDEPENDENT</span>
                    <span className="text-white font-semibold flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" style={{ color: div.accentColor }} />
                      <span>DEDICATED TROPHY & CASH</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fair Competition Banner */}
          <div className="mt-8 p-4 rounded-xl border border-white/10 bg-white/[0.03] flex items-center gap-3 text-xs sm:text-sm text-gray-300 font-sans">
            <Scale className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              <strong className="text-white font-semibold">Equal Glory, Fair Battles:</strong> Separate problem statements, independent evaluation rubrics, and dedicated trophies ensure every participant competes on a level playing field without unfair cross-tier bias.
            </span>
          </div>
        </div>

        {/* =========================================================================
            SECTION 4: KEY TELEMETRY IMPACT BENCHMARKS (4 METRIC CARDS)
            ========================================================================= */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>KEY IMPACT BENCHMARKS</span>
            </div>
            <span className="font-mono text-[11px] text-white/40 uppercase tracking-widest hidden sm:inline">
              LIVE TELEMETRY // 3.0
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

                    {/* Numeric Value with lining numbers */}
                    <div className="mb-2 min-h-[58px] flex flex-col justify-end">
                      <div className="font-mono [font-variant-numeric:lining-nums_slashed-zero] font-black text-2xl sm:text-3xl xl:text-3xl text-white tracking-tight flex items-baseline gap-1.5 whitespace-nowrap leading-none">
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
            SECTION 5: HOST ACCREDITATION & CAMPUS SPOTLIGHT (KLS GIT BELAGAVI)
            ========================================================================= */}
        <div className="rounded-3xl border border-white/10 bg-[#0a0a0e]/90 p-8 sm:p-10 backdrop-blur-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 font-mono text-[11px] uppercase tracking-widest mb-4">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>ORGANIZING HOST INSTITUTION</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-3">
                Department of Master of Computer Applications
              </h3>
              <p className="font-mono text-xs sm:text-sm text-amber-400 font-medium mb-4">
                KLS Gogte Institute of Technology • Belagavi, Karnataka
              </p>
              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                Established as an autonomous center of engineering and technical excellence under Visvesvaraya Technological University (VTU), KLS GIT's Department of MCA cultivates leading industry architects, researchers, and innovators. Equipped with modern high-speed compute clusters, dedicated hackathon auditoriums, and 24/7 technical infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0 font-mono text-xs">
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="text-amber-400 font-bold mb-1">📍 LOCATION</div>
                <div className="text-gray-300">Belagavi, Karnataka</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="text-blue-400 font-bold mb-1">⚡ CONNECTIVITY</div>
                <div className="text-gray-300">High-Speed Wi-Fi 6</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="text-emerald-400 font-bold mb-1">🔋 POWER</div>
                <div className="text-gray-300">24/7 Redundant Grid</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="text-purple-400 font-bold mb-1">☕ FUEL</div>
                <div className="text-gray-300">Catering & Red Bull</div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 6: WHY PARTICIPATE / ECOSYSTEM HIGHLIGHTS
            ========================================================================= */}
        <div className="rounded-3xl border border-white/10 bg-[#0a0a0e]/90 p-8 sm:p-12 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl mb-10">
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>WHY JOIN INNOVERSE 3.0</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              A Launchpad Engineered for Builders
            </h3>
            <p className="text-sm text-gray-400 mt-2 font-sans">
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
            <div className="flex items-center gap-3 font-mono text-xs text-white/60 tracking-wider">
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
