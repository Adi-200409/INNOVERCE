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
  Sparkles,
  Users,
  Ticket,
  Rocket
} from 'lucide-react';

const TIMELINE_PRELIMINARY = [
  {
    time: 'PHASE 01',
    title: 'Registration & Abstract Submission Opens',
    desc: 'Squads of fixed 3 members register online for MCA or BCA track with ₹300 registration fee. Submit problem statement abstract, proposed architecture, and tech stack.',
    category: 'SUBMISSION',
    icon: Rocket,
    highlight: true,
    active: true
  },
  {
    time: 'PHASE 02',
    title: 'Jury Evaluation & Technical Screening',
    desc: 'Panel of faculty and industry experts review all submitted project abstracts on feasibility, technical depth, novelty, and societal impact.',
    category: 'SCREENING',
    icon: Compass,
    active: true
  },
  {
    time: 'PHASE 03',
    title: 'Shortlist Announcement & Finalist Invites',
    desc: 'Shortlisted teams from Preliminary Round are declared. Qualifying squads receive official boarding passes for the 24-hour on-campus finale.',
    category: 'SHORTLIST',
    icon: CheckCircle2,
    highlight: true,
    active: false
  },
  {
    time: 'PHASE 04',
    title: 'Finalist Briefing & On-Campus Arrival Plan',
    desc: 'Logistics guidance, travel advisories, and lab allocation schedules shared with finalists traveling to KLS GIT, Belagavi.',
    category: 'LOGISTICS',
    icon: Sparkles,
    active: false
  }
];

const TIMELINE_DAY_1 = [
  {
    time: '08:00 AM',
    title: 'Hacker Check-In & Breakfast',
    desc: 'Shortlisted squads arrive at KLS GIT campus. Verify digital boarding passes, collect hacker kits, badges, and breakfast.',
    category: 'LOGISTICS',
    icon: Coffee,
    active: true
  },
  {
    time: '09:30 AM',
    title: 'Opening Ceremony & Track Briefing',
    desc: 'Welcome keynote by Department of MCA faculty and guest tech leaders. Track problem statements and evaluation criteria revealed.',
    category: 'KEYNOTE',
    icon: Compass,
    active: true
  },
  {
    time: '10:00 AM',
    title: 'HACKING COMMENCES (T-00:00:00)',
    desc: '24-hour marathon timer begins! GitHub repositories initialize. High-speed campus Wi-Fi and compute environments activate.',
    category: 'HACKING',
    icon: Zap,
    highlight: true,
    active: true
  },
  {
    time: '01:30 PM',
    title: 'Networking Lunch & Hacker Fuel',
    desc: 'Catered lunch at the dining hall. Connect with fellow builders, organizers, and tech communities.',
    category: 'MEALS',
    icon: Coffee,
    active: false
  },
  {
    time: '04:00 PM',
    title: 'Mentorship Checkpoint 1',
    desc: '1-on-1 progress reviews with industry mentors. Clarify architectural doubts, refine UX, and optimize data models.',
    category: 'MENTORSHIP',
    icon: Code2,
    active: false
  },
  {
    time: '11:00 PM',
    title: 'Midnight Lightning Sprints & Snacks',
    desc: 'Midnight snacks, coffee, energy fuel, and mini technical lightning demos to keep adrenaline pumping.',
    category: 'NIGHT SPRINT',
    icon: Sparkles,
    active: false
  }
];

const TIMELINE_DAY_2 = [
  {
    time: '03:00 AM',
    title: 'The Witching Hour Code Sprint',
    desc: 'Late-night flow state coding sessions with curated ambient tunes and continuous caffeine refuels.',
    category: 'FLOW STATE',
    icon: Zap,
    active: false
  },
  {
    time: '07:30 AM',
    title: 'Sunrise Breakfast & Submission Prep',
    desc: 'Hot breakfast served. Final submission checklist and repository guidelines distributed to squad leads.',
    category: 'MEALS',
    icon: Coffee,
    active: false
  },
  {
    time: '09:30 AM',
    title: 'Soft Submission & Code Lock Warning',
    desc: 'Draft project demos, repository links, and architecture decks submitted for preliminary verification.',
    category: 'DEADLINE',
    icon: CheckCircle2,
    active: false
  },
  {
    time: '10:00 AM',
    title: 'HACKING ENDS (T+24:00:00)',
    desc: 'Pencils down! Code commits freeze across all repositories. Preparation begins for on-site jury demonstrations.',
    category: 'MILESTONE',
    icon: CheckCircle2,
    highlight: true,
    active: false
  },
  {
    time: '11:30 AM',
    title: 'Project Expo & Live Jury Demonstration',
    desc: 'Live table-top demonstrations before judges for MCA and BCA tracks. Evaluated on innovation, complexity, and design.',
    category: 'JUDGING',
    icon: Trophy,
    active: false
  },
  {
    time: '02:30 PM',
    title: 'Grand Finale & ₹35,000 Award Ceremony',
    desc: 'Stage presentations, announcement of MCA & BCA Champions, and distribution of ₹12K (1st Prize), ₹6K (2nd Prize), trophies, and certificates.',
    category: 'CEREMONY',
    icon: Trophy,
    highlight: true,
    active: false
  }
];

export default function TimelineSection() {
  const [activeTab, setActiveTab] = useState('preliminary'); // 'preliminary' | 'day1' | 'day2'

  const events =
    activeTab === 'preliminary'
      ? TIMELINE_PRELIMINARY
      : activeTab === 'day1'
      ? TIMELINE_DAY_1
      : TIMELINE_DAY_2;

  return (
    <section id="schedule" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#060608] z-20">
      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start md:items-center md:text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>TWO-PHASE MISSION TIMELINE</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            Hackathon <span className="text-amber-400">Roadmap</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl font-sans">
            From the online Preliminary Round abstract review to the 24-hour on-campus finale at KLS GIT Belagavi.
          </p>

          {/* Quick Specifications Pill Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-gray-300">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Squad: <strong>3 Members (Fixed)</strong></span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-gray-300">
              <Ticket className="w-3.5 h-3.5 text-emerald-400" />
              <span>Entry: <strong>₹300 / Team</strong></span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-gray-300">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span>Prize Pool: <strong>₹35,000 (MCA & BCA)</strong></span>
            </span>
          </div>

          {/* Tab Switcher: Preliminary Round vs Final Round Day 1 vs Final Round Day 2 */}
          <div className="mt-8 flex flex-wrap items-center justify-center p-1.5 rounded-full border border-white/15 bg-[#0e0e14] backdrop-blur-xl gap-1">
            <button
              onClick={() => setActiveTab('preliminary')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'preliminary'
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Round 1: Preliminary</span>
            </button>
            <button
              onClick={() => setActiveTab('day1')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'day1'
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Final: Day 1 (Oct 24)</span>
            </button>
            <button
              onClick={() => setActiveTab('day2')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'day2'
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Final: Day 2 (Oct 25)</span>
            </button>
          </div>
        </div>

        {/* Informative Round Header Note */}
        {activeTab === 'preliminary' && (
          <div className="mb-8 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] text-center font-mono text-xs text-amber-300">
            📋 <strong>Preliminary Round:</strong> Teams of 3 submit problem abstracts online with ₹300 registration fee. Shortlisted squads advance to the 24-hour on-campus finale.
          </div>
        )}
        {(activeTab === 'day1' || activeTab === 'day2') && (
          <div className="mb-8 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] text-center font-mono text-xs text-emerald-300">
            ⚡ <strong>Final Round (On-Campus):</strong> Shortlisted squads assemble at KLS GIT Belagavi for the 24-hour non-stop sprint to win ₹35,000 in cash prizes.
          </div>
        )}

        {/* Milestone Timeline Spine */}
        <div className="relative border-l-2 border-white/10 ml-4 sm:ml-32 pl-6 sm:pl-10 space-y-8 sm:space-y-10">
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
