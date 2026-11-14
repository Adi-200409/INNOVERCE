import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

const CONTACTS = [
  { name: 'Vaishnavi Shivkale', phone: '79751 11929' },
  { name: 'Aditya Belled', phone: '76766 87006' }
];

export default function Contact() {
  return (
    <section id="contact" className="relative w-full overflow-hidden bg-[#060608] px-4 py-20 text-white sm:px-6 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-tech-dots opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <header className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
            <span>INNOVERSE 3.0 HELPDESK</span>
          </div>
          <h1 className="font-display text-3xl font-black tracking-tight uppercase sm:text-5xl md:text-6xl">
            Get in{' '}
            <span className="text-amber-400">
              Touch
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-gray-400 sm:text-base">
            Have questions about INNOVERSE 3.0? We’re here to help! Reach out to our team for any inquiries.
          </p>
        </header>

        <section className="group mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[#0c0c12]/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)] sm:p-8">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-400/10 transition-transform duration-300 group-hover:scale-105">
            <MessageCircle aria-hidden="true" className="h-9 w-9 text-amber-400" strokeWidth={1.8} />
          </div>
          <h2 className="mb-5 font-display text-lg font-bold text-white">
            Registration &amp; Queries
          </h2>

          <div className="space-y-4">
            {CONTACTS.map(({ name, phone }) => (
              <div
                key={phone}
                className="flex items-start gap-4 rounded-xl bg-white/[0.03] p-4 sm:p-5"
              >
                <Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-amber-400" />
                <span>
                  <span className="block font-sans text-sm font-semibold text-white sm:text-base">
                    {name}
                  </span>
                  <span className="mt-1 block font-sans text-xs text-amber-400 sm:text-sm">
                    {phone}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
