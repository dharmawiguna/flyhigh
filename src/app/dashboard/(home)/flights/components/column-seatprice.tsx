import React, { FC, useMemo } from "react";
import { FlightColumn } from "./column-flight";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { mappingSeats, rupiahFormat } from "@/lib/utils";

interface ColumnSeatPriceProps {
  flight: FlightColumn;
}

const ColumnSeatPrice: FC<ColumnSeatPriceProps> = ({ flight }) => {
  const {
    economy,
    business,
    first,
    totalSeatEconomy,
    totalSeatBusiness,
    totalSeatFirst,
  } = useMemo(() => mappingSeats(flight.seats), [flight]);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Economi</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="font-medium">
              <span className="text-primary">Ticket Price:</span>{" "}
              {rupiahFormat(flight.price)}
            </div>
            <div className="font-medium">
              <span className="text-primary">Seat Available:</span> {economy}/
              {totalSeatEconomy}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-1">
        <AccordionTrigger>Business</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="font-medium">
              <span className="text-primary">Ticket Price:</span>{" "}
              {rupiahFormat(flight.price + 500000)}
            </div>
            <div className="font-medium">
              <span className="text-primary">Seat Available:</span> {business}/
              {totalSeatBusiness}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-1">
        <AccordionTrigger>First</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="font-medium">
              <span className="text-primary">Ticket Price:</span>{" "}
              {rupiahFormat(flight.price + 750000)}
            </div>
            <div className="font-medium">
              <span className="text-primary">Seat Available:</span> {first}/
              {totalSeatFirst}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColumnSeatPrice;
