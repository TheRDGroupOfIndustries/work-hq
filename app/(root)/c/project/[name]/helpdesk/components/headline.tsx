"use client";
import SquareButton from "@/components/reusables/wrapper/squareButton";

export default function Headline({setIsRaiseTicketOpen}:{setIsRaiseTicketOpen:(value:boolean)=>void}) {
  return (
    <div className=" w-full my-4 flex flex-row items-center justify-between">
      <div className="flex flex-col gap-1">
        {/* headline */}
        <h1 className="text-3xl font-semibold">Helpdesk Tickets</h1>
        <p className="text-[#6A6A6A] text-base font-normal">
          {"Project / helpdesk"}
        </p>
      </div>

      <SquareButton
      onClick={()=>{setIsRaiseTicketOpen(true)}}
      >
        Raise a Ticket
      </SquareButton>
    </div>
  );
}
