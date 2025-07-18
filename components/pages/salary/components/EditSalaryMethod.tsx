"use client";

import { useSession } from "next-auth/react";
import React, { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CustomUser } from "@/lib/types";
import { uploadNewFile } from "@/utils/actions/fileUpload.action";
import { Loader2 } from "lucide-react";

interface SalaryMethod {
  upiId: string;
  ifscCode: string;
  phoneNumber: string;
  accountNumber: string;
  qrCode?: string;
  bankName: string;
}

export default function EditSalaryMethod() {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  const [salaryMethod, setSalaryMethod] = useState<SalaryMethod>({
    upiId: "",
    ifscCode: "",
    phoneNumber: "",
    accountNumber: "",
    qrCode: "",
    bankName: "",
  });

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploadingPreview, setUploadingPreview] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSalaryMethod((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
        setSalaryMethod((prevData) => ({
          ...prevData,
          qrCode: uploadResponse.url,
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

    // Prepare JSON payload
    const payload = {
      qrCode: salaryMethod.qrCode,
      ifsc: salaryMethod.ifscCode,
      accountNo: salaryMethod.accountNumber,
      upiID: salaryMethod.upiId,
      phoneNo: salaryMethod.phoneNumber,
      bankName: salaryMethod.bankName,
    };

    try {
      const response = await fetch(
        `/api/PaymentInfo/update/userDetail/${user?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit data");
      }

      const result = await response.json();
      console.log("Submission successful:", result);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data");
    }
  };

  // Fields to render dynamically
  const formFields: Array<keyof Omit<SalaryMethod, "qrCode">> = [
    "upiId",
    "ifscCode",
    "phoneNumber",
    "accountNumber",
    "bankName",
  ];

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      className="z-10 w-[733px]  m-4 bg-background flex flex-col gap-6 rounded-3xl p-5 lg:p-6"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-semibold text-dark-gray">
        Edit Salary Method
      </h1>
      <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">QR Code</Label>
          <div className="w-full h-[200px] bg-gray-400 relative">
            {uploadingPreview ? (
              <div className="w-full h-full flex items-center justify-center">
                Uploading QR Code <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              <input
                type="file"
                name="qrCode"
                accept="image/*"
                className="w-full opacity-[1] absolute h-full top-0 left-0 right-0 bottom-0 text-base outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
                onChange={handleFileChange}
              />
            )}
            {previewUrl && (
              <Image
                src={previewUrl}
                alt="QR Code Preview"
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {formFields.map((field) => (
          <div key={field} className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              {field.toUpperCase()}
            </Label>
            <input
              type="text"
              name={field}
              placeholder={`E.g. ${field}`}
              value={salaryMethod[field]}
              onChange={handleChange}
              className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
              required
            />
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-2 justify-end">
        <DialogClose asChild>
          <SquareButton className="text-[#6A6A6A] w-fit self-end">
            Cancel
          </SquareButton>
        </DialogClose>
        <button
          type="submit"
          className="flex flex-row items-center py-3 px-5 gap-2 shadow-neuro-9 rounded-xl text-[#ffffff] text-nowrap bg-primary-blue"
        >
          Edit
        </button>
      </div>
    </form>
  );
}
