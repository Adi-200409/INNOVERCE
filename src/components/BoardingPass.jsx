import React from 'react';
import { Download } from 'lucide-react';
import './BoardingPass.css';

function RoverArtwork() {
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      viewBox="0 0 760 310"
      preserveAspectRatio="xMidYMid slice"
      role="img"
    >
      <defs>
        <linearGradient id="rover-sky" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#111d31" />
          <stop offset="55%" stopColor="#263344" />
          <stop offset="100%" stopColor="#10131a" />
        </linearGradient>
        <linearGradient id="rover-body" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#e9c987" />
          <stop offset="100%" stopColor="#9b7541" />
        </linearGradient>
        <linearGradient id="rover-ground" x1="0" x2="1">
          <stop offset="0%" stopColor="#1c2028" />
          <stop offset="50%" stopColor="#34343a" />
          <stop offset="100%" stopColor="#171a21" />
        </linearGradient>
      </defs>

      <rect width="760" height="310" fill="url(#rover-sky)" />
      <g fill="#f3d9a1" opacity=".8">
        <circle cx="92" cy="48" r="2" />
        <circle cx="164" cy="79" r="1.5" />
        <circle cx="646" cy="58" r="2" />
        <circle cx="568" cy="36" r="1.5" />
        <circle cx="705" cy="117" r="1.5" />
      </g>
      <circle cx="644" cy="92" r="42" fill="#d9c99d" opacity=".12" />
      <circle cx="644" cy="92" r="31" fill="#e3d3a9" opacity=".18" />
      <path d="M0 238 Q120 204 235 239 T490 232 T760 224 V310 H0Z" fill="url(#rover-ground)" />
      <path d="M0 262 Q160 239 294 264 T560 249 T760 259" fill="none" stroke="#887b67" strokeOpacity=".35" strokeWidth="2" />

      <g stroke="#c5a96f" strokeWidth="4" fill="none">
        <path d="M361 177 329 218 290 232" />
        <path d="M463 177 493 218 534 232" />
        <path d="M411 177 411 221" />
      </g>

      <g fill="#21364b" stroke="#c7a96c" strokeWidth="3">
        <path d="M199 159h131v40H199z" />
        <path d="M494 159h104v40H494z" />
      </g>
      <g stroke="#62809a" strokeWidth="2">
        <path d="M225 160v38m31-38v38m31-38v38m31-38v38M520 160v38m31-38v38m31-38v38" />
        <path d="M200 178h130m164 0h104" />
      </g>

      <path d="M333 145h164l-13 67H345z" fill="url(#rover-body)" stroke="#f4dda9" strokeWidth="4" />
      <path d="M346 156h53v39h-53zm67 0h67v39h-67z" fill="#4a4841" stroke="#d7bb80" strokeWidth="3" />
      <path d="M354 164h36m-36 8h36m-36 8h36m32-16h49m-49 8h49m-49 8h49" stroke="#bca475" strokeWidth="2" opacity=".7" />
      <path d="M379 143v-37h62v37" fill="none" stroke="#d9c28f" strokeWidth="5" />
      <rect x="389" y="95" width="46" height="29" rx="4" fill="#17283c" stroke="#e2c47f" strokeWidth="4" />
      <circle cx="412" cy="109" r="6" fill="#68c7d8" />
      <path d="M412 94V60m0 0-22 8m22-8 23 10m-45-2v18" stroke="#dfc179" strokeWidth="4" fill="none" />
      <path d="M427 58q22-20 41 0m-48-7q26-25 55-2" stroke="#7ea5c3" strokeWidth="2" fill="none" opacity=".8" />
      <rect x="368" y="131" width="88" height="11" rx="4" fill="#dfc47f" />

      <g fill="#11161d" stroke="#c6a665" strokeWidth="5">
        {[308, 411, 516].map((x) => (
          <g key={x}>
            <circle cx={x} cy="237" r="28" />
            <circle cx={x} cy="237" r="16" fill="#c6a665" />
            <circle cx={x} cy="237" r="7" fill="#17202a" stroke="#e4ca8e" strokeWidth="3" />
          </g>
        ))}
      </g>
      <g stroke="#d5bb7d" strokeWidth="3" opacity=".8">
        <path d="M281 237h-9m63 0h-9m75 0h-9m62 0h-9m76 0h-9m62 0h-9" />
      </g>
    </svg>
  );
}

export default function BoardingPass({
  teamName,
  leaderName,
  leaderEmail,
  institutionName,
  stream,
  confirmationId,
  submitted = false
}) {
  const passNumber = confirmationId || 'INN-3.0-PREVIEW';

  return (
    <section
      aria-label="Digital boarding pass"
      className="boarding-pass-print mx-auto w-full max-w-3xl overflow-hidden rounded-[26px] border border-white/15 bg-[#0d0e11] text-left shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
    >
      <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
            INNOVERSE 3.0 LAUNCH SERVICES
          </p>
          <p className="mt-1 text-sm font-bold text-white">Digital boarding pass</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500">Pass number</p>
          <p className="mt-1 font-mono text-xs text-gray-300">{passNumber}</p>
          <span className={`mt-1 inline-block rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
            submitted
              ? 'border-emerald-400/40 text-emerald-300'
              : 'border-white/30 text-gray-300'
          }`}>
            {submitted ? 'Ready' : 'Draft'}
          </span>
        </div>
      </div>

      <div className="mx-3 mt-3 grid gap-4 rounded-2xl border border-white/15 bg-[#0c1015] p-3 sm:mx-5 sm:p-5 lg:grid-cols-[1.25fr_0.9fr]">
        <div className="relative min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-[#0c1723] sm:min-h-[280px]">
          <RoverArtwork />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
          <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.17em] text-white/80 sm:left-5 sm:top-5 sm:text-[10px]">
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
            Lunar surface · Rover 01
          </div>
          <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-amber-200 sm:text-[10px]">
              Tycho Highlands
            </p>
            <p className="mt-1 font-mono text-[9px] text-white/65">43.3° S · 11.2° W</p>
          </div>
          <div className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full border border-white/35 bg-black/50 font-mono text-[8px] uppercase text-amber-200 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14">
            INNO<br />VERSE
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 self-stretch pt-1">
          <div className="min-w-0 border-b border-white/10 pb-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-gray-500">Passenger</p>
            <p className="mt-1 truncate font-mono text-xs uppercase text-gray-200">{leaderName || 'First name last name'}</p>
            {leaderEmail && <p className="mt-1 truncate text-[10px] text-gray-500">{leaderEmail}</p>}
          </div>
          <div className="min-w-0 border-b border-white/10 pb-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-gray-500">Team</p>
            <p className="mt-1 truncate font-mono text-xs uppercase text-gray-200">{teamName || 'Your team name'}</p>
          </div>
          <div className="min-w-0 border-b border-white/10 pb-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-gray-500">Crew</p>
            <p className="mt-1 font-mono text-xs text-gray-300">3 squad members</p>
          </div>
          <div className="min-w-0 border-b border-white/10 pb-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-gray-500">Track</p>
            <p className="mt-1 truncate font-mono text-xs text-gray-300">{stream || 'BCA / MCA'}</p>
          </div>
          <div className="min-w-0 border-b border-white/10 pb-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-gray-500">Launch site</p>
            <p className="mt-1 truncate font-mono text-xs text-gray-300">{institutionName || 'Your college'}</p>
          </div>
          <div className="min-w-0 border-b border-white/10 pb-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-gray-500">Arrival site</p>
            <p className="mt-1 font-mono text-xs text-gray-300">Event Campus</p>
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-gray-500">Vehicle</p>
            <p className="mt-1 font-mono text-xs text-gray-300">INNOVERSE 3.0</p>
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-gray-500">Departure</p>
            <p className="mt-1 font-mono text-xs text-gray-300">24-hour final round</p>
          </div>
        </div>
      </div>

      <div className="print:hidden flex flex-col items-start justify-between gap-3 border-t border-white/10 p-4 sm:flex-row sm:items-center sm:px-5">
        <p className="text-xs text-gray-500">
          {submitted ? 'Your pass is ready to print or save as PDF.' : 'Your pass preview updates as you fill in your details.'}
        </p>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-amber-300"
        >
          <Download className="h-4 w-4" />
          Download your pass
        </button>
      </div>
    </section>
  );
}
