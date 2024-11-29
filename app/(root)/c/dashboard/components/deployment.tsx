"use client";

import { useState } from "react";
import { Link, MessageCircleMore, SendHorizontal, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export default function Deployment() {
    const [isDeploymentsChatOpen, setIsDeploymentsChatOpen] = useState(false);
  return (
    <div className="w-full flex flex-col gap-6 mt-6">
        <h1 className="text-3xl font-semibold">Deployments</h1>
        <div className=" w-full min-h-[300px]  max-h-[600px]  rounded-[50px] shadow_figma_design_box ">
          <div className=" w-full h-full flex flex-row overflow-hidden ">
            <div
              className={`relative transition-all ease-in-out duration-300   h-full ${
                isDeploymentsChatOpen ? "hidden" : "block"
              } w-fit lg:block   rounded-[50px] shadow_figma_design_image overflow-hidden ${
                isDeploymentsChatOpen ? " lg:min-w-[60%]  " : "min-w-[100%]"
              } `}
            >
              <Image
                src=""
                width={100}
                height={100}
                className={` relative top-0 z-[-2] transition-all ease-in-out duration-300   ${
                  isDeploymentsChatOpen
                    ? "w-full h-full"
                    : "w-full h-full md:h-fit"
                }    `}
                alt=""
              />

              <div className="absolute left-[45px] bottom-[35px] flex flex-row gap-4 ">
                <div className="h-[50px] w-[50px] bg-black flex flex-row items-center justify-center cursor-pointer ">
                  <Link color="white" />
                </div>
                <div
                  onClick={() =>
                    setIsDeploymentsChatOpen(!isDeploymentsChatOpen)
                  }
                  className="h-[50px] w-[50px] bg-black flex flex-row items-center justify-center cursor-pointer "
                >
                  <MessageCircleMore color="white" />
                </div>
              </div>
            </div>
            <div
              className={`  h-full  w-full flex flex-col gap-4 p-6 ${
                isDeploymentsChatOpen ? "min-w-[40%]" : "hidden"
              } `}
            >
              <div className="w-full flex flex-row items-center justify-between">
                <h1 className="text-2xl font-normal">Comments</h1>
                <div className="flex flex-row items-center cursor-pointer ">
                  <X
                    onClick={() => setIsDeploymentsChatOpen(false)}
                    size={37}
                  />
                </div>
              </div>
              <div className="flex-1">
                <ScrollArea className=" h-full max-h-[410px] w-full rounded-md  ">
                  <div className="h-full w-full flex flex-col gap-5 pb-2 ">
                    <div className="  flex flex-col w-fit max-w-[90%] rounded-lg mt-2 ml-2  shadow-[5px_5px_5px_0px_#789BD399,-5px_-5px_5px_0px_#f6ffffcc]  p-2">
                      <div className="flex flex-row text-xs text-[#858585]  items-center justify-between gap-4 ">
                        <p className=" ">Ashir</p>
                        <p>00:00</p>
                      </div>

                      <div className="text-base font-medium text-[#1E1B39]">
                        I was saying that let’s finalize this ui... I think that
                        this looks just fine and very easy to develop...
                      </div>
                    </div>

                    <div className=" self-end  flex flex-col w-fit max-w-[90%] rounded-lg mt-2 mr-2  shadow-[5px_5px_5px_0px_#789BD399,-5px_-5px_5px_0px_#ffffffcc]  p-2">
                      <div className="flex flex-row text-xs text-[#858585]  items-center justify-between gap-4 ">
                        <p className=" ">Ashir</p>
                        <p>00:00</p>
                      </div>

                      <div className="text-base font-medium text-[#1E1B39]">
                        I was saying that let’s finalize this ui... I think that
                        this looks just fine and very easy to develop...
                      </div>
                    </div>

                    <div className="  flex flex-col w-fit max-w-[90%] rounded-lg mt-2 ml-2  shadow-[5px_5px_5px_0px_#789BD399,-5px_-5px_5px_0px_#f6ffffcc]  p-2">
                      <div className="flex flex-row text-xs text-[#858585]  items-center justify-between gap-4 ">
                        <p className=" ">Ashir</p>
                        <p>00:00</p>
                      </div>

                      <div className="text-base font-medium text-[#1E1B39]">
                        I was saying that let’s finalize this ui... I think that
                        this looks just fine and very easy to develop...
                      </div>
                    </div>

                    <div className=" self-end  flex flex-col w-fit max-w-[90%] rounded-lg mt-2 mr-2  shadow-[5px_5px_5px_0px_#789BD399,-5px_-5px_5px_0px_#ffffffcc]  p-2">
                      <div className="flex flex-row text-xs text-[#858585]  items-center justify-between gap-4 ">
                        <p className=" ">Ashir</p>
                        <p>00:00</p>
                      </div>

                      <div className="text-base font-medium text-[#1E1B39]">
                        I was saying that let’s finalize this ui... I think that
                        this looks just fine and very easy to develop...
                      </div>
                    </div>

                    <div className="  flex flex-col w-fit max-w-[90%] rounded-lg mt-2 ml-2  shadow-[5px_5px_5px_0px_#789BD399,-5px_-5px_5px_0px_#f6ffffcc]  p-2">
                      <div className="flex flex-row text-xs text-[#858585]  items-center justify-between gap-4 ">
                        <p className=" ">Ashir</p>
                        <p>00:00</p>
                      </div>

                      <div className="text-base font-medium text-[#1E1B39]">
                        I was saying that let’s finalize this ui... I think that
                        this looks just fine and very easy to develop...
                      </div>
                    </div>

                    <div className=" self-end  flex flex-col w-fit max-w-[90%] rounded-lg mt-2 mr-2  shadow-[5px_5px_5px_0px_#789BD399,-5px_-5px_5px_0px_#ffffffcc]  p-2">
                      <div className="flex flex-row text-xs text-[#858585]  items-center justify-between gap-4 ">
                        <p className=" ">Ashir</p>
                        <p>00:00</p>
                      </div>

                      <div className="text-base font-medium text-[#1E1B39]">
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
                  className=" outline-none w-full rounded-full p-5 pr-20  border border-gray-300"
                />
                <div className="absolute right-5 top-[15px] cursor-pointer">
                  <SendHorizontal color="gray" size={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
