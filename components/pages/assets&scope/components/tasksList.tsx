"use client";

import { Role } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import Container from "@/components/reusables/wrapper/Container";
import Filter from "@/components/icons/Filter";
import SortBy from "@/components/icons/SortBy";
import { EllipsisVertical } from "lucide-react";
import { TaskValues } from "@/lib/types";
import { formatDateString } from "@/lib/utils";

export default function TasksList({
  role,
  tasks,
}: {
  role: Role;
  tasks: TaskValues[];
}) {
  return (
    <Container>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="uppercase text-lg text-dark-gray font-semibold">
            {"Tasks Lists"}
          </h3>
          <p className="text-[#6A6A6A] text-base font-normal">
            Total Tasks - {tasks?.length || 0}
          </p>
        </div>
        {tasks?.length && (
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-full flex flex-row items-center justify-end">
              <SquareButton
                role={role}
                className="!text-[#6A6A6A] "
                onClick={() => {
                  console.log("Download");
                }}
              >
                <SortBy />
                Sort By
              </SquareButton>
            </div>
            <div className="w-full flex flex-row items-center justify-end">
              <SquareButton
                role={role}
                className="!text-[#6A6A6A]  "
                onClick={() => {
                  console.log("Download");
                }}
              >
                <Filter />
                Filter
              </SquareButton>
            </div>
          </div>
        )}
      </div>
      {tasks?.length && <DataTableTasks tasks={tasks} />}
    </Container>
  );
}

const DataTableTasks = ({ tasks }: { tasks: TaskValues[] }) => {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader className=" text-gray-600 border-0">
          <TableRow className=" border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
            <TableHead className=""></TableHead>
            <TableHead className="">Task Name</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Created On</TableHead>
            <TableHead className="">Assigned to</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#3A3A3A] text-base border-0 mb-5 px-10 overflow-auto ">
          {tasks?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                No tasks available.
              </TableCell>
            </TableRow>
          ) : (
            tasks?.map((row, index) => (
              <TableRow
                key={index}
                className={`h-[60px]  text-[#1E1B39] hover:bg-transparent hover:shadow-[3px_3px_10px_0px_#789BD399,-5px_-5px_10px_0px_#FFFFFF] rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
              >
                <TableCell className=" ">{`${index + 1}.`}</TableCell>
                <TableCell>
                  <div className="flex flex-col min-w-[200px]">
                    <p className="font-semibold">{row.issueSubject}</p>
                    {/* <p className="text-[#6A6A6A]">{row.description}</p> */}
                  </div>
                </TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{formatDateString(row.createdAt)}</TableCell>
                <TableCell>{row.assignedTo.name}</TableCell>
                {/* <TableCell>
                  <EllipsisVertical
                    size={16}
                    color="#1E1B39"
                    className="cursor-pointer"
                  />
                </TableCell> */}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

// const dataFilesTasks = [
//   {
//     id: 1,
//     task: "Navbar with Extensive categories",
//     description: "This is the description here about the task...",
//     status: "In Progress",
//     createdOn: "Jan 4, 2022",
//     assignedTo: "Gojo Satoru",
//   },
//   {
//     id: 2,
//     task: "Hero section with three animation sections",
//     description: "This is the description here about the task...",
//     status: "Completed",
//     createdOn: "Jan 4, 2022",
//     assignedTo: "Dazai Osamu",
//   },
//   {
//     id: 3,
//     task: "Add to cart with similar products section",
//     description: "This is the description here about the task...",
//     status: "Pending   ",
//     createdOn: "Jan 4, 2022",
//     assignedTo: "Sukuna Sama",
//   },
// ];
