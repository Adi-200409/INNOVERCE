import React from 'react';
import { Brain, Box, LockKeyhole } from 'lucide-react';

const DOMAINS = [
  {
    title: 'Artificial Intelligence & Machine Learning',
    description:
      'Innovate using intelligent algorithms and data-driven insights to build smarter solutions.',
    icon: Brain
  },
  {
    title: 'Cybersecurity',
    description:
      'Secure the digital world through threat detection, data protection, and resilient systems.',
    icon: LockKeyhole
  },
  {
    title: 'Blockchain',
    description:
      'Explore decentralized systems that power secure, transparent, and tamper-proof applications.',
    icon: Box
  }
];

export default function DomainSection() {
  return (
    <section
      id="domains"
      className="relative w-full bg-[#060608] px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-14 text-center font-display text-3xl font-black tracking-tight sm:mb-16 sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            Domains
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 sm:gap-8">
          {DOMAINS.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="flex min-h-72 flex-col items-center rounded-3xl border border-white/5 bg-[#171a2a] px-7 py-9 text-center shadow-[0_12px_36px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-1 sm:px-8 sm:py-10"
            >
              <Icon
                aria-hidden="true"
                className="mb-6 h-14 w-14 shrink-0 text-yellow-400"
                strokeWidth={2.5}
              />
              <h3 className="mb-4 font-display text-lg font-bold leading-snug text-white sm:text-xl">
                {title}
              </h3>
              <p className="max-w-sm text-sm font-sans leading-relaxed text-gray-400 sm:text-base">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
