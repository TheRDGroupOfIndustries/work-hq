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
import React, { useState } from "react";

const data = [
  {
    id: 1,
    client: "John Doe",
    totaRojects: "10",
    email: "john@gmail.com",
    totalPayments: "20",
  },
  {
    id: 2,
    client: "Miles",
    totaRojects: "20",
    email: "miles@gmail.com",
    totalPayments: "50",
  },
];

export default function AllClinets() {
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
            <SelectItem  value={"category"}>
              {"category"}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Container className="p-4 flex flex-col gap-4">
        <div>
          <h1 className="text-base text-dark-gray font-semibold uppercase">
            All clients and vendors list
          </h1>
          <p className="text-sm text-[#6A6A6A]">Total number - 05</p>
        </div>
        <DataTableTasks />
      </Container>
    </MainContainer>
  );
}

function DataTableTasks() {
  return (
    <div className="w-full">
      <Table>
        <TableHeader className=" text-gray-600 border-0">
          <TableRow className=" border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
            <TableHead className="w-[40px]"></TableHead>
            <TableHead className="">Clinet/Vendors</TableHead>
            <TableHead className="">Total Projects</TableHead>
            <TableHead className="">Email</TableHead>
            <TableHead className="">Total Payments</TableHead>
            <TableHead className="w-[40px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#3A3A3A] max-h-[400px] text-base border-0 mb-5 px-10 overflow-hidden  ">
          {data.map((row, index) => (
            <TableRow
              key={row.id}
              className={`h-[60px]  text-[#344054] hover:bg-transparent rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
            >
              <TableCell className=" ">{`${index + 1}.`}</TableCell>
              <TableCell>{row.client}</TableCell>
              <TableCell>{row.totaRojects}</TableCell>
              <TableCell className="text-primary-blue">{row.email}</TableCell>
              <TableCell>{row.totalPayments}</TableCell>
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
