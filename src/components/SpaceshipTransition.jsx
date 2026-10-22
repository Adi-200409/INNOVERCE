import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FastForward } from 'lucide-react';
import { preloadShuttleModel, getCachedShuttleModel } from '../utils/shuttleLoader';

/**
 * SpaceshipTransition (Photorealistic Cinema Edition)
 * AAA-Grade 3D Spaceship Warp Launch Transition:
 * - Photorealistic SSME Rocket Plumes with Mach Shock Diamonds & Volumetric Flame Jets
 * - Metallic PBR Space Shuttle with Deep Space Environment Reflections
 * - Distant Celestial Nebula Background & Multi-Layer Interstellar Void
 * - Anamorphic Sci-Fi Optical Lens Flares & Throttle Glow
 * - Relativistic Hyperspace Warp Streaks with Tapered Motion-Blur Heads
 * - Expanding Photonic Shockwave Distortion with Ionized Plasma Sparks
 * - Inertial Camera Damping with Supersonic Micro-Vibration
 * - Zero React re-renders in animation loop (Solid 60-120 FPS)
 */
export default function SpaceshipTransition({ onComplete }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const speedRef = useRef(null);
  const statusRef = useRef(null);
  const flashRef = useRef(null);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const isFinishedRef = useRef(false);

  const handleSkip = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    if (flashRef.current) {
      flashRef.current.style.opacity = '1';
    }
    setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 120);
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

    // 1. Scene, Camera & ACES Filmic Tone-Mapped Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 4000);
    camera.position.set(0, 1.2, 13);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
    } catch (e) {
      console.warn('WebGL init error in SpaceshipTransition:', e);
      handleSkip();
      return;
    }

    // 2. Texture Generators for Photorealistic Volumetric Flames & Flares
    // A. Volumetric Supersonic Rocket Flame Texture (Gaussian soft falloff, zero polygon seams)
    function createVolumetricFlameTexture() {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 512;
      const ctx = c.getContext('2d');

      const cx = 64;
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      // Throat: Incandescent electric cyan-white core (4,000K)
      grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.08, 'rgba(165, 243, 252, 0.95)');
      // Mid: Blazing incandescent golden-orange
      grad.addColorStop(0.35, 'rgba(255, 170, 0, 0.85)');
      // Outer envelope: Fiery crimson red
      grad.addColorStop(0.7, 'rgba(239, 68, 68, 0.45)');
      // Tail: Fading supersonic exhaust gas
      grad.addColorStop(1.0, 'rgba(185, 28, 28, 0.0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 512);

      // Radial Gaussian mask so the edges taper softly into space
      ctx.globalCompositeOperation = 'destination-in';
      const radGrad = ctx.createRadialGradient(cx, 256, 0, cx, 256, 64);
      radGrad.addColorStop(0, 'rgba(0,0,0,1)');
      radGrad.addColorStop(0.45, 'rgba(0,0,0,0.9)');
      radGrad.addColorStop(0.85, 'rgba(0,0,0,0.25)');
      radGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, 128, 512);

      const texture = new THREE.CanvasTexture(c);
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    }

    // B. Mach Shock Diamond Texture (Supersonic compression nodes)
    function createMachDiamondTexture() {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.25, 'rgba(186, 230, 253, 0.9)');
      grad.addColorStop(0.6, 'rgba(56, 189, 248, 0.4)');
      grad.addColorStop(1, 'rgba(14, 165, 233, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      // Diamond shape
      ctx.moveTo(32, 4);
      ctx.lineTo(60, 32);
      ctx.lineTo(32, 60);
      ctx.lineTo(4, 32);
      ctx.closePath();
      ctx.fill();

      return new THREE.CanvasTexture(c);
    }

    // C. Anamorphic Cinematic Lens Flare Streak (Horizontal optical streak)
    function createAnamorphicFlareTexture() {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 64;
      const ctx = c.getContext('2d');

      const grad = ctx.createLinearGradient(0, 0, 512, 0);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
      grad.addColorStop(0.35, 'rgba(147, 197, 253, 0.35)');
      grad.addColorStop(0.48, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.52, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.65, 'rgba(168, 85, 247, 0.35)');
      grad.addColorStop(1, 'rgba(168, 85, 247, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 24, 512, 16);

      // Core radial bloom in the center
      const core = ctx.createRadialGradient(256, 32, 0, 256, 32, 32);
      core.addColorStop(0, 'rgba(255, 255, 255, 1)');
      core.addColorStop(0.2, 'rgba(224, 242, 254, 0.7)');
      core.addColorStop(1, 'rgba(186, 230, 253, 0)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(256, 32, 32, 0, Math.PI * 2);
      ctx.fill();

      return new THREE.CanvasTexture(c);
    }

    // D. Soft Throat Bloom Halo
    function createNozzleHaloTexture() {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext('2d');

      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.2, 'rgba(254, 215, 170, 0.8)');
      grad.addColorStop(0.5, 'rgba(249, 115, 22, 0.35)');
      grad.addColorStop(0.8, 'rgba(239, 68, 68, 0.1)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(64, 64, 60, 0, Math.PI * 2);
      ctx.fill();

      return new THREE.CanvasTexture(c);
    }

    const flameTexture = createVolumetricFlameTexture();
    const machDiamondTexture = createMachDiamondTexture();
    const anamorphicFlareTexture = createAnamorphicFlareTexture();
    const nozzleHaloTexture = createNozzleHaloTexture();

    // 3. Deep Space Celestial Backdrop (Photorealistic Nebula Panorama)
    const texLoader = new THREE.TextureLoader();
    const spaceBgTex = texLoader.load('/cosmic-space-bg.jpg');
    spaceBgTex.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = spaceBgTex; // Drives realistic PBR reflections across the shuttle!

    // Distant panoramic sky sphere
    const skyGeo = new THREE.SphereGeometry(1500, 32, 24);
    const skyMat = new THREE.MeshBasicMaterial({
      map: spaceBgTex,
      side: THREE.BackSide,
      color: 0x444455 // Tuned deep cinematic tone
    });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    scene.add(skyMesh);

    // 4. Dramatic Space Lighting: Direct Stellar Sun & Atmospheric Blue Bounce
    const sunLight = new THREE.DirectionalLight(0xfff7ed, 4.2);
    sunLight.position.set(16, 22, 14);
    scene.add(sunLight);

    const deepSpaceFill = new THREE.DirectionalLight(0x38bdf8, 1.8);
    deepSpaceFill.position.set(-18, -10, -12);
    scene.add(deepSpaceFill);

    const ambientLight = new THREE.AmbientLight(0x1e1e2d, 1.2);
    scene.add(ambientLight);

    // 5. Space Shuttle Hierarchy
    const shipRoot = new THREE.Group();
    scene.add(shipRoot);

    // Initial procedural delta craft
    const fallbackShuttle = new THREE.Group();
    {
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0xf3f4f6,
        metalness: 0.88,
        roughness: 0.28,
        envMap: spaceBgTex,
        envMapIntensity: 1.6
      });
      const darkTileMat = new THREE.MeshStandardMaterial({
        color: 0x111116,
        metalness: 0.9,
        roughness: 0.2,
        envMap: spaceBgTex,
        envMapIntensity: 1.2
      });

      const bodyGeo = new THREE.ConeGeometry(0.68, 4.0, 16);
      bodyGeo.rotateX(Math.PI / 2);
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      fallbackShuttle.add(body);

      const wingGeo = new THREE.BoxGeometry(3.6, 0.08, 1.8);
      wingGeo.translate(0, -0.15, -0.6);
      const wings = new THREE.Mesh(wingGeo, darkTileMat);
      fallbackShuttle.add(wings);

      const tailGeo = new THREE.BoxGeometry(0.08, 0.9, 0.9);
      tailGeo.translate(0, 0.55, -1.3);
      const tail = new THREE.Mesh(tailGeo, bodyMat);
      fallbackShuttle.add(tail);
    }
    shipRoot.add(fallbackShuttle);

    // Attach pre-cached high-poly PBR shuttle model
    let loadedShuttleMesh = null;
    const attachShuttle = (model) => {
      if (!model || loadedShuttleMesh) return;
      const clone = model.clone(true);
      clone.scale.set(2.65, 2.65, 2.65);
      clone.position.set(0, -0.45, 0);

      shipRoot.remove(fallbackShuttle);
      fallbackShuttle.traverse((c) => {
        if (c.geometry) c.geometry.dispose();
        if (c.material) c.material.dispose();
      });

      shipRoot.add(clone);
      loadedShuttleMesh = clone;
    };

    const cached = getCachedShuttleModel();
    if (cached) {
      attachShuttle(cached);
    } else {
      preloadShuttleModel().then((model) => {
        attachShuttle(model);
      });
    }

    // 6. Photorealistic SSME Rocket Thruster Engines
    const thrusters = [];
    const bellMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a24,
      metalness: 0.95,
      roughness: 0.2,
      emissive: 0xff3300,
      emissiveIntensity: 0.6 // Red-hot incandescent titanium nozzle heat
    });

    const createPhotorealisticEngine = (x, y, z) => {
      const engGroup = new THREE.Group();
      engGroup.position.set(x, y, z);

      // A. Real Titanium Rocket Nozzle Bell
      const bellGeo = new THREE.CylinderGeometry(0.19, 0.09, 0.45, 18, 1, true);
      bellGeo.rotateX(Math.PI / 2);
      bellGeo.translate(0, 0, 0.1);
      const bellMesh = new THREE.Mesh(bellGeo, bellMat);
      engGroup.add(bellMesh);

      // B. Volumetric Crossed Flame Ribbons (Soft gradient textures, seamless supersonic jet)
      const flamePlumes = new THREE.Group();
      const planeGeo = new THREE.PlaneGeometry(0.85, 4.8);
      planeGeo.translate(0, 2.4, 0);
      planeGeo.rotateX(-Math.PI / 2);

      const flameMat = new THREE.MeshBasicMaterial({
        map: flameTexture,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });

      // 3 overlapping rotating cross planes for true 3D volumetric thickness
      for (let r = 0; r < 3; r++) {
        const pMesh = new THREE.Mesh(planeGeo, flameMat);
        pMesh.rotation.z = (r * Math.PI) / 3;
        flamePlumes.add(pMesh);
      }
      engGroup.add(flamePlumes);

      // C. Supersonic Mach Shock Diamonds (3 glowing compression nodes)
      const shockDiamonds = [];
      const diamondMat = new THREE.MeshBasicMaterial({
        map: machDiamondTexture,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const DIAMOND_SPACING = [0.45, 0.95, 1.55];
      DIAMOND_SPACING.forEach((dist, idx) => {
        const dPlane = new THREE.PlaneGeometry(0.24 - idx * 0.04, 0.24 - idx * 0.04);
        const dMesh = new THREE.Mesh(dPlane, diamondMat);
        dMesh.position.set(0, 0, -dist);
        engGroup.add(dMesh);
        shockDiamonds.push({ mesh: dMesh, baseDist: dist, phase: idx * 1.5 });
      });

      // D. Engine Throat Halo Bloom
      const haloGeo = new THREE.PlaneGeometry(1.2, 1.2);
      const haloMat = new THREE.MeshBasicMaterial({
        map: nozzleHaloTexture,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.set(0, 0, -0.05);
      engGroup.add(haloMesh);

      shipRoot.add(engGroup);
      thrusters.push({
        group: engGroup,
        flamePlumes,
        haloMesh,
        shockDiamonds
      });
    };

    // 3 SSME Main Engines aligned with Space Shuttle Bulkhead
    createPhotorealisticEngine(-0.32, -0.28, -2.15);
    createPhotorealisticEngine(0.32, -0.28, -2.15);
    createPhotorealisticEngine(0.0, 0.26, -2.1);

    // E. Anamorphic Cinematic Lens Flare Streak (Horizontal beam crossing engines)
    const flareGeo = new THREE.PlaneGeometry(8.5, 0.8);
    const flareMat = new THREE.MeshBasicMaterial({
      map: anamorphicFlareTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const anamorphicFlare = new THREE.Mesh(flareGeo, flareMat);
    anamorphicFlare.position.set(0, -0.05, -2.25);
    shipRoot.add(anamorphicFlare);

    // Dynamic flickering firelight casting warm glow on engine tiles
    const fireLight = new THREE.PointLight(0xff6600, 4.0, 16);
    fireLight.position.set(0, 0, -2.8);
    shipRoot.add(fireLight);

    // 7. Relativistic Hyperspace Warp Streaks (Tapered Starlight Streaks)
    const WARP_COUNT = 380;
    const warpPositions = new Float32Array(WARP_COUNT * 6);
    const warpColors = new Float32Array(WARP_COUNT * 6);
    const warpStars = [];

    const STAR_SPECTRUM = [
      { r: 1.0, g: 1.0, b: 1.0 },      // Pure White
      { r: 0.6, g: 0.88, b: 1.0 },     // Cyan Starlight
      { r: 0.9, g: 0.68, b: 1.0 },     // Violet Doppler
      { r: 1.0, g: 0.94, b: 0.72 }     // Solar Amber
    ];

    for (let i = 0; i < WARP_COUNT; i++) {
      const x = (Math.random() - 0.5) * 85;
      const y = (Math.random() - 0.5) * 65;
      const z = -Math.random() * 220 + 20;
      const speed = 1.6 + Math.random() * 2.4;
      const col = STAR_SPECTRUM[i % STAR_SPECTRUM.length];

      warpStars.push({ x, y, z, speed, length: 1.6 });

      const idx = i * 6;
      warpColors[idx] = col.r;
      warpColors[idx + 1] = col.g;
      warpColors[idx + 2] = col.b;
      // Tail fades into space
      warpColors[idx + 3] = col.r * 0.15;
      warpColors[idx + 4] = col.g * 0.15;
      warpColors[idx + 5] = col.b * 0.15;
    }

    const warpGeo = new THREE.BufferGeometry();
    warpGeo.setAttribute('position', new THREE.BufferAttribute(warpPositions, 3));
    warpGeo.setAttribute('color', new THREE.BufferAttribute(warpColors, 3));

    const warpMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      linewidth: 1.8
    });
    const warpLines = new THREE.LineSegments(warpGeo, warpMat);
    scene.add(warpLines);

    // 8. Relativistic Photonic Warp Shockwave Ring
    const shockwaveGeo = new THREE.TorusGeometry(3.6, 0.14, 16, 72);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const shockwave = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    scene.add(shockwave);

    // 9. Supersonic Exhaust Sparks & Ionized Particles
    const SPARK_COUNT = 120;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(SPARK_COUNT * 3);
    const sparks = [];

    for (let i = 0; i < SPARK_COUNT; i++) {
      sparks.push({
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: -2.3 - Math.random() * 5.0,
        vx: (Math.random() - 0.5) * 0.09,
        vy: (Math.random() - 0.5) * 0.09,
        vz: -0.5 - Math.random() * 0.8,
        life: Math.random() * 25,
        maxLife: 25
      });
      sparkPositions[i * 3] = sparks[i].x;
      sparkPositions[i * 3 + 1] = sparks[i].y;
      sparkPositions[i * 3 + 2] = sparks[i].z;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));

    const sparkMat = new THREE.PointsMaterial({
      color: 0xffdd66,
      size: 0.16,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
    shipRoot.add(sparkPoints);

    // 10. Smooth Cinematic Motion Loop (Natural Inertia & Damping)
    let animId;
    const startTime = performance.now();
    const TOTAL_DURATION = 3100; // 3.1 seconds total sequence

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    };
    window.addEventListener('resize', handleResize);

    const animate = (currentTime) => {
      if (isFinishedRef.current) return;
      animId = requestAnimationFrame(animate);

      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / TOTAL_DURATION);

      // --- Organic Combustion Turbulence Flicker ---
      const combustionJitter = 1.0 + Math.sin(elapsed * 0.08) * 0.12 + (Math.random() - 0.5) * 0.15;
      const flarePulse = 0.85 + Math.sin(elapsed * 0.06) * 0.25;

      // Rotate distant celestial sky slightly for sublime parallax
      skyMesh.rotation.y = elapsed * 0.00015;

      // Anamorphic flare tracks camera orientation
      anamorphicFlare.quaternion.copy(camera.quaternion);

      // --- PHASE 1: 0% - 28% (Deep Space Entry & SSME Engine Ignition) ---
      if (progress < 0.28) {
        const p = progress / 0.28;
        const ease = Math.sin((p * Math.PI) / 2);

        shipRoot.position.set(
          -3.4 + ease * 3.4,
          -1.6 + ease * 1.6,
          -35 + ease * 40
        );

        // Smooth bank
        shipRoot.rotation.set(
          0.1 - ease * 0.1,
          -0.28 + ease * 0.18,
          0.38 - ease * 0.32
        );

        if (speedRef.current) {
          speedRef.current.textContent = `MACH ${(14.2 + p * 28).toFixed(1)}`;
        }
        if (statusRef.current) {
          statusRef.current.textContent = 'IGNITING TRI-PLASMA SSME ROCKET THRUSTERS...';
        }

        // Throttle up from 40% to 100%
        const throttle = 0.4 + p * 0.6;
        thrusters.forEach((t) => {
          t.flamePlumes.scale.set(throttle, throttle, throttle * combustionJitter * 0.9);
          t.haloMesh.scale.setScalar(throttle * flarePulse);
          t.shockDiamonds.forEach((sd) => {
            sd.mesh.quaternion.copy(camera.quaternion);
            sd.mesh.position.z = -sd.baseDist * throttle;
          });
        });

        bellMat.emissiveIntensity = 0.4 + p * 0.8;
        flareMat.opacity = 0.35 + p * 0.35;
      }

      // --- PHASE 2: 28% - 70% (Full Afterburner Burn & Cinematic Orbit Roll) ---
      else if (progress < 0.7) {
        const p = (progress - 0.28) / 0.42;
        const cubicP = p * p * (3 - 2 * p);

        // Dynamic 3D sweeping arc past the camera
        shipRoot.position.set(
          Math.sin(p * Math.PI) * 1.7,
          Math.sin(p * Math.PI * 0.8) * 0.55,
          5.0 + cubicP * 6.0
        );

        // Natural aerodynamic banking and roll angle
        shipRoot.rotation.set(
          -0.08 - p * 0.14,
          Math.sin(p * Math.PI) * 0.28,
          -0.22 + Math.sin(p * Math.PI) * 0.5
        );

        // Engines at maximum thrust rating
        thrusters.forEach((t) => {
          t.flamePlumes.scale.set(1.15, 1.15, (1.6 + p * 1.4) * combustionJitter);
          t.haloMesh.scale.setScalar(1.2 * flarePulse);
          t.shockDiamonds.forEach((sd) => {
            sd.mesh.quaternion.copy(camera.quaternion);
            sd.mesh.position.z = -sd.baseDist * (1.2 + p * 0.5);
          });
        });

        bellMat.emissiveIntensity = 1.2 + Math.random() * 0.4;
        fireLight.intensity = 4.5 + Math.random() * 2.0;
        flareMat.opacity = 0.75 + Math.random() * 0.2;

        // Camera supersonic vibration proportional to thrust
        camera.position.x = Math.sin(elapsed * 0.05) * 0.09 * p;
        camera.position.y = 1.2 + Math.cos(elapsed * 0.05) * 0.09 * p;

        if (speedRef.current) {
          speedRef.current.textContent = `MACH ${(42.0 + p * 240).toFixed(0)} // WARP DRIVE CHARGING`;
        }
        if (statusRef.current) {
          statusRef.current.textContent = 'HYPERSPACE INJECTION VECTOR LOCKED • MAXIMUM BURN';
        }

        // Relativistic shockwave ring expands
        if (p > 0.52) {
          const swP = (p - 0.52) / 0.48;
          shockwave.position.copy(shipRoot.position);
          shockwave.position.z -= 1.4;
          shockwave.scale.setScalar(1 + swP * 18);
          shockwaveMat.opacity = (1 - swP) * 0.75;
        }
      }

      // --- PHASE 3: 70% - 92% (Warp Speed Breakout & Starlight Bloom) ---
      else if (progress < 0.92) {
        const p = (progress - 0.7) / 0.22;
        const warpEase = p * p * p;

        // Ship rockets into hyperspace horizon
        shipRoot.position.z = 11.0 + warpEase * 90.0;
        shipRoot.position.y += warpEase * 11.0;

        thrusters.forEach((t) => {
          t.flamePlumes.scale.set(1.35, 1.35, 3.2 + warpEase * 8.0);
          t.haloMesh.scale.setScalar(1.4 + warpEase * 2.0);
        });

        flareMat.opacity = 0.95 + warpEase * 1.5;
        anamorphicFlare.scale.set(1 + warpEase * 4, 1 + warpEase * 2, 1);

        camera.position.x = Math.sin(elapsed * 0.08) * 0.18 * (1 - p * 0.5);
        camera.position.y = 1.2 + Math.cos(elapsed * 0.08) * 0.18 * (1 - p * 0.5);

        if (speedRef.current) {
          speedRef.current.textContent = 'WARP 1.0 // ARRIVAL IN EARTH ORBIT';
        }
        if (statusRef.current) {
          statusRef.current.textContent = 'DECOUPLING HYPERSPACE • INNOVERSE SPHERE REACHED';
        }

        // Direct DOM update for flash bloom
        if (p > 0.35 && flashRef.current) {
          const flashProgress = (p - 0.35) / 0.65;
          flashRef.current.style.opacity = String(flashProgress);
        }
      }

      // --- PHASE 4: 92% - 100% (Flash Hold & Hand-Off) ---
      else {
        if (flashRef.current) {
          flashRef.current.style.opacity = '1';
        }
        if (progress >= 0.98 && !isFinishedRef.current) {
          isFinishedRef.current = true;
          cancelAnimationFrame(animId);
          if (onCompleteRef.current) onCompleteRef.current();
          return;
        }
      }

      // Update Hyperspace Star Streaks (Tapered leading heads, fading tails)
      const posArr = warpGeo.attributes.position.array;
      const speedMult = 1.0 + Math.pow(progress, 2.1) * 26.0;
      const streakLength = 1.4 + Math.pow(progress, 2.3) * 42.0;

      for (let i = 0; i < WARP_COUNT; i++) {
        const star = warpStars[i];
        star.z += star.speed * speedMult * 0.32;

        if (star.z > 25) {
          star.z = -200 - Math.random() * 45;
          star.x = (Math.random() - 0.5) * 85;
          star.y = (Math.random() - 0.5) * 65;
        }

        const idx = i * 6;
        posArr[idx] = star.x;
        posArr[idx + 1] = star.y;
        posArr[idx + 2] = star.z;

        posArr[idx + 3] = star.x;
        posArr[idx + 4] = star.y;
        posArr[idx + 5] = star.z - star.length * streakLength;
      }
      warpGeo.attributes.position.needsUpdate = true;

      // Update Exhaust Sparks
      const sparkPos = sparkGeo.attributes.position.array;
      for (let i = 0; i < SPARK_COUNT; i++) {
        const s = sparks[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        s.z += s.vz * (1 + progress * 2.2);

        if (s.life > s.maxLife) {
          s.life = 0;
          s.x = (Math.random() - 0.5) * 0.45;
          s.y = (Math.random() - 0.5) * 0.45 - 0.1;
          s.z = -2.3;
        }

        const sIdx = i * 3;
        sparkPos[sIdx] = s.x;
        sparkPos[sIdx + 1] = s.y;
        sparkPos[sIdx + 2] = s.z;
      }
      sparkGeo.attributes.position.needsUpdate = true;

      // Render Three.js Scene
      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Clean disposal
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);

      flameTexture.dispose();
      machDiamondTexture.dispose();
      anamorphicFlareTexture.dispose();
      nozzleHaloTexture.dispose();
      skyGeo.dispose();
      skyMat.dispose();
      bellMat.dispose();
      warpGeo.dispose();
      warpMat.dispose();
      shockwaveGeo.dispose();
      shockwaveMat.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();

      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[95] w-full h-full bg-[#020206] select-none overflow-hidden"
    >
      {/* Three.js 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Cinematic HUD Telemetry Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none p-6 sm:p-10 flex flex-col justify-between font-mono">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs uppercase tracking-widest text-white/70">
          <div className="flex items-center gap-2.5 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
            <span>NEXUS-1 ORBITAL INSERTION</span>
          </div>

          {/* Interactive Skip Button */}
          <button
            onClick={handleSkip}
            className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 hover:border-amber-400/50 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all text-[11px] cursor-pointer active:scale-95 shadow-lg"
          >
            <span>SKIP INTRO</span>
            <FastForward className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

        {/* Center Target Acquisition Sight HUD */}
        <div className="relative mx-auto my-auto flex flex-col items-center justify-center opacity-50">
          <div className="w-20 h-20 border border-amber-400/30 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-2 h-2 rounded-full bg-amber-400/80 shadow-[0_0_8px_#f59e0b]" />
          </div>
          <span className="text-[10px] text-amber-400/70 mt-2 tracking-widest font-mono">
            COORDINATES // 15.82° N, 74.48° E
          </span>
        </div>

        {/* Bottom Telemetry Flight Status Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-xs sm:text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-white/40 tracking-widest uppercase">
              SUPERSONIC FLIGHT TELEMETRY
            </span>
            <div className="flex items-center gap-3">
              <span
                ref={speedRef}
                className="font-display font-black text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-white to-yellow-300 tracking-wider"
              >
                MACH 14.2
              </span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span
                ref={statusRef}
                className="text-xs text-amber-300 font-mono tracking-wider"
              >
                IGNITING TRI-PLASMA SSME ROCKET THRUSTERS...
              </span>
            </div>
          </div>

          <div className="text-[10px] text-white/30 tracking-widest uppercase text-right">
            <span>DESTINATION: INNOVERSE EARTH SPHERE // BELAGAVI</span>
          </div>
        </div>
      </div>

      {/* Cinematic Stellar Flash Bloom Reveal (Warm Solar Starlight) */}
      <div
        ref={flashRef}
        className="absolute inset-0 z-20 pointer-events-none bg-white opacity-0 transition-opacity duration-150"
        style={{
          background: 'radial-gradient(ellipse at center, #ffffff 40%, #fef3c7 75%, #f59e0b 100%)'
        }}
      />
    </div>
  );
}
