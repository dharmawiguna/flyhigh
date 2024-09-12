import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingSeatList() {
  return (
    <form className="flex flex-row justify-between gap-5">
      <div className="flex gap-5">
        <div className="flex flex-col gap-[19px]">
          {[0, 1, 2, 3, 4].map((val, i) => (
            <Skeleton
              key={i}
              className="bg-indigo-400 w-[60px] h-[60px] rounded-xl"
            />
          ))}
        </div>
        <div className="flex flex-col gap-[19px]">
          {[0, 1, 2, 3, 4].map((val, i) => (
            <Skeleton
              key={i}
              className="bg-indigo-400 w-[60px] h-[60px] rounded-xl"
            />
          ))}
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-[19px]">
          {[0, 1, 2, 3, 4].map((val, i) => (
            <Skeleton
              key={i}
              className="bg-indigo-400 w-[60px] h-[60px] rounded-xl"
            />
          ))}
        </div>
        <div className="flex flex-col gap-[19px]">
          {[0, 1, 2, 3, 4].map((val, i) => (
            <Skeleton
              key={i}
              className="bg-indigo-400 w-[60px] h-[60px] rounded-xl"
            />
          ))}
        </div>
      </div>
    </form>
  );
}
