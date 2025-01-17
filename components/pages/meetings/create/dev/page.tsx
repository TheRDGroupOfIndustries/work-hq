"use client";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { useCallback, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useProjectContext } from '@/context/ProjectProvider';
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
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';
import { CustomUser } from "@/lib/types";

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

interface Developer extends CustomUser {
  _id: string;
  firstName: string;
  lastName?: string;
}

export default function MeetingsRequest() {
  const { data: session } = useSession();
  const { selectedProject } = useProjectContext();
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isInstant, setIsInstant] = useState(false);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    const fetchDevelopers = async () => {
      if (!selectedProject?._id) return;

      try {
        const response = await fetch(`/api/users?projectId=${selectedProject._id}&role=developer`);
        if (!response.ok) throw new Error('Failed to fetch developers');
        const data = await response.json();
        setDevelopers(data);
      } catch (error) {
        console.error('Error fetching developers:', error);
      }
    };

    fetchDevelopers();
  }, [selectedProject?._id]);

  const handleAttendeeSelect = (userId: string) => {
    if (!selectedAttendees.includes(userId)) {
      setSelectedAttendees([...selectedAttendees, userId]);
    }
  };

  const handleRemoveAttendee = (userId: string) => {
    setSelectedAttendees(selectedAttendees.filter(id => id !== userId));
  };

  const handleSubmit = useCallback(async () => {
    if (!session?.user || !selectedProject) return;

    try {
      const response = await fetch('/api/meeting/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          meetingDescription: description,
          date: date?.toISOString(),
          projectID: selectedProject._id,
          startTime: new Date(`${date?.toISOString().split('T')[0]}T${startTime}:00`).toISOString(),
          endTime: new Date(`${date?.toISOString().split('T')[0]}T${endTime}:00`).toISOString(),
          createdBy: session.user._id,
          isInstant,
          attendees: selectedAttendees,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create meeting');
      }

      const meetingData = await response.json();
      const meetingId = meetingData.meeting._id;

      // Create Stream call ID
      const streamResponse = await fetch(`/api/meeting/create-stream-call/${meetingId}`, {
        method: 'POST',
      });

      if (!streamResponse.ok) {
        console.error('Failed to create Stream call');
      }

      router.push(`/dev/project/${selectedProject._id}/meetings/details`);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  }, [session?.user, selectedProject, title, description, date, startTime, endTime, isInstant, selectedAttendees, router]);

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
                className="w-full text-base h-[40px] outline-none shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
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
                className="w-full resize-none border-0 p-3 focus-visible:ring-0 h-[40px] outline-none shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Label>Meeting Attendees</Label>
              <div className="space-y-4">
                <Select onValueChange={handleAttendeeSelect}>
                  <SelectTrigger className="w-full shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] bg-transparent">
                    <SelectValue placeholder="Select attendees" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {developers.map((dev) => (
                        <SelectItem
                          key={dev._id}
                          value={dev._id}
                          disabled={selectedAttendees.includes(dev._id)}
                        >
                          {dev.firstName} {dev.lastName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
                  {selectedAttendees.map((attendeeId) => {
                    const developer = developers.find(dev => dev._id === attendeeId);
                    return (
                      <Badge
                        key={attendeeId}
                        variant="secondary"
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2"
                      >
                        {developer?.firstName} {developer?.lastName}
                        <button
                          onClick={() => handleRemoveAttendee(attendeeId)}
                          className="hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isInstant}
                onChange={(e) => setIsInstant(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>Is Instant Meeting</span>
            </label>
          </div>
          <div className="w-full flex flex-row gap-5">
            <div className="flex flex-col gap-2">
              <Label>Select Date </Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md w-fit shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF]"
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
      </div>
    </MainContainer>
  );
}