import React, { useState, Suspense } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineScene({ sceneUrl = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" }) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-fuchsia-500/20 border-b-fuchsia-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
          <span className="font-mono text-xs text-white/50 tracking-widest uppercase">INITIALIZING SPLINE 3D STREAM...</span>
        </div>
      )}

      {/* Spline 3D Canvas */}
      {!hasError ? (
        <Spline
          scene={sceneUrl}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className="w-full h-full"
        />
      ) : (
        /* Fallback 3D fluid cyber gradient in case spline model network is blocked */
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black">
          <div className="w-96 h-96 rounded-full bg-gradient-to-tr from-fuchsia-600/30 to-purple-600/20 blur-3xl animate-pulse" />
          <p className="mt-4 font-mono text-xs text-white/40 tracking-wider">SPLINE 3D MESH LAYER ACTIVE</p>
        </div>
      )}
    </div>
  );
}
