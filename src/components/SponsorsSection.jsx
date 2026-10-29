import React from 'react';
import { ShieldCheck, Cpu, Terminal, Zap, Globe, Sparkles, Mail } from 'lucide-react';

const SPONSORS = [
  { name: 'Google Cloud', tier: 'COMPUTE PARTNER', badge: 'CLOUD INFRA', logo: '☁️' },
  { name: 'NVIDIA Inception', tier: 'AI ACCELERATOR', badge: 'HARDWARE', logo: '⚡' },
  { name: 'Anthropic', tier: 'API PARTNER', badge: 'FRONTIER LLM', logo: '🧠' },
  { name: 'Solana Foundation', tier: 'ECOSYSTEM', badge: 'DISTRIBUTED', logo: '🌐' },
  { name: 'GitHub', tier: 'DEVELOPER SUITE', badge: 'OPEN SOURCE', logo: '🐙' },
  { name: 'Postman', tier: 'API PLATFORM', badge: 'INTEGRATION', logo: '🚀' },
  { name: 'Vercel', tier: 'DEPLOYMENT', badge: 'FRONTEND', logo: '▲' },
  { name: 'KLS GIT', tier: 'HOST INSTITUTION', badge: 'ACADEMIC NODE', logo: '🏛️' }
];

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#060608] z-20">
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start md:items-center md:text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-mono text-xs uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ECOSYSTEM ALLIANCE</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            Powered By <span className="text-amber-400">Industry Leaders</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl font-sans">
            Backed by premier cloud providers, AI labs, and academic institutions fueling the next generation of builders.
          </p>
        </div>

        {/* Sponsor Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {SPONSORS.map((sp, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-white/10 bg-[#0c0c14]/70 backdrop-blur-md p-6 flex flex-col items-center text-center justify-center hover:border-amber-400/40 hover:bg-[#12121c] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {sp.logo}
              </div>
              <h3 className="font-display font-bold text-white text-base tracking-wide mb-1">
                {sp.name}
              </h3>
              <span className="font-mono text-[9px] uppercase tracking-wider text-amber-400/80 mb-2">
                {sp.tier}
              </span>
              <span className="font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">
                {sp.badge}
              </span>
            </div>
          ))}
        </div>

        {/* Sponsor Inquiries Capsule */}
        <div className="rounded-2xl border border-white/10 bg-[#0e0e16]/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-xs sm:text-sm text-gray-300 font-sans">
              Want to partner with 1,500+ top software engineers and sponsor custom challenge bounties?
            </p>
          </div>
          <a
            href="mailto:sponsor@innoverse.tech"
            className="px-5 py-2.5 rounded-full border border-amber-400/30 hover:border-amber-400 bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-black font-mono text-xs uppercase tracking-wider font-semibold transition-all shrink-0 cursor-pointer"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
}
