import React from "react";

export default function MainContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full  flex-1 p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col gap-4 overflow-auto ${className} `}
    >
      {children}
    </div>
  );
}
