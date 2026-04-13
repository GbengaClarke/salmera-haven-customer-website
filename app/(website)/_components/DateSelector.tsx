import { DateRange, DayPicker } from "react-day-picker";
import { isPast, isSameDay } from "date-fns";
import { Room } from "@/types/rooms";
import "react-day-picker/dist/style.css";
import { formatCurrency } from "@/app/helpers/utils";

interface DateSelectorProps {
  room: Room;
  bookedDates?: Date[];
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
  hasBreakfast: boolean;
  numNights: number;
  maxBookingLength: number;
  isLoading: boolean;

  priceSummary: {
    roomPricePerNight: number;
    roomsTotalPrice: number;
    extraPrice: number;
    finalTotal: number;
  };
}

export default function DateSelector({
  bookedDates = [],
  range,
  setRange,
  hasBreakfast,
  numNights,
  priceSummary,
  maxBookingLength,
  isLoading,
}: DateSelectorProps) {
  const { roomPricePerNight, roomsTotalPrice, extraPrice, finalTotal } =
    priceSummary;

  return (
    <div className="mt-2 flex flex-col">
      <DayPicker
        className="place-self-center pt-4"
        mode="range"
        onSelect={setRange}
        selected={range}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear(), 11)}
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="mt-8 flex w-full flex-col gap-6 rounded-lg border-t-2 border-indigo-500 bg-indigo-950 px-5 py-6 text-white shadow-[0_20px_50px_rgba(8,112,184,0.1)] md:flex-row md:items-center md:justify-between md:px-8 md:py-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.25em] text-indigo-300 uppercase">
              Rate
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-400 md:text-2xl">
                ${roomPricePerNight}
              </span>
              <span className="text-[10px] font-semibold text-indigo-300/60 uppercase">
                / night
              </span>
            </div>
          </div>

          {numNights >= 0 && (
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              {hasBreakfast && !!range?.from && (
                <div className="rounded-md border border-white/10 bg-white/5 px-4 py-3 md:border-0 md:border-l md:border-white/10 md:bg-transparent md:px-0 md:py-0 md:pl-6">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-indigo-200 uppercase">
                    Stay
                  </span>
                  <div className="text-lg font-bold text-white md:text-xl">
                    $
                    {range?.from && !range.to
                      ? roomPricePerNight
                      : roomsTotalPrice}
                  </div>
                </div>
              )}

              {hasBreakfast && !!range?.from && (
                <div className="rounded-md border border-indigo-500/20 bg-indigo-400/10 px-4 py-3 md:border-0 md:border-l md:border-white/10 md:bg-transparent md:px-0 md:py-0 md:pl-6">
                  <span className="text-indigo-200x text-[10px] font-bold tracking-[0.25em] text-indigo-200 uppercase">
                    Breakfast
                  </span>
                  <div className="text-lg font-bold text-white md:text-xl">
                    +${extraPrice}
                  </div>
                </div>
              )}

              {roomPricePerNight !== finalTotal && !!finalTotal && (
                <div className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-5 py-3 md:border-0 md:border-l md:border-white/20 md:bg-transparent md:px-0 md:py-0 md:pl-8">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-400 uppercase">
                    Total{" "}
                    {range?.from && range?.to && (
                      <span className="whitespace-nowrap">
                        ({numNights} {numNights <= 1 ? "Night" : "Nights"})
                      </span>
                    )}
                  </span>
                  <div className="text-2xl font-black text-emerald-200 md:text-3xl md:tracking-tighter md:italic">
                    {formatCurrency(finalTotal)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex w-full items-center justify-end border-t border-white/10 pt-5 md:w-auto md:border-none md:pt-0">
          {range?.from || range?.to ? (
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setRange({ from: undefined, to: undefined })}
              className={`w-full rounded-md border-indigo-400 px-8 py-3 text-[10px] font-bold tracking-[0.25em] text-white uppercase transition-all md:w-auto ${
                isLoading
                  ? "cursor-not-allowed bg-indigo-500/10 opacity-50 grayscale"
                  : "bg-indigo-500/20 hover:bg-indigo-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] active:scale-95"
              }`}
            >
              {isLoading ? "Awaiting Reservation..." : "Clear Selection"}
            </button>
          ) : (
            <span className="animate-pulse text-[10px] font-bold tracking-[0.3em] text-indigo-300/80 uppercase">
              Select your dates
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
