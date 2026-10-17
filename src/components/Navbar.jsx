import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';

export default function Navbar({ onOpenRegister, onOpenTracks }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 transition-all duration-300">
      <div className="mx-auto max-w-6xl rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/20">
        <nav className="flex h-14 sm:h-16 items-center justify-between px-5 sm:px-7">
          {/* Logo & Brand Wordmark with WeEvolveIT-style fusion dots */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="flex flex-col items-start gap-1">
              <span className="font-display font-black tracking-wider text-base sm:text-lg text-white group-hover:text-fuchsia-300 transition-colors">
                INNO<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">VERSE</span>
              </span>
              {/* Animated Glowing Accent Dots (Identical to WeEvolveIT's brand logo dots) */}
              <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#e4007c] shadow-[0_0_8px_#e4007c]" />
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links (Monospace uppercase tech style) */}
          <ul className="hidden md:flex items-center gap-7">
            <li>
              <button
                onClick={onOpenTracks}
                className="font-mono text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Tracks</span>
                <sup className="text-[9px] text-[#e4007c] font-bold">5</sup>
              </button>
            </li>
            <li>
              <a
                href="#schedule"
                onClick={(e) => {
                  e.preventDefault();
                  alert("National Hackathon 24-Hour Sprint Schedule:\n\nDay 1 (Oct 24, 09:00 IST): Opening Ceremony & Problem Statements Release\nDay 1 (Oct 24, 14:00 - 22:00 IST): Mentorship Rounds & Architecture Reviews\nDay 2 (Oct 25, 09:00 IST): Code Freeze, Project Submissions & National Jury Pitch");
                }}
                className="font-mono text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors"
              >
                Schedule
              </a>
            </li>
            <li>
              <a
                href="#prizes"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Prize Pool Breakdown ($150,000 Total):\n\n🥇 1st Place Grand Winner: $50,000 + Tier-1 VC Pitch\n🥈 2nd Place: $30,000\n🥉 3rd Place: $20,000\n✨ Track Bounties: $50,000 distributed across Autonomous AI, DeFi, Spatial Computing, and Open Source.");
                }}
                className="font-mono text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Prizes</span>
                <span className="px-1.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-[9px] text-purple-300 font-mono font-semibold">
                  $150K
                </span>
              </a>
            </li>
            <li>
              <a
                href="#mentors"
                onClick={(e) => {
                  e.preventDefault();
                  alert("National Mentors & Tech Judges:\n\n• Senior AI Engineers & Architects from top tech companies\n• CTOs & Founders from leading national startups\n• Academic researchers and industry leaders");
                }}
                className="font-mono text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors"
              >
                Mentors
              </a>
            </li>
            <li>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Frequently Asked Questions:\n\nQ: Who can join?\nA: College students, developers, and tech enthusiasts across the nation!\n\nQ: Is it virtual or in-person?\nA: Hybrid national level format with physical hubs and online participation.\n\nQ: Does it cost anything?\nA: 100% Free to participate with prizes, compute credits, and certificates!");
                }}
                className="font-mono text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors"
              >
                FAQ
              </a>
            </li>
          </ul>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Live Registration Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-mono text-[11px] tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>REGISTRATIONS OPEN</span>
            </div>

            {/* Quick Action Pill Button */}
            <button
              onClick={onOpenRegister}
              className="relative group/btn overflow-hidden font-mono text-xs uppercase tracking-wider font-semibold rounded-full px-4 sm:px-5 py-2 border border-white/20 text-white bg-white/5 hover:bg-white hover:text-black transition-all duration-300 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover/btn:text-black transition-colors" />
              <span>Apply</span>
              <ArrowUpRight className="w-3 h-3 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/80 hover:text-white bg-white/5"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 px-6 py-5 bg-black/95 rounded-b-[24px] backdrop-blur-2xl">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracks();
                }}
                className="font-mono text-sm uppercase text-left tracking-wider text-white/80 hover:text-white py-1 flex items-center justify-between"
              >
                <span>Tracks</span>
                <span className="text-xs text-[#e4007c] font-bold">5 Tracks</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  alert("Hackathon Schedule: Oct 24-25, 2026. 24-hour national level sprint.");
                }}
                className="font-mono text-sm uppercase text-left tracking-wider text-white/80 hover:text-white py-1"
              >
                Schedule
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  alert("Prize Pool: $150,000 in cash bounties and VC investments.");
                }}
                className="font-mono text-sm uppercase text-left tracking-wider text-white/80 hover:text-white py-1 flex items-center justify-between"
              >
                <span>Prizes</span>
                <span className="text-xs text-purple-400">$150K</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full mt-2 font-mono text-xs uppercase tracking-wider py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold text-center shadow-lg"
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
