import Link from "next/link";
import { Metadata } from "next";
import LogoutButton from "./_components/LogoutButton";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Homepage() {
  const session = await auth();

  const user = session?.user;

  // console.log(user);
  return (
    <div>
      <section className="">
        <h1 className="m-2 rounded p-4 shadow">
          welcome to the home page{"   "}
          <strong>{user ? `${user?.name}, ${user?.email}` : "no user"}</strong>
        </h1>

        <Link className="text-blue-700" href={"/login"}>
          log in
        </Link>
        <div>
          <Link className="text-blue-700" href={"/signup"}>
            sign up
          </Link>
        </div>
        <LogoutButton />
      </section>
    </div>
  );
}
