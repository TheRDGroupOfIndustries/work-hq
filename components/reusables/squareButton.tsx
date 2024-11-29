"use client";
export default function SquareButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (value?: any) => void; 
}) {
  return (
    <button
      onClick={onClick} 
      className={`flex flex-row items-center  gap-2 shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] rounded-xl text-[#155EEF] text-nowrap ${className} py-3 px-4`}
    >
      {children}
    </button>
  );
}