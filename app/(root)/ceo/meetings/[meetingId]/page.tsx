'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import VideoCall from '@/components/VideoCall';

export default function CEOMeetingRoom() {
  const { data: session } = useSession();
  const params = useParams();
  const [token, setToken] = useState<string | null>(null);
  const [callId, setCallId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const joinMeeting = async () => {
      if (!session?.user || !params.meetingId) return;

      try {
        setIsLoading(true);
        const response = await fetch(`/api/meeting/join/${params.meetingId}`, {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Failed to join meeting');
        }

        const data = await response.json();
        setToken(data.streamToken);
        setCallId(data.callId);
      } catch (error) {
        console.error('Error joining meeting:', error);
        setError('Failed to join the meeting. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    joinMeeting();
  }, [session, params.meetingId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!token || !callId || !session?.user) {
    return <div>Unable to join the meeting. Please try again later.</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <VideoCall callId={callId} token={token} userId={session.user._id} />
    </div>
  );
}