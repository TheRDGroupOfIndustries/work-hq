"use client";

import { Role, VENDOR } from "@/types";

export default function SquareButton({
  children,
  className,
  onClick,
  role,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (value?: unknown) => void;
  role?: Role;
}) {
  return (
    <button
      onClick={onClick}
      className={` flex text-desktop flex-row items-center  gap-2 shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] rounded-xl  ${
        role === VENDOR ? "text-vendor-dark" : "text-primary-blue"
      } text-nowrap  py-3 px-3 ${className}`}
    >
      {children}

    </button>
  );
}
