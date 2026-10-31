import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenRegister, _onOpenTracks, isReady = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pointer-events-none px-3 pt-3 sm:px-6 transition-all duration-700 ease-out ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
    >
      <div className="mx-auto max-w-6xl rounded-full border border-white/15 bg-[#08080c]/92 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(168,85,247,0.12)] hover:border-white/30 transition-all duration-300 pointer-events-auto">
        <nav className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand Wordmark with Glowing Accent Dots */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="flex flex-col items-start gap-1">
              <span className="font-display font-black tracking-wider text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                <span>INNO<span className="text-amber-400">VERSE</span></span>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-400 px-1.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 shadow-[0_0_8px_rgba(245,158,11,0.2)] [font-variant-numeric:lining-nums_slashed-zero]">3.0</span>
              </span>
              {/* Brand Telemetry Sequence Dots */}
              <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links (Responsive Gaps & Crystal Clear High Contrast) */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-2.5 xl:gap-4">
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className="font-mono text-xs uppercase tracking-wider text-white/75 hover:text-white px-2.5 py-1.5 rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('tracks')}
                className="font-mono text-xs uppercase tracking-wider text-white/75 hover:text-white px-2.5 py-1.5 rounded-full hover:bg-white/10 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Tracks</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                  5
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('schedule')}
                className="font-mono text-xs uppercase tracking-wider text-white/75 hover:text-white px-2.5 py-1.5 rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                Schedule
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('prizes')}
                className="font-mono text-xs uppercase tracking-wider text-white/75 hover:text-white px-2.5 py-1.5 rounded-full hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Prizes</span>
                <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 border border-blue-500/40 text-[9px] text-blue-300 font-mono font-semibold">
                  ₹35K
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('sponsors')}
                className="font-mono text-xs uppercase tracking-wider text-white/75 hover:text-white px-2.5 py-1.5 rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                Sponsors
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('faq')}
                className="font-mono text-xs uppercase tracking-wider text-white/75 hover:text-white px-2.5 py-1.5 rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                FAQ
              </button>
            </li>
          </ul>

          {/* Right Action Items */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Live Registration Telemetry Badge (Visible on xl+ to maintain clean breathing room) */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-300 font-mono text-[11px] tracking-wide whitespace-nowrap shadow-[0_0_12px_rgba(245,158,11,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#f59e0b]" />
              <span>REGISTRATIONS OPEN</span>
            </div>

            {/* Quick Action Primary Button - Solid Golden Amber Pill (Orbit24 style) */}
            <button
              onClick={onOpenRegister}
              className="relative group/btn font-mono text-xs uppercase tracking-wider font-bold rounded-full px-5 py-2 bg-amber-400 text-black hover:bg-amber-300 transition-all duration-300 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-[0_2px_20px_rgba(245,158,11,0.35)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.55)] whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-black/75 group-hover/btn:text-black transition-colors" />
              <span>Register</span>
              <ArrowUpRight className="w-3 h-3 text-black/70 group-hover/btn:text-black group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-white bg-white/5 active:scale-95 cursor-pointer transition-all"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 px-6 py-5 bg-[#08080c]/98 rounded-b-[24px] backdrop-blur-2xl">
            <div className="flex flex-col gap-3 font-mono">
              <button
                onClick={() => scrollToSection('about')}
                className="text-sm uppercase text-left tracking-wider text-white/80 hover:text-white py-1.5 transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('tracks')}
                className="text-sm uppercase text-left tracking-wider text-white/80 hover:text-white py-1.5 flex items-center justify-between cursor-pointer"
              >
                <span>Tracks</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold">5 Tracks</span>
              </button>
              <button
                onClick={() => scrollToSection('schedule')}
                className="text-sm uppercase text-left tracking-wider text-white/80 hover:text-white py-1.5 transition-colors cursor-pointer"
              >
                Schedule
              </button>
              <button
                onClick={() => scrollToSection('prizes')}
                className="text-sm uppercase text-left tracking-wider text-white/80 hover:text-white py-1.5 flex items-center justify-between cursor-pointer"
              >
                <span>Prizes</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">₹35K</span>
              </button>
              <button
                onClick={() => scrollToSection('sponsors')}
                className="text-sm uppercase text-left tracking-wider text-white/80 hover:text-white py-1.5 transition-colors cursor-pointer"
              >
                Sponsors
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-sm uppercase text-left tracking-wider text-white/80 hover:text-white py-1.5 transition-colors cursor-pointer"
              >
                FAQ
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full mt-3 font-mono text-xs uppercase tracking-wider py-3 rounded-full bg-amber-400 text-black font-bold text-center shadow-lg hover:bg-amber-300 transition-all cursor-pointer"
              >
                Register Now
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
