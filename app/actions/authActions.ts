"use server";

import { supabase } from "@/lib/supabase";
import Nodemailer from "nodemailer";

//step 1
export async function sendEmailOTP(otp: string, email: string) {
  // Save to DB (using Upsert so we don't spam rows for the same email)
  const { error } = await supabase
    .from("email_otp")
    .upsert(
      { email, code: otp, expires_at: new Date(Date.now() + 5 * 60000) },
      { onConflict: "email" },
    );

  if (error) throw new Error("Could not generate code");

  // if (error) throw new Error("Could not generate code: " + error.message);

  // Send email OTP via nodemailer
  // Create the Gmail Transporter
  const transporter = Nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gbclarkee@gmail.com", // Your personal email
      pass: process.env.GMAIL_APP_PASSWORD, // The 16-character App Password
    },
  });

  // Send the Mail
  try {
    await transporter.sendMail({
      from: '"Salmera Haven" <gbengaclarke@gmail.com>',
      to: email, // This can now be ANY email address
      subject: "Your Verification Code",
      html: `<b>Your code is: ${otp}</b>`,
    });
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}

// step 2: Verify the code
// export async function verifyOTP(email: string, userCode: string) {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from('otp_verifications')
//     .select('code, expires_at')
//     .eq('email', email)
//     .single();
// }
console.log("hi");

// "use server";

// import { supabase } from "@/lib/supabase";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// //step 1
// export async function sendEmailOTP(otp: string, email: string) {
//   // Save to DB (using Upsert so we don't spam rows for the same email)
//   const { error } = await supabase
//     .from("email_otp")
//     .upsert(
//       { email, code: otp, expires_at: new Date(Date.now() + 5 * 60000) },
//       { onConflict: "email" },
//     );

//   if (error) throw new Error("Could not generate code");

//   // if (error) throw new Error("Could not generate code: " + error.message);

//   // Send email OTP via Resend
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "onboarding@resend.dev", // Use this until domain is verified
//       to: email,
//       subject: "Your Verification Code - Salmera Haven",
//       html: `<strong>Your code is: ${otp}</strong>`,
//     });

//     if (error) {
//       console.error("Resend API Error:", error);
//       return { success: false, error: error.message };
//     }

//     return { success: true };
//   } catch (e) {
//     console.error("Connection Error:", e);
//     return { success: false, error: "System failure" };
//   }
// }

// // step 2: Verify the code
// // export async function verifyOTP(email: string, userCode: string) {
// //   const supabase = await createClient();

// //   const { data, error } = await supabase
// //     .from('otp_verifications')
// //     .select('code, expires_at')
// //     .eq('email', email)
// //     .single();
// // }
