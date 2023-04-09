import { VRMHumanBoneName, VRMExpressionPresetName } from '@pixiv/three-vrm';
import { EMOTIONS, TALK_EXPRESSIONS } from '../utils/Emotion';

type VRM = import('@pixiv/three-vrm').VRM;
const vrmArmsDown = (vrm: VRM) => {
  vrm.humanoid
    .getNormalizedBoneNode(VRMHumanBoneName.LeftUpperArm)
    ?.rotation.set(0, 0, 0.4 * Math.PI);
  vrm.humanoid
    .getNormalizedBoneNode(VRMHumanBoneName.RightUpperArm)
    ?.rotation.set(0, 0, -0.4 * Math.PI);
};

const vrmArmsUp = (vrm: VRM) => {
  vrm.humanoid
    .getNormalizedBoneNode(VRMHumanBoneName.LeftUpperArm)
    ?.rotation.set(0, 0, 0.2 * Math.PI);
  vrm.humanoid
    .getNormalizedBoneNode(VRMHumanBoneName.RightUpperArm)
    ?.rotation.set(0, 0, -0.2 * Math.PI);
};

const vrmClearAllEmotion = (vrm: VRM) => {
  EMOTIONS.forEach((emotion) => {
    vrm.expressionManager?.setValue(emotion as VRMExpressionPresetName, 0);
  });
};

const vrmClearAllTalkExpression = (vrm: VRM) => {
  TALK_EXPRESSIONS.forEach((emotion) => {
    vrm.expressionManager?.setValue(emotion as VRMExpressionPresetName, 0);
  });
};

const vrmTalk = (vrm: VRM, emotion: VRMExpressionPresetName) => {
  vrmClearAllTalkExpression(vrm);
  vrm.expressionManager?.setValue(emotion as VRMExpressionPresetName, 0.5);
};

const vrmEmotion = (vrm: VRM, emotion: VRMExpressionPresetName) => {
  vrmClearAllEmotion(vrm);
  vrm.expressionManager?.setValue(emotion as VRMExpressionPresetName, 0.5);
};

export {
  vrmArmsDown,
  vrmArmsUp,
  vrmEmotion,
  vrmClearAllEmotion,
  vrmTalk,
  vrmClearAllTalkExpression,
};
