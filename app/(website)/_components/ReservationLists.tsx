"use client";

import Image from "next/image";
import { HiOutlineUsers, HiOutlineMoon, HiOutlineClock } from "react-icons/hi2";
import { format, isPast, isToday } from "date-fns";
import { formatCurrency } from "@/app/helpers/utils";
import DeleteButton from "./DeleteButton";
import { useOptimistic, useTransition } from "react";
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

export default function ReservationList({
  reservations,
}: {
  reservations: Reservation[];
}) {
  const [isPending, startTransition] = useTransition();

  const [optimisticReservations, deleteOptimistic] = useOptimistic(
    reservations,
    (curRes, bookingId) => {
      return curRes.filter((res) => res.id !== bookingId);
    },
  );

  async function handleDelete(bookingId: string | number, roomName: string) {
    toast.custom((t) => (
      <div className="fixed inset-0 z-9999 flex justify-center bg-black/20 backdrop-blur-sm">
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } ring-opacity-5 pointer-events-auto mt-68 flex h-fit w-full max-w-md flex-col gap-4 rounded-sm border-2 border-white/10 bg-slate-950 p-6 shadow-2xl ring-1 ring-black md:mt-36`}
        >
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">
              Delete{" "}
              <span className="text-emerald-100">Premium Suite {roomName}</span>
            </p>
            <p className="text-slate-200">
              Are you sure you want to delete this reservation? This action
              cannot be undone.
            </p>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="cursor-pointer rounded-sm px-4 py-2 text-xs font-bold tracking-widest text-slate-400 uppercase transition-all hover:text-white active:scale-95 active:opacity-70"
            >
              No, Keep it
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                executeDelete(bookingId);
              }}
              className="cursor-pointer rounded-sm bg-rose-600/20 px-4 py-2 text-xs font-bold tracking-widest text-rose-500 uppercase transition-all hover:bg-rose-600 hover:text-white active:scale-95 active:brightness-110"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    ));
  }

  async function executeDelete(bookingId: string | number) {
    startTransition(async () => {
      deleteOptimistic(bookingId);
      const result = await deleteBooking(bookingId);
      if (!result?.success) {
        toast.error(result?.message || "An error occurred");
      }
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {optimisticReservations.map((res, index) => {
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
                alt={res.rooms.name}
                fill
                priority={index < 2}
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
                    className={`text-[10px] font-bold tracking-widest uppercase ${
                      res.isPaid ? "text-emerald-500" : "text-amber-500"
                    }`}
                  >
                    {res.isPaid ? "Paid" : "Unpaid"}
                  </p>
                </div>

                <div className="flex items-end justify-start lg:justify-end">
                  <DeleteButton
                    roomName={res.rooms.name}
                    action={handleDelete}
                    id={res.id}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
