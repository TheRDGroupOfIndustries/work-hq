"use client";

export default function Headline({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className=" w-full my-3  flex flex-row items-center justify-between">
      <div className="flex flex-col gap-1">
        {/* headline */}
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-[#6A6A6A] text-base font-normal">
          Project / Overview{" "}
        </p>
      </div>
      {children}
    </div>
  );
}

