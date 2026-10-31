import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FastForward, Radio } from 'lucide-react';

/**
 * CosmicWarpTransition (AAA Cinema Studio Edition)
 * Photorealistic Relativistic Hyperspace Jump & Orbital Horizon Gate:
 * - 2,200 Precision Relativistic Warp Streaks with spectral gradient line heads & tails
 * - Dual-axis Gaussian Anamorphic Optical Laser Flare (Zero polygon seams / zero rectangular bounds)
 * - Concentric Luminous Dimensional Chrono-Rings pulsing along the transit corridor
 * - Procedural Circular Stardust Particle Motes with smooth Gaussian alpha falloff
 * - Minimalist High-End Hackathon HUD Capsule
 * - High-speed dynamic pacing (1.5s total) with instant click or keypress bypass
 * - 100% Procedural GPU WebGL (Zero external 3D model bloat, silky 60-120 FPS)
 */
export default function CosmicWarpTransition({ onComplete }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const statusRef = useRef(null);
  const subStatusRef = useRef(null);
  const progressBarRef = useRef(null);
  const bloomRef = useRef(null);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const isFinishedRef = useRef(false);

  // Instant skip on click or key
  const handleSkip = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;

    if (bloomRef.current) {
      bloomRef.current.style.opacity = '1';
    }
    setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 80);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Camera, High-Performance WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2500);
    camera.position.set(0, 0, 16);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
    } catch (e) {
      console.warn('WebGL init fallback in CosmicWarpTransition:', e);
      handleSkip();
      return;
    }

    // 2. High-Precision Procedural Texture Generators
    // A. Perfectly smooth Circular Gaussian Stardust Particle Texture
    function createSmoothCircularParticleTexture() {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.25, 'rgba(254, 243, 199, 0.9)');
      grad.addColorStop(0.6, 'rgba(245, 158, 11, 0.35)');
      grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    }

    // B. Dual-Axis Gaussian Anamorphic Optical Laser Flare
    // Mathematically guarantees 0 alpha at all 4 rectangular boundaries
    function createSeamlessAnamorphicFlareTexture() {
      const c = document.createElement('canvas');
      const w = 512;
      const h = 128;
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');

      // Horizontal spectral band
      const hGrad = ctx.createLinearGradient(0, 0, w, 0);
      hGrad.addColorStop(0.0, 'rgba(56, 189, 248, 0.0)');
      hGrad.addColorStop(0.25, 'rgba(56, 189, 248, 0.4)');
      hGrad.addColorStop(0.44, 'rgba(254, 243, 199, 0.85)');
      hGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
      hGrad.addColorStop(0.56, 'rgba(254, 243, 199, 0.85)');
      hGrad.addColorStop(0.75, 'rgba(245, 158, 11, 0.4)');
      hGrad.addColorStop(1.0, 'rgba(245, 158, 11, 0.0)');
      ctx.fillStyle = hGrad;
      ctx.fillRect(0, 0, w, h);

      // Vertical Gaussian envelope mask (multiplication)
      ctx.globalCompositeOperation = 'destination-in';
      const vGrad = ctx.createLinearGradient(0, 0, 0, h);
      vGrad.addColorStop(0.0, 'rgba(0, 0, 0, 0.0)');
      vGrad.addColorStop(0.35, 'rgba(0, 0, 0, 0.7)');
      vGrad.addColorStop(0.5, 'rgba(0, 0, 0, 1.0)');
      vGrad.addColorStop(0.65, 'rgba(0, 0, 0, 0.7)');
      vGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
      ctx.fillStyle = vGrad;
      ctx.fillRect(0, 0, w, h);

      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    }

    const particleTex = createSmoothCircularParticleTexture();
    const flareTex = createSeamlessAnamorphicFlareTexture();

    // 3. Central Quantum Singularity / Core Flare
    const coreMat = new THREE.SpriteMaterial({
      map: particleTex,
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.95
    });
    const coreSprite = new THREE.Sprite(coreMat);
    coreSprite.scale.set(7, 7, 1);
    scene.add(coreSprite);

    // Anamorphic Horizontal Laser Beam
    const beamGeo = new THREE.PlaneGeometry(42, 2.8);
    const beamMat = new THREE.MeshBasicMaterial({
      map: flareTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
      opacity: 0.85
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    scene.add(beamMesh);

    // 4. Concentric Dimensional Chrono-Rings (Warp Horizons)
    const RING_COUNT = 6;
    const rings = [];
    const ringGeo = new THREE.RingGeometry(2.6, 2.78, 64);
    for (let i = 0; i < RING_COUNT; i++) {
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x38bdf8 : 0xfbbf24,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = -25 - i * 35;
      scene.add(ring);
      rings.push({
        mesh: ring,
        baseZ: -25 - i * 35,
        speed: 1.6 + i * 0.35
      });
    }

    // 5. 2,200 Relativistic Hyperspace Star Streaks (LineSegments)
    const STAR_COUNT = 2200;
    const warpGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(STAR_COUNT * 6); // 2 vertices per line = 6 floats
    const colors = new Float32Array(STAR_COUNT * 6);

    const starData = [];
    const colorWhite = new THREE.Color(0xffffff);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorAmber = new THREE.Color(0xfbbf24);
    const colorIndigo = new THREE.Color(0x818cf8);

    for (let i = 0; i < STAR_COUNT; i++) {
      // Cylindrical distribution with clear focal corridor in center
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.2 + Math.pow(Math.random(), 1.5) * 48;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = -650 + Math.random() * 670;

      const speed = 2.4 + Math.random() * 3.2;
      const length = 2.8 + Math.random() * 4.6;

      // Color distribution
      const rPick = Math.random();
      let c;
      if (rPick < 0.4) c = colorWhite;
      else if (rPick < 0.7) c = colorCyan;
      else if (rPick < 0.92) c = colorAmber;
      else c = colorIndigo;

      starData.push({ x, y, z, angle, radius, speed, length, color: c });

      const idx = i * 6;
      // Leading Head
      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;
      colors[idx] = c.r;
      colors[idx + 1] = c.g;
      colors[idx + 2] = c.b;

      // Tapered Trailing Tail
      positions[idx + 3] = x;
      positions[idx + 4] = y;
      positions[idx + 5] = z - length;
      colors[idx + 3] = c.r * 0.22;
      colors[idx + 4] = c.g * 0.22;
      colors[idx + 5] = c.b * 0.22;
    }

    warpGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    warpGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const warpMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const warpLines = new THREE.LineSegments(warpGeo, warpMat);
    scene.add(warpLines);

    // 6. Floating Cosmic Stardust Motes (Smooth circular particles with soft Gaussian alpha)
    const MOTE_COUNT = 160;
    const moteGeo = new THREE.BufferGeometry();
    const motePos = new Float32Array(MOTE_COUNT * 3);
    const motes = [];

    for (let i = 0; i < MOTE_COUNT; i++) {
      const mx = (Math.random() - 0.5) * 44;
      const my = (Math.random() - 0.5) * 36;
      const mz = -160 + Math.random() * 190;
      motes.push({ x: mx, y: my, z: mz, speed: 0.8 + Math.random() * 1.8 });

      motePos[i * 3] = mx;
      motePos[i * 3 + 1] = my;
      motePos[i * 3 + 2] = mz;
    }
    moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));

    const moteMat = new THREE.PointsMaterial({
      size: 4.5,
      map: particleTex,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const motePoints = new THREE.Points(moteGeo, moteMat);
    scene.add(motePoints);

    // 7. Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    // Duration: 1.5 seconds (Crisp, thrilling, seamless)
    const DURATION_MS = 1500;
    const startTime = performance.now();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedMs = performance.now() - startTime;
      const progress = Math.min(elapsedMs / DURATION_MS, 1.0);

      let speedMult = 1.0;
      let streakLengthMult = 1.0;

      if (progress < 0.22) {
        // Stage 1: Spooling & Vector Lock
        const p = progress / 0.22;
        speedMult = 1.0 + p * 3.5;
        streakLengthMult = 1.0 + p * 2.8;

        coreSprite.scale.set(7 + p * 4, 7 + p * 4, 1);
        beamMesh.scale.set(1 + p * 0.4, 1 + p * 0.15, 1);
        beamMat.opacity = 0.6 + p * 0.3;

        if (statusRef.current) statusRef.current.textContent = 'HYPER-DRIVE SPOOLING • VECTOR LOCK';
        if (subStatusRef.current) subStatusRef.current.textContent = 'SYNCHRONIZING CELESTIAL COORDINATES';
      } else if (progress < 0.84) {
        // Stage 2: Full Hyperspace Relativistic Jump
        const p = (progress - 0.22) / 0.62;
        const easeP = Math.pow(p, 2.2);

        speedMult = 4.5 + easeP * 36.0;
        streakLengthMult = 3.8 + easeP * 26.0;

        // Subtle camera inertia tilt
        camera.position.x = (Math.random() - 0.5) * 0.08 * easeP;
        camera.position.y = (Math.random() - 0.5) * 0.08 * easeP;
        camera.fov = 75 + easeP * 16;
        camera.updateProjectionMatrix();

        beamMesh.scale.set(1.4 + easeP * 3.2, 1.1 + easeP * 1.5, 1);
        beamMat.opacity = 0.85 + easeP * 0.15;
        coreSprite.scale.set(11 + easeP * 14, 11 + easeP * 14, 1);

        if (statusRef.current) statusRef.current.textContent = 'WARP SPEED REACHED // LIGHTSPEED BURST';
        if (subStatusRef.current) subStatusRef.current.textContent = 'TRAVERSING INTERSTELLAR CORRIDOR';
      } else {
        // Stage 3: Decoupling & Iris Out into Earth Orbit
        const p = (progress - 0.84) / 0.16;
        const easeP = p * p;

        speedMult = 40.0 * (1 - easeP * 0.6);
        streakLengthMult = 30.0 * (1 - easeP * 0.5);

        // Warm celestial bloom smoothly dissolves in
        if (bloomRef.current) {
          bloomRef.current.style.opacity = String(p * 0.95);
        }

        if (statusRef.current) statusRef.current.textContent = 'DROPPING OUT OF HYPERSPACE • INNOVERSE ORBIT';
        if (subStatusRef.current) subStatusRef.current.textContent = 'APPROACH CONFIRMED • WELCOME ABOARD';
      }

      // Update progress bar
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.round(progress * 100)}%`;
      }

      // Update Hyperspace Streaks
      const posArr = warpGeo.attributes.position.array;
      const isIrisDiverging = progress > 0.84;
      const irisSpread = isIrisDiverging ? (progress - 0.84) * 9.0 : 0;

      for (let i = 0; i < STAR_COUNT; i++) {
        const star = starData[i];
        star.z += star.speed * speedMult * 0.42;

        // Open cosmic iris outwards as we approach arrival
        if (isIrisDiverging) {
          star.radius += irisSpread * 0.45;
          star.x = Math.cos(star.angle) * star.radius;
          star.y = Math.sin(star.angle) * star.radius;
        }

        if (star.z > 25) {
          star.z = -600 - Math.random() * 50;
        }

        const idx = i * 6;
        posArr[idx] = star.x;
        posArr[idx + 1] = star.y;
        posArr[idx + 2] = star.z;

        posArr[idx + 3] = star.x;
        posArr[idx + 4] = star.y;
        posArr[idx + 5] = star.z - star.length * streakLengthMult;
      }
      warpGeo.attributes.position.needsUpdate = true;

      // Update Chrono-Rings
      rings.forEach((r) => {
        r.mesh.position.z += r.speed * (1.0 + speedMult * 0.2);
        r.mesh.scale.setScalar(1.0 + Math.max(0, (r.mesh.position.z + 80) / 35));

        if (r.mesh.position.z > 20) {
          r.mesh.position.z = -220 - Math.random() * 30;
          r.mesh.scale.setScalar(1);
        }
      });

      // Update Stardust Motes
      const mPos = moteGeo.attributes.position.array;
      for (let i = 0; i < MOTE_COUNT; i++) {
        const m = motes[i];
        m.z += m.speed * (1.0 + speedMult * 0.16);
        if (m.z > 20) m.z = -160;
        mPos[i * 3 + 2] = m.z;
      }
      moteGeo.attributes.position.needsUpdate = true;

      // Render Three.js Scene
      renderer.render(scene, camera);

      // Check Completion
      if (progress >= 1.0 && !isFinishedRef.current) {
        isFinishedRef.current = true;
        cancelAnimationFrame(animId);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    };

    animId = requestAnimationFrame(animate);

    // Clean disposal
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);

      particleTex.dispose();
      flareTex.dispose();
      coreMat.dispose();
      beamGeo.dispose();
      beamMat.dispose();
      ringGeo.dispose();
      rings.forEach((r) => r.mesh.material.dispose());
      warpGeo.dispose();
      warpMat.dispose();
      moteGeo.dispose();
      moteMat.dispose();

      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[95] w-full h-full bg-[#050508] select-none overflow-hidden cursor-pointer"
      title="Click anywhere to skip transition"
    >
      {/* Three.js 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Modern High-End Telemetry HUD */}
      <div className="absolute inset-0 z-10 pointer-events-none p-6 sm:p-10 flex flex-col justify-between font-mono">
        {/* Top Navigation Capsule */}
        <div className="flex items-center justify-between text-xs tracking-widest uppercase">
          <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-white font-medium">INNOVERSE 3.0 // HYPERSPACE TRANSIT</span>
          </div>

          {/* Minimalist Skip Prompt */}
          <button
            onClick={handleSkip}
            className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-amber-400/15 hover:border-amber-400/40 text-white/70 hover:text-amber-300 transition-all text-[11px] cursor-pointer active:scale-95 shadow-lg backdrop-blur-md"
          >
            <span>SKIP TRANSIT</span>
            <FastForward className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

        {/* Center Futuristic Aiming Reticle (Hairline & Clean) */}
        <div className="relative mx-auto my-auto flex flex-col items-center justify-center opacity-30 pointer-events-none">
          <div className="relative w-28 h-28 border border-white/20 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '14s' }}>
            <div className="absolute w-36 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            <div className="absolute h-36 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent" />
          </div>
        </div>

        {/* Bottom Minimalist Status Capsule */}
        <div className="flex flex-col items-center justify-center gap-2 max-w-lg mx-auto w-full">
          <div className="w-full bg-black/65 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span
                  ref={statusRef}
                  className="font-bold text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400 tracking-wider"
                >
                  HYPER-DRIVE SPOOLING • VECTOR LOCK
                </span>
              </div>

              {/* Animated Audio/Waveform Indicator */}
              <div className="flex items-center gap-1">
                <span className="w-0.5 h-3 bg-amber-400 animate-pulse" style={{ animationDelay: '0ms' }} />
                <span className="w-0.5 h-4 bg-amber-400 animate-pulse" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 h-2 bg-amber-400 animate-pulse" style={{ animationDelay: '300ms' }} />
                <span className="w-0.5 h-5 bg-amber-400 animate-pulse" style={{ animationDelay: '100ms' }} />
                <span className="w-0.5 h-3 bg-amber-400 animate-pulse" style={{ animationDelay: '250ms' }} />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-white/50 tracking-wider mb-2 font-mono">
              <span ref={subStatusRef}>SYNCHRONIZING CELESTIAL COORDINATES</span>
              <span className="text-amber-400">VELOCITY: C-MAX</span>
            </div>

            {/* Hairline Laser Progress Line */}
            <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 bottom-0 w-0 bg-gradient-to-r from-amber-400 via-amber-300 to-white shadow-[0_0_10px_#f59e0b] transition-all duration-75"
              />
            </div>
          </div>

          <span className="text-[10px] text-white/30 tracking-widest uppercase">
            CLICK ANYWHERE OR PRESS [SPACE] TO ENTER DIRECTLY
          </span>
        </div>
      </div>

      {/* Soft Celestial Starlight Bloom Overlay (Luxurious, not blinding) */}
      <div
        ref={bloomRef}
        className="absolute inset-0 z-20 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.92) 0%, rgba(254,243,199,0.5) 45%, rgba(6,6,8,0) 80%)'
        }}
      />
    </div>
  );
}
