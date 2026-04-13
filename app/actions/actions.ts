"use server";

import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: FormData) {
  const session = await auth();

  if (!session) return { success: false, message: "You must be logged in" };

  const newBooking = {
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    numNights: Number(formData.get("numNights")),
    numGuests: Number(formData.get("numGuests")),
    roomPrice: Number(formData.get("roomPrice")),
    extraPrice: Number(formData.get("extraPrice")),
    totalPrice: Number(formData.get("totalPrice")),
    roomId: Number(formData.get("roomId")),
    observations: formData.get("observations"),
    guestId: session?.user.guestId,
    status: "unconfirmed",
    hasBreakfast: !!formData.get("extraPrice"),
    isPaid: false,
  };

  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select();

  if (error) {
    console.error(error);
    return {
      success: false,
      message: "Reservation Failed",
    };
  }

  revalidatePath(`/rooms/${formData.get("roomId")}`);

  return {
    success: true,
    message:
      "Reservation confirmed! You can view the details in your Account area.",
  };
}
