import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * CosmicBackground
 * Full-viewport Three.js WebGL 3D Background that spans the entire website:
 * - Volumetric 3D Deep Space Starfield (multi-spectral stars in true 3D frustum)
 * - 3D Celestial Orbital Rings & Geodesic Coordinate Lattice (slowly rotating in deep space)
 * - 3D Foreground Stardust Dust Clouds (responsive parallax depth)
 * - Dynamic 3D Shooting Meteors traversing 3D vector trajectories
 * - Real-time 3D Mouse Parallax (camera tilt & perspective shifts)
 * - Scroll-driven 3D Warp Flight (camera travels along Z-axis as user navigates sections)
 * - Layered over real photorealistic Hubble/JWST galaxy backdrop with optical vignette
 */
export default function CosmicBackground({ paused = false }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Viewport dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 4000);
    camera.position.z = 850;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
    } catch (e) {
      console.warn('WebGL init fallback:', e);
      return;
    }

    // Master 3D container group for scene-wide rotations
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // 2. Texture Generators for realistic glowing point particles
    function createStarSprite() {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
      grad.addColorStop(0.5, 'rgba(230, 240, 255, 0.35)');
      grad.addColorStop(0.8, 'rgba(180, 210, 255, 0.08)');
      grad.addColorStop(1, 'rgba(150, 180, 255, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      // Subtle 4-point cross diffraction spike
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(32, 8);
      ctx.lineTo(32, 56);
      ctx.moveTo(8, 32);
      ctx.lineTo(56, 32);
      ctx.stroke();

      const texture = new THREE.CanvasTexture(c);
      texture.needsUpdate = true;
      return texture;
    }

    function createDustSprite() {
      const c = document.createElement('canvas');
      c.width = 32;
      c.height = 32;
      const ctx = c.getContext('2d');

      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 15);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      grad.addColorStop(0.4, 'rgba(180, 210, 255, 0.4)');
      grad.addColorStop(1, 'rgba(180, 210, 255, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 15, 0, Math.PI * 2);
      ctx.fill();

      const texture = new THREE.CanvasTexture(c);
      texture.needsUpdate = true;
      return texture;
    }

    const starTexture = createStarSprite();
    const dustTexture = createDustSprite();

    // 3. Volumetric 3D Deep Space Starfield (2,800 stars)
    const STAR_COUNT = Math.min(3200, Math.max(1600, Math.floor((width * height) / 450)));
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(STAR_COUNT * 3);
    const starColors = new Float32Array(STAR_COUNT * 3);
    const starPhases = new Float32Array(STAR_COUNT); // For individual twinkling

    // Color palette matching astronomical spectra:
    // Pure Diamond White (55%), Ice Cyan (20%), Warm Amber/Gold (15%), Nebula Violet (10%)
    const PALETTE = [
      { r: 1.0, g: 1.0, b: 1.0 },       // Pure White
      { r: 1.0, g: 1.0, b: 1.0 },
      { r: 1.0, g: 1.0, b: 1.0 },
      { r: 0.55, g: 0.85, b: 1.0 },     // Ice Cyan
      { r: 0.99, g: 0.94, b: 0.65 },     // Stellar Gold
      { r: 0.82, g: 0.55, b: 1.0 }      // Nebula Violet
    ];

    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;
      // Spread across wide 3D space volume
      starPositions[i3] = (Math.random() - 0.5) * 2800;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 2200;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 2600 - 200;

      const col = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      // Slight luminance variation
      const lum = 0.75 + Math.random() * 0.25;
      starColors[i3] = col.r * lum;
      starColors[i3 + 1] = col.g * lum;
      starColors[i3 + 2] = col.b * lum;

      starPhases[i] = Math.random() * Math.PI * 2;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 3.2,
      map: starTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    sceneGroup.add(starPoints);

    // 4. Volumetric Stardust Cloud (Foreground motes that drift closer to camera)
    const DUST_COUNT = 380;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    const dustColors = new Float32Array(DUST_COUNT * 3);
    const dustVelocities = [];

    for (let i = 0; i < DUST_COUNT; i++) {
      const i3 = i * 3;
      dustPositions[i3] = (Math.random() - 0.5) * 1600;
      dustPositions[i3 + 1] = (Math.random() - 0.5) * 1200;
      dustPositions[i3 + 2] = (Math.random() - 0.5) * 900 + 100; // closer to camera

      dustColors[i3] = 0.7 + Math.random() * 0.3;
      dustColors[i3 + 1] = 0.85 + Math.random() * 0.15;
      dustColors[i3 + 2] = 1.0;

      dustVelocities.push({
        vx: (Math.random() - 0.5) * 0.15,
        vy: 0.08 + Math.random() * 0.18,
        vz: (Math.random() - 0.5) * 0.12
      });
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 4.8,
      map: dustTexture,
      transparent: true,
      vertexColors: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const dustPoints = new THREE.Points(dustGeo, dustMat);
    sceneGroup.add(dustPoints);

    // 5. 3D Celestial Orbital Rings (Atmospheric cosmic observatory architecture)
    const celestialGroup = new THREE.Group();
    sceneGroup.add(celestialGroup);

    // Ring 1: Inner Cyan Orbital Plane
    const ringGeo1 = new THREE.TorusGeometry(480, 0.45, 12, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.15;
    celestialGroup.add(ring1);

    // Ring 2: Mid-field Nebula Purple Orbital Plane
    const ringGeo2 = new THREE.TorusGeometry(720, 0.45, 12, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI * 0.28;
    ring2.rotation.z = Math.PI * 0.2;
    celestialGroup.add(ring2);

    // Ring 3: Outer Distant Starlight Horizon
    const ringGeo3 = new THREE.TorusGeometry(1050, 0.5, 12, 140);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0xe0e7ff,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI * 0.42;
    ring3.rotation.z = -Math.PI * 0.18;
    celestialGroup.add(ring3);

    // Celestial 3D Coordinate Grid: Subtle wireframe icosahedron sphere in distant space
    const celestialGlobeGeo = new THREE.IcosahedronGeometry(620, 2);
    const celestialGlobeMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.045,
      blending: THREE.AdditiveBlending
    });
    const celestialGlobe = new THREE.Mesh(celestialGlobeGeo, celestialGlobeMat);
    celestialGroup.add(celestialGlobe);

    // 6. 3D Meteors / Shooting Stars System
    const meteors = [];
    const MAX_METEORS = 2;
    let lastMeteorTime = performance.now();
    let nextMeteorDelay = 2500 + Math.random() * 3000;

    function createMeteor() {
      const length = 140 + Math.random() * 120;
      const speed = 14 + Math.random() * 10;

      // Start at random top/right 3D coordinate
      const startX = (Math.random() - 0.2) * 1000 + 200;
      const startY = Math.random() * 400 + 200;
      const startZ = (Math.random() - 0.5) * 600;

      // Downward-left trajectory vector
      const dir = new THREE.Vector3(
        -0.8 - Math.random() * 0.3,
        -0.5 - Math.random() * 0.3,
        (Math.random() - 0.5) * 0.4
      ).normalize();

      const lineGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(6); // 2 vertices: head and tail
      // Head
      positions[0] = startX;
      positions[1] = startY;
      positions[2] = startZ;
      // Tail
      positions[3] = startX - dir.x * length;
      positions[4] = startY - dir.y * length;
      positions[5] = startZ - dir.z * length;

      lineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const isGold = Math.random() > 0.45;
      const lineMat = new THREE.LineBasicMaterial({
        color: isGold ? 0xfef08a : 0x7dd3fc,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        linewidth: 2
      });

      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);

      meteors.push({
        line,
        lineGeo,
        lineMat,
        pos: new THREE.Vector3(startX, startY, startZ),
        dir,
        speed,
        length,
        life: 0,
        maxLife: 35 + Math.random() * 25
      });
    }

    // 7. Interactive Parallax & Scroll Depth Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    let targetScrollRatio = 0;
    let currentScrollRatio = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 2; // -1 to 1
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollRatio = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Initial scroll sync
    handleScroll();

    // 8. Animation & Render Loop
    let animationFrameId;
    let lastTime = performance.now();
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = (time) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || pausedRef.current) return;

      const dt = Math.min(40, time - lastTime);
      lastTime = time;

      // Smooth mouse parallax lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Smooth scroll lerp
      currentScrollRatio += (targetScrollRatio - currentScrollRatio) * 0.06;

      // Drive 3D Camera: Mouse tilts & scroll moves camera along Z into space
      camera.position.x = currentMouseX * 130;
      camera.position.y = -currentMouseY * 90;
      // Scroll moves camera forward through the 3D space field (Warp fly-through)
      camera.position.z = 850 - currentScrollRatio * 320;
      camera.lookAt(0, 0, 0);

      // Deep space background image 2.5D optical shift
      if (imgRef.current) {
        const bgShiftX = currentMouseX * 16;
        const bgShiftY = currentMouseY * 12 - currentScrollRatio * 35;
        imgRef.current.style.transform = `scale(1.08) translate3d(${bgShiftX}px, ${bgShiftY}px, 0)`;
      }

      // Continuous 3D celestial rotations
      sceneGroup.rotation.y += 0.00035;
      sceneGroup.rotation.x += 0.00015;

      // Scroll adds an extra subtle rotation to the scene
      sceneGroup.rotation.z = currentScrollRatio * 0.25;

      // Independent rotation for celestial orbital rings & globe
      ring1.rotation.z += 0.002;
      ring2.rotation.y -= 0.0015;
      ring3.rotation.x += 0.001;
      celestialGlobe.rotation.y += 0.0006;
      celestialGlobe.rotation.x -= 0.0004;

      // Drift foreground stardust particles
      const dustPos = dustGeo.attributes.position.array;
      for (let i = 0; i < DUST_COUNT; i++) {
        const i3 = i * 3;
        const v = dustVelocities[i];
        dustPos[i3] += v.vx;
        dustPos[i3 + 1] += v.vy;
        dustPos[i3 + 2] += v.vz;

        // Wrap around bounds
        if (dustPos[i3 + 1] > 700) dustPos[i3 + 1] = -700;
        if (dustPos[i3] > 900) dustPos[i3] = -900;
        if (dustPos[i3] < -900) dustPos[i3] = 900;
      }
      dustGeo.attributes.position.needsUpdate = true;

      // Twinkle luminance modulation
      const t = time * 0.002;
      starMat.size = 3.2 + Math.sin(t) * 0.4;

      // Handle 3D Meteors
      if (time - lastMeteorTime > nextMeteorDelay && meteors.length < MAX_METEORS) {
        createMeteor();
        lastMeteorTime = time;
        nextMeteorDelay = 2800 + Math.random() * 3200;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life++;

        // Advance head position
        m.pos.addScaledVector(m.dir, m.speed);

        // Update line vertices
        const posArr = m.lineGeo.attributes.position.array;
        posArr[0] = m.pos.x;
        posArr[1] = m.pos.y;
        posArr[2] = m.pos.z;

        posArr[3] = m.pos.x - m.dir.x * m.length;
        posArr[4] = m.pos.y - m.dir.y * m.length;
        posArr[5] = m.pos.z - m.dir.z * m.length;

        m.lineGeo.attributes.position.needsUpdate = true;

        // Fade in and out
        const progress = m.life / m.maxLife;
        if (progress < 0.2) {
          m.lineMat.opacity = progress / 0.2;
        } else {
          m.lineMat.opacity = Math.max(0, 1 - (progress - 0.2) / 0.8);
        }

        if (progress >= 1 || m.pos.y < -600 || m.pos.x < -1200) {
          scene.remove(m.line);
          m.lineGeo.dispose();
          m.lineMat.dispose();
          meteors.splice(i, 1);
        }
      }

      // Render the 3D scene
      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup when unmounting
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Dispose meteors
      meteors.forEach((m) => {
        scene.remove(m.line);
        m.lineGeo.dispose();
        m.lineMat.dispose();
      });

      // Dispose geometry and materials
      starGeo.dispose();
      starMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      celestialGlobeGeo.dispose();
      celestialGlobeMat.dispose();
      starTexture.dispose();
      dustTexture.dispose();

      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Layer 0: Photorealistic Hubble / James Webb Deep Space Galaxy & Nebula Panorama */}
      <img
        ref={imgRef}
        src="/cosmic-space-bg.jpg"
        alt="Deep Space Universe"
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.70] contrast-[1.14] transition-transform duration-75 ease-out"
        style={{ transform: 'scale(1.08)' }}
        draggable={false}
      />

      {/* Layer 1: Atmospheric Vignette & Contrast Depth Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(3,3,7,0.35)_65%,rgba(3,3,7,0.85)_100%)]" />

      {/* Layer 2: Full-Viewport Three.js WebGL 3D Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ opacity: 0.92 }}
      />
    </div>
  );
}
