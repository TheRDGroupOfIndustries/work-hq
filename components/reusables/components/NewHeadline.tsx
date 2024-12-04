"use client";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Plus } from "lucide-react";

interface ButtonObjectType {
  buttonText:string;
  icon?:React.ReactNode;
  onClick:()=>void;
  noIcon?:boolean;
}

export default function NewHeadline({title="Default Heading",subTitle = "default subtitle here",buttonObjects}:{title?:string,subTitle?:string,buttonObjects:ButtonObjectType[]}) {
  return (
    <div className=" w-full my-4  flex flex-row items-center justify-between">
      <div className="flex flex-col gap-1">
        {/* headline */}
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-[#6A6A6A] text-xs font-normal">
          {subTitle}
        </p>
      </div>

<div className="flex flex-row gap-2">
      {buttonObjects.map((buttonObject:ButtonObjectType, index:number) => (
        <SquareButton
          key={index}
          onClick={buttonObject.onClick}
        >
          {/* <Plus color="#155EEF" /> */}
          {!buttonObject.noIcon && (buttonObject.icon?buttonObject.icon:<Plus color="#155EEF" />)}
          {buttonObject.buttonText}

        </SquareButton>
      ))}
      </div>
    </div>
  );
}
