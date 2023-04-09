import React, { useContext, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { VRMExpressionPresetName, VRMHumanBoneName } from '@pixiv/three-vrm';
import { vrmArmsDown, vrmEmotion } from './VrmAction';
import VRMContext from './VRMContext';

type Props = {
  vrm: import('@pixiv/three-vrm').VRM | null;
};

const VRM: React.FC<Props> = ({ vrm }) => {
  const { emotion } = useContext(VRMContext);

  useFrame(({ mouse, camera }, delta) => {
    if (vrm) {
      // if (vrm.lookAt) vrm.lookAt.lookAt(new Vector3(mouse.x, mouse.y, 0));
      if (vrm.lookAt) vrm.lookAt.lookAt(camera?.position);

      vrmEmotion(vrm, emotion);
      vrm.update(delta);
    }
  });

  useEffect(() => {
    if (vrm) {
      vrmArmsDown(vrm);
    }
  }, [vrm]);

  // eslint-disable-next-line react/no-unknown-property
  return vrm && <primitive object={vrm.scene} />;
};

export default VRM;
