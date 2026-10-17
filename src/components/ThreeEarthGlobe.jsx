import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// National hubs with live user node auto-detected via IP
const DEFAULT_HUBS = [
  { id: 'user', name: 'GADHINGLAJ', lat: 16.2289, lng: 74.3544, isUser: true },
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

  // Auto-detect user's real city/lat/lng via ipapi.co (exactly like WeEvolveIT does!)
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.city && data.latitude && data.longitude) {
          setActiveNode({
            id: 'user',
            name: data.city.toUpperCase(),
            lat: data.latitude,
            lng: data.longitude,
            isUser: true
          });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    // Tuned camera distance so the Earth is slightly smaller with clean breathing room
    camera.position.set(0, 0, 5.85);

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

    // Glowing Hot Pink Beacon Pin
    const beaconGeo = new THREE.SphereGeometry(0.035, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xe4007c });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.copy(userNodePos);
    arcsGroup.add(beaconMesh);

    // Radiating vertical laser beam shooting up into space
    const beamTarget = userNodePos.clone().normalize().multiplyScalar(globeRadius * 1.7);
    const beamGeo = new THREE.BufferGeometry().setFromPoints([userNodePos, beamTarget]);
    const beamMat = new THREE.LineBasicMaterial({
      color: 0xe4007c,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const beamLine = new THREE.Line(beamGeo, beamMat);
    arcsGroup.add(beamLine);

    // Fan of Concentric 3D Elliptical Orbital Loops radiating from the Node
    const normal = userNodePos.clone().normalize();
    const tangent = new THREE.Vector3(0, 1, 0).cross(normal).normalize();
    const bitangent = normal.clone().cross(tangent).normalize();

    const loopAngles = [-0.4, -0.2, 0, 0.22, 0.44];
    const loopScales = [0.4, 0.65, 0.95, 1.3, 1.65];

    loopScales.forEach((scale, idx) => {
      const angle = loopAngles[idx];
      const curvePoints = [];
      const numSegments = 72;

      for (let s = 0; s <= numSegments; s++) {
        const t = (s / numSegments) * Math.PI * 2;
        const radiusX = scale * 0.48;
        const radiusY = scale * 0.92;

        const lx = Math.cos(t) * radiusX;
        const ly = Math.sin(t) * radiusY;
        const lz = (1 - Math.cos(t)) * 0.32 * scale;

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
        color: idx === 2 ? 0xffffff : 0xd8d8d8,
        transparent: true,
        opacity: 0.35 + (idx % 2) * 0.2,
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
        color: 0xcccccc,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcsGroup.add(arcLine);

      // Light pulse traveling on arc
      const pulseGeo = new THREE.SphereGeometry(0.024, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
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

    // 6. Interactive Dragging & Momentum Controls
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

    const onWheel = (e) => {
      e.preventDefault();
      camera.position.z = Math.max(4.2, Math.min(7.5, camera.position.z + e.deltaY * 0.003));
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 7. Animation Loop
    let animationFrameId;
    const tempV3 = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Spin & Inertia damping
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
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('wheel', onWheel);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
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

      {/* Identical WeEvolveIT Pill Badge [ ● ONLINE • GADHINGLAJ ] */}
      {badgeScreenPos.visible && (
        <div
          style={{
            transform: `translate3d(${badgeScreenPos.x}px, ${badgeScreenPos.y}px, 0px) translate(16px, -115%)`
          }}
          className="absolute pointer-events-none transition-opacity duration-150 z-20"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-[#0e0e12]/95 backdrop-blur-md text-[11px] font-mono tracking-wider shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            {/* Glowing Hot Pink Beacon */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e4007c] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e4007c] shadow-[0_0_8px_#e4007c]" />
            </span>

            <span className="font-semibold text-white/95">ONLINE</span>
            <span className="text-white/40">•</span>
            <span className="text-gray-200 font-medium">{activeNode.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}
