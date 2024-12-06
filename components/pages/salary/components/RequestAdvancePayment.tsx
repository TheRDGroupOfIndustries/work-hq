import React from 'react'
import SquareButton from '@/components/reusables/wrapper/squareButton'
import { DialogClose } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function RequestAdvancePayment() {
  return (
    <div
    onClick={(e) => e.stopPropagation()}
    className="z-10 w-[733px] m-4  bg-background flex flex-col gap-6 rounded-3xl   p-5 lg:p-6 "
  >
    <h1 className="text-2xl font-semibold text-dark-gray">Add A Chat</h1>
    <div className="flex flex-col gap-3">
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
          Request Subject
          </Label>
          <input
            type="text"
            placeholder="E.g. 0192892939"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
            required
          />
        </div>

        <div className="w-full flex flex-col gap-2">
              <Label>Request Description</Label>
              <Textarea
                required
                rows={6}
                placeholder="Meeting Description"
                className="w-full resize-none border-0 p-3 focus-visible:ring-0 h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
              />
            </div>

        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Request Amount
          </Label>
          <input
            type="text"
            placeholder="E.g. 0192892939"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3  bg-transparent rounded-lg px-4"
            required
          />
        </div>
        
        
      </div>
      <div className="flex flex-row gap-2 justify-end">
        <DialogClose asChild>
          <SquareButton className="text-[#f04e4e] w-fit self-end">
            Cancel
          </SquareButton>
        </DialogClose>
        <button className="flex flex-row items-center py-3 px-5 gap-2 shadow-neuro-9 rounded-xl text-[#ffffff]  text-nowrap bg-primary-blue">
          Confirm Request
        </button>
      </div>
  </div>
  )
}
