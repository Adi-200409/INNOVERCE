import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

const FAQS = [
  {
    q: 'Who is eligible to participate in INNOVERSE 3.0?',
    a: 'INNOVERSE 3.0 features separate competitive tracks for MCA (Postgraduate) and BCA (Undergraduate) students across India. Participants must form a squad within their respective academic tier and provide valid college credentials.'
  },
  {
    q: 'What is the required team size?',
    a: 'Team size is strictly 3 members per team (fixed). Neither solo entries nor squads of other sizes are permitted. All 3 members must register together.'
  },
  {
    q: 'What is the registration fee?',
    a: 'The registration fee is ₹300 per team. This nominal fee covers your preliminary round evaluation. For shortlisted teams advancing to the final round, it covers all on-campus facilities including meals, midnight snacks, Red Bull fuel, Wi-Fi, mentorship, and participation certificates at KLS GIT Belagavi.'
  },
  {
    q: 'How do the competition rounds and selection work?',
    a: 'INNOVERSE 3.0 is structured in two stages: (1) Preliminary Round: Teams submit their problem statement abstract, tech architecture, and blueprint online with the ₹300 fee. (2) Final Round: Shortlisted squads are invited to KLS GIT, Belagavi for the intense 24-hour on-campus coding sprint.'
  },
  {
    q: 'What is the prize pool and prize distribution?',
    a: 'The total prize pool is ₹35,000 across the dual competitive leagues (MCA and BCA). In each track, the First Prize winner receives ₹12,000 cash with the Grand Champion Trophy, and the Second Prize runner-up receives ₹6,000 cash with the Runner-Up Trophy and certificates.'
  },
  {
    q: 'Can we build upon pre-existing codebases?',
    a: 'All project code must be authored during the 24-hour final sprint. You are encouraged to use open-source libraries, APIs, pre-trained base model weights, and design templates, but writing application logic in advance is strictly prohibited.'
  },
  {
    q: 'Where is the hackathon venue?',
    a: 'The 24-hour Final Round is an in-person marathon hosted at the Department of MCA, KLS Gogte Institute of Technology (KLS GIT), Belagavi, Karnataka, with 24/7 power backup, high-speed Wi-Fi 6, and dedicated hacker pods.'
  },
  {
    q: 'Who owns the intellectual property (IP) of projects built?',
    a: 'You do! All code, designs, and intellectual property produced during the hackathon remain 100% owned by the respective builders and team members.'
  },
  {
    q: 'What are the judging criteria?',
    a: 'Projects are evaluated on 4 core pillars: Technical Depth & Complexity (30%), Originality & Innovation (25%), Real-World Impact & Feasibility (25%), and Quality of UI/UX & Demo Presentation (20%). MCA and BCA tracks are judged by separate evaluation panels under distinct rubrics.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#060608] z-20">
      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start md:items-center md:text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>TRANSMISSION ARCHIVES</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            Frequently Asked <span className="text-amber-400">Questions</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-xl font-sans">
            Got questions before boarding? Here is everything you need to know about the mission.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-amber-400/40 bg-[#0e0e16] shadow-[0_0_25px_rgba(245,158,11,0.08)]'
                    : 'border-white/10 bg-[#09090e]/80 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <span className="font-display font-semibold text-sm sm:text-base text-white">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-amber-400 text-black border-amber-400'
                        : 'border-white/10 text-white/50 bg-white/5'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 text-xs sm:text-sm text-gray-400 font-sans leading-relaxed border-t border-white/5 animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support Pill */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Still have questions? Reach our flight crew on Discord or email</span>
            <a
              href="mailto:help@innoverse.tech"
              className="text-amber-400 underline hover:text-amber-300 transition-colors"
            >
              help@innoverse.tech
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
