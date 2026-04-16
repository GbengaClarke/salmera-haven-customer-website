"use server";

import { auth } from "@/lib/auth";
import { deleteBooking as deleteBookingApi } from "@/lib/roomsApi";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { startTransition } from "react";
import toast from "react-hot-toast";

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

export async function deleteBooking(bookingId: number | string) {
  const session = await auth();

  // 1. Authentication Guard
  if (!session) throw new Error("You must be logged in to perform this action");

  try {
    // 2. Execute Deletion
    await deleteBookingApi(bookingId);

    // 3. Clear Cache
    // This forces Next.js to fetch a fresh list of bookings,
    // which automatically updates your bookingCount in the UI!
    revalidatePath("/room/reservations");

    return { success: true, message: "Reservation deleted successfully" };
  } catch (error) {
    return {
      success: false,
      message: "Could not delete reservation. Please try again.",
    };
  }
}
