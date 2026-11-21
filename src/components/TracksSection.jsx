import React from 'react';
import {
  CreditCard,
  GraduationCap,
  HeartPulse,
  Sprout,
  Layers,
  Sparkles
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const TRACKS_DATA = [
  {
    id: 'fintech',
    title: 'Fintech',
    domain: 'Financial technology',
    icon: CreditCard,
    color: '#f59e0b',
    borderColor: 'border-amber-500/30',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    tagColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    shortDesc: 'Modernize digital payments, micro-lending, algorithmic fraud detection, decentralized finance, and automated fiscal workflows.',
    techs: ['Digital Payments', 'Fraud Detection', 'Micro-Lending', 'Smart Contracts', 'Fiscal AI'],
    subsystems: 'SEC-01 // FINTECH CORE'
  },
  {
    id: 'education',
    title: 'Education',
    domain: 'Learning and education',
    icon: GraduationCap,
    color: '#3b82f6',
    borderColor: 'border-blue-500/30',
    glowColor: 'rgba(59, 130, 246, 0.25)',
    tagColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    shortDesc: 'Pioneer adaptive learning engines, gamified pedagogy, automated assessment, vernacular accessibility, and interactive student classrooms.',
    techs: ['Adaptive Learning', 'EdTech AI', 'Interactive Pedagogy', 'Gamification', 'Knowledge Graphs'],
    subsystems: 'SEC-02 // EDUTECH MATRIX'
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    domain: 'Health and wellbeing',
    icon: HeartPulse,
    color: '#10b981',
    borderColor: 'border-emerald-500/30',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    tagColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    shortDesc: 'Build telemedicine solutions, AI-assisted diagnostics, remote patient monitoring, mental wellness platforms, and optimized emergency response systems.',
    techs: ['Telemedicine', 'Diagnostics', 'Vital Tracking', 'EHR Systems', 'Patient Care'],
    subsystems: 'SEC-03 // HEALTHCARE TELEMETRY'
  },
  {
    id: 'agriculture',
    title: 'Agriculture',
    domain: 'Farming and agri-solutions',
    icon: Sprout,
    color: '#f97316',
    borderColor: 'border-orange-500/30',
    glowColor: 'rgba(249, 115, 22, 0.25)',
    tagColor: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    shortDesc: 'Transform agronomy with precision farming, crop health diagnostics, smart irrigation IoT, direct farmer-to-market logistics, and weather intelligence.',
    techs: ['Precision Farming', 'Crop Diagnostics', 'Agri IoT', 'Supply Chain', 'Soil Analytics'],
    subsystems: 'SEC-04 // AGRI-SOLUTIONS GRID'
  }
];

export default function TracksSection({ onOpenRegister }) {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      id="tracks"
      className="relative w-full scroll-mt-20 pt-20 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-[#060608]/90 z-20 border-t border-white/5 overflow-hidden"
    >
      {/* Top Horizon Transition Beam */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="pointer-events-none absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-amber-500/[0.04] via-transparent to-transparent" />

      {/* Background ambient radial glow */}
      <div
        className={`pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,rgba(59,130,246,0.04)_50%,transparent_75%)] blur-[90px] transition-opacity duration-1000 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`flex flex-col items-start md:items-center md:text-center mb-16 sm:mb-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.98]'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>INNOVERSE 3.0 • 4 SECTOR FOCUS AREAS</span>
          </div>

          <h2 className="font-display font-black text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            Sector Focus <span className="text-amber-400">Areas</span>
          </h2>

          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-gray-400 max-w-2xl font-sans leading-relaxed">
            Innovate and engineer real-world solutions across four vital industry sectors.
            All tracks are purely informational focus areas—no pre-selection is required to participate.
          </p>
        </div>

        {/* Sectors Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-12 transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {TRACKS_DATA.map((track) => {
            const Icon = track.icon;

            return (
              <div
                key={track.id}
                className={`relative rounded-2xl sm:rounded-3xl border ${track.borderColor} bg-[#0c0c12]/80 backdrop-blur-xl p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_${track.glowColor}]`}
              >
                <div className="relative z-10">
                  {/* Top Bar: Subsystem Telemetry & Domain Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-5">
                    <span className="font-mono text-[10px] text-white/40 tracking-wider">
                      {track.subsystems}
                    </span>
                    <span
                      className="px-2.5 sm:px-3 py-1 rounded-full font-mono text-[10px] sm:text-[11px] font-semibold border flex items-center gap-1.5"
                      style={{
                        backgroundColor: `${track.color}15`,
                        color: track.color,
                        borderColor: `${track.color}40`
                      }}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{track.domain}</span>
                    </span>
                  </div>

                  {/* Icon, Title & Domain Focus */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border"
                      style={{
                        backgroundColor: `${track.color}18`,
                        borderColor: `${track.color}35`,
                        color: track.color
                      }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-2xl text-white leading-snug">
                        {track.title}
                      </h3>
                      <p className="font-mono text-xs text-white/60 tracking-wide mt-0.5">
                        {track.domain}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-6">
                    {track.shortDesc}
                  </p>
                </div>

                {/* Footer: Tech Stack Tags & Informational Status */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {track.techs.map((tech) => (
                      <span
                        key={tech}
                        className={`font-mono text-[11px] px-2.5 py-0.5 rounded-md border ${track.tagColor}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs font-mono text-white/50">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: track.color }} />
                      <span>Open Focus Domain</span>
                    </span>
                    <span className="text-[11px] text-white/40">No pre-selection needed</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
