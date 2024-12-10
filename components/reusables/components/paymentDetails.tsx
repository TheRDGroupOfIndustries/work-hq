import { Label } from "@/components/ui/label";

interface PaymentDetails {
  OR: string; // maybe url
  IFSC: string;
  accountNumber: string;
  upiId: string;
  phoneNumber: string;
}

export default function PaymentDetails({
  title,
  paymentDetails,
}: {
  title: string;
  paymentDetails: PaymentDetails;
}) {
  return (
    <div className="p-5 flex flex-col gap-3">
      <h4 className="text-lg font-medium font-dark-gray">{title}</h4>
      <p className="text-sm ">OR Code</p>
      <div className="ratio-square bg-slate-400 size-[200px]"></div>

      <div className="grid gap-4 grid-cols-2">
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            IFSC Code
          </Label>
          <input
            type="text"
            disabled
            defaultValue={paymentDetails.IFSC}
            placeholder="e.g. Johan"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Account Number
          </Label>
          <input
            type="text"
            disabled
            defaultValue={paymentDetails.accountNumber}
            placeholder="e.g. Johan"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">UPI ID</Label>
          <input
            type="text"
            disabled
            defaultValue={paymentDetails.upiId}
            placeholder="e.g. Johan"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Phone Number
          </Label>
          <input
            type="text"
            disabled
            defaultValue={paymentDetails.phoneNumber}
            placeholder="e.g. Johan"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
            required
          />
        </div>
      </div>
    </div>
  );
}
