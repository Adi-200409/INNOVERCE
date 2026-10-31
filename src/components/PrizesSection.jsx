import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Zap,
  CheckCircle2,
  Sparkles,
  Users,
  Ticket,
  GraduationCap,
  Laptop,
  ArrowRight
} from 'lucide-react';

export default function PrizesSection({ onOpenRegister }) {
  const [activeTab, setActiveTab] = useState('both'); // 'both' | 'mca' | 'bca'

  const PODIUM_TIERS = [
    {
      id: 'first',
      place: '1ST PRIZE (WINNER)',
      title: 'Galactic Champion',
      amount: '₹12,000',
      badge: '1ST PLACE PER TRACK',
      streamNote: 'Awarded to #1 Team in MCA & #1 Team in BCA',
      color: '#f59e0b',
      borderColor: 'border-amber-400/60',
      glow: 'rgba(245, 158, 11, 0.35)',
      icon: Trophy,
      featured: true,
      perks: [
        '₹12,000 Direct Cash Award',
        'INNOVERSE 3.0 Grand Champion Trophy',
        'Official Winner Merit Certificates (for all 3 members)',
        'Cloud GPU & API Compute Credits',
        'Direct 1-on-1 Fast-Track Industry Mentorship',
        'VIP Presentation at Demo Day Grand Finale'
      ]
    },
    {
      id: 'second',
      place: '2ND PRIZE (RUNNER-UP)',
      title: 'Silver Vanguard',
      amount: '₹6,000',
      badge: '2ND PLACE PER TRACK',
      streamNote: 'Awarded to #2 Team in MCA & #2 Team in BCA',
      color: '#38bdf8',
      borderColor: 'border-cyan-500/40',
      glow: 'rgba(56, 189, 248, 0.25)',
      icon: Medal,
      featured: false,
      perks: [
        '₹6,000 Direct Cash Award',
        'INNOVERSE 3.0 Runner-Up Trophy',
        'Official Runner-Up Certificates (for all 3 members)',
        'Cloud Compute Credits & Tooling Passes',
        'Fast-Track Technical Interview Screening',
        'Recognition on KLS GIT Innovation Wall'
      ]
    }
  ];

  const EXTRA_PERKS = [
    {
      icon: Ticket,
      title: '₹300 Entry Per Squad',
      desc: 'Nominal team registration fee covering preliminary evaluation and full on-campus amenities for shortlisted finalists.'
    },
    {
      icon: Users,
      title: 'Fixed 3-Member Teams',
      desc: 'Strict requirement of 3 builders per team to ensure balanced squad synergy across design, frontend, and backend architecture.'
    },
    {
      icon: Zap,
      title: 'Preliminary ➔ Final Round',
      desc: 'Phase 1 online idea abstract submission followed by the 24-hour on-campus hackathon for top shortlisted squads.'
    },
    {
      icon: Sparkles,
      title: 'Recognized Credentials',
      desc: 'Cryptographically verifiable completion certificates endorsed by KLS GIT Department of MCA & partner tech organizations.'
    }
  ];

  return (
    <section id="prizes" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#08080c] z-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.09)_0%,rgba(59,130,246,0.04)_60%,transparent_80%)] blur-[100px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start md:items-center md:text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>₹35,000 TOTAL PRIZE POOL • DUAL LEAGUES (MCA & BCA)</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            Prizes & <span className="text-amber-400">Honors</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl font-sans">
            Separate competitive tracks for <strong className="text-white">MCA (Postgraduate)</strong> and <strong className="text-white">BCA (Undergraduate)</strong> students. Preliminary round screening leads to the intense 24-hour on-campus sprint at KLS GIT Belagavi.
          </p>

          {/* Quick Specifications Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-gray-300">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Team Size: <strong className="text-white">3 Members (Fixed)</strong></span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-gray-300">
              <Ticket className="w-3.5 h-3.5 text-emerald-400" />
              <span>Registration Fee: <strong className="text-white">₹300 / Team</strong></span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-gray-300">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span>Pool: <strong className="text-amber-400">₹35,000 Cash</strong></span>
            </div>
          </div>
        </div>

        {/* Dual League Breakdown Indicator Tabs */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex items-center p-1.5 rounded-full border border-white/15 bg-[#0e0e14] backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-4 sm:px-6 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'both'
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Both Tracks (MCA + BCA)
            </button>
            <button
              onClick={() => setActiveTab('mca')}
              className={`flex items-center gap-1.5 px-4 sm:px-6 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'mca'
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>MCA Track</span>
            </button>
            <button
              onClick={() => setActiveTab('bca')}
              className={`flex items-center gap-1.5 px-4 sm:px-6 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'bca'
                  ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>BCA Track</span>
            </button>
          </div>
        </div>

        {/* Track Banner Context */}
        {activeTab === 'mca' && (
          <div className="mb-8 p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-center font-mono text-xs text-amber-300">
            🎓 Viewing <strong className="text-white">MCA Track (Postgraduate League)</strong> — Competing for ₹12K (1st) & ₹6K (2nd) + PG Championship Trophies.
          </div>
        )}
        {activeTab === 'bca' && (
          <div className="mb-8 p-4 rounded-2xl border border-blue-500/30 bg-blue-500/10 text-center font-mono text-xs text-blue-300">
            💻 Viewing <strong className="text-white">BCA Track (Undergraduate League)</strong> — Competing for ₹12K (1st) & ₹6K (2nd) + UG Championship Trophies.
          </div>
        )}

        {/* Podium Cards Grid (1st Prize ₹12K & 2nd Prize ₹6K) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {PODIUM_TIERS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`relative rounded-3xl border ${item.borderColor} bg-[#0e0e16]/90 backdrop-blur-xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] ${
                  item.featured
                    ? 'shadow-[0_0_40px_rgba(245,158,11,0.2)] bg-gradient-to-b from-amber-500/10 via-[#0e0e16] to-[#0e0e16]'
                    : 'bg-gradient-to-b from-blue-500/10 via-[#0e0e16] to-[#0e0e16]'
                }`}
              >
                {/* Glow behind card */}
                <div
                  className="pointer-events-none absolute -inset-0.5 rounded-3xl opacity-60 blur-xl"
                  style={{ background: item.glow }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase border"
                      style={{
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                        borderColor: `${item.color}40`
                      }}
                    >
                      {item.badge}
                    </span>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5"
                      style={{ boxShadow: `0 0 16px ${item.glow}` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white">
                    {item.place}
                  </h3>
                  <p className="font-mono text-xs text-amber-300/90 mt-1 mb-4">
                    {item.streamNote}
                  </p>

                  <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="font-mono [font-variant-numeric:lining-nums_slashed-zero] font-black text-4xl sm:text-5xl text-white tracking-tight">
                      {item.amount}
                    </span>
                    <span className="font-mono text-xs text-white/50 block mt-1">
                      Direct Cash Award + Championship Trophy
                    </span>
                  </div>

                  <ul className="space-y-2.5 pt-4 border-t border-white/10 mb-8">
                    {item.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10">
                  <button
                    onClick={onOpenRegister}
                    className="w-full py-3.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold border border-white/15 hover:border-amber-400 bg-amber-400 hover:bg-amber-300 text-black transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <span>Register 3-Member Team</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Stepper: Preliminary Round ➔ Shortlisted ➔ Final Round */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#0a0a0e]/90 backdrop-blur-xl relative overflow-hidden">
          <div className="max-w-2xl mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 block mb-1">
              COMPETITION ARCHITECTURE
            </span>
            <h4 className="font-display font-black text-2xl text-white">
              Two-Phase Selection Journey
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-amber-400 font-bold">ROUND 01</span>
                <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  ONLINE SCREENING
                </span>
              </div>
              <h5 className="font-display font-bold text-lg text-white mb-2">
                Preliminary Round (Abstract & Idea)
              </h5>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Teams of 3 submit their problem statement abstract, proposed technology architecture, and prototype blueprint with a nominal ₹300 registration fee. Evaluated online on feasibility, technical depth, and innovation.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-emerald-400 font-bold">ROUND 02</span>
                <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  ON-CAMPUS FINALE
                </span>
              </div>
              <h5 className="font-display font-bold text-lg text-white mb-2">
                Shortlisted Final Round (24h Marathon)
              </h5>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Top shortlisted squads are invited to the KLS GIT campus in Belagavi for the intense 24-hour coding sprint with 24/7 power, Wi-Fi, food, mentorship, and live jury demos to win the ₹35,000 prize pool.
              </p>
            </div>
          </div>
        </div>

        {/* Supplementary Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXTRA_PERKS.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-white/10 bg-[#0d0d14]/70 backdrop-blur-md hover:border-amber-400/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center mb-3.5">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="font-display font-bold text-white text-sm mb-1.5">
                  {perk.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {perk.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
