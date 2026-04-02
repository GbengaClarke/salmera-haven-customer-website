import { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Inter, Cormorant_Garamond } from "next/font/google";

export const metadata: Metadata = {
  title: {
    template: "%s | Salmera Haven",
    default: "Salmera Haven | Luxury & comfort",
  },

  description: "Experience the ultimate comfort and luxury at Salmera Haven.",
};

// Sans-serif (Body)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={` ${inter.className} ${cormorant.variable} mx-auto min-h-screen max-w-7xl bg-slate-950 text-slate-200 antialiased`}
      >
        {children}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              textAlign: "center",
              background: "#e7ebec",
              color: "#154055",
            },
          }}
        />
      </body>
    </html>
  );
}
