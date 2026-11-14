import React from 'react';
import {
  Layers,
  Clock,
  Users,
  ArrowRight,
  ExternalLink,
  Award,
  GraduationCap,
  Cpu,
  BookOpen,
  MapPin,
  Sparkles
} from 'lucide-react';
import AboutConstellation3D from './AboutConstellation3D';

/**
 * Props:
 *  bgImage : image URL shown behind the description text
 */
export default function AboutSection({ bgImage = '/about-bg.jpg' }) {
  // Quick stats
  const STATS = [
    {
      id: 'themes',
      stat: '4+',
      label: 'Themes',
      icon: Layers,
      glowColor: 'rgba(245, 158, 11, 0.4)',
      accentColor: '#f59e0b',
      gradient: 'from-amber-500/20 via-amber-500/5 to-transparent'
    },
    {
      id: 'hours',
      stat: '24',
      label: 'Hours of Hacking',
      icon: Clock,
      glowColor: 'rgba(59, 130, 246, 0.4)',
      accentColor: '#3b82f6',
      gradient: 'from-blue-500/20 via-blue-500/5 to-transparent'
    },
    {
      id: 'participants',
      stat: '200+',
      label: 'Participants',
      icon: Users,
      glowColor: 'rgba(249, 115, 22, 0.4)',
      accentColor: '#f97316',
      gradient: 'from-orange-500/20 via-orange-500/5 to-transparent'
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
            WHAT IS INNOVERSE 3.0?  (HEADING + STATS + DESCRIPTION + RULES)
            ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
            <span>ABOUT INNOVERSE 3.0</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08] mb-12">
            What is{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              INNOVERSE 3.0?
            </span>
          </h2>

          {/* Stats */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  className="group relative rounded-2xl border border-white/10 bg-[#0c0c10]/80 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-[#121218] hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden text-left"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.gradient}`} />
                  <div
                    className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: s.accentColor }}
                  />
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ boxShadow: `0 0 15px ${s.glowColor}` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: s.accentColor }} />
                  </div>
                  <div className="font-mono [font-variant-numeric:lining-nums_slashed-zero] font-black text-4xl sm:text-5xl text-white tracking-tight leading-none mb-2">
                    {s.stat}
                  </div>
                  <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-white/80">
                    {s.label}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Description over photo background */}
          <div
            className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900 bg-cover bg-center shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div className="absolute inset-0 bg-[#0a0a0e]/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.06] via-transparent to-blue-500/[0.06] pointer-events-none" />
            <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-10 py-14 sm:py-16 text-center text-sm sm:text-base text-gray-300 font-sans leading-relaxed space-y-6">
              <p>
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  INNOVERSE 3.0
                </span>{' '}
                is a National-level hackathon designed to ignite innovation and challenge brilliant minds across 4 sector focus areas:{' '}
                <span className="text-amber-300">Fintech</span>,{' '}
                <span className="text-blue-400">Educational Technology</span>,{' '}
                <span className="text-emerald-400">Healthcare</span>, and{' '}
                <span className="text-orange-400">Agriculture</span>.
              </p>
              <p>
                Organized by the{' '}
                <span className="text-amber-400 underline decoration-amber-400/40 underline-offset-4">
                  Department of MCA, KLS Gogte Institute of Technology
                </span>
                , this event unites creative thinkers and tech enthusiasts to craft impactful solutions within an intense{' '}
                <span className="text-white bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded">
                  24-hour coding marathon
                </span>
                .
              </p>
              <p>
                <span className="text-cyan-300">
                  With separate competitive tracks for MCA and BCA students,
                </span>{' '}
                <span className="text-amber-400">INNOVERSE 3.0</span> aims to inspire new ideas, build futuristic prototypes, and celebrate the spirit of technology and teamwork.
              </p>
              <p>See you at the hackathon! 🚀💻</p>
            </div>
          </div>

          {/* Rules button */}
          <a
            href="/rules"
            className="mt-10 px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
          >
            <span>Rules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* =========================================================================
            MCA DEPARTMENT OVERVIEW
            ========================================================================= */}
        <div className="relative rounded-3xl border border-white/10 bg-[#0a0a0f]/90 p-6 sm:p-10 md:p-12 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-amber-400/30">
          {/* Subtle Ambient Radial Backdrops */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.04),transparent_50%)]" />

          <div className="relative z-10">
            {/* Top Telemetry Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>ORGANIZING DEPARTMENT • KLS GIT</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-white/50">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Belagavi, Karnataka • Est. 1999</span>
              </div>
            </div>

            {/* Main Content Grid: Narrative & Key Feature Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Narrative & Focus Pills (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                    MCA{' '}
                    <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                      DEPARTMENT
                    </span>
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-amber-400/80 mt-1 uppercase tracking-wider">
                    KLS Gogte Institute of Technology • Belagavi
                  </p>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-gray-300 font-sans leading-relaxed border-l-2 border-amber-400/40 pl-5">
                  <p>
                    <span className="text-amber-300 font-bold">MCA@GIT</span> was founded in the year{' '}
                    <span className="text-cyan-300 font-semibold">1999</span>. From the last two decades this department has been nurturing graduates from streams like{' '}
                    <span className="text-white font-medium">BCA, BSc, and BCom</span> with excellent technical skills, managerial skills, soft skills, and ethical values; as a result of which today our alumni are successful IT professionals in top-notch IT companies, entrepreneurs, or academicians.
                  </p>
                  <p>
                    The speciality of <span className="text-amber-300 font-semibold">MCA@GIT</span> is its ability to provide state-of-the-art facilities and infrastructure with the backup of highly qualified and dedicated staff. Other than adopting conventional learning processes, this department imparts knowledge through workshops, expert talks, certification programmes, cultural/technical conclaves, and internships, creating a unique brand identity in the entire{' '}
                    <span className="text-cyan-300 font-semibold">North Karnataka</span>.
                  </p>
                </div>

                {/* Focus Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                    🎓 BCA, BSc & BCom Pathways
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                    💼 Global Corporate Alumni
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                    ⚡ 24/7 Innovation Labs
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                    🏛️ North Karnataka Brand
                  </span>
                </div>

                {/* More / Official Link Button */}
                <div className="pt-2">
                  <a
                    href="https://git.edu/departments/department-of-master-of-computer-application/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400 hover:text-black px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-amber-300 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] cursor-pointer group hover:scale-[1.02]"
                  >
                    <span>Explore Department</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: 4 High-Tech Feature Pillar Cards (5 cols) */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="group rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] p-5 backdrop-blur-md transition-all duration-300 hover:border-amber-400/40">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 group-hover:scale-105 transition-transform">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-display font-bold text-base text-white">Founded 1999</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          25+ YRS
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed">
                        Over two decades of academic excellence, ethical grounding, and institutional leadership.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] p-5 backdrop-blur-md transition-all duration-300 hover:border-blue-400/40">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400 group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-display font-bold text-base text-white">Diverse Streams</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          INCLUSIVE
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed">
                        Nurturing BCA, BSc, and BCom graduates into industry-ready software engineers and innovators.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] p-5 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/40">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400 group-hover:scale-105 transition-transform">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-display font-bold text-base text-white">Modern Infrastructure</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          LABS
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed">
                        State-of-the-art computational facilities supported by dedicated research faculty.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] p-5 backdrop-blur-md transition-all duration-300 hover:border-purple-400/40">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-400 group-hover:scale-105 transition-transform">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-display font-bold text-base text-white">Brand Recognition</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          LEADERSHIP
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed">
                        Renowned across North Karnataka for experiential workshops, talks, and corporate internships.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Institutional Sub-telemetry Footer */}
            <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-white/40">
              <span>Department of Master of Computer Applications • KLS GIT</span>
              <span className="text-amber-400/60">Autonomous Institution • Affiliated to VTU Belagavi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
