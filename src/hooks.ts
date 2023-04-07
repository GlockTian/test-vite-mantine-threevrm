import { VRM, VRMLoaderPlugin } from '@pixiv/three-vrm';
import { useCallback, useRef, useState } from 'react';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const useVRM = (): [VRM | null, (url: string) => Promise<void>] => {
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
        setVRM(vrmLocal);
      });
  }, []);

  return [vrm, loadVRM];
};

const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((prev) => !prev), []);

  return [state, toggle];
};

export { useVRM, useToggle };
