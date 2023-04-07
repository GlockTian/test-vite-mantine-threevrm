import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Vector3 } from 'three';

type Props = {
  vrm: import('@pixiv/three-vrm').VRM | null;
  clip: import('three').AnimationClip | null;
};

const VRM: React.FC<Props> = ({ vrm, clip }) => {
  let mixer: THREE.AnimationMixer | null = null;
  if (vrm && clip) {
    mixer = new THREE.AnimationMixer(vrm?.scene);
    const action = mixer.clipAction(clip);
    action.play();
  }
  useFrame(({ mouse }, delta) => {
    if (vrm) {
      if (vrm.lookAt) vrm.lookAt.lookAt(new Vector3(mouse.x, mouse.y, 0));

      vrm.update(delta);
    }

    if (vrm && clip && mixer) {
      mixer?.update(delta);
    }
  });

  // eslint-disable-next-line react/no-unknown-property
  return vrm && <primitive object={vrm.scene} />;
};

export default VRM;
