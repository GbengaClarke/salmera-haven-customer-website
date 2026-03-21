"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="z-50 flex cursor-pointer items-center gap-2 p-2 text-sm font-medium text-stone-700 transition hover:text-blue-600"
    >
      <FiArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
}

export default BackButton;
