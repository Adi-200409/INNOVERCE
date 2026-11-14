import React from 'react';
import { ShieldCheck, Mail, ExternalLink, Globe, Sparkles } from 'lucide-react';

export default function SponsorsSection() {
  const partners = [
    {
      name: 'DLithe',
      fullName: 'DLithe Consultancy Services',
      category: 'Official Industry Partner',
      website: 'https://dlithe.com/',
      logo: '/dlithe-logo.png',
      tagline: 'Transforming Talent • Competency Development & Digital Solutions',
      description:
        'Premier product development, digital transformation, and EdTech consultancy. Bridging industry-academia excellence through hands-on IoT, AI, and next-gen engineering solutions for INNOVERSE 3.0.',
      tags: ['AI & Data Science', 'IoT & Embedded', 'Digital Transformation', 'Talent Bridge'],
      badgeColor: 'border-rose-500/30 bg-rose-500/10 text-rose-300'
    }
  ];

  return (
    <section id="sponsors" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#060608] z-20 overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-10 w-[400px] h-[250px] bg-amber-500/5 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col items-start md:items-center md:text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>INNOVERSE 3.0 • ECOSYSTEM ALLIANCE</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            Industry & Innovation Partners
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl font-sans">
            Backed by visionary tech enterprises, industry leaders, and academic innovators empowering the next generation of software architects.
          </p>
        </div>

        {/* Featured Partners Grid */}
        <div className="grid grid-cols-1 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="relative rounded-3xl border border-white/10 bg-[#0a0a10]/90 backdrop-blur-xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_20px_70px_rgba(56,189,248,0.12)] overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/[0.04] rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/[0.08] transition-all" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
                {/* Left: Brand Identity & Logo */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left shrink-0">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.6)] w-64 sm:w-72 flex items-center justify-center transition-transform group-hover:scale-[1.02]">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} Official Logo`}
                      className="w-full h-16 sm:h-20 object-contain"
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono font-bold uppercase tracking-wider ${partner.badgeColor}`}>
                      <Sparkles className="w-3 h-3" />
                      <span>{partner.category}</span>
                    </span>
                  </div>
                </div>

                {/* Right: Description, Tags & CTA */}
                <div className="flex-1 space-y-4 text-center lg:text-left">
                  <div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                      {partner.fullName}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyan-300 font-mono font-semibold mt-1">
                      {partner.tagline}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
                    {partner.description}
                  </p>

                  {/* Competency Tags */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
                    {partner.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 text-xs font-mono font-medium hover:border-cyan-500/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* External Visit Button */}
                  <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_30px_rgba(56,189,248,0.55)] transition-all cursor-pointer"
                    >
                      <Globe className="w-4 h-4 text-black" />
                      <span>Visit dlithe.com</span>
                      <ExternalLink className="w-3.5 h-3.5 text-black" />
                    </a>
                  </div>
                </div>
              </div>
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
            href="mailto:sponsor@innoverce.tech"
            className="px-5 py-2.5 rounded-full border border-amber-400/30 hover:border-amber-400 bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-black font-mono text-xs uppercase tracking-wider font-semibold transition-all shrink-0 cursor-pointer"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
}
