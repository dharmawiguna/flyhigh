"use client";

import { TypeSeat } from "@prisma/client";
import React, { ChangeEvent, useContext } from "react";
import {
  FContext,
  FilterActionKind,
  FlightContext,
} from "../providers/flight-providers";

const SEAT_OPTIONS: TypeSeat[] = ["ECONOMY", "BUSINESS", "FIRST"];

export default function FilterClass() {
  const { dispatch } = useContext(FlightContext) as FContext;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FilterActionKind.SET_SEAT,
      payload: {
        seat: event.target.value,
        planeId: "",
      },
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Seat Class</p>
      {SEAT_OPTIONS.map((value, index) => (
        <label
          key={index}
          htmlFor={value}
          className="font-semibold flex items-center gap-[10px] has-[:checked]:text-white"
        >
          <input
            type="radio"
            name="flight"
            id={value}
            value={value}
            onChange={handleChange}
            className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-full checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
          />
          {value}
        </label>
      ))}
    </div>
  );
}
