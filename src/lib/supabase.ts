import { createClient } from "@supabase/supabase-js";

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!!;
const NEXT_PUBLIC_SUPABASE_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY!!;

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLIC_KEY
);

export const uploadFile = async (file: File) => {
  try {
    const filename = `${Date.now()}.png`;

    const { error } = await supabase.storage
      .from("imageUpload")
      .upload(`public/airplanes/${filename}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    return filename;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const getUrlFile = (filename: string) => {
  const { data } = supabase.storage
    .from("imageUpload")
    .getPublicUrl(`public/airplanes/${filename}`);

  return data.publicUrl;
};

export const deleteFile = async (filename: string) => {
  try {
    const { data, error } = await supabase.storage
      .from("imageUpload")
      .remove([`public/airplanes/${filename}`]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
