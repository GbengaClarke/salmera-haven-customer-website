"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import {
  HiOutlineCalendarDays,
  HiOutlineUserCircle,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineSquares2X2,
} from "react-icons/hi2";

const navItems = [
  {
    name: "Overview",
    href: "/account",
    icon: <HiOutlineSquares2X2 size={20} />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <HiOutlineCalendarDays size={20} />,
  },
  {
    name: "Profile",
    href: "/account/profile",
    icon: <HiOutlineUserCircle size={20} />,
  },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    const toastId = toast.loading("Logging out...");
    startTransition(async () => {
      try {
        await signOut({ redirectTo: "/login" });
        toast.success("You have been logged out!", { id: toastId });
      } catch (error) {
        console.error(error);
        toast.error("Logout failed!", { id: toastId });
      }
    });
  }

  return (
    <div className="mb-10 md:mb-15">
      <div className="mb-6 flex flex-col items-start justify-between sm:mb-0 md:flex-row md:items-end">
        <button
          onClick={handleLogout}
          className="ml-auto flex items-center gap-5 rounded-sm border border-white/5 bg-white/5 px-6 py-3 text-[10px] font-bold tracking-[0.2em] text-red-200/70 uppercase transition-all hover:bg-red-500/10 hover:text-red-400 active:scale-90"
        >
          <HiOutlineArrowLeftOnRectangle size={18} />
          {isPending ? "Processing..." : "Logout"}
        </button>
      </div>

      <nav className="no-scrollbar mb-10 flex gap-2 overflow-x-auto border-b border-white/5 pb-[.8rem]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                isActive
                  ? "text-emerald-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {item.icon}
              {item.name}
              {isActive && (
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <main className="w-full transition-opacity duration-500">{children}</main>
    </div>
  );
}
