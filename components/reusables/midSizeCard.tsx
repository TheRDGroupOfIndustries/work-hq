export default function MidSizeCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`xl:w-[50%] h-[400px]  rounded-xl shadow-[5px_5px_15px_0px_#789BD399,-5px_-5px_20px_0px_#FFFFFFCC] flex flex-row items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}
