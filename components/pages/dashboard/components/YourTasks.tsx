import Container from "@/components/reusables/wrapper/Container";
import { useProjectContext } from "@/context/ProjectProvider";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface List {
  task: string;
}

export default function YourTasks({
  title,
  list,
}: {
  title: string;
  list: List[];
}) {
  const router = useRouter();
  const { selectedProjectDetails } = useProjectContext();
  return (
    <Container>
      <div className="flex flex-col w-full h-fit max-h-[500px] gap-4">
        <div className="w-full flex-between flex-row">
          <div className="flex flex-col">
            <h2 className="uppercase text-lg font-semibold">{title}</h2>

            <p className="text-base font-normal text-[#6A6A6A] Total current - 24">
              Total current - {list?.length || 0}
            </p>
          </div>
          <MoveRight
            onClick={() => {
              router.push(`/dev/project/${selectedProjectDetails?._id}/kanban`);
            }}
            className="cursor-pointer"
            color="var(--light-gray)"
          />
        </div>
        <div className="w-full flex flex-col gap-1 px-2">
          {list?.map((item, index) => (
            <Line key={index} index={index} list={item} />
          ))}
        </div>
      </div>
    </Container>
  );
}

// export function YourCompletedTasks() {
//   const navigate = useRouter();
//   const params = useParams();
//   return (
//     <MidSizeCard className="h-[550px] ">
//       <div className="h-full w-full flex flex-col gap-2 p-5">
//         <div className="flex flex-row items-center justify-between">
//           <div className="flex flex-col">
//             <h1 className="text-lg font-medium text-dark-gray ">
//               Your Completed Tasks
//             </h1>
//             <p className="text-base font-normal text-[#6A6A6A] Total current - 24">
//               Total current - 24
//             </p>
//           </div>
//           <ArrowRight
//             className=" cursor-pointer"
//             onClick={() => {
//               navigate.push(`/dev/project/${params.name}/kanban`);
//             }}
//             size={30}
//           />
//         </div>
//         <div className="flex flex-col gap-2 px-2">
//           <Line />
//           <Line />
//           <Line />
//         </div>
//       </div>
//     </MidSizeCard>
//   );
// }

function Line({ index, list }: { key: number; index: number; list: List }) {
  return (
    <div
      key={index}
      className="grid text-base text-dark-gray  grid-cols-[20px_1fr] p-2 rounded-lg hover:shadow-neuro-3 items-center"
    >
      <span>{index + 1}.</span>
      <span className="text-dark-gray leading-5 text-base">{list.task}</span>
    </div>
  );
}
