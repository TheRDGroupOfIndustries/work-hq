'use client';

import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import '@stream-io/video-react-sdk/dist/css/styles.css';

export const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);

  useEffect(() => {
    if (!session?.user?._id) return;

    const streamVideo = new StreamVideoClient(process.env.NEXT_PUBLIC_STREAM_API_KEY!);
    
    const connect = async () => {
      await streamVideo.connectUser(
        {
          id: session.user._id,
          name: session.user.firstName,
          image: session.user.profile_image,
        },
        async () => {
          // Get token from backend
          const response = await fetch('/api/stream/token');
          const { token } = await response.json();
          return token;
        }
      );
    };

    connect();
    setClient(streamVideo);

    return () => {
      streamVideo?.disconnectUser();
      setClient(null);
    };
  }, [session]);

  if (!client) return null;

  return <StreamVideo client={client}>{children}</StreamVideo>;
}