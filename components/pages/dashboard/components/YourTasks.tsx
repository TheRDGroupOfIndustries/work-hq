import MidSizeCard from "@/components/reusables/wrapper/midSizeCard";
import { ArrowRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export function YourCurrentTasks() {
  const navigate = useRouter()
  const params = useParams();
  return (
    <MidSizeCard className="h-[550px] ">
      <div className="h-full w-full flex flex-col gap-2 p-5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-medium text-dark-gray ">
              Your Current Tasks
            </h1>
            <p className="text-base font-normal text-[#6A6A6A] Total current - 24">
              Total current - 24
            </p>
          </div>
          <ArrowRight className=" cursor-pointer" onClick={()=>{navigate.push( `/dev/project/${params.name}/kanban`)}} size={30}  />
        </div>
        <div className="flex flex-col gap-2 px-2">
            <Line/>
            <Line/>
            <Line/>
        </div>
      </div>
    </MidSizeCard>
  );
}

export function YourCompletedTasks() {
  const navigate = useRouter()
  const params = useParams();
  return (
    <MidSizeCard className="h-[550px] ">
      <div className="h-full w-full flex flex-col gap-2 p-5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-medium text-dark-gray ">
              Your Completed Tasks
            </h1>
            <p className="text-base font-normal text-[#6A6A6A] Total current - 24">
              Total current - 24
            </p>
          </div>
          <ArrowRight className=" cursor-pointer" onClick={()=>{navigate.push( `/dev/project/${params.name}/kanban`)}} size={30}  />
        </div>
        <div className="flex flex-col gap-2 px-2">
            <Line/>
            <Line/>
            <Line/>
        </div>
      </div>
    </MidSizeCard>
  );
}

function Line () {
    return (
        <div className="grid text-base text-dark-gray  grid-cols-[30px_1fr] p-2 rounded-lg hover:shadow-neuro-3">
            <span>1.</span>
            <p>Create Navigation pane for categories</p>
        </div>
    )
}
