import { notFound } from "next/navigation";
import { supabase } from "./supabase";
// import Error from "@/app/error";

export async function getRooms() {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("name", { ascending: true });

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

export async function getAllBookingsByEmail(email: string) {
  if (!email) return null;

  const { data, error } = await supabase
    .from("guests")
    .select(
      `
      id,
      bookings (
        *,
        rooms (
          name
        )
      )
    `,
    )
    .eq("email", email.toLowerCase())
    .order("created_at", { foreignTable: "bookings", ascending: false })
    .single();

  if (error) {
    console.error("Error fetching guest bookings:", error);
    return {
      success: false,
      message: "Error fetching guest bookings:",
      data: null,
    };
  }

  return {
    success: true,
    message: "bookings retrieved",
    bookings: data.bookings,
  };
}

export async function getBookingCount(id: number) {
  if (!id) return 0;

  const { count, error } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("guestId", id);

  if (error) {
    console.error("Error fetching booking count:", error);
    return 0;
  }

  return count ?? 0;
}

export async function deleteBooking(
  id: number | string,
  guestId: number | string,
) {
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id)
    .eq("guestId", guestId);

  if (error) {
    console.error("Supabase error:", error.message);
    throw error;
  }
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) return [];

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("could not load countries:", error);
    return [];
  }
}
