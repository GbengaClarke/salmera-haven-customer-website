import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | Salmera Haven",
  description: "Access your Salmera Haven account",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
