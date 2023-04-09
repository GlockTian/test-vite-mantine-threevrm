import React, { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { VRMExpressionPresetName } from '@pixiv/three-vrm';

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
  const [delta, setDelta] = useState(0);
  const [isOpenMouth, setIsOpenMouth] = useState(false);

  const { startTimer, endTimer } = useTimer(() => {
    if (vrm) {
      setIsOpenMouth((isOpenMouth) => !isOpenMouth);
      if (isOpenMouth) {
        vrm.expressionManager?.setValue(VRMExpressionPresetName.Aa, 0.6);
      } else {
        vrm.expressionManager?.setValue(VRMExpressionPresetName.Aa, 0);
      }
      vrm.update(delta);
    }
  }, 100);

  useEffect(() => {
    if (vrm) {
      vrm.expressionManager?.setValue(VRMExpressionPresetName.Happy, 0.5);
      vrm.update(delta);
    }
  }, [vrm]);

  return { startTimer, endTimer };
};

const VRM: React.FC<Props> = ({ vrm }) => {
  const [delta, setDelta] = useState(0);

  const { startTimer, endTimer } = useVrmSpeakingAnimation(vrm);

  useFrame(({ mouse }, delta) => {
    if (vrm) {
      if (vrm.lookAt) vrm.lookAt.lookAt(new Vector3(mouse.x, mouse.y, 0));
      vrm.update(delta);
      setDelta(delta);
    }
  });

  useEffect(() => {
    if (!vrm) return;
    setTimeout(() => {
      startTimer();
    }, 10000);
    setTimeout(() => {
      endTimer();
    }, 20000);
  }, [vrm]);

  // useEffect(() => {
  //   // create a periodic timer that trigger every second
  //   if (vrm) {
  //     setIsHappy(!isHappy);
  //     if (isHappy) {
  //       vrm.expressionManager?.setValue(VRMExpressionPresetName.Happy, 1);
  //     } else {
  //       vrm.expressionManager?.setValue(VRMExpressionPresetName.Happy, 0);
  //     }
  //     vrm.update(delta);
  //     console.log('update', delta, isHappy);
  //   }
  // }, []);

  // eslint-disable-next-line react/no-unknown-property
  return vrm && <primitive object={vrm.scene} />;
};

export default VRM;
