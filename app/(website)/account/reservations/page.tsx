// "use client";

import Link from "next/link";
import Image from "next/image";
import {
  HiOutlineInbox,
  HiOutlineTrash,
  HiOutlineUsers,
  HiOutlineMoon,
  HiOutlineClock,
} from "react-icons/hi2";
import { format, isPast, isToday } from "date-fns";
import { formatCurrency } from "@/app/helpers/utils";
import { getAllBookingsByEmail } from "@/lib/roomsApi";
import { auth } from "@/lib/auth";
import DeleteButton from "../../_components/DeleteButton";
import { startTransition } from "react";
import { deleteBooking } from "@/app/actions/actions";
import toast from "react-hot-toast";

interface Reservation {
  id: string;
  roomId: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: string;
  isPaid: boolean;
  created_at: string;
  rooms: {
    name: string;
  };
}

export default async function ReservationsPage() {
  // const reservations: Reservation[] = [
  //   {
  //     id: "RES-8821",
  //     roomId: "Emerald Sky 01",
  //     startDate: "2026-03-12T14:00:00Z",
  //     endDate: "2026-05-19T11:00:00Z",
  //     numNights: 7,
  //     numGuests: 2,
  //     totalPrice: 1550,
  //     status: "confirmed",
  //     isPaid: true,
  //     created_at: "2026-04-01T09:30:00Z",
  //   },
  //   {
  //     id: "RES-9042",
  //     roomId: "Indigo Loft 04",
  //     startDate: "2026-07-24T14:00:00Z",
  //     endDate: "2026-07-27T11:00:00Z",
  //     numNights: 3,
  //     numGuests: 1,
  //     totalPrice: 850,
  //     status: "unconfirmed",
  //     isPaid: false,
  //     created_at: "2026-04-10T15:20:00Z",
  //   },
  // ];
  const session = await auth();
  const email = session?.user?.email || "";
  const data = await getAllBookingsByEmail(email);

  const reservations: Reservation[] = data?.bookings || [];

  async function handleDelete(bookingId: string | number) {
    // Optional: Add a confirmation dialog before starting the transition
    if (!confirm("Are you sure you want to cancel this reservation?")) return;

    startTransition(async () => {
      // The toast.promise is great for a premium feel
      const result = await deleteBooking(bookingId);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  if (reservations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-sm border border-white/5 bg-slate-900/20 py-24 text-center">
        <HiOutlineInbox size={48} className="mb-6 text-slate-700" />
        <h3 className="mb-2 text-xl font-bold tracking-tight uppercase">
          No Reservations Found
        </h3>
        <Link
          href="/suites"
          className="mt-8 rounded-sm bg-white px-10 py-4 text-[10px] font-bold tracking-[0.3em] text-slate-950 uppercase transition-all hover:bg-emerald-500 hover:text-white active:scale-90"
        >
          Explore Suites
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {reservations.map((res) => {
        const isPastStay =
          isPast(new Date(res.startDate)) && !isToday(new Date(res.startDate));

        return (
          <div
            key={res.id}
            className="grid grid-cols-1 overflow-hidden rounded-sm border border-white/5 bg-slate-900/30 transition-all hover:bg-slate-900/40 md:grid-cols-[220px_1fr]"
          >
            <div className="relative h-40 w-full md:h-auto">
              <Image
                src="/auth-pic.jpg"
                alt={res.roomId}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 220px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-between p-6 lg:p-10">
              <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className={`flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[8px] font-black tracking-widest uppercase ${
                        !isPastStay
                          ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                          : "border border-white/5 bg-slate-800 text-slate-500"
                      }`}
                    >
                      <HiOutlineClock size={10} />
                      {isPastStay ? "Past" : "Upcoming"}
                    </span>
                    <span className="text-[10px] font-medium tracking-widest text-slate-600 uppercase">
                      Booked {format(new Date(res.created_at), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold tracking-tight md:text-3xl">
                    Premium Suite {res.rooms.name}
                  </h4>
                </div>

                <div className="text-left md:text-right">
                  <p className="mb-1 text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                    Total Fare
                  </p>
                  <p className="text-3xl font-black tracking-tighter text-white">
                    {formatCurrency(res.totalPrice)}
                  </p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-8 lg:grid-cols-5">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                    Stay Period
                  </p>
                  <p className="text-sm font-medium">
                    {format(new Date(res.startDate), "MMM dd")} &mdash;{" "}
                    {format(new Date(res.endDate), "MMM dd, yyyy")}
                  </p>
                </div>

                <div className="space-y-1 text-slate-300">
                  <p className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                    Duration
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <HiOutlineMoon className="text-indigo-400" />
                    <span>{res.numNights} Nights</span>
                  </div>
                </div>

                <div className="space-y-1 text-slate-300">
                  <p className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                    Occupancy
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <HiOutlineUsers className="text-emerald-400" />
                    <span>{res.numGuests} Guests</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                    Settlement
                  </p>
                  <p
                    className={`text-[10px] font-bold tracking-widest uppercase ${res.isPaid ? "text-emerald-500" : "text-amber-500"}`}
                  >
                    {res.isPaid ? "Paid" : "Unpaid"}
                  </p>
                </div>

                <div className="flex items-end justify-start lg:justify-end">
                  {/* <DeleteButton action={handleDelete} id={res.id} /> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
