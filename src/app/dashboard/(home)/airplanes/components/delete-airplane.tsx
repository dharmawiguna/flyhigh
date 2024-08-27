import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React, { FC } from "react";
import { useFormStatus } from "react-dom";
import { deleteAirplane } from "../lib/actions";

interface DeleteAirplaneProps {
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

const DeleteAirplane: FC<DeleteAirplaneProps> = ({ id }) => {
  const deleteAirplaneById = deleteAirplane.bind(null, id);

  return (
    <form action={deleteAirplaneById}>
      <SubmitButton />
    </form>
  );
};

export default DeleteAirplane;
