"use server";

import { auth } from "@/lib/auth";
import { deleteBooking as deleteBookingApi } from "@/lib/roomsApi";
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

export async function deleteBooking(bookingId: number | string) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in to perform this action");

  try {
    await deleteBookingApi(bookingId);

    revalidatePath("/room/reservations");

    return { success: true, message: "Reservation deleted successfully" };
  } catch (error) {
    return {
      success: false,
      message: "Could not delete reservation. Please try again.",
    };
  }
}

//optimize???
export async function updateProfile(formData: FormData) {
  // console.log(formData);
  // return { success: true, message: "Profile successfully updated" };

  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID") as string;
  const country = formData.get("country") as string;

  const [nationality, countryFlag] = country.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    return {
      success: false,
      message: "Please provide a valid National ID within 6 - 12 characters",
    };
  }
  const { error } = await supabase
    .from("guests")
    .update({ nationalID, nationality, countryFlag })
    .eq("id", session.user.guestId);
  if (error) {
    return { success: false, message: "Could not update profile" };
  }
  revalidatePath("/account/profile");

  return { success: true, message: "Profile successfully updated" };
}
