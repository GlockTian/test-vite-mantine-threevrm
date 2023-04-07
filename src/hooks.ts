import { VRM, VRMLoaderPlugin } from '@pixiv/three-vrm';
import { useCallback, useRef, useState } from 'react';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationClip } from 'three';
import { loadMixamoAnimation } from './utils/loadMixamoAnimation';

const useVRM = (): [
  VRM | null,
  (url: string) => Promise<void>,
  (url: string) => Promise<AnimationClip>
] => {
  const { current: loader } = useRef(new GLTFLoader());
  const [vrm, setVRM] = useState<VRM | null>(null);

  const loadVRM = useCallback((url: string): Promise<void> => {
    loader.register((parser) => new VRMLoaderPlugin(parser)); // here we are installing VRMLoaderPlugin

    return new Promise((resolve: (_: GLTF) => void) => {
      loader.load(url, resolve);
    })
      .then((gltf) => gltf.userData.vrm)
      .then((v: VRM) => {
        const vrmLocal = v;
        vrmLocal.scene.rotation.y = Math.PI;
        console.log(vrmLocal);
        setVRM(vrmLocal);
      });
  }, []);

  const loadMaxiamo = useCallback(
    (url: string): Promise<AnimationClip> => {
      console.log('loadMaxiamo');
      console.log(vrm);
      if (!vrm) return Promise.reject();
      return Promise.resolve(loadMixamoAnimation(url, vrm));
    },
    [vrm]
  );

  return [vrm, loadVRM, loadMaxiamo];
};

const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((prev) => !prev), []);

  return [state, toggle];
};

export { useVRM, useToggle };
