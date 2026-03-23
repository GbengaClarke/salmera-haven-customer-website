"use client";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-5">
      {/* Email Field */}
      <div className="group flex flex-col gap-1">
        <label className="text-sm font-medium text-stone-700 transition-colors group-has-focus:text-blue-500">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            required
            placeholder="name@example.com"
            className="w-full rounded-lg border border-stone-300 bg-white/50 py-3 pr-4 pl-10 text-stone-700 transition-all outline-none hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <MdOutlineEmail className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-stone-500 opacity-80 transition-colors group-has-focus:text-blue-500" />
        </div>
      </div>

      {/* Password Field */}
      <div className="group flex flex-col gap-1">
        <label className="text-sm font-medium text-stone-700 transition-colors group-has-focus:text-blue-500">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            className="w-full rounded-lg border border-stone-300 bg-white/50 py-3 pr-12 pl-10 text-stone-700 transition-all outline-none hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <FiLock className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-stone-500 opacity-80 transition-colors group-has-focus:text-blue-500" />

          <button
            type="button"
            onPointerDown={(e) => e.preventDefault()}
            onClick={() => setShowPassword(!showPassword)}
            className="p-2cursor-pointer absolute top-1/2 right-2 z-50 -translate-y-1/2 cursor-pointer p-2 text-stone-500 opacity-80 transition-all hover:text-stone-700 hover:opacity-100 active:scale-90"
          >
            {showPassword ? (
              <FaRegEye className="h-5 w-5" />
            ) : (
              <FaRegEyeSlash className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-blue-500 py-3 font-semibold text-white transition-all hover:bg-blue-600 active:scale-[0.98]"
      >
        Sign In
      </button>
    </form>
  );
}

export default SignupForm;
