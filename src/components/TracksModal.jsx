import React from 'react';
import { X, Bot, Cpu, Glasses, Radio, Sparkles, ArrowRight } from 'lucide-react';

const TRACKS = [
  {
    id: 'ai-agents',
    title: 'Autonomous AI & Swarm Intelligence',
    icon: Bot,
    bounty: '₹15,000',
    color: '#f59e0b',
    description: 'Build multi-agent autonomous architectures, self-healing codebases, recursive reasoning workflows, and agentic economies that act rather than chat.',
    tags: ['LangGraph', 'AutoGPT', 'Claude Tool Use', 'Local LLMs']
  },
  {
    id: 'defi',
    title: 'Decentralized Compute & Cryptography',
    icon: Cpu,
    bounty: '₹12,000',
    color: '#3b82f6',
    description: 'Scale decentralized AI inference, zero-knowledge verifiable ML proofs, permissionless compute grids, and token-incentivized model training.',
    tags: ['zk-SNARKs', 'Bittensor', 'EigenLayer', 'Distributed GPU']
  },
  {
    id: 'spatial',
    title: 'Spatial Computing & Next-Gen Interfaces',
    icon: Glasses,
    bounty: '₹10,000',
    color: '#fbbf24',
    description: 'Pioneer natural human-machine synthesis, WebXR spatial computing, neural canvas design, and 3D generative world rendering.',
    tags: ['Three.js', 'WebGPU', 'Vision Pro', 'Neural Radiance Fields']
  },
  {
    id: 'edge',
    title: 'Intelligent Edge & Neural Hardware',
    icon: Radio,
    bounty: '₹8,000',
    color: '#f97316',
    description: 'Deploy quantized models to embedded edge robotics, microcontrollers, ambient IoT sensors, and high-speed neuromorphic chips.',
    tags: ['ESP32', 'TinyML', 'Rust', 'WebAssembly']
  },
  {
    id: 'moonshot',
    title: 'Open Innovation & Wildcard Moonshots',
    icon: Sparkles,
    bounty: '₹5,000',
    color: '#10b981',
    description: 'No limits. Build what seems impossible: climate intelligence, synthetic biology tools, quantum simulators, or autonomous science experiments.',
    tags: ['Open-Source', 'Moonshot', 'Zero to One']
  }
];

export default function TracksModal({ isOpen, onClose, onSelectTrack }) {
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
            <p className="font-mono text-xs uppercase tracking-widest text-amber-400">INNOVERSE 2026 COMPETITION TRACKS</p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Choose Your Arena & Bounties
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Over ₹50,000 in pooled bounties. Hackers can submit to one primary track and cross-submit to sponsor bounties.
          </p>
        </div>

        {/* Tracks List (Scrollable) */}
        <div className="overflow-y-auto space-y-3.5 pr-1.5 custom-scrollbar">
          {TRACKS.map((track) => {
            const Icon = track.icon;
            return (
              <div
                key={track.id}
                className="group p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-400/30 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className="p-3 rounded-xl border border-white/10 bg-black/50 shrink-0 group-hover:scale-105 transition-transform"
                    style={{ color: track.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors">
                        {track.title}
                      </h3>
                      <span
                        className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-white/10 bg-black/60"
                        style={{ color: track.color }}
                      >
                        Bounty: {track.bounty}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl">
                      {track.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {track.tags.map((tag) => (
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

                <button
                  onClick={() => {
                    onClose();
                    if (onSelectTrack) onSelectTrack(track.id);
                  }}
                  className="shrink-0 font-mono text-xs uppercase tracking-wider py-2 px-4 rounded-full border border-white/20 hover:border-amber-400 bg-white/5 hover:bg-amber-400 hover:text-black transition-all flex items-center gap-1.5 self-start sm:self-center cursor-pointer font-semibold"
                >
                  <span>Select Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
