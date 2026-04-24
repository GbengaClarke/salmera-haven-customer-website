"use client";

import {
  forgotPassword,
  requestPasswordReset,
} from "@/app/actions/authActions";
import { maskEmail } from "@/app/helpers/utils";
import { signIn } from "next-auth/react";
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

  async function handleForgotPassword(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const toastId = toast.loading("Checking email...");

    const formData = new FormData(e.currentTarget.closest("form")!);
    const email = formData.get("email") as string;

    const resetPwInputVerification = await forgotPassword(email);

    if (!resetPwInputVerification?.success) {
      toast.error(resetPwInputVerification.message, { id: toastId });
    }

    if (resetPwInputVerification?.success) {
      //send reset email link and redirect to update-password
      await requestPasswordReset(email);

      toast.success(
        `If an account exists for ${maskEmail(email)}, you will receive a reset link shortly.`,
        {
          id: toastId,
          icon: "📩",
          duration: 8000,
        },
      );
    }
  }

  async function handleSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    const toastId = toast.loading("Verifying your credentials...");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setIsLoading(false);
      toast.error("Invalid credentials. Please, try again", { id: toastId });
    } else {
      toast.success("Welcome back to Salmera Haven!", { id: toastId });
      router.push("/");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSignin} className="space-y-5">
      {/* Email  */}
      <div className="group flex flex-col gap-1">
        <label className="text-sm font-medium text-stone-700 transition-colors group-has-focus:text-blue-500">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            defaultValue={"customer@salmera.com"}
            required
            placeholder="name@example.com"
            className="w-full rounded-lg border border-stone-300 bg-white/50 py-3 pr-4 pl-10 text-stone-700 transition-all outline-none hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <MdOutlineEmail className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-stone-500 opacity-80 transition-colors group-has-focus:text-blue-500" />
        </div>
      </div>

      {/* Password  */}
      <div className="group flex flex-col gap-1">
        <label className="text-sm font-medium text-stone-700 transition-colors group-has-focus:text-blue-500">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            defaultValue={"YouAreWelcome"}
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

      {/* {make sure email input is filled before proceeding} */}
      <button
        type="button"
        onClick={handleForgotPassword}
        className="cursor-pointer text-sm font-semibold text-blue-500 hover:text-blue-700"
      >
        Forgot password?
      </button>

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
