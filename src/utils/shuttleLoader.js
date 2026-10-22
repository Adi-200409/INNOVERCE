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

      const envMap = texLoader.load('/cosmic-space-bg.jpg');
      envMap.mapping = THREE.EquirectangularReflectionMapping;

      const shuttleMaterial = new THREE.MeshStandardMaterial({
        map: baseColorMap,
        normalMap: normalMap,
        metalnessMap: metallicMap,
        roughnessMap: roughnessMap,
        metalness: 0.88,
        roughness: 0.32,
        envMap: envMap,
        envMapIntensity: 1.75
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
