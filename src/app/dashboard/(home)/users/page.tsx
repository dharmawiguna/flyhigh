import { DataTable } from "@/components/ui/data-table";
import { Metadata } from "next";
import { columns } from "./components/columns-user";
import { getCustomers } from "./lib/data";

export const metadata: Metadata = {
  title: "Dashboard | Users",
};

export default async function UsersPage() {
  const customers = await getCustomers();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">User</div>
      </div>
      <DataTable columns={columns} data={customers} />
    </>
  );
}
