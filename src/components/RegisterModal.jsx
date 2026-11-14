import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Users,
  Rocket,
  Ticket,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RegisterModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    teamName: '',
    category: 'mca', // 'mca' | 'bca'
    domain: 'ai',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    member2Name: '',
    member2Email: '',
    member3Name: '',
    member3Email: '',
    pptUrl: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Fire celebratory confetti in Golden Amber & Solar Orange
    confetti({
      particleCount: 140,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#f97316', '#2563eb', '#ffffff']
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#0a0a0d] p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-white custom-scrollbar my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative glow circles */}
        <div className="pointer-events-none absolute -right-20 -top-20 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-blue-600/15 blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
              <p className="font-mono text-xs uppercase tracking-widest text-amber-400">
                INNOVERSE 3.0 // PHASE 1: ONLINE PPT EVALUATION
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Register Your 3-Member Squad
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 mb-4">
              Submit your team details and project PPT for online evaluation. Selected teams advance to the 24-hour hackathon to compete for the ₹35,000 prize pool.
            </p>

            {/* Quick Specs Strip */}
            <div className="flex flex-wrap items-center gap-2 mb-6 p-3 rounded-2xl border border-white/10 bg-white/[0.02]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 font-mono text-[11px]">
                <Users className="w-3 h-3" />
                <span>Team: <strong>3 Members (Fixed)</strong></span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-mono text-[11px]">
                <Ticket className="w-3 h-3" />
                <span>Fee: <strong>₹300 / Team</strong></span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 font-mono text-[11px]">
                <Trophy className="w-3 h-3" />
                <span>Pool: <strong>₹35K (12K 1st • 6K 2nd)</strong></span>
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Team Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-gray-300 mb-1.5">
                    Team Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Neural Pioneers"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans text-sm text-white placeholder-gray-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-gray-300 mb-1.5">
                    Competitive Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#141419] border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white"
                  >
                    <option value="mca">MCA Track (Postgraduate League)</option>
                    <option value="bca">BCA Track (Undergraduate League)</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Problem Arena Domain */}
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-gray-300 mb-1.5">
                  Primary Technology Domain *
                </label>
                <select
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#141419] border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white"
                >
                  <option value="ai">Artificial Intelligence (GenAI & Agents)</option>
                  <option value="ml">Machine Learning & Deep Learning</option>
                  <option value="cybersecurity">Cybersecurity & Zero-Trust</option>
                  <option value="blockchain">Blockchain & Web3 Ledgers</option>
                  <option value="open">Open Innovation & Cross-Domain</option>
                </select>
              </div>

              {/* SQUAD MEMBERS (STRICTLY 3 MEMBERS FIXED) */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>3 SQUAD MEMBERS (FIXED)</span>
                  </span>
                  <span className="font-mono text-[10px] text-gray-400">All 3 members mandatory</span>
                </div>

                {/* Member 1 / Leader */}
                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] mb-3 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-amber-300 font-bold">MEMBER 1 (TEAM LEADER)</span>
                    <span className="text-[10px] text-gray-400">Primary Contact</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <input
                      required
                      type="text"
                      placeholder="Leader Full Name"
                      value={formData.leaderName}
                      onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Leader Email"
                      value={formData.leaderEmail}
                      onChange={(e) => setFormData({ ...formData, leaderEmail: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="WhatsApp / Phone"
                      value={formData.leaderPhone}
                      onChange={(e) => setFormData({ ...formData, leaderPhone: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white"
                    />
                  </div>
                </div>

                {/* Member 2 */}
                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] mb-3 space-y-2.5">
                  <span className="font-mono text-[11px] text-gray-300 font-bold block">MEMBER 2</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      required
                      type="text"
                      placeholder="Member 2 Full Name"
                      value={formData.member2Name}
                      onChange={(e) => setFormData({ ...formData, member2Name: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Member 2 Email"
                      value={formData.member2Email}
                      onChange={(e) => setFormData({ ...formData, member2Email: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white"
                    />
                  </div>
                </div>

                {/* Member 3 */}
                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] mb-3 space-y-2.5">
                  <span className="font-mono text-[11px] text-gray-300 font-bold block">MEMBER 3</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      required
                      type="text"
                      placeholder="Member 3 Full Name"
                      value={formData.member3Name}
                      onChange={(e) => setFormData({ ...formData, member3Name: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Member 3 Email"
                      value={formData.member3Email}
                      onChange={(e) => setFormData({ ...formData, member3Email: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Project PPT Link */}
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-gray-300 mb-1.5">
                  Project PPT Link (Google Drive)
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={formData.pptUrl}
                  onChange={(e) => setFormData({ ...formData, pptUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans text-sm text-white placeholder-gray-500 transition-all"
                />
              </div>

              {/* Fee Notice */}
              <div className="p-3.5 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] flex items-start gap-2.5 text-xs text-emerald-300">
                <Ticket className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <div>
                  <strong>Registration Fee: ₹300 per team</strong>. Covers the online PPT evaluation. Selected teams receive details for the 24-hour hackathon. Payment instructions will be emailed to the team leader.
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 font-mono text-xs uppercase tracking-wider font-bold py-3.5 px-6 rounded-full bg-amber-400 hover:bg-amber-300 text-black shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Rocket className="w-4 h-4 text-black" />
                <span>Submit Registration (₹300)</span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400 mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-black text-white">Phase 1 Entry Submitted!</h3>
            <p className="text-sm text-gray-300 max-w-sm mt-2 mb-6">
              Welcome squad <strong className="text-white">{formData.teamName || 'Innovators'}</strong>! Your PPT evaluation entry has been received for the <strong className="text-amber-400">{formData.category === 'mca' ? 'MCA Track' : 'BCA Track'}</strong>.
            </p>

            <section
              aria-label="Your Innoverse boarding pass"
              className="w-full overflow-hidden rounded-2xl border border-white/15 bg-[#111114] text-left shadow-[0_12px_40px_rgba(0,0,0,0.35)] mb-5"
            >
              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
                    INNOVERSE 3.0 // LAUNCH SERVICES
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">Digital boarding pass</p>
                </div>
                <span className="shrink-0 rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-amber-300">
                  Draft
                </span>
              </div>

              <div className="relative h-40 overflow-hidden sm:h-52">
                <img
                  src="/innoverce-theme-poster.png"
                  alt="Astronaut looking out over a planet in deep space"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                <div className="absolute inset-x-4 bottom-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                    Phase 1 PPT evaluation // Passenger
                  </p>
                  <p className="mt-1 truncate text-xl font-bold text-white sm:text-2xl">
                    {formData.leaderName || 'Team leader'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3 p-4">
                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gray-500">Team</p>
                  <p className="truncate text-sm text-gray-100">{formData.teamName || 'Your team name'}</p>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gray-500">Track</p>
                  <p className="truncate text-sm text-gray-100">{formData.category.toUpperCase()}</p>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gray-500">Passenger email</p>
                  <p className="truncate text-sm text-gray-100">{formData.leaderEmail || 'Your email'}</p>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gray-500">Crew</p>
                  <p className="truncate text-sm text-gray-100">3 squad members</p>
                </div>
              </div>
            </section>

            <div className="px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 font-mono text-xs text-gray-400 mb-6 w-full text-left space-y-2">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>TEAM NAME:</span>
                <span className="text-white font-bold">{formData.teamName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>CATEGORY:</span>
                <span className="text-amber-300 uppercase">{formData.category === 'mca' ? 'MCA Track (Postgraduate)' : 'BCA Track (Undergraduate)'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>SQUAD SIZE:</span>
                <span className="text-white">3 Members (Fixed)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>REGISTRATION FEE:</span>
                <span className="text-emerald-400 font-bold">₹300 Per Team</span>
              </div>
              <div className="flex justify-between py-1">
                <span>STAGE STATUS:</span>
                <span className="text-cyan-400 font-bold">PRELIMINARY ROUND SUBMITTED</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-6 max-w-md">
              Selected teams will receive official invitations for the 24-hour hackathon to compete for the ₹35,000 prize pool!
            </p>

            <button
              onClick={handleReset}
              className="px-8 py-2.5 rounded-full border border-white/20 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
            >
              Back to Innoverse 3.0
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
