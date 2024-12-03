"use client";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export default function AddPayment() {
  return (
    // <div
    //   onClick={() => setAddPaymentOpen(false)}
    //   className=" z-10 absolute flex items-center justify-center  right-0 bottom-0 left-0 h-[calc(100vh-70px)]  w-full bg-black/30"
    // >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-10 w-[733px] m-4  bg-primary-sky-blue flex flex-col gap-6 rounded-3xl   p-5 lg:p-6 "
      >
        <h1 className="text-2xl font-semibold text-dark-gray">Add Payment</h1>

        <div className="flex flex-col gap-3">
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Transaction ID
            </Label>
            <input
              type="text"
              placeholder="E.g. 0192892939"
              className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Payment Subject
            </Label>
            <input
              type="text"
              placeholder="What is this payment for?"
              className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Upload Payment Proof (pdf, image etc)
            </Label>
            <div className=" relative w-full text-base outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4 h-[150px]">
              <input
                type="file"
                name=""
                id=""
                className="absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer opacity-0"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Payment Amount
            </Label>
            <input
              type="text"
              placeholder="Payment amount"
              className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
              required
            />
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
            Add Payment
          </button>
        </div>
      </div>
    // </div>
  );
}
