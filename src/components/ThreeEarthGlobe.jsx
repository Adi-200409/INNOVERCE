import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { getCachedShuttleModel, preloadShuttleModel } from '../utils/shuttleLoader';

// National hubs with live user node (KLS GIT Belagavi)
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

// Generate glowing celestial star sprite texture with soft radial falloff and 4-point cross sparkle
function createStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.20, 'rgba(235, 245, 255, 0.95)');
  gradient.addColorStop(0.45, 'rgba(147, 197, 253, 0.45)');
  gradient.addColorStop(0.75, 'rgba(56, 189, 248, 0.12)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

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

  const modelWrapper = new THREE.Group();
  ship.add(modelWrapper);

  // Instant procedural delta hull while the detailed OBJ loads asynchronously
  const tempHull = new THREE.Group();
  {
    const bodyGeo = new THREE.ConeGeometry(0.18, 0.95, 16);
    bodyGeo.rotateX(Math.PI / 2);
    const body = new THREE.Mesh(bodyGeo, shuttleMaterial);
    tempHull.add(body);

    const wingGeo = new THREE.BoxGeometry(0.72, 0.025, 0.45);
    wingGeo.translate(0, -0.04, -0.15);
    const wings = new THREE.Mesh(wingGeo, shuttleMaterial);
    tempHull.add(wings);

    const finGeo = new THREE.BoxGeometry(0.02, 0.22, 0.22);
    finGeo.translate(0, 0.12, -0.32);
    const fin = new THREE.Mesh(finGeo, shuttleMaterial);
    tempHull.add(fin);
  }
  modelWrapper.add(tempHull);

  const attachModel = (obj) => {
    if (!obj) return;
    const clone = obj.clone(true);
    clone.traverse((child) => {
      if (child.isMesh && (!child.material || !child.material.map)) {
        child.material = shuttleMaterial;
      }
    });
    if (tempHull.parent) {
      modelWrapper.remove(tempHull);
      tempHull.traverse((c) => {
        if (c.geometry) c.geometry.dispose();
      });
    }
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

  // Construct realistic multi-layer Red & Yellow fire flame thrusters
  const createFireThruster = (x, y, z) => {
    const engineGroup = new THREE.Group();
    engineGroup.position.set(x, y, z);

    // 1. Core Yellow Incandescent Flame
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
      opacity: 0.95,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const discMesh = new THREE.Mesh(discGeo, discMat);
    discMesh.position.set(0, 0, 0.005);
    engineGroup.add(discMesh);

    const anchor = new THREE.Object3D();
    anchor.position.set(0, 0, 0.24);
    engineGroup.add(anchor);

    ship.add(engineGroup);
    return { group: engineGroup, core: coreMesh, mid: midMesh, outer: outerMesh, disc: discMesh, anchor };
  };

  const leftEngine = createFireThruster(-0.115, -0.045, -0.68);
  const rightEngine = createFireThruster(0.115, -0.045, -0.68);
  const topEngine = createFireThruster(0.0, 0.088, -0.68);

  const thrusterLight = new THREE.PointLight(0xff6600, 3.6, 7.5);
  thrusterLight.position.set(0, 0, -0.92);
  ship.add(thrusterLight);

  // Prominent, enlarged 3D Space Shuttle (increased size for heroic cinematic presence)
  ship.scale.set(0.38, 0.38, 0.38);

  return {
    group: ship,
    engines: [leftEngine, rightEngine, topEngine],
    leftNozzleAnchor: leftEngine.anchor,
    rightNozzleAnchor: rightEngine.anchor,
    topNozzleAnchor: topEngine.anchor,
    thrusterLight
  };
}

function ThreeEarthGlobe({
  autoRotate = true,
  atmosphereGlow: _atmosphereGlow = true,
  showArcs = false
}) {
  const mountRef = useRef(null);
  const badgeRef = useRef(null);
  const [activeNode] = useState({
    id: 'user',
    name: 'KLS GIT',
    lat: 15.8281,
    lng: 74.4889,
    isUser: true
  });
  const [isDragging, setIsDragging] = useState(false);
  const globeGroupRef = useRef(null);
  const autoRotateRef = useRef(autoRotate);
  const showArcsRef = useRef(showArcs);
  const arcsGroupRef = useRef(null);

  // Smooth real-time prop synchronization without tearing down WebGL context
  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    showArcsRef.current = showArcs;
    if (arcsGroupRef.current) arcsGroupRef.current.visible = showArcs;
  }, [showArcs]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(container);

    // 1. Scene, Camera, High-Precision WebGL Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    // Camera positioned with clean cosmic headroom above Earth for the navbar
    camera.position.set(0, 0.18, 6.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    // Capped at 1.5 to maintain retina crispness while avoiding 4K GPU fragment fill lag
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // =========================================================================
    // 1.2 HYPER-VELOCITY 3D METEORS / SHOOTING STARS
    // =========================================================================
    const meteors = [];
    const MAX_METEORS = 2;
    let lastMeteorTime = performance.now();
    let nextMeteorDelay = 2200 + Math.random() * 2800;

    function createMeteor() {
      const startX = -10 + Math.random() * 20;
      const startY = 3.5 + Math.random() * 6.5;
      const startZ = -12 - Math.random() * 8;

      const angle = -Math.PI * 0.24 + (Math.random() - 0.5) * 0.20;
      const dir = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0.08).normalize();
      const speed = 0.45 + Math.random() * 0.30;
      const length = 2.4 + Math.random() * 1.8;

      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(6);
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

      const mat = new THREE.LineBasicMaterial({
        color: 0xbae6fd,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const line = new THREE.Line(geo, mat);
      scene.add(line);

      meteors.push({
        line,
        geo,
        mat,
        head: new THREE.Vector3(startX, startY, startZ),
        dir,
        speed,
        length,
        life: 0,
        maxLife: 40 + Math.floor(Math.random() * 25)
      });
    }

    // Master Globe Group
    const globeGroup = new THREE.Group();
    // Axial tilt displaying North America & the Atlantic curving toward the dawn horizon
    globeGroup.rotation.x = 0.28;
    globeGroup.rotation.y = -0.45;
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    const globeRadius = 1.95;

    // 1.5 3D Moving Celestial Starfield (Efficient GPU celestial rotation)
    const starsGroup = new THREE.Group();
    scene.add(starsGroup);

    const STARS_COUNT = 600;
    const starPositions = new Float32Array(STARS_COUNT * 3);
    const starColors = new Float32Array(STARS_COUNT * 3);

    const STAR_COLOR_PALETTE = [
      new THREE.Color(1.0, 1.0, 1.0),        // Pure Diamond White
      new THREE.Color(0.92, 0.96, 1.0),       // Crystal Cyan-White
      new THREE.Color(0.70, 0.88, 1.0),       // Ice Cyan
      new THREE.Color(1.0, 0.92, 0.70),       // Warm Starlight Gold
      new THREE.Color(0.85, 0.75, 1.0)        // Cosmic Lilac
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
    }

    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starSpriteTexture = createStarTexture();
    const starsMat = new THREE.PointsMaterial({
      size: 0.12,
      map: starSpriteTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.80,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starsMesh = new THREE.Points(starsGeo, starsMat);
    starsMesh.renderOrder = 0;
    starsGroup.add(starsMesh);

    // =========================================================================
    // 2. AAA NOCTURNAL EARTH WITH GOLDEN CITY LIGHTS & SOLAR DAWN HORIZON
    // Exact match to user reference: glowing golden cities, sunrise flare, deep navy oceans
    // =========================================================================
    const texLoader = new THREE.TextureLoader();

    const dayTexture = texLoader.load('/earth-blue-marble.jpg');
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    dayTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const nightTexture = texLoader.load('/earth-night.jpg');
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const cloudsTexture = texLoader.load('/earth-clouds.png');
    cloudsTexture.colorSpace = THREE.SRGBColorSpace;
    cloudsTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const topoTexture = texLoader.load('/earth-topology.png');
    topoTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Solar Sunrise Vector on the UPPER-LEFT HORIZON
    const sunDirection = new THREE.Vector3(-0.92, 0.44, 0.18).normalize();

    const earthGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const earthMat = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: dayTexture },
        nightMap: { value: nightTexture },
        bumpMap: { value: topoTexture },
        cloudMap: { value: cloudsTexture },
        sunDirection: { value: sunDirection }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform sampler2D nightMap;
        uniform sampler2D bumpMap;
        uniform sampler2D cloudMap;
        uniform vec3 sunDirection;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec3 dayColor = texture2D(map, vUv).rgb;
          vec3 nightColor = texture2D(nightMap, vUv).rgb;
          vec4 cloudData = texture2D(cloudMap, vUv);

          // Fast 3-tap bump-mapped normal perturbation for crisp terrain relief
          vec2 texel = vec2(1.0 / 2048.0, 1.0 / 1024.0);
          float hC = texture2D(bumpMap, vUv).r;
          float hR = texture2D(bumpMap, vUv + vec2(texel.x, 0.0)).r;
          float hU = texture2D(bumpMap, vUv + vec2(0.0, texel.y)).r;
          vec3 bumpNorm = normalize(vNormal + vec3((hC - hR) * 0.06, (hC - hU) * 0.06, 0.0));
          vec3 norm = normalize(mix(vNormal, bumpNorm, 0.55));

          vec3 sunDir = normalize(sunDirection);
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);

          // Sunlight incidence angle
          float NdotL = dot(norm, sunDir);

          // Smooth day-to-night terminator (mostly night with sunrise at upper-left)
          float dayFactor = smoothstep(-0.06, 0.32, NdotL);

          // Spectral separation for water vs land
          float isOcean = clamp((dayColor.b - max(dayColor.r, dayColor.g) * 0.80) * 4.5, 0.0, 1.0);

          // 1. NIGHT SIDE: Deep midnight navy ocean & dark charcoal land (no orange wash!)
          vec3 nightOcean = vec3(0.005, 0.012, 0.026);
          vec3 nightLand = vec3(0.007, 0.010, 0.015);
          vec3 darkSurface = mix(nightLand, nightOcean, isOcean);

          // Real pinpoint golden city lights (strictly masked to land and real city brightness)
          float rawCity = max(nightColor.r, max(nightColor.g, nightColor.b));
          // Strict threshold so background compression artifacts never tint oceans or dark land
          float cityMask = smoothstep(0.12, 0.38, rawCity);
          vec3 goldenTint = vec3(1.30, 0.95, 0.36);
          vec3 goldenLights = nightColor * goldenTint * 3.4 * cityMask * (1.0 - isOcean * 0.95);
          // Core bright bloom for dense cities
          goldenLights += vec3(0.50, 0.45, 0.25) * smoothstep(0.50, 0.95, rawCity) * 1.6 * (1.0 - isOcean);

          vec3 nightSide = darkSurface + goldenLights;

          // 2. DAY/DAWN SIDE
          vec3 deepDayOcean = vec3(0.04, 0.16, 0.42);
          vec3 shallowTurquoise = vec3(0.06, 0.54, 0.74);
          float isShallow = clamp((dayColor.g * 1.25 + dayColor.b * 1.10 - dayColor.r * 2.20 - 0.10) * 3.6, 0.0, 1.0) * isOcean;
          vec3 dayOcean = mix(deepDayOcean, shallowTurquoise, isShallow * 0.55);

          vec3 dayLand = dayColor * vec3(0.85, 0.95, 0.85);
          vec3 daySurface = mix(dayLand, dayOcean, isOcean);

          // Delicate cloud shadow cast on daytime side
          vec2 shadowOffset = -sunDir.xy * 0.0028;
          float cloudShadow = texture2D(cloudMap, vUv + shadowOffset).a;
          daySurface = mix(daySurface, daySurface * 0.65, cloudShadow * 0.75 * dayFactor);

          // Natural smooth day-to-night blend - no muddy orange terminator wash
          vec3 surface = mix(nightSide, daySurface, dayFactor);

          // 3. UNIFIED 4K NASA CLOUDS (clean natural white with moonlight tint at night)
          float cloudSun = smoothstep(-0.10, 0.35, NdotL);
          vec3 dayClouds = vec3(0.96, 0.98, 1.0);
          vec3 nightClouds = vec3(0.015, 0.025, 0.045);
          vec3 cloudCol = mix(nightClouds, dayClouds, cloudSun);
          float cloudCoverage = cloudData.a * mix(0.15, 0.80, cloudSun);
          surface = mix(surface, cloudCol, cloudCoverage * 0.60);

          // 4. Ocean Specular Sun Reflection
          vec3 halfVec = normalize(sunDir + viewDir);
          float specPower = pow(max(0.0, dot(norm, halfVec)), 42.0);
          float oceanSpec = specPower * isOcean * (1.0 - cloudData.a * 0.92) * smoothstep(-0.05, 0.30, NdotL);
          surface += vec3(0.85, 0.92, 1.0) * oceanSpec * 0.85;

          // 5. Clean Electric Blue Atmospheric Limb (Rayleigh scattering - clean blue, no yellow rim)
          float rim = 1.0 - max(0.0, dot(vNormal, viewDir));
          float rimPower = pow(rim, 3.6);
          float sunFacing = max(0.0, dot(vNormal, sunDir));
          vec3 electricCyanLimb = vec3(0.20, 0.65, 1.0);
          vec3 atmoLimb = electricCyanLimb * rimPower * (0.30 + 0.90 * pow(sunFacing, 1.6)) * 1.6;

          vec3 finalColor = surface + atmoLimb;
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      depthWrite: true
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMesh.renderOrder = 0;
    globeGroup.add(earthMesh);

    // =========================================================================
    // 3. CLEAN CYBER NETWORK OVERLAY (Toggled by WIRE ON / WIRE OFF)
    // =========================================================================
    const arcsGroup = new THREE.Group();
    arcsGroup.visible = showArcsRef.current;
    arcsGroupRef.current = arcsGroup;
    globeGroup.add(arcsGroup);

    const userNodePos = latLngToVector3(activeNode.lat, activeNode.lng, globeRadius);

    // Clean glowing golden amber beacon pin at KLS GIT Belagavi
    const beaconGeo = new THREE.SphereGeometry(0.038, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.copy(userNodePos);
    arcsGroup.add(beaconMesh);

    // Radiating vertical laser beam shooting up into space in cyan
    const beamTarget = userNodePos.clone().normalize().multiplyScalar(globeRadius * 1.35);
    const beamGeo = new THREE.BufferGeometry().setFromPoints([userNodePos, beamTarget]);
    const beamMat = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending
    });
    const beamLine = new THREE.Line(beamGeo, beamMat);
    arcsGroup.add(beamLine);

    // Clean Great-Circle Arcs across national hubs
    const pulseData = [];
    DEFAULT_HUBS.slice(1).forEach((hub) => {
      const hubPos = latLngToVector3(hub.lat, hub.lng, globeRadius);
      const dist = userNodePos.distanceTo(hubPos);
      const mid = new THREE.Vector3().addVectors(userNodePos, hubPos).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(globeRadius + dist * 0.35);

      const curve = new THREE.QuadraticBezierCurve3(userNodePos, mid, hubPos);
      const arcPoints = curve.getPoints(50);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcsGroup.add(arcLine);

      // Light pulse traveling along arc
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

    // =========================================================================
    // 4. SCENE LIGHTING (Natural Sunlight from Upper-Left + Cosmic Ambient)
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0x0a1120, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.5);
    keyLight.position.set(-5.5, 3.5, 4.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x1e293b, 1.0);
    fillLight.position.set(5, -2, 3.0);
    scene.add(fillLight);

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
        decay: 0.022 + Math.random() * 0.025,
        vx: 0,
        vy: 0,
        vz: 0
      });
    }

    const exhaustGeo = new THREE.BufferGeometry();
    exhaustGeo.setAttribute('position', new THREE.BufferAttribute(exhaustPositions, 3));
    exhaustGeo.setAttribute('color', new THREE.BufferAttribute(exhaustColors, 3));

    const exhaustMat = new THREE.PointsMaterial({
      size: 0.052,
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

    // Scroll Listeners
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    const onWindowScroll = () => {
      const maxScroll = Math.max(1, window.innerHeight * 0.95);
      targetScrollProgress = Math.min(1.2, Math.max(0, window.scrollY / maxScroll));
    };

    window.addEventListener('scroll', onWindowScroll, { passive: true });

    // 5. Interactive Dragging & Momentum Controls for Earth
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

    // 6. Animation Loop & Scratch Vectors (Zero Garbage-Collection pauses)
    let animationFrameId;
    const _tempV3 = new THREE.Vector3();
    const _heroTangent = new THREE.Vector3();
    const _scrollTangent = new THREE.Vector3();
    const _blendedTangent = new THREE.Vector3();
    const _lookTarget = new THREE.Vector3();
    const _leftNozzleWorld = new THREE.Vector3();
    const _rightNozzleWorld = new THREE.Vector3();
    const _topNozzleWorld = new THREE.Vector3();
    const _toCamera = new THREE.Vector3();
    const _normalWorld = new THREE.Vector3();
    const _dummyObj = new THREE.Object3D();
    const _targetQuat = new THREE.Quaternion();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const animTime = performance.now() * 0.001;

      // Spin & Inertia damping for Earth
      if (!pointerDown) {
        if (autoRotateRef.current) {
          globeGroup.rotation.y += 0.0016;
        }
        globeGroup.rotation.y += velocityX;
        globeGroup.rotation.x += velocityY;
        velocityX *= 0.94;
        velocityY *= 0.94;
      }

      // Constrain tilt
      globeGroup.rotation.x = Math.max(-0.65, Math.min(0.65, globeGroup.rotation.x));

      // Animate pulses along great-circle arcs
      pulseData.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        p.mesh.position.copy(p.curve.getPoint(p.progress));
      });

      // Smooth GPU celestial starfield drift (zero CPU vertex buffer uploads)
      starsGroup.rotation.z += 0.00012;
      starsGroup.rotation.y += 0.00010;
      starsGroup.position.y = -currentScrollProgress * 1.5;

      // Animate 3D Hyper-Velocity Shooting Meteors
      if (animTime * 1000 - lastMeteorTime > nextMeteorDelay && meteors.length < MAX_METEORS) {
        createMeteor();
        lastMeteorTime = animTime * 1000;
        nextMeteorDelay = 2200 + Math.random() * 2800;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life++;

        m.head.addScaledVector(m.dir, m.speed);
        const tail = m.head.clone().addScaledVector(m.dir, -m.length);

        const posArr = m.geo.attributes.position.array;
        posArr[0] = m.head.x;
        posArr[1] = m.head.y;
        posArr[2] = m.head.z;
        posArr[3] = tail.x;
        posArr[4] = tail.y;
        posArr[5] = tail.z;
        m.geo.attributes.position.needsUpdate = true;

        const halfLife = m.maxLife * 0.5;
        let alpha = 0;
        if (m.life < halfLife) {
          alpha = m.life / halfLife;
        } else {
          alpha = Math.max(0, (m.maxLife - m.life) / halfLife);
        }
        m.mat.opacity = alpha * 0.95;

        if (m.life >= m.maxLife) {
          scene.remove(m.line);
          m.geo.dispose();
          m.mat.dispose();
          meteors.splice(i, 1);
        }
      }

      // Dynamic Spaceship Flight: Continuous Orbital Motion & Smooth Scroll Descent
      const time = performance.now() * 0.001;
      const prevScroll = currentScrollProgress;
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;
      const scrollVelocity = Math.abs(currentScrollProgress - prevScroll);

      // Grand 3D Planetary Orbit
      const isMobile = window.innerWidth < 768;
      const aX = isMobile ? 2.55 : 4.40;
      const aY_front = isMobile ? -1.05 : -0.95;
      const aY_back = isMobile ? 1.15 : 1.25;
      const aZ = 2.45; // Generous depth clearance for enlarged shuttle

      const orbitSpeed = 0.22;
      const theta = time * orbitSpeed;

      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      const frontWeight = (1.0 + cosT) * 0.5;
      const backWeight = (1.0 - cosT) * 0.5;

      const heroPatrolX = aX * sinT;
      const heroPatrolY = frontWeight * aY_front + backWeight * aY_back;
      const heroPatrolZ = aZ * cosT;

      const heroVx = aX * cosT;
      const heroVy = 0.5 * (aY_back - aY_front) * sinT;
      const heroVz = -aZ * sinT;
      _heroTangent.set(heroVx, heroVy, heroVz).normalize();

      // Smooth scroll interpolation via hermite smoothstep
      const s = currentScrollProgress;
      const scrollFactor = Math.min(1.0, s * 1.3);
      const tSmooth = scrollFactor * scrollFactor * (3.0 - 2.0 * scrollFactor);

      // Scroll descent destination (gracefully diving towards the About section)
      const scrollDestX = -1.65;
      const scrollDestY = -1.35;
      const scrollDestZ = 3.65;

      const posX = THREE.MathUtils.lerp(heroPatrolX, scrollDestX, tSmooth);
      const posY = THREE.MathUtils.lerp(heroPatrolY, scrollDestY, tSmooth);
      const posZ = THREE.MathUtils.lerp(heroPatrolZ, scrollDestZ, tSmooth);

      spaceshipData.group.position.set(posX, posY, posZ);

      // Smoothly blend tangent towards downward descent
      const diveTangentX = scrollDestX - heroPatrolX;
      const diveTangentY = scrollDestY - heroPatrolY - 0.45;
      const diveTangentZ = scrollDestZ - heroPatrolZ;
      _scrollTangent.set(diveTangentX, diveTangentY, diveTangentZ).normalize();

      _blendedTangent.copy(_heroTangent).lerp(_scrollTangent, tSmooth).normalize();

      // Target orientation: Look along blended tangent
      _lookTarget.copy(spaceshipData.group.position).add(_blendedTangent);
      _dummyObj.position.copy(spaceshipData.group.position);
      _dummyObj.lookAt(_lookTarget);

      // Aerodynamic orbital banking:
      // In orbit, bank tilts inward towards Earth's center
      // Front crossing is nearly level (-0.08 rad); apex turns deepen naturally (-0.30 rad)
      const turnIntensity = Math.abs(cosT);
      const baseOrbitBank = -0.12 - 0.18 * (1.0 - turnIntensity);
      const scrollDiveBank = -0.50 * Math.sin(tSmooth * Math.PI);
      const finalBank = THREE.MathUtils.lerp(baseOrbitBank, scrollDiveBank, tSmooth);

      _dummyObj.rotateZ(finalBank);
      _targetQuat.copy(_dummyObj.quaternion);

      // Silk-smooth quaternion slerp (eliminates any angular snapping or twitching)
      spaceshipData.group.quaternion.slerp(_targetQuat, 0.14);

      // Smooth Supersonic Thruster Combustion Plumes
      const throttle = 1.0 + Math.min(2.5, scrollVelocity * 50.0);
      spaceshipData.thrusterLight.intensity = 2.8 + throttle * 1.6;

      spaceshipData.engines.forEach((eng, idx) => {
        const offset = idx * 1.3;
        // Controlled, subtle supersonic ripple (no violent 50% scale strobing)
        const flk1 = Math.sin(time * 16.0 + offset) * 0.04;
        const flk2 = Math.cos(time * 20.0 + offset) * 0.04;

        const coreScaleZ = (1.0 + flk1) * (1.0 + throttle * 0.35);
        const coreScaleXY = 1.0 + flk2 * 0.06;
        eng.core.scale.set(coreScaleXY, coreScaleXY, coreScaleZ);

        const midScaleZ = (1.0 + flk2) * (1.0 + throttle * 0.45);
        const midScaleXY = 1.0 + flk1 * 0.08;
        eng.mid.scale.set(midScaleXY, midScaleXY, midScaleZ);

        const outerScaleZ = (1.0 + flk1 * 0.8) * (1.05 + throttle * 0.55);
        const outerScaleXY = 1.0 + flk2 * 0.10;
        eng.outer.scale.set(outerScaleXY, outerScaleXY, outerScaleZ);

        const discScale = 1.0 + Math.sin(time * 12.0 + offset) * 0.06 + throttle * 0.15;
        eng.disc.scale.set(discScale, discScale, 1.0);
      });

      // Realistic Particle Exhaust Trail (particles travel on their own inertia)
      const posAttr = exhaustGeo.attributes.position;
      const colAttr = exhaustGeo.attributes.color;
      spaceshipData.leftNozzleAnchor.getWorldPosition(_leftNozzleWorld);
      spaceshipData.rightNozzleAnchor.getWorldPosition(_rightNozzleWorld);
      spaceshipData.topNozzleAnchor.getWorldPosition(_topNozzleWorld);

      for (let i = 0; i < EXHAUST_COUNT; i++) {
        const p = exhaustData[i];
        p.life -= p.decay;

        if (p.life <= 0) {
          p.life = 1.0;
          const source = (i % 3 === 0) ? _leftNozzleWorld : ((i % 3 === 1) ? _rightNozzleWorld : _topNozzleWorld);
          posAttr.array[i * 3] = source.x + (Math.random() - 0.5) * 0.02;
          posAttr.array[i * 3 + 1] = source.y + (Math.random() - 0.5) * 0.02;
          posAttr.array[i * 3 + 2] = source.z + (Math.random() - 0.5) * 0.02;

          // Eject backwards relative to the spaceship's current flight direction
          p.vx = -_blendedTangent.x * p.speed * (0.9 + throttle * 0.3) + (Math.random() - 0.5) * 0.005;
          p.vy = -_blendedTangent.y * p.speed * (0.9 + throttle * 0.3) + (Math.random() - 0.5) * 0.005;
          p.vz = -_blendedTangent.z * p.speed * (0.9 + throttle * 0.3) + (Math.random() - 0.5) * 0.005;
        } else {
          posAttr.array[i * 3] += p.vx;
          posAttr.array[i * 3 + 1] += p.vy;
          posAttr.array[i * 3 + 2] += p.vz;
        }

        const alpha = p.life;
        if (alpha > 0.65) {
          colAttr.array[i * 3] = 1.0;
          colAttr.array[i * 3 + 1] = 0.92;
          colAttr.array[i * 3 + 2] = 0.35;
        } else if (alpha > 0.3) {
          colAttr.array[i * 3] = 1.0;
          colAttr.array[i * 3 + 1] = 0.45 * (alpha / 0.65);
          colAttr.array[i * 3 + 2] = 0.05;
        } else {
          colAttr.array[i * 3] = 0.85 * (alpha / 0.3);
          colAttr.array[i * 3 + 1] = 0.08 * (alpha / 0.3);
          colAttr.array[i * 3 + 2] = 0.0;
        }
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Project Active Hub to 2D Screen Space for Badge
      _tempV3.copy(userNodePos);
      _tempV3.applyMatrix4(globeGroup.matrixWorld);

      _toCamera.copy(camera.position).sub(_tempV3).normalize();
      _normalWorld.copy(_tempV3).normalize();
      const dot = _normalWorld.dot(_toCamera);

      _tempV3.project(camera);
      const x = (_tempV3.x * 0.5 + 0.5) * container.clientWidth;
      const y = (-(_tempV3.y * 0.5) + 0.5) * container.clientHeight;

      if (badgeRef.current) {
        const isBadgeVisible = dot > 0.05 && _tempV3.z < 1 && showArcsRef.current;
        badgeRef.current.style.display = isBadgeVisible ? 'block' : 'none';
        if (isBadgeVisible) {
          badgeRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px) translate(16px, -115%)`;
        }
      }

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
      intersectionObserver.disconnect();
      window.removeEventListener('scroll', onWindowScroll);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      meteors.forEach((m) => {
        scene.remove(m.line);
        m.geo.dispose();
        m.mat.dispose();
      });
      if (starsGeo) starsGeo.dispose();
      if (starsMat) starsMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeNode]);

  return (
    <div className={`relative w-full h-full select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Orbit24 Pill Badge [ INN-01 / KLS GIT ] */}
      <div
        ref={badgeRef}
        style={{ display: 'none' }}
        className="absolute pointer-events-none z-20 top-0 left-0"
      >
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/50 bg-blue-600/90 text-white backdrop-blur-md text-[11px] font-mono tracking-wider shadow-[0_4px_24px_rgba(0,229,255,0.6)]">
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
    </div>
  );
}

export default React.memo(ThreeEarthGlobe);
