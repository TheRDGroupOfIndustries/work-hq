import Container from "@/components/reusables/wrapper/Container";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface List {
  name: string;
  info: string;
}

export default function EmployeesAndClientList({
  title,
  list,
  redirect,
}: {
  title: string;
  list: List[];
  redirect: string;
}) {
  const router = useRouter();
  return (
    <Container>
      <div className="flex flex-col w-full h-[500px] gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="uppercase text-lg font-medium">{title}</h2>
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

function Card({ index, list }: { index: number; list: List }) {
  return (
    <div key={index} className="w-full flex flex-row items-center gap-2">
      <span className="text-light-gray text-lg">{index + 1}.</span>
      <Image
        src={"/assets/user.png"}
        alt="Profile Image"
        width="20"
        height="20"
        className="w-10 h-10 rounded-full object-cover overflow-hidden"
      />
      <div className="flex flex-col">
        <span className="text-dark-gray leading-5 light-graytext-base">
          {list.name}
        </span>
        <span className="line-clamp-1 text-sm text-light-gray">
          {list.info}
        </span>
      </div>
    </div>
  );
}
