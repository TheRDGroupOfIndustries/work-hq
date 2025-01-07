"use client";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CustomUser } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface AdvancePaymentRequest {
  subject: string;
  description: string;
  amount: string;
}

export default function RequestAdvancePayment() {
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as CustomUser;



  // State for form data with type annotation
  const [request, setRequest] = useState<AdvancePaymentRequest>({
    subject: "",
    description: "",
    amount: "",
  });

  // Typed change handler for input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Typed submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);

    // Basic validation
    if (!request.subject.trim()) {
      alert("Please enter a request subject");
      return;
    }

    if (!request.description.trim()) {
      alert("Please provide a request description");
      return;
    }

    // Validate amount (ensure it's a positive number)
    const amount = parseFloat(request.amount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid request amount");
      return;
    }

    // Prepare data for submission

    const payload = {
      paymentTitle: request.subject.trim(),
      requestDescription: request.description.trim(),
      status: "requested",
      isRequested: true,
      type: "salary",
      from: {
        role: "manager",
      },
      amount: amount,
      to: {
        role: "developer",
        userID: user._id,
      },
      requestedDate: new Date(),
    };

    try {
      // Send data to backend
      const response = await fetch(`/api/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    

      });

      if (!response.ok) {
        throw new Error("Failed to submit advance payment request");
      }

      const result = await response.json();
      toast.success("Advance payment request submitted successfully!");
      console.log("Submission successful:", result);
      
      // Reset form after successful submission
      setRequest({
        subject: "",
        description: "",
        amount: "",
      });
      document.getElementById("close")?.click();
    } catch (error) {
      console.error("Error submitting advance payment request:", error);
      alert("Failed to submit advance payment request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
      className="z-10 w-[733px] m-4 bg-background flex flex-col gap-6 rounded-3xl p-5 lg:p-6"
    >
      <h1 className="text-2xl font-semibold text-dark-gray">Request Advance Payment</h1>
      <div className="flex flex-col gap-3">
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Request Subject
          </Label>
          <input
            type="text"
            name="subject"
            value={request.subject}
            onChange={handleChange}
            placeholder="E.g. Project Advance"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
            required
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <Label className="text-base font-medium text-gray-800">
            Request Description
          </Label>
          <Textarea
            name="description"
            value={request.description}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Meeting Description"
            className="w-full resize-none border-0 p-3 focus-visible:ring-0 h-[120px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
          />
        </div>

        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Request Amount
          </Label>
          <input
            type="text"
            name="amount"
            value={request.amount}
            onChange={handleChange}
            placeholder="E.g. 5000"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
            required
          />
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-end">
        <DialogClose asChild>
          <SquareButton id="close" className="text-[#f04e4e] w-fit self-end">
            Cancel
          </SquareButton>
        </DialogClose>
        <button 
        disabled={!request.subject || !request.description || !request.amount || submitting}
          type="submit"
          className="flex flex-row items-center py-3 px-5 gap-2 shadow-neuro-9 rounded-xl text-[#ffffff] text-nowrap bg-primary-blue disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Send"
          )}
        </button>
      </div>
    </form>
  );
}