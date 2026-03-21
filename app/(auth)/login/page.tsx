import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import authBg from "../../../public/auth-pic.jpg";
import AuthFooter from "@/app/(website)/_components/AuthFooter";
import CompanyLogo from "@/app/(website)/_components/CompanyLogo";
import LoginForm from "@/app/(website)/_components/LoginForm";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import BackButton from "@/app/(website)/_components/BackButton";

export const metadata: Metadata = {
  title: "Login",
  description: "Access your Salmera Haven account",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-stone-900">
      {/*  Optimized Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={authBg}
          alt="background image"
          fill
          priority
          placeholder="blur"
          className="object-cover"
        />
        {/* Gradient Overlayv at the bottom */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/40 to-black/70" />
      </div>

      {/* Form & Logo container*/}
      <div className="relative z-10 mt-8 flex w-full flex-1 flex-col items-center justify-center px-6 md:flex-row md:items-center md:gap-12">
        {/* Company name and logo */}
        <CompanyLogo
          contStyle="md:mb-0 mb-8 gap-1.5 md:text-left justify-center"
          textStyle="text-4xl font-bold text-white"
        />

        {/* Login Form Card */}
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/20 bg-white/90 p-8 shadow-2xl backdrop-blur-md">
            <div className="mb-6">
              <div className="hidden md:block">
                <CompanyLogo
                  contStyle="gap-1 justify-items-start"
                  textStyle="text-1xl font-bold text-blue-950"
                  imageSize="h-8 w-10"
                />
              </div>

              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-stone-800">
                  Sign in
                </h1>

                <BackButton />
              </div>
              <p className="mt-2 font-semibold text-stone-800">
                New user?{" "}
                <Link
                  className="text-blue-600 hover:underline"
                  href={"/signup"}
                >
                  Create account
                </Link>
              </p>
            </div>

            <LoginForm />

            <div className="relative mt-8 h-0.5 w-full rounded-2xl bg-stone-400 opacity-70">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-200 px-1.5 text-xs font-semibold text-stone-900 uppercase">
                or
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {/* Google */}
              <button
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
          </div>
        </div>
      </div>

      {/* Footer */}
      <AuthFooter />
    </main>
  );
}
