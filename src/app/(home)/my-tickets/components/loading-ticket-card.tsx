/* eslint-disable @next/next/no-img-element */
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingTicketCard() {
  return (
    <div className="ticket-card flex justify-between items-center rounded-[20px] p-5 bg-flysha-bg-purple">
      <div className="flex gap-[16px] items-center">
        <div className="flex shrink-0 w-[90px] h-[70px] rounded-[14px] overflow-hidden">
          <Skeleton className="bg-indigo-300 w-[90px] h-[70px] rounded-md" />
        </div>
        <div className="flex flex-col justify-center-center gap-[2px]">
          <Skeleton className="bg-indigo-300 w-[60px] h-5" />
          <Skeleton className="bg-indigo-300 w-[90px] h-5" />
        </div>
      </div>
      <p className="w-fit h-fit font-bold text-lg">
        <Skeleton className="bg-indigo-300 w-[120px] h-5" />
      </p>
      <div className="flex items-center gap-[30px]">
        <div className="flex flex-col gap-[2px] text-center">
          <Skeleton className="bg-indigo-300 w-[60px] h-5" />
          <Skeleton className="bg-indigo-300 w-[90px] h-5" />
        </div>
        <img src="../assets/images/icons/plane-dotted.svg" alt="icon" />
        <div className="flex flex-col gap-[2px] text-center">
          <Skeleton className="bg-indigo-300 w-[60px] h-5" />
          <Skeleton className="bg-indigo-300 w-[90px] h-5" />
        </div>
      </div>
      <Skeleton className="bg-indigo-300 w-[100px] h-[48px] rounded-full" />
    </div>
  );
}
