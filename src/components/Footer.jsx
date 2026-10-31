import React from 'react';
import { Terminal, ArrowUp, Compass } from 'lucide-react';

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
    <footer className="relative w-full border-t border-white/10 bg-[#040406] text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 z-20">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-black tracking-wider text-xl text-white">
                INNO<span className="text-amber-400">VERSE</span>
              </span>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                3.0
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              National Level AI & Technology Hackathon. Accelerating the frontiers of autonomous intelligence, distributed systems, and galactic engineering.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-white/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>NODE: KLS GIT BELAGAVI</span>
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
                  About Event
                </a>
              </li>
              <li>
                <a href="#tracks" onClick={(e) => scrollToSection(e, 'tracks')} className="hover:text-amber-400 transition-colors">
                  5 Arenas & Tracks
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
              <li>
                <a href="#sponsors" onClick={(e) => scrollToSection(e, 'sponsors')} className="hover:text-amber-400 transition-colors">
                  Sponsors
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-amber-400 transition-colors">
                  FAQ
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
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Boarding Pass Registration
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracks}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Track Problem Statements
                </button>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
                  Starter Template GitHub
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-amber-400 transition-colors">
                  Hacker Code of Conduct
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Venue Node Column */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold mb-4">
              Communications
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-amber-300 flex items-center justify-center transition-all text-white/70 hover:text-white"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X / Twitter"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-amber-300 flex items-center justify-center transition-all text-white/70 hover:text-white"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-amber-300 flex items-center justify-center transition-all text-white/70 hover:text-white"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>

            <div className="p-3.5 rounded-xl border border-white/10 bg-black/60 font-mono text-[11px] text-gray-400 space-y-1">
              <div className="text-white font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>VENUE COORDINATES</span>
              </div>
              <p>KLS Gogte Institute of Technology</p>
              <p className="text-white/40">15.8497° N, 74.4977° E • Belagavi</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-500">
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
