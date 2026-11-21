import React, { useState, useEffect } from 'react';
import {
  WifiOff,
  RefreshCw,
  X,
  ServerCrash,
  AlertTriangle,
  Terminal,
  ExternalLink,
  CheckCircle2,
  Cpu
} from 'lucide-react';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/+$/, '');

export function triggerServerError({ endpoint = '', message = '' } = {}) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('innoverce-server-error', {
        detail: { endpoint, message }
      })
    );
  }
}

export default function ServerErrorModal({
  isOpen: propIsOpen,
  onClose: propOnClose,
  endpoint: propEndpoint,
  errorMessage: propErrorMessage
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [endpoint, setEndpoint] = useState(propEndpoint || '');
  const [errorMessage, setErrorMessage] = useState(propErrorMessage || '');
  const [isPinging, setIsPinging] = useState(false);
  const [pingSuccess, setPingSuccess] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const isOpen = propIsOpen !== undefined ? propIsOpen : internalOpen;

  useEffect(() => {
    const handleServerErrorEvent = (event) => {
      const detail = event?.detail || {};
      setEndpoint(detail.endpoint || '/api/');
      setErrorMessage(detail.message || 'Unable to establish connection with the INNOVERSE backend server.');
      setPingSuccess(false);
      setInternalOpen(true);
    };

    window.addEventListener('innoverce-server-error', handleServerErrorEvent);
    return () => {
      window.removeEventListener('innoverce-server-error', handleServerErrorEvent);
    };
  }, []);

  useEffect(() => {
    if (propEndpoint) setEndpoint(propEndpoint);
    if (propErrorMessage) setErrorMessage(propErrorMessage);
  }, [propEndpoint, propErrorMessage]);

  const handleClose = () => {
    if (propOnClose) {
      propOnClose();
    }
    setInternalOpen(false);
    setPingSuccess(false);
  };

  const handleRetryPing = async () => {
    setIsPinging(true);
    setPingSuccess(false);

    try {
      // Attempt quick ping to health endpoint
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${API_BASE}/api/health/`, {
        signal: controller.signal
      }).catch((e) => {
        // Also try general stats if health was not mapped yet
        return fetch(`${API_BASE}/api/stats/`, { signal: controller.signal });
      });

      clearTimeout(timeoutId);

      if (res && res.ok) {
        setPingSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 1200);
      } else {
        setPingSuccess(false);
      }
    } catch {
      setPingSuccess(false);
    } finally {
      setIsPinging(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border border-red-500/40 bg-[#0d0d14] p-6 sm:p-8 shadow-[0_0_60px_rgba(239,68,68,0.3)] text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Ambient Cosmic Warning Glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-red-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl" />

        {/* Top Scanning Line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 p-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Telemetry Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-red-400 font-bold">
            MISSION CONTROL // 500 TELEMETRY DOWN
          </span>
        </div>

        {/* Main Icon & Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3.5 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 shrink-0 shadow-[0_0_20px_rgba(239,68,68,0.25)]">
            <WifiOff className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight">
              Backend Server Not Responding
            </h3>
            <p className="font-mono text-xs text-red-300/90 mt-1">
              Gateway connection offline or unreachable
            </p>
          </div>
        </div>

        {/* Explanation Card */}
        <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] mb-5 space-y-2 text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
          <p>
            The application is unable to reach the INNOVERSE backend at{' '}
            <code className="text-amber-300 font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">
              {API_BASE}
            </code>
            .
          </p>
          <p className="text-gray-400 text-xs">
            {errorMessage || 'Requests are timing out or connection was refused. Live registration, team lookups, and boarding passes require an active server.'}
          </p>
        </div>

        {/* Quick Diagnostics Strip */}
        <div className="mb-5 p-3 rounded-xl border border-white/10 bg-[#09090e] font-mono text-[11px] space-y-1.5">
          <div className="flex items-center justify-between text-gray-400">
            <span>TARGET HOST:</span>
            <span className="text-amber-400 truncate max-w-[200px]">{API_BASE}</span>
          </div>
          <div className="flex items-center justify-between text-gray-400">
            <span>ENDPOINT:</span>
            <span className="text-white truncate max-w-[200px]">{endpoint || '/api/*'}</span>
          </div>
          <div className="flex items-center justify-between text-gray-400">
            <span>SERVER COMMAND:</span>
            <span className="text-emerald-400">python backend/manage.py runserver</span>
          </div>
        </div>

        {/* Success Banner if reconnected */}
        {pingSuccess && (
          <div className="mb-4 flex items-center gap-2 p-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-mono text-xs animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Connection restored! Backend server is back online.</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            disabled={isPinging}
            onClick={handleRetryPing}
            className={`w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              pingSuccess
                ? 'bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                : 'bg-amber-400 text-black hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
            <span>{isPinging ? 'Pinging Server...' : pingSuccess ? 'Connected!' : 'Retry Connection'}</span>
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/15 bg-white/5 font-mono text-xs uppercase tracking-wider text-gray-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-center"
          >
            Continue in Offline Mode
          </button>
        </div>
      </div>
    </div>
  );
}
