import React, { useState } from 'react';
import {
  Rocket,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';
import { authenticateUser } from '../utils/authSession';

export default function AuthGate({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isSignup = mode === 'signup';

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim();
    const cleanName = name.trim();
    if (isSignup && !cleanName) {
      setError('Please enter your full name.');
      return;
    }
    if (!cleanEmail || !password) {
      setError('Please enter your email and password.');
      return;
    }
    if (isSignup && password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const result = await authenticateUser(mode, {
        name: cleanName,
        email: cleanEmail,
        password
      });
      if (result.error) {
        setError(result.error);
        return;
      }
      onAuthenticated(result.user);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestContinue = () => {
    onAuthenticated({ name: 'Guest', email: '', guest: true });
  };

  return (
    <div className="relative z-30 min-h-screen w-full flex flex-col items-center px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
      <div className="w-full max-w-md my-auto">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/70 backdrop-blur-md font-mono text-[11px] uppercase tracking-widest text-amber-300 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
            <span>KLS GIT Belagavi • INNOVERSE 3.0</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-white">
            {isSignup ? 'Create ' : 'Welcome '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              {isSignup ? 'Account' : 'Explorer'}
            </span>
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-gray-400 font-sans">
            {isSignup
              ? 'Sign up to enter the INNOVERSE 3.0 hackathon portal.'
              : 'Log in or sign up to access the INNOVERSE 3.0 hackathon portal.'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-3xl border border-white/15 bg-[#0a0a0e]/95 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.85)] relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 bg-amber-500/[0.08] rounded-full blur-3xl" />

          {/* Login / Sign Up Tabs */}
          <div
            role="tablist"
            aria-label="Account authentication mode"
            className="grid grid-cols-2 p-1 rounded-full border border-white/10 bg-white/[0.03] mb-6"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isSignup}
              onClick={() => switchMode('login')}
              className={`inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                !isSignup
                  ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isSignup}
              onClick={() => switchMode('signup')}
              className={`inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                isSignup
                  ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-xs sm:text-sm text-red-200"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label
                  htmlFor="auth-name"
                  className="block font-mono text-xs uppercase tracking-wider text-gray-300 mb-1.5"
                >
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="auth-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white placeholder:text-gray-600 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="auth-email"
                className="block font-mono text-xs uppercase tracking-wider text-gray-300 mb-1.5"
              >
                Email Address <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@college.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white placeholder:text-gray-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="auth-password"
                className="block font-mono text-xs uppercase tracking-wider text-gray-300 mb-1.5"
              >
                Password <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={isSignup ? 6 : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignup ? 'Minimum 6 characters' : 'Enter your password'}
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white placeholder:text-gray-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed text-black font-mono text-xs sm:text-sm uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.65)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isSignup ? 'Creating Account...' : 'Signing In...'}</span>
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  <span>{isSignup ? 'Sign Up & Enter Portal' : 'Login & Enter Portal'}</span>
                </>
              )}
            </button>
          </form>

          {/* Continue as Guest */}
          <div className="mt-5 pt-5 border-t border-white/10 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleGuestContinue}
              className="w-full px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 text-xs font-mono uppercase tracking-wider text-gray-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue as Guest</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>

            <div className="text-center text-xs text-gray-500 font-sans">
              Already registered a team?{' '}
              <a
                href="/login.html"
                className="text-amber-400 hover:text-amber-300 font-medium underline underline-offset-4"
              >
                Check Squad Boarding Pass
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

