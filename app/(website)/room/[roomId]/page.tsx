import {
  getBookingCount,
  getRoom,
  getRoomBookedDates,
  getRooms,
} from "@/lib/roomsApi";
import { Metadata } from "next";
import RoomDetails from "../../_components/RoomDetails";
import RoomFeatures from "../../_components/RoomFeatures";
import MakeReservation from "../../_components/MakeReservation";
import { getSettings } from "@/lib/dataApi";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Reserve Room",
};

export async function generateStaticParams() {
  const { success, rooms } = await getRooms();

  if (!success || !rooms) return [];

  return rooms?.map((room) => {
    return { roomId: String(room.id) };
  });
}

async function RoomPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;

  //optimize??
  const [session, roomData, settingsData, bookedData] = await Promise.all([
    auth(),
    getRoom(roomId),
    getSettings(),
    getRoomBookedDates(roomId),
  ]);

  const bookingCount = await getBookingCount(session?.user.guestId ?? 0);

  // console.log(bookingCount);

  const bookedDatesRange = bookedData.bookedDates;

  const { room } = roomData;
  const { settings, success } = settingsData;

  //edit!!! use toast?
  if (!success || !settings) {
    return (
      <div>Error loading reservation settings. Please try again later.</div>
    );
  }

  return (
    <div>
      <RoomDetails room={room} />
      <RoomFeatures />
      <MakeReservation
        room={room}
        settings={settings}
        bookedDatesRange={bookedDatesRange}
        user={session?.user}
        bookingCount={bookingCount}
      />
    </div>
  );
}

export default RoomPage;
