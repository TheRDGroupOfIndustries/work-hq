"use client";
import Announcement from "@/components/icons/Announcement";
import Logout from "@/components/icons/logout";
import Headline, {
  ButtonObjectType,
} from "@/components/reusables/components/headline";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { Label } from "@/components/ui/label";
// import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomUser } from "@/lib/types";
import { ROLE } from "@/tempData";
import { Role, VENDOR } from "@/types";
import { uploadNewFile } from "@/utils/actions/fileUpload.action";
import {
  IndianRupee,
  Loader,
  Mail,
  MessageCircleMore,
  MessageCircleMoreIcon,
  PenOff,
  Phone,
  SquarePen,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface NOTIFICATION {
  _id: string;
  title: string;
  description: string;
  date: string;
  type: "announcement" | "message" | "payment";
}

// This for test
const notification: NOTIFICATION[] = [
  {
    _id: "vzcb",
    title: "You have successfully credited your month salary!!",
    description: `Hello Ashri, we have successfully transferred your salary to your
          provided account ending with XXXX XXXX 0192. No need for thanks ;`,
    type: "payment",
    date: "2 Feb 2024, 10:10",
  },
  {
    _id: "vs",
    title: "Task Completed",
    description: "You have completed 30 tasks",
    type: "message",
    date: "2 Feb 2024, 10:10",
  },
  {
    _id: "15",
    title: "Task Completed",
    description: "You have completed 30 tasks",
    type: "message",
    date: "2 Feb 2024, 10:10",
  },

  {
    _id: "saf",
    title: "Task Completed",
    description: "You have completed 30 tasks",
    type: "announcement",
    date: "2 Feb 2024, 10:10",
  },
];

export default function Profile() {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;
  const [performance, ] = useState(40);
  const [taskCompleted, ] = useState(30);
  const [userData, setUserData] = useState<CustomUser>(user);
  const [editOpen, setEditOpen] = useState(false);
  const [uploadingPreview, setUploadingPreview] = useState<boolean>(false);
  const headLineButtons = [
    {
      buttonText: editOpen ? "Cancel" : "Edit Profile",
      icon: editOpen ? <PenOff /> : <SquarePen />,
      onNeedIcon: false,
      onClick: () => {
        setEditOpen(!editOpen);
        setUserData(user);
      },
    },
    {
      buttonText: editOpen ? "Save" : "Logout",
      icon: <Logout color="white" />,
      type: "withCustomColor",
      onNeedIcon: false,
      onClick: () => (editOpen ? handleSave() : signOut()),
    },
  ] as ButtonObjectType[];

  async function handleSave() {
    const updateUserRec = await fetch("/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImage: userData.profileImage,
        email: userData.email,
        phone: userData.phone,
        position: userData.position,
      }),
    });

    setEditOpen(false);

    if (updateUserRec.status) {
      toast.success("Profile updated successfully");
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPreview(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResponse = await uploadNewFile(formData);
      if (uploadResponse?.url) {
        setUserData((prevData) => ({
          ...prevData,
          profileImage: uploadResponse.url,
        }));
      } else {
        alert("File upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again later.");
    } finally {
      setUploadingPreview(false);
    }
  };
  return (
    <MainContainer>
      <Headline
        role={user.role as Role}
        title="Profile"
        subTitle="Project / profile"
        buttonObjects={headLineButtons}
      />

      <div className="w-full flex flex-row gap-4 ">
        <Container className="max-w-[40%] h-fit ">
          <div className="flex flex-row  sm:mx-0 items-center  gap-4 overflow-hidden">
            <div className="relative min-w-[130px] min-h-[130px] rounded-full bg-[#D9D9D9]">
              <Image
                src={userData.profileImage || "/assets/user.png"}
                width={130}
                height={130}
                alt="Profile"
                className=" rounded-full"
              />
              <input
                type="file"
                name=""
                id=""
                onChange={handleFileChange}
                className={`${
                  editOpen || !uploadingPreview ? "" : "hidden"
                } absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer `}
              />
              {uploadingPreview && (
                <div className="absolute top-0 left-0 w-full h-full flex-center">
                  <Loader className="w-10 h-10 animate-spin" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <h1 className=" text-gray-800 text-2xl font-normal">
                {user.firstName + " " + user.lastName}
              </h1>
              <p className=" text-gray-600 text-lg font-normal">{user.email}</p>
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
              <PersonalInfo
                user={userData}
                setUserData={setUserData}
                editOpen={editOpen}
              />
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

function PersonalInfo({
  user,
  setUserData,
  editOpen,
}: {
  user: CustomUser;
  setUserData: (user: CustomUser) => void;
  editOpen: boolean;
}) {
  return (
    <div className="flex flex-col gap-6 mt-4 px-4">
      <div className="grid grid-cols-[1fr_2fr]">
        <span className="text-[#344054] text-base font-medium">First Name</span>
        <input
          type="text"
          disabled={!editOpen}
          value={user.firstName}
          onChange={(e) => setUserData({ ...user, firstName: e.target.value })}
          className=" disabled:text-[#667085] text-black text-base disabled:bg-transparent p-2 disabled:outline-none disabled:p-0 "
        />
      </div>
      <div className="grid grid-cols-[1fr_2fr]">
        <span className="text-[#344054] text-base font-medium">Last Name</span>
        <input
          type="text"
          disabled={!editOpen}
          value={user.lastName}
          onChange={(e) => setUserData({ ...user, lastName: e.target.value })}
          className=" disabled:text-[#667085] text-black text-base disabled:bg-transparent p-2 disabled:outline-none disabled:p-0 "
        />
      </div>
      <div className="grid grid-cols-[1fr_2fr]">
        <span className="text-[#344054] text-base font-medium">Role</span>
        <input
          type="text"
          disabled={!editOpen}
          value={user.role}
          onChange={(e) => setUserData({ ...user, role: e.target.value })}
          className=" disabled:text-[#667085] text-black text-base disabled:bg-transparent p-2 disabled:outline-none disabled:p-0 "
        />
      </div>
      <div className="grid grid-cols-[1fr_2fr]">
        <span className="text-[#344054] text-base font-medium">Position</span>
        <input
          type="text"
          disabled={!editOpen}
          value={user?.position?.join(", ")} // Join the array into a comma-separated string
          onChange={(e) =>
            setUserData({
              ...user,
              position: e.target.value.split(",").map((pos) => pos.trim()),
            })
          } // Split the string into an array and trim whitespace
          className=" disabled:text-[#667085] text-black text-base disabled:bg-transparent p-2 disabled:outline-none disabled:p-0"
        />
      </div>
      {/* <div className="grid grid-cols-[1fr_2fr]">
        <span className="text-[#344054] text-base font-medium">Password</span>
        <span className="text-[#667085] text-base"></span>
      </div> */}
      <div className="grid grid-cols-[1fr_2fr] justify-start">
        <span className="text-[#344054] text-base font-medium">
          Phone Number
        </span>
        <input
          type="text"
          disabled={!editOpen}
          value={user.phone || ""}
          onChange={(e) => setUserData({ ...user, phone: e.target.value })}
          className=" disabled:text-[#667085] text-black text-base disabled:bg-transparent p-2 disabled:outline-none disabled:p-0"
        />
      </div>
      <div className="grid grid-cols-[1fr_2fr]">
        <span className="text-[#344054] text-base font-medium">Email</span>
        <input
          type="text"
          disabled={!editOpen}
          value={user.email}
          onChange={(e) => setUserData({ ...user, email: e.target.value })}
          className=" disabled:text-[#667085] text-black text-base disabled:bg-transparent p-2 disabled:outline-none disabled:p-0"
        />
      </div>
    </div>
  );
}

function Notifications() {
  return (
    <div className="flex flex-col w-full">
      {notification.map((item) => (
        <NotificationCard key={item._id} item={item} />
      ))}
    </div>
  );
}

function NotificationCard({ item }: { item: NOTIFICATION }) {
  return (
    <div className="flex flex-row w-full rounded-xl  gap-4 p-4 hover:shadow-neuro-3 ">
      <div className="w-[100px]  flex flex-row items-center justify-center">
        <div className="h-[80px] w-[80px] bg-white rounded-full flex items-center justify-center">
          {item.type === "message" && <MessageCircleMoreIcon size={40} />}
          {item.type === "payment" && <IndianRupee size={40} />}
          {item.type === "announcement" && <Announcement size={40} />}
        </div>
      </div>
      <div className="flex flex-col">
        <h1
          className={` ${
            item.type === "payment" ? "text-primary-green" : "text-primary-blue"
          } text-base font-semibold`}
        >
          {item.title}
        </h1>
        <p className=" text-[#344054] text-base font-normal">
          {item.description}
        </p>
        <span className=" self-end text-[#6A6A6A] text-base font-normal">
          {item.date}
        </span>
      </div>
    </div>
  );
}
