import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const MAX_FILE_SIZE = 2000000;

export const airplanesFormSchema = z.object({
  name: z
    .string({ required_error: "Airplane name is required!" })
    .min(4, { message: "minimum has 4 character" }),
  code: z
    .string({ required_error: "Airplane code is required" })
    .regex(/^[A-Z]{3}-[0-9]{3}$/, "Format code should be [Char-Num]"),
  image: z
    .any()
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Image should be in format jpg, jpeg and png"
    )
    .refine((file: File) => file.size <= MAX_FILE_SIZE, "Max size file is 2MB"),
});
