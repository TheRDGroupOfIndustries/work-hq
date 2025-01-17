"use client";
import Announcement from "@/components/icons/Announcement";
import Logout from "@/components/icons/logout";
import Headline, {
  ButtonObjectType,
} from "@/components/reusables/components/headline";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROLE } from "@/tempData";
import { VENDOR } from "@/types";
import { IndianRupee, Mail, MessageCircleMore, MessageCircleMoreIcon, Phone, SquarePen } from "lucide-react";
import { useState } from "react";

const notification = [
  {
    id: "vzcb",
    title: "Task Completed",
    description: "You have completed 30 tasks",
    type: "payment",
  },
  {
    id: "vs",
    title: "Task Completed",
    description: "You have completed 30 tasks",
    icon: <MessageCircleMore />,
    type: "message",
  },
  {
    id: "15",
    title: "Task Completed",
    description: "You have completed 30 tasks",
    type: "message",
  },
  
  {
    id: "saf",
    title: "Task Completed",
    description: "You have completed 30 tasks",
    type: "announcement",
  },
];

export default function Profile() {
  const [performance, ] = useState(40);
  const [taskCompleted, ] = useState(30);
  const headLineButtons = [
    {
      buttonText: "Edit Profile",
      icon: <SquarePen />,
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
    {
      buttonText: "Logout",
      icon: <Logout color="white" />,
      type: "withCustomColor",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
  ] as ButtonObjectType[];
  return (
    <MainContainer>
      <Headline
        role={ROLE}
        title="Profile"
        subTitle="Project / profile"
        buttonObjects={headLineButtons}
      />

      <div className="w-full flex flex-row gap-4 ">
        <Container className="max-w-[40%] h-fit">
          <div className="flex flex-row  sm:mx-0 items-center  gap-4">
            <div className="min-w-[130px] min-h-[130px] rounded-full bg-[#D9D9D9]"></div>
            <div className="flex flex-col gap-3">
              <h1 className=" text-gray-800 text-2xl font-normal">
                Ashri mallick
              </h1>
              <p className=" text-gray-600 text-lg font-normal">
                ashriarya@gmail.com
              </p>
              <div className="flex flex-row items-center gap-4 max-h-[100px]">
                <Phone />
                <Mail />
                <MessageCircleMore />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-base">Performance</Label>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-primary/20 ">
              <div
                className="h-full w-full flex-1 bg-green-600 transition-all"
                style={{
                  transform: `translateX(-${100 - (performance || 0)}%)`,
                }}
              ></div>
            </div>

            <span className="self-end">{performance}%</span>
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-base">TaskCompleted</Label>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-primary/20 ">
              <div
                className="h-full w-full flex-1 bg-green-600 transition-all"
                style={{
                  transform: `translateX(-${100 - (taskCompleted || 0)}%)`,
                }}
              ></div>
            </div>

            <span className="self-end">{taskCompleted}%</span>
          </div>
        </Container>

        <Container>
          <Tabs defaultValue="paymentInfo" className="">
            <TabsList className="flex rounded-none h-[65px] border border-b-gray-400  rounded-t-xl flex-row items-center  w-full  bg-transparent text-base font-semibold text-black px-0 my-">
              <TabsTrigger
                className={`${
                  ROLE === VENDOR
                    ? "data-[state=active]:border-vendor-dark"
                    : "data-[state=active]:border-primary-blue"
                } `}
                value="paymentInfo"
              >
                Payment Info
              </TabsTrigger>
              <TabsTrigger
                className={`${
                  ROLE === VENDOR
                    ? "data-[state=active]:border-vendor-dark"
                    : "data-[state=active]:border-primary-blue"
                } `}
                value="notifications"
              >
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="paymentInfo">
              <PersonalInfo />
            </TabsContent>
            <TabsContent value="notifications">
              <Notifications />
            </TabsContent>
          </Tabs>
        </Container>
      </div>
    </MainContainer>
  );
}

function PersonalInfo() {
  return (
    <div className="flex flex-col gap-6 mt-4 px-4">
      <div className="grid grid-cols-[1fr_2fr]">
        <span className="text-[#344054] text-base font-medium">First Name</span>
        <span className="text-[#667085] text-base">Ashri</span>
      </div>
      <div className="grid grid-cols-[1fr_2fr]">
        <span className="text-[#344054] text-base font-medium">Last Name</span>
        <span className="text-[#667085] text-base">Ashri</span>
      </div>
      <div className="grid grid-cols-[1fr_2fr]">
        <span className="text-[#344054] text-base font-medium">Role</span>
        <span className="text-[#667085] text-base">Developer</span>
      </div>
      <div className="grid grid-cols-[1fr_2fr]">
        <span className="text-[#344054] text-base font-medium">Position</span>
        <span className="text-[#667085] text-base">dev</span>
      </div>
      <div className="grid grid-cols-[1fr_2fr]">
        <span className="text-[#344054] text-base font-medium">Password</span>
        <span className="text-[#667085] text-base">Ashri</span>
      </div>
      <div className="grid grid-cols-[1fr_2fr] justify-start">
        <span className="text-[#344054] text-base font-medium">
          Phone Number
        </span>
        <span className="text-[#667085] text-base">+91 1234567891</span>
      </div>
      <div className="grid grid-cols-[1fr_2fr]">
        <span className="text-[#344054] text-base font-medium">Email</span>
        <span className="text-[#667085] text-base">ashriarya@gmail</span>
      </div>
    </div>
  );
}

function Notifications() {
  return (
    <div className="flex flex-col w-full">
       { notification.map((item) => (<NotificationCard key={item.id} item={item} />))}
    </div>
  );
}

interface NotificationItem {
  id: string;
  type: string;
  // Add any other properties that the item object might have
}

function NotificationCard({item}:{item:NotificationItem}) {
  return (
    <div className="flex flex-row w-full rounded-xl  gap-4 p-4 hover:shadow-neuro-3 ">
      <div className="w-[100px]  flex flex-row items-center justify-center">
        <div className="h-[80px] w-[80px] bg-white rounded-full flex items-center justify-center">
        { item.type === "message" && <MessageCircleMoreIcon size={40}/>}
        {item.type === "payment" && <IndianRupee size={40}/>}
        {item.type === "announcement" && <Announcement size={40}/>}
        </div>
        
      </div>
      <div className="flex flex-col">
        <h1 className={` ${item.type === "payment" ? "text-primary-green" : "text-primary-blue"} text-base font-semibold`}>
          You have successfully credited your month salary!!
        </h1>
        <p className=" text-[#344054] text-base font-normal">
          Hello Ashri, we have successfully transferred your salary to your
          provided account ending with XXXX XXXX 0192. No need for thanks ;
        </p>
        <span className=" self-end text-[#6A6A6A] text-base font-normal">
          2 Feb 2024, 10:10
        </span>
      </div>
    </div>
  );
}
