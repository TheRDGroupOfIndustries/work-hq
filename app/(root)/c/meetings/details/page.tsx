'use client'
import SquareButton from "@/components/reusables/squareButton";
import Container from "@/components/reusables/Container";
import MainContainer from "@/components/reusables/mainContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import ZoomVideo from "@/components/icons/ZoomVideo";




const meetingsDetails = [
    {
      title: "Meeting One Title 1",
      description: "This is the meeting one description",
      from: "12:00",
      to: "02:00",
      status: "Requested",
    },
    {
      title: "Meeting One Title 1",
      description: "This is the meeting one description",
      from: "12:00",
      to: "02:00",
      status: "Overdue",
    },
    {
      title: "Meeting One Title 1",
      description: "This is the meeting one description",
      from: "12:00",
      to: "02:00",
      status: "Pending",
    },
    {
      title: "Meeting One Title 1",
      description: "This is the meeting one description",
      from: "12:00",
      to: "02:00",
      status: "Attended",
    },
  ];

export default function MeetingsDetails() {
    const navigate = useRouter();
    return (
      <MainContainer>
        <div className=" w-full  flex flex-row items-center justify-between">
          <div className="flex flex-col gap-1">
            {/* headline */}
            <h1 className="text-3xl font-semibold">Meetings detail</h1>
            <p className="text-[#6A6A6A] text-base font-normal">
              {"Project / meetings"}
            </p>
          </div>
  
          <div className="flex flex-col sm:flex-row gap-4">
            <SquareButton
              onClick={() => {
                navigate.push("/meetings/request");
              }}
            >
              <Plus color="#155EEF" />
              Request Meeting
            </SquareButton>
  
            <SquareButton className="text-[#6A6A6A] w-fit self-end">
              7 days <ChevronDown color="#6A6A6A" />
            </SquareButton>
          </div>
        </div>
  
        <Container className="p-0 sm:p-0 md:p-0 lg:p-0">
          <Tabs defaultValue="allMetting" className="">
            <TabsList className=" flex rounded-none h-[65px]   shadow-[3px_3px_10px_0px_#789BD399_inset,-5px_-5px_15px_0px_#FFFFFF] rounded-t-xl flex-row items-center justify-around w-full  bg-transparent text-base font-semibold text-black px-0 my-">
              <TabsTrigger value="allMetting">All Mettings</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="requested">Requested</TabsTrigger>
              <TabsTrigger value="attened">Attended</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            <TabsContent value="allMetting">
              <div className="w-full h-full flex flex-col">
                {meetingsDetails.map((details) => (
                  <Card key={details.title} details={details} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="pending">
              <div className="w-full h-full flex flex-col">
                {meetingsDetails
                  .filter((details) => details.status === "Pending")
                  .map((details) => (
                    <Card key={details.title} details={details} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="requested">
              <div className="w-full h-full flex flex-col">
                {meetingsDetails
                  .filter((details) => details.status === "Requested")
                  .map((details) => (
                    <Card key={details.title} details={details} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="attened">
              <div className="w-full h-full flex flex-col">
                {meetingsDetails
                  .filter((details) => details.status === "Attended")
                  .map((details) => (
                    <Card key={details.title} details={details} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="overdue">
              <div className="w-full h-full flex flex-col">
                {meetingsDetails
                  .filter((details) => details.status === "Overdue")
                  .map((details) => (
                    <Card key={details.title} details={details} />
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
    key,
  }: {
    details: {
      title: string;
      description: string;
      from: string;
      to: string;
      status: string;
    };
    key: string;
  }) {
    return (
      <div
        key={key}
        className="flex flex-row items-center justify-between w-full hover:shadow-[3px_3px_10px_0px_#789BD399,-5px_-5px_10px_0px_#FFFFFF]  p-3 sm:p-4 md:p-5 lg:p-6"
      >
        <div className="flex flex-row items-center gap-4">
          <ZoomVideo />
          <div className="flex flex-col ">
            <h3
              className={`text-lg font-semibold  ${
                details.status === "Pending" || details.status === "Requested"
                  ? "text-[#155EEF]"
                  : "text-gray-800"
              } `}
            >
              {details.title}
            </h3>
            <p className="text-base font-normal text-gray-700">
              {details.description}
            </p>
            <p className="text-base font-normal text-gray-700">
              {`${details.from} - ${details.to}`}
            </p>
          </div>
        </div>
  
        <div className="flex flex-col items-center justify-center gap-2">
          <p
            className={`text-base text-[#155EEF] ${
              details.status === "Overdue" ? "text-[#FF3B30]" : ""
            } ${
              details.status === "Attended" ? "text-[#34C759]" : ""
            } font-normal `}
          >
            {details.status}
          </p>
          {(details.status === "Pending" || details.status === "Reuested") && (
            <SquareButton className="text-[#6A6A6A] px-0 py-0">Join</SquareButton>
          )}
        </div>
      </div>
    );
  }