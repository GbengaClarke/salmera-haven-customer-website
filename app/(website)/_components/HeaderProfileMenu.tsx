"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { FaPeopleRoof } from "react-icons/fa6";
import { IoIosLogIn, IoMdClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { MdOutlineHandshake } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { HeaderType } from "./Header";
import { useOutsideInteraction } from "../_hooks/usCloseOutsideInteraction";

function HeaderProfileMenu({ user }: HeaderType) {
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuRef = useRef<HTMLDivElement>(null);

  const { name, image, email } = user || {};
  const firstName = name?.split(" ")[0];

  const disabledClasses = isloading
    ? "pointer-events-none opacity-50 cursor-not-allowed"
    : "";

  // Close menu on click outside or scroll
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  useOutsideInteraction(menuRef, closeMenu, isOpen);

  async function handleSignOut() {
    const toastId = toast.loading("Signing you out...");
    setIsLoading(true);
    // setIsOpen(false); // Close menu immediately??

    try {
      await signOut({ redirect: false });
      toast.success("Signed out successfully", { id: toastId });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex items-center gap-3" ref={menuRef}>
      <Link
        href="/about"
        className={`hidden items-center justify-start gap-2 rounded-md p-3 text-[1rem] font-normal transition-all hover:bg-slate-950/40 hover:text-emerald-200 active:bg-slate-950/60 active:text-emerald-200 md:flex ${disabledClasses} ${pathname === "/about" ? "bg-slate-950/40 text-emerald-200" : ""}`}
      >
        <FaPeopleRoof />
        <span>About Us</span>
      </Link>

      <Link
        href={name ? "/account" : "/login"}
        className={`group relative flex items-center transition-all md:cursor-pointer md:gap-2 md:rounded-full md:bg-indigo-900 md:px-2 md:py-1 md:hover:bg-indigo-900/80 md:hover:text-emerald-100 ${disabledClasses}`}
      >
        <div className="pointer-events-none absolute top-15 right-0 z-50 hidden translate-y-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium whitespace-nowrap text-slate-300 opacity-0 shadow-2xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">
          {name ? "Manage your account" : "Login or Create Account"}
          <div className="absolute -top-1 right-4 h-2 w-2 rotate-45 bg-slate-900"></div>
        </div>

        <div className="h-8 w-8 overflow-hidden rounded-full border border-white/10">
          <Image
            src={image || "/default-user.jpg"}
            width={100}
            height={100}
            alt="user-image"
            className={`object-cover transition-opacity duration-300 ${!image ? "opacity-70" : "opacity-100"}`}
            priority
          />
        </div>

        <div className="hidden text-[1rem] font-medium md:block">
          {name ? name : "Login/Signup"}
        </div>
      </Link>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button
          disabled={isloading}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-50 cursor-pointer p-2 transition-all hover:text-indigo-300 active:text-indigo-300 ${isloading ? "opacity-50" : ""}`}
        >
          {isOpen ? <IoMdClose size={28} /> : <IoMenu size={28} />}
        </button>

        <div
          className={`absolute top-16 right-0 z-40 w-64 rounded-xl border border-white/10 bg-slate-900/90 p-4 font-semibold shadow-2xl  transition-all duration-300 ease-in-out ${
            isOpen
              ? "translate-x-0 opacity-100 backdrop-blur-md"
              : "pointer-events-none translate-x-10 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2">
            <h3 className="mb-2 border-b border-white/5 pb-2 text-center text-sm font-semibold tracking-wide text-slate-500 uppercase">
              Hello, {firstName || "Guest"}
            </h3>

            <div className={`flex flex-col gap-2 ${disabledClasses}`}>
              {!email ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/5 hover:text-emerald-200"
                  >
                    <IoIosLogIn className="text-xl" />
                    <span>Log In</span>
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/5 hover:text-emerald-200"
                  >
                    <MdOutlineHandshake className="text-xl" />
                    <span>Sign Up</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/account"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/5 hover:text-emerald-200 ${pathname === "/account" ? "bg-white/10 text-emerald-200" : ""}`}
                  >
                    <FaRegUser className="text-lg" />
                    <span>My Account</span>
                  </Link>

                  <button
                    disabled={isloading}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-red-500/10 hover:text-red-400"
                    onClick={handleSignOut}
                  >
                    <VscSignOut className="text-xl" />
                    <span>{isloading ? "Signing Out..." : "Sign Out"}</span>
                  </button>
                </>
              )}

              <div className="mt-2 border-t border-white/5 pt-2">
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/5 hover:text-emerald-200 ${pathname === "/about" ? "bg-white/10 text-emerald-200" : ""}`}
                >
                  <FaPeopleRoof className="text-xl" />
                  <span>Read About Us</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default HeaderProfileMenu;
