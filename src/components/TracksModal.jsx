import React from 'react';
import { X, CreditCard, GraduationCap, HeartPulse, Sprout, Sparkles } from 'lucide-react';

const SECTORS = [
  {
    id: 'fintech',
    title: 'Fintech',
    domain: 'Financial technology',
    icon: CreditCard,
    color: '#f59e0b',
    description: 'Modernize digital payments, micro-lending, algorithmic fraud detection, decentralized finance, and automated fiscal workflows.',
    tags: ['Digital Payments', 'Fraud Detection', 'Micro-Lending', 'Smart Contracts', 'Fiscal AI']
  },
  {
    id: 'educational',
    title: 'Educational',
    domain: 'Learning and education',
    icon: GraduationCap,
    color: '#3b82f6',
    description: 'Pioneer adaptive learning engines, gamified pedagogy, automated assessment, vernacular accessibility, and interactive student classrooms.',
    tags: ['Adaptive Learning', 'EdTech AI', 'Interactive Pedagogy', 'Gamification', 'Knowledge Graphs']
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    domain: 'Health and wellbeing',
    icon: HeartPulse,
    color: '#10b981',
    description: 'Build telemedicine solutions, AI-assisted diagnostics, remote patient monitoring, mental wellness platforms, and optimized emergency response systems.',
    tags: ['Telemedicine', 'Diagnostics', 'Vital Tracking', 'EHR Systems', 'Patient Care']
  },
  {
    id: 'agriculture',
    title: 'Agriculture',
    domain: 'Farming and agri-solutions',
    icon: Sprout,
    color: '#f97316',
    description: 'Transform agronomy with precision farming, crop health diagnostics, smart irrigation IoT, direct farmer-to-market logistics, and weather intelligence.',
    tags: ['Precision Farming', 'Crop Diagnostics', 'Agri IoT', 'Supply Chain', 'Soil Analytics']
  }
];

export default function TracksModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[88vh] rounded-3xl border border-white/15 bg-[#0a0a0d] p-6 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.25)] text-white overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <p className="font-mono text-xs uppercase tracking-widest text-amber-400">INNOVERSE 3.0 • SECTOR FOCUS AREAS</p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Sector Focus Areas
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Build real-world solutions across 4 key sectors. These sectors are open focus areas—you are not required to choose or lock in a sector during registration.
          </p>
        </div>

        {/* Tracks List (Scrollable) */}
        <div className="overflow-y-auto space-y-3.5 pr-1.5 custom-scrollbar">
          {SECTORS.map((sector) => {
            const Icon = sector.icon;
            return (
              <div
                key={sector.id}
                className="group p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-400/30 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className="p-3 rounded-xl border border-white/10 bg-black/50 shrink-0 group-hover:scale-105 transition-transform"
                    style={{ color: sector.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-display font-bold text-base sm:text-lg text-white">
                        {sector.title}
                      </h3>
                      <span
                        className="font-mono text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border border-white/10 bg-black/60 flex items-center gap-1"
                        style={{ color: sector.color }}
                      >
                        <Sparkles className="w-3 h-3" />
                        {sector.domain}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl">
                      {sector.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {sector.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 font-mono text-[11px] text-white/50 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] self-start sm:self-center">
                  Open Focus Area
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
