"use client";

import { login } from "@/app/actions/authActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // async function handleSignin(formData: FormData) {
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;

  //   setIsLoading(true);
  //   const toastId = toast.loading("Signing you in...");

  //   // Call your Supabase login logic (Server Action)
  //   const result = await login(email, password);

  //   if (!result.success) {
  //     toast.error(result.message, { id: toastId });
  //     setIsLoading(false);
  //   } else {
  //     toast.success("You are logged in!", { id: toastId });
  //     router.push("/");
  //     router.refresh();
  //   }
  // }

  async function handleSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Stop the default reload

    setIsLoading(true);
    const toastId = toast.loading("Verifying your credentials...");

    // 2. Extract formData manually from the form
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await login(email, password);

      if (!result.success) {
        toast.error(result.message, { id: toastId });
        setIsLoading(false); // Only stop loading if it failed
      } else {
        toast.success("Welcome back to Salmera Haven!", {
          id: toastId,
          duration: 3000,
        });
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      toast.error("An error occurred", { id: toastId });
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSignin} className="space-y-5">
      {/* <form action={handleSignin} className="space-y-5"> */}
      {/* Email Field */}
      <div className="group flex flex-col gap-1">
        <label className="text-sm font-medium text-stone-700 transition-colors group-has-focus:text-blue-500">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            defaultValue={"gbengaclarke@gmail.com"}
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
            defaultValue={"aaa1%AAA"}
            name="password"
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

      <div className="flex items-center text-sm">
        <Link
          href="#"
          className="font-semibold text-blue-500 hover:text-blue-600"
        >
          Forgot password?
        </Link>
      </div>

      {/* <button
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-blue-500 py-3 font-semibold text-white transition-all hover:bg-blue-600 active:scale-[0.98]"
      >
        Sign In
      </button> */}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full cursor-pointer rounded-lg py-3 font-semibold text-white transition-all ${isLoading ? "cursor-not-allowed bg-blue-300" : "bg-blue-500 hover:bg-blue-600 active:scale-[0.98]"}`}
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
