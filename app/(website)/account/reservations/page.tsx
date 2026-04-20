import { getAllBookingsByEmail } from "@/lib/roomsApi";
import { auth } from "@/lib/auth";
import ReservationList from "../../_components/ReservationLists";
import { HiOutlineInbox } from "react-icons/hi2";
import Link from "next/link";

export default async function Page() {
  const session = await auth();
  const email = session?.user?.email || "";
  const data = await getAllBookingsByEmail(email);
  const reservations = data?.bookings || [];

  if (reservations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-sm border border-white/5 bg-slate-900/20 py-24 text-center">
        <HiOutlineInbox size={48} className="mb-6 text-slate-700" />
        <h3 className="mb-2 text-xl font-bold tracking-tight uppercase">
          No Reservations Found
        </h3>
        <Link
          href="/"
          className="bg-whitex mt-8 bg-indigo-400 px-12 py-5 text-xs font-bold tracking-[0.3em] text-slate-950 uppercase shadow-xl transition-all duration-150 ease-in-out hover:bg-indigo-400 hover:text-white hover:shadow-indigo-500/20 active:scale-90 active:brightness-75"
        >
          Explore Suites
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Your Reservations</h1>
      <ReservationList reservations={reservations} />
    </div>
  );
}
