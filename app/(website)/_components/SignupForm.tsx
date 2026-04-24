"use client";
import { sendEmailOTP } from "@/app/actions/authActions";
import { maskEmail, otpGenerator } from "@/app/helpers/utils";
import { getExistingProfile, registerUser, verifyOTP } from "@/lib/dataApi";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiLock, FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

interface SignupFormProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

function SignupForm({ step, setStep }: SignupFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [userOtp, setuserOtp] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 3 Validation Logic
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

  // Validation Logic of step 1 and 2
  const isNameValid = fullName.trim().split(/\s+/).length >= 2; //two names
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isNameValid && isEmailValid;
  const is6digits = userOtp.length === 6;
  const validStep2 = isFormValid && is6digits;

  const disableButton =
    step === 1 ? !isFormValid : step === 2 ? !validStep2 : !allChecksMet;

  async function handleNext() {
    setIsLoading(true);

    const loadingName = step === 1 ? "Checking mail..." : "Verifying details";
    const toastId = toast.loading(loadingName);

    if (step === 1) {
      const genOtp = otpGenerator();

      const profile = await getExistingProfile(email);

      if (profile.itExists) {
        toast("An account with this email already exists. Proceed to log in.", {
          id: toastId,
          icon: "⚠️",
          duration: 6000,
        });

        router.push("/login");

        setIsLoading(false);

        return;
      }

      if (!profile.itExists) {
        const res = await sendEmailOTP(genOtp, email);

        if (res.success) {
          toast.success(res.message, { id: toastId });
          setStep(2);
          setIsLoading(false);
        } else {
          toast.error(res.message, { id: toastId });
          setIsLoading(false);
        }
      }
    }

    if (step === 2) {
      setIsLoading(true);
      const res = await verifyOTP(email, userOtp);

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setStep(3);
      } else {
        toast.error(res.message, { id: toastId });
      }
      setIsLoading(false);
    }

    if (step === 3) {
      setIsLoading(true);

      const res = await registerUser({
        email,
        password,
        fullName,
      });

      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 4000 });

        router.push("/login");
      } else {
        toast.error(res.message, { id: toastId });
      }

      setConfirmPassword("");
      setPassword("");
      setIsLoading(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      {/* STEP 1: user data */}

      {step === 1 && (
        <>
          <div className="group flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700 transition-colors group-has-focus:text-blue-500">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                disabled={isLoading}
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
                placeholder="First and Last Name"
                className="w-full rounded-lg border border-stone-300 bg-white/50 py-3 pl-10 text-stone-700 transition-all outline-none hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <FiUser className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-stone-500 opacity-80 transition-colors group-has-focus:text-blue-500" />
            </div>
          </div>

          <div className="group flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700 transition-colors group-has-focus:text-blue-500">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                disabled={isLoading}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-lg border border-stone-300 bg-white/50 py-3 pl-10 text-stone-700 transition-all outline-none hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <MdOutlineEmail className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-stone-500 opacity-80 transition-colors group-has-focus:text-blue-500" />
            </div>
          </div>
        </>
      )}

      {/* STEP 2: userOTP Verification */}
      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-stone-900">
            Hello{" "}
            <span className="text-emerald-500">{fullName.split(" ")[0]}</span>,
          </p>
          <p className="text-sm text-stone-900">
            We sent a 6-digit One-Time Password (OTP) to{" "}
            <span className="font-semibold text-emerald-500">
              {maskEmail(email)}
            </span>
            . Please check your inbox or spam folder to retrieve the code.
          </p>
          <div className="relative">
            <input
              type="text"
              maxLength={6}
              disabled={isLoading}
              value={userOtp}
              onChange={(e) => setuserOtp(e.target.value)}
              placeholder="000000"
              className="w-full rounded-lg border border-stone-300 py-4 text-center font-mono text-2xl tracking-[1em] text-stone-500 outline-none focus:border-blue-500"
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

      {/* STEP 3: input password */}
      {step >= 3 && (
        <div className="space-y-4">
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
      )}

      <button
        onClick={handleNext}
        disabled={disableButton || isLoading}
        className={`w-full rounded-lg py-3 font-semibold text-white transition-all ${
          !disableButton && !isLoading
            ? "cursor-pointer bg-blue-600 shadow-md hover:bg-blue-700 active:scale-[0.98]"
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
