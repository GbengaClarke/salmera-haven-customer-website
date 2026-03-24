"use client";

import { signIn } from "next-auth/react";
import { FaApple, FaFacebook, FaLinkedin } from "react-icons/fa";
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

      {/* Facebook */}
      <button
        type="button"
        onClick={() => signIn("facebook", { callbackUrl: "/" })}
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-stone-400/70 py-3 font-semibold text-stone-700 transition hover:bg-stone-300/60 active:scale-[0.98]"
      >
        <FaFacebook className="text-blue-600" />
        Sign in with Facebook
      </button>

      {/* linkedIn */}
      <button
        onClick={() => signIn("linkedin", { callbackUrl: "/" })}
        type="button"
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-stone-400/70 py-3 font-semibold text-stone-700 transition hover:bg-stone-300/60 active:scale-[0.98]"
      >
        <FaLinkedin color="#0077B5" />
        Sign in with LinkedIn
      </button>
    </div>
  );
}

export default SocialLogin;
