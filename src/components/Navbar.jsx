import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenRegister, _onOpenTracks, isReady = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu automatically if viewport scales up to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationLinks = [
    { label: 'Home', id: null, href: '#home' },
    { label: 'About', id: 'about', href: '#about' },
    { label: 'Tracks', id: 'tracks', href: '#tracks' },
    { label: 'Timelines', id: 'schedule', href: '#schedule' },
    { label: 'Prizes', id: 'prizes', href: '#prizes' },
    { label: 'Team', id: 'team', href: '#team' },
    { label: 'Contact', id: 'contact', href: '#contact' },
    { label: 'Rules', href: '/rules' },
  ];

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (!id) {
      if (window.location.pathname !== '/') {
        window.location.assign('/');
        return;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.assign(`/#${id}`);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pointer-events-none px-3 pt-3 sm:px-6 transition-all duration-700 ease-out ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
    >
      <div
        className={`mx-auto max-w-6xl border border-white/15 bg-[#08080c]/92 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(168,85,247,0.12)] hover:border-white/30 transition-all duration-300 pointer-events-auto ${
          mobileMenuOpen ? 'rounded-2xl sm:rounded-3xl min-[960px]:rounded-full' : 'rounded-full'
        }`}
      >
        <nav className="flex h-13 sm:h-16 items-center justify-between px-3.5 sm:px-6 lg:px-8">
          {/* Logo & Brand Wordmark with Glowing Accent Dots */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (window.location.pathname !== '/') {
                window.location.assign('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-1.5 sm:gap-3 group shrink-0"
          >
            <div className="flex flex-col items-start gap-0.5 sm:gap-1">
              <span className="font-display font-black tracking-wider text-[13px] min-[360px]:text-sm sm:text-lg text-white group-hover:text-amber-300 transition-colors flex items-center gap-1 sm:gap-1.5">
                <span>INNO<span className="text-amber-400">VERSE</span></span>
                <span className="text-[8px] min-[360px]:text-[9px] sm:text-xs font-mono font-bold text-amber-400 px-1 min-[360px]:px-1.5 py-0.2 rounded-full bg-amber-400/10 border border-amber-400/30 shadow-[0_0_8px_rgba(245,158,11,0.2)] [font-variant-numeric:lining-nums_slashed-zero]">3.0</span>
              </span>
              {/* Brand Telemetry Sequence Dots */}
              <div className="flex items-center gap-1 sm:gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/70" />
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/70" />
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/70" />
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links (Visible on laptops, monitors, & screens >= 960px) */}
          <ul className="hidden min-[960px]:flex items-center gap-0.5 xl:gap-1">
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(event) => {
                    if (link.id !== undefined) {
                      event.preventDefault();
                      scrollToSection(link.id);
                    }
                  }}
                  className="font-mono text-xs xl:text-[13px] font-medium uppercase tracking-wider text-white/80 hover:text-white px-2 xl:px-2.5 py-1.5 xl:py-2 rounded-full hover:bg-white/10 transition-all whitespace-nowrap"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Action Items */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Quick Action Primary Button - Solid Golden Amber Pill (Orbit24 style) */}
            <button
              onClick={onOpenRegister}
              className="relative group/btn font-mono text-[10px] min-[380px]:text-[11px] sm:text-xs uppercase tracking-wider font-bold rounded-full px-2.5 min-[380px]:px-3.5 sm:px-5 py-1.5 sm:py-2 bg-amber-400 text-black hover:bg-amber-300 transition-all duration-300 active:scale-95 flex items-center gap-1 sm:gap-1.5 cursor-pointer shadow-[0_2px_15px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.5)] whitespace-nowrap shrink-0"
            >
              <Sparkles className="hidden min-[420px]:inline w-3 h-3 sm:w-3.5 sm:h-3.5 text-black/75 group-hover/btn:text-black transition-colors" />
              <span>Register</span>
              <ArrowUpRight className="w-2.5 h-2.5 min-[380px]:w-3 min-[380px]:h-3 text-black/70 group-hover/btn:text-black group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Button (Only on screens < 960px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-[960px]:hidden flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-white bg-white/5 active:scale-95 cursor-pointer transition-all shrink-0"
              aria-label="Toggle Navigation"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu (Only on screens < 960px) */}
        {mobileMenuOpen && (
          <div className="min-[960px]:hidden border-t border-white/10 px-5 sm:px-6 py-4 sm:py-5 bg-[#08080c]/98 rounded-b-2xl sm:rounded-b-3xl backdrop-blur-2xl max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="flex flex-col gap-2.5 sm:gap-3 font-mono">
              {navigationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(event) => {
                    if (link.id !== undefined) {
                      event.preventDefault();
                      scrollToSection(link.id);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="text-sm uppercase tracking-wider text-white/80 hover:text-white py-1.5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
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
