"use client";

import Link from "next/link";
import Image from "next/image";
import {
  HiOutlineInbox,
  HiOutlineTrash,
  HiOutlineUsers,
  HiOutlineMoon,
} from "react-icons/hi2";
import { format, isPast, isToday } from "date-fns";

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
}

export default function ReservationsPage() {
  const reservations: Reservation[] = [
    {
      id: "RES-8821",
      roomId: "Emerald Sky 01",
      startDate: "2026-05-12T14:00:00Z",
      endDate: "2026-05-19T11:00:00Z",
      numNights: 7,
      numGuests: 2,
      totalPrice: 1550,
      status: "confirmed",
      isPaid: true,
      created_at: "2026-04-01T09:30:00Z",
    },
    {
      id: "RES-9042",
      roomId: "Indigo Loft 04",
      startDate: "2026-07-24T14:00:00Z",
      endDate: "2026-07-27T11:00:00Z",
      numNights: 3,
      numGuests: 1,
      totalPrice: 850,
      status: "unconfirmed",
      isPaid: false,
      created_at: "2026-04-10T15:20:00Z",
    },
  ];

  const handleDelete = (id: string) => {
    // Add your deletion logic here (e.g., Supabase call)
    console.log(`Deleting reservation: ${id}`);
  };

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
            {/* Image Section - Transitions Removed */}
            <div className="relative h-40 w-full md:h-auto">
              <Image
                src="/auth-pic.jpg"
                alt={res.roomId}
                fill
                className="object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between p-6 lg:p-10">
              <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className={`rounded-sm px-2 py-0.5 text-[9px] font-black tracking-[0.2em] uppercase ${
                        isPastStay
                          ? "bg-slate-800 text-slate-500"
                          : "bg-emerald-500/10 text-emerald-500"
                      }`}
                    >
                      {res.status}
                    </span>
                    <span className="text-[10px] font-medium tracking-widest text-slate-600 uppercase">
                      Booked {format(new Date(res.created_at), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold tracking-tight md:text-3xl">
                    {res.roomId}
                  </h4>
                </div>

                <div className="text-left md:text-right">
                  <p className="mb-1 text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                    Total Fare
                  </p>
                  <p className="text-3xl font-black tracking-tighter text-white">
                    ${res.totalPrice}
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
                    {format(new Date(res.endDate), "MMM dd")}
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
                    {res.isPaid ? "Paid" : "Pending"}
                  </p>
                </div>

                <div className="flex items-end justify-start lg:justify-end">
                  <button
                    onClick={() => handleDelete(res.id)}
                    className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-red-500/70 uppercase transition-all hover:text-red-500 active:scale-90"
                  >
                    <HiOutlineTrash size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// export default function ReservationsPage() {
//   // Example dummy data
//   const reservations: Reservation[] = [
//     {
//       id: "RES-8821",
//       roomId: "Emerald Sky 01",
//       startDate: "2026-05-12T14:00:00Z",
//       endDate: "2026-05-19T11:00:00Z",
//       numNights: 7,
//       numGuests: 2,
//       totalPrice: 1550,
//       status: "confirmed",
//       isPaid: true,
//       created_at: "2026-04-01T09:30:00Z",
//     },
//     {
//       id: "RES-7710",
//       roomId: "Slate Sanctuary 12",
//       startDate: "2025-12-15T14:00:00Z",
//       endDate: "2025-12-22T11:00:00Z",
//       numNights: 7,
//       numGuests: 4,
//       totalPrice: 2600,
//       status: "checked-out",
//       isPaid: true,
//       created_at: "2025-11-10T11:00:00Z",
//     },
//   ];

//   const handleDelete = (id: string) => {
//     console.log(`Deleting reservation: ${id}`);
//   };

//   return (
//     <div className="flex flex-col gap-6">
//       {reservations.map((res) => {
//         // Logic for Upcoming vs Past
//         const isUpcoming =
//           !isPast(new Date(res.startDate)) || isToday(new Date(res.startDate));

//         return (
//           <div
//             key={res.id}
//             className="grid grid-cols-1 overflow-hidden rounded-sm border border-white/5 bg-slate-900/30 transition-all hover:bg-slate-900/40 md:grid-cols-[220px_1fr]"
//           >
//             {/* Image Section */}
//             <div className="relative h-44 w-full md:h-auto">
//               <Image
//                 src="/auth-pic.jpg"
//                 alt={res.roomId}
//                 fill
//                 className="object-cover"
//               />
//             </div>

//             {/* Content Section */}
//             <div className="flex flex-col justify-between p-6 lg:p-10">
//               <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
//                 <div>
//                   <div className="mb-3 flex flex-wrap items-center gap-2">
//                     {/* Status Badge */}
//                     <span className="border border-white/10 bg-white/5 px-2 py-0.5 text-[8px] font-black tracking-widest text-slate-400 uppercase">
//                       {res.status}
//                     </span>

//                     {/* Timeline Tag (Upcoming/Past) */}
//                     <span
//                       className={`flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[8px] font-black tracking-widest uppercase ${
//                         isUpcoming
//                           ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
//                           : "border border-white/5 bg-slate-800 text-slate-500"
//                       }`}
//                     >
//                       <HiOutlineClock size={10} />
//                       {isUpcoming ? "Upcoming" : "Past"}
//                     </span>
//                   </div>

//                   <h4 className="text-2xl font-bold tracking-tight md:text-3xl">
//                     {res.roomId}
//                   </h4>
//                   <p className="mt-1 text-[10px] font-medium tracking-widest text-slate-600 uppercase">
//                     Reference #{res.id}
//                   </p>
//                 </div>

//                 <div className="text-left md:text-right">
//                   <p className="mb-1 text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
//                     Total Fare
//                   </p>
//                   <p className="text-3xl font-black tracking-tighter text-white">
//                     ${res.totalPrice}
//                   </p>
//                 </div>
//               </div>

//               {/* Stats Bar */}
//               <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-8 lg:grid-cols-5">
//                 <div className="space-y-1 lg:col-span-2">
//                   <p className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">
//                     Stay Period
//                   </p>
//                   <p className="text-sm font-medium">
//                     {/* Added the Year to the format */}
//                     {format(
//                       new Date(res.startDate),
//                       "MMM dd, yyyy",
//                     )} &mdash; {format(new Date(res.endDate), "MMM dd, yyyy")}
//                   </p>
//                 </div>

//                 <div className="space-y-1 text-slate-300">
//                   <p className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">
//                     Details
//                   </p>
//                   <div className="flex flex-col gap-1 text-xs">
//                     <span className="flex items-center gap-2">
//                       <HiOutlineMoon className="text-indigo-400" size={14} />
//                       {res.numNights} Nights
//                     </span>
//                     <span className="flex items-center gap-2">
//                       <HiOutlineUsers className="text-emerald-400" size={14} />
//                       {res.numGuests} Guests
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-1">
//                   <p className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">
//                     Settlement
//                   </p>
//                   <p
//                     className={`text-[10px] font-bold tracking-widest uppercase ${res.isPaid ? "text-emerald-500" : "text-amber-500"}`}
//                   >
//                     {res.isPaid ? "Paid" : "Pending"}
//                   </p>
//                 </div>

//                 <div className="flex items-end justify-start lg:justify-end">
//                   <button
//                     onClick={() => handleDelete(res.id)}
//                     className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-red-500/70 uppercase transition-all hover:text-red-500 active:scale-90"
//                   >
//                     <HiOutlineTrash size={16} />
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
