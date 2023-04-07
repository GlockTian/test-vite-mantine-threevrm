import { Checkbox, FileInput, Group } from '@mantine/core';
import React from 'react';

type Props = {
  onFileChange: (_: File) => void;
  onMaxiamoChange: (_: File) => void;
  checked: boolean;
  onCheckChange: (_: boolean) => void;
};

const Inputs: React.FC<Props> = ({ onFileChange, onMaxiamoChange, checked, onCheckChange }) => (
  <Group style={{ position: 'fixed', top: 0, left: 10, right: 0, zIndex: 1 }}>
    <FileInput accept=".vrm" onChange={onFileChange} placeholder="Load VRM" />
    <FileInput accept=".fbx" onChange={onMaxiamoChange} placeholder="Load Maxiamo" />
    <Checkbox
      checked={checked}
      onChange={(e) => onCheckChange(e.currentTarget.checked)}
      label="show grid"
    />
  </Group>
);

export default Inputs;
