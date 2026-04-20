import DisplayedRooms from "./DisplayedRooms";
import { getRooms } from "@/lib/roomsApi";

export default async function FeaturedRooms() {
  const { success, rooms } = await getRooms();

  return (
    <section className="bg-slate-950 py-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="font-cormorant text-4xl tracking-tight text-white md:text-6xl">
            Featured Rooms{" "}
            {rooms?.length && (
              <span className="text-[1.3rem] text-slate-300">
                ({rooms?.length})
              </span>
            )}
          </h2>
          <div className="mt-4 h-px w-20 bg-indigo-400 opacity-50" />
        </div>

        {!success || rooms === null ? (
          <div className="-mt-5">
            No rooms available at the moment, Please check back later...
          </div>
        ) : (
          <DisplayedRooms rooms={rooms} />
        )}
      </div>
    </section>
  );
}
