import { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    template: "%s | Salmera Haven",
    default: "Salmera Haven | Luxury & comfort",
  },

  description: "Experience the ultimate comfort and luxury at Salmera Haven.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
