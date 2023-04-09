import { VRMHumanBoneName, VRMExpressionPresetName } from '@pixiv/three-vrm';

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
  // iterate through all vrm emotion
  Object.values(VRMExpressionPresetName).forEach((emotion) => {
    vrm.expressionManager?.setValue(emotion as VRMExpressionPresetName, 0);
  });
};

const vrmEmotion = (vrm: VRM, emotion: VRMExpressionPresetName) => {
  vrmClearAllEmotion(vrm);
  vrm.expressionManager?.setValue(emotion as VRMExpressionPresetName, 1);
  console.log(emotion);
};

export { vrmArmsDown, vrmArmsUp, vrmEmotion, vrmClearAllEmotion };
