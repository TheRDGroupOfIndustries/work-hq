'use client';

import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useProjectContext } from "@/context/ProjectProvider";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
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
import { CustomUser } from "@/lib/types";
import { toast } from "sonner";

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
  const user = session?.user as CustomUser;
  const { selectedProject } = useProjectContext();
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isInstant, setIsInstant] = useState(false);

  const timeOptions = generateTimeOptions();

  const handleSubmit = useCallback(async () => {
    if (!user || !selectedProject) return;

    try {
      const response = await fetch("/api/meeting/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          meetingDescription: description,
          date: date?.toISOString(),
          projectID: selectedProject._id,
          startTime: new Date(`${date?.toISOString().split("T")[0]}T${startTime}:00`).toISOString(),
          endTime: new Date(`${date?.toISOString().split("T")[0]}T${endTime}:00`).toISOString(),
          createdBy: user?._id,
          isInstant,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to send meeting request");
      } else {
        toast.success("Meeting request sent successfully. Awaiting approval from management.");
        router.push(`/c/project/${selectedProject._id}/meetings/details`);
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast.error("An error occurred while sending the meeting request");
    }
  }, [user, selectedProject, title, description, date, startTime, endTime, isInstant, router]);

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