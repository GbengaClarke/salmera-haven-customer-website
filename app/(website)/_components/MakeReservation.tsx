"use client";

import { createBooking } from "@/app/actions/actions";
import { Room } from "@/types/rooms";
import { HiCheck, HiOutlineInformationCircle } from "react-icons/hi2";
import FormButton from "./FormButton";
import DateSelector from "./DateSelector";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { adjustDate } from "@/app/helpers/utils";
import { differenceInDays } from "date-fns";

interface MakeReservationProps {
  room: Room;
}

export default function MakeReservation({ room }: MakeReservationProps) {
  const [range, setRange] = useState<DateRange | undefined>({
    to: undefined,
    from: undefined,
  });

  const [hasBreakfast, setHasBreakfast] = useState(false);

  console.log(hasBreakfast);

  const { maxCapacity, name, regularPrice } = room;

  const startDate = adjustDate(range?.from);
  const endDate = adjustDate(range?.to);

  const numNights =
    range?.from && range?.to
      ? Math.max(1, differenceInDays(range.to, range.from))
      : 0;

  // console.log(numNights);

  return (
    <section className="mt-8 mb-24 border-t border-white/5 pt-8">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="font-cormorant text-5xl leading-tight text-white">
            Reserve Suite <span className="text-amber-200/90">{name}</span>
          </h2>
          <div className="mt-2 flex items-center gap-2 text-amber-500/80">
            <HiOutlineInformationCircle className="text-lg" />
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase">
              Payment handled upon arrival
            </p>
          </div>
        </div>

        <div className="hidden text-right md:block">
          <p className="mb-1 text-[10px] tracking-widest text-slate-500 uppercase">
            Status
          </p>
          <p className="flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-500 uppercase">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
            Available for Booking
          </p>
        </div>
      </div>

      {/* The Unified Card */}
      <div className="overflow-hidden rounded-lg border border-white/5 bg-[#0a0f1d] shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px]">
          {/* Left Side: Large Integrated Calendar Space */}
          <div className="bg-white/2 p-8 lg:p-12">
            <div className="flex h-full min-h-112.5 w-full flex-col items-center justify-center border-white/10">
              <span className="mb-4 text-[11px] tracking-[0.4em] text-slate-400 uppercase">
                Select Dates
              </span>
              <div className="h-px w-12 bg-white/10"></div>
              {/* CALENDAR WILL RENDER HERE */}

              <DateSelector
                room={room}
                range={range}
                setRange={setRange}
                hasBreakfast={hasBreakfast}
                numNights={numNights}
              />
            </div>
          </div>

          {/* Right Side: Action Sidebar */}
          <div className="border-l border-white/5 bg-white/5 p-8 lg:p-10">
            {/* {roomPrice, extraPrice, totalPrice
            
            
            } */}
            <form
              action={createBooking}
              className="flex h-full flex-col space-y-8"
            >
              <input
                name={"startdate"}
                // readOnly
                defaultValue={startDate || ""}
                type="text"
                className="hidden"
              />
              <input
                name={"endDate"}
                // readOnly
                defaultValue={endDate || ""}
                type="text"
                className="hidden"
              />
              <input
                name={"numNights"}
                // readOnly
                defaultValue={numNights || ""}
                type="text"
                className="hidden"
              />

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                    Guest Count
                  </label>
                  <select
                    name="numGuests"
                    // value={1}
                    defaultValue={2}
                    className="w-full cursor-pointer rounded-sm border border-white/10 bg-black/40 p-4 text-sm text-white transition-all outline-none hover:border-indigo-500/30 focus:border-indigo-500"
                    required
                  >
                    <option value="">Choose number of guests</option>
                    {[...Array(maxCapacity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i + 1 === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Breakfast Toggle */}
                <label
                  htmlFor="breakfast"
                  className="group flex cursor-pointer items-center justify-between rounded-sm border border-white/5 bg-black/20 p-4 transition-all hover:border-indigo-500/30 has-checked:border-white/10 has-checked:bg-black/40 has-checked:hover:border-indigo-500/30"
                >
                  <div className="flex flex-col">
                    <label
                      htmlFor="breakfast"
                      className="cursor-pointer text-[10px] font-bold tracking-[0.2em] text-white uppercase"
                    >
                      Tasty Breakfast
                    </label>
                    <p className="mt-1 text-[10px] tracking-widest text-slate-500 uppercase">
                      {/* {Chef-prepared local delicacies} */}
                      $10 per night{" "}
                      <span className="text-slate-300">(+$200)</span>
                    </p>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="breakfast"
                      name="hasBreakfast"
                      value={String(hasBreakfast)}
                      onChange={() => setHasBreakfast(!hasBreakfast)}
                      className="peer h-6 w-6 cursor-pointer appearance-none rounded-sm border border-white/20 bg-[#0a0f1d] transition-all checked:border-indigo-600 checked:bg-indigo-600"
                    />
                    <HiCheck className="pointer-events-none absolute left-1 hidden h-4 w-4 text-white peer-checked:block" />
                  </div>
                </label>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                    Additional Message
                  </label>
                  <textarea
                    placeholder="Anything we should prepare for your arrival?"
                    rows={6}
                    name="observations"
                    className="w-full resize-none rounded-sm border border-white/10 bg-black/40 px-4 py-4 text-white transition-all outline-none placeholder:text-slate-700 hover:border-indigo-500/30 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="mt-auto pt-8">
                <FormButton
                  loadingText="Reserving Suite..."
                  staticText="Reserve Suite: $5,490"
                  buttonStyle="w-full bg-white text-black hover:bg-indigo-400 hover:text-black py-5 text-[12px] font-bold uppercase tracking-[0.3em] transition-all duration-500 shadow-xl active:scale-[0.98]"
                />
                <p className="mt-4 text-center text-[9px] tracking-widest text-slate-600 uppercase">
                  No credit card required today
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
