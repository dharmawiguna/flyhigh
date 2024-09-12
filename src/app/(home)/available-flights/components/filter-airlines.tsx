import React from "react";
import { getAirplanes } from "../../lib/data";
import CheckboxAirline from "./checkbox-airline";

export default async function FilterAirlines() {
  const airplane = await getAirplanes();
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Airlines</p>
      {airplane.map((value, i) => (
        <CheckboxAirline key={i} value={value} />
      ))}
    </div>
  );
}
