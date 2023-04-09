import { FC, useState } from 'react';
import VRMContext from './VRMContext';
import { useVRM } from '../hooks';
import { VRMExpressionPresetName } from '@pixiv/three-vrm';
type VRM = import('@pixiv/three-vrm').VRM;

// Define the type for the VRM provider props
type VRMProviderProps = {
  children: React.ReactNode;
};

// Create the VRM provider component
const VRMProvider: FC<VRMProviderProps> = ({ children }) => {
  // Define the state for the VRM
  const [vrm, loadVRM] = useVRM();
  const [emotion, setEmotion] = useState<VRMExpressionPresetName>(VRMExpressionPresetName.Neutral);

  // Provide the VRM context value to its children
  return (
    <VRMContext.Provider value={{ vrm, loadVRM, emotion, setEmotion }}>
      {children}
    </VRMContext.Provider>
  );
};

export { VRMProvider };
