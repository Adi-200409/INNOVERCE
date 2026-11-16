import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { preloadShuttleModel, getCachedShuttleModel } from '../utils/shuttleLoader';

/**
 * TimelineSpaceship
 * 
 * Prominent, high-visibility rendering of the Nexus-1 Space Shuttle flying live along the Timeline spine.
 * Enlarged, heroic scale with vibrant cosmic lighting, high-contrast white & black thermal tiles,
 * cyan cockpit visor, twin navigation strobes, and roaring tri-plasma rocket thrusters.
 */
export default function TimelineSpaceship({ velocity = 0 }) {
  const mountRef = useRef(null);
  const [webGlReady, setWebGlReady] = useState(false);
  const velocityRef = useRef(velocity);

  useEffect(() => {
    velocityRef.current = velocity;
  }, [velocity]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId = null;
    let renderer = null;
    let scene = null;
    let camera = null;
    let shipGroup = null;
    let flameGroup = null;
    const flames = [];

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);

    try {
      scene = new THREE.Scene();
      
      // Close-up perspective camera for bold, heroic presence
      const width = 80;
      const height = 96;
      camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
      camera.position.set(0, 0.18, 1.38);
      camera.lookAt(0, -0.06, 0);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.45;
      container.appendChild(renderer.domElement);

      // High-intensity cosmic illumination ensuring the white shuttle body is brilliantly visible
      const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
      scene.add(ambientLight);

      // Sunlight striking the topside of the shuttle
      const sunLight = new THREE.DirectionalLight(0xffffff, 3.8);
      sunLight.position.set(-1.0, 3.0, 3.5);
      scene.add(sunLight);

      // Vivid cyan cosmic rim lighting along the wings
      const cyanRim = new THREE.DirectionalLight(0x00e5ff, 2.4);
      cyanRim.position.set(2.5, -1.0, 2.0);
      scene.add(cyanRim);

      // Engine thruster warm glow
      const engineLight = new THREE.PointLight(0xff6600, 4.5, 5);
      engineLight.position.set(0, 0.45, 0.15);
      scene.add(engineLight);

      // Root ship container
      shipGroup = new THREE.Group();
      scene.add(shipGroup);

      // Shuttle Model Wrapper:
      // Rotated 90 deg around X so nose points straight DOWN (-Y) with cockpit facing camera (+Z)
      const modelWrapper = new THREE.Group();
      modelWrapper.rotation.x = Math.PI / 2;
      // Enlarged heroic scale: 0.70 (over 2.5x larger than original)
      modelWrapper.scale.set(0.70, 0.70, 0.70);
      shipGroup.add(modelWrapper);

      // High-detail procedural delta hull fallback while OBJ loads
      const proceduralHull = new THREE.Group();
      const hullMat = new THREE.MeshStandardMaterial({
        color: 0xf4f4f5,
        metalness: 0.35,
        roughness: 0.30
      });
      const darkMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        metalness: 0.20,
        roughness: 0.60
      });

      // Fuselage
      const coneGeo = new THREE.ConeGeometry(0.19, 0.96, 16);
      coneGeo.rotateX(Math.PI / 2);
      proceduralHull.add(new THREE.Mesh(coneGeo, hullMat));

      // Nose cap (black thermal tiles)
      const noseGeo = new THREE.ConeGeometry(0.09, 0.24, 16);
      noseGeo.rotateX(Math.PI / 2);
      noseGeo.translate(0, 0, 0.40);
      proceduralHull.add(new THREE.Mesh(noseGeo, darkMat));

      // Delta Wings
      const wingGeo = new THREE.BoxGeometry(0.82, 0.03, 0.52);
      wingGeo.translate(0, -0.04, -0.12);
      proceduralHull.add(new THREE.Mesh(wingGeo, hullMat));

      // Wing leading edges (black tiles)
      const leadingGeo = new THREE.BoxGeometry(0.84, 0.035, 0.08);
      leadingGeo.translate(0, -0.04, 0.12);
      proceduralHull.add(new THREE.Mesh(leadingGeo, darkMat));

      // Vertical Stabilizer / Tail Fin
      const finGeo = new THREE.BoxGeometry(0.025, 0.26, 0.26);
      finGeo.translate(0, 0.14, -0.32);
      proceduralHull.add(new THREE.Mesh(finGeo, hullMat));

      // Cockpit canopy (cyan visor)
      const visorGeo = new THREE.BoxGeometry(0.08, 0.05, 0.14);
      visorGeo.translate(0, 0.10, 0.22);
      const visorMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
      proceduralHull.add(new THREE.Mesh(visorGeo, visorMat));

      modelWrapper.add(proceduralHull);

      // Attach detailed 3D OBJ model once loaded
      const attachCached = (obj) => {
        if (!obj) return;
        const clone = obj.clone(true);
        clone.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.metalness = 0.35;
            child.material.roughness = 0.30;
            if (child.material.color) {
              child.material.color.set(0xffffff);
            }
            child.material.needsUpdate = true;
          }
        });
        if (proceduralHull.parent) {
          modelWrapper.remove(proceduralHull);
        }
        modelWrapper.add(clone);
        setWebGlReady(true);
      };

      const cached = getCachedShuttleModel();
      if (cached) {
        attachCached(cached);
      } else {
        preloadShuttleModel().then((obj) => {
          if (obj) attachCached(obj);
        });
      }

      // Three supersonic flame thrusters pointing UP (+Y) from the tail
      flameGroup = new THREE.Group();
      shipGroup.add(flameGroup);

      const createThruster = (x, y, z) => {
        const eng = new THREE.Group();
        eng.position.set(x, y, z);

        // Core white-yellow flame cone
        const coreGeo = new THREE.ConeGeometry(0.055, 0.52, 12, 1, true);
        coreGeo.translate(0, 0.26, 0); // cone points in +Y
        const coreMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        eng.add(coreMesh);

        // Mid incandescent amber flame jet
        const midGeo = new THREE.ConeGeometry(0.095, 0.85, 12, 1, true);
        midGeo.translate(0, 0.42, 0);
        const midMat = new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        const midMesh = new THREE.Mesh(midGeo, midMat);
        eng.add(midMesh);

        // Outer red-orange plasma mantle
        const outerGeo = new THREE.ConeGeometry(0.13, 1.15, 12, 1, true);
        outerGeo.translate(0, 0.57, 0);
        const outerMat = new THREE.MeshBasicMaterial({
          color: 0xef4444,
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        const outerMesh = new THREE.Mesh(outerGeo, outerMat);
        eng.add(outerMesh);

        flameGroup.add(eng);
        return { eng, core: coreMesh, mid: midMesh, outer: outerMesh };
      };

      // Engine layout scaled for 0.70 shuttle scale:
      // x: +/- 0.115 * 0.70 = +/- 0.080
      // y: +0.68 * 0.70 = +0.476
      // z: ~0.02
      flames.push(createThruster(-0.080, 0.46, 0.02));
      flames.push(createThruster(0.080, 0.46, 0.02));
      flames.push(createThruster(0.0, 0.49, 0.08));

      // Render Loop (Pauses when offscreen or tab hidden to free GPU resources)
      const animate = (time) => {
        animId = requestAnimationFrame(animate);
        if (!isVisible || document.hidden) return;
        const t = time * 0.001;

        // Dynamic throttle from scroll velocity
        const throttle = 1.0 + Math.min(2.5, velocityRef.current * 0.08);
        engineLight.intensity = 3.5 + throttle * 2.0;

        // Animate flame flicker and scale
        flames.forEach((flame, idx) => {
          const off = idx * 1.8;
          const flk = Math.sin(t * 18 + off) * 0.08;
          const scaleY = (1.0 + flk) * (0.95 + throttle * 0.45);
          const scaleXZ = 1.0 + Math.cos(t * 15 + off) * 0.06;
          flame.core.scale.set(scaleXZ, scaleY, scaleXZ);
          flame.mid.scale.set(scaleXZ, scaleY * 1.08, scaleXZ);
          flame.outer.scale.set(scaleXZ, scaleY * 1.15, scaleXZ);
        });

        // Aerodynamic banking & gentle hover wobble
        const wobble = Math.sin(t * 3.5) * 0.025;
        const bank = Math.max(-0.15, Math.min(0.15, velocityRef.current * 0.015));
        shipGroup.rotation.z = THREE.MathUtils.lerp(shipGroup.rotation.z, wobble + bank, 0.15);

        // Subtle pitch forward on speed
        const pitch = Math.min(0.12, velocityRef.current * 0.008);
        shipGroup.rotation.x = THREE.MathUtils.lerp(shipGroup.rotation.x, pitch, 0.15);

        renderer.render(scene, camera);
      };

      animate(performance.now());
      requestAnimationFrame(() => setWebGlReady(true));
    } catch (e) {
      console.warn('TimelineSpaceship WebGL fallback to SVG:', e);
      requestAnimationFrame(() => setWebGlReady(false));
    }

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center select-none pointer-events-none">
      {/* 1. Triple Supersonic Rocket Thruster Exhaust Plumes (Steady thrust firing upwards from nozzles) */}
      <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 z-0">
        {/* Soft Non-Blinking Engine Thermal Glow behind nozzles */}
        <div
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-10 rounded-full blur-[4px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at bottom, rgba(245, 158, 11, 0.75) 0%, rgba(239, 68, 68, 0.25) 55%, transparent 80%)'
          }}
        />

        {/* Center Main Rocket Engine Plume (Directly meets the vertical timeline line) */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[4px] rounded-t-full transition-all duration-75"
          style={{
            height: `${Math.min(55, 28 + velocity * 0.7)}px`,
            background: 'linear-gradient(to top, #ffffff 0%, #fbbf24 35%, #f59e0b 70%, transparent 100%)',
            boxShadow: '0 0 10px #f59e0b, 0 0 20px rgba(245, 158, 11, 0.8)'
          }}
        />

        {/* Left Engine Plume */}
        <div
          className="absolute bottom-0 left-[calc(50%-8.5px)] -translate-x-1/2 w-[3px] rounded-t-full transition-all duration-75"
          style={{
            height: `${Math.min(42, 20 + velocity * 0.5)}px`,
            background: 'linear-gradient(to top, #ffffff 0%, #fbbf24 40%, #f59e0b 75%, transparent 100%)',
            boxShadow: '0 0 8px #f59e0b'
          }}
        />

        {/* Right Engine Plume */}
        <div
          className="absolute bottom-0 left-[calc(50%+8.5px)] -translate-x-1/2 w-[3px] rounded-t-full transition-all duration-75"
          style={{
            height: `${Math.min(42, 20 + velocity * 0.5)}px`,
            background: 'linear-gradient(to top, #ffffff 0%, #fbbf24 40%, #f59e0b 75%, transparent 100%)',
            boxShadow: '0 0 8px #f59e0b'
          }}
        />
      </div>

      {/* 2. Three.js WebGL Canvas Mount */}
      <div
        ref={mountRef}
        className={`w-20 h-24 relative z-10 flex items-center justify-center transition-opacity duration-300 ${
          webGlReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 3. High-Fidelity SVG Fallback (Always crisp, bold & heroic) */}
      {!webGlReady && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <svg
            className="w-16 h-20 drop-shadow-[0_0_16px_rgba(245,158,11,0.9)]"
            viewBox="0 0 100 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Defs for gradients */}
            <defs>
              <linearGradient id="fuselageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e4e4e7" />
                <stop offset="35%" stopColor="#ffffff" />
                <stop offset="65%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#d4d4d8" />
              </linearGradient>
              <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4d4d8" />
                <stop offset="50%" stopColor="#f4f4f5" />
                <stop offset="100%" stopColor="#d4d4d8" />
              </linearGradient>
            </defs>

            {/* Delta Wings */}
            <path
              d="M50 20 L30 75 L12 94 L34 94 L50 96 L66 94 L88 94 L70 75 Z"
              fill="url(#wingGrad)"
              stroke="#27272a"
              strokeWidth="2"
            />

            {/* Black Thermal Leading Wing Edges */}
            <path
              d="M50 20 L30 75 L12 94 L18 94 L34 77 L50 26 L66 77 L82 94 L88 94 L70 75 Z"
              fill="#18181b"
            />

            {/* Main Fuselage Body */}
            <path
              d="M50 105 C44 95 40 70 40 40 C40 28 44 18 50 18 C56 18 60 28 60 40 C60 70 56 95 50 105 Z"
              fill="url(#fuselageGrad)"
              stroke="#52525b"
              strokeWidth="1.5"
            />

            {/* Pointed Black Nose Cap (pointing down) */}
            <path
              d="M50 110 C46.5 102 44.5 94 44.5 90 L55.5 90 C55.5 94 53.5 102 50 110 Z"
              fill="#09090b"
            />

            {/* Cockpit Canopy Windows (Glowing Cyan Visor) */}
            <path
              d="M47 82 L44 76 L47 73 L50 74.5 L53 73 L56 76 L53 82 Z"
              fill="#00e5ff"
              stroke="#38bdf8"
              strokeWidth="1"
            />

            {/* Vertical Tail Fin Stabilizer */}
            <path
              d="M48.5 28 L51.5 28 L51.5 58 L48.5 58 Z"
              fill="#e4e4e7"
              stroke="#71717a"
              strokeWidth="1"
            />

            {/* Twin OMS Shoulder Pods */}
            <ellipse cx="37" cy="32" rx="3" ry="8" fill="#a1a1aa" />
            <ellipse cx="63" cy="32" rx="3" ry="8" fill="#a1a1aa" />

            {/* Tri-Rocket Engine Nozzles at Tail */}
            <circle cx="43" cy="24" r="3.5" fill="#27272a" stroke="#fbbf24" strokeWidth="1.2" />
            <circle cx="57" cy="24" r="3.5" fill="#27272a" stroke="#fbbf24" strokeWidth="1.2" />
            <circle cx="50" cy="19" r="3.5" fill="#27272a" stroke="#fbbf24" strokeWidth="1.2" />
          </svg>
        </div>
      )}
    </div>
  );
}
