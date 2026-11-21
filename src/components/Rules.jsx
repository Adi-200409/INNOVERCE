import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  Clock,
  Code2,
  Copyright,
  Handshake,
  Hotel,
  Lightbulb,
  MapPin,
  Scale,
  Users,
  ShieldAlert,
  Sparkles,
  Laptop,
  Trophy,
  AlertTriangle,
  FileCheck
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Protocols' },
  { id: 'eligibility', label: 'Eligibility & Selection' },
  { id: 'technical', label: 'Code & Submission' },
  { id: 'judging', label: 'Judging & Conduct' },
  { id: 'logistics', label: 'Venue & Stay' }
];

const STATS = [
  { icon: Users, label: 'Team Size', value: '3 Members (Fixed)' },
  { icon: Trophy, label: 'Eligibility', value: 'BCA&BSC(CS) | MCA' },
  { icon: Clock, label: 'Duration', value: '24 Hours Non-Stop' },
  { icon: Scale, label: 'Finalists', value: '10 BCA&BSC(CS) + 10 MCA Teams' },
  { icon: Laptop, label: 'Setup', value: 'BYOD (Laptops & Chargers)' }
];

const RULE_SECTIONS = [
  {
    id: 'eligibility',
    category: 'eligibility',
    title: 'Eligibility Criteria',
    badge: 'Mandatory',
    badgeColor: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    icon: Users,
    points: [
      { text: 'Participants must be currently enrolled in an accredited BCA&BSC(CS) | MCA degree program.', highlight: 'BCA&BSC(CS) | MCA' },
      { text: 'Participation is strictly team-based; solo or individual entries are not accepted.', highlight: 'Strictly Team-Based' },
      { text: 'Each team must consist of exactly 3 members (no more, no fewer).', highlight: 'Exactly 3 Members' },
      { text: 'Cross-stream teams are not allowed: a team must strictly represent either BCA&BSC(CS) or MCA.', highlight: 'Single Stream Only' },
      { text: 'Original physical college ID cards are mandatory for on-campus entrance & verification.', highlight: 'College ID Required' }
    ]
  },
  {
    id: 'registration',
    category: 'eligibility',
    title: 'Registration Protocols',
    badge: 'Selection Phase',
    badgeColor: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300',
    icon: ClipboardList,
    points: [
      { text: 'Teams must complete initial registration before the deadline published on the official portal.', highlight: 'Registration Deadline' },
      { text: 'A unique, professional team name must be chosen during squad submission.', highlight: 'Unique Squad Name' },
      { text: 'Selection pipeline: initial project abstract and idea submission followed by shortlisting to the 24h on-campus finale.', highlight: 'Two-Stage Selection' },
      { text: 'Squad roster lock: once registered, no team member substitutions or modifications are permitted.', highlight: 'Roster Locked' },
      { text: 'All shortlisted teams must report punctually at KLS GIT on 5th January 2027 at 09:00 AM IST.', highlight: '5th Jan 09:00 AM' }
    ]
  },
  {
    id: 'selection',
    category: 'eligibility',
    title: 'Team Selection & Quotas',
    badge: 'Capacity Cap',
    badgeColor: 'border-purple-400/30 bg-purple-400/10 text-purple-300',
    icon: Scale,
    points: [
      { text: 'A maximum of 10 teams from BCA&BSC(CS) and 10 teams from MCA (20 teams total) will qualify for the grand 24h arena.', highlight: '10 BCA&BSC(CS) + 10 MCA Teams' },
      { text: 'Selection is determined by panel evaluation of initial idea submissions, feasibility, and technical scope.', highlight: 'Merit-Based Shortlisting' },
      { text: 'Registration fees are strictly non-refundable under any circumstance once payment is processed.', highlight: 'Non-Refundable', isWarning: true }
    ]
  },
  {
    id: 'project-scope',
    category: 'technical',
    title: 'Project Scope & Integrity',
    badge: 'Originality',
    badgeColor: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    icon: Lightbulb,
    points: [
      { text: 'Each team must select exactly one problem track from the official INNOVERSE 3.0 sector list.', highlight: '1 Chosen Sector' },
      { text: 'All code, prototypes, and assets must be developed from scratch during the active 24-hour hackathon window.', highlight: 'Fresh Code Only' },
      { text: 'Pre-existing projects, purchased templates, or code written prior to hackathon launch are strictly prohibited.', highlight: 'No Prior Code', isWarning: true },
      { text: 'Use of open-source libraries, frameworks, and APIs is permitted provided proper licensing and attribution is included.', highlight: 'Open Source Allowed' },
      { text: 'Plagiarism, code theft, or submitting another team’s work will result in immediate squad disqualification.', highlight: 'Zero Tolerance Disqualification', isWarning: true }
    ]
  },
  {
    id: 'hackathon-structure',
    category: 'technical',
    title: '24-Hour Hackathon Structure',
    badge: 'Schedule',
    badgeColor: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    icon: Clock,
    points: [
      { text: '24 continuous hours of non-stop architecture, programming, and testing spanning 5th–6th January 2027.', highlight: '24h Non-Stop' },
      { text: 'BCA&BSC(CS) and MCA streams run concurrently in parallel labs and are judged on separate podium leaderboards.', highlight: 'Independent Streams' },
      { text: 'Industry mentors and faculty guides will conduct checkpoint rounds for guidance and milestone tracking.', highlight: 'Checkpoint Mentoring' },
      { text: 'Teams must maintain absolute camaraderie: any sabotage, network interference, or obstruction is forbidden.', highlight: 'Fair Play' },
      { text: 'The hackathon concludes with jury pitches, live demos, and the Grand Prize Distribution Ceremony on 6th January.', highlight: 'Grand Demo Finale' }
    ]
  },
  {
    id: 'technical-rules',
    category: 'technical',
    title: 'Technical & Submission Rules',
    badge: 'Deliverables',
    badgeColor: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
    icon: Code2,
    points: [
      { text: 'Code must be maintained in the designated Git repository (GitHub/GitLab) with transparent commit history.', highlight: 'Live Git Repository' },
      { text: 'Final submission package: a working interactive prototype, final pitch slide deck (PPT), and comprehensive README documentation.', highlight: 'Prototype + PPT + Docs' },
      { text: 'Strict cutoff: late submissions after the official buzzer sounds will not be accepted or evaluated by the jury.', highlight: 'Hard Submission Cutoff', isWarning: true },
      { text: 'High-speed campus Wi-Fi is provided; internet usage is unrestricted for research and APIs, but code sharing between teams is prohibited.', highlight: 'Independent Work' },
      { text: 'All prototypes must be demoed live in front of the jury — recorded mockups or slide-only pitches are disqualified.', highlight: 'Live Prototype Demo' }
    ]
  },
  {
    id: 'judging-criteria',
    category: 'judging',
    title: 'Jury Evaluation Criteria',
    badge: '100 Point Rubric',
    badgeColor: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    icon: Scale,
    points: [
      { text: 'Innovation, Originality & Creative Edge: Novelty of the idea and technical uniqueness.', highlight: 'Innovation (25%)' },
      { text: 'Technical Execution & Architecture: Code quality, backend integrity, framework choice, and system complexity.', highlight: 'Implementation (25%)' },
      { text: 'Sector Relevance & Feasibility: How effectively the solution addresses the real-world track brief.', highlight: 'Track Relevance (15%)' },
      { text: 'User Experience & Visual Interface: UI elegance, accessibility, polish, responsiveness, and usability.', highlight: 'UI/UX Polish (15%)' },
      { text: 'Practical Impact & Scalability: Viability as a real product, market adoption potential, and societal benefit.', highlight: 'Impact & Scale (10%)' },
      { text: 'Pitch Delivery & Jury Q&A: Clarity of presentation, live prototype demo, and squad technical defense.', highlight: 'Presentation (10%)' }
    ]
  },
  {
    id: 'conduct',
    category: 'judging',
    title: 'Code of Conduct & Discipline',
    badge: 'Ethics',
    badgeColor: 'border-red-400/30 bg-red-400/10 text-red-300',
    icon: Handshake,
    points: [
      { text: 'Professional decorum, mutual respect, and sportsmanship must be upheld throughout the 24-hour stay.', highlight: 'Professional Decorum' },
      { text: 'All participants must abide by campus safety policies and department guidelines of KLS GIT Belagavi.', highlight: 'Campus Compliance' },
      { text: 'Zero tolerance for harassment, offensive language, or behavioral misconduct — violators face immediate expulsion.', highlight: 'Zero Tolerance' },
      { text: 'All verdicts and decisions rendered by the judging panel and organizing committee are final, binding, and uncontestable.', highlight: 'Decisions Final & Binding' }
    ]
  },
  
{
  id: 'venue-logistics',
  category: 'logistics',
  title: 'Hackathon Essentials',
  badge: 'Event Essentials',
  badgeColor: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300',
  icon: Laptop,
  points: [
    {
      text: 'Teams must stay within their assigned innovation labs and designated hackathon areas during coding hours.',
      highlight: 'Designated Lab Workspaces'
    },
    {
      text: 'Participants must bring their own laptops, chargers, extension boards, smartphones, and other required equipment.',
      highlight: 'Bring Your Own Device (BYOD)'
    },
    {
      text: 'High-speed campus Wi-Fi and backup power will be available throughout the 24-hour hackathon.',
      highlight: 'Power & Wi-Fi Support'
    },
    {
      text: 'Participants are responsible for the safety and security of their personal belongings and electronic devices.',
      highlight: 'Personal Equipment Safety'
    }
  ]
},

  {
    id: 'accommodation',
    category: 'logistics',
    title: 'Hospitality',
    badge: 'Night Stay',
    badgeColor: 'border-purple-400/30 bg-purple-400/10 text-purple-300',
    icon: Hotel,
    points: [
      { text: 'Overnight resting zones will be arranged exclusively for the night of 5th January 2027.', highlight: 'Night of 5th Jan Only' },
      { text: 'Rest zones with separate amenities for male and female participants will be operational on campus.', highlight: 'Separate Rest Areas' },
      { text: 'Complete all-inclusive hospitality across both days: breakfast, lunch, evening tea/coffee, and dinner on 5th Jan, midnight refreshments, plus breakfast and lunch on 6th Jan before the award ceremony.', highlight: 'All Meals Included' },
      { text: 'Any participant wishing to leave the campus premises before the closing ceremony must obtain official permission from organizers.', highlight: 'Campus Gate Passes' }
    ]
  },
  {
    id: 'ip-rights',
    category: 'judging',
    title: 'Intellectual Property Rights',
    badge: '100% Creator Owned',
    badgeColor: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    icon: Copyright,
    points: [
      { text: '100% Squad Ownership: All software, models, UI assets, and inventions created during the hackathon remain the exclusive intellectual property of the team.', highlight: '100% Team Owned' },
      { text: 'Neither KLS GIT nor event organizers claim any copyright or equity in the technologies built by participants.', highlight: 'Zero Equity Claim' },
      { text: 'Organizers reserve the non-commercial right to showcase project summaries, demo recordings, and photographs for academic & press coverage.', highlight: 'Media Showcase Rights' }
    ]
  },
  {
    id: 'acknowledgment',
    category: 'eligibility',
    title: 'Participant Undertaking',
    badge: 'Binding Agreement',
    badgeColor: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    icon: CheckCircle2,
    points: [
      { text: 'By submitting team registration, every squad member explicitly covenants to respect these rules, guidelines, and timelines.', highlight: 'Full Rule Acceptance' },
      { text: 'Organizers reserve the right to revise or clarify operational protocols to guarantee safety, integrity, and fair competition.', highlight: 'Administrative Authority' },
      { text: 'All tournament disputes, podium evaluations, and prize distributions are subject to the supreme decision of the organizing body.', highlight: 'Supreme Finality' }
    ]
  }
];

export default function Rules() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSections = useMemo(() => {
    if (activeCategory === 'all') return RULE_SECTIONS;
    return RULE_SECTIONS.filter((section) => section.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060608] px-4 pb-20 pt-24 text-white sm:px-6 sm:pt-28">
      {/* Background Ambient Cosmic Illumination */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-amber-500/[0.08] blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/[0.08] blur-[160px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-[400px] w-[400px] rounded-full bg-purple-600/[0.05] blur-[140px]" />

      {/* Top Horizon Transition Beam */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="pointer-events-none absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-amber-500/[0.03] via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <a
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0d0d14]/80 px-4 py-2 font-mono text-xs uppercase tracking-wider text-gray-300 transition-all hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-white backdrop-blur-xl"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-amber-400" />
            <span>Back to Mission Control</span>
          </a>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/20 bg-amber-400/5 font-mono text-[11px] text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>OFFICIAL PROTOCOLS V3.0</span>
          </div>
        </div>

        {/* Hero Title */}
        <header className="mb-10 text-center sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>INNOVERSE 3.0 COMPETITION DIRECTIVES</span>
          </div>

          <h1 className="font-display text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-white leading-tight">
            Rules &amp; <span className="text-amber-400">Guidelines</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-base font-sans text-gray-400 leading-relaxed">
            Essential directives, eligibility requirements, code of conduct, and evaluation criteria for all competing squads at KLS Gogte Institute of Technology.
          </p>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]" />
        </header>

        {/* HUD Quick Stats Strip */}
        <div className="mb-10 sm:mb-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {STATS.map(({ icon: Icon, label, value }, idx) => (
            <div
              key={label}
              style={{
                animationDelay: `${idx * 70}ms`
              }}
              className="group relative rounded-2xl border border-white/10 bg-[#0d0d14]/70 p-3 sm:p-4 backdrop-blur-xl flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-amber-400/50 hover:bg-[#12121b] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden animate-rule-card"
            >
              {/* Backlight Ambient Glow on Hover */}
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-amber-400/0 group-hover:bg-amber-400/15 rounded-full blur-xl transition-all duration-300" />
              <div className="mb-2 p-2 rounded-xl bg-amber-400/10 border border-amber-400/25 text-amber-400 group-hover:scale-115 group-hover:bg-amber-400/25 group-hover:border-amber-400/50 group-hover:shadow-[0_0_16px_rgba(245,158,11,0.4)] transition-all duration-300">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-400 group-hover:text-amber-300 transition-colors">
                {label}
              </span>
              <span className="mt-0.5 font-display font-bold text-xs sm:text-sm text-white">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="mb-8 sm:mb-10 flex items-center justify-center">
          <div className="w-full sm:w-auto flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl sm:rounded-full border border-white/10 bg-[#0c0c12]/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? RULE_SECTIONS.length
                  : RULE_SECTIONS.filter((s) => s.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-tab-active scale-102'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 hover:scale-102'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[9px] transition-colors ${
                      isActive ? 'bg-black/20 text-black font-extrabold' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs font-mono text-gray-400 px-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span>
              Showing <strong className="text-amber-400">{filteredSections.length}</strong> of{' '}
              {RULE_SECTIONS.length} directive sections
            </span>
          </div>
          <span className="text-[11px] text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
            <span>{activeCategory === 'all' ? 'All Competition Categories' : CATEGORIES.find(c => c.id === activeCategory)?.label}</span>
          </span>
        </div>

        {/* 2-Column Responsive Bento Grid */}
        {filteredSections.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#0d0d14]/70 p-12 text-center backdrop-blur-xl animate-fade-in">
            <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3 animate-bounce" />
            <h3 className="font-display font-bold text-lg text-white">No Protocols Found</h3>
            <p className="mt-1 text-sm font-sans text-gray-400">
              No rules found in this category.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="mt-4 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs font-mono text-white transition-colors cursor-pointer"
            >
              Show All Protocols
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredSections.map((section, idx) => {
              const Icon = section.icon;

              return (
                <section
                  key={`${activeCategory}-${section.id}`}
                  style={{
                    animationDelay: `${idx * 60}ms`
                  }}
                  className="group relative rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0d0d14]/85 p-5 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300 hover:border-amber-400/50 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(245,158,11,0.18)] flex flex-col justify-between overflow-hidden animate-rule-card will-change-transform"
                >
                  {/* Top Holographic Scanning Border */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                    <div className="w-full h-full animate-beam-scan bg-gradient-to-r from-amber-500 via-amber-300 to-yellow-200" />
                  </div>

                  {/* Ambient Hover Backlight Glow */}
                  <div className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 bg-amber-500/[0.03] group-hover:bg-amber-500/[0.12] rounded-full blur-3xl transition-all duration-500" />

                  <div>
                    {/* Card Header: Icon, Title, and Badge */}
                    <div className="flex items-start justify-between gap-3 mb-5 pb-4 border-b border-white/10 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/25 text-amber-400 group-hover:scale-110 group-hover:bg-amber-400/25 group-hover:border-amber-400/60 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 shrink-0">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                        </div>
                        <div>
                          <h2 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors duration-200">
                            {section.title}
                          </h2>
                          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                            {section.points.length} Essential Rules
                          </span>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full border font-mono text-[10px] uppercase tracking-wider font-semibold transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.25)] ${section.badgeColor}`}
                      >
                        {section.badge}
                      </span>
                    </div>

                    {/* Bullet Points with Highlight Badges */}
                    <ul className="space-y-3.5 relative z-10">
                      {section.points.map((pt, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-start gap-3 group/item transition-transform duration-200 hover:translate-x-1.5"
                        >
                          <span
                            className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 ${
                              pt.isWarning
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-400/40 group-hover/item:scale-115 group-hover/item:shadow-[0_0_10px_rgba(245,158,11,0.6)]'
                                : 'bg-white/10 text-amber-400 group-hover/item:bg-amber-400 group-hover/item:text-black group-hover/item:scale-115 group-hover/item:shadow-[0_0_12px_rgba(245,158,11,0.7)]'
                            }`}
                          >
                            ✓
                          </span>
                          <p className="text-xs sm:text-sm font-sans text-gray-300 leading-relaxed">
                            {pt.highlight && (
                              <span className="mr-1.5 font-mono text-[11px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20 inline-block transition-all duration-200 group-hover/item:border-amber-400/60 group-hover/item:bg-amber-400/25 group-hover/item:text-amber-200 group-hover/item:shadow-[0_0_8px_rgba(245,158,11,0.2)]">
                                {pt.highlight}
                              </span>
                            )}
                            <span className={`${pt.isWarning ? 'text-amber-200/90 font-medium' : ''} group-hover/item:text-white transition-colors duration-200`}>
                              {pt.text}
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Micro Footer Line */}
                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500 relative z-10">
                    <span>INNOVERSE 3.0 PROTOCOL</span>
                    <span className="text-amber-400/60 font-semibold group-hover:text-amber-300 transition-colors flex items-center gap-1">
                      <span>VERIFIED DIRECTIVE</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-bold">▹</span>
                    </span>
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Bottom Callout & Action Bar */}
        <div className="mt-14 sm:mt-18 rounded-3xl border border-white/10 bg-gradient-to-b from-[#101018] to-[#07070b] p-8 sm:p-12 text-center backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/25 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>READY TO LAUNCH YOUR SQUAD?</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Good Luck to All Innovators 🚀
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
              Review your problem arenas, assemble your 3-member squad, and get your team registered before slots fill.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="/register.html"
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] cursor-pointer"
              >
                <span>Register Squad Now</span>
                <span className="font-bold">→</span>
              </a>

              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-gray-300 transition-all hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Home</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
