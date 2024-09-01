import { Metadata } from "next";
import { FC } from "react";
import { getAirplanes } from "../../../airplanes/lib/data";
import FormFlight from "../../components/form-flight";
import { getFlightById } from "../../lib/data";

type Params = {
  id: string;
};
interface EditFlightPageProps {
  params: Params;
}

export const metadata: Metadata = {
  title: "Dashboard | Edit Flights",
};

const EditFlightPage: FC<EditFlightPageProps> = async ({ params }) => {
  const airplanes = await getAirplanes();

  const data = await getFlightById(params.id);

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Edit Flights</div>
      </div>

      <FormFlight airplane={airplanes} type="EDIT" defaultValues={data} />
    </div>
  );
};

export default EditFlightPage;
