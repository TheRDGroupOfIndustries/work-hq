"use client";
import Filter from "@/components/icons/Filter";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { CustomUser } from "@/lib/types";
import { RootState } from "@/redux/rootReducer";
import { setEmployeesList } from "@/redux/slices/ceo";
import { ROLE } from "@/tempData";
import { VENDOR } from "@/types";
import { MoreVertical, Plus } from "lucide-react";
import Image from "next/image";
import {  useRouter } from "next/navigation";
import { default as React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeesSummary from "../components/EmployeesSummary";
import TodayEmployeesProgress from "../components/TodayEmployeesProgress";
export default function AllEmployees() {
  const [search, setSearch] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const dispatch = useDispatch();
  const reduxEmployeesList = useSelector(
    (state: RootState) => state.ceo.employeesList
  );

  const [employees, setEmployees] = useState<CustomUser[] | []>([]);

  const filterEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      employee?.lastName?.toLowerCase().includes(search.toLowerCase());

    // const matchesCategory

    return matchesSearch;
  });

  useEffect(() => {
    const fetchPayrollHistory = async () => {
      try {
        const response = await fetch("/api/user/get", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const userData = await response.json();

        setEmployees(
          userData.users.filter(
            (user: CustomUser) =>
              user.role === "developer" || user.role === "manager"
          ) || []
        );

        dispatch(
          setEmployeesList(
            // Filter users with role "developer"
            userData.users.filter(
              (user: CustomUser) =>
                user.role === "developer" || user.role === "manager"
            )
          )
        );
      } catch (error) {
        console.error("Error fetching payroll history:", error);
      }
    };

    if (reduxEmployeesList && reduxEmployeesList.length > 0) {
      setEmployees(reduxEmployeesList);
    } else fetchPayrollHistory();
  }, [dispatch, reduxEmployeesList]);

  return (
    <MainContainer role={ROLE}>
      <div className="w-full my-4 flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          {/* headline */}
          <h1 className="text-2xl font-semibold">Payments Management</h1>
          <p className="text-[#6A6A6A] text-base font-normal">
            All Projects/ payments
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <SquareButton role={ROLE}>
            <Plus
              color={
                ROLE === VENDOR ? "var(--vendor-dark)" : "var(--primary-blue)"
              }
            />
            Export Report
          </SquareButton>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex text-desktop flex-row items-center font-medium gap-2 shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] rounded-xl text-nowrap  py-3 px-3">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-red-600">
                <Dialog>
                  {/* Prevent DropdownMenu from closing */}
                  <DialogTrigger asChild>
                    <button
                      className="w-full text-left"
                      onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                    >
                      Ban Employee
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <h2 className="text-lg font-semibold">Ban Employee</h2>
                    <p>Are you sure you want to ban this employee?</p>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button className="btn-cancel">Cancel</button>
                      <button className="btn-confirm">Confirm</button>
                    </div>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

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
        <EmployeesSummary />
        <TodayEmployeesProgress />
      </div>

      <Container className="p-4 flex flex-col gap-4">
        <div>
          <h1 className="text-base text-dark-gray font-semibold uppercase">
            All Employees List
          </h1>
          <p className="text-sm text-[#6A6A6A]">Total Employees - 05</p>
        </div>
        <DataTableTasks employees={filterEmployees} />
      </Container>
    </MainContainer>
  );
}

function DataTableTasks({ employees }: { employees: CustomUser[] }) {
  const navigate = useRouter();
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
          {employees.map((row, index) => (
            <TableRow
              onClick={() => {
                navigate.push(
                  `/ceo/employees/${row.firstName + row.lastName}?id=${row._id}`
                );
              }}
              key={row.id}
              className={`h-[60px] text-nowrap  text-[#344054] hover:bg-transparent rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 cursor-pointer `}
            >
              <TableCell className=" ">{`${index + 1}.`}</TableCell>
              <TableCell>
                <div className="flex flex-row items-center gap-2">
                  <div className="w-[40px] h-[40px] bg-[#D9D9D9] rounded-full">
                    <Image
                      src={row.profileImage || "/assets/user.png"}
                      width={40}
                      height={40}
                      alt="avatar"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="text-base font-medium ">{row.firstName}</h6>
                    <p className="text-sm font-normal ">{row.role}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {row.myProjects?.map((p, index) => (
                  <span key={index}>
                    {typeof p === "object" &&
                      (p.projectDetails?.projectName as string)}
                    {index < (row.myProjects?.length ?? 0) - 1 && ", "}
                  </span>
                ))}
              </TableCell>
              <TableCell>{"idk"}</TableCell>
              <TableCell>{"idk"}</TableCell>
              <TableCell
                className={`${
                  row.workStatus === "loggedIn"
                    ? "!text-green-400"
                    : "!text-primary-blue"
                }`}
              >
                {row.workStatus}
              </TableCell>
              <TableCell>{"isk"}</TableCell>
              <TableCell>{"isk"}</TableCell>
              <TableCell className="text-primary-blue">{row.email}</TableCell>
              {/* <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link
                        href={`/ceo/employees/${
                          row.firstName + row.lastName
                        }?id=${row._id}`}
                      >
                        Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            className="w-full text-left"
                            onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                          >
                            Ban Employee
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <h2 className="text-lg font-semibold">
                            Ban Employee
                          </h2>
                          <p>Are you sure you want to ban this employee?</p>
                          <div className="mt-4 flex justify-end space-x-2">
                            <button className="btn-cancel">Cancel</button>
                            <button className="btn-confirm">Confirm</button>
                          </div>
                        </DialogContent>
                      </Dialog>
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
