"use client";

import UploadFiles from "@/components/reusables/components/UploadFiles";
import Container from "@/components/reusables/wrapper/Container";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProjectContext } from "@/context/ProjectProvider";
import { formatDateString } from "@/lib/utils";
import { Role, VENDOR } from "@/types";
import { removeMultipleFiles } from "@/utils/actions/fileUpload.action";
import { Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FilesList({ role }: { role: Role }) {
  const { selectedProjectDetails } = useProjectContext();
  const [selectedFilesCount, setSelectedFilesCount] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = checked
      ? selectedProjectDetails?.projectDetails?.additionalFiles?.map(
          (row) => row._id
        ) ?? []
      : [];
    setSelectedRows(newSelectedRows);
    setSelectedFilesCount(newSelectedRows.length);
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelectedRows = checked
      ? [...selectedRows, id]
      : selectedRows.filter((rowId) => rowId !== id);
    setSelectedRows(newSelectedRows);
    setSelectedFilesCount(newSelectedRows.length);
  };

  const isRowSelected = (id: string) => selectedRows.includes(id);
  const isAllSelected =
    ((selectedProjectDetails?.projectDetails?.additionalFiles?.length ?? 0) >
      0 &&
      selectedRows.length ===
        (selectedProjectDetails?.projectDetails?.additionalFiles?.length ??
          0)) ||
    false;

  const handleDeleteFiles = async () => {
    if (selectedFilesCount > 0) {
      const additionalFiles =
        selectedProjectDetails?.projectDetails?.additionalFiles;
      const fileUrls = selectedRows
        .map((fileId) => {
          const file = additionalFiles?.find((f) => f._id === fileId);
          return file ? file.url : null;
        })
        .filter((url) => url !== null);

      const removedFilesSuccess = await removeMultipleFiles(
        fileUrls as string[]
      );

      if (removedFilesSuccess) {
        try {
          const response = await fetch(
            `/api/project/delete/${selectedProjectDetails?._id}/remove-additional-files`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ additionalFiles: selectedRows }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to remove files from database");
          }

          toast.success(`Successfully deleted ${selectedFilesCount} files`);
          setSelectedRows([]);
          setSelectedFilesCount(0);
        } catch (error) {
          console.log(error);
          toast.error("Error removing files from database:");
        }
      } else {
        toast.error("Failed to delete files");
      }
    } else {
      toast.error("No files selected for deletion");
    }
  };

  const handleDownloadFiles = () => {
    const additionalFiles =
      selectedProjectDetails?.projectDetails?.additionalFiles;
    if (additionalFiles && additionalFiles.length > 0) {
      selectedRows.forEach((fileId) => {
        const file = additionalFiles.find((f) => f._id === fileId);
        if (file) {
          const link = document.createElement("a");
          link.href = file.url;
          link.download = file.title; // Optional: specify a download name
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
    } else {
      console.log("No files available for download");
    }
  };

  return (
    <Container>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="uppercase text-lg text-dark-gray font-semibold">
            {"Other Files Uploaded (by you)"}
          </h3>
          <p className="text-[#6A6A6A] text-base font-normal">
            Total Files -{" "}
            {selectedProjectDetails?.projectDetails?.additionalFiles?.length}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-full flex flex-row items-center justify-end">
            <SquareButton
              role={role}
              className="!text-red-600"
              disabled={selectedFilesCount === 0}
              title={
                selectedFilesCount === 0
                  ? "No selected to delete"
                  : `Delete ${selectedFilesCount} file(s)`
              }
              onClick={handleDeleteFiles}
            >
              Delete {selectedFilesCount}
            </SquareButton>
          </div>
          <div className="w-full flex flex-row items-center justify-end">
            <SquareButton
              role={role}
              className="!text-[#6A6A6A]"
              disabled={selectedFilesCount === 0}
              title={
                selectedFilesCount === 0
                  ? "No selected to download"
                  : `Download ${selectedFilesCount} file(s)`
              }
              onClick={handleDownloadFiles}
            >
              Download {selectedFilesCount}
            </SquareButton>
          </div>
          <div className="w-full flex flex-row items-center justify-end">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <SquareButton role={role} onClick={() => setIsModalOpen(true)}>
                  <Upload
                    color={
                      role === VENDOR
                        ? "var(--vendor-dark)"
                        : "var(--primary-blue)"
                    }
                  />
                  Upload
                </SquareButton>
              </DialogTrigger>
              <DialogContent>
                <UploadFiles
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  projectId={selectedProjectDetails?._id ?? ""}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      {selectedProjectDetails?.projectDetails?.additionalFiles && (
        <DataTableFile
          additionalFiles={
            selectedProjectDetails?.projectDetails?.additionalFiles
          }
          selectedRows={selectedRows}
          handleSelectAll={handleSelectAll}
          handleSelectRow={handleSelectRow}
          isRowSelected={isRowSelected}
          isAllSelected={isAllSelected}
        />
      )}
    </Container>
  );
}

const DataTableFile = ({
  additionalFiles,
  handleSelectAll,
  handleSelectRow,
  isRowSelected,
  isAllSelected,
}: {
  additionalFiles: {
    _id: string;
    url: string;
    title: string;
    description: string;
    date: Date;
    size: number;
  }[];
  selectedRows: string[];
  handleSelectAll: (checked: boolean) => void;
  handleSelectRow: (id: string, checked: boolean) => void;
  isRowSelected: (id: string) => boolean;
  isAllSelected: boolean;
}) => {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader className="text-gray-600 border-0">
          <TableRow className="border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
            <TableHead className="w-[53px]">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={handleSelectAll}
                aria-label="Select all rows"
                className="border-[#3A3A3A] data-[state=checked]:bg-[#141263]"
              />
            </TableHead>
            <TableHead>File Name</TableHead>
            <TableHead>File size</TableHead>
            <TableHead>Date uploaded</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#3A3A3A] text-base border-0 overflow-auto">
          {additionalFiles?.length
            ? additionalFiles.map((file) => (
                <TableRow
                  key={file._id}
                  className="h-[60px] text-[#1E1B39] hover:bg-transparent hover:shadow-[3px_3px_10px_0px_#789BD399,-5px_-5px_10px_0px_#FFFFFF] rounded-lg border-l-[20px] border-transparent border-b-0"
                >
                  <TableCell>
                    <Checkbox
                      checked={isRowSelected(file._id)}
                      onCheckedChange={(checked) =>
                        handleSelectRow(file._id, checked as boolean)
                      }
                      aria-label={`Select row ${file._id}`}
                      className="border-[#3A3A3A] data-[state=checked]:bg-[#141263]"
                    />
                  </TableCell>
                  <TableCell>{file.title}</TableCell>
                  <TableCell>{file.size.toLocaleString()}KB</TableCell>
                  <TableCell>
                    {formatDateString(file.date.toString())}
                  </TableCell>
                </TableRow>
              ))
            : "none"}
        </TableBody>
      </Table>
    </div>
  );
};

// const dataFiles = [
//   {
//     id: 1,
//     fileName: "Tech requirements.pdf",
//     fileSize: "200 KB",
//     uploadedAt: "Jan 4, 2022",
//     updatedAt: "Jan 4, 2022",
//   },
//   {
//     id: 2,
//     fileName: "Tech requirements.pdf",
//     fileSize: "200 KB",
//     uploadedAt: "Jan 4, 2022",
//     updatedAt: "Jan 4, 2022",
//   },
//   {
//     id: 3,
//     fileName: "Tech requirements.pdf",
//     fileSize: "200 KB",
//     uploadedAt: "Jan 4, 2022",
//     updatedAt: "Jan 4, 2022",
//   },
// ];
