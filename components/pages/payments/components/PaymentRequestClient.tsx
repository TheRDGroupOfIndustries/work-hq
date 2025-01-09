"use client";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CustomUser } from "@/lib/types";
import { Loader2, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ClientPaymentRequest {
  subject: string;
  description: string;
  amount: string;
  employeeName: string;
  employeeId: string;
}

export default function PaymentRequestClient() {
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as CustomUser;



  // State for form data with type annotation
  const [request, setRequest] = useState<ClientPaymentRequest>({
    subject: "",
    description: "",
    amount: "",
    employeeName: "",
    employeeId: "",
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
      type: "payment",
      from: {
        role: "client",
        userID: request.employeeId,
      },
      amount: amount,
      to: {
        role: "company",
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
        throw new Error("Failed to submit Client payment request");
      }

      const result = await response.json();
      toast.success("Client payment request submitted successfully!");
      console.log("Submission successful:", result);
      
      // Reset form after successful submission
      
      document.getElementById("close")?.click();
    } catch (error) {
      console.error("Error submitting advance payment request:", error);
      alert("Failed to submit advance payment request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClientSelect = (employee: CustomUser) => {
    setRequest((prevData) => ({
      ...prevData,
      employeeName: employee.firstName + " " + employee.lastName,
      employeeId: employee._id,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="text-2xl font-semibold text-dark-gray">Make A Payment Request to Client</h1>
      <div className="flex flex-col gap-3">
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Select Employee
          </Label>
          <ClientSelect onSelect={handleClientSelect} />
        </div>
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


export function ClientSelect({
    onSelect,
  }: {
    onSelect: (employee: CustomUser) => void;
  }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [client, setClient] = useState<CustomUser[] | []>([]);
    // const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

  
    useEffect(() => {
      async function getEmployees() {
        const res = await fetch("/api/user/get", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
  
        const data = await res.json();
  
        setClient(
          // Filter users with role "client"
          data.users.filter((user: CustomUser) => user.role === "client")
        );
      }
  
      getEmployees()
    }, []);
  
    // Filter client based on search term
    const filteredclient = client.filter((client) =>
      [client.firstName, client.lastName, client.email].some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  
    // Handle click outside to close dropdown
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    const handleSelect = (client: CustomUser) => {
      // setSelectedEmployee(employee);
      setSearchTerm(client.firstName + " " + client.lastName);
      setIsOpen(false);
      onSelect(client);
    };
  
    return (
      <div ref={wrapperRef} className="relative w-full ">
        <div className="relative">
          <input
            type="text"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
            placeholder="Search employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
          />
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
  
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredclient.length > 0 ? (
              filteredclient.map((client) => (
                <div
                  key={client._id}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSelect(client)}
                >
                  <div className="font-medium">
                    {client.firstName + " " + client.lastName}{" "}
                    {client.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{""}</div>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500">No employees found</div>
            )}
          </div>
        )}
      </div>
    );
  }
  