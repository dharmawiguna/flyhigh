import { z } from "zod";

export const formFlightSchema = z.object({
  planeId: z.string({ required_error: "Airplane is requred" }),
  price: z.string({ required_error: "Price is required!" }),
  departureCity: z.string({ required_error: "Departure City is required!" }),
  departureDate: z.date(),
  departureCityCode: z
    .string({ required_error: "departure city code is required!" })
    .min(3, { message: "Minimum is 3 character" })
    .max(3, { message: "Maximum is 3 character" }),
  destinationCity: z.string({
    required_error: "destination city is required!",
  }),
  arrivalDate: z.date(),
  destinationCityCode: z
    .string({ required_error: "destination city code is required!" })
    .min(3, { message: "Minimum is 3 character" })
    .max(3, { message: "Maximum is 3 character" }),
});
