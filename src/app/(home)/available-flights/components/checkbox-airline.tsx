"use client";
import { Airplane } from "@prisma/client";
import React, { ChangeEvent, FC, useContext } from "react";
import {
  FContext,
  FilterActionKind,
  FlightContext,
} from "../providers/flight-providers";

interface CheckboxAirlineProps {
  value: Airplane;
}

const CheckboxAirline: FC<CheckboxAirlineProps> = ({ value }) => {
  const { dispatch } = useContext(FlightContext) as FContext;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    dispatch({
      type: isChecked
        ? FilterActionKind.ADD_PLANE
        : FilterActionKind.REMOVE_PLANE,
      payload: {
        planeId: value,
      },
    });
  };
  return (
    <div>
      <label
        htmlFor={value.name}
        className="font-semibold flex items-center gap-[10px] text-white"
      >
        <input
          type="checkbox"
          name="airlines"
          id={value.name}
          value={value.id}
          onChange={handleChange}
          className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
        />
        {value.name}
      </label>
    </div>
  );
};

export default CheckboxAirline;
