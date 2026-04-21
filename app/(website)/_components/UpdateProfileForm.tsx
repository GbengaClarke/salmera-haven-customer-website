"use client";

import { updateProfile } from "@/app/actions/actions";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import FormButton from "./FormButton";
import { HiOutlineGlobeAlt, HiOutlineInformationCircle } from "react-icons/hi2";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type UpdateProfileFormType = {
  countryFlag: string;
  nationality: string;
  nationalID: string | number;
  email: string;
  fullName: string;
  created_at: Date | string;
  id: number;
};

type CountryType = {
  name: string;
  flag: string;
  independent: boolean;
};

type UpdateProfileFormProps = {
  guestData: UpdateProfileFormType | null;
  countries: CountryType[];
};

export default function UpdateProfileForm({
  guestData,
  countries,
}: UpdateProfileFormProps) {
  const [isPending, startUseTransition] = useTransition();
  const router = useRouter();

  const [selection, setSelection] = useState(
    guestData?.nationality
      ? `${guestData?.nationality}%${guestData?.countryFlag}`
      : "",
  );

  const [nationalIdValue, setNationalIdValue] = useState(
    guestData?.nationalID || "",
  );

  const [currentCountry, currentFlag] = selection.split("%");

  if (!guestData) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-8 p-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
          <HiOutlineInformationCircle className="text-3xl text-amber-200/50" />
        </div>
        <div>
          <h3 className="font-cormorant text-3xl text-white">
            Your Sanctuary Awaits
          </h3>
          <p className="mt-2 text-[10px] tracking-[0.2em] text-slate-400 uppercase">
            Sign in to access your profile.
          </p>
        </div>

        <div className="w-full max-w-[320px] space-y-8">
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-white py-5 text-[11px] font-bold tracking-[0.3em] text-black uppercase transition-all hover:bg-indigo-400 hover:text-white"
          >
            Login to Proceed
          </button>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/5"></div>
              <span className="text-[9px] font-bold tracking-[0.3em] text-slate-600 uppercase">
                Quick Access
              </span>
              <div className="h-px flex-1 bg-white/5"></div>
            </div>

            <div className="flex justify-center gap-5">
              {[
                {
                  icon: <FaGoogle />,
                  provider: "google",
                  color: "hover:text-[#DB4437] hover:border-[#DB4437]/30",
                },
                {
                  icon: <FaFacebookF />,
                  provider: "facebook",
                  color: "hover:text-[#1877F2] hover:border-[#1877F2]/30",
                },
                {
                  icon: <FaLinkedinIn />,
                  provider: "linkedin",
                  color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30",
                },
              ].map((social) => (
                <button
                  key={social.provider}
                  onClick={() =>
                    signIn(social.provider, {
                      callbackUrl: window.location.href,
                    })
                  }
                  className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 ${social.color} hover:bg-white/5`}
                >
                  <span className="text-base">{social.icon}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="text-[9px] font-medium tracking-[0.2em] text-slate-600 uppercase">
          Secure Authenticated Booking
        </p>
      </div>
    );
  }

  const { fullName, email } = guestData;

  async function handleSubmit(formData: FormData) {
    const toastId = toast.loading("Updating details");
    startUseTransition(async () => {
      const result = await updateProfile(formData);
      if (!result.success) {
        toast.dismiss(toastId);
        toast.error(result.message, { id: toastId });
      } else {
        toast.success(result.message, { id: toastId });
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            readOnly
            disabled
            className="w-full cursor-not-allowed rounded-sm border border-white/5 bg-slate-900 px-5 py-4 text-sm text-slate-600"
            placeholder="Guest Name"
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Email Contact
          </label>
          <input
            type="email"
            value={email}
            readOnly
            disabled
            className="w-full cursor-not-allowed rounded-sm border border-white/5 bg-slate-900 px-5 py-4 text-sm text-slate-600"
            placeholder="guest@salmera.com"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            National ID number
          </label>
          <input
            name="nationalID"
            type="text"
            // defaultValue={nationalID}
            value={nationalIdValue}
            onChange={(e) => setNationalIdValue(e.target.value)}
            className="w-full rounded-sm border border-white/10 bg-slate-950 px-5 py-4 text-sm text-[16px] transition-all focus:border-emerald-500/50 focus:outline-none"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Country
            </label>

            <div className="shadow-smx rounded-smx ring-white/10x ring-1x relative h-4 w-6 overflow-hidden">
              {currentFlag ? (
                <Image
                  alt={`${currentCountry} flag`}
                  src={currentFlag}
                  fill
                  className="object-cover"
                />
              ) : (
                <HiOutlineGlobeAlt className="text-slate-500" />
              )}
            </div>
          </div>

          <select
            name="country"
            value={selection}
            // defaultValue={currentCountry}
            onChange={(e) => setSelection(e.target.value)}
            className="w-full rounded-sm border border-white/10 bg-slate-950 px-5 py-4 text-sm transition-all focus:border-emerald-500/50 focus:outline-none"
          >
            <option value=""> Where are you from?</option>

            {countries.map((country, i) => {
              return (
                <option key={i} value={`${country.name}%${country.flag}`}>
                  {" "}
                  {country.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <FormButton
        loadingText="Updating details"
        staticText="Update Profile"
        disabled={isPending}
        buttonStyle="w-full rounded-sm bg-indigo-400 py-5 text-[10px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:shadow-indigo-500/20 hover:bg-indigo-500 active:scale-95 md:w-auto md:px-12"
      />
    </form>
  );
}
