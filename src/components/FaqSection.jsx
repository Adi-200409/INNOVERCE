import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

const FAQS = [
  {
    q: 'Who is eligible to participate in INNOVERSE 2026?',
    a: 'INNOVERSE is open to all university undergraduate and postgraduate students, researchers, early-career engineers, and self-taught developers across India. All participants must provide valid student or institution credentials during check-in.'
  },
  {
    q: 'What is the permitted team size? Can I apply solo?',
    a: 'Teams can consist of 2 to 4 members. You may apply individually or as a pre-formed squad. If you apply solo, our pre-hackathon Discord matchmaking channel will help you team up with complementary builders.'
  },
  {
    q: 'Is registration completely free?',
    a: 'Yes, 100% free! There is zero registration fee. Selected hacker squads receive complimentary meals, midnight snacks, Red Bull fuel, Wi-Fi access, swag packages, and cloud compute credits.'
  },
  {
    q: 'Can we build upon pre-existing codebases?',
    a: 'All project code must be authored during the 24-hour sprint. You are encouraged to use open-source libraries, APIs, pre-trained base model weights, and design templates, but writing application logic in advance is strictly prohibited.'
  },
  {
    q: 'What cloud resources and hardware will be provided?',
    a: 'Shortlisted teams will receive cloud compute grants from our partners, model API tokens (Anthropic, OpenAI, etc.), and high-speed gigabit Wi-Fi. Teams competing in the Intelligent Edge track may bring their own microcontrollers (ESP32, Raspberry Pi, etc.).'
  },
  {
    q: 'Is INNOVERSE in-person or remote? Where is the venue?',
    a: 'INNOVERSE 2026 is an in-person 24-hour sprint hosted at KLS Gogte Institute of Technology (KLS GIT), Belagavi, Karnataka. Virtual accommodations are available for select remote international squads.'
  },
  {
    q: 'Who owns the intellectual property (IP) of projects built?',
    a: 'You do! All code, designs, and intellectual property produced during the hackathon remain 100% owned by the respective builders and team members.'
  },
  {
    q: 'What are the judging criteria?',
    a: 'Projects are evaluated on 4 core pillars: Technical Depth & Complexity (30%), Originality & Innovation (25%), Real-World Impact & Feasibility (25%), and Quality of UI/UX & Demo Presentation (20%).'
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
