import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

type Props = {
  vrm: import('@pixiv/three-vrm').VRM | null;
};

const VRM: React.FC<Props> = ({ vrm }) => {
  useFrame(({ mouse }, delta) => {
    if (vrm) {
      if (vrm.lookAt) vrm.lookAt.lookAt(new Vector3(mouse.x, mouse.y, 0));
      vrm.update(delta);
    }
  });

  // eslint-disable-next-line react/no-unknown-property
  return vrm && <primitive object={vrm.scene} />;
};

export default VRM;
