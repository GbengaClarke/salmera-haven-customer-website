import { Metadata } from "next";
import Image from "next/image";
import authBg from "../../../public/auth-pic.jpg";
import AuthFooter from "@/app/(website)/_components/AuthFooter";
import CompanyLogo from "@/app/(website)/_components/CompanyLogo";
import BackButton from "@/app/(website)/_components/BackButton";
import UpdatePassword from "@/app/(website)/_components/UpdatePassword";

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
      <div className="relative z-10 mt-8 mr-[75rem] flex w-full flex-1 flex-col items-center justify-center px-6 md:flex-row md:items-center md:gap-12">
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
                  Update Password
                </h1>

                <BackButton />
              </div>
              <p className="mt-2 text-sm text-stone-600">
                Update your password to keep your account secure and private.
              </p>
            </div>

            <UpdatePassword />
          </div>
        </div>
      </div>

      {/* Footer */}
      <AuthFooter />
    </main>
  );
}
