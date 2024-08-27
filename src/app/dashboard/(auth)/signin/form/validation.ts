import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(4, { message: "password is must be minimum 4 character" }),
});
