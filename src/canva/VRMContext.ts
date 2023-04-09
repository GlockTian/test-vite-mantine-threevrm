import { VRMExpressionPresetName } from '@pixiv/three-vrm';
import { createContext } from 'react';
type VRM = import('@pixiv/three-vrm').VRM;

// Define the type for the VRM context data
type VRMContextType = {
  vrm: VRM | null;
  loadVRM: (url: string) => Promise<void>;
  emotion: VRMExpressionPresetName;
  setEmotion: (emotion: VRMExpressionPresetName) => void;
};

// Create the VRM context with an initial value of null
const VRMContext = createContext<VRMContextType>({
  vrm: null,
  loadVRM: () => Promise.resolve(),
  emotion: VRMExpressionPresetName.Neutral,
  setEmotion: () => {},
});

export default VRMContext;
