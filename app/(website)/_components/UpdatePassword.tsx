"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiLock } from "react-icons/fi";

async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Password updated successfully! Proceed to log in.",
  };
}

function UpdatePassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //Validation Logic
  const checks = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "A capital letter", met: /[A-Z]/.test(password) },
    { label: "A number", met: /[0-9]/.test(password) },
    { label: "A special character", met: /[^A-Za-z0-9]/.test(password) },
    {
      label: "Passwords match",
      met: password === confirmPassword && password !== "",
    },
  ];

  const allChecksMet = checks.every((check) => check.met);

  async function handleUpdatePassword() {
    if (!allChecksMet) return;
    setIsLoading(true);

    const toastId = toast.loading("Updating details");

    const res = await updatePassword(confirmPassword);

    if (res.success) {
      toast.success(res.message, { id: toastId, duration: 4000 });

      router.push("/login");
    } else {
      toast.error(res.message || "An error occurred", { id: toastId });
    }

    setConfirmPassword("");
    setPassword("");
    setIsLoading(false);
  }

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-4">
        {/* {first password} */}
        <div className="group flex flex-col gap-1">
          <label className="text-sm font-medium text-stone-700 transition-colors group-has-focus:text-blue-500">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(() => e.target.value)}
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
          <p className="text-sm text-stone-500">
            Password should must include at least one:
          </p>

          <div className="-space-y-1">
            {checks.map((check, index) => (
              <div
                key={index}
                className={`flex ${check.met ? "text-emerald-500" : "text-stone-500"} items-center gap-1 text-sm`}
              >
                <FaCheckCircle />
                <span className="pb-1">- {check.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* {confirm password} */}
        <div className="group flex flex-col gap-1">
          <label className="text-sm font-medium text-stone-700 transition-colors group-has-focus:text-blue-500">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              disabled={isLoading}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(() => e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-stone-300 bg-white/50 py-3 pr-12 pl-10 text-stone-700 transition-all outline-none hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <FiLock className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-stone-500 opacity-80 transition-colors group-has-focus:text-blue-500" />

            <button
              type="button"
              disabled={isLoading}
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="p-2cursor-pointer absolute top-1/2 right-2 z-50 -translate-y-1/2 cursor-pointer p-2 text-stone-500 opacity-80 transition-all hover:text-stone-700 hover:opacity-100 active:scale-90"
            >
              {showConfirmPassword ? (
                <FaRegEye className="h-5 w-5" />
              ) : (
                <FaRegEyeSlash className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleUpdatePassword}
        disabled={isLoading || !allChecksMet}
        className={`mt-4 w-full rounded-lg py-3 font-semibold text-white transition-all ${
          isLoading || !allChecksMet
            ? "cursor-not-allowed bg-blue-300 opacity-70"
            : "cursor-pointer bg-blue-600 shadow-md hover:bg-blue-700 active:scale-[0.98]"
        }`}
      >
        {isLoading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}

export default UpdatePassword;
