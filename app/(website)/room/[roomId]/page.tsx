import { getRoom, getRooms } from "@/lib/roomsApi";
import { Metadata } from "next";
import { title } from "process";
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
  const [session, roomData, settingsData] = await Promise.all([
    auth(),
    getRoom(roomId),
    getSettings(),
  ]);

  const { room } = roomData;
  const { settings, success } = settingsData;

  // console.log(session);

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
      <MakeReservation room={room} settings={settings} user={session?.user} />
    </div>
  );
}

export default RoomPage;
