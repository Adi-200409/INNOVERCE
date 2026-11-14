import React, { useState } from 'react';
import { Code2, User, ShieldCheck, Mail, Sparkles } from 'lucide-react';

// Developers Configuration - Replace names, roles and image URLs when photos are ready
const DEVELOPERS = [
  {
    id: 'dev-1',
    name: 'Developer Name',
    role: 'Lead Full-Stack Developer',
    department: 'Core Platform Architecture',
    type: 'developer',
    image: null, // e.g. '/team/dev1.jpg'
    email: 'developer@innoverse.com'
  },
  {
    id: 'dev-2',
    name: 'Developer Name',
    role: 'Frontend & 3D Engineer',
    department: 'WebGL & Interactive UI',
    type: 'developer',
    image: null,
    email: 'developer@innoverse.com'
  },
  {
    id: 'dev-3',
    name: 'Developer Name',
    role: 'Backend & Systems Engineer',
    department: 'APIs & Database Architecture',
    type: 'developer',
    image: null,
    email: 'developer@innoverse.com'
  },
  {
    id: 'dev-4',
    name: 'Developer Name',
    role: 'UI/UX & Creative Designer',
    department: 'Visual Design & Motion',
    type: 'developer',
    image: null,
    email: 'developer@innoverse.com'
  }
];

// Organizers Configuration - Replace names, roles and image URLs when photos are ready
const ORGANIZERS = [
  {
    id: 'org-1',
    name: 'Organizer Name',
    role: 'Faculty Coordinator',
    department: 'Department of MCA',
    type: 'organizer',
    image: null, // e.g. '/team/organizer1.jpg'
    email: 'contact@git.edu'
  },
  {
    id: 'org-2',
    name: 'Organizer Name',
    role: 'Lead Student Organizer',
    department: 'INNOVERSE 3.0 Lead',
    type: 'organizer',
    image: null,
    email: 'contact@git.edu'
  },
  {
    id: 'org-3',
    name: 'Organizer Name',
    role: 'Operations & Logistics',
    department: 'Event Operations',
    type: 'organizer',
    image: null,
    email: 'contact@git.edu'
  },
  {
    id: 'org-4',
    name: 'Organizer Name',
    role: 'Sponsorship & Outreach',
    department: 'Public Relations',
    type: 'organizer',
    image: null,
    email: 'contact@git.edu'
  }
];

function TeamMemberCard({ member }) {
  const isDev = member.type === 'developer';
  return (
    <div className="group relative rounded-3xl border border-white/10 bg-[#0d0d14]/80 backdrop-blur-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-amber-400/40 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)]">
      {/* Circular Picture Frame (Blank Placeholder until photos are added) */}
      <div className="relative mb-5 flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed border-white/20 bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:border-amber-400/60 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-white/30">
            <User className="h-11 w-11 text-white/30 transition-colors group-hover:text-amber-400/80" />
            <span className="text-[9px] font-mono tracking-widest uppercase mt-0.5 text-white/35">
              Photo
            </span>
          </div>
        )}

        {/* Sub-badge: Organizer vs Developer */}
        <span
          title={isDev ? 'Core Developer' : 'Event Organizer'}
          className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-[#0b0b10] text-amber-400 shadow-md"
        >
          {isDev ? (
            <Code2 className="h-3.5 w-3.5" />
          ) : (
            <ShieldCheck className="h-3.5 w-3.5" />
          )}
        </span>
      </div>

      {/* Member Details */}
      <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors">
        {member.name}
      </h4>

      <div
        className={`mt-1.5 inline-flex items-center px-2.5 py-0.5 rounded-full border font-sans text-xs font-semibold ${
          isDev
            ? 'border-amber-400/25 bg-amber-400/10 text-amber-300'
            : 'border-cyan-400/25 bg-cyan-400/10 text-cyan-300'
        }`}
      >
        {member.role}
      </div>

      <p className="mt-2 text-xs font-mono text-gray-400">
        {member.department}
      </p>

      {/* Contact/Email Action */}
      {member.email && (
        <a
          href={`mailto:${member.email}`}
          className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-mono text-white/40 hover:text-amber-300 transition-colors"
        >
          <Mail className="w-3 h-3" />
          <span>Connect</span>
        </a>
      )}
    </div>
  );
}

export default function TeamSection() {
  const [activeTab, setActiveTab] = useState('developers'); // 'developers' | 'organizers'

  return (
    <section id="team" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#060608] z-20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06)_0%,rgba(59,130,246,0.04)_60%,transparent_80%)] blur-[100px]" />

      <div className="relative max-w-6xl mx-auto space-y-10 sm:space-y-12">
        {/* Main Section Header */}
        <div className="flex flex-col items-start md:items-center md:text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>DEVELOPERS &amp; ORGANIZERS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            Developers &amp; <span className="text-amber-400">Organizers</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-2xl font-sans">
            The student architects, engineers, and organizers behind INNOVERSE 3.0 at KLS Gogte Institute of Technology.
          </p>

          {/* Toggle Button: Switch between Developers & Organizers */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full border border-white/15 bg-[#0e0e14] backdrop-blur-xl shadow-[0_0_25px_rgba(0,0,0,0.5)]">
            <button
              type="button"
              onClick={() => setActiveTab('developers')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'developers'
                  ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.55)] scale-100'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Developers ({DEVELOPERS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('organizers')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'organizers'
                  ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.55)] scale-100'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Organizers ({ORGANIZERS.length})</span>
            </button>
          </div>
        </div>

        {/* Display: Shows Developers by default, switches to Organizers on toggle */}
        {activeTab === 'developers' ? (
          <div id="developers" className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wide">
                    Core Developers
                  </h3>
                  <p className="text-xs font-mono text-gray-400">
                    Platform Architecture &amp; Engineering
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full border border-amber-400/25 bg-amber-400/10 text-amber-300">
                {DEVELOPERS.length} Engineers
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DEVELOPERS.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        ) : (
          <div id="organizers" className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wide">
                    Event Organizers
                  </h3>
                  <p className="text-xs font-mono text-gray-400">
                    Faculty Coordination &amp; Operations Leadership
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
                {ORGANIZERS.length} Leads
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ORGANIZERS.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Informative Note for adding pictures */}
        <div className="pt-4 text-center">
          <p className="font-mono text-xs text-white/40 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Official member portraits and links will be populated prior to demo day.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
