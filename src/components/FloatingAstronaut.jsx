import React, { useState, useEffect } from 'react';
import Astronaut3DCanvas from './Astronaut3DCanvas';

export default function FloatingAstronaut() {
  const [thrusterActive, setThrusterActive] = useState(false);

  // Periodic subtle RCS thruster burst every 9 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setThrusterActive(true);
      setTimeout(() => setThrusterActive(false), 950);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-6 sm:top-8 md:top-10 right-[14%] sm:right-[17%] md:right-[20%] lg:right-[22%] z-20 pointer-events-none select-none">
      <div className="relative flex items-center pointer-events-none">
        {/* Ambient 3D Astronaut Container */}
        <div className="relative pointer-events-none">
          {/* Subtle Ambient Cosmic Glow Halo */}
          <div
            className={`absolute inset-0 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
              thrusterActive
                ? 'bg-gradient-to-tr from-cyan-500/35 via-amber-400/35 to-amber-200/25 scale-125'
                : 'bg-amber-400/15 scale-100'
            }`}
          />

          {/* Three.js 3D WebGL Canvas */}
          <div className="w-40 h-52 sm:w-56 sm:h-64 md:w-64 md:h-76 lg:w-72 lg:h-84 xl:w-80 xl:h-92 pointer-events-none">
            <Astronaut3DCanvas
              thrusterActive={thrusterActive}
              className="w-full h-full pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
