'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import VideoCall from '@/components/VideoCall';
import { Button } from '@/components/ui/button';

export default function MeetingRoom() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [callId, setCallId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const joinMeeting = async () => {
      if (!session?.user || !params.meetingId) return;

      try {
        const response = await fetch(`/api/meeting/join/${params.meetingId}`, {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Failed to join meeting');
        }

        const data = await response.json();
        setToken(data.streamToken);
        setCallId(data.callId);
        setIsRecording(data.isRecording);
      } catch (error) {
        console.error('Error joining meeting:', error);
      }
    };

    joinMeeting();
  }, [session, params.meetingId]);

  const handleEndMeeting = async () => {
    if (!callId) return;

    try {
      await fetch(`/api/meeting/end/${callId}`, { method: 'POST' });
      router.push(`/c/project/${params.name}/meetings/details`);
    } catch (error) {
      console.error('Error ending meeting:', error);
    }
  };

  if (!token || !callId || !session?.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <VideoCall callId={callId} token={token} userId={session.user._id} />
      <div className="p-4 flex justify-center">
        <Button onClick={handleEndMeeting} variant="destructive">End Meeting</Button>
      </div>
    </div>
  );
}