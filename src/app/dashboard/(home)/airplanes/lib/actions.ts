"use server";

import { ActionResult } from "@/app/dashboard/(auth)/signin/form/action";
import { airplanesFormSchema } from "./validation";
import { redirect } from "next/navigation";
import { deleteFile, uploadFile } from "@/lib/supabase";
import prisma from "../../../../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { unknown } from "zod";

export async function getAirplaneById(id: string) {
  try {
    const data = await prisma.airplane.findFirst({
      where: {
        id: id,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function saveAirplane(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  const values = airplanesFormSchema.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
    code: formData.get("code"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const uploadedFile = await uploadFile(values.data.image);

  if (uploadedFile instanceof Error) {
    return {
      errorTitle: "Failed to Upload File",
      errorDesc: ["Something went wrong"],
    };
  }

  try {
    const data = await prisma.airplane.create({
      data: {
        name: values.data.name,
        code: values.data.code,
        image: uploadedFile as string,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errorTitle: "Failed to insert data",
      errorDesc: ["Something went wrong"],
    };
  }

  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
}

export async function updateAirplane(
  prevState: unknown,
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const image = formData.get("image") as File;

  let airplanesFormSchemaUpdate;
  if (image.size === 0) {
    airplanesFormSchemaUpdate = airplanesFormSchema.omit({ image: true });
  } else {
    airplanesFormSchemaUpdate = airplanesFormSchema;
  }

  const values = airplanesFormSchemaUpdate.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
    code: formData.get("code"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  let filename;

  if (image.size > 0) {
    const uploadedFile = await uploadFile(image);

    if (uploadedFile instanceof Error) {
      return {
        errorTitle: "Failed to Upload File",
        errorDesc: ["Something went wrong"],
      };
    }

    filename = uploadedFile as string;
  } else {
    const airplane = await prisma.airplane.findFirst({
      where: {
        id: id,
      },
      select: {
        image: true,
      },
    });

    filename = airplane?.image;
  }

  try {
    await prisma.airplane.update({
      where: {
        id: id,
      },
      data: {
        name: values.data.name,
        code: values.data.code,
        image: filename as string,
      },
    });
  } catch (error) {
    return {
      errorTitle: "Failed to update data",
      errorDesc: ["something went wrong"],
    };
  }

  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
}

export async function deleteAirplane(
  id: string
): Promise<ActionResult | undefined> {
  const data = await prisma.airplane.findFirst({ where: { id: id } });

  if (!data) {
    return {
      errorTitle: "Data not found!",
      errorDesc: [],
    };
  }

  const deletedFile = await deleteFile(data?.image);

  if (deletedFile instanceof Error) {
    return {
      errorTitle: "Failed to delete image",
      errorDesc: ["Something went wrong"],
    };
  }

  try {
    await prisma.airplane.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);

    return {
      errorTitle: "Failed to delete image",
      errorDesc: ["Something went wrong"],
    };
  }

  revalidatePath("/dashboard/airplanes");
}
