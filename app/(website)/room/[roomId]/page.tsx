import { getRoom, getRooms } from "@/lib/roomsApi";
import { Metadata } from "next";
import { title } from "process";
import RoomDetails from "../../_components/RoomDetails";
import RoomFeatures from "../../_components/RoomFeatures";
import MakeReservation from "../../_components/MakeReservation";
import { getSettings } from "@/lib/dataApi";

export const metadata: Metadata = {
  title: "Reserve Room",
};

// export async function generateMetadata({params}: { params: Promise<{ roomId: string }> }) {
//   const { roomId } = await params

//   return {title: `Reserve Room ${roomId}`}

// }

export async function generateStaticParams() {
  const { success, rooms } = await getRooms();

  if (!success || !rooms) return [];

  return rooms?.map((room) => {
    return { roomId: String(room.id) };
  });
}

async function RoomPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;
  const [roomData, settingsData] = await Promise.all([
    getRoom(roomId),
    getSettings(),
  ]);

  const { room } = roomData;
  const { settings, success } = settingsData;

  // console.log(settings);

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
      <MakeReservation room={room} settings={settings} />
    </div>
  );
}

export default RoomPage;
