"use client";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import RaiseTicket from "./raiseTicket";
export default function Headline() {
  return (
    <div className=" w-full my-4 flex flex-row items-center justify-between">
      <div className="flex flex-col gap-1">
        {/* headline */}
        <h1 className="text-2xl font-semibold">Helpdesk Tickets</h1>
        <p className="text-[#6A6A6A] text-base font-normal">
          {"Project / helpdesk"}
        </p>
      </div>

      


      <Dialog>
        <DialogTrigger>
        <SquareButton>
        Raise a Ticket
      </SquareButton>
        </DialogTrigger>
        <DialogContent>
          <RaiseTicket/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
