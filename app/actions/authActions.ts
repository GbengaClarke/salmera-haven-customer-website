"use server";

import { getExistingOTP } from "@/lib/dataApi";
import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gbclarkee@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendEmailOTP(otp: string, email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  try {
    //  Check 60 seconds Cooldown
    const otpStatus = await getExistingOTP(normalizedEmail);
    if (otpStatus.success) return otpStatus;

    //  Database Update
    const { error: dbError } = await supabase.from("email_otp").upsert(
      {
        email: normalizedEmail,
        code: otp,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 5 * 60000).toISOString(),
      },
      { onConflict: "email" },
    );

    if (dbError) {
      console.error("DB Error:", dbError);
      return { success: false, message: "Server database error. Try again." };
    }

    // Send Email
    await transporter.sendMail({
      from: '"Salmera Haven" <gbclarkee@gmail.com>',
      to: normalizedEmail,
      subject: "Verify your Account on Salmera Haven",
      html: `
        <div style="font-family: sans-serif; max-width: 400px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #1e293b;">Verification Code</h2>
          <p style="color: #64748b;">Enter the code below to secure your account:</p>
          <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #2563eb;">
            ${otp}
          </div>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
            This code will expire in 5 minutes. If you didn't request this, please ignore this email.
          </p>
        </div>
      `,
    });

    return { success: true, message: "Code sent to your email!" };
  } catch (error) {
    console.error("Email/System Error:", error);
    return { success: false, message: "Failed to send code. Try again." };
  }
}
