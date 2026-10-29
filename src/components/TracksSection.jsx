import React, { useState } from 'react';
import {
  Bot,
  Cpu,
  Glasses,
  Radio,
  Sparkles,
  ArrowRight,
  Terminal,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const TRACKS_DATA = [
  {
    id: 'ai-agents',
    title: 'Autonomous AI & Swarm Intelligence',
    bounty: '₹15,000',
    icon: Bot,
    color: '#f59e0b',
    borderColor: 'border-amber-500/30',
    hoverBorder: 'hover:border-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    tagColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    shortDesc: 'Build multi-agent autonomous architectures, self-healing codebases, and agentic workflows that act rather than chat.',
    fullDesc: 'Design swarms of coordinated autonomous agents that solve multi-step problems, execute recursive tool use, manage autonomous coding, and interact in simulated agent economies.',
    techs: ['LangGraph', 'AutoGPT', 'Claude Tool Use', 'Local LLMs', 'CrewAI'],
    subsystems: 'SYS-01 // NEURAL SWARM CORE'
  },
  {
    id: 'defi',
    title: 'Decentralized Compute & Cryptography',
    bounty: '₹12,000',
    icon: Cpu,
    color: '#3b82f6',
    borderColor: 'border-blue-500/30',
    hoverBorder: 'hover:border-blue-400',
    glowColor: 'rgba(59, 130, 246, 0.25)',
    tagColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    shortDesc: 'Scale decentralized AI inference, zero-knowledge verifiable ML proofs, and token-incentivized model training.',
    fullDesc: 'Tackle the infrastructure bottlenecks of centralized AI: verifiable compute via zk-SNARKs, decentralized GPU clusters, and cryptographically secure model inference.',
    techs: ['zk-SNARKs', 'Bittensor', 'EigenLayer', 'Distributed GPU', 'Solana'],
    subsystems: 'SYS-02 // ZK-PROOF COPROCESSOR'
  },
  {
    id: 'spatial',
    title: 'Spatial Computing & Next-Gen Interfaces',
    bounty: '₹10,000',
    icon: Glasses,
    color: '#fbbf24',
    borderColor: 'border-yellow-500/30',
    hoverBorder: 'hover:border-yellow-400',
    glowColor: 'rgba(251, 191, 36, 0.25)',
    tagColor: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30',
    shortDesc: 'Pioneer natural human-machine synthesis, WebXR spatial computing, and 3D generative world rendering.',
    fullDesc: 'Create immersive spatial experiences using WebGPU, Gaussian splatting, neural radiance fields (NeRFs), and gesture-driven spatial computing for browsers and headsets.',
    techs: ['Three.js', 'WebGPU', 'Vision Pro', 'NeRFs', 'WebXR'],
    subsystems: 'SYS-03 // VOLUMETRIC HUD MATRIX'
  },
  {
    id: 'edge',
    title: 'Intelligent Edge & Neural Hardware',
    bounty: '₹8,000',
    icon: Radio,
    color: '#f97316',
    borderColor: 'border-orange-500/30',
    hoverBorder: 'hover:border-orange-400',
    glowColor: 'rgba(249, 115, 22, 0.25)',
    tagColor: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    shortDesc: 'Deploy quantized models to embedded edge robotics, microcontrollers, and ambient IoT sensors.',
    fullDesc: 'Bring machine intelligence to physical hardware: low-power microcontrollers, robotic sensor fusion, ambient computer vision on drones, and high-efficiency Rust firmware.',
    techs: ['ESP32', 'TinyML', 'Rust', 'WebAssembly', 'EdgeTPU'],
    subsystems: 'SYS-04 // EMBEDDED TELEMETRY BUS'
  },
  {
    id: 'moonshot',
    title: 'Open Innovation & Wildcard Moonshots',
    bounty: '₹5,000',
    icon: Sparkles,
    color: '#10b981',
    borderColor: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-400',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    tagColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    shortDesc: 'No limits. Build what seems impossible: climate intelligence, synthetic biology tools, or quantum simulators.',
    fullDesc: 'Have an extraordinary vision that defies standard categories? Build high-impact tools for open science, bio-computation, crisis response, or astronomical data modeling.',
    techs: ['Open-Source', 'Moonshot', 'Zero-to-One', 'Python', 'Qiskit'],
    subsystems: 'SYS-05 // WILDCARD ANOMALY DETECTOR'
  }
];

export default function TracksSection({ onOpenRegister, onSelectTrack }) {
  const [activeTrack, setActiveTrack] = useState(TRACKS_DATA[0]);

  return (
    <section id="tracks" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#060608]/90 z-20">
      {/* Background ambient radial glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,rgba(59,130,246,0.04)_50%,transparent_75%)] blur-[90px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start md:items-center md:text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>5 SPECIALIZED PROBLEM ARENAS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            Choose Your <span className="text-amber-400">Mission</span> Track
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-2xl font-sans leading-relaxed">
            Construct state-of-the-art prototypes across 5 high-impact engineering disciplines.
            Compete for dedicated track bounties plus the grand overall hackathon prize pool.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TRACKS_DATA.map((track, idx) => {
            const Icon = track.icon;
            const isFeatured = idx === 0;

            return (
              <div
                key={track.id}
                className={`group relative rounded-3xl border ${track.borderColor} ${track.hoverBorder} bg-[#0c0c12]/80 hover:bg-[#101018]/90 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8)] cursor-pointer ${
                  isFeatured ? 'lg:col-span-1 md:col-span-2' : ''
                }`}
                onClick={() => {
                  if (onSelectTrack) onSelectTrack(track.id);
                  else if (onOpenRegister) onOpenRegister();
                }}
              >
                {/* Glow pill behind card */}
                <div
                  className="pointer-events-none absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                  style={{ background: track.glowColor }}
                />

                <div className="relative z-10">
                  {/* Top Bar: Subsystem Telemetry & Bounty */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[10px] text-white/40 tracking-wider">
                      {track.subsystems}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full font-mono text-xs font-bold border"
                      style={{
                        backgroundColor: `${track.color}15`,
                        color: track.color,
                        borderColor: `${track.color}40`
                      }}
                    >
                      {track.bounty} BOUNTY
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-3.5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${track.color}18`,
                        borderColor: `${track.color}35`,
                        color: track.color
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {track.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed mb-6">
                    {track.shortDesc}
                  </p>
                </div>

                {/* Footer: Tech Stack Tags & Action */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {track.techs.map((tech) => (
                      <span
                        key={tech}
                        className={`font-mono text-[10px] px-2.5 py-0.5 rounded-md border ${track.tagColor}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono text-xs text-white/50 group-hover:text-white transition-colors flex items-center gap-1">
                      <span>Apply for Track</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-amber-400 group-hover:shadow-[0_0_8px_#f59e0b] transition-all" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Track Perks Banner */}
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-r from-amber-500/10 via-blue-500/5 to-purple-500/10 p-6 sm:p-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
              <Terminal className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-base sm:text-lg">
                Cross-Disciplinary Submissions Permitted
              </h4>
              <p className="text-xs sm:text-sm text-gray-400">
                Teams can combine multiple tracks (e.g., Autonomous Agents + Spatial Interfaces) for eligible multi-bounty awards.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenRegister}
            className="shrink-0 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 cursor-pointer"
          >
            Claim Your Boarding Pass
          </button>
        </div>
      </div>
    </section>
  );
}
