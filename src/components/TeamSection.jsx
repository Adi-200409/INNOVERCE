import React, { useState } from 'react';
import { Code2, User, ShieldCheck, Mail, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import TeamTabRocket from './TeamTabRocket';

// Developer Profile Photos
import adityaPhoto from '../images/Aditya.png';
import nehaPhoto from '../images/Neha.jpeg';
import zaidPhoto from '../images/Zaid.jpg';
import shashankPhoto from '../images/Shashank.jpeg';
import bharatPhoto from '../images/bharat.jpg';

// Crisp inline SVGs for developer social links
function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

// Developers Configuration - Replace names, images, and add your real LinkedIn & GitHub profile links
const DEVELOPERS = [
  {
    id: 'dev-1',
    name: 'Aditya Patil',
    role: 'Lead Full-Stack Developer',
    department: 'Core Platform Architecture',
    type: 'developer',
    image: adityaPhoto,
    github: 'https://github.com/Adi-200409',
    linkedin: 'https://www.linkedin.com/in/aditya-patil-6971052a3?utm_source=share_via&utm_content=profile&utm_medium=member_android'
  },
  {
    id: 'dev-2',
    name: 'Neha Kumbar',
    role: 'Frontend Developer',
    department: 'UI Architecture & Interactive Design',
    type: 'developer',
    image: nehaPhoto,
    github: 'https://github.com/NehaNK2705',
    linkedin: 'https://www.linkedin.com/in/neha-kumbar-560b1341b?utm_source=share_via&utm_content=profile&utm_medium=member_android'
  },
  {
    id: 'dev-3',
    name: 'Megha Desai',
    role: 'Frontend Developer',
    department: 'Component Systems & Web Experience',
    type: 'developer',
    image: null,
    github: 'https://github.com/megha2004-web',
    linkedin: 'https://www.linkedin.com/in/megha-desai-1a3862344/'
  },
  {
    id: 'dev-4',
    name: 'Mohammad Zaid Shaikh',
    role: 'Backend & Systems Engineer',
    department: 'APIs & Database Architecture',
    type: 'developer',
    image: zaidPhoto,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'dev-5',
    name: 'Shashank Katwe',
    role: 'Backend & Systems Engineer',
    department: 'Distributed Systems & Auth Engines',
    type: 'developer',
    image: shashankPhoto,
    github: 'https://github.com/shashankkk09',
    linkedin: 'https://www.linkedin.com/in/shashank-katwe/'
  },
  {
    id: 'dev-6',
    name: 'Bharat Joshi',
    role: 'UI/UX & Creative Designer',
    department: 'Visual Design & Motion',
    type: 'developer',
    image: bharatPhoto,
    github: 'https://github.com/BharatBinaga',
    linkedin: 'https://www.linkedin.com/in/bharat-joshi-203542318?utm_source=share_via&utm_content=profile&utm_medium=member_android'
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
    github: null,
    linkedin: 'https://linkedin.com',
    email: 'contact@git.edu'
  },
  {
    id: 'org-2',
    name: 'Organizer Name',
    role: 'Lead Student Organizer',
    department: 'INNOVERSE 3.0 Lead',
    type: 'organizer',
    image: null,
    github: null,
    linkedin: 'https://linkedin.com',
    email: 'contact@git.edu'
  },
  {
    id: 'org-3',
    name: 'Organizer Name',
    role: 'Operations & Logistics',
    department: 'Event Operations',
    type: 'organizer',
    image: null,
    github: null,
    linkedin: 'https://linkedin.com',
    email: 'contact@git.edu'
  },
  {
    id: 'org-4',
    name: 'Organizer Name',
    role: 'Sponsorship & Outreach',
    department: 'Public Relations',
    type: 'organizer',
    image: null,
    github: null,
    linkedin: 'https://linkedin.com',
    email: 'contact@git.edu'
  },
  {
    id: 'org-5',
    name: 'Organizer Name',
    role: 'Technical Lead & Mentorship',
    department: 'Hackathon Coordination',
    type: 'organizer',
    image: null,
    github: null,
    linkedin: 'https://linkedin.com',
    email: 'contact@git.edu'
  },
  {
    id: 'org-6',
    name: 'Organizer Name',
    role: 'Creative & Media Head',
    department: 'Digital Media & Coverage',
    type: 'organizer',
    image: null,
    github: null,
    linkedin: 'https://linkedin.com',
    email: 'contact@git.edu'
  }
];

function TeamMemberCard({ member }) {
  const isDev = member.type === 'developer';
  return (
    <div
      className="group relative rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0d0d14]/80 backdrop-blur-xl p-4 sm:p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-amber-400/50 hover:-translate-y-1.5 hover:shadow-[0_16px_35px_rgba(245,158,11,0.12)]"
    >
      {/* Circular Picture Frame (Blank Placeholder until photos are added) */}
      <div className="relative mb-4 sm:mb-5 flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full border-2 border-dashed border-white/20 bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:border-amber-400/60 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-white/30">
            <User className="h-8 w-8 sm:h-11 sm:w-11 text-white/30 transition-colors group-hover:text-amber-400/80" />
            <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase mt-0.5 text-white/35">
              Photo
            </span>
          </div>
        )}

        {/* Sub-badge: Organizer vs Developer */}
        <span
          title={isDev ? 'Core Developer' : 'Event Organizer'}
          className="absolute bottom-0 right-0 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-white/15 bg-[#0b0b10] text-amber-400 shadow-md"
        >
          {isDev ? (
            <Code2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          ) : (
            <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          )}
        </span>
      </div>

      {/* Member Details */}
      <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors">
        {member.name}
      </h4>

      <div
        className={`mt-1 sm:mt-1.5 inline-flex items-center px-2.5 py-0.5 rounded-full border font-sans text-[11px] sm:text-xs font-semibold ${
          isDev
            ? 'border-amber-400/25 bg-amber-400/10 text-amber-300'
            : 'border-cyan-400/25 bg-cyan-400/10 text-cyan-300'
        }`}
      >
        {member.role}
      </div>

      <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs font-mono text-gray-400">
        {member.department}
      </p>

      {/* Social / Connect Action Links: GitHub & LinkedIn */}
      <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            title={`${member.name} on GitHub`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-gray-300 hover:text-white hover:border-amber-400/50 hover:bg-amber-400/10 transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5 text-gray-300 group-hover:text-amber-300" />
            <span>GitHub</span>
          </a>
        )}

        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title={`${member.name} on LinkedIn`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-gray-300 hover:text-white hover:border-sky-400/50 hover:bg-sky-400/10 transition-all"
          >
            <LinkedinIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>LinkedIn</span>
          </a>
        )}

        {!member.github && !member.linkedin && member.email && (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/40 hover:text-amber-300 transition-colors"
          >
            <Mail className="w-3 h-3" />
            <span>Connect</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default function TeamSection() {
  const [activeTab, setActiveTab] = useState('developers'); // 'developers' | 'organizers'
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative w-full scroll-mt-20 pt-20 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-[#060608] z-20 overflow-hidden border-t border-white/5"
    >
      {/* Top Horizon Transition Beam */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="pointer-events-none absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-amber-500/[0.04] via-transparent to-transparent" />

      {/* Background ambient lighting */}
      <div
        className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06)_0%,rgba(59,130,246,0.04)_60%,transparent_80%)] blur-[100px] transition-opacity duration-1000 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative max-w-6xl mx-auto space-y-10 sm:space-y-12">
        {/* Main Section Header */}
        <div
          className={`flex flex-col items-start md:items-center md:text-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.98]'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>DEVELOPERS &amp; ORGANIZERS</span>
          </div>

          <h2 className="font-display font-black text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            Developers &amp; <span className="text-amber-400">Organizers</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-gray-400 max-w-2xl font-sans leading-relaxed">
            The student architects, engineers, and organizers behind INNOVERSE 3.0 at KLS Gogte Institute of Technology.
          </p>

          {/* Interactive Spaceship Tab Rocket Dock */}
          <TeamTabRocket
            activeTab={activeTab}
            onTabChange={setActiveTab}
            developersCount={DEVELOPERS.length}
            organizersCount={ORGANIZERS.length}
          />
        </div>

        {/* Display: Shows Developers by default, switches to Organizers on toggle */}
        <div
          className={`transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {DEVELOPERS.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                  />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ORGANIZERS.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

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
