import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string({ required_error: "Name is required!" })
    .min(4, { message: "Minimum 4 character" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please input valid email!" }),
  password: z
    .string({ required_error: "Password is required!" })
    .min(4, { message: "Minimum is 4 character" }),
  passport: z.string({ required_error: "Passport is required!" }),
});
