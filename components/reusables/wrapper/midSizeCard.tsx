export default function MidSizeCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`xl:w-[50%]   rounded-xl shadow-neuro-1 flex flex-row items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}
