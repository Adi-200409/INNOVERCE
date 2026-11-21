import React from 'react';
import { AlertOctagon, RotateCcw, Home, Terminal } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('INNOVERSE Mission Control Runtime Error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#060608] text-white flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-red-500/30 bg-[#0d0d14] p-6 sm:p-8 shadow-[0_0_50px_rgba(239,68,68,0.25)] text-center">
            <div className="mx-auto mb-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-400 w-fit">
              <AlertOctagon className="w-8 h-8" />
            </div>

            <div className="font-mono text-xs text-red-400 uppercase tracking-widest mb-1">
              SYSTEM CRITICAL // RUNTIME EXCEPTION
            </div>

            <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight">
              Mission Interface Interrupted
            </h2>

            <p className="mt-2 text-sm text-gray-400 leading-relaxed font-sans">
              An unexpected visual runtime error was detected. Mission telemetry data has been preserved.
            </p>

            {this.state.error && (
              <div className="mt-4 p-3 rounded-xl bg-black/60 border border-white/10 text-left font-mono text-[11px] text-red-300 overflow-x-auto max-h-32">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.4)]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reboot Interface</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 font-mono text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
