import { VRM, VRMExpressionPresetName } from '@pixiv/three-vrm';
import { useState } from 'react';
import useTimer from './useTimer';
import { TALK_EXPRESSIONS } from '../utils/Emotion';
import { vrmTalk } from '../canva/VrmAction';

const useVrmSpeakingAnimation = (vrm: VRM | null) => {
  const [talkExpressionIndex, setTalkExpressionIndex] = useState(0);

  const { startTimer, endTimer } = useTimer(() => {
    if (vrm) {
      //set a random expression
      setTalkExpressionIndex(Math.floor(Math.random() * TALK_EXPRESSIONS.length));
      vrmTalk(vrm, TALK_EXPRESSIONS[talkExpressionIndex] as VRMExpressionPresetName);
    }
  }, 100);

  return { startTimer, endTimer };
};

export default useVrmSpeakingAnimation;
