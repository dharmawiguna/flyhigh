"use server";

import { ActionResult } from "@/app/dashboard/(auth)/signin/form/action";
import { userSchema } from "./validation";

import bcrypt from "bcrypt";
import prisma from "../../../../../lib/prisma";
import { redirect } from "next/navigation";

export async function signUpUser(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = userSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passport: formData.get("passport"),
  });

  if (!validate.success) {
    const errorDesc = validate.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const hashPassword = bcrypt.hashSync(validate.data.password, 10);

  await prisma.user.create({
    data: {
      email: validate.data.email,
      name: validate.data.name,
      password: hashPassword,
      passport: validate.data.passport,
      role: "CUSTOMER",
    },
  });

  return redirect("/sign-in");
}
