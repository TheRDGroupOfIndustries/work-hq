import React from 'react'

export default function Container({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
  return (
    <div className={` mt-5 w-full  rounded-xl shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] p-3 sm:p-4 md:p-5 lg:p-6  flex flex-col gap-4  ${className} `}>{children}</div>
  )
}
