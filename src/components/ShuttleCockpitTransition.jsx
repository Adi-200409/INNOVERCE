import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FastForward, Radio, Crosshair, Radar, Compass } from 'lucide-react';
import { preloadShuttleModel, getCachedShuttleModel } from '../utils/shuttleLoader';

/**
 * ShuttleCockpitTransition (AAA Cinematic Edition)
 * Sequential Storyboard:
 * 1. Scene 1 (Exterior 3D Flight): The real Nexus-1 Space Shuttle from the hero section
 *    flies into the frame from deep space, banking toward the camera with active tri-plasma fire thrusters.
 * 2. Scene 2 (Cockpit POV Scanner): Camera transitions into the cockpit canopy looking out into space.
 *    The holographic HUD performs an orbital search, sweeps radar, tracks coordinates,
 *    and locks onto INNOVERSE 2026 (15.82° N, 74.48° E).
 * 3. Scene 3 (Flash & Handoff): Target lock detonates a brilliant optical starlight flash,
 *    smoothly dissolving to reveal the main website with the rotating Earth and hero UI.
 */
export default function ShuttleCockpitTransition({ onComplete }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [phase, setPhase] = useState('exterior'); // 'exterior' | 'cockpit' | 'flash'
  const [scanStatus, setScanStatus] = useState('SEARCHING ORBITAL SECTOR // ANALYZING FREQUENCIES...');
  const [scanSubStatus, setScanSubStatus] = useState('CARRIER SCAN: ACTIVE • 1420.405 MHz');
  const [radarAngle, setRadarAngle] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [flashOpacity, setFlashOpacity] = useState(0);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const isFinishedRef = useRef(false);

  // Fast skip helper
  const handleSkip = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    setFlashOpacity(1);
    setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 120);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Radar continuous rotation
  useEffect(() => {
    if (phase !== 'cockpit') return;
    const interval = setInterval(() => {
      setRadarAngle((prev) => (prev + 4) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, [phase]);

  // =========================================================================
  // SCENE 1: 3D EXTERIOR SPACE SHUTTLE APPROACH (Using Hero's exact 3D shuttle)
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(54, width / height, 0.1, 1000);
    camera.position.set(0, 0.6, 12);

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
      renderer.toneMappingExposure = 1.4;
    } catch (e) {
      console.warn('WebGL init fallback in ShuttleCockpitTransition:', e);
      handleSkip();
      return;
    }

    // Circular Particle Texture Generator
    function createCircleTexture() {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.3, 'rgba(224, 242, 254, 0.8)');
      grad.addColorStop(0.6, 'rgba(56, 189, 248, 0.3)');
      grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    }
    const starTex = createCircleTexture();

    // Deep Space Starfield
    const STAR_COUNT = 1600;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(STAR_COUNT * 3);
    const starColors = new Float32Array(STAR_COUNT * 3);

    for (let i = 0; i < STAR_COUNT; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 160;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 2] = -180 + Math.random() * 200;

      const c = Math.random() > 0.35 ? 0.95 : 0.65;
      starColors[i * 3] = c;
      starColors[i * 3 + 1] = c;
      starColors[i * 3 + 2] = c + 0.1;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.2,
      map: starTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Cosmic Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 3.0);
    sunLight.position.set(12, 10, 8);
    scene.add(sunLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 3.5, 35);
    rimLight.position.set(-6, -2, 5);
    scene.add(rimLight);

    // Shuttle Master Container
    const shipGroup = new THREE.Group();
    scene.add(shipGroup);

    // Construct Tri-Plasma Fire Thrusters (matching Hero Section)
    const thrusterCones = [];
    const createThruster = (x, y, z) => {
      const g = new THREE.Group();
      g.position.set(x, y, z);

      // Core Yellow Incandescent Flame
      const coreGeo = new THREE.ConeGeometry(0.05, 0.7, 16, 1, true);
      coreGeo.translate(0, 0.35, 0);
      coreGeo.rotateX(-Math.PI / 2);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xfff066,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      g.add(core);

      // Mid Orange Burning Jet
      const midGeo = new THREE.ConeGeometry(0.09, 1.1, 16, 1, true);
      midGeo.translate(0, 0.55, 0);
      midGeo.rotateX(-Math.PI / 2);
      const midMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });
      const mid = new THREE.Mesh(midGeo, midMat);
      g.add(mid);

      // Outer Red Combustion Envelope
      const outGeo = new THREE.ConeGeometry(0.14, 1.5, 16, 1, true);
      outGeo.translate(0, 0.75, 0);
      outGeo.rotateX(-Math.PI / 2);
      const outMat = new THREE.MeshBasicMaterial({
        color: 0xef4444,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });
      const outMesh = new THREE.Mesh(outGeo, outMat);
      g.add(outMesh);

      shipGroup.add(g);
      thrusterCones.push({ core, mid, outMesh });
    };

    // Attach 3 SSME Thrusters: Top center, bottom-left, bottom-right
    createThruster(0, 0.3, -2.15);
    createThruster(-0.46, -0.16, -2.15);
    createThruster(0.46, -0.16, -2.15);

    // Load the exact same 3D Space Shuttle model from Hero Section
    const cached = getCachedShuttleModel();
    if (cached) {
      shipGroup.add(cached.clone(true));
    } else {
      preloadShuttleModel().then((obj) => {
        if (obj) shipGroup.add(obj.clone(true));
      });
    }

    // Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Exterior Animation Timeline (1.8s)
    const EXTERIOR_DURATION = 1800;
    const startTime = performance.now();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / EXTERIOR_DURATION, 1.0);

      // Shuttle flies in along a prominent, dramatic vector:
      // Starts close enough to be clearly visible (x = -4.5, y = 1.4, z = -14)
      // Arrives close up (x = 0, y = 0.1, z = 7.5), sweeping right into camera!
      const easeP = Math.pow(progress, 1.6);
      const shipX = -4.5 * (1 - easeP) + 0.0 * easeP;
      const shipY = 1.4 * (1 - easeP) + 0.1 * easeP;
      const shipZ = -14.0 * (1 - easeP) + 7.5 * easeP;

      shipGroup.position.set(shipX, shipY, shipZ);

      // Aerodynamic banking roll
      shipGroup.rotation.y = (1 - easeP) * 0.45;
      shipGroup.rotation.z = (1 - easeP) * 0.32;
      shipGroup.rotation.x = 0.1 * (1 - easeP);

      // Animate SSME rocket flames
      const flicker = 1.0 + Math.sin(elapsed * 0.05) * 0.15;
      thrusterCones.forEach((t) => {
        t.core.scale.set(flicker, flicker, flicker * (1.2 + progress * 0.6));
        t.mid.scale.set(flicker, flicker, flicker * (1.1 + progress * 0.5));
      });

      // Stream stars past camera
      const pos = starGeo.attributes.position.array;
      for (let i = 0; i < STAR_COUNT; i++) {
        pos[i * 3 + 2] += (0.8 + progress * 3.2);
        if (pos[i * 3 + 2] > 20) {
          pos[i * 3 + 2] = -180;
        }
      }
      starGeo.attributes.position.needsUpdate = true;

      // Render Three.js Scene
      renderer.render(scene, camera);

      // Transition to Cockpit POV when shuttle approaches cockpit canopy
      if (progress >= 1.0) {
        cancelAnimationFrame(animId);
        setPhase('cockpit');
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      starTex.dispose();
      starGeo.dispose();
      starMat.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  // =========================================================================
  // SCENE 2: COCKPIT POV & TARGET SCANNER SEQUENCE (2.2s)
  // =========================================================================
  useEffect(() => {
    if (phase !== 'cockpit') return;

    const timers = [];

    // Stage 1: Frequency Harmonization (at 750ms)
    timers.push(
      setTimeout(() => {
        setScanStatus('SIGNAL DETECTED // ANALYZING FREQUENCY HARMONICS...');
        setScanSubStatus('FREQ: 15.8281° N, 74.4889° E • CARRIER STRENGTH: 99.4%');
      }, 750)
    );

    // Stage 2: Target Acquisition Lock (at 1600ms)
    timers.push(
      setTimeout(() => {
        setScanStatus('>> TARGET ACQUIRED: INNOVERSE 3.0 // KLS GIT <<');
        setScanSubStatus('COORDINATES LOCKED • ORBITAL DESCENT CONFIRMED');
        setIsLocked(true);
      }, 1600)
    );

    // Stage 3: Flash Bloom & Hand-off to Main Website (at 2350ms)
    timers.push(
      setTimeout(() => {
        setPhase('flash');
        setFlashOpacity(1);

        setTimeout(() => {
          if (!isFinishedRef.current) {
            isFinishedRef.current = true;
            if (onCompleteRef.current) onCompleteRef.current();
          }
        }, 350);
      }, 2350)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [phase]);

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[95] w-full h-full bg-[#030306] select-none overflow-hidden cursor-pointer"
      title="Click or press Space to skip intro"
    >
      {/* 3D WebGL Canvas for Exterior Shuttle Approach */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full block transition-opacity duration-300 ${
          phase === 'exterior' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* =====================================================================
          COCKPIT INTERIOR POV VIEW (Searching Sector)
          ===================================================================== */}
      {phase !== 'exterior' && (
        <div className="absolute inset-0 z-10 w-full h-full flex flex-col justify-between overflow-hidden">
          {/* Deep Space Background Moving through Cockpit Windshield */}
          <div className="absolute inset-0 bg-[#020205] z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.18)_0%,rgba(6,6,8,0.88)_75%)]" />

            {/* Glowing Celestial Stars Outside Cockpit */}
            <div className="absolute inset-0 bg-tech-dots-dense opacity-45 animate-pulse" />

            {/* Distant Earth Sphere Silhouette Below */}
            <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[650px] sm:w-[960px] h-[650px] sm:h-[960px] rounded-full border border-cyan-400/40 bg-gradient-to-t from-cyan-950/50 via-black to-transparent shadow-[0_0_100px_rgba(56,189,248,0.3)] pointer-events-none" />
          </div>

          {/* Futuristic Cockpit Canopy Struts (Left, Right, and Top Roof Frame) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none" viewBox="0 0 1000 600">
            <defs>
              <linearGradient id="canopyMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#252834" />
                <stop offset="50%" stopColor="#0d0e14" />
                <stop offset="100%" stopColor="#1a1c26" />
              </linearGradient>
            </defs>

            {/* Top Roof Center Frame */}
            <polygon points="380,0 620,0 570,75 430,75" fill="url(#canopyMetal)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />

            {/* Left Diagonal Windshield Pillar */}
            <polygon points="0,0 90,0 240,400 0,460" fill="url(#canopyMetal)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.35" />

            {/* Right Diagonal Windshield Pillar */}
            <polygon points="1000,0 910,0 760,400 1000,460" fill="url(#canopyMetal)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.35" />

            {/* Bottom Pilot Instrument Dashboard */}
            <polygon points="0,480 230,425 770,425 1000,480 1000,600 0,600" fill="#090a0f" stroke="#f59e0b" strokeWidth="1.2" strokeOpacity="0.4" />
          </svg>

          {/* Pilot Dashboard Status Gauges & LEDs */}
          <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 z-20 flex items-center justify-between px-6 sm:px-14 pointer-events-none font-mono">
            {/* Left Dashboard Panel: Power & RCS */}
            <div className="hidden sm:flex flex-col gap-1.5 bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 shadow-lg">
              <span className="text-[10px] text-white/40 tracking-wider">SSME TRI-PLASMA PROPULSION</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs text-emerald-400 font-bold">104.5% NOMINAL THRUST</span>
              </div>
            </div>

            {/* Center Flight Computer Nav */}
            <div className="flex flex-col items-center gap-1 bg-black/80 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-white/15 shadow-2xl">
              <div className="flex items-center gap-2">
                <Radio className={`w-3.5 h-3.5 ${isLocked ? 'text-amber-400 animate-bounce' : 'text-cyan-400 animate-pulse'}`} />
                <span className={`text-xs sm:text-sm font-bold tracking-wider font-mono ${
                  isLocked ? 'text-amber-400' : 'text-cyan-300'
                }`}>
                  {scanStatus}
                </span>
              </div>
              <span className="text-[10px] text-white/50 tracking-widest uppercase">
                {scanSubStatus}
              </span>
            </div>

            {/* Right Dashboard Panel: Dynamic Radar Sweep */}
            <div className="hidden sm:flex items-center gap-3 bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 shadow-lg">
              <div className="relative w-11 h-11 border border-cyan-400/40 rounded-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 border border-cyan-400/20 rounded-full" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-cyan-400/40 to-transparent origin-center pointer-events-none"
                  style={{ transform: `rotate(${radarAngle}deg)` }}
                />
              </div>
              <div className="flex flex-col text-[10px]">
                <span className="text-white/40 uppercase">SCANNER GRID</span>
                <span className="text-amber-400 font-bold">LOCKED: KLS GIT</span>
              </div>
            </div>
          </div>

          {/* Central Holographic Target Scanner HUD (Searching Sector) */}
          <div className="relative mx-auto my-auto flex flex-col items-center justify-center z-20 pointer-events-none">
            {/* Holographic Reticle Rings */}
            <div className={`relative w-48 sm:w-64 h-48 sm:h-64 rounded-full border transition-all duration-500 flex items-center justify-center ${
              isLocked
                ? 'border-amber-400 scale-105 shadow-[0_0_40px_rgba(245,158,11,0.7)]'
                : 'border-cyan-400/70 scale-100 shadow-[0_0_25px_rgba(56,189,248,0.35)]'
            }`}>
              {/* Rotating Azimuth Scale Ring */}
              <div className={`absolute inset-2 border border-dashed rounded-full animate-spin transition-colors duration-500 ${
                isLocked ? 'border-amber-300/70' : 'border-cyan-300/40'
              }`} style={{ animationDuration: '16s' }} />

              {/* Cardinal Crosshair Beams */}
              <div className={`absolute w-60 sm:w-80 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent transition-colors duration-500 ${
                isLocked ? 'via-amber-400' : 'via-cyan-400/80'
              }`} />
              <div className={`absolute h-60 sm:h-80 w-[1.5px] bg-gradient-to-b from-transparent via-cyan-400/80 to-transparent transition-colors duration-500 ${
                isLocked ? 'via-amber-400' : 'via-cyan-400/80'
              }`} />

              {/* Target Lock Corner Brackets */}
              <div className={`absolute -top-3 -left-3 w-7 h-7 border-t-2 border-l-2 transition-all duration-300 ${
                isLocked ? 'border-amber-400 scale-125 shadow-[0_0_12px_#fbbf24]' : 'border-cyan-400'
              }`} />
              <div className={`absolute -top-3 -right-3 w-7 h-7 border-t-2 border-r-2 transition-all duration-300 ${
                isLocked ? 'border-amber-400 scale-125 shadow-[0_0_12px_#fbbf24]' : 'border-cyan-400'
              }`} />
              <div className={`absolute -bottom-3 -left-3 w-7 h-7 border-b-2 border-l-2 transition-all duration-300 ${
                isLocked ? 'border-amber-400 scale-125 shadow-[0_0_12px_#fbbf24]' : 'border-cyan-400'
              }`} />
              <div className={`absolute -bottom-3 -right-3 w-7 h-7 border-b-2 border-r-2 transition-all duration-300 ${
                isLocked ? 'border-amber-400 scale-125 shadow-[0_0_12px_#fbbf24]' : 'border-cyan-400'
              }`} />

              {/* Center Lock Core Beacon */}
              <div className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                isLocked
                  ? 'bg-amber-400 shadow-[0_0_20px_#fbbf24] scale-150 animate-ping'
                  : 'bg-cyan-400 shadow-[0_0_12px_#38bdf8] scale-100'
              }`} />
            </div>

            {/* Target Coordinates Tag */}
            <div className="mt-5 px-4 py-2 rounded-full bg-black/80 border border-white/15 backdrop-blur-md flex items-center gap-2.5 font-mono text-xs tracking-widest text-amber-300 shadow-xl">
              <Crosshair className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>COORDINATES: 15.8281° N, 74.4889° E // INNOVERSE 3.0</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Header Overlay with Skip Prompt */}
      <div className="absolute top-6 left-6 right-6 z-40 flex items-center justify-between font-mono text-xs uppercase tracking-widest pointer-events-none">
        <div className="flex items-center gap-2.5 bg-black/65 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
          <span className="text-white font-medium">NEXUS-1 ORBITAL ENTRY // INNOVERSE</span>
        </div>

        <button
          onClick={handleSkip}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-amber-400/20 hover:border-amber-400/50 text-white/80 hover:text-white transition-all text-[11px] cursor-pointer active:scale-95 shadow-lg backdrop-blur-md"
        >
          <span>SKIP INTRO</span>
          <FastForward className="w-3.5 h-3.5 text-amber-400" />
        </button>
      </div>

      {/* =====================================================================
          CINEMATIC FLASH BLOOM REVEAL OVERLAY
          ===================================================================== */}
      <div
        className="absolute inset-0 z-50 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: flashOpacity,
          background: 'radial-gradient(ellipse at center, #ffffff 45%, #fef3c7 75%, #f59e0b 100%)'
        }}
      />
    </div>
  );
}
