import Image from "next/image";

export default function Loader({
  className = "",
  text,
}: {
  className?: string;
  text?: string;
}) {
  return (
    <>
      <div
        className={`mt-[60px] w-full ${className} flex-center flex-col gap-4 animate-pulse w-full   flex-1 p-3 sm:p-4 sm:px-6     overflow-auto bg-transparent undefined `}
      >
        <Image
          src="/logo.png"
          alt="Loading"
          width={600}
          height={600}
          className="w-[25vh] h-[25vh] object-contain animate-pulse"
        />
        Loading{text && " " + text}...
      </div>
    </>
  );
}
