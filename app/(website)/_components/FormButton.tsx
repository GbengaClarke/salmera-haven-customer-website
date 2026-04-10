"use client";

import { useFormStatus } from "react-dom";

type ButtonProps = {
  loadingText: string;
  staticText: string;
  buttonStyle?: string; 
};

export default function FormButton({
  loadingText,
  staticText,
  buttonStyle = "",
}: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={buttonStyle}
    >
      {pending ? loadingText : staticText}
    </button>
  );
}