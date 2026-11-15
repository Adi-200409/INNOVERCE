import React from 'react';
import {
  Terminal,
  Sparkles,
  ExternalLink,
  MapPin,
  Cpu,
  Layers,
  Award,
  BookOpen,
  Briefcase
} from 'lucide-react';

export default function McaDepartment() {
  // Experiential pedagogical avenues directly from the narrative
  const LEARNING_MODALITIES = [
    { name: 'Hands-on Workshops', icon: Terminal, color: 'text-amber-400' },
    { name: 'Industry Expert Talks', icon: Sparkles, color: 'text-cyan-400' },
    { name: 'Certification Programmes', icon: Award, color: 'text-emerald-400' },
    { name: 'Cultural & Tech Conclaves', icon: Layers, color: 'text-purple-400' },
    { name: 'High-Impact Internships', icon: Briefcase, color: 'text-orange-400' }
  ];

  return (
    <section id="mca-department" className="relative w-full">
      {/* Background radial glows tailored to the section */}
      <div className="pointer-events-none absolute -top-32 left-1/4 w-[500px] h-[350px] bg-amber-500/[0.07] rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 w-[500px] h-[350px] bg-blue-600/[0.07] rounded-full blur-[140px]" />

      {/* Main Glass Shell */}
      <div className="relative rounded-3xl border border-white/10 bg-[#0a0a0f]/90 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.75)]">
        {/* Subtle Matrix Dot Grid Background */}
        <div className="pointer-events-none absolute inset-0 bg-tech-dots opacity-40" />

        {/* Decorative Sci-Fi HUD Crosshairs */}
        <div className="pointer-events-none absolute top-4 left-4 text-white/20 font-mono text-xs select-none">+</div>
        <div className="pointer-events-none absolute top-4 right-4 text-white/20 font-mono text-xs select-none">+</div>
        <div className="pointer-events-none absolute bottom-4 left-4 text-white/20 font-mono text-xs select-none">+</div>
        <div className="pointer-events-none absolute bottom-4 right-4 text-white/20 font-mono text-xs select-none">+</div>

        <div className="relative z-10 space-y-8 sm:space-y-10">
          {/* =========================================================================
              1. SECTION HEADER & TELEMETRY STRIP
              ========================================================================= */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3.5 max-w-2xl">
              {/* Institutional Affiliation Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ORGANIZER // KLS GIT • DEPARTMENT OF MCA</span>
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1]">
                MCA{' '}
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  DEPARTMENT
                </span>
              </h3>

              <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
                KLS Gogte Institute of Technology, Belagavi — The academic pillar and host steering INNOVERSE 3.0.
              </p>
            </div>

            {/* Quick Metrics Ribbon */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 shrink-0">
              <div className="px-3.5 sm:px-4 py-2.5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-center">
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400">ESTABLISHED</div>
                <div className="text-lg sm:text-xl font-mono font-bold text-amber-400">1999</div>
              </div>
              <div className="px-3.5 sm:px-4 py-2.5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-center">
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400">HERITAGE</div>
                <div className="text-lg sm:text-xl font-mono font-bold text-cyan-300">25+ YRS</div>
              </div>
              <div className="px-3.5 sm:px-4 py-2.5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-center">
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400">BENCHMARK</div>
                <div className="text-xs sm:text-sm font-mono font-bold text-emerald-400 leading-tight pt-1">
                  N. KARNATAKA
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              2. DEPARTMENT NARRATIVE BADGE (Renamed from All Telemetry)
              ========================================================================= */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
              <span>Department Narrative</span>
            </div>
            <span className="font-mono text-[11px] text-gray-400 tracking-wider hidden sm:inline">
              SYS_SPEC // MCA_PROFILE_V3.LOG
            </span>
          </div>

          {/* =========================================================================
              3. MASTER NARRATIVE TERMINAL FRAME (Full Width Centerpiece)
              ========================================================================= */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/15 bg-[#0d0e15]/95 overflow-hidden shadow-[0_12px_45px_rgba(0,0,0,0.6)]">
              {/* Terminal Status Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 font-mono text-[11px] text-gray-400 tracking-wider">
                    CONSOLE // MCA_PROFILE_V3.SYS
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    ACCREDITED
                  </span>
                </div>
              </div>

              {/* Core Narrative Text - 100% PRESERVED VERBATIM */}
              <div className="p-6 sm:p-8 space-y-6 text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
                {/* Paragraph 1: Foundation & Feeder Disciplines */}
                <div className="relative pl-5 border-l-2 border-amber-400/70 space-y-2 bg-gradient-to-r from-amber-500/[0.04] to-transparent py-2 rounded-r-xl">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3" />
                    <span>FOUNDATION & FEEDER DISCIPLINES</span>
                  </div>
                  <p>
                    <span className="text-amber-300 font-bold">MCA@GIT</span> was founded in the year{' '}
                    <span className="text-cyan-300 font-semibold font-mono">1999</span>. From the last two decades this department has been nurturing graduates from the streams like{' '}
                    <span className="text-white font-medium bg-white/5 border border-white/15 px-1.5 py-0.5 rounded shadow-sm">BCA</span>,{' '}
                    <span className="text-white font-medium bg-white/5 border border-white/15 px-1.5 py-0.5 rounded shadow-sm">BSc</span> and{' '}
                    <span className="text-white font-medium bg-white/5 border border-white/15 px-1.5 py-0.5 rounded shadow-sm">BCom</span>{' '}
                    with excellent technical skills, managerial skills, soft skills and ethical values; as a result of which today our alumni are either successful IT professionals in top notch IT companies, entrepreneurs or academicians.
                  </p>
                </div>

                {/* Paragraph 2: Speciality & Pedagogy */}
                <div className="relative pl-5 border-l-2 border-blue-400/70 space-y-2 bg-gradient-to-r from-blue-500/[0.04] to-transparent py-2 rounded-r-xl">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
                    <Cpu className="w-3 h-3" />
                    <span>FACILITIES, STAFF & PEDAGOGY</span>
                  </div>
                  <p>
                    The speciality of <span className="text-amber-300 font-semibold">MCA@GIT</span> is its ability to provide state-of-the-art facilities and infrastructure with the backup of highly qualified and dedicated staff. Other than adopting conventional learning process, this department imparts knowledge through workshops, expert talks, certification programmes, cultural/technical programmes, internships etc. and has thus created its unique brand identity in the entire{' '}
                    <span className="text-cyan-300 font-semibold underline decoration-cyan-400/40 underline-offset-4">North Karnataka</span>.
                  </p>
                </div>
              </div>

              {/* Terminal Action Bar */}
              <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>KLS GIT Campus, Udyambag, Belagavi - 590008</span>
                </div>

                {/* Official Academics Portal CTA */}
                <a
                  href="https://git.edu/programmes/pg/mca/academics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all hover:scale-105 cursor-pointer"
                >
                  <span>Official Academics Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Experiential Modalities Strip */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Experiential Learning Modalities</span>
                </span>
                <span className="font-mono text-[10px] text-amber-400/90 border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 rounded">
                  BEYOND CONVENTIONAL
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {LEARNING_MODALITIES.map((mod, idx) => {
                  const Icon = mod.icon;
                  return (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-xs font-sans text-gray-200 hover:border-amber-400/40 hover:bg-amber-400/5 transition-all"
                    >
                      <Icon className={`w-3.5 h-3.5 ${mod.color}`} />
                      <span>{mod.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
