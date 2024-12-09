"use client";
import Filter from "@/components/icons/Filter";
import Headline, {
  ButtonObjectType,
} from "@/components/reusables/components/headline";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  // SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROLE } from "@/tempData";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import EmployeesSummary from "../components/EmployeesSummary";
import TodayEmployeesProgress from "../components/TodayEmployeesProgress";

const data = [
  {
    id: 1,
    name: "John Doe",
    stacks: "Full Stack, UI UX",
    workingOn: "CSK, Ecowell",
    tasksCompleted: "54",
    tasksPending: "10",
    status: "Logged In",
    todayWorkHours: "8",
    totalWorkHours: "102",
    email: "john@gmail.com",
  },
  {
    id: 2,
    name: "John Doe",
    stacks: "Full Stack, UI UX",
    workingOn: "CSK, Ecowell",
    tasksCompleted: "54",
    tasksPending: "10",
    status: "Logged Out",
    todayWorkHours: "8",
    totalWorkHours: "102",
    email: "john@gmail.com",
  },
];

export default function AllEmployees() {
  const [search, setSearch] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const headLineButtons = [
    {
      buttonText: "Export Report",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
  ] as ButtonObjectType[];
  return (
    <MainContainer role={ROLE}>
      <Headline
        role={ROLE}
        title="Project Overview"
        subTitle="Project"
        buttonObjects={headLineButtons}
      />

      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-[200px] text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-fit te outline-none gap-1 bg-transparent">
            <div className="w-full text-[#697077] flex flex-row gap-1 items-center justify-end">
              <Filter />
              Filter
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"category"}>{"category"}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full flex flex-col xl:flex-row gap-4 ">
        <EmployeesSummary/>
        <TodayEmployeesProgress/>
      </div>

      <Container className="p-4 flex flex-col gap-4">
        <div>
          <h1 className="text-base text-dark-gray font-semibold uppercase">
            All Employees List
          </h1>
          <p className="text-sm text-[#6A6A6A]">Total Employees - 05</p>
        </div>
        <DataTableTasks />
      </Container>
    </MainContainer>
  );
}

function DataTableTasks() {
  return (
    <div className=" w-full ">
      <Table>
        <TableHeader className=" text-nowrap text-gray-600 border-0">
          <TableRow className=" border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
            <TableHead className="w-[40px]"></TableHead>
            <TableHead className="min-w-[200px]">Employees Name</TableHead>
            <TableHead className="min-w-[150px]">Working On</TableHead>
            <TableHead className="min-w-[150px]">Tasks Completed</TableHead>
            <TableHead className="min-w-[150px]">Tasks Pending</TableHead>
            <TableHead className="min-w-[150px]">Status</TableHead>
            <TableHead className="min-w-[150px]">Today Work Hour</TableHead>
            <TableHead className="min-w-[150px]">Total Work Hour</TableHead>
            <TableHead className="min-w-[150px]">Email</TableHead>
            <TableHead className="w-[40px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#3A3A3A] max-h-[400px] text-base border-0 mb-5 px-10 overflow-hidden  ">
          {data.map((row, index) => (
            <TableRow
              key={row.id}
              className={`h-[60px] text-nowrap  text-[#344054] hover:bg-transparent rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
            >
              <TableCell className=" ">{`${index + 1}.`}</TableCell>
              <TableCell>
                <div className="flex flex-row items-center gap-2">
                  <div className="w-[40px] h-[40px] bg-[#D9D9D9] rounded-full">
                    <Image
                      src="/assets/user.png"
                      width={40}
                      height={40}
                      alt="avatar"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="text-base font-medium ">{row.name}</h6>
                    <p className="text-sm font-normal ">{row.stacks}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{row.workingOn}</TableCell>
              <TableCell>{row.tasksCompleted}</TableCell>
              <TableCell>{row.tasksPending}</TableCell>
              <TableCell
                className={`${
                  row.status === "Logged In"
                    ? "!text-green-400"
                    : "!text-primary-blue"
                }`}
              >
                {row.status}
              </TableCell>
              <TableCell>{row.todayWorkHours}</TableCell>
              <TableCell>{row.totalWorkHours}</TableCell>
              <TableCell className="text-primary-blue">{row.email}</TableCell>
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
