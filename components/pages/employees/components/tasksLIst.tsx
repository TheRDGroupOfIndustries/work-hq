import Container from "@/components/reusables/wrapper/Container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import React from "react";

export default function TaskList({ list }: { list: [] }) {
  return (
    <Container className="p-4 flex flex-col gap-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div className="w-full flex flex-col">
          <p className="text-lg uppercase">Tasks Lists</p>
          <p className="text-base ">Total Tasks - 03</p>
        </div>
        <div className="flex flex-row items-center">
            {/* I will add filter btn later */}
        </div>
      </div>

      <DataTable list={list} />
    </Container>
  );
}

function DataTable({ list }: { list: [] }) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader className=" text-gray-600 border-0">
          <TableRow className=" border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
            <TableHead className=""></TableHead>
            <TableHead className="">Project Name</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">CreatedOn</TableHead>
            <TableHead className="">Project</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#3A3A3A] max-h-[400px] text-base border-0 mb-5 px-10 overflow-hidden  ">
          {list.map((row, index) => (
            <TableRow
              key={index || row._id}
              className={`h-[60px]  text-[#1E1B39] hover:bg-transparent rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
            >
              <TableCell className=" ">{`${index + 1}.`}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <h4 className="text-base text-dark-gray">
                    Navbar with Extensive categories
                  </h4>
                  <h5 className="text-base text-light-gray line-clamp-1">
                    This is the description here about the task...
                  </h5>
                </div>
              </TableCell>
              <TableCell>in Progress</TableCell>
              <TableCell>jan 4, 2022</TableCell>
              <TableCell>Ecowell</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Edit ticket</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete ticket
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// const dataFilesTasks = [
//   {
//     id: 1,
//     salaryMonth: "September",
//     transactionId: "#01234567891",
//     amount: "5000",
//     transactionDate: "01 January, 2024",
//   },
//   {
//     id: 2,
//     salaryMonth: "October",
//     transactionId: "#01234567891",
//     amount: "5000",
//     transactionDate: "01 January, 2024",
//   },
//   {
//     id: 3,
//     salaryMonth: "November",
//     transactionId: "#01234567891",
//     amount: "5000",
//     transactionDate: "01 January, 2024",
//   },
// ];
