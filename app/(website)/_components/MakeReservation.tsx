"use client";

import { createBooking } from "@/app/actions/actions";
import { Room, Settings } from "@/types/rooms";
import { HiCheck, HiOutlineInformationCircle } from "react-icons/hi2";
import FormButton from "./FormButton";
import DateSelector from "./DateSelector";
import { useMemo, useRef, useState, useTransition } from "react";
import { DateRange } from "react-day-picker";
import { adjustDate, formatCurrency } from "@/app/helpers/utils";
import { differenceInDays, eachDayOfInterval, parseISO } from "date-fns";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { signIn } from "next-auth/react";

interface MakeReservationProps {
  room: Room;
  settings: Settings[];
  bookingCount: number;
  bookedDatesRange:
    | {
        startDate: string;
        endDate: string;
      }[]
    | undefined;
  user:
    | {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        guestId?: number | null;
      }
    | null
    | undefined;
}

export default function MakeReservation({
  room,
  settings,
  user,
  bookedDatesRange,
  bookingCount,
}: MakeReservationProps) {
  const [range, setRange] = useState<DateRange | undefined>({
    to: undefined,
    from: undefined,
  });
  const router = useRouter();

  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [numGuests, setNumGuests] = useState(2);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const disabledDates = bookedDatesRange
    ?.map((booking) => {
      return eachDayOfInterval({
        start: parseISO(booking.startDate),
        end: parseISO(booking.endDate),
      });
    })
    .flat();

  const { breakfastPrice, maxBookingLength } = settings[0];

  async function handleBooking(formData: FormData) {
    if (bookingCount >= 4) {
      toast.error(
        "In this demo version, no more than 4 reservations are allowed. To add more, please delete your existing reservations.",
        { duration: 6000 },
      );
      return;
    }

    const toastId = toast.loading("Reserving your suite...");
    startTransition(async () => {
      const result = await createBooking(formData);

      if (!result.success) {
        toast.error(result.message, { id: toastId });
        return;
      }

      // Reset values
      setRange({ to: undefined, from: undefined });
      setHasBreakfast(false);
      setNumGuests(2);
      formRef.current?.reset();

      toast.success(result.message, {
        duration: 5000,
      });

      toast.success(result.message, { id: toastId });
      router.push("/room/confirmedBooking");
    });
  }

  const { maxCapacity, name, discount, regularPrice, id } = room;
  const numNights =
    range?.from && range?.to
      ? Math.max(1, differenceInDays(range.to, range.from))
      : 1;

  const breakfastPricePerNight = breakfastPrice;

  const priceSummary = useMemo(() => {
    const roomPricePerNight = regularPrice - discount;
    const roomsTotalPrice = numNights * roomPricePerNight;

    const extraPrice = hasBreakfast
      ? numNights > 0
        ? breakfastPricePerNight * numNights * numGuests
        : range?.from
          ? breakfastPricePerNight * numGuests
          : 0
      : 0;

    const finalTotal =
      range?.from && !range.to
        ? roomPricePerNight + extraPrice
        : roomsTotalPrice + extraPrice;

    return { roomPricePerNight, roomsTotalPrice, extraPrice, finalTotal };
  }, [
    numNights,
    hasBreakfast,
    regularPrice,
    numGuests,
    discount,
    range?.from,
    range?.to,
    breakfastPricePerNight,
  ]);

  const startDate = adjustDate(range?.from);
  const endDate = adjustDate(range?.to);

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

      <div className="overflow-hidden rounded-lg border border-white/5 bg-[#0a0f1d] shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px]">
          <div className="bg-white/2 p-8 lg:p-12">
            <div className="flex h-full min-h-112.5 w-full flex-col items-center justify-center border-white/10">
              <span className="mb-4 text-[11px] tracking-[0.4em] text-slate-400 uppercase">
                Select Dates
              </span>
              <div className="h-px w-12 bg-white/10"></div>

              <DateSelector
                room={room}
                range={range}
                setRange={setRange}
                hasBreakfast={hasBreakfast}
                numNights={numNights}
                priceSummary={priceSummary}
                maxBookingLength={maxBookingLength}
                isLoading={isPending}
                bookedDates={disabledDates}
              />
            </div>
          </div>

          <div className="border-l border-white/5 bg-white/5 p-8 lg:p-10">
            {user && (
              <form
                action={handleBooking}
                ref={formRef}
                className="flex h-full flex-col space-y-8"
              >
                <input
                  name={"roomId"}
                  readOnly
                  value={id || ""}
                  type="text"
                  className="hidden"
                />
                <input
                  name={"startDate"}
                  readOnly
                  value={startDate || ""}
                  type="text"
                  className="hidden"
                />
                <input
                  name={"endDate"}
                  readOnly
                  value={endDate || ""}
                  type="text"
                  className="hidden"
                />
                <input
                  name={"numNights"}
                  readOnly
                  value={numNights || ""}
                  type="text"
                  className="hidden"
                />
                <input
                  name={"totalPrice"}
                  readOnly
                  value={priceSummary.finalTotal || ""}
                  type="text"
                  className="hidden"
                />
                <input
                  name={"extraPrice"}
                  readOnly
                  value={priceSummary.extraPrice || ""}
                  type="text"
                  className="hidden"
                />
                <input
                  name={"roomPrice"}
                  readOnly
                  value={priceSummary.roomsTotalPrice || ""}
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
                      value={numGuests}
                      onChange={(e) => setNumGuests(Number(e.target.value))}
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
                        className={`cursor-pointer text-[10px] font-bold tracking-[0.2em] text-white uppercase`}
                      >
                        Tasty Breakfast
                      </label>
                      <p className="mt-1 text-[10px] tracking-widest text-slate-500 uppercase">
                        ${breakfastPricePerNight} per night{" "}
                        {range?.from && (
                          <span className="text-slate-300x text-emerald-200">
                            (+$
                            {breakfastPricePerNight * numNights * numGuests})
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="breakfast"
                        name="hasBreakfast"
                        checked={hasBreakfast}
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
                      defaultValue={"sike mf"}
                      name="observations"
                      className="w-full resize-none rounded-sm border border-white/10 bg-black/40 px-4 py-4 text-white transition-all outline-none placeholder:text-slate-700 hover:border-indigo-500/30 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="mt-auto pt-8">
                  {/* <FormButton
                    loadingText="Reserving Suite..."
                    disabled={!range?.from}
                    staticText={
                      range?.from
                        ? `Reserve Suite: ${formatCurrency(priceSummary.finalTotal)}`
                        : "Select date to reserve suite"
                    }
                    buttonStyle={`w-full py-5 text-[12px] font-bold uppercase tracking-[0.3em] transition-all duration-500 shadow-xl 
      ${
        range?.from
          ? "bg-white text-black hover:bg-indigo-400 active:scale-[0.98]"
          : "bg-slate-800 text-slate-500 cursor-not-allowed"
      }`}
                  /> */}

                  <FormButton
                    loadingText="Reserving Suite..."
                    // Disable if no date is selected OR if they hit the limit
                    disabled={!range?.from}
                    staticText={
                      bookingCount >= 4
                        ? "Booking Limit Reached (Max 4)"
                        : range?.from
                          ? `Reserve Suite: ${formatCurrency(priceSummary.finalTotal)}`
                          : "Select date to reserve suite"
                    }
                    buttonStyle={`w-full py-5 text-[12px] font-bold uppercase tracking-[0.3em] transition-all duration-500 shadow-xl 
    ${
      range?.from && bookingCount < 4
        ? "bg-white text-black hover:bg-indigo-400 active:scale-[0.98]"
        : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"
    }`}
                  />
                </div>
              </form>
            )}

            {!user && (
              <div className="flex h-full min-h-100 flex-col items-center justify-center space-y-8 p-6 text-center md:p-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-inner md:h-16 md:w-16">
                  <HiOutlineInformationCircle className="text-2xl text-amber-200/50 md:text-3xl" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-cormorant text-2xl tracking-wide text-white md:text-3xl">
                    Your Sanctuary Awaits
                  </h3>
                  <p className="mx-auto max-w-70 text-[10px] leading-relaxed tracking-[0.2em] text-slate-400 uppercase md:text-[11px]">
                    Please sign in to complete your reservation for this suite.
                  </p>
                </div>

                <div className="h-px w-10 bg-white/10"></div>

                <div className="w-full max-w-[320px] space-y-8">
                  <button
                    onClick={() => router.push("/login")}
                    className="group relative w-full overflow-hidden rounded-sm bg-white py-4 text-[11px] font-bold tracking-[0.3em] text-black uppercase transition-all duration-500 hover:bg-indigo-400 hover:text-white active:scale-[0.98] md:py-5 md:text-[12px]"
                  >
                    <span className="relative z-10">Login to Reserve</span>
                    <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </button>

                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-white/5"></div>
                      <span className="text-[9px] font-bold tracking-[0.3em] text-slate-600 uppercase">
                        Quick Access
                      </span>
                      <div className="h-px flex-1 bg-white/5"></div>
                    </div>

                    <div className="flex justify-center gap-5">
                      {[
                        {
                          icon: <FaGoogle />,
                          provider: "google",
                          color:
                            "hover:text-[#DB4437] hover:border-[#DB4437]/30",
                        },
                        {
                          icon: <FaFacebookF />,
                          provider: "facebook",
                          color:
                            "hover:text-[#1877F2] hover:border-[#1877F2]/30",
                        },
                        {
                          icon: <FaLinkedinIn />,
                          provider: "linkedin",
                          color:
                            "hover:text-[#0A66C2] hover:border-[#0A66C2]/30",
                        },
                      ].map((social) => (
                        <button
                          key={social.provider}
                          onClick={() =>
                            signIn(social.provider, {
                              callbackUrl: window.location.href,
                            })
                          }
                          className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 active:scale-90 md:h-11 md:w-11 ${social.color} hover:bg-white/5`}
                          title={`Sign in with ${social.provider}`}
                        >
                          <span className="text-lg md:text-base">
                            {social.icon}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[8px] font-medium tracking-[0.2em] text-slate-600 uppercase md:text-[9px]">
                  Secure Authenticated Booking
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
