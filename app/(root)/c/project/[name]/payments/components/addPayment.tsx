

export default function AddPayment({
    setAddPaymentOpen,
}: {
    setAddPaymentOpen: (value: boolean) => void;
}) {
  return (
    <div
      onClick={() => setAddPaymentOpen(false)}
      className="z-5 absolute flex items-center justify-center  right-0 bottom-0 left-0 h-[calc(100vh-70px)] w-full bg-black/30"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-10 w-[733px] m-4  bg-background flex flex-col gap-6 rounded-3xl   p-5 lg:p-6 "
      >
        <h1 className="text-2xl font-semibold text-dark-gray">Raise A Ticket</h1>
      </div>
    </div>
  );
}

