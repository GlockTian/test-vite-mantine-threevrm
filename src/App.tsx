import React, { useCallback } from 'react';
import { Canvas } from 'react-three-fiber';
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
  const [vrm, loadVRM] = useVRM();
  const [showGrid, showGridToggle] = useToggle(false);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const url = URL.createObjectURL(event.target.files![0]);
      await loadVRM(url);
      URL.revokeObjectURL(url);
    },
    [loadVRM]
  );

  return (
    <ThemeProvider>
      <Inputs onFileChange={handleFileChange} checked={showGrid} onCheckChange={showGridToggle} />
      <Canvas camera={{ position: [0, 1.5, 2], fov: 60, near: 0.01, far: 1000 }}>
        <directionalLight />
        <VRM vrm={vrm} />
        <Controls />
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
