"use client";

import SquareButton from "@/components/reusables/wrapper/squareButton";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CustomUser } from "@/lib/types";
import { uploadNewFile } from "@/utils/actions/fileUpload.action";
import { Loader2, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface PaymentData {
  paymentTitle: string;
  amount: number;
  transactionID: string;
  paymentProof: string;
  requestDescription: string;
}

export default function AddPayment({
  paymentTitle,
  requestDescription,
  amount,
  paymentID
}: {
  paymentTitle?: string;
  requestDescription?: string;
  amount?: number;
  paymentID?: string
}) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { data: session } = useSession();
  const user = session?.user as CustomUser;
  const [paymentData, setPaymentData] = useState<PaymentData>({
    paymentTitle: paymentTitle || "",
    amount: amount || 0,
    transactionID: "",
    paymentProof: "",
    requestDescription: requestDescription || "",
  });
  const [proofPreview, setProofPreview] = useState<string>("");
  const [uploadingPreview, setUploadingPreview] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPreview(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResponse = await uploadNewFile(formData);
      if (uploadResponse?.url) {
        setProofPreview(uploadResponse.url);
        setPaymentData((prevData) => ({
          ...prevData,
          paymentProof: uploadResponse.url,
        }));
      } else {
        alert("File upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again later.");
    } finally {
      setUploadingPreview(false);
    }
  };

  const handleMakePayment = async () => {
    setSubmitting(true);

    const payload = {
      paymentTitle: paymentData.paymentTitle,
      status: "fulfilled",
      type: "payment",
      from: {
        userID: user?._id,
        role: user?.role,
      },
      to: {
        userID: "",
        role: "company",
      },
      amount: paymentData.amount,
      transactionID: paymentData.transactionID,
      paymentProof: paymentData.paymentProof,
      paymentDate: new Date(),
      requestedDate: new Date(),
      bonus: 0,
      requestDescription: paymentData.requestDescription,
    };

    try {
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status === 400) {
        toast.error(
          data.error || "Failed to attach payment proof. Please try again."
        );
        return;
      }
      setSubmitting(false);
      toast.success(`Payment created successfully: ${data.message}`);

      document.getElementById("close")?.click();

      setProofPreview("");
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("Failed to create payment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMakeRequestPayment = async () => {
    setSubmitting(true);

    const payload = {
      status: "fulfilled",
      transactionID: paymentData.transactionID,
      paymentProof: paymentData.paymentProof,
      paymentDate: new Date(),
      requestDescription: paymentData.requestDescription,
    };

    try {
      const response = await fetch(`/api/payment/update/${paymentID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status === 400) {
        toast.error(
          data.error || "Failed to attach payment proof. Please try again."
        );
        return;
      }
      setSubmitting(false);
      toast.success(`Payment successfully: ${data.message}`);

      document.getElementById("close")?.click();
      console.log("Submission successful:");

    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("Failed to create payment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="z-10 w-[733px] m-4 bg-primary-sky-blue flex flex-col gap-6 rounded-3xl p-5 lg:p-6"
    >
      <h1 className="text-2xl font-semibold text-dark-gray">Add Payment</h1>

      <div className="flex flex-col gap-3">
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Transaction ID
          </Label>
          <input
            type="text"
            name="transactionID"
            value={paymentData.transactionID}
            onChange={handleInputChange}
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
            disabled={paymentTitle ? true : false}
            name="paymentTitle"
            value={paymentData.paymentTitle}
            onChange={handleInputChange}
            placeholder="What is this payment for?"
            className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
            required
          />
        </div>

        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Description
          </Label>
          <input
            type="text"
            disabled={requestDescription ? true : false}
            name="requestDescription"
            value={paymentData.requestDescription}
            onChange={handleInputChange}
            placeholder="What is this payment for?"
            className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
            required
          />
        </div>

        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Upload Payment Proof (PDF, image, etc.)
          </Label>
          <div className="relative w-full h-[150px] shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4">
            <input
              type="file"
              accept="image/*"
              className="absolute z-50 inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileUpload}
            />
            {proofPreview ? (
              <div className="">
                <Image
                  src={proofPreview}
                  className="w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0 rounded-lg"
                  alt="Preview"
                  width={1920}
                  height={1080}
                />
              </div>
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-gray-500">
                {uploadingPreview ? "Uploading..." : "Click to upload proof"}
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Payment Amount
          </Label>
          <input
            type="number"
            name="amount"
            disabled={amount ? true : false}
            value={paymentData.amount}
            onChange={handleInputChange}
            placeholder="Payment amount"
            className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
            required
          />
        </div>
      </div>

      <div className="flex flex-row gap-2 justify-end">
        <DialogClose asChild>
          <SquareButton id="close" className="text-[#6A6A6A] w-fit self-end">
            Cancel
          </SquareButton>
        </DialogClose>
        <button
          onClick={()=> {
            if (paymentID) {
              handleMakeRequestPayment();
            } else {
              handleMakePayment();
            }
          }}
          disabled={
            !paymentData.transactionID ||
            !paymentData.amount ||
            !paymentData.paymentTitle ||
            submitting
          }
          className="flex items-center py-3 px-5 gap-2 shadow-[3px_3px_10px_0px_#789BD399,5px_5px_15px_0px_#00000099_inset,-3px_-3px_10px_0px_#FFFFFF] rounded-xl text-white bg-primary-blue disabled:bg-blue-500 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 color="#ffffff" className="animate-spin" />
              Adding Payment...
            </>
          ) : (
            <>
              <Plus color="#ffffff" />
              Add Payment
            </>
          )}
        </button>
      </div>
    </div>
  );
}
