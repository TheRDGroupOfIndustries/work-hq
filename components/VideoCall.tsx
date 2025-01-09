'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  StreamVideo,
  StreamVideoClient,
  Call,
  CallControls as StreamCallControls,
  SpeakerLayout,
  StreamTheme,
  StreamCall,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface VideoCallProps {
  callId: string;
  token: string;
  userId: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ callId, token, userId }) => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  // Initialize client and call
  useEffect(() => {
    let mounted = true;
    let videoClient: StreamVideoClient | null = null;

    const initClient = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
        if (!apiKey) {
          throw new Error('Stream API key is not defined');
        }

        videoClient = new StreamVideoClient({
          apiKey,
          user: { id: userId },
          token,
        });

        await videoClient.connectUser({ id: userId }, token);
        
        if (mounted) {
          setClient(videoClient);
          const newCall = videoClient.call('default', callId);
          await newCall.join({ create: true });
          setCall(newCall);
        }
      } catch (err) {
        console.error('Error initializing Stream client:', err);
        if (mounted) {
          setError('Failed to initialize video call. Please try again.');
        }
      }
    };

    initClient();

    // Cleanup function
    return () => {
      mounted = false;
      if (videoClient) {
        videoClient.disconnectUser();
      }
    };
  }, [userId, token, callId]);

  // Handle window visibility changes
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.hidden && call) {
        try {
          await call.leave();
          if (client) {
            await client.disconnectUser();
          }
        } catch (error) {
          console.error('Error during visibility change cleanup:', error);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [call, client]);

  const handleLeave = useCallback(async () => {
    try {
      if (call) {
        await call.leave();
      }
      if (client) {
        await client.disconnectUser();
      }

      // Determine redirect path based on user role
      let redirectPath = '';
      if (session?.user?.role === 'ceo') {
        redirectPath = '/ceo/meetings/details';
      } else if (session?.user?.role === 'developer') {
        const projectId = window.location.pathname.split('/')[3];
        redirectPath = `/dev/project/${projectId}/meetings/details`;
      } else if (session?.user?.role === 'client') {
        const projectId = window.location.pathname.split('/')[3];
        redirectPath = `/c/project/${projectId}/meetings/details`;
      }

      // Post to leave endpoint
      const response = await fetch('/api/meeting/leave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ callId }),
      });

      if (!response.ok) {
        throw new Error('Failed to leave meeting');
      }

      // Redirect user
      router.push(redirectPath);
    } catch (error) {
      console.error('Error leaving meeting:', error);
      setError('Failed to leave the meeting. Please try again.');
    }
  }, [call, client, session?.user?.role, callId, router]);

  // Handle beforeunload event
  useEffect(() => {
    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
      e.preventDefault();
      try {
        if (call) {
          await call.leave();
        }
        if (client) {
          await client.disconnectUser();
        }
      } catch (error) {
        console.error('Error during beforeunload cleanup:', error);
      }
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [call, client]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!client || !call) {
    return <div>Initializing video call...</div>;
  }

  // Custom CallControls component that wraps Stream's CallControls
  const CustomCallControls = () => (
    <div className="relative">
      <StreamCallControls onLeave={handleLeave} />
    </div>
  );

  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <SpeakerLayout />
          <CustomCallControls />
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
};

export default VideoCall;