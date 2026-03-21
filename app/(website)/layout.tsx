// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col">
      {/* <Navbar /> */}
      <main className="grow">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
