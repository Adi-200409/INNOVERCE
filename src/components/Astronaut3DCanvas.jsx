import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Cached gltf scene so subsequent mounts are instant
let cachedGltfScene = null;

export default function Astronaut3DCanvas({
  thrusterActive = false,
  onModelLoaded = null,
  className = ''
}) {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(!cachedGltfScene);
  const thrusterActiveRef = useRef(thrusterActive);
  thrusterActiveRef.current = thrusterActive;

  const modelGroupRef = useRef(null);
  const baseRotationRef = useRef({ x: 0.28, y: -0.45, z: -0.65 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 360;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.4);

    // 2. Renderer with transparent background & tone mapping
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // 3. Cinematic Lighting (Solar Corona Sun Key + Earth Albedo Fill)
    // Key Sun Light: Golden Amber from upper right
    const sunLight = new THREE.DirectionalLight(0xffbe3b, 3.2);
    sunLight.position.set(4, 5, 3);
    scene.add(sunLight);

    // Rim Solar Specular
    const rimSunLight = new THREE.DirectionalLight(0xf59e0b, 2.0);
    rimSunLight.position.set(3, -2, -3);
    scene.add(rimSunLight);

    // Earth Albedo Fill: Cool cyan/blue from lower left
    const earthLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    earthLight.position.set(-4, -3, 2);
    scene.add(earthLight);

    // Deep Space Ambient
    const ambientLight = new THREE.AmbientLight(0x0f172a, 0.85);
    scene.add(ambientLight);

    // RCS Thruster Burst Dynamic Point Light (cyan)
    const thrusterLight = new THREE.PointLight(0x00f0ff, 0, 4);
    thrusterLight.position.set(-0.35, 0.25, -0.6);
    scene.add(thrusterLight);

    // 4. Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // 5. Thruster Particle System (3D glowing gas puffs)
    const PARTICLE_COUNT = 35;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleData = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlePositions[i * 3] = -0.32;
      particlePositions[i * 3 + 1] = 0.2;
      particlePositions[i * 3 + 2] = -0.45;

      particleData.push({
        vx: -(Math.random() * 0.06 + 0.03),
        vy: (Math.random() - 0.5) * 0.03,
        vz: -(Math.random() * 0.04 + 0.01),
        life: 0,
        maxLife: Math.random() * 25 + 15
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle sprite
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.8)');
    grad.addColorStop(0.8, 'rgba(6, 182, 212, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const particleTexture = new THREE.CanvasTexture(canvas);
    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    modelGroup.add(particles);

    // 6. Model Loader
    const setupAstronautModel = (astronautScene) => {
      // Center and orient model
      const box = new THREE.Box3().setFromObject(astronautScene);
      const center = new THREE.Vector3();
      box.getCenter(center);
      astronautScene.position.sub(center);

      // Load deep space reflection map
      const texLoader = new THREE.TextureLoader();
      const envMap = texLoader.load('/cosmic-space-bg.jpg');
      envMap.mapping = THREE.EquirectangularReflectionMapping;

      // Apply high-fidelity material adjustments
      astronautScene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.envMap = envMap;
          child.material.envMapIntensity = 2.2;
          child.material.metalness = 0.38;
          child.material.roughness = 0.42;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Initial natural floating posture
      modelGroup.rotation.x = baseRotationRef.current.x;
      modelGroup.rotation.y = baseRotationRef.current.y;
      modelGroup.rotation.z = baseRotationRef.current.z;

      modelGroup.add(astronautScene);
      setLoading(false);
      if (onModelLoaded) onModelLoaded();
    };

    if (cachedGltfScene) {
      setupAstronautModel(cachedGltfScene.clone(true));
    } else {
      const loader = new GLTFLoader();
      loader.load(
        '/astronaut.glb',
        (gltf) => {
          cachedGltfScene = gltf.scene;
          setupAstronautModel(gltf.scene);
        },
        undefined,
        (err) => {
          console.warn('Astronaut GLB load error, using fallback:', err);
          setLoading(false);
        }
      );
    }

    // 7. Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || 320;
      height = container.clientHeight || 360;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 8. 60 FPS Zero-G Animation Loop (Pure zero-g physics, completely decoupled from mouse)
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (modelGroup) {
        // Zero-G Sinusoidal bobbing & drift
        const idleBobY = Math.sin(elapsed * 1.4) * 0.07;
        const idleSwayX = Math.cos(elapsed * 0.9) * 0.04;
        const idleRollZ = Math.sin(elapsed * 1.1) * 0.03;

        // Stable fixed orientation with gentle zero-g roll oscillation
        modelGroup.rotation.x = baseRotationRef.current.x;
        modelGroup.rotation.y = baseRotationRef.current.y;
        modelGroup.rotation.z = baseRotationRef.current.z + idleRollZ;

        // Pure Zero-G position drift
        modelGroup.position.y = idleBobY;
        modelGroup.position.x = idleSwayX;

        // RCS Thruster Point Light & Particles
        const isThruster = thrusterActiveRef.current;
        thrusterLight.intensity = isThruster ? 3.5 : 0;

        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const p = particleData[i];
          if (isThruster) {
            p.life += 1;
            positions[i * 3] += p.vx;
            positions[i * 3 + 1] += p.vy;
            positions[i * 3 + 2] += p.vz;

            if (p.life > p.maxLife) {
              p.life = 0;
              positions[i * 3] = -0.32;
              positions[i * 3 + 1] = 0.2;
              positions[i * 3 + 2] = -0.45;
            }
          } else {
            // Hide particles when idle
            positions[i * 3] = -0.32;
            positions[i * 3 + 1] = 0.2;
            positions[i * 3 + 2] = -0.45;
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.visible = isThruster;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);

      try {
        renderer.dispose();
        scene.clear();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      } catch (e) {
        // teardown
      }
    };
  }, []);

  return (
    <div className={`relative pointer-events-none ${className}`}>
      {/* 3D Canvas Mounting Container */}
      <div
        ref={mountRef}
        className="w-full h-full pointer-events-none select-none"
      />

      {/* Loading Skeleton */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" />
            <div
              className="absolute inset-2 rounded-full border-2 border-cyan-400/20 border-b-cyan-400 animate-spin"
              style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}
            />
          </div>
          <span className="mt-2 font-mono text-[9px] text-amber-400/70 tracking-widest uppercase">
            STREAMING 3D ASTRONAUT...
          </span>
        </div>
      )}
    </div>
  );
}
