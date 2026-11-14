import React, { useState, useEffect, useRef } from 'react';
import {
  Rocket,
  ArrowLeft,
  Trophy,
  Calendar,
  MapPin,
  Users,
  Ticket,
  Phone,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  AlertCircle,
  LogIn,
  Loader2,
  QrCode,
  UploadCloud,
  FileCheck,
  Trash2,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import BoardingPass from './BoardingPass';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/+$/, '');
const LOCAL_REGISTRATIONS_KEY = 'innoverce_local_registrations';

function saveLocalRegistration(formData, confirmationId) {
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_REGISTRATIONS_KEY) || '[]');
    const record = {
      confirmation_id: confirmationId,
      team_name: formData.teamName,
      leader_name: formData.leaderName,
      leader_email: formData.leaderEmail,
      leader_contact: formData.leaderContact,
      member1_name: formData.member1Name,
      member2_name: formData.member2Name,
      institution_name: formData.institutionName,
      college_address: formData.collegeAddress,
      stream: formData.stream,
      utr_number: formData.utrNumber,
      payment_status: 'PENDING'
    };
    localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify([record, ...existing]));
  } catch {
    // Ignore storage errors
  }
}

export default function RegistrationPage({ onBackToHome, embedded = false, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderContact: '',
    member1Name: '',
    member2Name: '',
    institutionName: '',
    collegeAddress: '',
    stream: '',
    utrNumber: ''
  });

  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [utrError, setUtrError] = useState('');
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

  const [submitted, setSubmitted] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Aliases to avoid undefined reference errors
  const isSubmitting = submitting;
  const setIsSubmitting = setSubmitting;
  const errorMessage = submitError;
  const setErrorMessage = setSubmitError;

  const googleFormUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSfPgaUONQ7VBSQ3rNObDOquTU1d7RGHTIsHHEvIsVa2JNRKzQ/viewform';

  const handleCopyUpi = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText('9611606975@kbl');
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    }
  };

  // Cleanup object URL when preview unmounts or changes
  useEffect(() => {
    return () => {
      if (screenshotPreview) {
        URL.revokeObjectURL(screenshotPreview);
      }
    };
  }, [screenshotPreview]);

  const handleUtrChange = (e) => {
    // Restrict to digits only, maximum 12 characters
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 12);
    setFormData((prev) => ({ ...prev, utrNumber: digitsOnly }));

    if (digitsOnly.length > 0 && digitsOnly.length < 12) {
      setUtrError('12-digit UTR / Transaction ID must be exactly 12 digits.');
    } else {
      setUtrError('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileError('');

    if (!file) {
      setPaymentScreenshot(null);
      if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);
      setScreenshotPreview(null);
      return;
    }

    const validExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = (file.name.split('.').pop() || '').toLowerCase();
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/pjpeg'];

    if (!validExtensions.includes(fileExtension) || (file.type && !validMimeTypes.includes(file.type.toLowerCase()))) {
      setFileError('Invalid file type. Only image files (.jpg, .jpeg, .png) are accepted.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setPaymentScreenshot(null);
      if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);
      setScreenshotPreview(null);
      return;
    }

    // Max 5MB (5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError(`File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds the 5MB limit.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setPaymentScreenshot(null);
      if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);
      setScreenshotPreview(null);
      return;
    }

    setPaymentScreenshot(file);
    if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);
    setScreenshotPreview(URL.createObjectURL(file));
  };

  const handleRemoveFile = () => {
    setPaymentScreenshot(null);
    if (screenshotPreview) {
      URL.revokeObjectURL(screenshotPreview);
    }
    setScreenshotPreview(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    // Pre-flight validation
    const cleanUtr = (formData.utrNumber || '').trim();
    if (!/^\d{12}$/.test(cleanUtr)) {
      setUtrError('12-digit UTR / Transaction ID must be exactly 12 digits.');
      setSubmitError('Please enter a valid 12-digit numeric UTR / Transaction ID.');
      return;
    }

    if (!paymentScreenshot) {
      setFileError('Payment screenshot is required.');
      setSubmitError('Please upload your payment screenshot (.jpg, .jpeg, or .png, max 5MB).');
      return;
    }

    if (paymentScreenshot.size > 5 * 1024 * 1024) {
      setFileError('Payment screenshot file size must be less than 5MB.');
      setSubmitError('Payment screenshot file size must be less than 5MB.');
      return;
    }

    setSubmitting(true);

    try {
      // Build multipart/form-data payload
      const multipartData = new FormData();
      multipartData.append('teamName', formData.teamName);
      multipartData.append('team_name', formData.teamName);
      multipartData.append('leaderName', formData.leaderName);
      multipartData.append('leader_name', formData.leaderName);
      multipartData.append('leaderEmail', formData.leaderEmail);
      multipartData.append('leader_email', formData.leaderEmail);
      multipartData.append('leaderContact', formData.leaderContact);
      multipartData.append('leader_contact', formData.leaderContact);
      multipartData.append('member1Name', formData.member1Name);
      multipartData.append('member1_name', formData.member1Name);
      multipartData.append('member2Name', formData.member2Name);
      multipartData.append('member2_name', formData.member2Name);
      multipartData.append('institutionName', formData.institutionName);
      multipartData.append('institution_name', formData.institutionName);
      multipartData.append('collegeAddress', formData.collegeAddress);
      multipartData.append('college_address', formData.collegeAddress);
      multipartData.append('stream', formData.stream);
      multipartData.append('utrNumber', cleanUtr);
      multipartData.append('utr_number', cleanUtr);
      multipartData.append('paymentScreenshot', paymentScreenshot);
      multipartData.append('payment_screenshot', paymentScreenshot);

      const response = await fetch(`${API_BASE}/api/register/`, {
        method: 'POST',
        // Note: Do not set Content-Type header so the browser sets multipart/form-data boundary automatically
        body: multipartData
      });

      if (response.ok) {
        // On receiving a 200 OK from the backend, trigger the existing "Registration Successful" UI state
        const payload = await response.json().catch(() => ({}));
        const resolvedId = payload.confirmationId || payload.confirmation_id || `INN-3.0-${Math.floor(100000 + Math.random() * 900000)}`;
        saveLocalRegistration(formData, resolvedId);
        setConfirmationId(resolvedId);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Celebratory confetti burst
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#f59e0b', '#fbbf24', '#3b82f6', '#10b981', '#ffffff']
        });
      } else {
        const errPayload = await response.json().catch(() => null);
        let errorMsg = 'Please verify all required registration fields.';
        if (errPayload) {
          if (typeof errPayload === 'string') {
            errorMsg = errPayload;
          } else if (errPayload.message) {
            errorMsg = errPayload.message;
          } else if (errPayload.detail) {
            errorMsg = errPayload.detail;
          } else {
            const firstVal = Object.values(errPayload).flat()[0];
            if (firstVal) errorMsg = String(firstVal);
          }
        }
        setSubmitError(errorMsg);
      }
    } catch (err) {
      console.error('Registration submission error:', err);
      setSubmitError(err.message || 'Unable to connect to the registration server. Please check your backend connection.');
    } finally {
      setSubmitting(false);
    }
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
      stream: '',
      utrNumber: ''
    });
    setPaymentScreenshot(null);
    if (screenshotPreview) {
      URL.revokeObjectURL(screenshotPreview);
    }
    setScreenshotPreview(null);
    setUtrError('');
    setFileError('');
    setSubmitError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setSubmitted(false);
    setErrorMessage('');
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formContent = (
    <>
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

              {/* Sector Focus Areas Strip */}
              <div className="mt-5 p-4 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-mono text-xs text-amber-300 font-semibold shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>🎯 Sector Focus Areas:</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-200">
                    Fintech
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-200">
                    Educational
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                    Healthcare
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-200">
                    Agriculture
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

            {/* =========================================================================
                THE REGISTRATION FORM
                ========================================================================= */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-2xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-xs sm:text-sm text-red-200"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}
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

              {/* =========================================================================
                  10. MANUAL UPI PAYMENT VERIFICATION SECTION
                  ========================================================================= */}
              <div className="p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-[#0a0a0e]/95 space-y-6 relative overflow-hidden shadow-[0_10px_35px_rgba(245,158,11,0.08)]">
                {/* Ambient Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.05] rounded-full blur-2xl pointer-events-none" />

                {/* Header */}
                <div className="border-b border-white/10 pb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 font-mono text-[11px] uppercase tracking-wider mb-2">
                    <QrCode className="w-3.5 h-3.5" />
                    <span>MANUAL UPI PAYMENT STEP</span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    Scan & Pay Registration Fee (₹300)
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
                    Scan the QR code with any UPI app (GPay, PhonePe, Paytm, BHIM) to pay the registration fee of ₹300 per team. Once completed, enter the 12-digit UTR and upload the payment screenshot below for verification.
                  </p>
                </div>

                {/* Static Payment QR Code Display Card */}
                <div className="flex flex-col md:flex-row items-center gap-6 p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                  {/* Clean Square QR Code Container */}
                  <div className="relative group p-4 bg-white rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.25)] shrink-0 flex flex-col items-center">
                    <img
                      src="/payment-qr.png"
                      alt="UPI Payment QR Code - the chairman govrn body mca dept"
                      className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-lg"
                    />
                    <div className="mt-2.5 text-center">
                      <span className="inline-block px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-[10px] uppercase tracking-wider">
                        ₹300 • SCAN WITH ANY UPI APP
                      </span>
                    </div>
                  </div>

                  {/* Payment Details & Instructions */}
                  <div className="space-y-3 font-mono text-xs w-full">
                    <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                          Official UPI ID (VPA)
                        </span>
                        <span className="text-[10px] text-amber-300/80 uppercase font-semibold">
                          Karnataka Bank
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between gap-2">
                        <span className="text-white text-sm sm:text-base font-bold font-mono select-all truncate">
                          9611606975@kbl
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="px-2.5 py-1 rounded-md bg-amber-400 hover:bg-amber-300 text-black font-mono text-[11px] font-bold transition-all flex items-center gap-1 shrink-0 cursor-pointer"
                        >
                          {copiedUpi ? (
                            <>
                              <Check className="w-3 h-3 text-black" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-black" />
                              <span>Copy UPI</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-[11px] text-gray-300 space-y-0.5 pt-1 border-t border-white/5">
                        <span className="text-white/60 block text-[10px] uppercase tracking-wider">
                          Payee / Beneficiary Name:
                        </span>
                        <strong className="text-white text-xs block font-mono">
                          the chairman govrn body mca dept
                        </strong>
                      </div>
                    </div>

                    {/* Direct UPI Mobile Link & Quick Info */}
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>Fixed Registration Fee: <strong className="text-amber-300">₹300 per squad</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>Compatible with: Google Pay, PhonePe, Paytm, BHIM, KBL Mobile, Cred</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span>After payment, copy the 12-digit UTR and take a clear receipt screenshot</span>
                      </div>
                    </div>

                    {/* Mobile Quick Pay Intent Button */}
                    <div className="pt-1">
                      <a
                        href="upi://pay?pa=9611606975@kbl&pn=the%20chairman%20govrn%20body%20mca%20dept&am=300&cu=INR&tn=INNOVERSE%203.0%20Registration"
                        className="inline-flex sm:hidden w-full items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold transition-all text-center"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Pay ₹300 Directly in UPI App (Mobile)</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 12-digit UTR Input Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="utr-input"
                    className="block font-mono text-xs uppercase tracking-wider text-white font-bold"
                  >
                    12-digit UTR / Transaction ID <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="utr-input"
                      required
                      type="text"
                      name="utr_number"
                      maxLength={12}
                      pattern="[0-9]{12}"
                      placeholder="Enter exactly 12-digit UTR (e.g. 412345678901)"
                      value={formData.utrNumber}
                      onChange={handleUtrChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                        utrError ? 'border-red-500/80 focus:border-red-500' : 'border-white/15 focus:border-amber-400'
                      } focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono text-sm text-white placeholder-gray-500 tracking-wider transition-all`}
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500 pointer-events-none">
                      {formData.utrNumber.length}/12
                    </div>
                  </div>
                  {utrError ? (
                    <p className="text-[11px] font-mono text-red-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{utrError}</span>
                    </p>
                  ) : (
                    <p className="text-[11px] font-mono text-gray-400">
                      Must be strictly 12 numeric digits as shown on your UPI payment confirmation slip.
                    </p>
                  )}
                </div>

                {/* Payment Screenshot File Input Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="screenshot-upload"
                    className="block font-mono text-xs uppercase tracking-wider text-white font-bold"
                  >
                    Payment Screenshot <span className="text-amber-400">*</span>
                  </label>

                  {/* File upload drag/click box */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-5 rounded-2xl border-2 border-dashed ${
                      fileError
                        ? 'border-red-500/60 bg-red-500/5'
                        : paymentScreenshot
                        ? 'border-emerald-500/60 bg-emerald-500/5'
                        : 'border-white/20 bg-white/[0.02] hover:border-amber-400/50 hover:bg-white/[0.04]'
                    } transition-all cursor-pointer text-center relative`}
                  >
                    <input
                      ref={fileInputRef}
                      id="screenshot-upload"
                      type="file"
                      required={!paymentScreenshot}
                      accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {paymentScreenshot && screenshotPreview ? (
                      <div
                        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center gap-4 text-left">
                          <img
                            src={screenshotPreview}
                            alt="Payment screenshot preview"
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-white/20 shadow-md shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-semibold">
                              <FileCheck className="w-4 h-4" />
                              <span>Screenshot Attached</span>
                            </div>
                            <p className="text-white font-medium text-xs sm:text-sm truncate max-w-[200px] sm:max-w-xs mt-0.5">
                              {paymentScreenshot.name}
                            </p>
                            <span className="text-[11px] font-mono text-gray-400">
                              {(paymentScreenshot.size / (1024 * 1024)).toFixed(2)} MB • {paymentScreenshot.type || 'image'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3.5 py-1.5 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-mono text-[11px] transition-colors cursor-pointer"
                          >
                            Change
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="px-3.5 py-1.5 rounded-lg border border-red-500/30 hover:border-red-500/60 bg-red-500/10 hover:bg-red-500/20 text-red-300 font-mono text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="py-4 space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-white text-xs sm:text-sm font-medium">
                            Click to select payment screenshot
                          </p>
                          <p className="text-[11px] font-mono text-gray-400 mt-1">
                            Accepted formats: .jpg, .jpeg, .png (Max file size: 5MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {fileError ? (
                    <p className="text-[11px] font-mono text-red-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fileError}</span>
                    </p>
                  ) : (
                    <p className="text-[11px] font-mono text-gray-400">
                      Upload a clear screenshot showing successful transaction amount, date, and UTR.
                    </p>
                  )}
                </div>
              </div>

              {/* Error Notification Alert */}
              {submitError && (
                <div className="p-4 rounded-2xl border border-red-500/40 bg-red-500/10 text-red-300 flex items-start gap-3 text-xs font-mono animate-fade-in">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold block uppercase tracking-wider">Registration Error</span>
                    <p className="text-white/80">{submitError}</p>
                  </div>
                </div>
              )}

              {/* Submit Button Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/15 text-white/60 hover:text-white hover:bg-white/5 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                >
                  Clear Form
                </button>

                <button
                  type="submit"
                  disabled={!formData.stream || !formData.utrNumber || formData.utrNumber.length !== 12 || !paymentScreenshot || submitting}
                  className="w-full sm:w-auto px-10 py-4 rounded-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 text-black animate-spin" />
                      <span>Submitting Registration...</span>
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 text-black" />
                      <span>Submit Registration (₹300)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
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
            <p className="text-sm text-gray-300 max-w-lg mx-auto mb-4 font-sans">
              Thank you for registering squad <strong className="text-white">{formData.teamName}</strong> for <strong className="text-amber-400">INNOVERSE 3.0</strong>! Your response and payment verification details have been recorded.
            </p>
            {formData.utrNumber && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 font-mono text-xs mb-8">
                <span>UTR Reference: <strong>{formData.utrNumber}</strong></span>
              </div>
            )}

            <div className="mb-8">
              <BoardingPass
                teamName={formData.teamName}
                leaderName={formData.leaderName}
                leaderEmail={formData.leaderEmail}
                leaderContact={formData.leaderContact}
                institutionName={formData.institutionName}
                collegeAddress={formData.collegeAddress}
                member1Name={formData.member1Name}
                member2Name={formData.member2Name}
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
              {onSwitchToLogin ? (
                <button
                  type="button"
                  onClick={() => onSwitchToLogin(formData.leaderEmail, confirmationId)}
                  className="px-6 py-2.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 text-emerald-300 font-mono text-xs uppercase tracking-wider hover:bg-emerald-500/20 transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Go to Squad Login</span>
                </button>
              ) : (
                <a
                  href="/login.html"
                  className="px-6 py-2.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 text-emerald-300 font-mono text-xs uppercase tracking-wider hover:bg-emerald-500/20 transition-colors inline-flex items-center gap-2"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Squad Login</span>
                </a>
              )}
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
    </>
  );

  if (embedded) {
    return formContent;
  }

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

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="/login.html"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white/85 hover:text-white transition-all text-xs font-mono uppercase tracking-wider"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-400" />
              <span>Squad Login</span>
            </a>

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
        </div>

        {formContent}
      </div>
    </div>
  );
}
