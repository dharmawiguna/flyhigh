import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React, { FC } from "react";
import { useFormStatus } from "react-dom";
import { deleteFlight } from "../lib/actions";

interface DeleteFlightProps {
  id: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      size={"sm"}
      type="submit"
      variant={"destructive"}
      disabled={pending}
    >
      <Trash className="mr-2 h-4 w-4" />
      Delete
    </Button>
  );
}

const DeleteFlight: FC<DeleteFlightProps> = ({ id }) => {
  const deleteFlightById = deleteFlight.bind(null, id);

  return (
    <form action={deleteFlightById}>
      <SubmitButton />
    </form>
  );
};

export default DeleteFlight;
