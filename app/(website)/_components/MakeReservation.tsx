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
  settings: Settings[] | null | undefined;
  bookingCount: number;
  bookedDatesRange: { startDate: string; endDate: string }[] | undefined;
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
  const [numGuests, setNumGuests] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const hasSettings = settings && settings.length > 0;
  const { breakfastPrice = 0, maxBookingLength = 90 } = hasSettings
    ? settings[0]
    : { breakfastPrice: 0, maxBookingLength: 0 };

  const disabledDates = bookedDatesRange
    ?.map((booking) => {
      return eachDayOfInterval({
        start: parseISO(booking.startDate),
        end: parseISO(booking.endDate),
      });
    })
    .flat();

  const { maxCapacity, name, discount, regularPrice, id } = room;

  const numNights =
    range?.from && range?.to
      ? Math.max(1, differenceInDays(range.to, range.from))
      : 1;

  const priceSummary = useMemo(() => {
    const roomPricePerNight = regularPrice - discount;
    const roomsTotalPrice = numNights * roomPricePerNight;
    const extraPrice = hasBreakfast
      ? breakfastPrice * numNights * numGuests
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
    range,
    breakfastPrice,
  ]);

  const startDate = adjustDate(range?.from);
  const endDate = adjustDate(range?.to);

  async function handleBooking(formData: FormData) {
    if (bookingCount >= 3) {
      toast.error(
        "In this demo version, no more than 3 reservations are allowed. To add more, please delete your existing reservations.",
        { duration: 5000 },
      );
      return;
    }

    const toastId = toast.loading("Reserving your suite...");
    startTransition(async () => {
      const result = await createBooking(formData);

      if (!result.success) {
        toast.error(result.message, { id: toastId, duration: 6000 });
        return;
      }

      toast.success(result.message, { id: toastId, duration: 6000 });
      setRange({ to: undefined, from: undefined });
      formRef.current?.reset();
      router.push("/room/confirmedBooking");
    });
  }

  if (!hasSettings) {
    return (
      <div className="mt-12 rounded-sm border border-red-500/10 bg-red-500/5 p-16 text-center">
        <HiOutlineInformationCircle
          size={40}
          className="mx-auto mb-4 text-red-500/40"
        />
        <h3 className="font-cormorant text-3xl text-white">System Notice</h3>
        <p className="mx-auto mt-2 max-w-md text-[10px] tracking-widest text-slate-400 uppercase">
          We are currently updating our pricing systems. Online booking is
          temporarily unavailable, but our concierge is ready to assist you.
        </p>
      </div>
    );
  }

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
      </div>

      <div className="overflow-hidden rounded-lg border border-white/5 bg-[#0a0f1d] shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px]">
          <div className="bg-white/2 p-8 lg:p-12">
            <div className="flex flex-col items-center justify-center">
              <span className="mb-4 text-[11px] tracking-[0.4em] text-slate-400 uppercase">
                Select Dates
              </span>
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
            {user ? (
              <form
                action={handleBooking}
                ref={formRef}
                className="flex h-full flex-col space-y-8"
              >
                <input type="hidden" name="roomId" value={id} />
                <input type="hidden" name="startDate" value={startDate || ""} />
                <input type="hidden" name="endDate" value={endDate || ""} />
                <input type="hidden" name="numNights" value={numNights} />
                <input
                  type="hidden"
                  name="totalPrice"
                  value={priceSummary.finalTotal}
                />

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                      Guest Count
                    </label>
                    <select
                      name="numGuests"
                      value={numGuests}
                      required
                      onChange={(e) => setNumGuests(Number(e.target.value))}
                      className="w-full cursor-pointer rounded-sm border border-white/10 bg-black/40 p-4 text-sm text-white outline-none hover:border-indigo-500/30"
                    >
                      <option value={""}>Number of Guests</option>
                      {[...Array(maxCapacity)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* <label className="group flex cursor-pointer items-center justify-between rounded-sm border border-white/5 bg-black/20 p-4 transition-all hover:border-indigo-500/30">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">
                        Tasty Breakfast
                      </span>
                      <p className="mt-1 text-[10px] tracking-widest text-slate-500 uppercase">
                        ${breakfastPrice} per night
                        {range?.from && (
                          <span className="text-emerald-200">
                            {" "}
                            (+${breakfastPrice * numNights * numGuests})
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        name="hasBreakfast"
                        checked={hasBreakfast}
                        onChange={() => setHasBreakfast(!hasBreakfast)}
                        className="peer h-6 w-6 appearance-none rounded-sm border border-white/20 bg-[#0a0f1d] checked:bg-indigo-600"
                      />
                      <HiCheck className="pointer-events-none absolute left-1 hidden h-4 w-4 text-white peer-checked:block" />
                    </div>
                  </label> */}

                  <label className="group flex cursor-pointer items-center justify-between rounded-sm border border-white/5 bg-black/20 p-4 transition-all hover:border-indigo-500/30">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">
                        Tasty Breakfast
                      </span>
                      {/* Added h-8 or leading-loose to ensure the container height remains constant */}
                      <p className="mt-1 min-h-[20px] text-[10px] leading-normal tracking-widest text-slate-500 uppercase">
                        ${breakfastPrice} per night
                        {range?.from && (
                          <span className="block text-emerald-200 md:inline">
                            {" "}
                            (+${breakfastPrice * numNights * numGuests})
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        name="hasBreakfast"
                        checked={hasBreakfast}
                        onChange={() => setHasBreakfast(!hasBreakfast)}
                        className="peer h-6 w-6 appearance-none rounded-sm border border-white/20 bg-[#0a0f1d] transition-colors checked:bg-indigo-600"
                      />
                      <HiCheck className="pointer-events-none absolute left-1 hidden h-4 w-4 text-white peer-checked:block" />
                    </div>
                  </label>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                      Special Requirements
                    </label>
                    <textarea
                      name="observations"
                      rows={4}
                      placeholder="Any specific requests?"
                      className="w-full resize-none rounded-sm border border-white/10 bg-black/40 px-4 py-4 text-white outline-none placeholder:text-slate-700 hover:border-indigo-500/30"
                    />
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <FormButton
                    loadingText="Processing..."
                    disabled={!range?.from}
                    staticText={
                      bookingCount >= 3
                        ? "Booking Limit Reached (Max 3)"
                        : range?.from
                          ? `Reserve: ${formatCurrency(priceSummary.finalTotal)}`
                          : "Select Dates to Continue"
                    }
                    buttonStyle={`w-full py-5 text-[12px] font-bold uppercase tracking-[0.3em] transition-all 
                      ${range?.from && bookingCount < 3 ? "bg-white text-black hover:bg-indigo-400" : "bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed"}`}
                  />
                </div>
              </form>
            ) : (
              <div className="flex h-full flex-col items-center justify-center space-y-8 p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <HiOutlineInformationCircle className="text-3xl text-amber-200/50" />
                </div>
                <div>
                  <h3 className="font-cormorant text-3xl text-white">
                    Your Sanctuary Awaits
                  </h3>
                  <p className="mt-2 text-[10px] tracking-[0.2em] text-slate-400 uppercase">
                    Sign in to complete your reservation.
                  </p>
                </div>

                <div className="w-full max-w-[320px] space-y-8">
                  <button
                    onClick={() => router.push("/login")}
                    className="w-full bg-white py-5 text-[11px] font-bold tracking-[0.3em] text-black uppercase transition-all hover:bg-indigo-400 hover:text-white"
                  >
                    Login to Reserve
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
                          className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 ${social.color} hover:bg-white/5`}
                        >
                          <span className="text-base">{social.icon}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[9px] font-medium tracking-[0.2em] text-slate-600 uppercase">
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
