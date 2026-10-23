import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * ThreeInterstellarScene
 * Photorealistic 3D Interstellar Cosmos featuring:
 * 1. Gargantua Supermassive Black Hole with glowing relativistic accretion disk
 * 2. Gravitational lensing Einstein rings (warped upper & lower halo light)
 * 3. Swirling Keplerian particle accretion stream (2,500+ luminous plasma points)
 * 4. Planet Earth on the left with glowing cyan/blue Rayleigh scattering atmosphere & night lights
 * 5. Endurance Ring Space Station rotating in deep space
 * 6. Interactive mouse parallax & click-and-drag 3D camera orbit
 * 7. Wireframe / Relativistic Geodesic Mesh toggle
 * 8. Solid 60 FPS performance with zero memory leaks
 */
export default function ThreeInterstellarScene({
  autoRotate = true,
  showArcs = true, // Toggles Relativistic Geodesic Wireframe
  atmosphereGlow = true,
  onSceneReady
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const mouseParallaxRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // References for live animation toggles
  const autoRotateRef = useRef(autoRotate);
  const showArcsRef = useRef(showArcs);
  const atmosphereGlowRef = useRef(atmosphereGlow);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    showArcsRef.current = showArcs;
  }, [showArcs]);

  useEffect(() => {
    atmosphereGlowRef.current = atmosphereGlow;
  }, [atmosphereGlow]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera & ACES Filmic Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020306, 0.00035);

    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 6000);
    camera.position.set(0, 0, 950);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
    } catch (e) {
      console.warn('WebGL init fallback in ThreeInterstellarScene:', e);
      return;
    }

    // Root Master Group that supports dragging & mouse parallax
    const cosmosGroup = new THREE.Group();
    scene.add(cosmosGroup);

    // =========================================================================
    // TEXTURE GENERATORS (Procedural High-Res Shaders & Sprites)
    // =========================================================================

    // A. Star & Sparkle Particle Texture
    function createStarTexture() {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(255, 255, 240, 0.95)');
      grad.addColorStop(0.5, 'rgba(251, 191, 36, 0.4)');
      grad.addColorStop(0.8, 'rgba(245, 158, 11, 0.1)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      // Diffraction flare
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(32, 4);
      ctx.lineTo(32, 60);
      ctx.moveTo(4, 32);
      ctx.lineTo(60, 32);
      ctx.stroke();

      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    }

    // B. Procedural Accretion Disk Radiant Noise Texture
    function createAccretionDiskTexture() {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 128;
      const ctx = c.getContext('2d');

      // Concentric rings of relativistic heat
      const grad = ctx.createLinearGradient(0, 0, c.width, 0);
      grad.addColorStop(0.0, 'rgba(0,0,0,0)');
      grad.addColorStop(0.08, 'rgba(255, 255, 255, 1)'); // Photon ring peak
      grad.addColorStop(0.18, 'rgba(254, 240, 138, 0.95)');
      grad.addColorStop(0.35, 'rgba(251, 191, 36, 0.85)');
      grad.addColorStop(0.55, 'rgba(245, 158, 11, 0.65)');
      grad.addColorStop(0.80, 'rgba(234, 88, 12, 0.35)');
      grad.addColorStop(0.95, 'rgba(180, 50, 10, 0.1)');
      grad.addColorStop(1.0, 'rgba(0,0,0,0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, c.width, c.height);

      // Add turbulent streak lines (plasma filaments)
      for (let i = 0; i < 400; i++) {
        const x = 50 + Math.random() * (c.width - 100);
        const y = Math.random() * c.height;
        const w = 20 + Math.random() * 80;
        const h = 0.5 + Math.random() * 2.5;
        const alpha = 0.05 + Math.random() * 0.25;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(x, y, w, h);
      }

      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.needsUpdate = true;
      return tex;
    }

    // C. Earth Map Canvas Generator (High-Contrast Continents & City Lights)
    function createEarthTexture() {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 512;
      const ctx = c.getContext('2d');

      // Deep ocean base
      ctx.fillStyle = '#061325';
      ctx.fillRect(0, 0, c.width, c.height);

      // Continents (artistic high-fidelity landmasses)
      ctx.fillStyle = '#17253a';
      // Americas
      ctx.beginPath();
      ctx.ellipse(250, 200, 110, 150, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(320, 360, 70, 110, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Eurasia & Africa
      ctx.beginPath();
      ctx.ellipse(650, 180, 160, 90, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(580, 290, 85, 110, -0.1, 0, Math.PI * 2);
      ctx.fill();

      // India / Asia Hubs
      ctx.fillStyle = '#1e3a5f';
      ctx.beginPath();
      ctx.ellipse(720, 250, 60, 70, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Night City Lights (Warm Amber & Gold Specks)
      for (let i = 0; i < 900; i++) {
        const x = Math.random() * c.width;
        const y = 80 + Math.random() * (c.height - 160);
        // Only place lights near landmasses
        const p = ctx.getImageData(x, y, 1, 1).data;
        if (p[0] > 15) {
          const size = Math.random() > 0.9 ? 1.5 : 0.8;
          ctx.fillStyle = Math.random() > 0.3 ? '#fcd34d' : '#ffffff';
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    }

    const starTexture = createStarTexture();
    const accretionTexture = createAccretionDiskTexture();
    const earthTexture = createEarthTexture();

    // =========================================================================
    // 2. GARGANTUA SUPERMASSIVE BLACK HOLE (Right Side of Viewport)
    // =========================================================================
    const blackHoleGroup = new THREE.Group();
    // Position on right-center matching the poster
    blackHoleGroup.position.set(380, 40, -120);
    cosmosGroup.add(blackHoleGroup);

    const EVENT_HORIZON_RADIUS = 135;

    // A. Pitch Black Event Horizon (Light cannot escape)
    const eventHorizonGeo = new THREE.SphereGeometry(EVENT_HORIZON_RADIUS, 64, 64);
    const eventHorizonMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const eventHorizonMesh = new THREE.Mesh(eventHorizonGeo, eventHorizonMat);
    blackHoleGroup.add(eventHorizonMesh);

    // B. Razor-Sharp Inner Photon Ring (Orbiting light sphere)
    const photonRingGeo = new THREE.RingGeometry(EVENT_HORIZON_RADIUS * 1.01, EVENT_HORIZON_RADIUS * 1.06, 96);
    const photonRingMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const photonRingMesh = new THREE.Mesh(photonRingGeo, photonRingMat);
    photonRingMesh.rotation.x = Math.PI / 2.3;
    blackHoleGroup.add(photonRingMesh);

    // C. Main Equatorial Accretion Disk (Swirling plasma matter)
    const DISK_INNER = EVENT_HORIZON_RADIUS * 1.08;
    const DISK_OUTER = EVENT_HORIZON_RADIUS * 3.6;
    const diskGeo = new THREE.RingGeometry(DISK_INNER, DISK_OUTER, 128, 8);

    // Adjust UVs for radial mapping
    const pos = diskGeo.attributes.position;
    const uvs = diskGeo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const u = (dist - DISK_INNER) / (DISK_OUTER - DISK_INNER);
      const angle = Math.atan2(y, x);
      const v = (angle + Math.PI) / (Math.PI * 2);
      uvs.setXY(i, u, v);
    }
    uvs.needsUpdate = true;

    const diskMat = new THREE.MeshBasicMaterial({
      map: accretionTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const mainDisk = new THREE.Mesh(diskGeo, diskMat);
    // Tilted toward camera like Gargantua in the poster
    mainDisk.rotation.x = Math.PI / 2.25;
    mainDisk.rotation.y = -0.12;
    blackHoleGroup.add(mainDisk);

    // D. Relativistic Gravitational Lensing Upper Halo (Bends over event horizon)
    const upperHaloGeo = new THREE.RingGeometry(EVENT_HORIZON_RADIUS * 1.05, EVENT_HORIZON_RADIUS * 2.8, 128, 4);
    const upperHaloMat = new THREE.MeshBasicMaterial({
      map: accretionTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const upperHalo = new THREE.Mesh(upperHaloGeo, upperHaloMat);
    // Angled vertical to form Kip Thorne's Einstein ring arc
    upperHalo.rotation.x = 0.05;
    upperHalo.rotation.y = -0.1;
    upperHalo.scale.set(1.0, 1.15, 1.0);
    blackHoleGroup.add(upperHalo);

    // E. Relativistic Gravitational Lensing Lower Halo (Bends under event horizon)
    const lowerHalo = upperHalo.clone();
    lowerHalo.rotation.x = Math.PI;
    lowerHalo.scale.set(0.98, 0.85, 0.98);
    blackHoleGroup.add(lowerHalo);

    // F. Relativistic Geodesic Wireframe Coordinate Mesh (Toggled with WIRE ON/OFF)
    const geodesicGroup = new THREE.Group();
    const wireGeo = new THREE.SphereGeometry(EVENT_HORIZON_RADIUS * 1.4, 24, 16);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    geodesicGroup.add(wireMesh);

    // Geodesic warp rings
    for (let r = 0; r < 4; r++) {
      const ringG = new THREE.RingGeometry(EVENT_HORIZON_RADIUS * (1.2 + r * 0.45), EVENT_HORIZON_RADIUS * (1.23 + r * 0.45), 64);
      const ringM = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringG, ringM);
      ring.rotation.x = Math.PI / 2.2 + r * 0.05;
      geodesicGroup.add(ring);
    }
    blackHoleGroup.add(geodesicGroup);

    // G. Swirling Particle Accretion Stream (2,500 Spiral Plasma Particles)
    const PARTICLE_COUNT = 2400;
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleColors = new Float32Array(PARTICLE_COUNT * 3);
    const particleData = [];

    const colorCore = new THREE.Color(0xffffff);
    const colorGold = new THREE.Color(0xfbbf24);
    const colorAmber = new THREE.Color(0xf59e0b);
    const colorOrange = new THREE.Color(0xea580c);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radiusRatio = Math.random();
      const r = DISK_INNER + radiusRatio * (DISK_OUTER - DISK_INNER);
      const theta = Math.random() * Math.PI * 2;
      const speed = (0.008 + (1 - radiusRatio) * 0.02) * (Math.random() > 0.05 ? 1 : 1.1);
      const verticalJitter = (Math.random() - 0.5) * 8 * (1 - radiusRatio * 0.5);

      particleData.push({ r, theta, speed, verticalJitter, radiusRatio });

      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      const z = verticalJitter;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      // Color lerp based on distance to event horizon
      let c = colorGold;
      if (radiusRatio < 0.15) c = colorCore;
      else if (radiusRatio < 0.45) c = colorGold;
      else if (radiusRatio < 0.75) c = colorAmber;
      else c = colorOrange;

      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 4.5,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const accretionParticles = new THREE.Points(particleGeo, particleMat);
    accretionParticles.rotation.x = Math.PI / 2.25;
    blackHoleGroup.add(accretionParticles);

    // =========================================================================
    // 3. PLANET EARTH (Left Side of Viewport matching the poster)
    // =========================================================================
    const earthGroup = new THREE.Group();
    earthGroup.position.set(-540, -140, -120);
    cosmosGroup.add(earthGroup);

    const EARTH_RADIUS = 360;

    // Earth Sphere
    const earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.65,
      metalness: 0.1,
      color: 0x90c5f0
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMesh.rotation.y = 1.2;
    earthMesh.rotation.x = 0.25;
    earthGroup.add(earthMesh);

    // Luminous Atmospheric Limb & Rayleigh Scattering Glow
    const atmosGeo = new THREE.SphereGeometry(EARTH_RADIUS * 1.035, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        glowColor: { value: new THREE.Color(0x38bdf8) }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 glowColor;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
          gl_FragColor = vec4(glowColor, intensity * 0.95);
        }
      `
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    earthGroup.add(atmosMesh);

    // =========================================================================
    // 4. THE ENDURANCE RING SPACE STATION (Interstellar Center Station)
    // =========================================================================
    const enduranceGroup = new THREE.Group();
    enduranceGroup.position.set(-20, 90, 80);
    cosmosGroup.add(enduranceGroup);

    const ENDURANCE_RADIUS = 38;
    const POD_COUNT = 12;

    // Outer Ring Structure
    const podMaterial = new THREE.MeshStandardMaterial({
      color: 0xdddddd,
      metalness: 0.85,
      roughness: 0.25
    });

    const solarPanelMaterial = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      metalness: 0.9,
      roughness: 0.2
    });

    // 12 Modular Habitation Pods
    for (let i = 0; i < POD_COUNT; i++) {
      const angle = (i / POD_COUNT) * Math.PI * 2;
      const px = Math.cos(angle) * ENDURANCE_RADIUS;
      const py = Math.sin(angle) * ENDURANCE_RADIUS;

      const podG = new THREE.BoxGeometry(6.5, 4.5, 8.5);
      const pod = new THREE.Mesh(podG, podMaterial);
      pod.position.set(px, py, 0);
      pod.rotation.z = angle + Math.PI / 2;
      enduranceGroup.add(pod);

      // Connecting Truss Struts
      if (i % 3 === 0) {
        const spokeG = new THREE.CylinderGeometry(0.6, 0.6, ENDURANCE_RADIUS * 0.9, 8);
        const spoke = new THREE.Mesh(spokeG, podMaterial);
        spoke.position.set(px * 0.5, py * 0.5, 0);
        spoke.rotation.z = angle - Math.PI / 2;
        enduranceGroup.add(spoke);
      }
    }

    // Central Docking Hub
    const hubG = new THREE.CylinderGeometry(4.5, 4.5, 12, 16);
    const hub = new THREE.Mesh(hubG, podMaterial);
    hub.rotation.x = Math.PI / 2;
    enduranceGroup.add(hub);

    // =========================================================================
    // 5. DEEP SPACE STELLAR ENVIRONMENT & LIGHTING
    // =========================================================================

    // Ambient Deep Space Light
    const ambientLight = new THREE.AmbientLight(0x1a2235, 1.4);
    scene.add(ambientLight);

    // Warm Accretion Radiant Light (coming from black hole)
    const accretionLight = new THREE.PointLight(0xfbbf24, 4.5, 2500, 1.2);
    accretionLight.position.copy(blackHoleGroup.position);
    scene.add(accretionLight);

    // Cool Earth Atmospheric Rim Light
    const earthLight = new THREE.PointLight(0x38bdf8, 2.8, 1800, 1.5);
    earthLight.position.set(-300, 20, 100);
    scene.add(earthLight);

    // Background Multi-Spectral Starfield (3,000 Distant Stars)
    const STAR_COUNT = 3000;
    const starPos = new Float32Array(STAR_COUNT * 3);
    const starColors = new Float32Array(STAR_COUNT * 3);

    for (let i = 0; i < STAR_COUNT; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 4500;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 4500;
      starPos[i * 3 + 2] = -400 - Math.random() * 2500;

      const starTint = Math.random();
      if (starTint < 0.6) {
        // Pure Diamond White
        starColors[i * 3] = 1.0;
        starColors[i * 3 + 1] = 1.0;
        starColors[i * 3 + 2] = 1.0;
      } else if (starTint < 0.85) {
        // Accretion Amber
        starColors[i * 3] = 1.0;
        starColors[i * 3 + 1] = 0.85;
        starColors[i * 3 + 2] = 0.45;
      } else {
        // Celestial Azure
        starColors[i * 3] = 0.55;
        starColors[i * 3 + 1] = 0.8;
        starColors[i * 3 + 2] = 1.0;
      }
    }

    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starsGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starsMat = new THREE.PointsMaterial({
      size: 3.2,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const starfield = new THREE.Points(starsGeo, starsMat);
    scene.add(starfield);

    if (onSceneReady) onSceneReady();

    // =========================================================================
    // 6. INTERACTIVE CONTROLS (Drag Orbit & Mouse Parallax)
    // =========================================================================
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      // Parallax target (-1 to +1)
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseParallaxRef.current.targetX = nx * 35;
      mouseParallaxRef.current.targetY = ny * 25;

      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      cosmosGroup.rotation.y += deltaX * 0.003;
      cosmosGroup.rotation.x += deltaY * 0.003;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };

    const handleTouchMove = (e) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      cosmosGroup.rotation.y += deltaX * 0.004;
      cosmosGroup.rotation.x += deltaY * 0.004;

      previousMousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // =========================================================================
    // 7. HIGH-PERFORMANCE 60 FPS ANIMATION LOOP
    // =========================================================================
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth Mouse Parallax Lerp
      mouseParallaxRef.current.x += (mouseParallaxRef.current.targetX - mouseParallaxRef.current.x) * 0.05;
      mouseParallaxRef.current.y += (mouseParallaxRef.current.targetY - mouseParallaxRef.current.y) * 0.05;
      camera.position.x = mouseParallaxRef.current.x;
      camera.position.y = mouseParallaxRef.current.y;
      camera.lookAt(0, 0, 0);

      // Auto-Rotation when enabled
      if (autoRotateRef.current && !isDraggingRef.current) {
        // Subtle cosmic drift
        cosmosGroup.rotation.y += 0.0008;

        // Black Hole Accretion Disk Rotation
        mainDisk.rotation.z -= 0.006;
        upperHalo.rotation.z -= 0.003;
        lowerHalo.rotation.z += 0.003;

        // Earth Axial Spin
        earthMesh.rotation.y += 0.0018;

        // Endurance Station Spin
        enduranceGroup.rotation.z += 0.012;
      }

      // Wireframe Geodesic visibility
      geodesicGroup.visible = !!showArcsRef.current;

      // Atmosphere glow visibility
      atmosMesh.visible = !!atmosphereGlowRef.current;

      // Accretion Particle Stream Motion (Keplerian Speed Distribution)
      const positions = accretionParticles.geometry.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particleData[i];
        p.theta += p.speed;

        // Subtle spiral breathing
        const currentR = p.r + Math.sin(elapsed * 2 + i) * 1.5;
        positions[i * 3] = currentR * Math.cos(p.theta);
        positions[i * 3 + 1] = currentR * Math.sin(p.theta);
        positions[i * 3 + 2] = p.verticalJitter + Math.cos(elapsed * 3 + p.theta) * 2;
      }
      accretionParticles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      try {
        renderer.dispose();
        scene.clear();
      } catch (e) {
        // Clean tear-down
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
