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
        className={`w-full   flex-1 p-3 sm:p-4 sm:px-6  flex flex-col  overflow-auto bg-primary-sky-blue  ${className} flex-center flex-col gap-4 animate-pulse`}
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
