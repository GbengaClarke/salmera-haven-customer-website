"use client";

import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

export default function AccountPage() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Link
        href="/account/reservations"
        className="group relative overflow-hidden rounded-sm border border-white/5 bg-slate-900/40 p-8 transition-all hover:bg-slate-900/60 active:scale-95"
      >
        <div className="mb-16 flex items-center justify-between">
          <div className="rounded-full bg-emerald-500/10 p-4 text-emerald-500">
            <HiOutlineArrowRight
              size={24}
              className="-rotate-45 transition-transform group-hover:rotate-0"
            />
          </div>
        </div>
        <h3 className="mb-2 text-2xl font-bold">Your Bookings</h3>
        <p className="text-sm leading-relaxed text-slate-400">
          Review your past stays and manage upcoming check-ins at our premium
          suites.
        </p>
      </Link>

      <Link
        href="/account/profile"
        className="group relative overflow-hidden rounded-sm border border-white/5 bg-slate-900/40 p-8 transition-all hover:bg-slate-900/60 active:scale-95"
      >
        <div className="mb-16 flex items-center justify-between">
          <div className="rounded-full bg-indigo-500/10 p-4 text-indigo-500">
            <HiOutlineArrowRight
              size={24}
              className="-rotate-45 transition-transform group-hover:rotate-0"
            />
          </div>
        </div>
        <h3 className="mb-2 text-2xl font-bold">Guest Profile</h3>
        <p className="text-sm leading-relaxed text-slate-400">
          Update your security settings, contact information, and personal suite
          preferences.
        </p>
      </Link>
    </div>
  );
}
