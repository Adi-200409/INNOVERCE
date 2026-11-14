import React from 'react';
import {
  ArrowLeft,
  CheckCircle,
  ClipboardList,
  Clock,
  Code,
  Copyright,
  Handshake,
  Hotel,
  Lightbulb,
  MapPin,
  Scale,
  Users
} from 'lucide-react';

const RULE_SECTIONS = [
  {
    title: 'Eligibility',
    icon: Users,
    points: [
      'Participants must be currently enrolled in MCA or BCA programs.',
      'Participation is strictly team-based only.',
      'Each team must consist of exactly 3 members.',
      'Each team should represent only one stream, either MCA or BCA.',
      'Participants must carry their college ID cards for verification.'
    ]
  },
  {
    title: 'Registration Guidelines',
    icon: ClipboardList,
    points: [
      'Teams must register before the deadline announced by organizers.',
      'A unique team name must be provided during registration.',
      'Registration is a two-step process: application followed by competitive selection.',
      'Once registered, team member changes are not allowed.',
      'All participants are required to report on time for the event start on 5th January 2027 at 9:00 AM.'
    ]
  },
  {
    title: 'Team Selection Process',
    icon: Scale,
    points: [
      'A maximum of 10 teams from BCA and 10 teams from MCA will be selected to participate.',
      'No refund will be provided.'
    ]
  },
  {
    title: 'Project Scope & Theme',
    icon: Lightbulb,
    points: [
      'Each team must choose one theme from the event themes.',
      'All submitted solutions must be original and developed during the hackathon.',
      'Any use of pre-built templates or open-source components must be properly credited.',
      'Plagiarism or pre-built project submissions will lead to disqualification.',
      'Any kind of misconduct or code plagiarism will lead to immediate disqualification.'
    ]
  },
  {
    title: 'Hackathon Structure',
    icon: Clock,
    points: [
      'Event duration: 24 hours of non-stop coding across 2 days.',
      'MCA and BCA streams will run in parallel but be judged separately.',
      'Mentors will be available for technical guidance.',
      'Teams cannot interfere with or obstruct other teams.',
      'The event will conclude on 6th January 2027, followed by a prize distribution ceremony.'
    ]
  },
  {
    title: 'Technical & Submission Rules',
    icon: Code,
    points: [
      'Code must be pushed to the assigned repository or Git link before submission time.',
      'Each team must submit a working prototype, project presentation (PPT), and documentation/README.',
      'Late submissions will not be considered for evaluation.',
      'Internet usage is allowed, but code must not be shared between teams.',
      'Participants must submit their project code on the specified platform before final evaluation.'
    ]
  },
  {
    title: 'Judging Criteria',
    icon: Scale,
    points: [
      'Innovation and creativity',
      'Technical implementation and complexity',
      'Relevance to theme',
      'User experience and design',
      'Presentation and communication',
      'Practical impact and problem solving'
    ]
  },
  {
    title: 'Conduct & Discipline',
    icon: Handshake,
    points: [
      'Participants must maintain professional discipline throughout the event.',
      'Participants are expected to follow campus rules.',
      'Any form of malpractice, cheating, or misconduct will lead to disqualification.',
      'All decisions made by the organizing committee will be final and binding.'
    ]
  },
  {
    title: 'Venue & Logistics Rules',
    icon: MapPin,
    points: [
      'Teams must stay within designated workspaces during coding hours.',
      'Breaks will be provided for food and refreshments.',
      'Participants are responsible for their personal belongings.',
      'Devices must be brought by participants.'
    ]
  },
  {
    title: 'Accommodation & Food Arrangements',
    icon: Hotel,
    points: [    'Accommodation for participants will be arranged only for the night of 5th January 2027.']  },
  {
    title: 'Intellectual Property Rights',
    icon: Copyright,
    points: [
      'Teams own the rights to their project.',
      'Organizers may request permission to showcase winning projects.'
    ]
  },
  {
    title: 'Acknowledgment',
    icon: CheckCircle,
    points: [
      'By participating, all members agree to follow these rules and the event schedule.',
      'All decisions made by the organizing committee will be final.'
    ]
  }
];

export default function Rules() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060608] px-4 pb-20 pt-28 text-white sm:px-6 sm:pt-32">
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <a
          href="/"
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-wider text-gray-300 transition-colors hover:border-amber-400/40 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </a>

        <header className="mb-12 text-center sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
            <span>INNOVERSE 3.0 PROTOCOLS</span>
          </div>
          <h1 className="font-display text-3xl font-black tracking-tight uppercase text-white sm:text-5xl md:text-6xl">
            INNOVERSE 3.0{' '}
            <span className="text-amber-400">
              Rules &amp; Guidelines
            </span>
          </h1>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" />
        </header>

        <div className="space-y-5">
          {RULE_SECTIONS.map(({ title, icon: Icon, points }) => (
            <section
              key={title}
              className="group rounded-2xl border border-white/10 bg-[#0c0c12]/80 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 sm:p-8"
            >
              <div className="mb-5 flex items-center gap-4">
                <Icon className="h-8 w-8 shrink-0 text-amber-400 sm:h-10 sm:w-10" strokeWidth={2} />
                <h2 className="font-display text-lg font-bold leading-snug text-white">
                  {title}
                </h2>
              </div>
              <ul className="space-y-3">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-xs font-sans leading-relaxed text-gray-400 sm:text-sm"
                  >
                    <span aria-hidden="true" className="mt-0.5 shrink-0 font-bold text-amber-400">
                      ▹
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-display text-lg font-bold text-amber-400 drop-shadow-[0_0_14px_rgba(245,158,11,0.35)]">
            Good luck to all participants! 🚀
          </p>
          <a
            href="/"
            className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-amber-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
