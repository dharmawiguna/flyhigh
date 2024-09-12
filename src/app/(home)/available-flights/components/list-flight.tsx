"use client";
import { useContext } from "react";
import { FContext, FlightContext } from "../providers/flight-providers";
import FlightItem from "./flight-item";
import LoadingListFlight from "./loading-list-flight";

export default function ListFlight() {
  const { flights, isLoading } = useContext(FlightContext) as FContext;

  if (isLoading) {
    return <LoadingListFlight />;
  }
  return (
    <div className="ticket-container flex flex-col w-full gap-6">
      {flights?.map((val) => (
        <FlightItem key={val.id} data={val} />
      ))}

      <p className="text-center text-sm text-[#A0A0AC] h-fit">
        You’ve reached the end of results.
      </p>
    </div>
  );
}
