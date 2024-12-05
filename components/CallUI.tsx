import React from 'react';
import {
  SpeakerLayout,
  CallControls,
  useCall,
  StreamCall,
} from '@stream-io/video-react-sdk';

const CallUI: React.FC = () => {
  const call = useCall();

  if (!call) {
    return null;
  }

  return (
    <StreamCall call={call}>
      <SpeakerLayout />
      <CallControls />
    </StreamCall>
  );
};

export default CallUI;