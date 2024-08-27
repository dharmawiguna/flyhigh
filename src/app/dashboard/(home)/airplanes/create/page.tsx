import { type FC } from "react";
import FormAirplane from "../components/form-airplane";

interface CreateAirplanePageProps {}

const CreateAirplanePage: FC<CreateAirplanePageProps> = ({}) => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Add New Airplanes</div>
      </div>

      <FormAirplane type="ADD" />
    </div>
  );
};

export default CreateAirplanePage;
