
import { auth } from "@/lib/auth";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const user = session?.user;
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl overflow-x-hidden flex-col">
      <Header user={user || {}} />

      <main className="mx-4 mt-22 mt-16x grow">{children}</main>
      <Footer />
    </div>
  );
}
