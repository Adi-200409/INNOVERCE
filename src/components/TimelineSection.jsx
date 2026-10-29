import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  CheckCircle2,
  Zap,
  Coffee,
  Trophy,
  Code2,
  Compass,
  Sparkles
} from 'lucide-react';

const TIMELINE_DAY_1 = [
  {
    time: '08:00 AM',
    title: 'Hacker Check-In & Breakfast',
    desc: 'Verify digital boarding passes, collect exclusive hacker kits, NFC badges, and fuel up with continental breakfast.',
    category: 'LOGISTICS',
    icon: Coffee,
    active: true
  },
  {
    time: '09:30 AM',
    title: 'Opening Ceremony & Track Briefing',
    desc: 'Welcome keynote from aerospace CTOs and staff AI engineers. Release of confidential sponsor bounties.',
    category: 'KEYNOTE',
    icon: Compass,
    active: true
  },
  {
    time: '10:00 AM',
    title: 'HACKING COMMENCES (T-00:00:00)',
    desc: '24-hour countdown starts. Git repositories initialize. Cloud GPU clusters and API credits activate.',
    category: 'HACKING',
    icon: Zap,
    highlight: true,
    active: true
  },
  {
    time: '01:30 PM',
    title: 'Networking Lunch & Team Mixers',
    desc: 'Catered lunch at the dining bay. Connect with peer founders and open-source contributors.',
    category: 'MEALS',
    icon: Coffee,
    active: false
  },
  {
    time: '04:00 PM',
    title: 'Mentorship Checkpoint 1',
    desc: '1-on-1 architectural audit with senior mentors. Unblock edge cases, API rates, and model deployment hurdles.',
    category: 'MENTORSHIP',
    icon: Code2,
    active: false
  },
  {
    time: '11:00 PM',
    title: 'Midnight Lightning Talks & Fuel',
    desc: 'Midnight snacks, energy drinks, and 5-minute lightning masterclasses on autonomous agents and zk-proofs.',
    category: 'NIGHT SPRINT',
    icon: Sparkles,
    active: false
  }
];

const TIMELINE_DAY_2 = [
  {
    time: '03:00 AM',
    title: 'The Witching Hour Sprint',
    desc: 'Late-night lofi synthwave sets, fresh brewed espresso, and deep flow state code sprints.',
    category: 'FLOW STATE',
    icon: Zap,
    active: false
  },
  {
    time: '07:30 AM',
    title: 'Sunrise Breakfast & Code Freeze Warning',
    desc: 'Hot breakfast served. Final submission checklist and demo guidelines distributed to squad leads.',
    category: 'MEALS',
    icon: Coffee,
    active: false
  },
  {
    time: '09:30 AM',
    title: 'Soft Submission & Devpost Lockdown',
    desc: 'Draft demo videos, GitHub PRs, and architectural writeups submitted for verification.',
    category: 'DEADLINE',
    icon: CheckCircle2,
    active: false
  },
  {
    time: '10:00 AM',
    title: 'HACKING ENDS (T+24:00:00)',
    desc: 'Pencils down! All code commits frozen. Preparation begins for on-site jury walkthroughs.',
    category: 'MILESTONE',
    icon: CheckCircle2,
    highlight: true,
    active: false
  },
  {
    time: '11:30 AM',
    title: 'Project Expo & Judging Round',
    desc: 'Live booth demonstrations before judges, venture capitalists, and industry scouts.',
    category: 'JUDGING',
    icon: Trophy,
    active: false
  },
  {
    time: '02:30 PM',
    title: 'Grand Finale & Award Ceremony',
    desc: 'Top 5 finalist presentations on the main stage, declaration of track winners, and ₹50,000+ prize awards.',
    category: 'CEREMONY',
    icon: Trophy,
    highlight: true,
    active: false
  }
];

export default function TimelineSection() {
  const [activeDay, setActiveDay] = useState(1);
  const events = activeDay === 1 ? TIMELINE_DAY_1 : TIMELINE_DAY_2;

  return (
    <section id="schedule" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#060608] z-20">
      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start md:items-center md:text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>24 HOURS MISSION FLIGHT PLAN</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            Hackathon <span className="text-amber-400">Timeline</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-xl font-sans">
            Every minute engineered to maximize deep focus, technical breakthrough, and high-impact collaboration.
          </p>

          {/* Day Toggle Switch */}
          <div className="mt-8 flex items-center p-1.5 rounded-full border border-white/15 bg-[#0e0e14] backdrop-blur-xl">
            <button
              onClick={() => setActiveDay(1)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeDay === 1
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Day 1 • Oct 24</span>
            </button>
            <button
              onClick={() => setActiveDay(2)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeDay === 2
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Day 2 • Oct 25</span>
            </button>
          </div>
        </div>

        {/* Milestone Timeline Spine */}
        <div className="relative border-l-2 border-white/10 ml-4 sm:ml-32 pl-6 sm:pl-10 space-y-10 sm:space-y-12">
          {events.map((item, idx) => {
            const Icon = item.icon;
            const isHighlight = item.highlight;

            return (
              <div key={idx} className="relative group">
                {/* Time Indicator on Left for larger screens */}
                <div className="hidden sm:block absolute -left-44 top-1 w-32 text-right font-mono text-xs font-semibold text-amber-400">
                  {item.time}
                </div>

                {/* Spine Node / Orb */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                    isHighlight
                      ? 'border-amber-400 bg-amber-400 shadow-[0_0_12px_#f59e0b]'
                      : 'border-white/30 bg-[#060608] group-hover:border-amber-400'
                  }`}
                />

                {/* Event Card */}
                <div
                  className={`rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
                    isHighlight
                      ? 'border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-[#0e0e16] to-[#0e0e16] shadow-[0_0_30px_rgba(245,158,11,0.12)]'
                      : 'border-white/10 bg-[#0a0a0f]/90 hover:border-white/20 hover:bg-[#0f0f18]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                          isHighlight
                            ? 'bg-amber-400/20 border-amber-400/40 text-amber-300'
                            : 'bg-white/5 border-white/10 text-white/70'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-white">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="sm:hidden font-mono text-xs text-amber-400 font-semibold">
                        {item.time}
                      </span>
                      <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/10">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed mt-2 pl-11">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
