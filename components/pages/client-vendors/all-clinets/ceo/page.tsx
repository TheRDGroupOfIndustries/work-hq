"use client";
import Filter from "@/components/icons/Filter";
import Headline, {
  ButtonObjectType,
} from "@/components/reusables/components/headline";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
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
import { CustomUser } from "@/lib/types";
import { RootState } from "@/redux/rootReducer";
import { ROLE } from "@/tempData";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function AllClinets() {
  const [clientAndVendors, setClientAndVendor] = useState<CustomUser[] | []>([]);
  const [search, setSearch] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const headLineButtons = [
    {
      buttonText: "Export Report",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
  ] as ButtonObjectType[];

  const clientAndVendorList = useSelector(
    (state: RootState) => state.ceo.clientAndVendorList
  );

  useEffect(() => {
    const fetchVendorsAndClients = async () => {
      const clientAndVendorRes = await fetch(
        "/api/user/get/getAllVendorsAndClients",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const vendorsAndClientstData = await clientAndVendorRes.json();
      setClientAndVendor(vendorsAndClientstData.vendorsAndClients);
    };

    if (clientAndVendorList.length > 0) {
      setClientAndVendor(clientAndVendorList);
    } else {
      fetchVendorsAndClients();
    }
  }, [clientAndVendorList]);

  
  const filteredClientAndVendors = (clientAndVendors || []).filter((clientAndVendor) => {
    const matchesSearch =
    clientAndVendor?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
    clientAndVendor?.lastName?.toLowerCase().includes(search.toLowerCase());

    
    return matchesSearch
  });
  return (
    <MainContainer role={ROLE}>
      <Headline
        role={ROLE}
        title="Client and Vendors"
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

      <Container className="p-4 flex flex-col gap-4">
        <div>
          <h1 className="text-base text-dark-gray font-semibold uppercase">
            All clients and vendors list
          </h1>
          <p className="text-sm text-[#6A6A6A]">Total number - 05</p>
        </div>
        <DataTableTasks clientAndVendors={filteredClientAndVendors} />
      </Container>
    </MainContainer>
  );
}

function DataTableTasks({ clientAndVendors }: { clientAndVendors: CustomUser[] }) {
  const navigate = useRouter();
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
            {/* <TableHead className="w-[40px]"></TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#3A3A3A] max-h-[400px] text-base border-0 mb-5 px-10 overflow-hidden  ">
          {clientAndVendors.map((row, index) => (
            <TableRow
              key={row._id}
              className={`h-[60px]  text-[#344054] hover:bg-transparent rounded-lg mb-5 border-l-[20px] border-transparent border-b-0  `}
              onClick={() =>{
                navigate.push(`/ceo/client-vendors/${row.firstName}?id=${row._id}`)
              }}
            >
              <TableCell className=" ">{`${index + 1}.`}</TableCell>
              <TableCell className="cursor-pointer" >{row.firstName + " " + row.lastName}</TableCell>
              <TableCell>{row.allProjects?.length}</TableCell>
              <TableCell className="text-primary-blue">{row.email}</TableCell>
              <TableCell>{900}</TableCell>
              {/* <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href={`/ceo/client-vendors/${row.firstName}?id=${row._id}`}>Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit ticket</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete ticket
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
