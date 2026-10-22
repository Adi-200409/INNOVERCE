import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * AboutConstellation3D
 * Custom 3D Neural Constellation & Star Plexus WebGL Background for the About Section.
 * Recreates the user's reference image:
 * - Real uploaded 3D constellation backdrop texture (/about-constellation-bg.png) with parallax depth
 * - Volumetric 3D constellation star nodes with 4-point cross diffraction sparkles
 * - Real-time 3D plexus line network linking nearby star nodes with distance-based fading
 * - Organic curved neural filaments (CatmullRom splines) traversing 3D space
 * - Interactive mouse parallax tilt and interactive cursor constellation pull
 * - Auto-pauses when scrolled out of viewport for optimal 60fps performance
 */
export default function AboutConstellation3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const bgImgRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Three.js Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 3000);
    camera.position.z = 700;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
    } catch (err) {
      console.warn('WebGL init failed for AboutConstellation3D:', err);
      return;
    }

    // Master 3D Group for subtle rotation & parallax
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 2. High-Fidelity 4-Point Sparkle Star Texture Generator
    // Matches the prominent bright stars with cross diffraction flares in the reference image
    function createSparkleTexture() {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext('2d');

      const cx = 64;
      const cy = 64;

      // Soft radial core glow
      const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      radial.addColorStop(0, 'rgba(255, 255, 255, 1)');
      radial.addColorStop(0.12, 'rgba(255, 255, 255, 0.95)');
      radial.addColorStop(0.28, 'rgba(225, 240, 255, 0.45)');
      radial.addColorStop(0.6, 'rgba(180, 215, 255, 0.1)');
      radial.addColorStop(1, 'rgba(140, 180, 255, 0)');

      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, 128, 128);

      // Central dense star bead
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 8);
      core.addColorStop(0, 'rgba(255, 255, 255, 1)');
      core.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fill();

      // Sharp 4-point cross diffraction flare (vertical and horizontal spikes)
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx, 4);
      ctx.lineTo(cx, 124);
      ctx.moveTo(4, cy);
      ctx.lineTo(124, cy);
      ctx.stroke();

      // Faint secondary diagonal diamond flare
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(cx - 30, cy - 30);
      ctx.lineTo(cx + 30, cy + 30);
      ctx.moveTo(cx - 30, cy + 30);
      ctx.lineTo(cx + 30, cy - 30);
      ctx.stroke();
      ctx.restore();

      const texture = new THREE.CanvasTexture(c);
      texture.needsUpdate = true;
      return texture;
    }

    // Circular soft bead texture for smaller star nodes
    function createDotTexture() {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(240, 248, 255, 0.85)');
      grad.addColorStop(0.65, 'rgba(180, 220, 255, 0.25)');
      grad.addColorStop(1, 'rgba(140, 190, 255, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, Math.PI * 2);
      ctx.fill();

      const texture = new THREE.CanvasTexture(c);
      texture.needsUpdate = true;
      return texture;
    }

    const sparkleTexture = createSparkleTexture();
    const dotTexture = createDotTexture();

    // 3. Constellation Nodes Data in 3D Space
    const NODE_COUNT = 150;
    const BOUNDS_X = 750;
    const BOUNDS_Y = 550;
    const BOUNDS_Z = 350;

    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * BOUNDS_X * 2,
        y: (Math.random() - 0.5) * BOUNDS_Y * 2,
        z: (Math.random() - 0.5) * BOUNDS_Z * 2,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        vz: (Math.random() - 0.5) * 0.15,
        baseSize: Math.random() > 0.82 ? 14 + Math.random() * 12 : 5 + Math.random() * 5,
        isSparkle: Math.random() > 0.78,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.03
      });
    }

    // Sparkle Stars Buffer Geometry
    const sparkleIndices = [];
    const dotIndices = [];
    nodes.forEach((n, idx) => {
      if (n.isSparkle) sparkleIndices.push(idx);
      else dotIndices.push(idx);
    });

    // Sparkle Points
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePos = new Float32Array(sparkleIndices.length * 3);
    const sparkleColors = new Float32Array(sparkleIndices.length * 3);

    for (let i = 0; i < sparkleIndices.length; i++) {
      const idx = sparkleIndices[i];
      const i3 = i * 3;
      sparklePos[i3] = nodes[idx].x;
      sparklePos[i3 + 1] = nodes[idx].y;
      sparklePos[i3 + 2] = nodes[idx].z;
      sparkleColors[i3] = 1.0;
      sparkleColors[i3 + 1] = 1.0;
      sparkleColors[i3 + 2] = 1.0;
    }
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePos, 3));
    sparkleGeo.setAttribute('color', new THREE.BufferAttribute(sparkleColors, 3));

    const sparkleMat = new THREE.PointsMaterial({
      size: 22,
      map: sparkleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });
    const sparklePoints = new THREE.Points(sparkleGeo, sparkleMat);
    masterGroup.add(sparklePoints);

    // Regular Star Dots
    const dotGeo = new THREE.BufferGeometry();
    const dotPos = new Float32Array(dotIndices.length * 3);
    const dotColors = new Float32Array(dotIndices.length * 3);

    for (let i = 0; i < dotIndices.length; i++) {
      const idx = dotIndices[i];
      const i3 = i * 3;
      dotPos[i3] = nodes[idx].x;
      dotPos[i3 + 1] = nodes[idx].y;
      dotPos[i3 + 2] = nodes[idx].z;
      dotColors[i3] = 0.9;
      dotColors[i3 + 1] = 0.95;
      dotColors[i3 + 2] = 1.0;
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));
    dotGeo.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 7,
      map: dotTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });
    const dotPoints = new THREE.Points(dotGeo, dotMat);
    masterGroup.add(dotPoints);

    // 4. Dynamic 3D Plexus / Constellation Line Web
    // Pre-allocate buffer for inter-star connections
    const MAX_LINES = 700;
    const linePositions = new Float32Array(MAX_LINES * 6); // 2 vertices * 3 coords
    const lineColors = new Float32Array(MAX_LINES * 6);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      linewidth: 1.2
    });

    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    masterGroup.add(lineSegments);

    // 5. Organic Curved Neural Filaments (CatmullRom 3D Splines)
    // Matches the long flowing curved lines clearly seen in the user's reference image!
    const splineLines = [];
    const CURVE_COUNT = 14;

    for (let c = 0; c < CURVE_COUNT; c++) {
      // Pick 4-6 random anchor nodes across 3D space to thread a continuous smooth spline
      const pointCount = 4 + Math.floor(Math.random() * 3);
      const curvePoints = [];
      for (let p = 0; p < pointCount; p++) {
        const randNode = nodes[Math.floor(Math.random() * nodes.length)];
        curvePoints.push(
          new THREE.Vector3(
            randNode.x + (Math.random() - 0.5) * 80,
            randNode.y + (Math.random() - 0.5) * 80,
            randNode.z + (Math.random() - 0.5) * 80
          )
        );
      }

      const curve = new THREE.CatmullRomCurve3(curvePoints);
      curve.curveType = 'centripetal';
      curve.tension = 0.5;

      const sampledPoints = curve.getPoints(55);
      const splineGeo = new THREE.BufferGeometry().setFromPoints(sampledPoints);

      const splineMat = new THREE.LineBasicMaterial({
        color: Math.random() > 0.4 ? 0xd1d5db : 0x93c5fd,
        transparent: true,
        opacity: 0.16 + Math.random() * 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const splineMesh = new THREE.Line(splineGeo, splineMat);
      masterGroup.add(splineMesh);

      splineLines.push({
        mesh: splineMesh,
        geo: splineGeo,
        mat: splineMat,
        baseOpacity: splineMat.opacity,
        pulseOffset: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.0003
      });
    }

    // 6. Interactive Mouse & Parallax State
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    // Projected mouse cursor position in 3D scene
    const mouse3D = new THREE.Vector3(9999, 9999, 0);

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      // Normalized between -1 and 1 relative to the About section
      const relX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const relY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetMouseX = Math.max(-1, Math.min(1, relX));
      targetMouseY = Math.max(-1, Math.min(1, relY));

      // Map to 3D plane at z = 0
      mouse3D.x = targetMouseX * (BOUNDS_X * 0.85);
      mouse3D.y = targetMouseY * (BOUNDS_Y * 0.85);
      mouse3D.z = 0;
    };

    const handleMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
      mouse3D.set(9999, 9999, 0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    // 7. Responsive Resize Handling with ResizeObserver
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 8. Viewport Intersection Observer (pause animation when scrolled away)
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // 9. Main Animation Loop
    let animId;
    let time = 0;
    const CONNECT_DIST = 145;
    const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;
      time += 0.016;

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // 3D Camera tilt with smooth parallax
      camera.position.x = currentMouseX * 110;
      camera.position.y = currentMouseY * 80;
      camera.lookAt(0, 0, 0);

      // Subtle 2.5D optical shift on the underlying background image
      if (bgImgRef.current) {
        const shiftX = -currentMouseX * 14;
        const shiftY = -currentMouseY * 10;
        bgImgRef.current.style.transform = `scale(1.06) translate3d(${shiftX}px, ${shiftY}px, 0)`;
      }

      // Gentle global 3D rotation
      masterGroup.rotation.y = Math.sin(time * 0.12) * 0.06;
      masterGroup.rotation.x = Math.cos(time * 0.1) * 0.04;

      // Update node positions & bounce inside 3D volume
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];

        // Drift
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;

        // Bounce back smoothly within boundaries
        if (n.x > BOUNDS_X) { n.x = BOUNDS_X; n.vx = -Math.abs(n.vx); }
        if (n.x < -BOUNDS_X) { n.x = -BOUNDS_X; n.vx = Math.abs(n.vx); }
        if (n.y > BOUNDS_Y) { n.y = BOUNDS_Y; n.vy = -Math.abs(n.vy); }
        if (n.y < -BOUNDS_Y) { n.y = -BOUNDS_Y; n.vy = Math.abs(n.vy); }
        if (n.z > BOUNDS_Z) { n.z = BOUNDS_Z; n.vz = -Math.abs(n.vz); }
        if (n.z < -BOUNDS_Z) { n.z = -BOUNDS_Z; n.vz = Math.abs(n.vz); }

        // Subtle interactive mouse repulsion / gentle stir
        const dx = n.x - mouse3D.x;
        const dy = n.y - mouse3D.y;
        const distToMouseSq = dx * dx + dy * dy;
        if (distToMouseSq < 30000 && distToMouseSq > 1) {
          const force = (1 - Math.sqrt(distToMouseSq) / 173) * 0.8;
          n.x += (dx / Math.sqrt(distToMouseSq)) * force * 3;
          n.y += (dy / Math.sqrt(distToMouseSq)) * force * 3;
        }

        // Twinkle phase update
        n.twinklePhase += n.twinkleSpeed;
      }

      // Update Sparkle Stars Buffer
      const spPos = sparkleGeo.attributes.position.array;
      const spCol = sparkleGeo.attributes.color.array;
      for (let i = 0; i < sparkleIndices.length; i++) {
        const idx = sparkleIndices[i];
        const n = nodes[idx];
        const i3 = i * 3;
        spPos[i3] = n.x;
        spPos[i3 + 1] = n.y;
        spPos[i3 + 2] = n.z;

        // Shimmer brightness
        const lum = 0.65 + Math.sin(n.twinklePhase) * 0.35;
        spCol[i3] = lum;
        spCol[i3 + 1] = lum;
        spCol[i3 + 2] = lum;
      }
      sparkleGeo.attributes.position.needsUpdate = true;
      sparkleGeo.attributes.color.needsUpdate = true;

      // Update Dot Stars Buffer
      const dtPos = dotGeo.attributes.position.array;
      for (let i = 0; i < dotIndices.length; i++) {
        const idx = dotIndices[i];
        const n = nodes[idx];
        const i3 = i * 3;
        dtPos[i3] = n.x;
        dtPos[i3 + 1] = n.y;
        dtPos[i3 + 2] = n.z;
      }
      dotGeo.attributes.position.needsUpdate = true;

      // Build 3D Constellation Line Segments
      let lineVertexCount = 0;
      const posArr = lineGeo.attributes.position.array;
      const colArr = lineGeo.attributes.color.array;

      for (let i = 0; i < NODE_COUNT; i++) {
        const na = nodes[i];
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const nb = nodes[j];

          const dx = na.x - nb.x;
          const dy = na.y - nb.y;
          const dz = na.z - nb.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < CONNECT_DIST_SQ) {
            if (lineVertexCount / 6 >= MAX_LINES) break;

            const dist = Math.sqrt(distSq);
            // Alpha falls off smoothly as distance increases
            const alpha = Math.pow(1 - dist / CONNECT_DIST, 1.4) * 0.65;

            const pIdx = lineVertexCount;
            // Point A
            posArr[pIdx] = na.x;
            posArr[pIdx + 1] = na.y;
            posArr[pIdx + 2] = na.z;
            colArr[pIdx] = alpha;
            colArr[pIdx + 1] = alpha * 1.02;
            colArr[pIdx + 2] = alpha * 1.05;

            // Point B
            posArr[pIdx + 3] = nb.x;
            posArr[pIdx + 4] = nb.y;
            posArr[pIdx + 5] = nb.z;
            colArr[pIdx + 3] = alpha;
            colArr[pIdx + 4] = alpha * 1.02;
            colArr[pIdx + 5] = alpha * 1.05;

            lineVertexCount += 6;
          }
        }
      }

      lineGeo.setDrawRange(0, lineVertexCount / 3);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      // Animate curved neural filaments (subtle breathing opacity & drift)
      splineLines.forEach((spline) => {
        const pulse = Math.sin(time * 0.8 + spline.pulseOffset);
        spline.mat.opacity = spline.baseOpacity + pulse * 0.08;
        spline.mesh.rotation.z += spline.rotSpeed;
      });

      // Render Three.js Scene
      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      sparkleGeo.dispose();
      sparkleMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      sparkleTexture.dispose();
      dotTexture.dispose();

      splineLines.forEach((s) => {
        s.geo.dispose();
        s.mat.dispose();
      });

      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Base Layer: Exact user reference image (/about-constellation-bg.png) with soft mask */}
      <img
        ref={bgImgRef}
        src="/about-constellation-bg.png"
        alt="Neural Constellation Deep Space"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.12] transition-transform duration-100 ease-out"
        style={{
          transform: 'scale(1.06)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)'
        }}
        draggable={false}
      />

      {/* Atmospheric Vignette & Contrast Depth Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030307]/80 via-transparent to-[#030307]/85 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(3,3,7,0.4)_70%,rgba(3,3,7,0.85)_100%)] pointer-events-none" />

      {/* Interactive WebGL 3D Constellation Plexus & Neural Filaments Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ opacity: 0.95 }}
      />
    </div>
  );
}
