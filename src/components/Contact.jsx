import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CONTACTS = [
  { name: 'Vaishnavi Shivkale', phone: '79751 11929' },
  { name: 'Aditya Belled', phone: '76766 87006' }
];

export default function Contact() {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden bg-[#060608] px-4 scroll-mt-20 pt-16 sm:pt-24 pb-14 sm:pb-18 text-white sm:px-6 border-t border-white/5"
    >
      {/* Top Horizon Transition Beam */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="pointer-events-none absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-amber-500/[0.04] via-transparent to-transparent" />

      <div className="pointer-events-none absolute inset-0 bg-tech-dots opacity-40" />
      <div
        className={`pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px] transition-opacity duration-1000 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px] transition-opacity duration-1000 delay-150 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <header
          className={`mb-14 text-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.98]'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
            <span>INNOVERSE 3.0 HELPDESK</span>
          </div>
          <h1 className="font-display text-2xl min-[380px]:text-3xl font-black tracking-tight uppercase sm:text-5xl md:text-6xl">
            Get in{' '}
            <span className="text-amber-400">
              Touch
            </span>
          </h1>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl font-sans text-xs leading-relaxed text-gray-400 sm:text-base">
            Have questions about INNOVERSE 3.0? We’re here to help! Reach out to our team for any inquiries.
          </p>
        </header>

        <section
          className={`group mx-auto max-w-3xl rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0c0c12]/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)] sm:p-8 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="mb-5 sm:mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-400/10 transition-transform duration-300 group-hover:scale-105">
            <MessageCircle aria-hidden="true" className="h-8 w-8 sm:h-9 sm:w-9 text-amber-400" strokeWidth={1.8} />
          </div>
          <h2 className="mb-4 sm:mb-5 font-display text-base sm:text-lg font-bold text-white">
            Registration &amp; Queries
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {CONTACTS.map(({ name, phone }) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] hover:border-amber-400/30 border border-transparent p-4 sm:p-5 transition-all group/item"
                title={`Call ${name}`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-amber-400" />
                  <div>
                    <span className="block font-sans text-sm font-semibold text-white sm:text-base group-hover/item:text-amber-300 transition-colors">
                      {name}
                    </span>
                    <span className="mt-0.5 block font-mono text-xs text-amber-400 sm:text-sm">
                      {phone}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-white/50 group-hover/item:text-amber-300 transition-colors shrink-0">
                  Tap to Call 📞
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
