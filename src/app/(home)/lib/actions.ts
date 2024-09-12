"use server";

import { getUser, lucia } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { objectToParams } from "@/lib/utils";

export async function logout() {
  const { session } = await getUser();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  const cookieStore = cookies(); // Atur cookies secara benar
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  revalidatePath("/");
  redirect("/"); // Gunakan redirect tanpa mengembalikan nilai lain
}

export async function searchFlight(formData: FormData) {
  const searchData = {
    departure: formData.get("departure"),
    arrival: formData.get("arrival"),
    date: formData.get("date"),
  };

  const queryParams = objectToParams(searchData);

  return redirect(`/available-flights?${queryParams}`);
}
