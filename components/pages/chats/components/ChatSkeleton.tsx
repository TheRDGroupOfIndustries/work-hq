export default function ChatSkeleton() {
    return (
      <div className="animate-pulse w-full py-1 pl-4 rounded-xl grid grid-cols-[minmax(60px,_60px)_1fr_minmax(92px,_100px)] mb-4">
        <div className="flex justify-center items-center">
          <div className="w-[60px] h-[60px] bg-slate-200 rounded-full"></div>
        </div>
        <div className="flex flex-col py-3 justify-between">
          <div className="h-4 bg-slate-200 rounded w-3/4 mb-2 mx-5"></div>
          <div className="h-3 bg-slate-200 rounded w-1/2 mx-5"></div>
        </div>
        <div className="flex justify-end items-center mr-5 py-2">
          <div className="h-2 bg-slate-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }  