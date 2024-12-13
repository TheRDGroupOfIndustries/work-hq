"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { removeFile } from "@/utils/actions/fileUpload.action";
import { uploadMultipleNewFiles } from "@/utils/actions/fileUpload.action";
import { formatDateString } from "@/lib/utils";
import { toast } from "sonner";
import { useProjectContext } from "@/context/ProjectProvider";

interface FileObject {
  file: File;
  title: string;
  description: string;
  date: Date;
  size: number;
}

interface UploadFilesProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

export default function UploadFiles({
  isOpen,
  onClose,
  projectId,
}: UploadFilesProps) {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [modalOptions, setModalOptions] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { setProjectDetails } = useProjectContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setModalOptions({ ...modalOptions, title: file.name });
    }
  };

  const handleRemoveFile = async (fileToRemove: string) => {
    try {
      await removeFile(fileToRemove);
      setFiles((prev) =>
        prev.filter((file) => file.file.name !== fileToRemove)
      );
    } catch (error) {
      console.log(error);
      alert("Failed to remove file. Please try again later.");
    }
  };

  const handleCleanup = async () => {
    // removing all uploaded files when canceling
    for (const file of files) {
      try {
        await removeFile(file.file.name);
      } catch (error) {
        console.log("Error removing file:", error);
      }
    }
    setFiles([]);
  };

  const handleAddFile = () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const newFile: FileObject = {
      file: selectedFile,
      title: modalOptions.title,
      description: modalOptions.description,
      date: new Date(),
      size: selectedFile.size,
    };

    // updating local state
    setFiles((prev) => [...prev, newFile]);

    // reseting selected file and modal options
    setSelectedFile(null);
    setModalOptions({ title: "", description: "" });
  };

  const handleSaveFiles = async () => {
    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach((fileObj) => {
        formData.append("files", fileObj.file);
      });

      const fileUrls = await uploadMultipleNewFiles(formData);

      if (!fileUrls) {
        toast.error("Uploading files failed");
      }

      // calling API to update project additional files
      const response = await fetch("/api/project/update/additional-files", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: projectId,
          additionalFiles: files.map((file, index) => ({
            ...file,
            url: fileUrls[index],
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update project additional files");
      }

      const data = await response.json();
      // updating the context state with the updated project details
      setProjectDetails(data.project);

      toast.success("Files saved successfully!");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Files upload failed. Please try again later.");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return;

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-10 w-[733px] max-h-[70vh] m-4 bg-primary-sky-blue flex flex-col gap-6 rounded-3xl p-5 lg:p-6 overflow-x-hidden overflow-y-scroll"
      >
        <h1 className="text-2xl font-semibold text-dark-gray">Upload File</h1>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-3"
        >
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">Title</Label>
            <input
              type="text"
              value={modalOptions.title}
              onChange={(e) =>
                setModalOptions({ ...modalOptions, title: e.target.value })
              }
              placeholder="Name of file"
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
              value={modalOptions.description}
              onChange={(e) =>
                setModalOptions({
                  ...modalOptions,
                  description: e.target.value,
                })
              }
              placeholder="What is this file about?"
              className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
            />
          </div>

          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Upload File
            </Label>
            <div className="relative w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4 flex flex-row items-center">
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute z-10 top-0 bottom-0 right-0 left-0 w-[90%] h-full opacity-0 cursor-pointer"
              />
              {selectedFile ? (
                <div className="flex items-center w-full justify-between">
                  <p className="truncate max-w-[80%]">{selectedFile.name}</p>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <p className="w-full text-base">Upload File</p>
              )}
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-medium mb-2">Uploaded Files</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Title</th>
                      <th className="p-2 text-left">Description</th>
                      <th className="p-2 text-left">Size</th>
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">{file.title}</td>
                        <td className="p-2">{file.description}</td>
                        <td className="p-2">{formatFileSize(file.size)}</td>
                        <td className="p-2">
                          {formatDateString(file.date.toString())}
                        </td>
                        <td className="p-2">
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(file.file.name)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex flex-row gap-2 justify-end">
            <button
              type="button"
              onClick={handleAddFile}
              className="text-desktop flex items-center py-3 px-5 gap-2 shadow-[3px_3px_10px_0px_#789BD399,5px_5px_15px_0px_#00000099_inset,-3px_-3px_10px_0px_#FFFFFF] rounded-xl text-white bg-primary-blue"
            >
              <Plus color="#ffffff" />
              Add File
            </button>
            <button
              type="button"
              onClick={handleSaveFiles}
              disabled={uploading}
              className="text-desktop flex items-center py-3 px-5 gap-2 shadow-[3px_3px_10px_0px_#789BD399,5px_5px_15px_0px_#00000099_inset,-3px_-3px_10px_0px_#FFFFFF] rounded-xl text-white bg-primary-blue"
            >
              {uploading ? "Saving..." : "Save Files"}
            </button>
            <button
              type="button"
              onClick={() => {
                handleCleanup();
                onClose();
              }}
              className="text-desktop flex items-center py-3 px-5 gap-2 shadow-[3px_3px_10px_0px_#789BD399,5px_5px_15px_0px_#00000099_inset,-3px_-3px_10px_0px_#FFFFFF] rounded-xl text-white bg-red-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// utility functions
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
