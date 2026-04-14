import { notFound } from "next/navigation";
import { supabase } from "./supabase";

export async function getRooms() {
  const { data, error } = await supabase.from("rooms").select("*");

  if (error) {
    console.error(error);
    return {
      success: false,
      message: "The rooms could not be loaded ",
      rooms: null,
    };
  }

  return { success: true, message: "Rooms successfully loaded", rooms: data };
}

export async function getRoom(id: string) {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
    return { success: false, message: "This room cannot be found", room: null };
  }

  return { success: true, message: "Room successfully loaded", room: data };
}

export async function getRoomBookedDates(id: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("startDate, endDate")
    .eq("roomId", id);

  if (error) {
    console.error(error);
    return {
      success: false,
      message: "The rooms booked dates not be loaded ",
      rooms: null,
    };
  }

  return {
    success: true,
    message: "Rooms booked dates successfully loaded",
    bookedDates: data,
  };
}
