"use client";
import { Button } from "@/components/ui/button";
import { Airplane, Flight, FlightSeat } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import DeleteAirplane from "../../airplanes/components/delete-airplane";
import Image from "next/image";
import { getUrlFile } from "@/lib/supabase";
import ColumnRouteFlight from "./column-route-flight";
import ColumnSeatPrice from "./column-seatprice";
import DeleteFlight from "./delete-flight";

export type FlightColumn = Flight & {
  plane: Airplane;
  seats: FlightSeat[];
};

export const columns: ColumnDef<FlightColumn>[] = [
  {
    accessorKey: "planeId",
    header: "Plane",
    cell: ({ row }) => {
      const flight = row.original;
      const planeImageUrl = getUrlFile(flight.plane.image);
      return (
        <div className="inline-flex items-center gap-5">
          <Image
            src={planeImageUrl}
            alt="image-plane"
            className="rounded-xl"
            width={120}
            height={120}
          />
          <div className="font-bold">{flight.plane.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "departureCity",
    header: "Route",
    cell: ({ row }) => {
      const flight = row.original;

      return <ColumnRouteFlight flight={flight} />;
    },
  },
  {
    accessorKey: "price",
    header: "Price / Seat",
    cell: ({ row }) => {
      const flight = row.original;

      return <ColumnSeatPrice flight={flight} />;
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const fligth = row.original;

      return (
        <div className="inline-flex gap-5 items-center">
          <Button variant={"secondary"} size={"sm"} asChild>
            <Link href={`/dashboard/flights/edit/${fligth.id}`}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          <DeleteFlight id={fligth.id} />
        </div>
      );
    },
  },
];
