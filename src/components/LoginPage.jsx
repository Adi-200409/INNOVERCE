import React, { useState } from 'react';
import {
  ArrowLeft,
  KeyRound,
  LogIn,
  LogOut,
  Mail,
  Users,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Rocket,
  Phone,
  MapPin
} from 'lucide-react';
import BoardingPass from './BoardingPass';
import RegistrationPage from './RegistrationPage';

const SESSION_KEY = 'innoverce_squad_session';
const LOCAL_REGISTRATIONS_KEY = 'innoverce_local_registrations';
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

function findLocalRegistration(email, confirmationId) {
  try {
    const records = JSON.parse(localStorage.getItem(LOCAL_REGISTRATIONS_KEY) || '[]');
    return (
      records.find(
        (r) =>
          (r.leader_email || '').trim().toLowerCase() === email.toLowerCase() &&
          (r.confirmation_id || '').trim().toUpperCase() === confirmationId.toUpperCase()
      ) || null
    );
  } catch {
    return null;
  }
}

function readStoredSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getInitialTab() {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') === 'register' ? 'register' : 'login';
  } catch {
    return 'login';
  }
}

export default function LoginPage({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [leaderEmail, setLeaderEmail] = useState('');
  const [confirmationId, setConfirmationId] = useState('');
  const [squad, setSquad] = useState(readStoredSession);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const email = leaderEmail.trim();
    const passId = confirmationId.trim().toUpperCase();
    if (!email || !passId) {
      setError('Please enter both your Team Leader Email and Confirmation ID.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leaderEmail: email, confirmationId: passId })
      });

      const payload = await response.json().catch(() => null);
      if (payload && typeof payload.success === 'boolean') {
        if (!response.ok || !payload.success || !payload.data) {
          setError(payload.message || 'Invalid Leader Email or Confirmation ID.');
          return;
        }
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload.data));
        setSquad(payload.data);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const localMatch = findLocalRegistration(email, passId);
      if (!localMatch) {
        setError('No squad found matching that Leader Email and Confirmation ID.');
        return;
      }
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(localMatch));
      setSquad(localMatch);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      const localMatch = findLocalRegistration(email, passId);
      if (localMatch) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(localMatch));
        setSquad(localMatch);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setError('Unable to connect to the mission server. Ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSquad(null);
    setConfirmationId('');
    setError('');
    setActiveTab('login');
  };

  const handleSwitchToLogin = (email = '', passId = '') => {
    if (email) setLeaderEmail(email);
    if (passId) setConfirmationId(passId);
    setError('');
    setActiveTab('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPaid = squad?.payment_status === 'PAID';

  return (
    <div className="relative min-h-screen w-full bg-[#060608] text-white selection:bg-amber-400 selection:text-black py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Ambience */}
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full z-0" />
      <div className="pointer-events-none fixed top-1/2 -right-40 w-[600px] h-[600px] bg-blue-600/10 blur-[170px] rounded-full z-0" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10">
          <button
            onClick={onBackToHome || (() => { window.location.href = '/'; })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all text-xs font-mono uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          {/* Segmented Auth Mode Switcher (Login / Register) */}
          {!squad && (
            <div
              role="tablist"
              aria-label="Squad portal navigation"
              className="inline-flex items-center p-1 rounded-full border border-white/15 bg-[#0a0a0e]/95 backdrop-blur-xl shadow-lg"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'login'}
                onClick={() => setActiveTab('login')}
                className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'register'}
                onClick={() => setActiveTab('register')}
                className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Register</span>
              </button>
            </div>
          )}
        </div>

        {squad ? (
          <div className="space-y-8 animate-fade-in">
            {/* Authenticated Squad Banner */}
            <div className="rounded-3xl border border-emerald-500/30 bg-[#0a0a0e]/95 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-mono text-[11px] uppercase tracking-widest mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>SQUAD AUTHENTICATED</span>
                  </div>
                  <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                    {squad.team_name}
                  </h1>
                  <p className="mt-1 font-mono text-xs text-gray-400">
                    Confirmation ID: <span className="text-amber-300 font-semibold">{squad.confirmation_id}</span> • Stream: <span className="text-white">{squad.stream}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`px-3.5 py-1.5 rounded-full border font-mono text-xs uppercase tracking-wider font-semibold ${
                      isPaid
                        ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300'
                        : 'border-amber-400/40 bg-amber-500/15 text-amber-300'
                    }`}
                  >
                    Payment: {squad.payment_status || 'PENDING'}
                  </span>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-wider text-gray-200 hover:text-white transition-all cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Digital Boarding Pass */}
            <BoardingPass
              teamName={squad.team_name}
              leaderName={squad.leader_name}
              leaderEmail={squad.leader_email}
              leaderContact={squad.leader_contact}
              institutionName={squad.institution_name}
              collegeAddress={squad.college_address}
              member1Name={squad.member1_name}
              member2Name={squad.member2_name}
              stream={squad.stream}
              confirmationId={squad.confirmation_id}
              submitted
            />

            {/* Squad Roster & Institution Summary */}
            <div className="rounded-3xl border border-white/15 bg-[#0a0a0e]/95 p-6 sm:p-8 grid gap-6 sm:grid-cols-2 text-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-400">
                  <Users className="w-4 h-4" />
                  <span>Squad Roster</span>
                </div>
                <div className="space-y-1.5 text-gray-300 font-sans">
                  <p><span className="text-gray-500">Leader:</span> <strong className="text-white">{squad.leader_name}</strong></p>
                  <p><span className="text-gray-500">Member 2:</span> {squad.member1_name}</p>
                  <p><span className="text-gray-500">Member 3:</span> {squad.member2_name}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-400">
                  <MapPin className="w-4 h-4" />
                  <span>Contact &amp; Institution</span>
                </div>
                <div className="space-y-1.5 text-gray-300 font-sans">
                  <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-gray-500" /> {squad.leader_email}</p>
                  <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-gray-500" /> {squad.leader_contact}</p>
                  <p><span className="text-gray-500">College:</span> {squad.institution_name}</p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'register' ? (
          <RegistrationPage
            embedded
            onBackToHome={onBackToHome}
            onSwitchToLogin={handleSwitchToLogin}
          />
        ) : (
          <div className="max-w-xl mx-auto rounded-3xl border border-white/15 bg-[#0a0a0e]/95 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/[0.08] rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 font-mono text-[11px] uppercase tracking-widest mb-4">
              <KeyRound className="w-3.5 h-3.5" />
              <span>SQUAD PORTAL LOGIN</span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              Access Your{' '}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Boarding Pass
              </span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 font-sans">
              Sign in with your registered Team Leader email and Confirmation ID (<span className="font-mono text-amber-300">INN-3.0-XXXXXX</span>) to check status and download your pass.
            </p>

            {error && (
              <div
                role="alert"
                className="mt-6 flex items-start gap-2.5 rounded-xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-xs sm:text-sm text-red-200"
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="login-leader-email"
                  className="block font-mono text-xs uppercase tracking-wider text-gray-300 mb-2"
                >
                  Team Leader Email <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="login-leader-email"
                    type="email"
                    required
                    value={leaderEmail}
                    onChange={(e) => setLeaderEmail(e.target.value)}
                    placeholder="leader@college.edu"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white placeholder:text-gray-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="login-confirmation-id"
                  className="block font-mono text-xs uppercase tracking-wider text-gray-300 mb-2"
                >
                  Confirmation ID <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="login-confirmation-id"
                    type="text"
                    required
                    value={confirmationId}
                    onChange={(e) => setConfirmationId(e.target.value.toUpperCase())}
                    placeholder="INN-3.0-XXXXXX"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none font-mono text-sm uppercase tracking-wider text-white placeholder:text-gray-600 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed text-black font-mono text-xs sm:text-sm uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.65)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Squad...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Squad Portal</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/10 text-center text-xs text-gray-400 font-sans">
              Haven&apos;t registered your 3-member squad yet?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 cursor-pointer"
              >
                Register here
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
