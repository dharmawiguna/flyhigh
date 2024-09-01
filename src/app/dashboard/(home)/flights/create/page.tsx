import { Metadata } from "next";
import { FC } from "react";
import { getAirplanes } from "../../airplanes/lib/data";
import FormFlight from "../components/form-flight";

interface CreateFlightPageProps {}

export const metadata: Metadata = {
  title: "Dashboard | Create Flights",
};

const CreateFlightPage: FC<CreateFlightPageProps> = async ({}) => {
  const airplanes = await getAirplanes();

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Add New Flights</div>
      </div>

      <FormFlight type="ADD" airplane={airplanes} />
    </div>
  );
};

export default CreateFlightPage;
