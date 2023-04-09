// create a side panel component
// this component will be used to display the list of VRM emotions
// and the list of VRM actions

import { Button, Drawer, Flex } from '@mantine/core';
import { VRMExpressionPresetName } from '@pixiv/three-vrm';
import { vrmEmotion } from '../canva/VrmAction';
import { useContext, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import VRMContext from '../canva/VRMContext';
import { useDisclosure } from '@mantine/hooks';

type VRM = import('@pixiv/three-vrm').VRM;
const EMOTIONS = [
  VRMExpressionPresetName.Happy,
  VRMExpressionPresetName.Angry,
  VRMExpressionPresetName.Sad,
  VRMExpressionPresetName.Surprised,
  VRMExpressionPresetName.Neutral,
];

type Props = {
  vrm: import('@pixiv/three-vrm').VRM | null;
};
const SidePanel: React.FC<Props> = ({ vrm }) => {
  const { setEmotion } = useContext(VRMContext);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Flex
        wrap={'wrap'}
        direction={'column'}
        pos={'fixed'}
        top={0}
        right={0}
        gap={10}
        style={{
          zIndex: 100,
        }}
      >
        <Button onClick={open}>Open</Button>
        <Drawer
          position="right"
          overlayProps={{ opacity: 0, blur: 4 }}
          opened={opened}
          onClose={close}
          title="Authentication"
        >
          {Object.values(EMOTIONS).map((emotion) => (
            <Button
              variant="outline"
              key={emotion}
              onClick={() => {
                if (vrm) {
                  setEmotion(emotion as VRMExpressionPresetName);
                }
              }}
            >
              {emotion}
            </Button>
          ))}
        </Drawer>
      </Flex>
    </>
  );
};

export default SidePanel;
