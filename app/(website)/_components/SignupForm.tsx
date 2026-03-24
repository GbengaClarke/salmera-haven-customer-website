"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

interface SignupFormProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

function SignupForm({ step, setStep }: SignupFormProps) {
  const [name, setName] = useState("Gbenga Clarke");
  const [email, setEmail] = useState("gbengaclarke@gmail.com");
  const [otp, setOtp] = useState("");

  // Validation Logic
  const isNameValid = name.trim().split(/\s+/).length >= 2; //two names
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isNameValid && isEmailValid;

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      {step === 1 && (
        <>
          {/* Name Field */}
          <div className="group flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700 transition-colors group-has-focus:text-blue-500">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First and Last Name"
                className="w-full rounded-lg border border-stone-300 bg-white/50 py-3 pr-4 pl-10 text-stone-700 transition-all outline-none hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <FiUser className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-stone-500 opacity-80 transition-colors group-has-focus:text-blue-500" />
            </div>
          </div>

          {/* Email Field */}
          <div className="group flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700 transition-colors group-has-focus:text-blue-500">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-lg border border-stone-300 bg-white/50 py-3 pr-12 pl-10 text-stone-700 transition-all outline-none hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <MdOutlineEmail className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-stone-500 opacity-80 transition-colors group-has-focus:text-blue-500" />
            </div>
          </div>
        </>
      )}

      {/* STEP 2: OTP Verification */}
      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-stone-900">
            Hello <span className="text-emerald-500">{name.split(" ")[0]}</span>
            ,
          </p>
          <p className="text-sm text-stone-900">
            We sent a 6-digit One-Time Password (OTP) to{" "}
            <span className="font-semibold text-emerald-500">{email}</span>.
            Please check your inbox or spam folder to retrieve the code.
          </p>
          <div className="relative">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="000000"
              className="w-full rounded-lg border border-stone-300 py-4 text-center font-mono text-2xl tracking-[1em] outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-sm text-blue-500 hover:underline"
          >
            Edit email address
          </button>
        </div>
      )}

      <button
        onClick={() => {
          if (step >= 3) return;
          setStep((step) => step + 1);
        }}
        type="button"
        disabled={!isFormValid}
        className={`w-full rounded-lg py-3 font-semibold text-white transition-all active:scale-[0.98] ${
          isFormValid
            ? "cursor-pointer bg-blue-600 shadow-md hover:bg-blue-700"
            : "cursor-not-allowed bg-blue-300 opacity-70"
        }`}
      >
        {step === 1 && "Next"}
        {step === 2 && "Proceed"}
        {step === 3 && "Confirm"}
      </button>
    </form>
  );
}

export default SignupForm;
