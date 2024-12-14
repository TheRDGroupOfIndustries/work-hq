"use client";

import { Role, VENDOR } from "@/types";

export default function SquareButton({
  children,
  className,
  onClick,
  role,
  disabled = false,
  title,
  id
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: (value?: unknown) => void;
  role?: Role;
  disabled?: boolean;
  id?: string;
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${
        disabled && "opacity-60"
      } flex text-desktop flex-row items-center font-medium gap-2 shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] rounded-xl ${
        role === VENDOR ? "text-vendor-dark" : "text-primary-blue"
      } text-nowrap  py-3 px-3 ${className}`}
    >
      {children}
    </button>
  );
}
