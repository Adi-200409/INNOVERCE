import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Terminal, Code2, Users, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RegisterModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    github: '',
    track: 'ai-agents',
    teamSize: 'solo'
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Fire celebratory confetti in Golden Amber & Solar Orange!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#f97316', '#2563eb', '#ffffff']
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#0a0a0d] p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative glow circles */}
        <div className="pointer-events-none absolute -right-20 -top-20 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-blue-600/15 blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              <p className="font-mono text-xs uppercase tracking-widest text-amber-400">INNOVERSE 2026 REGISTRATION</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Get Your Boarding Pass
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 mb-6">
              Compete for ₹50,000 in bounties, receive API compute grants, and build alongside top national tech mentors.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-gray-300 mb-1.5">
                  Full Name / Handle
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Alex Turing"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans text-sm text-white placeholder-gray-500 transition-all"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-gray-300 mb-1.5">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="alex@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans text-sm text-white placeholder-gray-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-gray-300 mb-1.5">
                    Primary Track
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#141419] border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white"
                  >
                    <option value="ai-agents">Autonomous AI Swarms</option>
                    <option value="defi">Decentralized Systems</option>
                    <option value="spatial">Spatial & Vision Computing</option>
                    <option value="neural">Neural Edge Hardware</option>
                    <option value="open">Open Innovation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-gray-300 mb-1.5">
                    Team Setup
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#141419] border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white"
                  >
                    <option value="solo">Solo Hacker (Match me)</option>
                    <option value="team-2">Team of 2</option>
                    <option value="team-3">Team of 3</option>
                    <option value="team-4">Full Squad (4 Hackers)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-gray-300 mb-1.5">
                  GitHub / Portfolio / Devpost URL
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/your-username"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans text-sm text-white placeholder-gray-500 transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 font-mono text-xs uppercase tracking-wider font-bold py-3.5 px-6 rounded-full bg-amber-400 hover:bg-amber-300 text-black shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Rocket className="w-4 h-4 text-black" />
                <span>Confirm Boarding Pass</span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400 mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-black text-white">Boarding Pass Confirmed!</h3>
            <p className="text-sm text-gray-300 max-w-sm mt-2 mb-6">
              Welcome to INNOVERSE 2026, <span className="text-amber-400 font-semibold">{formData.fullName || 'Hacker'}</span>! Check your inbox for the Discord invite, API keys, and hacker dashboard credentials.
            </p>
            <div className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 font-mono text-xs text-gray-400 mb-6 w-full text-left">
              <div className="flex justify-between py-1">
                <span>BOARDING ID:</span>
                <span className="text-white">#INN-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>STATUS:</span>
                <span className="text-emerald-400 font-bold">CONFIRMED (ONLINE)</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="px-8 py-2.5 rounded-full border border-white/20 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
            >
              Back to Innoverse
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
