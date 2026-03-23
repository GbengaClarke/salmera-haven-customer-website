"use client";

import { signIn } from "next-auth/react";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function SocialLogin() {
  return (
    <div className="mt-6 space-y-3">
      {/* Google */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        type="button"
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-stone-400/70 py-3 font-semibold text-stone-700 transition hover:bg-stone-300/60 active:scale-[0.98]"
      >
        <FcGoogle />
        Sign in with Google
      </button>

      {/* Apple */}
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-stone-400/70 py-3 font-semibold text-stone-700 transition hover:bg-stone-300/60 active:scale-[0.98]"
      >
        <FaApple />
        Sign in with Apple
      </button>

      {/* Facebook */}
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-stone-400/70 py-3 font-semibold text-stone-700 transition hover:bg-stone-300/60 active:scale-[0.98]"
      >
        <FaFacebook className="text-blue-600" />
        Sign in with Facebook
      </button>
    </div>
  );
}

export default SocialLogin;
