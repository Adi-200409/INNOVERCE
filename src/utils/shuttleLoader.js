import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

/**
 * Shared Singleton Shuttle Model Loader & Cache
 * Loads and parses the 3MB space shuttle OBJ and PBR textures ONCE.
 * Eliminates synchronous parsing jank during transitions.
 */
let cachedModel = null;
let loadPromise = null;

export function preloadShuttleModel() {
  if (cachedModel) return Promise.resolve(cachedModel);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve) => {
    try {
      const texLoader = new THREE.TextureLoader();
      const baseColorMap = texLoader.load('/nexus-1-space-shuttle/space_shuttle_3d_model_basecolor.JPEG');
      baseColorMap.colorSpace = THREE.SRGBColorSpace;
      const normalMap = texLoader.load('/nexus-1-space-shuttle/space_shuttle_3d_model_normal.JPEG');
      const metallicMap = texLoader.load('/nexus-1-space-shuttle/space_shuttle_3d_model_metallic.JPEG');
      const roughnessMap = texLoader.load('/nexus-1-space-shuttle/space_shuttle_3d_model_roughness.JPEG');

      // Authentic Space Shuttle Ceramic PBR Material (dielectric white ceramic tiles with soft cosmic starlight fill)
      const shuttleMaterial = new THREE.MeshStandardMaterial({
        map: baseColorMap,
        normalMap: normalMap,
        metalnessMap: metallicMap,
        roughnessMap: roughnessMap,
        color: new THREE.Color(0xffffff),
        metalness: 0.12,
        roughness: 0.45,
        emissive: new THREE.Color(0x283344), // Subtle ambient illumination so it NEVER turns pitch black in orbit
        emissiveIntensity: 0.45
      });

      const objLoader = new OBJLoader();
      objLoader.load(
        '/nexus-1-space-shuttle/space_shuttle.obj',
        (obj) => {
          obj.traverse((child) => {
            if (child.isMesh) {
              child.material = shuttleMaterial;
            }
          });
          // Center & orient model forward along +Z
          obj.position.set(0, -0.184, 0);
          obj.rotation.y = Math.PI / 2;

          cachedModel = obj;
          resolve(obj);
        },
        undefined,
        (err) => {
          console.warn('Shuttle OBJ preloader fallback:', err);
          resolve(null);
        }
      );
    } catch (e) {
      console.warn('Shuttle preloader exception:', e);
      resolve(null);
    }
  });

  return loadPromise;
}

export function getCachedShuttleModel() {
  return cachedModel;
}

export function cloneShuttleModel() {
  if (!cachedModel) return null;
  return cachedModel.clone(true);
}
