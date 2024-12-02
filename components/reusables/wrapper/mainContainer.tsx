import { Role, VENDOR } from "@/types";
import React from "react";

export default function MainContainer({
  children,
  className,
  role,
}: {
  children: React.ReactNode;
  className?: string;
  role:Role
}) {
  return (
    <div
      className={`w-full   flex-1 p-3 sm:p-4  flex flex-col gap-1 overflow-auto ${role === VENDOR ? "bg-primary-vendor" : "bg-primary-sky-blue"} ${className} `}
    >
      {children}
    </div>
  );
}
