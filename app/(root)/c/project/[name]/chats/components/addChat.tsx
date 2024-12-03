'use client';
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

export default function AddChat({
  setIsAddChatOpen,
}: {
  setIsAddChatOpen: (value: boolean) => void;
}) {
  return (
    <div
      onClick={() => setIsAddChatOpen(false)}
      className="z-5 absolute flex items-center justify-center  right-0 bottom-0 left-0 h-[calc(100vh-70px)] w-full bg-black/30"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-10 w-[733px] m-4  bg-background flex flex-col gap-6 rounded-3xl   p-5 lg:p-6 "
      >
        <h1 className="text-2xl font-semibold text-dark-gray">Add A Chat</h1>
        <div className="flex flex-col gap-3 w-full">
          <span className="relative w-full ">
            <input
              placeholder="Search by name or role"
              className=" bg-[#E4EEFE] w-full  py-3 px-6 pl-11 outline-none shadow_search border-[#C1C7CD] rounded-xl placeholder:text-[#697077] placeholder:font-medium placeholder:text-base  "
              type="search"
              name=""
              id=""
            />
            <Search
              color="#697077"
              strokeWidth={2.6}
              className="absolute h-[20px] w-[20px] top-[14px] left-4 font-medium"
            />
          </span>
          <ScrollArea className=" h-[40vh]">
          <div className="flex flex-col p-3 ">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          </ScrollArea>
        </div>
        <SquareButton className="text-[#6A6A6A] w-fit self-end" onClick={() => setIsAddChatOpen(false)}>
          Cancel
        </SquareButton>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="w-full p-1  hover:shadow-[5px_5px_15px_0px_#789BD399,-5px_-5px_8px_0px_#ffffffcc] rounded-xl grid grid-cols-[minmax(60px,_60px)_1fr] ">
      <div className="flex justify-center items-center">
        <div className="w-[60px] h-[60px] bg-slate-400 rounded-full"></div>
      </div>

      <div className="flex flex-col py-2  justify-between">
        <h1 className=" line-clamp-1 flex text-lg font-semibold text-dark-gray mx-5">
          Ashri Mallick <span className="font-normal"> {"(Developer)"}</span>
        </h1>
        <h4 className="text-base line-clamp-1 text-dark-gray mx-5">
          Hello, your 2,100,500 is pending, please pay as soon as possible :)
        </h4>
      </div>
    </div>
  );
}
