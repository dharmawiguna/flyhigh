import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { FC } from "react";
import { logout } from "../actions";

interface ButtonLogoutProps {}

const ButtonLogout: FC<ButtonLogoutProps> = ({}) => {
  return (
    <div className="space-y-2">
      <form action={logout}>
        <Button
          variant={"destructive"}
          className="w-full justify-start"
          type="submit"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </form>
    </div>
  );
};

export default ButtonLogout;
