import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { getCachedShuttleModel, preloadShuttleModel } from '../utils/shuttleLoader';

// National hubs with live user node (KLS GIT)
const DEFAULT_HUBS = [
  { id: 'user', name: 'KLS GIT', lat: 15.8281, lng: 74.4889, isUser: true },
  { id: 'blr', name: 'BENGALURU', lat: 12.9716, lng: 77.5946 },
  { id: 'mum', name: 'MUMBAI', lat: 19.0760, lng: 72.8777 },
  { id: 'del', name: 'DELHI NCR', lat: 28.6139, lng: 77.2090 },
  { id: 'hyd', name: 'HYDERABAD', lat: 17.3850, lng: 78.4867 }
];

function latLngToVector3(lat, lng, radius, altitude = 0) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const r = radius + altitude;

  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

// Generate circular, antialiased point particle texture matching WeEvolveIT's solid beads
function createDotTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.95)');
  gradient.addColorStop(0.9, 'rgba(240, 245, 255, 0.4)');
  gradient.addColorStop(1, 'rgba(200, 220, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(32, 32, 30, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Generate glowing celestial star sprite texture with soft radial falloff and 4-point cross sparkle
function createStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.18, 'rgba(255, 255, 255, 0.9)');
  gradient.addColorStop(0.42, 'rgba(235, 245, 255, 0.42)');
  gradient.addColorStop(0.72, 'rgba(180, 210, 255, 0.12)');
  gradient.addColorStop(1, 'rgba(150, 180, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  // Subtle 4-point cross diffraction flare
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(32, 6);
  ctx.lineTo(32, 58);
  ctx.moveTo(6, 32);
  ctx.lineTo(58, 32);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Load and initialize the Nexus-1 Space Shuttle 3D Model with PBR materials & tri-plasma thrusters
function createNexus1SpaceShuttle(onLoaded) {
  const ship = new THREE.Group();

  // Texture Loader for PBR textures
  const texLoader = new THREE.TextureLoader();
  const baseColorMap = texLoader.load('/nexus-1-space-shuttle/space_shuttle_3d_model_basecolor.JPEG');
  baseColorMap.colorSpace = THREE.SRGBColorSpace;
  const normalMap = texLoader.load('/nexus-1-space-shuttle/space_shuttle_3d_model_normal.JPEG');
  const metallicMap = texLoader.load('/nexus-1-space-shuttle/space_shuttle_3d_model_metallic.JPEG');
  const roughnessMap = texLoader.load('/nexus-1-space-shuttle/space_shuttle_3d_model_roughness.JPEG');

  const shuttleMaterial = new THREE.MeshStandardMaterial({
    map: baseColorMap,
    normalMap: normalMap,
    metalnessMap: metallicMap,
    roughnessMap: roughnessMap,
    metalness: 0.88,
    roughness: 0.35,
    envMapIntensity: 1.6
  });

  // Inner wrapper to orient model: nose along +Z, tail along -Z, wings along X
  const modelWrapper = new THREE.Group();
  ship.add(modelWrapper);

  const attachModel = (obj) => {
    if (!obj) return;
    const clone = obj.clone(true);
    modelWrapper.add(clone);
    if (onLoaded) onLoaded(clone);
  };

  const cached = getCachedShuttleModel();
  if (cached) {
    attachModel(cached);
  } else {
    preloadShuttleModel().then((obj) => {
      if (obj) attachModel(obj);
    });
  }

  // Helper to construct realistic multi-layer Red & Yellow fire flame thrusters
  const createFireThruster = (x, y, z) => {
    const engineGroup = new THREE.Group();
    engineGroup.position.set(x, y, z);

    // 1. Core Yellow Incandescent Flame (Hot combustion core)
    const coreGeo = new THREE.ConeGeometry(0.024, 0.28, 16, 1, true);
    coreGeo.translate(0, 0.14, 0);
    coreGeo.rotateX(-Math.PI / 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffea00,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    engineGroup.add(coreMesh);

    // 2. Mid Burning Orange Flame Jet
    const midGeo = new THREE.ConeGeometry(0.040, 0.44, 16, 1, true);
    midGeo.translate(0, 0.22, 0);
    midGeo.rotateX(-Math.PI / 2);
    const midMat = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const midMesh = new THREE.Mesh(midGeo, midMat);
    engineGroup.add(midMesh);

    // 3. Outer Crimson Red Fire Flare Envelope
    const outerGeo = new THREE.ConeGeometry(0.058, 0.65, 16, 1, true);
    outerGeo.translate(0, 0.325, 0);
    outerGeo.rotateX(-Math.PI / 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xff1e00,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    engineGroup.add(outerMesh);

    // 4. Glowing Fire Disc at Nozzle Exit
    const discGeo = new THREE.RingGeometry(0.005, 0.038, 16);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0xffdd44,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const discMesh = new THREE.Mesh(discGeo, discMat);
    engineGroup.add(discMesh);

    // Anchor for trailing exhaust particle emission
    const anchor = new THREE.Object3D();
    anchor.position.set(0, 0, 0);
    engineGroup.add(anchor);

    ship.add(engineGroup);

    return {
      group: engineGroup,
      core: coreMesh,
      mid: midMesh,
      outer: outerMesh,
      disc: discMesh,
      anchor
    };
  };

  // Space Shuttle 3 Main Rocket Engines (Left, Right, Top Center)
  // Precision aligned with shuttle OBJ rear bulkhead nozzles
  const leftEngine = createFireThruster(-0.058, -0.12, -0.42);
  const rightEngine = createFireThruster(0.057, -0.12, -0.42);
  const topEngine = createFireThruster(0.000, -0.015, -0.41);

  // Dynamic warm firelight illuminating the engine bells and rear tiles
  const thrusterLight = new THREE.PointLight(0xff5500, 3.2, 4.0);
  thrusterLight.position.set(0, -0.08, -0.45);
  ship.add(thrusterLight);

  // Decrease spaceship size to sleek, elegant proportions
  ship.scale.set(0.48, 0.48, 0.48);

  return {
    group: ship,
    engines: [leftEngine, rightEngine, topEngine],
    leftNozzleAnchor: leftEngine.anchor,
    rightNozzleAnchor: rightEngine.anchor,
    topNozzleAnchor: topEngine.anchor,
    thrusterLight
  };
}

export default function ThreeEarthGlobe({
  autoRotate = true,
  atmosphereGlow = true,
  showArcs = true
}) {
  const mountRef = useRef(null);
  const [activeNode, setActiveNode] = useState(DEFAULT_HUBS[0]);
  const [badgeScreenPos, setBadgeScreenPos] = useState({ x: 0, y: 0, visible: false });
  const [isDragging, setIsDragging] = useState(false);
  const globeGroupRef = useRef(null);

  // Primary Hackathon Hub: KLS GIT (KLS Gogte Institute of Technology, Belagavi)
  useEffect(() => {
    setActiveNode({
      id: 'user',
      name: 'KLS GIT',
      lat: 15.8281,
      lng: 74.4889,
      isUser: true
    });
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    // Camera positioned with clean cosmic headroom above Earth for the navbar
    camera.position.set(0, 0.22, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Master Globe Group
    const globeGroup = new THREE.Group();
    // Initial rotation perfectly positions active hub in upper-right quadrant matching screenshot
    globeGroup.rotation.x = 0.28;
    globeGroup.rotation.y = -0.38;
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    const globeRadius = 1.95;

    // 1.5 3D Moving Celestial Starfield (1,400 multi-tier cosmic stars with drift & twinkle)
    const starsGroup = new THREE.Group();
    scene.add(starsGroup);

    const STARS_COUNT = 1800;
    const starPositions = new Float32Array(STARS_COUNT * 3);
    const starColors = new Float32Array(STARS_COUNT * 3);
    const starData = [];

    const STAR_COLOR_PALETTE = [
      new THREE.Color(1.0, 1.0, 1.0),        // Pure Diamond White
      new THREE.Color(0.95, 0.98, 1.0),       // Crystal Silver
      new THREE.Color(1.0, 0.92, 0.65),       // Warm Amber Gold
      new THREE.Color(0.98, 0.80, 0.40),       // Celestial Gold
      new THREE.Color(0.55, 0.88, 1.0),       // Ice Cyan
      new THREE.Color(0.85, 0.70, 1.0)        // Cosmic Lilac
    ];

    for (let i = 0; i < STARS_COUNT; i++) {
      let x = (Math.random() - 0.5) * 58;
      let y = (Math.random() - 0.5) * 44;
      let z = -32 + Math.random() * 38;

      const dist2D = Math.sqrt(x * x + y * y);
      if (dist2D < globeRadius * 1.15 && Math.abs(z) < 4) {
        const angle = Math.random() * Math.PI * 2;
        const pushDist = globeRadius * 1.25 + Math.random() * 12;
        x = Math.cos(angle) * pushDist;
        y = Math.sin(angle) * pushDist;
      }

      starPositions[i * 3] = x;
      starPositions[i * 3 + 1] = y;
      starPositions[i * 3 + 2] = z;

      const chosenColor = STAR_COLOR_PALETTE[Math.floor(Math.random() * STAR_COLOR_PALETTE.length)];
      const baseBright = 0.5 + Math.random() * 0.5;

      starColors[i * 3] = chosenColor.r * baseBright;
      starColors[i * 3 + 1] = chosenColor.g * baseBright;
      starColors[i * 3 + 2] = chosenColor.b * baseBright;

      const driftSpeed = 0.002 + Math.random() * 0.005;
      const driftAngle = Math.PI * 0.78 + (Math.random() - 0.5) * 0.5;

      starData.push({
        baseColor: chosenColor,
        baseBright,
        vx: Math.cos(driftAngle) * driftSpeed,
        vy: Math.sin(driftAngle) * driftSpeed,
        vz: (Math.random() - 0.5) * 0.0015,
        twinkleSpeed: 0.002 + Math.random() * 0.004,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }

    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starSpriteTexture = createStarTexture();
    const starsMat = new THREE.PointsMaterial({
      size: 0.16,
      map: starSpriteTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.98,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starsMesh = new THREE.Points(starsGeo, starsMat);
    starsMesh.renderOrder = 0;
    starsGroup.add(starsMesh);

    // 2. Solid Charcoal Smoke Inner Core (Occludes back side points)
    const coreGeo = new THREE.SphereGeometry(globeRadius * 0.992, 64, 64);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x08080c,
      depthWrite: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.renderOrder = 0;
    globeGroup.add(coreMesh);

    // 3. Crisp Silver-White Atmosphere Rim Halo (Exact match to WeEvolveIT screenshot)
    const atmosphereGeo = new THREE.SphereGeometry(globeRadius * 1.09, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
          gl_FragColor = vec4(0.90, 0.92, 0.97, 1.0) * intensity * 1.1;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    atmosphereMesh.renderOrder = 4;
    scene.add(atmosphereMesh);

    // 4. Pure Silver/White Dotted Continents (High Density & High Brilliance)
    const dotTexture = createDotTexture();
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      map: dotTexture,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending
    });

    let particlesMesh = null;

    const buildMeshFromData = (imgData, imgW, imgH) => {
      const positions = [];
      const colors = [];

      const numLat = 280;
      const numLng = 560;

      for (let i = 0; i < numLat; i++) {
        const lat = 90 - (i / numLat) * 180;
        const phi = (90 - lat) * (Math.PI / 180);
        const circumferenceFactor = Math.sin(phi);
        const stepsLng = Math.max(16, Math.floor(numLng * circumferenceFactor));

        for (let j = 0; j < stepsLng; j++) {
          const lng = -180 + (j / stepsLng) * 360;
          let isLand = false;

          if (imgData && imgW > 0 && imgH > 0) {
            const x = Math.min(imgW - 1, Math.max(0, Math.floor(((lng + 180) / 360) * imgW)));
            const y = Math.min(imgH - 1, Math.max(0, Math.floor(((90 - lat) / 180) * imgH)));
            const pixelIndex = (y * imgW + x) * 4;
            const r = imgData[pixelIndex];
            const g = imgData[pixelIndex + 1];
            const b = imgData[pixelIndex + 2];
            const brightness = (r + g + b) / 3;
            // Land is black in earth-water.png (< 120), so isLand is true for land and water is black (no dots)
            isLand = brightness < 120;
          } else {
            // High-detail procedural continental coordinates
            const isNA = lat > 15 && lat < 72 && lng > -168 && lng < -50;
            const isSA = lat > -56 && lat < 12 && lng > -82 && lng < -34;
            const isEU = lat > 36 && lat < 72 && lng > -10 && lng < 45;
            const isAF = lat > -36 && lat < 38 && lng > -18 && lng < 52;
            const isAS = lat > 5 && lat < 75 && lng > 45 && lng < 152;
            const isAU = lat > -45 && lat < -10 && lng > 112 && lng < 155;
            const isAntarctica = lat < -65;
            isLand = isNA || isSA || isEU || isAF || isAS || isAU || isAntarctica;
          }

          if (isLand) {
            const pos = latLngToVector3(lat, lng, globeRadius);
            positions.push(pos.x, pos.y, pos.z);

            // Glistening pure white/silver dots
            const bVal = 0.92 + Math.random() * 0.08;
            colors.push(bVal, bVal, bVal);
          }
        }
      }

      console.log('Rendered continent particles:', positions.length / 3);

      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      if (particlesMesh) {
        globeGroup.remove(particlesMesh);
        particlesMesh.geometry.dispose();
      }

      particlesMesh = new THREE.Points(geom, particleMaterial);
      particlesMesh.renderOrder = 2;
      globeGroup.add(particlesMesh);
    };

    // 1. Build procedural immediately so screen is never empty
    buildMeshFromData(null, 0, 0);

    // 2. Load actual high-res landmask and rebuild geometry cleanly
    const maskImg = new Image();
    maskImg.crossOrigin = 'anonymous';
    maskImg.src = '/earth-water.png';
    maskImg.onload = () => {
      try {
        const offscreen = document.createElement('canvas');
        offscreen.width = maskImg.width || 1600;
        offscreen.height = maskImg.height || 800;
        const ctx = offscreen.getContext('2d');
        ctx.drawImage(maskImg, 0, 0);
        const imgData = ctx.getImageData(0, 0, offscreen.width, offscreen.height).data;
        buildMeshFromData(imgData, offscreen.width, offscreen.height);
      } catch (err) {
        console.warn('Canvas mask build error:', err);
      }
    };

    // 5. Active Node, Magnetic Radiating Loops & Laser Beam (Exact WeEvolveIT Feature)
    const arcsGroup = new THREE.Group();
    globeGroup.add(arcsGroup);

    const userNodePos = latLngToVector3(activeNode.lat, activeNode.lng, globeRadius);

    // Glowing Golden Amber Beacon Pin (Orbit24 Active Node)
    const beaconGeo = new THREE.SphereGeometry(0.038, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.copy(userNodePos);
    arcsGroup.add(beaconMesh);

    // Radiating vertical laser beam shooting up into space
    const beamTarget = userNodePos.clone().normalize().multiplyScalar(globeRadius * 1.35);
    const beamGeo = new THREE.BufferGeometry().setFromPoints([userNodePos, beamTarget]);
    const beamMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const beamLine = new THREE.Line(beamGeo, beamMat);
    arcsGroup.add(beamLine);

    // Fan of Concentric 3D Elliptical Orbital Loops radiating from the Node in Golden Amber
    const normal = userNodePos.clone().normalize();
    const tangent = new THREE.Vector3(0, 1, 0).cross(normal).normalize();
    const bitangent = normal.clone().cross(tangent).normalize();

    const loopAngles = [-0.35, -0.18, 0, 0.18, 0.35];
    const loopScales = [0.18, 0.32, 0.46, 0.62, 0.80];

    loopScales.forEach((scale, idx) => {
      const angle = loopAngles[idx];
      const curvePoints = [];
      const numSegments = 72;

      for (let s = 0; s <= numSegments; s++) {
        const t = (s / numSegments) * Math.PI * 2;
        const radiusX = scale * 0.36;
        const radiusY = scale * 0.65;

        const lx = Math.cos(t) * radiusX;
        const ly = Math.sin(t) * radiusY;
        const lz = (1 - Math.cos(t)) * 0.18 * scale;

        const rotatedTangent = tangent.clone().applyAxisAngle(normal, angle);
        const rotatedBitangent = bitangent.clone().applyAxisAngle(normal, angle);

        const pt = userNodePos
          .clone()
          .add(rotatedTangent.clone().multiplyScalar(lx))
          .add(rotatedBitangent.clone().multiplyScalar(ly))
          .add(normal.clone().multiplyScalar(lz));

        curvePoints.push(pt);
      }

      const loopGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const loopMat = new THREE.LineBasicMaterial({
        color: idx === 2 ? 0xfbbf24 : 0xf59e0b,
        transparent: true,
        opacity: 0.45 + (idx % 2) * 0.25,
        blending: THREE.AdditiveBlending
      });
      const loopMesh = new THREE.Line(loopGeo, loopMat);
      arcsGroup.add(loopMesh);
    });

    // Connecting Great-Circle Arcs across the globe
    const pulseData = [];
    DEFAULT_HUBS.slice(1).forEach((hub) => {
      const hubPos = latLngToVector3(hub.lat, hub.lng, globeRadius);
      const dist = userNodePos.distanceTo(hubPos);
      const mid = new THREE.Vector3().addVectors(userNodePos, hubPos).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(globeRadius + dist * 0.4);

      const curve = new THREE.QuadraticBezierCurve3(userNodePos, mid, hubPos);
      const arcPoints = curve.getPoints(50);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcsGroup.add(arcLine);

      // Light pulse traveling on arc
      const pulseGeo = new THREE.SphereGeometry(0.024, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xfffbeb,
        transparent: true,
        opacity: 0.95
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      arcsGroup.add(pulseMesh);

      pulseData.push({
        mesh: pulseMesh,
        curve: curve,
        speed: 0.0035 + Math.random() * 0.002,
        progress: Math.random()
      });
    });

    // 6. Cyber Spaceship Scene Lighting & Mesh Setup (Warm Solar Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff6e5, 2.4);
    keyLight.position.set(5, 4, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x2563eb, 1.5);
    rimLight.position.set(-5, -2, 4);
    scene.add(rimLight);

    // Crisp Neutral Directional Light in Upper Right
    const accentLight = new THREE.DirectionalLight(0xffffff, 1.8);
    accentLight.position.set(6, 4, 3);
    scene.add(accentLight);

    // Instantiate Nexus-1 Space Shuttle 3D Model
    const spaceshipData = createNexus1SpaceShuttle();
    spaceshipData.group.renderOrder = 1;
    scene.add(spaceshipData.group);

    // Stardust Ion Exhaust Particle System
    const EXHAUST_COUNT = 45;
    const exhaustPositions = new Float32Array(EXHAUST_COUNT * 3);
    const exhaustColors = new Float32Array(EXHAUST_COUNT * 3);
    const exhaustData = [];

    for (let i = 0; i < EXHAUST_COUNT; i++) {
      exhaustPositions[i * 3] = 0;
      exhaustPositions[i * 3 + 1] = 0;
      exhaustPositions[i * 3 + 2] = 0;

      exhaustColors[i * 3] = 1.0;
      exhaustColors[i * 3 + 1] = 0.7;
      exhaustColors[i * 3 + 2] = 0.1;

      exhaustData.push({
        life: Math.random(),
        speed: 0.015 + Math.random() * 0.025,
        decay: 0.022 + Math.random() * 0.025
      });
    }

    const exhaustGeo = new THREE.BufferGeometry();
    exhaustGeo.setAttribute('position', new THREE.BufferAttribute(exhaustPositions, 3));
    exhaustGeo.setAttribute('color', new THREE.BufferAttribute(exhaustColors, 3));

    const exhaustMat = new THREE.PointsMaterial({
      size: 0.032,
      vertexColors: true,
      transparent: true,
      opacity: 0.90,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false
    });

    const exhaustPoints = new THREE.Points(exhaustGeo, exhaustMat);
    exhaustPoints.renderOrder = 1;
    scene.add(exhaustPoints);

    // Scroll & Mouse Parallax Listeners
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;
    let mouseNormX = 0;
    let mouseNormY = 0;

    const onWindowScroll = () => {
      const maxScroll = Math.max(1, window.innerHeight * 0.95);
      targetScrollProgress = Math.min(1.2, Math.max(0, window.scrollY / maxScroll));
    };

    const onWindowPointerMove = (e) => {
      mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNormY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('pointermove', onWindowPointerMove, { passive: true });

    // 7. Interactive Dragging & Momentum Controls for Earth
    let pointerDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velocityX = 0;
    let velocityY = 0;

    const onPointerDown = (e) => {
      pointerDown = true;
      setIsDragging(true);
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      velocityX = 0;
      velocityY = 0;
    };

    const onPointerMove = (e) => {
      if (!pointerDown) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      globeGroup.rotation.y += deltaX * 0.004;
      globeGroup.rotation.x += deltaY * 0.003;

      velocityX = deltaX * 0.004;
      velocityY = deltaY * 0.003;

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerUp = () => {
      pointerDown = false;
      setIsDragging(false);
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 8. Animation Loop
    let animationFrameId;
    const tempV3 = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Spin & Inertia damping for Earth
      if (!pointerDown) {
        if (autoRotate) {
          globeGroup.rotation.y += 0.0016;
        }
        globeGroup.rotation.y += velocityX;
        globeGroup.rotation.x += velocityY;
        velocityX *= 0.94;
        velocityY *= 0.94;
      }

      // Constrain tilt
      globeGroup.rotation.x = Math.max(-0.65, Math.min(0.65, globeGroup.rotation.x));

      // Animate pulses
      pulseData.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        p.mesh.position.copy(p.curve.getPoint(p.progress));
      });

      // =========================================================================
      // Animate 3D Moving Stars & Twinkle
      // =========================================================================
      const starPosArr = starsGeo.attributes.position.array;
      const starColArr = starsGeo.attributes.color.array;
      const animTime = performance.now() * 0.001;

      for (let i = 0; i < STARS_COUNT; i++) {
        const sd = starData[i];

        starPosArr[i * 3] += sd.vx;
        starPosArr[i * 3 + 1] += sd.vy;
        starPosArr[i * 3 + 2] += sd.vz;

        // Wrap around 3D celestial boundaries
        if (starPosArr[i * 3] < -29) starPosArr[i * 3] = 29;
        if (starPosArr[i * 3] > 29) starPosArr[i * 3] = -29;
        if (starPosArr[i * 3 + 1] < -22) starPosArr[i * 3 + 1] = 22;
        if (starPosArr[i * 3 + 1] > 22) starPosArr[i * 3 + 1] = -22;

        // Twinkle luminance
        const tw = 0.65 + 0.35 * Math.sin(animTime * 1000 * sd.twinkleSpeed + sd.twinklePhase);
        starColArr[i * 3] = sd.baseColor.r * sd.baseBright * tw;
        starColArr[i * 3 + 1] = sd.baseColor.g * sd.baseBright * tw;
        starColArr[i * 3 + 2] = sd.baseColor.b * sd.baseBright * tw;
      }
      starsGeo.attributes.position.needsUpdate = true;
      starsGeo.attributes.color.needsUpdate = true;

      // Celestial rotation & scroll/mouse parallax
      starsGroup.rotation.z += 0.0001;
      starsGroup.position.x = mouseNormX * 0.3;
      starsGroup.position.y = mouseNormY * 0.2 - currentScrollProgress * 1.5;

      // =========================================================================
      // Dynamic Spaceship Flight: Hero Section Orbit & Scroll Descent
      // =========================================================================
      const prevScroll = currentScrollProgress;
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;
      const scrollVelocity = Math.abs(currentScrollProgress - prevScroll);

      const time = performance.now() * 0.001;

      // 1. Grand 3D Planetary Orbit (Sweeps outside the frame & passes behind Earth)
      // When user is not scrolling, the shuttle executes a complete 3D orbit around Earth:
      // - Swings across the foreground in front of Earth (y < -1.2, completely clear of text)
      // - Glides outside the frame on the sides (x reaches +/- 4.45, sweeping past the viewport edges)
      // - Dives behind the dark solid core of Earth (z reaches -2.75, where Earth naturally occludes it)
      // - Re-emerges dynamically from behind the glowing atmosphere rim!
      const isMobile = window.innerWidth < 768;
      const aX = isMobile ? 2.35 : 4.25; // Sweeps outside viewport frame edges
      const aY_front = isMobile ? -1.05 : -0.95; // Foreground clearance beneath title & CTA buttons
      const aY_back = isMobile ? 1.15 : 1.25; // Directly behind Earth's solid core (radius 1.95)
      const aZ = 2.30; // Foreground +2.30 in front of Earth, Rear -2.30 behind Earth

      // Cinematic orbital period (~25s per complete planetary revolution)
      const orbitSpeed = 0.25;
      const theta = time * orbitSpeed;

      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      // Smooth elevation interpolation: front when cosT = +1, rear when cosT = -1
      const frontWeight = (1.0 + cosT) * 0.5;
      const backWeight = (1.0 - cosT) * 0.5;

      const heroPatrolX = aX * sinT;
      const heroPatrolY = frontWeight * aY_front + backWeight * aY_back;
      const heroPatrolZ = aZ * cosT;

      // Analytical velocity vector for flight tangent
      const heroVx = aX * cosT;
      const heroVy = 0.5 * (aY_back - aY_front) * sinT;
      const heroVz = -aZ * sinT;
      const heroTangent = new THREE.Vector3(heroVx, heroVy, heroVz).normalize();

      // Inward banking roll into the turn
      const heroBank = -0.45 * cosT;

      // 2. Scroll Flight Descent Trajectory (Diving across Earth into About section)
      const s = currentScrollProgress;
      const scrollP1 = new THREE.Vector3(0.20, -0.15, 3.25);
      const scrollP2 = new THREE.Vector3(-1.65, -1.35, 3.55);

      // Transition factor: 1.0 when at Hero (s=0), drops to 0.0 as user scrolls past 0.28
      const heroWeight = Math.max(0, 1.0 - s * 3.6);
      const scrollWeight = 1.0 - heroWeight;

      // Bezier curve from hero position to scrollP1 to scrollP2
      const scrollCurveT = Math.min(1.0, s * 1.4);
      const invT = 1.0 - scrollCurveT;

      const scrollX = invT * invT * heroPatrolX + 2 * invT * scrollCurveT * scrollP1.x + scrollCurveT * scrollCurveT * scrollP2.x;
      const scrollY = invT * invT * heroPatrolY + 2 * invT * scrollCurveT * scrollP1.y + scrollCurveT * scrollCurveT * scrollP2.y;
      const scrollZ = invT * invT * heroPatrolZ + 2 * invT * scrollCurveT * scrollP1.z + scrollCurveT * scrollCurveT * scrollP2.z;

      const scrollTangent = new THREE.Vector3(
        2 * invT * (scrollP1.x - heroPatrolX) + 2 * scrollCurveT * (scrollP2.x - scrollP1.x),
        2 * invT * (scrollP1.y - heroPatrolY) + 2 * scrollCurveT * (scrollP2.y - scrollP1.y),
        2 * invT * (scrollP1.z - heroPatrolZ) + 2 * scrollCurveT * (scrollP2.z - scrollP1.z)
      ).normalize();

      // Blended position and orientation
      const posX = heroPatrolX * heroWeight + scrollX * scrollWeight;
      const posY = heroPatrolY * heroWeight + scrollY * scrollWeight;
      const posZ = heroPatrolZ * heroWeight + scrollZ * scrollWeight;

      spaceshipData.group.position.set(posX, posY, posZ);

      const blendedTangent = new THREE.Vector3()
        .addScaledVector(heroTangent, heroWeight)
        .addScaledVector(scrollTangent, scrollWeight)
        .normalize();

      const lookTarget = spaceshipData.group.position.clone().add(blendedTangent);
      spaceshipData.group.lookAt(lookTarget);

      // Aerodynamic banking
      const scrollBank = -0.55 * Math.sin(Math.min(1, s) * Math.PI);
      const finalBank = heroBank * heroWeight + scrollBank * scrollWeight + Math.sin(time * 1.5) * 0.03;
      spaceshipData.group.rotateZ(finalBank);

      // Interactive mouse tilt parallax
      spaceshipData.group.rotateX(mouseNormY * 0.12);
      spaceshipData.group.rotateY(mouseNormX * 0.12);

      // Dynamic Red & Yellow Fire Thrusters & Flicker Animation
      const throttle = 1.0 + Math.min(3.2, scrollVelocity * 60.0);
      spaceshipData.thrusterLight.intensity = 2.4 + throttle * 1.6;

      // Realistic fire combustion flicker (high-frequency wave composition)
      const fireFlicker1 = Math.sin(time * 38.0) * 0.08 + Math.cos(time * 54.0) * 0.05;
      const fireFlicker2 = Math.cos(time * 42.0 + 1.2) * 0.07;

      // Scale yellow core, orange mid, and red outer flame meshes for all 3 engines
      spaceshipData.engines.forEach((eng, idx) => {
        const offset = idx * 1.3;
        const flk1 = Math.sin(time * 35.0 + offset) * 0.08;
        const flk2 = Math.cos(time * 48.0 + offset) * 0.07;

        // Core yellow cone: high heat, tight jet
        const coreScaleZ = (1.0 + flk1) * (0.95 + throttle * 0.45);
        const coreScaleXY = 1.0 + flk2 * 0.3;
        eng.core.scale.set(coreScaleXY, coreScaleXY, coreScaleZ);

        // Mid orange cone: trailing fire plume
        const midScaleZ = (1.0 + flk2) * (1.0 + throttle * 0.65);
        const midScaleXY = 1.0 + flk1 * 0.4;
        eng.mid.scale.set(midScaleXY, midScaleXY, midScaleZ);

        // Outer red plume: expanding exhaust envelope
        const outerScaleZ = (1.0 + flk1 * 0.8) * (1.05 + throttle * 0.85);
        const outerScaleXY = 1.0 + flk2 * 0.5;
        eng.outer.scale.set(outerScaleXY, outerScaleXY, outerScaleZ);

        // Nozzle glowing disc pulsing with combustion
        const discScale = 1.0 + Math.sin(time * 25.0 + offset) * 0.12 + throttle * 0.2;
        eng.disc.scale.set(discScale, discScale, 1.0);
      });

      // Update trailing fiery sparks and embers from nozzle anchors
      const posAttr = exhaustGeo.attributes.position;
      const colAttr = exhaustGeo.attributes.color;
      const leftNozzleWorld = new THREE.Vector3();
      spaceshipData.leftNozzleAnchor.getWorldPosition(leftNozzleWorld);
      const rightNozzleWorld = new THREE.Vector3();
      spaceshipData.rightNozzleAnchor.getWorldPosition(rightNozzleWorld);
      const topNozzleWorld = new THREE.Vector3();
      spaceshipData.topNozzleAnchor.getWorldPosition(topNozzleWorld);

      for (let i = 0; i < EXHAUST_COUNT; i++) {
        const p = exhaustData[i];
        p.life -= p.decay;

        if (p.life <= 0) {
          p.life = 1.0;
          const source = (i % 3 === 0) ? leftNozzleWorld : ((i % 3 === 1) ? rightNozzleWorld : topNozzleWorld);
          posAttr.array[i * 3] = source.x + (Math.random() - 0.5) * 0.02;
          posAttr.array[i * 3 + 1] = source.y + (Math.random() - 0.5) * 0.02;
          posAttr.array[i * 3 + 2] = source.z + (Math.random() - 0.5) * 0.02;
        } else {
          const backward = new THREE.Vector3(0, 0, -1)
            .applyQuaternion(spaceshipData.group.quaternion)
            .multiplyScalar(p.speed * (0.8 + throttle * 0.4));
          posAttr.array[i * 3] += backward.x;
          posAttr.array[i * 3 + 1] += backward.y;
          posAttr.array[i * 3 + 2] += backward.z;
        }

        // Fiery Ember Color Gradient: Yellow-white -> Fiery Orange -> Deep Red Embers
        const alpha = p.life;
        if (alpha > 0.65) {
          // Fresh incandescent yellow spark
          colAttr.array[i * 3] = 1.0;
          colAttr.array[i * 3 + 1] = 0.92;
          colAttr.array[i * 3 + 2] = 0.35;
        } else if (alpha > 0.3) {
          // Burning orange fire
          colAttr.array[i * 3] = 1.0;
          colAttr.array[i * 3 + 1] = 0.45 * (alpha / 0.65);
          colAttr.array[i * 3 + 2] = 0.05;
        } else {
          // Cooling red ember
          colAttr.array[i * 3] = 0.85 * (alpha / 0.3);
          colAttr.array[i * 3 + 1] = 0.08 * (alpha / 0.3);
          colAttr.array[i * 3 + 2] = 0.0;
        }
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Project Active Hub to 2D Screen Space for Badge
      tempV3.copy(userNodePos);
      tempV3.applyMatrix4(globeGroup.matrixWorld);

      const toCamera = camera.position.clone().sub(tempV3).normalize();
      const normalWorld = tempV3.clone().normalize();
      const dot = normalWorld.dot(toCamera);

      tempV3.project(camera);
      const x = (tempV3.x * 0.5 + 0.5) * container.clientWidth;
      const y = (-(tempV3.y * 0.5) + 0.5) * container.clientHeight;

      setBadgeScreenPos({
        x,
        y,
        visible: dot > 0.05 && tempV3.z < 1
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('pointermove', onWindowPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (starsGeo) starsGeo.dispose();
      if (starsMat) starsMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeNode, autoRotate, atmosphereGlow, showArcs]);

  return (
    <div className="relative w-full h-full cursor-grab active:cursor-grabbing select-none">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Orbit24 Pill Badge [ ORB-01 / KLS GIT ] */}
      {badgeScreenPos.visible && (
        <div
          style={{
            transform: `translate3d(${badgeScreenPos.x}px, ${badgeScreenPos.y}px, 0px) translate(16px, -115%)`
          }}
          className="absolute pointer-events-none transition-opacity duration-150 z-20"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/40 bg-blue-600/90 text-white backdrop-blur-md text-[11px] font-mono tracking-wider shadow-[0_4px_24px_rgba(37,99,235,0.6)]">
            {/* Glowing Golden Amber Beacon */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            </span>

            <span className="font-bold text-white text-[10px] tracking-widest">INN-01</span>
            <span className="text-white/60">/</span>
            <span className="text-white font-semibold">{activeNode.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}
