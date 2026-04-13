import Link from "next/link";
import {
  HiCheckCircle,
  HiArrowRight,
  HiOutlineKey,
  HiOutlineUser,
  HiOutlineHomeModern,
} from "react-icons/hi2";

export default function BookingSuccess() {
  return (
    <div className="px-4x flex min-h-[60vh] flex-col items-center justify-center py-12">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/5 bg-[#0a0f1d] shadow-2xl">
        <div className="relative flex flex-col items-center bg-white/5 py-12 text-center">
          <div className="absolute top-0 h-1 w-full bg-linear-to-r from-emerald-500 to-indigo-500" />

          <div className="mb-4 rounded-full bg-emerald-500/10 p-3">
            <HiCheckCircle className="h-16 w-16 text-emerald-500" />
          </div>

          <h1 className="font-cormorant text-5xl text-white">
            Reservation Confirmed
          </h1>
          <p className="mt-2 text-slate-400">
            Your journey with{" "}
            <span className="text-emerald-300">Salmera Haven</span> is
            officially booked.
          </p>
        </div>

        <div className="space-y-1 p-2">
          <Link
            href="/account"
            className="group flex items-center justify-between rounded-md p-6 transition-all hover:bg-white/3"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-sm bg-slate-800 p-2 text-slate-400 transition-all group-hover:bg-indigo-500 group-hover:text-white">
                <HiOutlineKey className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  View Reservations
                </h3>
                <p className="text-xs text-slate-500">
                  Check dates, pricing, and stay details
                </p>
              </div>
            </div>
            <HiArrowRight className="h-5 w-5 text-slate-700 transition-transform group-hover:translate-x-1 group-hover:text-indigo-400" />
          </Link>

          <Link
            href="/account"
            className="group flex items-center justify-between rounded-md p-6 transition-all hover:bg-white/3"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-sm bg-slate-800 p-2 text-slate-400 transition-all group-hover:bg-indigo-500 group-hover:text-white">
                <HiOutlineUser className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Visit Account</h3>
                <p className="text-xs text-slate-500">
                  Manage your profile and preferences
                </p>
              </div>
            </div>
            <HiArrowRight className="h-5 w-5 text-slate-700 transition-transform group-hover:translate-x-1 group-hover:text-indigo-400" />
          </Link>

          <Link
            href="/"
            className="group flex items-center justify-between rounded-md p-6 transition-all hover:bg-white/3"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-sm bg-slate-800 p-2 text-slate-400 transition-all group-hover:bg-indigo-500 group-hover:text-white">
                <HiOutlineHomeModern className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Explore More Suites
                </h3>
                <p className="text-xs text-slate-500">
                  Discover other luxury suites for future stays
                </p>
              </div>
            </div>
            <HiArrowRight className="h-5 w-5 text-slate-700 transition-transform group-hover:translate-x-1 group-hover:text-indigo-400" />
          </Link>
        </div>

        {/* Footer Note */}
        <div className="border-t border-white/5 bg-black/20 py-4 text-center">
          <p className="text-[10px] tracking-widest text-slate-600 uppercase">
            Payment will be handled upon your arrival
          </p>
        </div>
      </div>
    </div>
  );
}
