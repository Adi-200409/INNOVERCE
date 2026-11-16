import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ onOpenRegister, onOpenTracks }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="relative w-full border-t border-white/10 bg-[#040406] text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 z-20">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand Column */}
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-display font-black tracking-wider text-xl text-white">
                INNO<span className="text-amber-400">VERSE</span>
              </span>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                3.0
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-sm">
              National Level AI & Technology Hackathon. Accelerating the frontiers of autonomous intelligence, distributed systems, and galactic engineering.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-white/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>NODE: LIVE HACKATHON</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold mb-4">
              Mission
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-gray-400">
              <li>
                <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-amber-400 transition-colors">
                  About Event & MCA Dept
                </a>
              </li>
              <li>
                <a href="#tracks" onClick={(e) => scrollToSection(e, 'tracks')} className="hover:text-amber-400 transition-colors">
                  Sector Focus Areas
                </a>
              </li>
              <li>
                <a href="#schedule" onClick={(e) => scrollToSection(e, 'schedule')} className="hover:text-amber-400 transition-colors">
                  24h Flight Schedule
                </a>
              </li>
              <li>
                <a href="#prizes" onClick={(e) => scrollToSection(e, 'prizes')} className="hover:text-amber-400 transition-colors">
                  Prizes & Bounties
                </a>
              </li>
            </ul>
          </div>

          {/* Resource Links Column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-gray-400">
              <li>
                <button
                  onClick={onOpenRegister}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Boarding Pass Registration
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracks}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Track Problem Statements
                </button>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
                  Starter Template GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-500 text-center sm:text-left">
          <p>© 2026 INNOVERSE 3.0 HACKATHON. ALL ORBITAL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-gray-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <span>Back to Orbit</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
