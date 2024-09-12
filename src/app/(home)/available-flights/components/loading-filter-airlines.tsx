import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingFilterAirline() {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Airlines</p>
      {[0, 1].map((value) => (
        <label
          key={value}
          className="font-semibold flex items-center gap-[10px] text-white"
        >
          <Skeleton className="w-[25px] bg-indigo-400 h-[25px] rounded" />
          <Skeleton className="w-[150px] bg-indigo-400 h-5 rounded" />
        </label>
      ))}
    </div>
  );
}
