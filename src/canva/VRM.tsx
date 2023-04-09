import React, { useContext, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { VRMExpressionPresetName, VRMHumanBoneName } from '@pixiv/three-vrm';
import { vrmArmsDown, vrmEmotion } from './VrmAction';
import VRMContext from './VRMContext';

type Props = {
  vrm: import('@pixiv/three-vrm').VRM | null;
};

const useTimer = (callback: () => void, delay: number) => {
  const savedCallback = React.useRef<() => void>();
  const [id, setId] = useState<NodeJS.Timeout | null>(null);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (!start) return;
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      setId(id);
      return () => clearInterval(id);
    }
  }, [delay, start]);

  const endTimer = () => {
    if (id) {
      clearInterval(id);
      setEnd(true);
    }
  };

  const startTimer = () => {
    setStart(true);
  };

  return { id, startTimer, endTimer };
};

const useVrmSpeakingAnimation = (vrm: import('@pixiv/three-vrm').VRM | null) => {
  const [isOpenMouth, setIsOpenMouth] = useState(false);

  const { startTimer, endTimer } = useTimer(() => {
    if (vrm) {
      setIsOpenMouth((isOpenMouth) => !isOpenMouth);
      if (isOpenMouth) {
        vrm.expressionManager?.setValue(VRMExpressionPresetName.Aa, 0.6);
      } else {
        vrm.expressionManager?.setValue(VRMExpressionPresetName.Aa, 0);
      }
    }
  }, 100);

  return { startTimer, endTimer };
};

const VRM: React.FC<Props> = ({ vrm }) => {
  const { startTimer, endTimer } = useVrmSpeakingAnimation(vrm);
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
