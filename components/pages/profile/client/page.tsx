"use client";
import Logout from "@/components/icons/logout";
import Headline from "@/components/reusables/components/headline";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Label } from "@/components/ui/label";
import { CustomUser, ProjectValues } from "@/lib/types";
import { ROLE } from "@/tempData";
import { Mail, MessageCircleMore, Phone, SquarePen } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { data: session } = useSession();
  const [disableInput, setDisableInput] = useState(true);
  // const user = session?.user as CustomUser;
  const [user, setUser] = useState<CustomUser | null>(null);
  const [signingOut, setSigningOut] = useState(false);
  const [pendingProjects, setPendingProjects] = useState<string>();
  const [ongoingProjects, setOngoingProjects] = useState<string>("00");
  const [completedProjects, setCompletedProjects] = useState<string>("00");

  const handleSignOut = async () => {
    console.log("Signing Out...");
    setSigningOut(true);
    await signOut();
    setSigningOut(false);
  };
  const [allProjects, setAllProjects] = useState<ProjectValues[] | null>(null);

  const fetchProjects = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/project/get/getByUserID/${user._id}`);
      const data = await res.json();
      if (data.success) {
        setAllProjects(data.projects);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching projects");
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // categorizes projects into pending, ongoing and completed with padding 0 in the beginging if less than 10

    if (!allProjects) return;
    console.log("All Projects: ", allProjects);
    const pending = allProjects
      .filter((project) => project.developmentDetails.status === "pending")
      .length.toString()
      .padStart(2, "0");
    const ongoing = allProjects
      .filter((project) => project.developmentDetails.status === "inProgress")
      .length.toString()
      .padStart(2, "0");
    const completed = allProjects
      .filter((project) => project.developmentDetails.status === "completed")
      .length.toString()
      .padStart(2, "0");
    setPendingProjects(pending);
    setOngoingProjects(ongoing);
    setCompletedProjects(completed);
  }, [allProjects]);

  useEffect(() => {
    setUser(session?.user as CustomUser);
  }, [session?.user]);
  return (
    <MainContainer>
      <Headline role={ROLE} title="Profile" subTitle="Project / Chats" />
      <Container className="md:px-8 md: my-8">
        <div className=" flex gap-4 flex-col-reverse sm:flex-row  justify-between">
          <div className="flex flex-row  sm:mx-0 items-center justify-between gap-4">
            <div className="min-w-[130px] min-h-[130px] rounded-full ">
              {user?.profileImage ? (
                <Image
                  src={user?.profileImage}
                  alt="profile"
                  width={100}
                  height={100}
                  className="w-full h-full rounded-full object-contain"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200"></div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <h1 className=" text-gray-800 text-2xl font-normal">
                {user?.firstName ?? " "} {user?.lastName ?? " "}
              </h1>
              <p className=" text-gray-600 text-lg font-normal">
                {user?.email ?? user?.phone ?? " "}
              </p>
              <div className="flex flex-row items-center gap-4 max-h-[100px]">
                <Phone />
                <Mail />
                <MessageCircleMore />
              </div>
            </div>
          </div>

          <SquareButton
            className="w-fit self-end sm:self-center"
            onClick={() => setDisableInput(!disableInput)}
          >
            <SquarePen color="#155EEF" />{" "}
            {disableInput ? "Edit Profile" : "Save"}
          </SquareButton>
        </div>

        <div className=" mt-8 w-full grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] lg:grid-cols-[1fr_2px_1fr_2px_1fr] gap-10 ">
          <div className="flex flex-row items-center gap-3 justify-between  w-full  ">
            <div className="flex flex-col">
              <h1 className="text-xl font-normal text-gray-800">
                Pending Projects
              </h1>
              <p className=" font-normal text-gray-600">
                {" "}
                No. of projects which have been requested
              </p>
            </div>
            <h1 className="text-2xl font-normal text-gray-900">
              {pendingProjects}
            </h1>
          </div>

          <div className=" flex flex-row items-center ">
            <div className=" h-[80%] w-[1px] bg-gray-500"></div>
          </div>

          <div className="flex flex-row items-center gap-3 justify-between  w-full  ">
            <div className="flex flex-col">
              <h1 className="text-xl font-normal text-gray-800">
                Ongoing Projects
              </h1>
              <p className="font-normal text-gray-600">
                {" "}
                No. of projects which are currently in progress
              </p>
            </div>
            <h1 className="text-2xl font-normal text-gray-900">
              {ongoingProjects}
            </h1>
          </div>

          <div className=" hidden lg:flex flex-row items-center ">
            <div className=" h-[80%] w-[1px] bg-gray-500"></div>
          </div>

          <div className="flex flex-row items-center  col-span-full lg:col-span-1 gap-4  justify-between md:justify-center lg:justify-between  w-full  ">
            <div className="flex flex-col">
              <h1 className="text-xl font-normal text-gray-800">
                Completed Projects
              </h1>
              <p className=" font-normal text-gray-600">
                {" "}
                No. of projects which have been completed
              </p>
            </div>
            <h1 className="text-2xl font-normal text-gray-900">
              {completedProjects ?? "00"}
            </h1>
          </div>
        </div>

        <div className="my-8 w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              First Name
            </Label>
            <input
              type="text"
              disabled={disableInput}
              value={user?.firstName}
              onChange={(e) =>
                setUser({ ...user, firstName: e.target.value } as CustomUser)
              }
              placeholder="e.g. Johan"
              className={`w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4 ${disableInput ? "text-light-gray" : "text-dark-gray"} `}
              required
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Last Name
            </Label>
            <input
              value={user?.lastName}
              type="text"
              disabled={disableInput}
              onChange={(e) =>
                setUser({ ...user, lastName: e.target.value } as CustomUser)
              }
              placeholder="e.g. Doe"
              className={`w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4 ${disableInput ? "text-light-gray" : "text-dark-gray"} `}
              required
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">Role</Label>
            <input
              type="text"
              disabled={disableInput}
              value={user?.role}
              placeholder="e.g. Client"
              className={`w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4 ${disableInput ? "text-light-gray" : "text-dark-gray"} `}
              required
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Phone Number
            </Label>
            <input
              type="number"
              disabled={disableInput}
              value={user?.phone ?? " "}
              onChange={(e) =>
                setUser({ ...user, phone: e.target.value } as CustomUser)
              }
              placeholder="e.g. +91 1234567890"
              className={`w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4 ${disableInput ? "text-light-gray" : "text-dark-gray"} `}
              required
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Password
            </Label>
            <input
              type={disableInput ? "password" : "password"}
              disabled={true}
              // onChange={(e) => setUser({ ...user, password: e.target.value } as CustomUser)}
              value={user?.password ?? " "}
              placeholder="e.g. Doe"
              className={`w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4 ${disableInput ? "text-light-gray" : "text-dark-gray"} `}
              required
            />
          </div>
        </div>

        <div className=" w-full mt-auto flex flex-row items-center justify-end">
          <button
            onClick={handleSignOut}
            className="flex flex-row items-center py-3 px-4 gap-2 shadow-[3px_3px_10px_0px_#789BD399,5px_5px_15px_0px_#00000099_inset,-3px_-3px_10px_0px_#FFFFFF] rounded-xl text-[#ffffff] font-semibold text-nowrap bg-[#FF382D] disabled:opacity-70"
            disabled={signingOut}
          >
            <Logout color="#fff" />
            {signingOut ? "Signing Out..." : "Sign Out"}
          </button>
        </div>
      </Container>
    </MainContainer>
  );
}
