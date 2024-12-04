'use client';

import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
import { useProjectContext } from '@/context/ProjectProvider';
import { streamVideo } from '@/lib/stream-video';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import ZoomVideo from "@/components/icons/ZoomVideo";
import { ROLE } from '@/tempData';
import Headline from './components/headline';
import { VENDOR } from '@/types';

interface Meeting {
  _id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  link: string;
}

export default function MeetingsDetails() {
  // const { data: session } = useSession();
  const { selectedProject } = useProjectContext();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  // const navigate = useRouter();

  useEffect(() => {
    if (!selectedProject) return;

    const fetchMeetings = async () => {
      const response = await fetch(`/api/meeting/get/getByProjectId/${selectedProject}`);
      const data = await response.json();
      setMeetings(data.meet || []);
    };

    fetchMeetings();
  }, [selectedProject]);

  const handleJoinMeeting = async (meetingId: string) => {
    try {
      const call = streamVideo.call('default', meetingId);
      await call.join();
    } catch (error) {
      console.error('Error joining meeting:', error);
    }
  };

  return (
    <MainContainer role={ROLE}>
      <div className="w-full flex flex-row items-center justify-between">
        <Headline/>

        
      </div>

      <Container className="p-0 sm:p-0 md:p-0 lg:p-0">
        <Tabs defaultValue="allMetting" className="">
          <TabsList className="flex rounded-none h-[65px] shadow-[3px_3px_10px_0px_#789BD399_inset,-5px_-5px_15px_0px_#FFFFFF] rounded-t-xl flex-row items-center justify-around w-full bg-transparent font-semibold text-black px-0 ">
            <TabsTrigger className={`${
                ROLE === VENDOR
                  ? "data-[state=active]:border-vendor-dark"
                  : "data-[state=active]:border-primary-blue"
              } `} value="allMetting">All Meetings</TabsTrigger>
            <TabsTrigger className={`${
                ROLE === VENDOR
                  ? "data-[state=active]:border-vendor-dark"
                  : "data-[state=active]:border-primary-blue"
              } `} value="pending">Pending</TabsTrigger>
            <TabsTrigger className={`${
                ROLE === VENDOR
                  ? "data-[state=active]:border-vendor-dark"
                  : "data-[state=active]:border-primary-blue"
              } `} value="requested">Requested</TabsTrigger>
            <TabsTrigger className={`${
                ROLE === VENDOR
                  ? "data-[state=active]:border-vendor-dark"
                  : "data-[state=active]:border-primary-blue"
              } `} value="attened">Attended</TabsTrigger>
            <TabsTrigger className={`${
                ROLE === VENDOR
                  ? "data-[state=active]:border-vendor-dark"
                  : "data-[state=active]:border-primary-blue"
              } `} value="overdue">Overdue</TabsTrigger>
          </TabsList>
          <TabsContent value="allMetting">
            <div className="w-full h-full flex flex-col">
              {meetings.map((meeting) => (
                <Card 
                  key={meeting._id} 
                  details={meeting}
                  onJoin={() => handleJoinMeeting(meeting.link)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="pending">
            <div className="w-full h-full flex flex-col">
              {meetings.filter(m => m.status === "Pending").map((meeting) => (
                <Card 
                  key={meeting._id} 
                  details={meeting}
                  onJoin={() => handleJoinMeeting(meeting.link)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="requested">
            <div className="w-full h-full flex flex-col">
              {meetings.filter(m => m.status === "Requested").map((meeting) => (
                <Card 
                  key={meeting._id} 
                  details={meeting}
                  onJoin={() => handleJoinMeeting(meeting.link)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="attened">
            <div className="w-full h-full flex flex-col">
              {meetings.filter(m => m.status === "Attended").map((meeting) => (
                <Card 
                  key={meeting._id} 
                  details={meeting}
                  onJoin={() => handleJoinMeeting(meeting.link)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="overdue">
            <div className="w-full h-full flex flex-col">
              {meetings.filter(m => m.status === "Overdue").map((meeting) => (
                <Card 
                  key={meeting._id} 
                  details={meeting}
                  onJoin={() => handleJoinMeeting(meeting.link)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </MainContainer>
  );
}

function Card({
  details,
  onJoin,
}: {
  details: Meeting;
  onJoin: () => void;
}) {
  return (
    <div className="flex flex-row items-center justify-between w-full hover:shadow-[3px_3px_10px_0px_#789BD399,-5px_-5px_10px_0px_#FFFFFF] p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="flex flex-row items-center gap-4">
        <ZoomVideo />
        <div className="flex flex-col">
          <h3 className={`text-lg font-semibold ${
            details.status === "Pending" || details.status === "Requested"
              ? "text-[#155EEF]"
              : "text-gray-800"
          }`}>
            {details.title}
          </h3>
          <p className="text-base font-normal text-gray-700">
            {details.description}
          </p>
          <p className="text-base font-normal text-gray-700">
            {`${details.startTime} - ${details.endTime}`}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <p className={`text-base ${
          details.status === "Overdue" ? "text-[#FF3B30]" :
          details.status === "Attended" ? "text-[#34C759]" :
          "text-[#155EEF]"
        } font-normal`}>
          {details.status}
        </p>
        {(details.status === "Pending" || details.status === "Requested") && (
          <SquareButton 
            className="text-[#6A6A6A] px-0 py-0"
            onClick={onJoin}
          >
            Join
          </SquareButton>
        )}
      </div>
    </div>
  );
}