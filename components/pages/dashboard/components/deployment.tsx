"use client";

import { useState } from "react";
import { Role, VENDOR } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, MessageCircleMore, Plus, SendHorizontal, X } from "lucide-react";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProjectContext } from "@/context/ProjectProvider";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export default function Deployment({
  link,
  role,
}: {
  link?: string;
  role: Role;
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <div className="w-full flex flex-col gap-6 mt-6">
      <h1 className="text-2xl font-semibold">Deployments</h1>
      <div
        className={` w-full   h-[500px]  rounded-[30px]  ${
          role === VENDOR
            ? "shadow-[10px_10px_20px_0px_#1c2c4766,-5px_-5px_15px_0px_#efefef]"
            : "shadow-neuro-5"
        } `}
      >
        <div className=" w-full h-full flex flex-row overflow-hidden ">

          <div
            className={`relative transition-all ease-in-out duration-300 w-fit lg:block rounded-[30px] overflow-hidden h-full   
            ${isChatOpen ? "hidden" : "block"} 
            ${isChatOpen ? " lg:min-w-[60%]  " : "min-w-[100%]"}  
            ${
              role === VENDOR
              ? "shadow-[10px_10px_20px_0px_#6d778566_inset,-5px_-5px_15px_0px_#e0e0e0_inset]"
              : "shadow-[10px_10px_20px_0px_#c2d9ff66_inset,-5px_-5px_15px_0px_#c2d9ff66_inset]"
            } `}
          >
            {link ? 
            <iframe
              // style="border: 1px solid rgba(0, 0, 0, 0.1);"
              width="100%"
              height="100%"
              src={link}
              // allowfullscreen
            ></iframe>
            : <div className="w-full h-full flex flex-col items-center justify-center">
              <p className="text-lg font-semibold text-[#858585]">No Deployment Found</p>
            </div>
          }
            <div className="absolute left-[45px] bottom-[35px] flex flex-row gap-4 ">
              <div className="h-[40px] w-[40px] bg-black flex flex-row items-center justify-center cursor-pointer ">
                {(role === "developer" || role === "manager" || role === "ceo") && (
                  <Link color="white" size={20} />
              )}
              </div>
              <div
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="h-[40px] w-[40px] bg-black flex flex-row items-center justify-center cursor-pointer "
              >
                <MessageCircleMore color="white" size={20} />
              </div>
              {(role === "developer" || role === "manager" || role === "ceo") && (
                <AddLink oldLink={link ?? ""} />
              )}
            </div>
            
          </div>
          <div
            className={`  h-full  w-full flex flex-col gap-4 p-3 sm:p-4 md:p-5 lg:p-6 ${
              isChatOpen ? "min-w-[40%]" : "hidden"
            } `}
          >
            <div className="w-full flex flex-row items-center justify-between px-2 py-2    ">
              <h1 className="text-xl font-normal">Comments</h1>
              <div className="flex flex-row items-center cursor-pointer ">
                <X onClick={() => setIsChatOpen(false)} size={30} />
              </div>
            </div>
            <div className="flex-1">
            <ScrollArea className=" h-full max-h-[330px] w-full rounded-md  ">
                <div className="h-full w-full flex flex-col gap-5 pb-2 ">
                  <div className="  flex flex-col w-fit max-w-[90%] rounded-lg mt-2 ml-2  shadow-neuro-3  p-2">
                    <div className="flex flex-row text-xs text-[#858585]  items-center justify-between gap-4 ">
                      <p className=" ">Ashir</p>
                      <p>00:00</p>
                    </div>

                    <div className="text-sm font-medium text-[#1E1B39]">
                      I was saying that let’s finalize this ui... I think that
                      this looks just fine and very easy to develop...
                    </div>
                  </div>

                  <div className=" self-end  flex flex-col w-fit max-w-[90%] rounded-lg mt-2 mr-2  shadow-neuro-3  p-2">
                    <div className="flex flex-row text-xs text-[#858585]  items-center justify-between gap-4 ">
                      <p className=" ">Ashir</p>
                      <p>00:00</p>
                    </div>

                    <div className="text-sm font-medium text-[#1E1B39]">
                      I was saying that let’s finalize this ui... I think that
                      this looks just fine and very easy to develop...
                    </div>
                  </div>

                  

                
                </div>
              </ScrollArea>
            </div>
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Add a comment.."
                className=" outline-none w-full rounded-full p-3 pr-14  border border-gray-300"
              />
              <div className="absolute right-5 top-[10px] cursor-pointer">
                <SendHorizontal
                  color="gray"
                  className=" hover:stroke-gray-700"
                  size={30}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddLink({ oldLink }: { oldLink: string }) {
  const [link, setLink] = useState(oldLink);
  const [submiting, setSubmitting] = useState(false);

  const { selectedProjectDetails } = useProjectContext();

  const handleSubmit = async () => {
    setSubmitting(true);
    const updateProjectRec = await fetch("/api/project/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: selectedProjectDetails?._id,
        developmentDetails: {
          deployment: {
            link: link, 
            channelID: "", 
          },
        },
        
      }),
    });
    if(updateProjectRec.ok){
      toast.success("Link added successfully");
    } else {
      toast.error("Something went wrong");
    }
    document.getElementById("close")?.click();
    setSubmitting(false);
  }
  return (
    <Dialog>
      <DialogTrigger>
        <div className="h-[40px] w-[40px] bg-black flex flex-row items-center justify-center cursor-pointer ">
          <Plus color="white" size={20} />
        </div>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="w-[633px] max-w-[633px] max-h-[90vh] m-4 bg-primary-sky-blue flex flex-col gap-6 rounded-3xl p-5 lg:p-6"
      >
        <h1 className="text-2xl font-semibold text-dark-gray">Add Link</h1>
        <div className="flex flex-col gap-3 overflow-y-auto">
          <div className="w-full flex flex-col gap-3 p-3 ">
            <Label className="text-base font-medium text-gray-800">Link</Label>
            <input
              type="text"
              disabled={submiting}
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
              required
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end">
          <DialogClose asChild>
            <SquareButton id="close" className="text-[#6A6A6A] w-fit self-end">
              Close
            </SquareButton>
          </DialogClose>
          <SquareButton disabled={submiting} id="close" onClick={() => handleSubmit()} className="text-[#6A6A6A] w-fit self-end">
            {submiting ? "Submitting" : "Submit"}
          </SquareButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
