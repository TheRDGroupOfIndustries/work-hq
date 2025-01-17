"use client";

import ZoomVideo from "@/components/icons/ZoomVideo";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectContext } from "@/context/ProjectProvider";
import { formatDateString } from "@/lib/utils";
import { ROLE } from "@/tempData";
import { VENDOR } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Headline from "../components/headline";

interface Meeting {
  _id: string;
  title: string;
  meetingDescription: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  streamCallId?: string;
  projectID: string;
  attendees: string[];
  createdBy: string;
}

export default function MeetingsDetails() {
  const { data: session } = useSession();
  const { selectedProject } = useProjectContext();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMeetings = useCallback(async () => {
    if (session?.user && selectedProject?._id) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/meeting/get/getByProjectID/${selectedProject._id}`
        );
        const data = await response.json();
        if (data.success && Array.isArray(data.meet)) {
          const filteredMeetings = data.meet.filter(
            (meeting: Meeting) =>
              meeting.attendees.includes(session.user._id) ||
              meeting.createdBy === session.user._id
          );
          setMeetings(filteredMeetings);
        } else {
          console.error(
            "Failed to fetch meetings:",
            data.error || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching meetings:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [session, selectedProject]);

  const updateMeetingStatuses = useCallback(async () => {
    try {
      await fetch("/api/meeting/update-status", { method: "POST" });
      await fetchMeetings();
    } catch (error) {
      console.error("Error updating meeting statuses:", error);
    }
  }, [fetchMeetings]);

  useEffect(() => {
    fetchMeetings();
    const intervalId = setInterval(updateMeetingStatuses, 60000); // Check every minute
    return () => clearInterval(intervalId);
  }, [session, selectedProject, fetchMeetings, updateMeetingStatuses]);

  return (
    <MainContainer role={ROLE}>
      <Headline btnText="Request Meeting" goTo="request" />
      <Container className="p-0 sm:p-0 md:p-0 lg:p-0">
        <Tabs defaultValue="allMetting" className="">
          <TabsList className="flex rounded-none h-[65px] shadow-neuro-4 rounded-t-xl flex-row items-center justify-around w-full bg-transparent font-semibold text-black px-0 ">
            <TabsTrigger
              className={`${
                ROLE === VENDOR
                  ? "data-[state=active]:border-vendor-dark"
                  : "data-[state=active]:border-primary-blue"
              } `}
              value="allMetting"
            >
              All Meetings
            </TabsTrigger>
            <TabsTrigger
              className={`${
                ROLE === VENDOR
                  ? "data-[state=active]:border-vendor-dark"
                  : "data-[state=active]:border-primary-blue"
              } `}
              value="inProgress"
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger
              className={`${
                ROLE === VENDOR
                  ? "data-[state=active]:border-vendor-dark"
                  : "data-[state=active]:border-primary-blue"
              } `}
              value="upcoming"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              className={`${
                ROLE === VENDOR
                  ? "data-[state=active]:border-vendor-dark"
                  : "data-[state=active]:border-primary-blue"
              } `}
              value="requested"
            >
              Requested
            </TabsTrigger>
            <TabsTrigger
              className={`${
                ROLE === VENDOR
                  ? "data-[state=active]:border-vendor-dark"
                  : "data-[state=active]:border-primary-blue"
              } `}
              value="completed"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              className={`${
                ROLE === VENDOR
                  ? "data-[state=active]:border-vendor-dark"
                  : "data-[state=active]:border-primary-blue"
              } `}
              value="cancelled"
            >
              Cancelled
            </TabsTrigger>
          </TabsList>
          <TabsContent value="allMetting">
            <div className="w-full h-full flex flex-col">
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                meetings.map((meeting) => (
                  <Card key={meeting._id} details={meeting} />
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="inProgress">
            <div className="w-full h-full flex flex-col">
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                meetings
                  .filter((meeting) => meeting.status === "inProgress")
                  .map((meeting) => (
                    <Card key={meeting._id} details={meeting} />
                  ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="upcoming">
            <div className="w-full h-full flex flex-col">
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                meetings
                  .filter((meeting) => meeting.status === "upcoming")
                  .map((meeting) => (
                    <Card key={meeting._id} details={meeting} />
                  ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="requested">
            <div className="w-full h-full flex flex-col">
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                meetings
                  .filter((meeting) => meeting.status === "requested")
                  .map((meeting) => (
                    <Card key={meeting._id} details={meeting} />
                  ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="w-full h-full flex flex-col">
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                meetings
                  .filter((meeting) => meeting.status === "completed")
                  .map((meeting) => (
                    <Card key={meeting._id} details={meeting} />
                  ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="cancelled">
            <div className="w-full h-full flex flex-col">
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                meetings
                  .filter((meeting) => meeting.status === "cancelled")
                  .map((meeting) => (
                    <Card key={meeting._id} details={meeting} />
                  ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </MainContainer>
  );
}

function formatTime(isoString: string): string {
  const time = new Date(isoString);
  return time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function Card({ details }: { details: Meeting }) {
  return (
    <div className="flex flex-row items-center justify-between w-full hover:shadow-neuro-3 p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="flex flex-row items-center gap-4">
        <ZoomVideo />
        <div className="flex flex-col">
          <h3
            className={`text-lg font-semibold ${
              details.status === "inProgress" || details.status === "upcoming"
                ? "text-[#155EEF]"
                : "text-gray-800"
            }`}
          >
            {details.title}
          </h3>
          <p className="text-base font-normal text-gray-700">
            {details.meetingDescription}
          </p>
          <p className="text-base font-normal text-gray-700">
            {`${formatDateString(details.startTime.toString())} ${formatTime(
              details.startTime
            )} - ${formatTime(details.endTime)}`}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <p
          className={`text-base ${
            details.status === "cancelled"
              ? "text-[#FF3B30]"
              : details.status === "completed"
              ? "text-[#34C759]"
              : "text-[#155EEF]"
          } font-normal`}
        >
          {details.status}
        </p>
        {(details.status === "inProgress" || details.status === "upcoming") &&
          details.streamCallId && (
            <Link
              href={`/c/project/${details.projectID}/meetings/${details._id}`}
              passHref
            >
              <SquareButton className="text-[#6A6A6A] px-0 py-0">
                Join
              </SquareButton>
            </Link>
          )}
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <>
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-between w-full hover:shadow-neuro-3 p-3 sm:p-4 md:p-5 lg:p-6 animate-pulse"
        >
          <div className="flex flex-row items-center gap-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex flex-col">
              <div className="w-48 h-6 bg-gray-300 rounded mb-2"></div>
              <div className="w-64 h-4 bg-gray-300 rounded mb-2"></div>
              <div className="w-56 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-20 h-6 bg-gray-300 rounded"></div>
            <div className="w-16 h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
}
