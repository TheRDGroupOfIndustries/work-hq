'use client';

import React, { useEffect } from 'react';
import {
  StreamVideo,
  useStreamVideoClient,
  useCall,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import CallUI from './CallUI';
import { StreamVideoClient } from '@stream-io/video-client';

interface VideoCallProps {
  callId: string;
  token: string;
  userId: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ callId, token, userId }) => {
  const [client, setClient] = React.useState<StreamVideoClient | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const initClient = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
        if (!apiKey) {
          throw new Error('Stream API key is not defined');
        }

        const videoClient = new StreamVideoClient({
          apiKey,
          user: { id: userId },
          token,
        });

        await videoClient.connectUser({ id: userId }, token);
        setClient(videoClient);
      } catch (err) {
        console.error('Error initializing Stream client:', err);
        setError('Failed to initialize video call. Please try again.');
      }
    };

    initClient();

    return () => {
      client?.disconnectUser();
    };
  }, [userId, token, client]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!client) {
    return <div>Initializing video call...</div>;
  }

  return (
    <StreamVideo client={client}>
      <StreamVideoCall callId={callId} />
    </StreamVideo>
  );
};

const StreamVideoCall: React.FC<{ callId: string }> = ({ callId }) => {
  const client = useStreamVideoClient();
  const call = useCall();

  useEffect(() => {
    const initCall = async () => {
      if (client && !call) {
        const newCall = client.call('default', callId);
        await newCall.join({ create: true });
      }
    };

    initCall();

    return () => {
      call?.leave();
    };
  }, [client, callId, call]);

  if (!call) {
    return <div>Joining call...</div>;
  }

  return <CallUI />;
};

export default VideoCall;