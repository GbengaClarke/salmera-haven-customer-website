import { supabase } from "./supabase";

export async function getUser(email: string) {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .ilike("email", email)
    .single();

  return data;
}

export async function getExistingProfile(email: string) {
  const { data: existingProfile, error } = await supabase
    .from("profiles")
    .select("email")
    .eq("email", email.trim().toLowerCase())
    .maybeSingle();

  if (error) {
    console.error("Database Error:", error.message);
    return { itExists: false, error: "DATABASE_ERROR" };
  }

  if (existingProfile) {
    return { itExists: true, error: "PROFILE_EXISTS" };
  }

  return { itExists: false, error: null };
}

export async function getExistingOTP(email: string) {
  const { data: existingOTP, error } = await supabase
    .from("email_otp")
    .select("created_at")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Database Error:", error.message);
    throw new Error("Failed to load existing OTP");
  }

  if (existingOTP) {
    const lastSent = new Date(existingOTP.created_at).getTime();
    const now = new Date().getTime();
    const secondsRemaining = Math.ceil(60 - (now - lastSent) / 1000);

    if (secondsRemaining > 0) {
      return {
        success: true,
        message: `Please wait ${secondsRemaining}s before requesting a new code.`,
      };
    } else {
      return {
        success: false,
        message: "Code created more than 60 seconds ago ",
      };
    }
  }

  return { success: false, message: "Code created more than 60 seconds ago " };
}

export async function createUser({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) {
  const { error } = await supabase.from("guests").insert({
    email,
    fullName,
  });

  if (error) {
    console.error(error?.message);
    throw new Error("User could not be created");
  }
}
