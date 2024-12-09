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
export default function Projects() {
  return (
    <Container className="p-4 flex flex-col gap-4">
      <h1 className="text-base font-semibold">Total Projects - 03</h1>
      <DataTableTasks />
    </Container>
  );
}

const data = [
  {
    id: 1,
    projectName: "Ecowell",
    projectId: "#01234567891",
    projectStatus: "100",
    status: "Completed",
    category: "Ecommerce",
  },
  {
    id: 2,
    projectName: "Ecowell",
    projectId: "#01234567891",
    projectStatus: "100",
    status: "Pending",
    category: "Ecommerce",
  },
  {
    id: 3,
    projectName: "Ecowell",
    projectId: "#01234567891",
    projectStatus: "100",
    status: "Maintenance",
    category: "Ecommerce",
  },
];

function DataTableTasks() {
  return (
    <div className="w-full">
      <Table>
        <TableHeader className=" text-gray-600 border-0">
          <TableRow className=" border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
            <TableHead className=""></TableHead>
            <TableHead className="">Project Name</TableHead>
            <TableHead className="">Project ID</TableHead>
            <TableHead className="">Project Status</TableHead>
            <TableHead className="">Category</TableHead>
            <TableHead className="">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#3A3A3A] max-h-[400px] text-base border-0 mb-5 px-10 overflow-hidden  ">
          {data.map((row, index) => (
            <TableRow
              key={row.id}
              className={`h-[60px]  text-[#1E1B39] hover:bg-transparent rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
            >
              <TableCell className=" ">{`${index + 1}.`}</TableCell>
              <TableCell>{row.projectName}</TableCell>
              <TableCell>{row.projectId}</TableCell>
              <TableCell>{row.projectStatus}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>
                {row.status === "Completed" && (
                  <span className="text-green-400">{row.status}</span>
                )}
                {row.status === "Pending" && (
                  <span className="text-red-400">{row.status}</span>
                )}
                {row.status === "Maintenance" && (
                  <span className="text-orange-400">{row.status}</span>
                )}
              </TableCell>
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
