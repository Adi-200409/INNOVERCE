import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  X,
  Minus,
  Maximize2,
  ArrowRight,
  Radio,
  Terminal,
  Activity
} from 'lucide-react';

function createMessageId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getSystemTimestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Procedural Web Audio Sound Synthesizer
 * Produces crisp, retro-futuristic telemetry chirps without external audio dependencies.
 */
function playSciFiSound(type = 'receive') {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'send') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(1080, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'receive') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(740, now);
      osc.frequency.exponentialRampToValueAtTime(1240, now + 0.12);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'open') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.15);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch {
    // AudioContext blocked by browser policy
  }
}

// Initial knowledge base triggers & answers
const KNOWLEDGE_BASE = [
  {
    triggers: ['register', 'apply', 'signup', 'sign up', 'ticket', 'boarding pass', 'form', 'how to join'],
    response: {
      text: "Ready to board **INNOVERSE 3.0**? Applications are open for both BCA and MCA builders nationwide!\n\n• **Step 1**: Assemble your squad of 3 builders from the same college.\n• **Step 2**: Prepare your project PPT for online evaluation.\n• **Step 3**: Submit your entry form along with the ₹300 entry fee through the Boarding Pass portal.",
      actions: [
        { label: '🚀 Claim Boarding Pass', type: 'register' },
        { label: '🌌 Inspect 5 Arenas', type: 'tracks' }
      ]
    }
  },
  {
    triggers: ['fee', 'cost', 'price', 'entry fee', 'payment', '300', 'money to pay', 'free'],
    response: {
      text: "The registration fee is strictly **₹300 per squad** (fixed 3 members).\n\nThis fee covers preliminary evaluation, technical faculty review, and for shortlisted finalists: complete on-campus access, meals, snacks, high-speed Wi-Fi 6, and hacker pod amenities during the 24-hour sprint at KLS GIT.",
      actions: [
        { label: '🎟️ Register Squad (₹300)', type: 'register' }
      ]
    }
  },
  {
    triggers: ['team', 'team size', 'members', 'solo', 'cross college', 'partner', 'how many people'],
    response: {
      text: "Official squad telemetry specifications:\n\n• **Team Size**: Exactly **3 members per team (Fixed)**.\n• **Cross-College**: **Not permitted** — all 3 members must belong to the same institution.\n• **Competitive Leagues**: Open to undergrads & postgrads with separate podiums for **BCA** and **MCA** squads!",
      actions: [
        { label: '📋 View Rules', type: 'rules' }
      ]
    }
  },
  {
    triggers: ['prize', 'prizes', 'cash', 'reward', 'pool', 'bounty', '35000', '12000', '6000', 'trophy'],
    response: {
      text: "INNOVERSE 3.0 features a guaranteed **₹35,000+ Total Cash Bounty Pool** with balanced dual-league podiums:\n\n🏆 **MCA Competitive Track**:\n• **1st Prize**: ₹12,000 Cash + Champion Trophy\n• **2nd Prize**: ₹6,000 Cash + Runner-Up Trophy\n\n🏆 **BCA Competitive Track**:\n• **1st Prize**: ₹12,000 Cash + Champion Trophy\n• **2nd Prize**: ₹6,000 Cash + Runner-Up Trophy\n\n⚡ Plus special sponsor track bounties and certificates of excellence for all finalists!",
      actions: [
        { label: '🏆 View Prize Podiums', type: 'prizes' },
        { label: '🚀 Claim Boarding Pass', type: 'register' }
      ]
    }
  },
  {
    triggers: ['track', 'tracks', 'arena', 'domains', 'problem statement', 'challenge', 'categories', 'theme', 'sector', 'sectors'],
    response: {
      text: "Builders will construct solutions across **4 Sector Focus Areas**:\n\n1. 💳 **Fintech**: Financial technology\n   *Digital payments, algorithmic fraud detection, micro-lending, fiscal AI*\n2. 🎓 **Educational**: Learning and education\n   *Adaptive learning engines, gamified pedagogy, automated assessment, vernacular access*\n3. 🩺 **Healthcare**: Health and wellbeing\n   *Telemedicine, AI-assisted diagnostics, vital tracking, remote monitoring*\n4. 🌱 **Agriculture**: Farming and agri-solutions\n   *Precision farming, crop disease diagnostics, agri IoT, supply chain logistics*\n\n💡 *Note: Sectors are open focus domains for real-world innovation—you do not need to lock in a sector during registration!*",
      actions: [
        { label: '🌌 Explore 4 Sectors', type: 'tracks' }
      ]
    }
  },
  {
    triggers: ['venue', 'where', 'location', 'git', 'belagavi', 'karnataka', 'campus', 'offline', 'place'],
    response: {
      text: "📍 **Mission Ground Coordinates**:\n\n• **Venue**: Department of Master of Computer Applications (MCA)\n• **Institution**: KLS Gogte Institute of Technology (KLS GIT)\n• **Location**: Belagavi, Karnataka – 590008, India\n• **Telemetry**: Latitude 15.8281° N • Longitude 74.4889° E\n\nEquipped with 24/7 air-conditioned labs, redundant generator power, and enterprise Wi-Fi 6.",
      actions: [
        { label: '📍 Ground Telemetry', type: 'venue' }
      ]
    }
  },
  {
    triggers: ['round', 'rounds', 'stage', 'stages', 'selection', 'timeline', 'process', 'how does it work'],
    response: {
      text: "The hackathon has **Two Phases**:\n\n1. 🛰️ **Phase 1: Online PPT Evaluation**\n   Teams submit their project PPT for online jury evaluation. Selected teams advance to Phase 2.\n\n2. 🚀 **Phase 2: 24-Hour Hackathon**\n   Selected teams take part in the 24-hour on-campus hackathon at KLS GIT Belagavi, followed by project demos and judging.",
      actions: [
        { label: '📅 Event Timeline', type: 'timeline' }
      ]
    }
  },
  {
    triggers: ['rule', 'rules', 'guideline', 'cheating', 'pre-existing', 'github', 'fresh code', 'criteria'],
    response: {
      text: "⚠️ **Core Flight Directives**:\n\n• **Fresh Codebase**: All project code must be developed from scratch during the 24-hour sprint. Pre-built apps are strictly prohibited.\n• **Allowed Tools**: Open-source libraries, APIs, and pre-trained LLMs (Gemini, Claude, GPT, Ollama) are fully allowed.\n• **Judging Rubric**: Technical Depth (30%), Originality (25%), Practical Impact (25%), and Demo Polish (20%).\n• **IP Ownership**: 100% retained by your team.",
      actions: [
        { label: '📖 Full Rules', type: 'rules' }
      ]
    }
  },
  {
    triggers: ['food', 'stay', 'accommodation', 'sleep', 'facility', 'wifi', 'internet', 'snacks', 'eat'],
    response: {
      text: "We keep all squads energized throughout the 24-hour marathon!\n\n☕ Continuous tea, coffee & hydration stations\n🍕 Wholesome meals, dinner & midnight snack drops\n⚡ Dedicated power points at every team workstation\n📶 High-speed dual-band Wi-Fi 6\n🛋️ Recharging & chill-out rest pods",
      actions: [
        { label: '🚀 Claim Boarding Pass', type: 'register' }
      ]
    }
  },
  {
    triggers: ['tech', 'stack', 'languages', 'tools', 'python', 'react', 'rust', 'ai', 'frameworks'],
    response: {
      text: "Squads have total freedom in technology selection. Popular recommended stacks:\n\n• **AI & Agents**: LangGraph, CrewAI, AutoGPT, Ollama, HuggingFace, PyTorch\n• **Frontend / 3D**: React, Vite, Tailwind CSS, Three.js, WebGPU, WebXR\n• **Backend**: Python (FastAPI/Django), Node.js, Go, Rust\n• **Decentralized**: Solidity, zk-SNARKs, Solana, Bittensor\n• **Edge Hardware**: MicroPython, Arduino, ESP32, TinyML",
      actions: [
        { label: '🌌 Inspect Mission Arenas', type: 'tracks' }
      ]
    }
  },
  {
    triggers: ['who are you', 'astra', 'bot', 'what are you', 'hello', 'hi', 'hey', 'greetings', 'help'],
    response: {
      text: "Greetings, builder! I am **ASTRA 3.0**, the autonomous Orbital Mission Control Copilot for **INNOVERSE 3.0**.\n\nI monitor telemetry, rules, problem tracks, prize matrices, and registration status for squads competing at KLS GIT Belagavi. How can I assist your mission?",
      actions: [
        { label: '🚀 How to Register', type: 'register' },
        { label: '🏆 Prize Matrix', type: 'prizes' },
        { label: '🌌 5 Mission Arenas', type: 'tracks' }
      ]
    }
  },
  {
    triggers: ['spaceship', 'shuttle', 'astronaut', 'globe', 'earth', 'graphics', 'space'],
    response: {
      text: "🌌 Telemetry Report: The **Nexus-1 Space Shuttle** orbiting the photorealistic 3D Earth represents the bold, exploratory spirit of INNOVERSE 3.0 builders!\n\nJust as space exploration requires precision and ambition, this hackathon challenges your team to push the outer boundary of what software, hardware, and AI can achieve.",
      actions: [
        { label: '🚀 Join the Mission', type: 'register' }
      ]
    }
  }
];

// Fallback intelligent response generator
function generateBotResponse(userInput) {
  const cleanInput = userInput.toLowerCase().trim();

  for (const item of KNOWLEDGE_BASE) {
    if (item.triggers.some((trigger) => cleanInput.includes(trigger))) {
      return item.response;
    }
  }

  return {
    text: `Transmission received regarding "${userInput}".\n\nHere are the critical mission coordinates:\n• **Event**: INNOVERSE 3.0 — 24-Hour AI & Tech Hackathon\n• **Venue**: KLS GIT Belagavi (Dept of MCA)\n• **Team**: Strictly 3 members (same institution)\n• **Fee**: ₹300 per squad\n• **Prizes**: ₹35,000+ total pool across BCA & MCA leagues!\n\nSelect a frequency channel below for instant telemetry:`,
    actions: [
      { label: '🚀 How to Register', type: 'register' },
      { label: '🏆 Prize Breakdown', type: 'prizes' },
      { label: '🌌 5 Mission Arenas', type: 'tracks' }
    ]
  };
}

const QUICK_CHANNELS = [
  { id: 'CH-01', label: 'Registration', query: 'How to Register?' },
  { id: 'CH-02', label: '₹300 Squad Fee', query: 'Team Size & Entry Fee?' },
  { id: 'CH-03', label: '₹35K Prizes', query: 'Prize Pool & Distribution' },
  { id: 'CH-04', label: '4 Sectors', query: 'What are the Sector Focus Areas?' },
  { id: 'CH-05', label: 'KLS GIT Venue', query: 'Where is the Venue?' },
  { id: 'CH-06', label: 'Flight Rules', query: 'Selection Rounds & Rules' }
];

/**
 * Sci-Fi Text Parser
 * Highlights bold terms, code pills, and diamond bullets with high-tech HUD colors.
 */
function renderSciFiFormattedText(rawText) {
  if (!rawText) return null;
  const paragraphs = rawText.split('\n\n');

  return (
    <div className="space-y-2">
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

              // Parse tokens: **bold** and `code`
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
                      className="font-bold text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                    >
                      {token.slice(2, -2)}
                    </strong>
                  );
                } else if (token.startsWith('`') && token.endsWith('`')) {
                  parts.push(
                    <code
                      key={`${lIdx}-${match.index}`}
                      className="px-1.5 py-0.5 mx-0.5 rounded bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] tracking-tight shadow-[0_0_8px_rgba(6,182,212,0.2)]"
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
                  <div key={lIdx} className="flex items-start gap-2 pl-0.5 text-zinc-200">
                    <span className="text-amber-400 font-mono text-[10px] leading-5 shrink-0 select-none">
                      ◈
                    </span>
                    <span className="flex-1 leading-relaxed text-xs sm:text-[13px]">{parts}</span>
                  </div>
                );
              }

              if (isNumberBullet) {
                const numMatch = trimmed.match(/^(\d+)\./);
                const num = numMatch ? numMatch[1] : '•';
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-0.5 text-zinc-200">
                    <span className="font-mono text-[9px] font-bold text-cyan-300 px-1.5 py-0.5 rounded bg-cyan-500/15 border border-cyan-400/30 shrink-0 select-none mt-0.5 shadow-[0_0_6px_rgba(6,182,212,0.2)]">
                      0{num}
                    </span>
                    <span className="flex-1 leading-relaxed text-xs sm:text-[13px]">{parts}</span>
                  </div>
                );
              }

              return (
                <p key={lIdx} className="leading-relaxed text-zinc-200 text-xs sm:text-[13px]">
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
  const soundEnabled = true;
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'bot',
      time: 'SYSTEM READY',
      text: "🌌 **Welcome to Orbital Mission Control, Builder!**\n\nI am **ASTRA 3.0**, your autonomous flight copilot for **INNOVERSE 3.0** at KLS GIT Belagavi.\n\nAsk me anything about registration, squad rules, the ₹35,000 cash pool, or the 5 problem arenas!",
      actions: [
        { label: '🚀 Claim Boarding Pass', type: 'register' },
        { label: '👥 Squad Rules & Fee', type: 'team' },
        { label: '🌌 5 Mission Arenas', type: 'tracks' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, isTyping]);

  const handleToggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      setHasUnread(false);
      if (soundEnabled) playSciFiSound('open');
      setTimeout(() => inputRef.current?.focus(), 250);
    } else {
      setIsOpen(false);
    }
  };

  const handleActionClick = (action) => {
    if (soundEnabled) playSciFiSound('send');

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
    } else if (action.type === 'team') {
      handleUserSubmit('What are the team size rules and entry fee?');
    }
  };

  const handleUserSubmit = (overrideText = null) => {
    const textToSend = overrideText || inputValue;
    if (!textToSend.trim() || isTyping) return;

    if (soundEnabled) playSciFiSound('send');

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
      if (soundEnabled) playSciFiSound('receive');
    }, 550);
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
          COMPACT FLOATING ICON TRIGGER BUTTON (Bottom Right)
          Clean, elegant circular icon button without wide pill or bulky elements.
          ===================================================================== */}
      <div className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-50 select-none">
        {!isOpen && (
          <button
            id="open-chatbot-btn"
            onClick={handleToggleOpen}
            aria-label="Open Mission Control AI Assistant"
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0a0a14]/95 hover:bg-[#121222] border border-amber-400/50 hover:border-amber-300 text-amber-300 hover:text-white backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.85),0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_30px_rgba(245,158,11,0.55)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Subtle Rotating Orbital Dashed Ring */}
            <span className="absolute inset-[-3px] rounded-full border border-dashed border-amber-400/30 group-hover:border-amber-400/70 animate-spin [animation-duration:12s] pointer-events-none" />

            {/* Clean, Nicely Proportioned Bot Icon (Not oversized) */}
            <Bot className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform duration-200" />

            {/* Tiny Live Status Pip */}
            <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />

            {/* Unread Alert Ping */}
            {hasUnread && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
              </span>
            )}
          </button>
        )}
      </div>

      {/* =====================================================================
          EXPANDED SCI-FI MISSION CONTROL HUD TERMINAL
          ===================================================================== */}
      {isOpen && (
        <div
          className={`fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-50 flex flex-col w-[calc(100vw-2.5rem)] sm:w-[430px] max-w-[450px] rounded-2xl border border-amber-500/40 bg-[#06060c]/98 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_35px_rgba(245,158,11,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden transition-all duration-300 font-sans ${
            isMinimized ? 'h-14 sm:h-16' : 'h-[560px] sm:h-[620px] max-h-[88vh]'
          }`}
        >
          {/* High-Tech HUD Corner Accents */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400 pointer-events-none z-20" />
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-400 pointer-events-none z-20" />
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-20" />

          {/* Top Multi-Color Energy Hairline */}
          <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-amber-400 to-orange-500 shrink-0" />

          {/* HUD Header Strip */}
          <div className="relative flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-white/10 bg-black/70 backdrop-blur-xl shrink-0 select-none">
            {/* Left Identity & Telemetry */}
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-gradient-to-br from-amber-500/20 via-black to-cyan-500/20 border border-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                <Bot className="w-4 sm:w-5 h-4 sm:h-5 text-amber-300" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                    ASTRA 3.0
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 border border-emerald-400/30 text-[8px] sm:text-[9px] font-mono text-emerald-300 font-semibold uppercase tracking-wider">
                    ONLINE
                  </span>
                </div>
              </div>
            </div>

            {/* Right HUD Controls */}
            <div className="flex items-center gap-1">
              {/* Minimize Window */}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand HUD' : 'Minimize HUD'}
                className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                title="Disconnect HUD"
                className="p-1.5 rounded-md hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Minimized Telemetry Bar Preview */}
          {isMinimized && (
            <div
              onClick={() => setIsMinimized(false)}
              className="flex-1 flex items-center justify-between px-4 bg-[#0a0a14] cursor-pointer hover:bg-[#101020] transition-colors"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>[ ◈ ASTRA 3.0 // STANDBY MODE // CLICK TO EXPAND ]</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[9px] text-cyan-400">
                <Radio className="w-3 h-3 animate-pulse" />
                <span>READY</span>
              </div>
            </div>
          )}

          {/* Window Body (When Not Minimized) */}
          {!isMinimized && (
            <>
              {/* Transmission Message Logs */}
              <div className="flex-1 overflow-y-auto px-3.5 sm:px-4 py-3.5 space-y-3.5 scrollbar-thin scrollbar-thumb-amber-500/30 scrollbar-track-black/40">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    {/* Timestamp & Transmission Callout */}
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-400 uppercase tracking-wider mb-1 px-1">
                      {msg.sender === 'user' ? (
                        <>
                          <span className="text-cyan-400 font-bold">◈ SQUAD TRANSMISSION</span>
                          <span>•</span>
                          <span>{msg.time}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-amber-400 font-bold">◈ ASTRA // TELEMETRY DIRECTIVE</span>
                          <span>•</span>
                          <span>{msg.time}</span>
                        </>
                      )}
                    </div>

                    {/* High-Tech Message Card */}
                    <div
                      className={`max-w-[92%] sm:max-w-[88%] rounded-xl p-3 sm:p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-lg transition-all relative overflow-hidden ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-amber-500/25 via-amber-500/15 to-transparent border border-amber-400/50 rounded-tr-none text-white shadow-[0_0_20px_rgba(245,158,11,0.15)] backdrop-blur-md'
                          : 'bg-[#0d0e1a]/95 text-zinc-200 border border-white/10 border-l-2 border-l-amber-400 rounded-tl-none shadow-[0_4px_25px_rgba(0,0,0,0.8)] backdrop-blur-md'
                      }`}
                    >
                      {/* Subtle Background Glow Accent for Bot */}
                      {msg.sender === 'bot' && (
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
                      )}

                      {/* Sci-Fi Formatted Body */}
                      {msg.sender === 'bot' ? (
                        renderSciFiFormattedText(msg.text)
                      ) : (
                        <p className="whitespace-pre-line font-sans text-white/95 leading-relaxed">
                          {msg.text}
                        </p>
                      )}

                      {/* Tactical Action Chips */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5 sm:gap-2">
                          {msg.actions.map((act, aIdx) => (
                            <button
                              key={aIdx}
                              onClick={() => handleActionClick(act)}
                              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-400/50 hover:border-amber-400 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 hover:text-white font-mono text-[10px] sm:text-[11px] font-bold tracking-wide transition-all shadow-[0_2px_10px_rgba(245,158,11,0.15)] hover:shadow-[0_0_15px_rgba(245,158,11,0.35)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                            >
                              <span>{act.label}</span>
                              <ArrowRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Telemetry Decoding State (Typing Indicator) */}
                {isTyping && (
                  <div className="flex flex-col items-start space-y-1">
                    <span className="font-mono text-[9px] text-amber-400/80 uppercase tracking-widest px-1">
                      ◈ ASTRA // DECODING TELEMETRY STREAM...
                    </span>
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl rounded-tl-none bg-[#0d0e1a] border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-bounce" />
                      </div>
                      <span className="font-mono text-[10px] text-zinc-400">ANALYZING QUERY</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Telemetry Channels Strip */}
              <div className="px-3 py-2 border-t border-white/[0.08] bg-black/60 shrink-0 select-none">
                <div className="flex items-center justify-between mb-1.5 px-0.5">
                  <span className="font-mono text-[9px] text-amber-400/80 font-bold tracking-wider flex items-center gap-1">
                    <Radio className="w-2.5 h-2.5 text-cyan-400" />
                    FREQUENCY CHANNELS
                  </span>
                  <span className="font-mono text-[8px] text-zinc-400">SELECT FREQUENCY</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                  {QUICK_CHANNELS.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => handleUserSubmit(ch.query)}
                      disabled={isTyping}
                      className="whitespace-nowrap px-2.5 py-1 rounded-md border border-white/10 hover:border-amber-400/60 bg-white/[0.03] hover:bg-amber-400/10 text-zinc-300 hover:text-amber-300 font-mono text-[10px] tracking-wide transition-all cursor-pointer disabled:opacity-40 shrink-0 shadow-sm flex items-center gap-1 hover:shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                    >
                      <span className="text-amber-400/60 font-bold text-[8px]">{ch.id}:</span>
                      <span>{ch.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Command Input Console */}
              <div className="p-3 sm:p-3.5 border-t border-white/10 bg-[#05050a] shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUserSubmit();
                  }}
                  className="relative flex items-center gap-2"
                >
                  <div className="relative flex-1 flex items-center">
                    <div className="absolute left-3 flex items-center gap-1 text-amber-400 font-mono font-bold text-[11px] pointer-events-none select-none">
                      <Terminal className="w-3.5 h-3.5 text-amber-400" />
                      <span>&gt;</span>
                    </div>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask Astra anything about INNOVERSE 3.0..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] focus:bg-white/[0.08] focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50 text-xs sm:text-sm text-white placeholder-zinc-500 font-sans tracking-wide transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    aria-label="Transmit telemetry query"
                    className="flex items-center justify-center gap-1.5 px-3 sm:px-3.5 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400 disabled:opacity-30 disabled:hover:from-amber-400 disabled:hover:to-amber-500 transition-all font-mono font-bold text-xs cursor-pointer disabled:cursor-not-allowed shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="hidden sm:inline">SEND</span>
                    <Send className="w-3.5 h-3.5 text-black" />
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
