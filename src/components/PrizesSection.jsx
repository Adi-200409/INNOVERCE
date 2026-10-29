import React from 'react';
import {
  Trophy,
  Award,
  Medal,
  Gift,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function PrizesSection({ onOpenRegister }) {
  const PODIUM = [
    {
      place: '2ND RUNNER UP',
      title: 'Bronze Pioneer',
      amount: '₹10,000',
      badge: '3RD PLACE OVERALL',
      color: '#f97316',
      borderColor: 'border-orange-500/30',
      glow: 'rgba(249, 115, 22, 0.2)',
      icon: Award,
      order: 'order-3 md:order-1',
      perks: [
        '₹10,000 Direct Cash Prize',
        'Hardware Developer Goodie Kits',
        '$1,000 Cloud Compute Grants',
        'Fast-Track Tech Interview Screening'
      ]
    },
    {
      place: 'GRAND CHAMPION',
      title: 'Galactic Victor',
      amount: '₹25,000',
      badge: '1ST PLACE OVERALL',
      color: '#f59e0b',
      borderColor: 'border-amber-400/50',
      glow: 'rgba(245, 158, 11, 0.35)',
      icon: Trophy,
      order: 'order-1 md:order-2',
      featured: true,
      perks: [
        '₹25,000 Direct Cash Award',
        'INNOVERSE Grand Champion Trophy',
        '$5,000 Cloud GPU & API Credits',
        '1-on-1 VC Pitch & Angel Seed Intro',
        'VIP Access to National Demo Day'
      ]
    },
    {
      place: '1ST RUNNER UP',
      title: 'Silver Vanguard',
      amount: '₹15,000',
      badge: '2ND PLACE OVERALL',
      color: '#38bdf8',
      borderColor: 'border-cyan-500/30',
      glow: 'rgba(56, 189, 248, 0.2)',
      icon: Medal,
      order: 'order-2 md:order-3',
      perks: [
        '₹15,000 Direct Cash Prize',
        'Fast-Track Internship Interviews',
        '$2,500 Model Inference Credits',
        'Partner Startup Incubator Screening'
      ]
    }
  ];

  const EXTRA_PERKS = [
    {
      icon: Zap,
      title: 'Track Winner Bounties',
      desc: 'Individual ₹5,000 - ₹15,000 bounties awarded to the highest scoring team in each of the 5 problem arenas.'
    },
    {
      icon: Gift,
      title: 'Exclusive Hacker Swag Packs',
      desc: 'Custom commemorative hoodies, NFC boarding pass cards, cosmic holographic stickers, and sponsor gifts.'
    },
    {
      icon: CheckCircle2,
      title: 'Cloud Compute Grants',
      desc: 'Every shortlisted squad receives cloud model tokens to guarantee seamless high-parameter prototype execution.'
    },
    {
      icon: Sparkles,
      title: 'Recognized Credentials',
      desc: 'Cryptographically verifiable completion certificates endorsed by premier academic institutions & tech partners.'
    }
  ];

  return (
    <section id="prizes" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#08080c] z-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.09)_0%,rgba(59,130,246,0.04)_60%,transparent_80%)] blur-[100px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start md:items-center md:text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>₹50,000+ CASH & SPONSOR REWARDS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            Prizes & <span className="text-amber-400">Bounties</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-xl font-sans">
            Honoring breakthrough innovation with cash rewards, seed funding opportunities, and career-accelerating grants.
          </p>
        </div>

        {/* Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-16">
          {PODIUM.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative rounded-3xl border ${item.borderColor} bg-[#0e0e16]/90 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] ${item.order} ${
                  item.featured
                    ? 'md:-translate-y-4 md:py-10 border-amber-400/60 shadow-[0_0_40px_rgba(245,158,11,0.2)] bg-gradient-to-b from-amber-500/10 via-[#0e0e16] to-[#0e0e16]'
                    : ''
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
                      className="px-2.5 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase border"
                      style={{
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                        borderColor: `${item.color}35`
                      }}
                    >
                      {item.badge}
                    </span>
                    <Icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>

                  <h3 className="font-display font-bold text-lg text-white">
                    {item.place}
                  </h3>
                  <div className="mt-2 mb-6">
                    <span className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                      {item.amount}
                    </span>
                    <span className="font-mono text-xs text-white/40 block mt-1">
                      Direct Cash Award
                    </span>
                  </div>

                  <ul className="space-y-2.5 pt-4 border-t border-white/10 mb-6">
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
                    className="w-full py-3 rounded-full font-mono text-xs uppercase tracking-wider font-semibold border border-white/15 hover:border-amber-400/50 bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
                  >
                    Compete for this
                  </button>
                </div>
              </div>
            );
          })}
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
