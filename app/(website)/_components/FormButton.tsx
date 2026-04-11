"use client";

import { useFormStatus } from "react-dom";

type ButtonProps = {
  loadingText: string;
  staticText: string;
  buttonStyle?: string;
  disabled?: boolean;
};

export default function FormButton({
  loadingText,
  staticText,
  buttonStyle = "",
  disabled = false,
}: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={buttonStyle}
      suppressHydrationWarning
    >
      {pending ? loadingText : staticText}
    </button>
  );
}
