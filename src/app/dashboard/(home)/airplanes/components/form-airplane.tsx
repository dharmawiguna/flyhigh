"use client";

import { ActionResult } from "@/app/dashboard/(auth)/signin/form/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { type FC } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { saveAirplane, updateAirplane } from "../lib/actions";
import { Airplane } from "@prisma/client";

const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

interface FormAirplaneProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Airplane | null;
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" disabled={pending}>
      Submit
    </Button>
  );
};

const FormAirplane: FC<FormAirplaneProps> = ({ type, defaultValues }) => {
  const updateAirplaneById = (_state: ActionResult, formData: FormData) =>
    updateAirplane(null, defaultValues?.id!!, formData);

  const [state, formAction] = useFormState(
    type === "ADD" ? saveAirplane : updateAirplaneById,
    initialFormState
  );

  return (
    <form action={formAction} className="w-[40%] space-y-4">
      {state.errorTitle !== null && (
        <div className="mx-auto my-7 bg-red-500 p-4 rounded-lg text-white">
          <div className="font-bold">Error Validation</div>

          <ul className="list-disc list-inside">
            {state.errorDesc?.map((value, index) => (
              <li key={index + value}>{value}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="code">Airplane Code</Label>
        <Input
          placeholder="Airplane Code..."
          name="code"
          id="code"
          defaultValue={defaultValues?.code}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Airplane Name</Label>
        <Input
          placeholder="Airplane Name..."
          name="name"
          id="name"
          defaultValue={defaultValues?.name}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Upload Image</Label>
        <Input
          type="file"
          placeholder="Airplane Image..."
          name="image"
          id="image"
          required
        />
      </div>
      <SubmitButton />
    </form>
  );
};

export default FormAirplane;
