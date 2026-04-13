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

  // console.log(user);
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col overflow-x-hidden">
      <Header user={user || {}} />

      <main className="mt-16x mx-4 mt-22 grow">{children}</main>
      <Footer />
    </div>
  );
}
