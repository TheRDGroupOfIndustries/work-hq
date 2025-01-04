import Container from "@/components/reusables/wrapper/Container";
import { CustomUser } from "@/lib/types";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";



export default function EmployeesAndClientList({
  title,
  list,
  redirect,
}: {
  title: string;
  list: CustomUser[];
  redirect: string;
}) {
  const router = useRouter();
  return (
    <Container>
      <div className="flex flex-col w-full h-[500px] gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="uppercase  text-lg font-semibold">{title}</h2>
          <MoveRight
            onClick={() => {
              router.push(redirect);
            }}
            color="var(--light-gray)"
            className="cursor-pointer"
          />
        </div>
        <div className="w-full flex flex-col gap-4 px-2">
          {list.map((item, index) => (
            <Card key={index} index={index} list={item} />
          ))}
        </div>
      </div>
    </Container>
  );
}

function Card({ index, list }: { index: number; list: CustomUser }) {
  console.log("list", list);
  return (
    <div key={index} className="w-full flex flex-row items-center gap-2">
      <span className="text-light-gray text-lg">{index + 1}.</span>
      <Image
        src={list.profileImage || "/assets/user.png"}
        alt="Profile Image"
        width="20"
        height="20"
        className="w-10 h-10 rounded-full object-cover overflow-hidden"
      />
      <div className="flex flex-col">
        <span className="text-dark-gray leading-5 light-graytext-base">
          {list.firstName}
        </span>
        <span className="line-clamp-1 text-sm text-light-gray">
          {list.role}
        </span>
      </div>
    </div>
  );
}
