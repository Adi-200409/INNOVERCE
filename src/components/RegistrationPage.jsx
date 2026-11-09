import React, { useState } from 'react';
import {
  Rocket,
  ArrowLeft,
  Trophy,
  Calendar,
  MapPin,
  Users,
  Ticket,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import BoardingPass from './BoardingPass';

export default function RegistrationPage({ onBackToHome }) {
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderContact: '',
    member1Name: '',
    member2Name: '',
    institutionName: '',
    collegeAddress: '',
    stream: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');

  const googleFormUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSfPgaUONQ7VBSQ3rNObDOquTU1d7RGHTIsHHEvIsVa2JNRKzQ/viewform';

  const handleSubmit = (e) => {
    e.preventDefault();

    const uniqueId = `INN-3.0-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationId(uniqueId);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Celebratory confetti burst
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#f59e0b', '#fbbf24', '#3b82f6', '#10b981', '#ffffff']
    });
  };

  const handleReset = () => {
    setFormData({
      teamName: '',
      leaderName: '',
      leaderEmail: '',
      leaderContact: '',
      member1Name: '',
      member2Name: '',
      institutionName: '',
      collegeAddress: '',
      stream: ''
    });
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#060608] text-white selection:bg-amber-400 selection:text-black py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Ambience */}
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full z-0" />
      <div className="pointer-events-none fixed top-1/2 -right-40 w-[600px] h-[600px] bg-blue-600/10 blur-[170px] rounded-full z-0" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 sm:mb-12">
          <button
            onClick={onBackToHome || (() => { window.location.href = '/'; })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all text-xs font-mono uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-all text-xs font-mono uppercase tracking-wider"
          >
            <span>Open in Google Forms</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {!submitted ? (
          <div className="space-y-8">
            {/* =========================================================================
                EVENT HEADER & DOSSIER CARD
                ========================================================================= */}
            <div className="rounded-3xl border border-white/15 bg-[#0a0a0e]/95 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/[0.08] rounded-full blur-3xl pointer-events-none" />

              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 font-mono text-[11px] sm:text-xs uppercase tracking-widest mb-4">
                <Rocket className="w-3.5 h-3.5" />
                <span>OFFICIAL HACKATHON REGISTRATION</span>
              </div>

              <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                INNOVERSE 3.0 –{' '}
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  National Level Hackathon
                </span>
              </h1>

              {/* Organizer Accreditation */}
              <div className="mt-4 p-4 rounded-2xl border border-white/10 bg-white/[0.03] space-y-1">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                  <span className="text-base select-none">🚀</span>
                  <div>
                    <span className="text-white/60 font-mono text-xs uppercase tracking-wider block mb-0.5">
                      Presented by:
                    </span>
                    <strong className="text-white font-semibold">
                      Official Event Venue
                    </strong>
                    <div className="text-amber-400 font-medium text-xs mt-0.5">
                      in collaboration with <strong className="text-amber-300 font-bold">Prodhee Technologies</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Key Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-6 font-mono text-xs">
                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-white/40 text-[10px] uppercase block">Event Duration</span>
                    <span className="text-white font-bold">24 Hours Non-Stop</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-white/40 text-[10px] uppercase block">Venue</span>
                    <span className="text-white font-bold truncate block">Event Campus</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Ticket className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-white/40 text-[10px] uppercase block">Registration Fee</span>
                    <span className="text-amber-300 font-bold">₹300 per team</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-white/40 text-[10px] uppercase block">Team Size</span>
                    <span className="text-white font-bold">3 Members (Strictly)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-3 sm:col-span-2 lg:col-span-1">
                  <div className="w-9 h-9 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center shrink-0">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <span className="text-white/40 text-[10px] uppercase block">Pool Prize</span>
                    <span className="text-amber-400 font-black text-sm">Rs 50,000/-</span>
                  </div>
                </div>
              </div>

              {/* Theme Tracks Strip */}
              <div className="mt-5 p-4 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-mono text-xs text-amber-300 font-semibold">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>🎯 Theme Tracks:</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-200">
                    Cyber Security
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-200">
                    Blockchain
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-200">
                    Artificial Intelligence & Machine Learning
                  </span>
                </div>
              </div>

              {/* Motivation & Rule Notice */}
              <div className="mt-5 text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                Get ready to code, create, and conquer challenges that test your innovation and teamwork! Read the rules carefully before registering.
              </div>

              {/* Contact Queries Section */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                <span className="text-white/60">For any queries, contact:</span>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="tel:6362237616"
                    className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Praveen H B – 6362237616</span>
                  </a>
                  <span className="text-white/20 hidden sm:inline">•</span>
                  <a
                    href="tel:7760819024"
                    className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Sriraj R Y – 7760819024</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Google Form Switch Notice Banner */}
            <div className="p-4 rounded-2xl border border-white/10 bg-[#0d0d12]/95 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white/50 shrink-0" />
                <span className="text-white/80">
                  adityap4til@gmail.com{' '}
                  <a
                    href={googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline inline-flex items-center gap-1 ml-1"
                  >
                    Switch accounts
                  </a>
                </span>
              </div>
              <div className="text-[11px] text-white/40">
                The name, email address and photo associated with your Google Account will be recorded when you upload files and submit this form
              </div>
            </div>

            {/* =========================================================================
                THE REGISTRATION FORM
                ========================================================================= */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-right text-xs font-mono text-amber-400">
                * Indicates required question
              </div>

              {/* 1. Team Name */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0a0a0e]/95 space-y-2">
                <label className="block font-mono text-xs uppercase tracking-wider text-white font-bold">
                  Team Name <span className="text-amber-400">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your answer"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans text-sm text-white placeholder-gray-500 transition-all"
                />
              </div>

              {/* 2. Team Leader Name */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0a0a0e]/95 space-y-2">
                <label className="block font-mono text-xs uppercase tracking-wider text-white font-bold">
                  Team Leader Name (Full Name) <span className="text-amber-400">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your answer"
                  value={formData.leaderName}
                  onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans text-sm text-white placeholder-gray-500 transition-all"
                />
              </div>

              {/* 3. Email ID (Leader) */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0a0a0e]/95 space-y-2">
                <label className="block font-mono text-xs uppercase tracking-wider text-white font-bold">
                  Email ID (Leader) <span className="text-amber-400">*</span>
                </label>
                <input
                  required
                  type="email"
                  placeholder="Your answer"
                  value={formData.leaderEmail}
                  onChange={(e) => setFormData({ ...formData, leaderEmail: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans text-sm text-white placeholder-gray-500 transition-all"
                />
              </div>

              {/* 4. Contact Number (Leader) */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0a0a0e]/95 space-y-2">
                <label className="block font-mono text-xs uppercase tracking-wider text-white font-bold">
                  Contact Number (Leader) <span className="text-amber-400">*</span>
                </label>
                <input
                  required
                  type="tel"
                  placeholder="Your answer"
                  value={formData.leaderContact}
                  onChange={(e) => setFormData({ ...formData, leaderContact: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans text-sm text-white placeholder-gray-500 transition-all"
                />
              </div>

              {/* 5. Team Member 1 (Full Name) */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0a0a0e]/95 space-y-2">
                <label className="block font-mono text-xs uppercase tracking-wider text-white font-bold">
                  Team Member 1 (Full Name) <span className="text-amber-400">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your answer"
                  value={formData.member1Name}
                  onChange={(e) => setFormData({ ...formData, member1Name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans text-sm text-white placeholder-gray-500 transition-all"
                />
              </div>

              {/* 6. Team Member 2 (Full Name) */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0a0a0e]/95 space-y-2">
                <label className="block font-mono text-xs uppercase tracking-wider text-white font-bold">
                  Team Member 2 (Full Name) <span className="text-amber-400">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your answer"
                  value={formData.member2Name}
                  onChange={(e) => setFormData({ ...formData, member2Name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans text-sm text-white placeholder-gray-500 transition-all"
                />
              </div>

              {/* 7. Institution Name */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0a0a0e]/95 space-y-2">
                <label className="block font-mono text-xs uppercase tracking-wider text-white font-bold">
                  Institution Name <span className="text-amber-400">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your answer"
                  value={formData.institutionName}
                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans text-sm text-white placeholder-gray-500 transition-all"
                />
              </div>

              {/* 8. College Address/City/State */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0a0a0e]/95 space-y-2">
                <label className="block font-mono text-xs uppercase tracking-wider text-white font-bold">
                  College Address/City/State <span className="text-amber-400">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your answer"
                  value={formData.collegeAddress}
                  onChange={(e) => setFormData({ ...formData, collegeAddress: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans text-sm text-white placeholder-gray-500 transition-all"
                />
              </div>

              {/* 9. Stream (BCA / MCA) */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0a0a0e]/95 space-y-4">
                <label className="block font-mono text-xs uppercase tracking-wider text-white font-bold">
                  Stream <span className="text-amber-400">*</span>
                </label>

                <div className="space-y-3">
                  <label
                    onClick={() => setFormData({ ...formData, stream: 'BCA' })}
                    className={`flex items-center gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.stream === 'BCA'
                        ? 'border-amber-400 bg-amber-500/10 text-white'
                        : 'border-white/10 bg-white/[0.02] text-gray-300 hover:border-white/25'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        formData.stream === 'BCA'
                          ? 'border-amber-400 bg-amber-400'
                          : 'border-white/30'
                      }`}
                    >
                      {formData.stream === 'BCA' && (
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      )}
                    </div>
                    <span className="font-mono text-sm font-semibold">BCA</span>
                  </label>

                  <label
                    onClick={() => setFormData({ ...formData, stream: 'MCA' })}
                    className={`flex items-center gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.stream === 'MCA'
                        ? 'border-amber-400 bg-amber-500/10 text-white'
                        : 'border-white/10 bg-white/[0.02] text-gray-300 hover:border-white/25'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        formData.stream === 'MCA'
                          ? 'border-amber-400 bg-amber-400'
                          : 'border-white/30'
                      }`}
                    >
                      {formData.stream === 'MCA' && (
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      )}
                    </div>
                    <span className="font-mono text-sm font-semibold">MCA</span>
                  </label>
                </div>

                {!formData.stream && (
                  <p className="text-[11px] font-mono text-amber-400/80 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Please select your stream (BCA or MCA)</span>
                  </p>
                )}
              </div>

              {/* Submit Button Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/15 text-white/60 hover:text-white hover:bg-white/5 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Clear Form
                </button>

                <button
                  type="submit"
                  disabled={!formData.stream}
                  className="w-full sm:w-auto px-10 py-4 rounded-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Rocket className="w-4 h-4 text-black" />
                  <span>Submit Registration (₹300)</span>
                </button>
              </div>
            </form>

            <BoardingPass
              teamName={formData.teamName}
              leaderName={formData.leaderName}
              leaderEmail={formData.leaderEmail}
              institutionName={formData.institutionName}
              stream={formData.stream}
            />
          </div>
        ) : (
          /* =========================================================================
              CONFIRMATION STATE / DIGITAL BOARDING PASS
              ========================================================================= */
          <div className="rounded-3xl border border-emerald-500/30 bg-[#0a0a0e]/95 p-6 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-center relative overflow-hidden animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-400/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-mono text-xs uppercase tracking-widest mb-3">
              <span>REGISTRATION CONFIRMED</span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-2">
              Registration Successful!
            </h2>
            <p className="text-sm text-gray-300 max-w-lg mx-auto mb-8 font-sans">
              Thank you for registering squad <strong className="text-white">{formData.teamName}</strong> for <strong className="text-amber-400">INNOVERSE 3.0</strong>! Your response has been recorded.
            </p>

            <div className="mb-8">
              <BoardingPass
                teamName={formData.teamName}
                leaderName={formData.leaderName}
                leaderEmail={formData.leaderEmail}
                institutionName={formData.institutionName}
                stream={formData.stream}
                confirmationId={confirmationId}
                submitted
              />
            </div>

            {/* Queries Reminder */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] max-w-xl mx-auto text-xs font-mono text-gray-300 mb-8 space-y-1">
              <div className="text-white/70">For any queries, reach out to coordinators:</div>
              <div className="text-amber-300">
                Praveen H B: <a href="tel:6362237616" className="hover:underline">6362237616</a> | Sriraj R Y: <a href="tel:7760819024" className="hover:underline">7760819024</a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full border border-white/20 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
              >
                Submit Another Response
              </button>
              <button
                onClick={onBackToHome || (() => { window.location.href = '/'; })}
                className="px-8 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer"
              >
                Return to Hackathon Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
