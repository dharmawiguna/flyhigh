"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitFormButton from "../../components/submit-form-button";
import { Airplane, Flight } from "@prisma/client";
import { ActionResult } from "@/app/dashboard/(auth)/signin/form/action";
import { useFormState } from "react-dom";
import { saveFlight, updateFlight } from "../lib/actions";
import { dateFormat } from "@/lib/utils";
import { unknown } from "zod";

interface FormFlightProps {
  airplane: Airplane[];
  type?: "ADD" | "EDIT";
  defaultValues?: Flight | null;
}

const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};
export default function FormFlight({
  airplane,
  type,
  defaultValues,
}: FormFlightProps) {
  const updateFlightWithId = (_state: ActionResult, formData: FormData) =>
    updateFlight(null, defaultValues?.id!!, formData);
  const [state, formAction] = useFormState(
    type === "ADD" ? saveFlight : updateFlightWithId,
    initialFormState
  );

  return (
    <form action={formAction} className="space-y-6">
      {state?.errorTitle !== null && (
        <div className="mx-auto my-7 bg-red-500 p-4 rounded-lg text-white">
          <div className="font-bold">Error Validation</div>

          <ul className="list-disc list-inside">
            {state?.errorDesc?.map((value, index) => (
              <li key={index + value}>{value}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="planeId">Select Airplane</Label>
          <Select name="planeId" defaultValue={defaultValues?.planeId}>
            <SelectTrigger id="planeId">
              <SelectValue placeholder="Select Airplane" />
            </SelectTrigger>
            <SelectContent>
              {airplane.map((item, index) => (
                <SelectItem value={item.id} key={index}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            placeholder="price ticket..."
            name="price"
            id="price"
            type="number"
            min={0}
            required
            defaultValue={defaultValues?.price}
          />
          <span className="text-xs text-gray-400">
            Business class price increased by IDR 500,000 & First class price
            increased by IDR 750,000
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureCity">Departure City</Label>
          <Input
            placeholder="departure city..."
            name="departureCity"
            id="departureCity"
            required
            defaultValue={defaultValues?.departureCity}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureDate">Departure Date</Label>
          <Input
            placeholder="departure date..."
            name="departureDate"
            id="departureDate"
            type="datetime-local"
            required
            defaultValue={dateFormat(
              defaultValues?.departureDate!!,
              "YYYY-MM-DDTHH:MM"
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureCityCode">City Code</Label>
          <Input
            placeholder="City Code..."
            name="departureCityCode"
            id="departureCityCode"
            required
            defaultValue={defaultValues?.departureCityCode}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="destinationCity">Destination City</Label>
          <Input
            placeholder="destination city..."
            name="destinationCity"
            id="destinationCity"
            required
            defaultValue={defaultValues?.destinationCity}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="arrivalDate">Arrival Date</Label>
          <Input
            placeholder="arrival date..."
            name="arrivalDate"
            id="arrivalDate"
            type="datetime-local"
            required
            defaultValue={dateFormat(
              defaultValues?.arrivalDate!!,
              "YYYY-MM-DDTHH:MM"
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destinationCityCode">Destination City Code</Label>
          <Input
            placeholder="destination city code..."
            name="destinationCityCode"
            id="destinationCityCode"
            required
            defaultValue={defaultValues?.destinationCityCode}
          />
        </div>
      </div>
      <SubmitFormButton />
    </form>
  );
}
