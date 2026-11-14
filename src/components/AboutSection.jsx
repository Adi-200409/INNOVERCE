import React from 'react';
import { ArrowRight } from 'lucide-react';
import AboutConstellation3D from './AboutConstellation3D';

/**
 * Props:
 *  bgImage : image URL shown behind the description text
 */
export default function AboutSection({ bgImage = '/about-bg.jpg' }) {
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
                is a National-level hackathon designed to ignite innovation and challenge brilliant minds in the domains of{' '}
                <span className="text-amber-300">Artificial Intelligence</span>,{' '}
                <span className="text-blue-400">Machine Learning</span>,{' '}
                <span className="text-emerald-400">Cybersecurity</span>, and{' '}
                <span className="text-purple-400">Blockchain</span>.
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
            MCA DEPARTMENT
            ========================================================================= */}
        <div className="rounded-3xl border border-white/10 bg-[#0a0a0e]/90 p-8 sm:p-10 md:p-12 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/[0.05] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-6">
              MCA{' '}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                DEPARTMENT
              </span>
            </h3>

            <div className="space-y-5 text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
              <p>
                <span className="text-amber-300 font-bold">MCA@GIT</span> was founded in the year{' '}
                <span className="text-cyan-300 font-semibold">1999</span>. From the last two decades this department has been nurturing graduates from the streams like BCA, BSc and BCom with excellent technical skills, managerial skills, soft skills and ethical values; as a result of which today our alumni are either successful IT professionals in top notch IT companies, entrepreneurs or academicians.
              </p>
              <p>
                The speciality of <span className="text-amber-300 font-semibold">MCA@GIT</span> is its ability to provide state-of-the-art facilities and infrastructure with the backup of highly qualified and dedicated staff. Other than adopting conventional learning process, this department imparts knowledge through workshops, expert talks, certification programmes, cultural/technical programmes, internships etc. and has thus created its unique brand identity in the entire{' '}
                <span className="text-cyan-300 font-semibold">North Karnataka</span>.
              </p>
            </div>

            <a
              href="https://git.edu/departments/department-of-master-of-computer-application/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all hover:border-amber-400/40 hover:bg-white/10 cursor-pointer"
            >
              <span>More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
