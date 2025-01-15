"use client";

import SquareButton from "@/components/reusables/wrapper/squareButton";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CustomUser } from "@/lib/types";
import { RootState } from "@/redux/rootReducer";
import { uploadNewFile } from "@/utils/actions/fileUpload.action";
import { Loader2, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

interface EmployeeSalary {
  employeeName: string;
  employeeId: string;
  amount: number;
  paymentProof: string;
  bonus: number;
  transactionId: string;
}

export default function AddEmployeeSalary() {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  const [submitting, setSubmitting] = useState<boolean>(false);

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploadingPreview, setUploadingPreview] = useState<boolean>(false);

  const [employeeSalary, setEmployeeSalary] = useState<EmployeeSalary>({
    employeeName: "",
    employeeId: "",
    transactionId: "",
    amount: 0,
    paymentProof: "",
    bonus: 0,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPreview(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResponse = await uploadNewFile(formData);
      if (uploadResponse?.url) {
        setPreviewUrl(uploadResponse.url);
        setEmployeeSalary((prevData) => ({
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Prepare JSON payload

    console.log("handleSubmit", employeeSalary);
    const payload = {
      paymentTitle: employeeSalary.employeeName + " salary",
      status: "fulfilled",
      isRequested: false,
      type: "salary",
      from: {
        role: "manager",
        userID: user._id,
      },
      amount: employeeSalary.amount,
      transactionID: employeeSalary.transactionId,
      paymentProof: employeeSalary.paymentProof,
      to: {
        role: "developer",
        userID: employeeSalary.employeeId,
      },
      bonus : employeeSalary.bonus,
      paymentDate: new Date().toISOString(),
    };

    console.log("");

    try {
      const response = await fetch(`/api/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit data");
      }

      const result = await response.json();
      document.getElementById("close")?.click();
      console.log("Submission successful:", result);

      // alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmployeeSelect = (employee: CustomUser) => {
    setEmployeeSalary((prevData) => ({
      ...prevData,
      employeeName: employee.firstName + " " + employee.lastName,
      employeeId: employee._id,
    }));
  };

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      className=" w-[733px]  m-4 bg-background flex flex-col gap-6 rounded-3xl p-5 lg:p-6 z-30"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-semibold text-dark-gray">
        Add an Employee Salary
      </h1>
      <div className="flex flex-col gap-3 max-h-[70vh] py-5 px-2 overflow-y-auto">
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Select Employee
          </Label>
          <EmployeeSelect onSelect={handleEmployeeSelect} />
        </div>

        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Transaction Id
          </Label>
          <input
            type="text"
            name={"transactionId"}
            value={employeeSalary.transactionId}
            onChange={(e) =>
              setEmployeeSalary((prevData) => ({
                ...prevData,
                transactionId: e.target.value,
              }))
            }
            placeholder="Transaction Id"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
            required
          />
        </div>

        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            {"Uploud Payment Proof (pdf, image etc)"}
          </Label>
          <div className="w-full h-[200px]  shadow-neuro-3 bg-transparent rounded-lg px-4  relative overflow-hidden">
            {uploadingPreview ? (
              <div className="w-full h-full flex items-center justify-center">
                Uploading <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center relative">
                <input
                  type="file"
                  className="w-full opacity-0 absolute h-full top-0 left-0 right-0 bottom-0 text-base outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
                  onChange={handleFileChange}
                />
                <div className="w-full h-full flex items-center justify-center rounded-lg ">
                  Upload file
                </div>
              </div>
            )}
            {previewUrl && (
              <Image
                src={previewUrl}
                alt="Preview"
                width={1920}
                height={1080}
                className="w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0 rounded-lg"
              />
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Payment Amount
          </Label>
          <input
            type="text"
            name={"amount"}
            value={employeeSalary.amount}
            onChange={(e) =>
              setEmployeeSalary((prevData) => ({
                ...prevData,
                amount: Number(e.target.value),
              }))
            }
            placeholder="Payment Amount"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
            required
          />
        </div>

        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Bonus Amount
          </Label>
          <input
            type="text"
            name={"bonus"}
            value={employeeSalary.bonus}
            onChange={(e) =>
              setEmployeeSalary((prevData) => ({
                ...prevData,
                bonus: Number(e.target.value),
              }))
            }
            placeholder="Bonus Amount"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
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
          type="submit"
          disabled={submitting}
          className="flex flex-row items-center py-3 px-5 gap-2 shadow-neuro-9 rounded-xl text-[#ffffff] text-nowrap bg-primary-blue disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit"}
        </button>
      </div>
    </form>
  );
}
// Type for an employee

export function EmployeeSelect({
  onSelect,
}: {
  onSelect: (employee: CustomUser) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<CustomUser[] | []>([]);
  // const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const employeesList = useSelector(
    (state: RootState) => state.ceo.employeesList
  );

  useEffect(() => {
    async function getEmployees() {
      const res = await fetch("/api/user/get", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      setEmployees(
        // Filter users with role "developer"
        data.users.filter((user: CustomUser) => user.role === "developer" || user.role === "manager")
      );
    }

    if (employeesList.length === 0) {
      getEmployees();
    } else {
      setEmployees(employeesList);
    }
  }, [employeesList]);

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    [employee.firstName, employee.lastName, employee.email].some((field) =>
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

  const handleSelect = (employee: CustomUser) => {
    // setSelectedEmployee(employee);
    setSearchTerm(employee.firstName + " " + employee.lastName);
    setIsOpen(false);
    onSelect(employee);
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
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <div
                key={employee._id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSelect(employee)}
              >
                <div className="font-medium">
                  {`${employee.firstName} ${employee.lastName} (${employee.role})`}
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
