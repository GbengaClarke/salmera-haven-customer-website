import { supabase } from "./supabase";

export async function getUser(email: string) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (error) {
    console.error("Database Error:", error.message);
    throw new Error("Failed to get user");
  }

  return data;
}

export async function getGuestUserEmail(email: string) {
  const { data, error } = await supabase
    .from("guests")
    .select("email")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (error) {
    console.error("Database Error:", error.message);
    throw new Error("Failed to get user");
  }

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

export async function verifyOTP(email: string, userTypedOtp: string) {
  const normalizedEmail = email.trim().toLowerCase();

  try {
    //global expiredotp clean up
    await supabase
      .from("email_otp")
      .delete()
      .lt("expires_at", new Date().toISOString());

    //  Fetch the OTP record
    const { data, error } = await supabase
      .from("email_otp")
      .select("code, expires_at")
      .eq("email", normalizedEmail)
      .maybeSingle();

    // Check if the record even exists
    if (error || !data) {
      return {
        success: false,
        message: "Verification code not be found or expired.",
      };
    }

    // Check if the code has expired
    const isExpired = new Date() > new Date(data.expires_at);
    if (isExpired) {
      return {
        success: false,
        message: "This code has expired. Please request a new one.",
      };
    }

    // Compare the codes
    if (data.code !== userTypedOtp) {
      return { success: false, message: "The code you entered is incorrect." };
    }

    // at SUCCESS Clean up the database so OTP cannot be used again
    await supabase.from("email_otp").delete().eq("email", normalizedEmail);

    return {
      success: true,
      message: "Email verified! Please, set up your password",
    };
  } catch (err) {
    console.error("Verification Error:", err);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function registerUser({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}) {
  const normalizedEmail = email.trim().toLowerCase();

  try {
    //  Admin API to create a pre-confrimed user (i did my own authentication through the signup form steps)
    const { data, error: authError } = await supabase.auth.admin.createUser({
      email: normalizedEmail,
      password: password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });

    if (authError) {
      return { success: false, message: authError.message };
    }

    //check if email already in guest list
    const existingGuest = await getUser(email);

    if (existingGuest) {
      return {
        success: true,
        message: "Account created! Proceed to log into your account.",
      };
    }

    // Insert into guests table
    if (!existingGuest && data.user) {
      const { error: dbError } = await supabase.from("guests").insert({
        email: normalizedEmail,
        fullName: fullName,
      });

      if (dbError) {
        console.error("DB Error:", dbError.message);
        return { success: false, message: "Profile creation failed." };
      }
    }

    return {
      success: true,
      message: "Account created! Proceed to log into your account.",
    };
  } catch (err) {
    console.error(err);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*");

  if (error) {
    console.error(error);
    return {
      success: false,
      message: "The settings could not be loaded ",
      settings: null,
    };
  }

  return {
    success: true,
    message: "Settings successfully loaded",
    settings: data,
  };
}

export async function getGuest(email: string) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}
