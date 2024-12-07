"use client";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import NeuroInputField from "@/components/ui/NeuroInputField";
import { CustomUser } from "@/lib/types";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function EditProfile() {
    const {data: session} = useSession();
    const user = session?.user as CustomUser;
    const [userDetails, setUserDetails] = useState<CustomUser>(user);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

  return (
    // <div
    //   onClick={() => setAddPaymentOpen(false)}
    //   className=" z-10 absolute flex items-center justify-center  right-0 bottom-0 left-0 h-[calc(100vh-70px)]  w-full bg-black/30"
    // >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-10 w-[733px] m-4  bg-primary-sky-blue flex flex-col gap-6 rounded-3xl   p-5 lg:p-6 "
      >
        <h1 className="text-2xl font-semibold text-dark-gray">Edit Profile</h1>

        <div className="flex flex-col gap-3">
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              First Name
            </Label>
           <NeuroInputField type="text" value={userDetails?.firstName} onChange={handleChange} placeholder="e.g. Johan" required name='firstName'/>
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
                Last Name
            </Label>
            <NeuroInputField type="text" value={userDetails?.lastName ?? " "} onChange={handleChange} placeholder="e.g. Doe" required name='lastName'/>
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Phone No
            </Label>
            <NeuroInputField type="text" value={userDetails?.phone ?? ""} onChange={(e)=>{
                //check if the value is nummber and its length is less than 11
                if(e.target.value.length <= 11 && !isNaN(Number(e.target.value))){
                    handleChange(e);
                }
            }} placeholder="e.g. 08012345678" required name='phoneNo'/>
          </div>
          
        </div>
        <div className="flex flex-row gap-2 justify-end">
        <DialogClose asChild>
          <SquareButton
            className="text-[#6A6A6A] w-fit self-end"
          >
            Cancel
          </SquareButton>
          </DialogClose>
          <button className="flex flex-row items-center py-3 px-5 gap-2 shadow-[3px_3px_10px_0px_#789BD399,5px_5px_15px_0px_#00000099_inset,-3px_-3px_10px_0px_#FFFFFF] rounded-xl text-[#ffffff]  text-nowrap bg-primary-blue">
            <Plus color="#ffffff" />
            Save Changes
          </button>
        </div>
      </div>
    // </div>
  );
}
