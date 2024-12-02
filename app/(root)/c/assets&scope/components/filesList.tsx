"use client";
import Container from "@/components/reusables/wrapper/Container";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Role, VENDOR } from "@/types";
import { EllipsisVertical, Upload } from "lucide-react";
import { useState } from "react";

const dataFiles = [
  {
    id: 1,
    fileName: "Tech requirements.pdf",
    fileSize: "200 KB",
    uploadedAt: "Jan 4, 2022",
    updatedAt: "Jan 4, 2022",
  },
  {
    id: 2,
    fileName: "Tech requirements.pdf",
    fileSize: "200 KB",
    uploadedAt: "Jan 4, 2022",
    updatedAt: "Jan 4, 2022",
  },
  {
    id: 3,
    fileName: "Tech requirements.pdf",
    fileSize: "200 KB",
    uploadedAt: "Jan 4, 2022",
    updatedAt: "Jan 4, 2022",
  },
];

export default function FilesList({ role }: { role: Role }) {
  return (
    <Container>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="uppercase text-lg text-dark-gray font-semibold">
            {"Other Files Uploaded (by you)"}
          </h3>
          <p className="text-[#6A6A6A] text-base font-normal">
            Total Files - 07
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center  gap-5">
          <div className="w-full flex flex-row items-center justify-end">
            <SquareButton
              role={role}
              className="!text-[#6A6A6A]"
              onClick={() => {
                console.log("Download");
              }}
            >
              Download All
            </SquareButton>
          </div>
          <div className="w-full flex flex-row items-center justify-end">
            <SquareButton
              role={role}
              className=" "
              onClick={() => {
                console.log("Download");
              }}
            >
              <Upload
                color={
                  role === VENDOR ? "var(--vendor-dark)" : "var(--primary-blue)"
                }
              />
              Upload
            </SquareButton>
          </div>
        </div>
      </div>
      <DataTableFile />
    </Container>
  );
}

function DataTableFile() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(dataFiles.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const isRowSelected = (id: number) => selectedRows.includes(id);
  const isAllSelected =
    dataFiles.length > 0 && selectedRows.length === dataFiles.length;

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader className=" text-gray-600 border-0">
          <TableRow className="  border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
            <TableHead className="w-[53px]  ">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={handleSelectAll}
                aria-label="Select all rows"
                className="border-[#3A3A3A] data-[state=checked]:bg-[#141263] "
              />
            </TableHead>
            <TableHead className="">File Name</TableHead>
            <TableHead className="">File size</TableHead>
            <TableHead className="">Date uploaded</TableHead>
            <TableHead className="">Last updated</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#3A3A3A] text-base border-0   overflow-auto ">
          {dataFiles.map((row) => (
            <TableRow
              key={row.id}
              className={`h-[60px]  text-[#1E1B39] hover:bg-transparent hover:shadow-[3px_3px_10px_0px_#789BD399,-5px_-5px_10px_0px_#FFFFFF] rounded-lg border-l-[20px] border-transparent border-b-0 `}
            >
              <TableCell className=" ">
                <Checkbox
                  checked={isRowSelected(row.id)}
                  onCheckedChange={(checked) =>
                    handleSelectRow(row.id, checked as boolean)
                  }
                  aria-label={`Select row ${row.id}`}
                  className="border-[#3A3A3A] data-[state=checked]:bg-[#141263] "
                />
              </TableCell>
              <TableCell>{row.fileName}</TableCell>
              <TableCell>{row.fileSize}</TableCell>
              <TableCell>{row.uploadedAt}</TableCell>
              <TableCell>{row.updatedAt}</TableCell>
              <TableCell>
                <EllipsisVertical
                  size={16}
                  color="#1E1B39"
                  className="cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
