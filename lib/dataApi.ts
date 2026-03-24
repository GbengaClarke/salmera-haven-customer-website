import { supabase } from "./supabase";

export async function getUser(email: string) {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .ilike("email", email)
    .single();

  return data;
}

type CreateUserParams = { fullName: string; email: string };

export async function createUser({ fullName, email }: CreateUserParams) {
  const { error } = await supabase.from("guests").insert({
    email,
    fullName,
  });

  if (error) {
    console.error(error?.message);
    throw new Error("User could not be created");
  }
}
