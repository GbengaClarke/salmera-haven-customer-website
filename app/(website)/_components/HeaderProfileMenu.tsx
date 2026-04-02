"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPeopleRoof } from "react-icons/fa6";
import { IoIosLogIn, IoMdClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { MdOutlineHandshake } from "react-icons/md";

function HeaderProfileMenu() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex items-center gap-3">
      {/* <div>hdjd</div> */}
      <div className="h-8 w-8 overflow-hidden rounded-full">
        {/* {make opacity 70 only when there is no dp} */}
        <Image
          src="/default-user.jpg"
          width={100}
          height={100}
          alt="user-image"
          className="object-contain opacity-70"
        />
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 cursor-pointer p-2 transition-all hover:text-indigo-300 active:text-indigo-300"
        >
          {isOpen ? <IoMdClose size={28} /> : <IoMenu size={28} />}
        </button>

        {/* Menu Overlay */}
        <div
          className={`fixed top-19 right-3 z-40 rounded-md bg-slate-900 p-5 backdrop-blur-md transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-60"
          }`}
        >
          <nav className="flex h-full flex-col gap-1">
            <h3 className="mb-1 text-center">Hello, Guest</h3>
            <div className="flex h-full flex-col gap-2">
              <Link
                href="#"
                className="flex items-center justify-start gap-2 rounded-md p-3 font-normal transition-all hover:bg-slate-950/60 active:bg-slate-950/60"
              >
                <IoIosLogIn />
                <span>Log in</span>
              </Link>
              <Link
                href="#"
                className="flex items-center justify-start gap-2 rounded-md p-3 font-normal transition-all hover:bg-slate-950/60 active:bg-slate-950/60"
              >
                <MdOutlineHandshake />
                <span>Sign up</span>
              </Link>

              <div>
                <Link
                  href="#"
                  className="flex items-center justify-start gap-3 rounded-md border-t border-emerald-700/50 p-3 font-normal transition-all hover:bg-slate-950/60 active:bg-slate-950/60"
                >
                  <FaPeopleRoof />
                  <span>Read about us</span>
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
