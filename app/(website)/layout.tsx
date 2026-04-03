// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

import { auth } from "@/lib/auth";
import Header from "./_components/Header";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const user = session?.user;
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col">
      <Header user={user || {}} />

      <main className="mx-4 mt-22 grow">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
