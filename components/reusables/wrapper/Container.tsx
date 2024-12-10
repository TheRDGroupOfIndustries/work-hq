import React from 'react'

export default function Container({
    children,
    className,
    onClick
  }: {
    children: React.ReactNode;
    className?: string;
    onClick?: (value?: unknown) => void;
  }) {
  return (
    <div onClick={onClick} className={` mt-5 w-full  rounded-xl shadow-neuro-3 p-3 sm:p-4 md:p-5   flex flex-col gap-4  ${className} `}>{children}</div>
  )
}
