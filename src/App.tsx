import React, { useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { TextInput } from '@mantine/core';
import Controls from './Controls';
import { useToggle, useVRM } from './hooks';
import Inputs from './Inputs';
import VRM from './VRM';
import { ThemeProvider } from './ThemeProvider';

const FixedTextInput: React.FC = () => (
  <div
    style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      padding: '10px',
      borderTop: '1px solid #ccc',
    }}
  >
    <TextInput placeholder="Type your message here" />
  </div>
);

const App: React.FC = () => {
  const [vrm, loadVRM, loadMaxiamo] = useVRM();
  const [showGrid, showGridToggle] = useToggle(false);
  const [animationClip, setAnimationClip] = useState<AnimationClip | null>(null);

  const handleFileChange = useCallback(
    async (file: File) => {
      const url = URL.createObjectURL(file);
      await loadVRM(url);
      URL.revokeObjectURL(url);
    },
    [loadVRM]
  );

  const handleMixamoFileChange = useCallback(
    async (file: File) => {
      const url = URL.createObjectURL(file);
      loadMaxiamo(url).then((clip) => {
        console.log(clip);
        setAnimationClip(clip);
      });
      URL.revokeObjectURL(url);
    },
    [loadMaxiamo]
  );

  return (
    <ThemeProvider>
      <Inputs
        onFileChange={handleFileChange}
        onMaxiamoChange={handleMixamoFileChange}
        checked={showGrid}
        onCheckChange={showGridToggle}
      />
      <Canvas camera={{ position: [0, 1.5, 2], fov: 60, near: 0.01, far: 1000 }}>
        <directionalLight />
        <VRM vrm={vrm} clip={animationClip} />
        <Controls />
        <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeBufferGeometry args={[100, 100]} />
          <meshStandardMaterial color="#ccc" />
        </mesh>
        {showGrid && (
          <>
            <gridHelper />
            <axesHelper />
          </>
        )}
      </Canvas>
      <FixedTextInput />
    </ThemeProvider>
  );
};

export default App;
