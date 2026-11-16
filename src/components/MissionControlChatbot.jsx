import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  X,
  Minus,
  Maximize2,
  RotateCcw,
  Info,
  ChevronLeft,
  ArrowRight,
  Rocket,
  Layers,
  Trophy,
  Clock
} from 'lucide-react';

function createMessageId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getSystemTimestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function AstronautHelmetIcon({ className = "w-6 h-6", glowing = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="helmetVisorAstra" x1="6" y1="8" x2="18" y2="15" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>

      {/* Side Audio / Communications Pods */}
      <rect
        x="1.5"
        y="10"
        width="2.5"
        height="5"
        rx="1"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="20"
        y="10"
        width="2.5"
        height="5"
        rx="1"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      {/* Outer Helmet Dome */}
      <path
        d="M4 11.5C4 6.8 7.58 3 12 3C16.42 3 20 6.8 20 11.5V14.5C20 16.98 17.98 19 15.5 19H8.5C6.02 19 4 16.98 4 14.5V11.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Visor with Holographic Gradient & Subtle Shine */}
      <path
        d="M6.5 11C6.5 9.2 8.8 8 12 8C15.2 8 17.5 9.2 17.5 11V12.2C17.5 14 15.2 15.2 12 15.2C8.8 15.2 6.5 14 6.5 12.2V11Z"
        fill="url(#helmetVisorAstra)"
        fillOpacity={glowing ? "0.95" : "0.75"}
        stroke="currentColor"
        strokeWidth="1.3"
      />

      {/* Visor Glare / Specular Highlight Streak */}
      <path
        d="M8.5 10C9.5 9.2 10.8 8.8 12.2 8.8"
        stroke="#ffffff"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />

      {/* Helmet Neck Ring Seals */}
      <path d="M6 19.8H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 21.8H16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
  );
}

/**
 * Procedural Calming Audio Chime Synthesizer
 * Produces gentle, ambient chime tones matching the serene Aria aesthetic.
 */
function playAriaChime(type = 'receive') {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    osc.type = 'sine';

    if (type === 'send') {
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.12);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'receive') {
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.exponentialRampToValueAtTime(990, now + 0.18);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'open') {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.15);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch {
    // AudioContext blocked
  }
}

// Comprehensive Knowledge Base scoped strictly to INNOVERSE 3.0 Website Data
const KNOWLEDGE_BASE = [
  {
    id: 'greeting',
    triggers: [
      'hi',
      'hello',
      'hey',
      'greetings',
      'who are you',
      'what is astra',
      'what can you do',
      'help me',
      'help'
    ],
    response: {
      text: "Hello! I am **Astra**, your autonomous flight copilot for **INNOVERSE 3.0** — the 24-Hour National-Level AI & Tech Hackathon organized by the **Department of MCA at KLS Gogte Institute of Technology (GIT), Belagavi**.\n\nI am strictly dedicated to providing facts and information published on the official **INNOVERSE 3.0** website.\n\nHow can I help you navigate the hackathon?",
      actions: [
        { label: '🚀 How to Register', type: 'register' },
        { label: '🎯 4 Sector Tracks', type: 'tracks' },
        { label: '🏆 Prize Breakdown', type: 'prizes' },
        { label: '⏱️ Flight Schedule', type: 'timeline' }
      ]
    }
  },
  {
    id: 'registration_fee',
    triggers: [
      'register',
      'registration',
      'apply',
      'signup',
      'sign up',
      'ticket',
      'boarding pass',
      'how to register',
      'form',
      'entry fee',
      'fee',
      'cost',
      'price',
      '300',
      'payment',
      'pay',
      'upi',
      'qr',
      'utr',
      'screenshot',
      'receipt',
      'refund'
    ],
    response: {
      text: "Official **INNOVERSE 3.0 Registration & Payment Telemetry**:\n\n• **Registration Fee**: Strictly **₹300 per squad** (fixed 3 members). The fee is **non-refundable**.\n• **Payment Method**: Scan the static UPI QR code (`9611606975@kbl`, *the chairman govrn body mca dept*, Karnataka Bank).\n• **Submission Requirements**: Enter your 12-digit UPI UTR transaction number and upload your payment screenshot (under 5MB, PNG/JPG).\n• **Confirmation ID**: Upon submission, your squad receives an instant unique ID (e.g. `INN-3.0-001`) and a downloadable digital Boarding Pass.\n• **Squad Login**: Track your application status anytime on `/login.html` using the team leader's email and Confirmation ID.",
      actions: [
        { label: '🚀 Claim Boarding Pass', type: 'register' },
        { label: '📋 View Rules', type: 'rules' }
      ]
    }
  },
  {
    id: 'team_eligibility',
    triggers: [
      'team',
      'team size',
      'members',
      'member',
      'solo',
      'cross college',
      'partner',
      'eligibility',
      'eligible',
      'who can participate',
      'stream',
      'streams',
      'bca',
      'mca',
      'college id',
      'students'
    ],
    response: {
      text: "Official **Squad Composition & Eligibility Rules**:\n\n• **Team Size**: Exactly **3 members per team (Fixed)**. Solo/individual participation is not permitted.\n• **Eligible Programs**: Students currently enrolled in **MCA** or **BCA** programs.\n• **Stream Representation**: Each team strictly represents only one stream (either MCA or BCA). Dual parallel leagues are judged separately.\n• **Same College Requirement**: All 3 members must belong to the **same institution** (cross-college squads are not allowed).\n• **ID Verification**: All participants must present their original college ID cards at check-in on 5th January 2027.",
      actions: [
        { label: '📋 Read Full Rules', type: 'rules' },
        { label: '🚀 Register Squad', type: 'register' }
      ]
    }
  },
  {
    id: 'tracks_sectors',
    triggers: [
      'track',
      'tracks',
      'domain',
      'domains',
      'sector',
      'sectors',
      'problem',
      'problems',
      'statement',
      'statements',
      'theme',
      'themes',
      'challenge',
      'challenges',
      'fintech',
      'educational',
      'edtech',
      'healthcare',
      'health',
      'agriculture',
      'agri'
    ],
    response: {
      text: "INNOVERSE 3.0 features **4 Sector Focus Areas** (No pre-selection required; choose during the event):\n\n1. **Fintech (SEC-01 // FINTECH CORE)**: Digital payments, micro-lending, algorithmic fraud detection, smart contracts, and automated fiscal workflows.\n2. **Educational (SEC-02 // EDUTECH MATRIX)**: Adaptive learning engines, gamified pedagogy, automated assessments, vernacular accessibility, and interactive student classrooms.\n3. **Healthcare (SEC-03 // HEALTHCARE TELEMETRY)**: Telemedicine solutions, AI-assisted diagnostics, vital tracking, EHR systems, and optimized emergency response.\n4. **Agriculture (SEC-04 // AGRI-SOLUTIONS GRID)**: Precision farming, crop health diagnostics, smart irrigation IoT, direct farmer-to-market logistics, and soil analytics.",
      actions: [
        { label: '🎯 Inspect 4 Sectors', type: 'tracks' },
        { label: '🚀 Register Squad', type: 'register' }
      ]
    }
  },
  {
    id: 'prizes',
    triggers: [
      'prize',
      'prizes',
      'cash',
      'reward',
      'rewards',
      'pool',
      'bounty',
      'bounties',
      'trophy',
      'trophies',
      'winner',
      'runner up',
      '1st prize',
      '2nd prize',
      '12000',
      '6000',
      '35000'
    ],
    response: {
      text: "🏆 **₹35,000+ Total Cash Prize Pool** with dual podium tracks:\n\n• **MCA Podium**:\n  - **1st Prize (Galactic Champion)**: **₹12,000** Direct Cash Award + Champion Trophy + Official Merit Certificates\n  - **2nd Prize (Silver Vanguard)**: **₹6,000** Direct Cash Award + Runner-Up Trophy + Official Merit Certificates\n\n• **BCA Podium**:\n  - **1st Prize (Galactic Champion)**: **₹12,000** Direct Cash Award + Champion Trophy + Official Merit Certificates\n  - **2nd Prize (Silver Vanguard)**: **₹6,000** Direct Cash Award + Runner-Up Trophy + Official Merit Certificates\n\n• Merit & Participation Certificates awarded to all shortlisted finalists!",
      actions: [
        { label: '🏆 View Prize Podiums', type: 'prizes' },
        { label: '🚀 Register Squad', type: 'register' }
      ]
    }
  },
  {
    id: 'timeline_dates',
    triggers: [
      'timeline',
      'schedule',
      'date',
      'dates',
      'when',
      'time',
      'rounds',
      'phase',
      'deadline',
      'november',
      'december',
      'january',
      '5 january',
      '6 january',
      '2026',
      '2027',
      'ppt evaluation'
    ],
    response: {
      text: "📅 **INNOVERSE 3.0 Official Event Flight Plan**:\n\n• **16 Nov – 30 Nov 2026**: Team Registration Window (Active)\n• **1 Dec – 10 Dec 2026**: Final Idea Submission\n• **Step 03**: Idea-Based Shortlisting (Top 10 BCA & Top 10 MCA squads selected)\n• **Step 04**: Shortlisted Team Final Registration\n• **Phase 01**: Online Project PPT Evaluation by Technical Jury\n• **5 Jan – 6 Jan 2027**: **24-Hour Grand Finale Hackathon** at KLS GIT Belagavi Campus (Reporting at 9:00 AM on 5th Jan, concluding 6th Jan with final pitch demos & awards).",
      actions: [
        { label: '⏱️ View Full Timeline', type: 'timeline' },
        { label: '📋 View Rules', type: 'rules' }
      ]
    }
  },
  {
    id: 'venue_location',
    triggers: [
      'venue',
      'location',
      'where',
      'git',
      'kls git',
      'belagavi',
      'address',
      'campus',
      'city',
      'state',
      'karnataka',
      'udyambag',
      'mca dept',
      'mca department',
      'lab',
      'wifi'
    ],
    response: {
      text: "📍 **Official Mission Venue Coordinates**:\n\n**Department of Master of Computer Applications (MCA)**\n**KLS Gogte Institute of Technology (GIT)**\nJnana Ganga, Udyambag, Belagavi, Karnataka 590008, India.\n\n• **About KLS GIT MCA**: Established in 1999 (over two decades of technical excellence). Autonomous institution under VTU with NAAC 'A+' accreditation.\n• State-of-the-art air-conditioned labs, 1 Gbps high-speed internet, cafeteria, and resting amenities provided during the 24-hour sprint.",
      actions: [
        { label: '🗺️ Helpdesk & Contact', type: 'venue' }
      ]
    }
  },
  {
    id: 'accommodation_food',
    triggers: [
      'accommodation',
      'stay',
      'night',
      'sleep',
      'food',
      'meal',
      'meals',
      'snack',
      'snacks',
      'canteen',
      'cafeteria',
      'dinner',
      'breakfast',
      'amenities'
    ],
    response: {
      text: "Official **Accommodation & Food Arrangements**:\n\n• **Accommodation**: Arranged on-campus strictly for the night of **5th January 2027** for shortlisted finalist squads.\n• **Food & Refreshments**: Meals, snacks, tea, and midnight refreshments are provided throughout the 24-hour hackathon.\n• **Hardware/Laptops**: Participants must bring their own laptops, chargers, extension cords, and any project-specific hardware.",
      actions: [
        { label: '📋 View Rules', type: 'rules' },
        { label: '🗺️ Helpdesk Section', type: 'venue' }
      ]
    }
  },
  {
    id: 'rules_guidelines',
    triggers: [
      'rules',
      'guidelines',
      'conduct',
      'discipline',
      'judging',
      'criteria',
      'evaluation',
      'plagiarism',
      'cheat',
      'template',
      'pre-built',
      'repo',
      'github',
      'disqualification'
    ],
    response: {
      text: "Crucial **Hackathon Rules & Evaluation Criteria**:\n\n• **Original Code**: All solutions must be built from scratch during the 24-hour sprint. Plagiarism or pre-built projects lead to immediate disqualification.\n• **Deliverables**: Each squad must submit a working prototype, project presentation (PPT), and documentation/README before final judging.\n• **Judging Criteria**:\n  1. Innovation and creativity\n  2. Technical implementation and complexity\n  3. Relevance to theme\n  4. User experience and design\n  5. Presentation and communication\n  6. Practical impact and problem solving\n• **Shortlisting**: Maximum 10 teams from BCA and 10 teams from MCA advance to the on-campus finale.",
      actions: [
        { label: '📋 Read All Rules', type: 'rules' }
      ]
    }
  },
  {
    id: 'contacts_helpdesk',
    triggers: [
      'contact',
      'contacts',
      'helpdesk',
      'phone',
      'number',
      'numbers',
      'call',
      'support',
      'reach',
      'vaishnavi',
      'aditya belled',
      'organizer contact',
      'query',
      'queries'
    ],
    response: {
      text: "📞 **INNOVERSE 3.0 Student Helpdesk Contacts**:\n\n• **Vaishnavi Shivkale**: +91 79751 11929\n• **Aditya Belled**: +91 76766 87006\n\nReach out for any assistance regarding registration, payment verification, selection rounds, or travel coordinates to Belagavi.",
      actions: [
        { label: '📞 Helpdesk Section', type: 'venue' }
      ]
    }
  },
  {
    id: 'industry_partner',
    triggers: [
      'partner',
      'partners',
      'sponsor',
      'sponsors',
      'dlithe',
      'industry partner',
      'company'
    ],
    response: {
      text: "🤝 **Official Industry Partner**: **DLithe Consultancy Services**\n\n• **Website**: `https://dlithe.com/`\n• **Tagline**: Transforming Talent • Competency Development & Digital Solutions\n• DLithe is a premier product development, digital transformation, and EdTech consultancy collaborating with INNOVERSE 3.0 to empower builders with technical evaluation and industry excellence.",
      actions: [
        { label: '🚀 Claim Boarding Pass', type: 'register' }
      ]
    }
  },
  {
    id: 'developers_organizers',
    triggers: [
      'developer',
      'developers',
      'architect',
      'architects',
      'engineer',
      'engineers',
      'organizer',
      'organizers',
      'faculty coordinator',
      'who made',
      'who built',
      'who developed'
    ],
    response: {
      text: "The student architects, engineers, and faculty behind INNOVERSE 3.0 at KLS GIT Belagavi:\n\n• **Core Developers**: Platform Architecture, 3D WebGL Canvas, and API Infrastructure.\n• **Event Organizers**: Faculty Coordinators (Dept of MCA) and Lead Student Organizers.\n\nExplore their details in the Developers & Organizers section on the homepage!",
      actions: [
        { label: '🚀 Register Squad', type: 'register' }
      ]
    }
  },
  {
    id: 'login_portal',
    triggers: [
      'login',
      'squad login',
      'check status',
      'confirmation id',
      'serial number',
      'inn-3.0'
    ],
    response: {
      text: "To access **Squad Login** and view your registered squad details:\n\n1. Visit the Squad Login page (`/login.html`).\n2. Enter your **Team Leader Email** and unique **Confirmation ID** (format: `INN-3.0-XXX`).\n3. View your verified submission details and download your digital Boarding Pass.",
      actions: [
        { label: '🚀 Claim Boarding Pass', type: 'register' }
      ]
    }
  }
];

function generateBotResponse(userInput) {
  const cleanInput = userInput.toLowerCase().trim();

  // 1. Check against official INNOVERSE 3.0 Knowledge Base
  for (const item of KNOWLEDGE_BASE) {
    if (item.triggers.some((trigger) => cleanInput.includes(trigger))) {
      return item.response;
    }
  }

  // 2. Strict Domain Guardrail: Polite refusal for any query outside INNOVERSE 3.0 website data
  return {
    text: "I am **Astra**, the dedicated assistant for **INNOVERSE 3.0**.\n\nI can only answer questions strictly based on the information published on the **INNOVERSE 3.0 website** (Department of MCA, KLS GIT Belagavi).\n\nPlease select one of the official hackathon topics below:",
    actions: [
      { label: '🚀 Registration & Fee (₹300)', type: 'register' },
      { label: '🎯 4 Sector Tracks', type: 'tracks' },
      { label: '🏆 ₹35,000+ Prize Pool', type: 'prizes' },
      { label: '⏱️ Flight Schedule & Timeline', type: 'timeline' },
      { label: '📋 Rules & Eligibility', type: 'rules' },
      { label: '📍 Venue & Helpdesk', type: 'venue' }
    ]
  };
}

// 2x2 Quick Category Cards (Aria Style - 100% Aligned with Website Data)
const ARIA_CATEGORIES = [
  {
    id: 'reg',
    title: 'Registration & Fee',
    subtitle: '₹300 squad fee & UTR upload',
    query: 'How do I register and what are the squad payment details?',
    icon: Rocket,
    iconColor: 'text-amber-400',
    bgGlow: 'group-hover:border-amber-400/50'
  },
  {
    id: 'tracks',
    title: '4 Sector Focus Tracks',
    subtitle: 'Fintech, EdTech, Health, Agri',
    query: 'What are the 4 sector focus areas and problem tracks?',
    icon: Layers,
    iconColor: 'text-purple-400',
    bgGlow: 'group-hover:border-purple-400/50'
  },
  {
    id: 'prizes',
    title: '₹35,000 Prizes',
    subtitle: 'MCA & BCA cash podiums',
    query: 'What is the prize pool and cash bounty breakdown?',
    icon: Trophy,
    iconColor: 'text-amber-300',
    bgGlow: 'group-hover:border-amber-400/50'
  },
  {
    id: 'rules',
    title: 'Rules & Timeline',
    subtitle: '5-6 Jan 2027 24h schedule',
    query: 'What are the squad rules and 24-hour event timeline?',
    icon: Clock,
    iconColor: 'text-cyan-400',
    bgGlow: 'group-hover:border-cyan-400/50'
  }
];

function renderAriaFormattedText(rawText) {
  if (!rawText) return null;
  const paragraphs = rawText.split('\n\n');

  return (
    <div className="space-y-2.5">
      {paragraphs.map((para, pIdx) => {
        const lines = para.split('\n');
        return (
          <div key={pIdx} className="space-y-1">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
              const isNumberBullet = /^\d+\.\s/.test(trimmed);

              const content = isBullet
                ? trimmed.replace(/^[•-]\s*/, '')
                : isNumberBullet
                  ? trimmed.replace(/^\d+\.\s*/, '')
                  : trimmed;

              const parts = [];
              const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
              let lastIndex = 0;
              let match;

              while ((match = regex.exec(content)) !== null) {
                if (match.index > lastIndex) {
                  parts.push(content.substring(lastIndex, match.index));
                }
                const token = match[0];
                if (token.startsWith('**') && token.endsWith('**')) {
                  parts.push(
                    <strong
                      key={`${lIdx}-${match.index}`}
                      className="font-semibold text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]"
                    >
                      {token.slice(2, -2)}
                    </strong>
                  );
                } else if (token.startsWith('`') && token.endsWith('`')) {
                  parts.push(
                    <code
                      key={`${lIdx}-${match.index}`}
                      className="px-1.5 py-0.5 mx-0.5 rounded bg-purple-950/60 border border-purple-400/30 text-purple-200 font-mono text-[11px]"
                    >
                      {token.slice(1, -1)}
                    </code>
                  );
                }
                lastIndex = regex.lastIndex;
              }
              if (lastIndex < content.length) {
                parts.push(content.substring(lastIndex));
              }

              if (isBullet) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-0.5 text-zinc-300">
                    <span className="text-purple-400 text-xs leading-5 shrink-0 select-none">
                      ✦
                    </span>
                    <span className="flex-1 leading-relaxed text-xs sm:text-[13px]">{parts}</span>
                  </div>
                );
              }

              if (isNumberBullet) {
                const numMatch = trimmed.match(/^(\d+)\./);
                const num = numMatch ? numMatch[1] : '•';
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-0.5 text-zinc-300">
                    <span className="font-mono text-[9px] font-bold text-purple-300 px-1.5 py-0.5 rounded bg-purple-500/15 border border-purple-400/30 shrink-0 select-none mt-0.5">
                      {num}
                    </span>
                    <span className="flex-1 leading-relaxed text-xs sm:text-[13px]">{parts}</span>
                  </div>
                );
              }

              return (
                <p key={lIdx} className="leading-relaxed text-zinc-300 text-xs sm:text-[13px]">
                  {parts}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function MissionControlChatbot({ onOpenRegister, onOpenTracks }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [viewMode, setViewMode] = useState('home'); // 'home' (cards) | 'chat' (messages)
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && viewMode === 'chat') {
      scrollToBottom();
    }
  }, [messages, isOpen, viewMode, isTyping]);

  const handleToggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      setHasUnread(false);
      playAriaChime('open');
      setTimeout(() => inputRef.current?.focus(), 250);
    } else {
      setIsOpen(false);
    }
  };

  const handleResetChat = () => {
    setMessages([]);
    setViewMode('home');
    setInputValue('');
    playAriaChime('open');
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const handleActionClick = (action) => {
    playAriaChime('send');

    if (action.type === 'register') {
      if (onOpenRegister) {
        onOpenRegister();
      } else {
        window.open('/register.html', '_self');
      }
    } else if (action.type === 'tracks') {
      if (onOpenTracks) {
        onOpenTracks();
      } else {
        const el = document.getElementById('tracks');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action.type === 'prizes') {
      const el = document.getElementById('prizes');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action.type === 'rules') {
      window.location.assign('/rules');
    } else if (action.type === 'timeline') {
      const el = document.getElementById('timeline');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action.type === 'venue') {
      const el = document.getElementById('footer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUserSubmit = (overrideText = null) => {
    const textToSend = overrideText || inputValue;
    if (!textToSend.trim() || isTyping) return;

    playAriaChime('send');
    setViewMode('chat');

    const userMsg = {
      id: createMessageId('user'),
      sender: 'user',
      time: getSystemTimestamp(),
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!overrideText) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(textToSend);
      const botMsg = {
        id: createMessageId('bot'),
        sender: 'bot',
        time: getSystemTimestamp(),
        text: botResponse.text,
        actions: botResponse.actions || []
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      playAriaChime('receive');
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 450);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserSubmit();
    }
  };

  return (
    <>
      {/* =====================================================================
          FLOATING LAUNCHER BUTTON (Aria / Indigo Aesthetic with Astronaut Helmet)
          ===================================================================== */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 select-none">
        {!isOpen && (
          <button
            id="open-chatbot-btn"
            onClick={handleToggleOpen}
            aria-label="Open Astra AI Assistant"
            className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#1b1736] via-[#16132e] to-[#251f47] hover:from-[#231e47] hover:to-[#2e2659] border border-purple-400/40 hover:border-purple-300 text-purple-200 hover:text-white backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.85),0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_10px_35px_rgba(168,85,247,0.55)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Ambient outer pulse ring */}
            <span className="absolute inset-[-4px] rounded-full border border-purple-400/25 group-hover:border-purple-400/60 animate-pulse pointer-events-none" />

            {/* Astronaut Helmet Icon */}
            <AstronautHelmetIcon className="w-6 h-6 sm:w-7 sm:h-7 text-purple-200 group-hover:text-white group-hover:scale-110 transition-all duration-200" glowing />

            {/* Unread Alert Notification Ping */}
            {hasUnread && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gradient-to-r from-purple-400 to-indigo-400 shadow-[0_0_8px_#a855f7]" />
              </span>
            )}
          </button>
        )}
      </div>

      {/* =====================================================================
          ARIA THEME CHAT MODAL (Phone / Obsidian Glass Card Design)
          ===================================================================== */}
      {isOpen && (
        <div
          className={`fixed bottom-3 sm:bottom-6 right-3 sm:right-6 z-50 flex flex-col w-[calc(100vw-1.5rem)] sm:w-[390px] max-w-[420px] rounded-[28px] sm:rounded-[32px] border border-white/[0.12] bg-gradient-to-b from-[#141226] via-[#0d0c1b] to-[#070611] backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(139,92,246,0.18)] overflow-hidden transition-all duration-300 font-sans ${isMinimized ? 'h-14 sm:h-16' : 'h-[520px] sm:h-[640px] max-h-[88vh]'
            }`}
        >
          {/* Subtle Ambient Radial Lighting in Background */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[220px] bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.16)_0%,rgba(99,102,241,0.06)_50%,transparent_80%)] blur-2xl" />

          {/* Top Status Bar (Aria Style) */}
          <div className="relative flex items-center justify-between px-5 pt-4 pb-2 z-10 shrink-0 select-none">
            {/* Left Brand Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-400/25 bg-purple-500/10 text-purple-300 text-xs font-medium tracking-wide">
              <AstronautHelmetIcon className="w-3.5 h-3.5 text-purple-300" glowing />
              <span>Astra AI • 24h Copilot</span>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-1.5 text-zinc-400">
              <button
                type="button"
                onClick={() => setShowInfoModal(!showInfoModal)}
                title="About Astra AI"
                className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <Info className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleResetChat}
                title="Reset conversation"
                className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close"
                className="p-1.5 rounded-full hover:bg-rose-500/20 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Minimized Bar Preview */}
          {isMinimized && (
            <div
              onClick={() => setIsMinimized(false)}
              className="flex-1 flex items-center justify-between px-5 cursor-pointer hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs text-purple-200">
                <AstronautHelmetIcon className="w-4 h-4 text-purple-300" glowing />
                <span>Astra is ready • Click to expand</span>
              </div>
              <ChevronLeft className="w-4 h-4 text-zinc-400 -rotate-90" />
            </div>
          )}

          {/* Window Body (When Not Minimized) */}
          {!isMinimized && (
            <>
              {/* Optional Info Dropdown */}
              {showInfoModal && (
                <div className="mx-5 mb-2 p-3 rounded-2xl border border-purple-400/20 bg-[#16142c]/95 text-xs text-zinc-300 space-y-1.5 z-20 shadow-xl animate-fadeIn">
                  <div className="flex items-center justify-between font-semibold text-white">
                    <span>About Astra Assistant</span>
                    <button
                      type="button"
                      onClick={() => setShowInfoModal(false)}
                      className="text-zinc-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] leading-relaxed text-zinc-400">
                    Astra is the autonomous event copilot for INNOVERSE 3.0 at KLS GIT Belagavi. Type any question below or pick a category card.
                  </p>
                </div>
              )}

              {/* View 1: ARIA HOME VIEW (Greeting + 2x2 Categories) */}
              {viewMode === 'home' && (
                <div className="flex-1 flex flex-col justify-between px-5 pt-3 pb-3 overflow-y-auto">
                  {/* Big Hero Greeting (Exact Aria Typography Layout with Astronaut Helmet Avatar) */}
                  <div className="space-y-1 sm:space-y-1.5 pt-1 sm:pt-2">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 border border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.25)] shrink-0">
                        <AstronautHelmetIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-200" glowing />
                      </div>
                      <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-white font-sans leading-none">
                        Hi, I'm Astra
                      </h3>
                    </div>

                    <h4 className="text-lg sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent font-sans">
                      I can help you today
                    </h4>
                    <p className="text-xs sm:text-[13px] text-gray-400 font-sans leading-relaxed pt-0.5 sm:pt-1 max-w-[95%]">
                      Take a deep breath. I'm ready when you are. Choose what you'd like to work on:
                    </p>
                  </div>

                  {/* 2x2 Category Cards Grid */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 my-auto py-2 sm:py-3">
                    {ARIA_CATEGORIES.map((cat) => {
                      const IconComponent = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleUserSubmit(cat.query)}
                          className={`group relative rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#16142a]/80 hover:bg-[#201d3d]/90 p-3 sm:p-4 flex flex-col justify-between h-24 sm:h-30 text-left transition-all duration-300 hover:shadow-[0_8px_25px_rgba(139,92,246,0.25)] hover:-translate-y-0.5 cursor-pointer ${cat.bgGlow}`}
                        >
                          {/* Top-left Icon */}
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <IconComponent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${cat.iconColor}`} />
                          </div>

                          {/* Bottom Details */}
                          <div>
                            <span className="block font-medium text-white text-xs sm:text-sm group-hover:text-purple-200 transition-colors">
                              {cat.title}
                            </span>
                            <span className="block text-[9px] sm:text-[10px] text-zinc-400 mt-0.5 truncate">
                              {cat.subtitle}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* View 2: CHAT CONVERSATION VIEW */}
              {viewMode === 'chat' && (
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 scrollbar-thin scrollbar-thumb-purple-500/30">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'
                        }`}
                    >
                      {/* Message Bubble */}
                      <div
                        className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-md transition-all ${msg.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none shadow-[0_4px_20px_rgba(168,85,247,0.3)]'
                          : 'bg-[#18162d]/90 text-zinc-200 border border-white/10 rounded-tl-none shadow-[0_4px_25px_rgba(0,0,0,0.6)] backdrop-blur-md'
                          }`}
                      >
                        {msg.sender === 'bot' ? (
                          renderAriaFormattedText(msg.text)
                        ) : (
                          <p className="whitespace-pre-line text-white">{msg.text}</p>
                        )}

                        {/* Interactive Action Chips */}
                        {msg.actions && msg.actions.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                            {msg.actions.map((act, aIdx) => (
                              <button
                                key={aIdx}
                                type="button"
                                onClick={() => handleActionClick(act)}
                                className="group inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-purple-400/40 hover:border-purple-300 bg-purple-500/15 hover:bg-purple-500/30 text-purple-200 hover:text-white text-[11px] font-medium transition-all shadow-sm cursor-pointer"
                              >
                                <span>{act.label}</span>
                                <ArrowRight className="w-3 h-3 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] text-zinc-500 mt-1 px-1">
                        {msg.time}
                      </span>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#18162d]/80 border border-white/10 w-fit">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-bounce" />
                      </div>
                      <span className="text-[11px] text-zinc-400">Astra is thinking...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}

              {/* =====================================================================
                  PERMANENT BOTTOM TYPING BAR (Aria Aesthetic)
                  Replaced voice orb with always-accessible typing console
                  ===================================================================== */}
              <div className="p-4 pt-1 z-20">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUserSubmit();
                  }}
                  className="mx-auto w-full rounded-full border border-white/15 bg-[#121024]/90 backdrop-blur-2xl p-1.5 pl-3 pr-1.5 flex items-center gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.8)] focus-within:border-purple-400/50 focus-within:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all"
                >
                  {/* Left: Back Arrow (visible in chat view to easily return to the 4 category cards) */}
                  {viewMode === 'chat' && (
                    <button
                      type="button"
                      onClick={() => setViewMode('home')}
                      title="Back to categories"
                      className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  )}

                  {/* Text Typing Input */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message or ask Astra..."
                    className="flex-1 bg-transparent px-2 py-1.5 text-xs sm:text-sm text-white placeholder-zinc-500 font-sans focus:outline-none"
                  />

                  {/* Send Button: Glowing iridescent purple/indigo gradient circular button */}
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    aria-label="Send message"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(168,85,247,0.7)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
