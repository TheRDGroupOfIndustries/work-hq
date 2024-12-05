import Logout from "@/components/icons/logout";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircleMore, Phone, SquarePen } from "lucide-react";
import { ROLE } from "@/tempData";
import Headline from "@/components/reusables/components/headline";

export default function Profile() {
  return (
    <MainContainer>
      <Headline role={ROLE} title="Profile" subTitle="Project / Chats"  />
      <Container>
        <div className=" flex gap-4 flex-col-reverse sm:flex-row  justify-between">
          <div className="flex flex-row  sm:mx-0 items-center justify-between gap-4">
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

          <SquareButton className="w-fit self-end sm:self-center">
            <SquarePen color="#155EEF" /> Edit Profile
          </SquareButton>
        </div>

        <div className=" mt-8 w-full grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] lg:grid-cols-[1fr_2px_1fr_2px_1fr] gap-4 ">
          <div className="flex flex-row items-center gap-3 justify-between  w-full  ">
            <div className="flex flex-col">
              <h1 className="text-2xl font-normal text-gray-800">
                Ongoing Projects
              </h1>
              <p className="text-lg font-normal text-gray-600">
                {" "}
                No. of projects which are still under development
              </p>
            </div>
            <h1 className="text-4xl font-normal text-gray-900">05</h1>
          </div>

          <div className=" flex flex-row items-center ">
            <div className=" h-[80%] w-[1px] bg-gray-500"></div>
          </div>

          <div className="flex flex-row items-center gap-3 justify-between  w-full  ">
            <div className="flex flex-col">
              <h1 className="text-2xl font-normal text-gray-800">
                Requested Projects
              </h1>
              <p className="text-lg font-normal text-gray-600">
                {" "}
                No. of projects which have been requested
              </p>
            </div>
            <h1 className="text-4xl font-normal text-gray-900">05</h1>
          </div>

          <div className=" hidden lg:flex flex-row items-center ">
            <div className=" h-[80%] w-[1px] bg-gray-500"></div>
          </div>

          <div className="flex flex-row items-center  col-span-full lg:col-span-1 gap-4  justify-between md:justify-center lg:justify-between  w-full  ">
            <div className="flex flex-col">
              <h1 className="text-2xl font-normal text-gray-800">
                Completed Projects
              </h1>
              <p className="text-lg font-normal text-gray-600">
                {" "}
                No. of projects which have been completed
              </p>
            </div>
            <h1 className="text-4xl font-normal text-gray-900">05</h1>
          </div>
        </div>

        <div className="my-8 w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              First Name
            </Label>
            <input
              type="text"
              disabled
              placeholder="e.g. Johan"
              className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Last Name
            </Label>
            <input
              type="text"
              disabled
              placeholder="e.g. Doe"
              className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">Role</Label>
            <input
              type="text"
              disabled
              placeholder="e.g. Doe"
              className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Phone Number
            </Label>
            <input
              type="number"
              disabled
              placeholder="e.g. Doe"
              className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Password
            </Label>
            <input
              type="password"
              disabled
              placeholder="e.g. Doe"
              className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
              required
            />
          </div>
        </div>

        <div className=" w-full mt-auto flex flex-row items-center justify-end">
          <button className="flex flex-row items-center py-3 px-4 gap-2 shadow-[3px_3px_10px_0px_#789BD399,5px_5px_15px_0px_#00000099_inset,-3px_-3px_10px_0px_#FFFFFF] rounded-xl text-[#ffffff] font-semibold text-nowrap bg-[#FF382D]">
            <Logout color="#fff" />
            Logout
          </button>
        </div>
      </Container>
    </MainContainer>
  );
}
