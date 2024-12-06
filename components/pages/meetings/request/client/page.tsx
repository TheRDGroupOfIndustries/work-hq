"use client";
import ZoomVideo from "@/components/icons/ZoomVideo";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { useCallback, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useProjectContext } from '@/context/ProjectProvider';
import { initializeStreamVideo } from '@/lib/stream-video';
import Headline from "../components/headline";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLE } from "@/tempData";
import { StreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of ["00", "15", "30", "45"]) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute}`;
      times.push(timeString);
    }
  }
  return times;
};

export default function MeetingsRequest() {
  const { data: session } = useSession();
  const { selectedProject } = useProjectContext();
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [attendees, setAttendees] = useState<string[]>([]);
  const [isInstant, setIsInstant] = useState(false);
  const [streamClient, setStreamClient] = useState<StreamVideoClient | null>(null);

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    if (session?.user) {
      const initStream = async () => {
        const response = await fetch('/api/meeting/join/token');
        const { token } = await response.json();
        const client = await initializeStreamVideo(session.user._id, token);
        setStreamClient(client);
      };

      initStream();
    }
  }, [session]);

  const handleSubmit = useCallback(async () => {
    if (!session?.user || !selectedProject || !streamClient) return;

    try {
      // Create meeting in database
      const response = await fetch('/api/meeting/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'project_id': selectedProject,
        },
        body: JSON.stringify({
          title,
          meetingDescription: description,
          date: date?.toISOString(),
          startTime,
          endTime,
          attendees,
          isInstant,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create meeting');
      }

      const { meeting } = await response.json();

      // If instant meeting, join immediately
      if (isInstant) {
        const call = streamClient.call('default', meeting.streamCallId);
        await call.join();
        // Navigate to meeting room or open meeting UI
      } else {
        router.push(`/c/project/${selectedProject}/meetings/details`);
      }

    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  }, [date, description, endTime, isInstant, selectedProject, session?.user, startTime, title, attendees, streamClient, router]);

  return (
    <MainContainer role={ROLE}>
      <Headline handleSubmit={handleSubmit} />

      <div className="w-full flex flex-row gap-5">
        <div className="w-1/2 flex flex-col gap-7 rounded-3xl shadow-[5px_5px_20px_0px_#7BA9EF99,-5px_-5px_20px_0px_#FFFFFF,5px_5px_20px_0px_#7BA9EF99_inset,-5px_-5px_20px_0px_#FFFFFF_inset] p-6">
          <div className="w-full flex flex-col gap-5">
            <div className="w-full flex flex-col gap-2">
              <Label>Meeting Title</Label>
              <input
                type="text"
                placeholder="Meeting Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
                required
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Label>Meeting Description</Label>
              <Textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="Meeting Description"
                className="w-full resize-none border-0 p-3 focus-visible:ring-0 h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
              />
            </div>
          </div>
          <div className="w-full flex flex-row gap-5">
            <div className="flex flex-col gap-2">
              <Label>Select Date </Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md w-fit shadow-neuro-3"
              />
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="space-y-2">
                <label className="block mb-2">Start Time</label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Start Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block mb-2">End Time</label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="End Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 h-[400px] flex flex-col gap-4">
          <h1>Meeting Requests Preview</h1>
          <div className="w-full h-full flex flex-col">
            {meetingRequests.map((meeting, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-between w-full hover:shadow-neuro-3 p-4 px-6 rounded-xl cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <ZoomVideo />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600">
                      {meeting.title}
                    </h3>
                    <p className="text-gray-700">{meeting.description}</p>
                    <p className="text-gray-600">
                      {meeting.date} | {meeting.from} - {meeting.to}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainContainer>
  );
}