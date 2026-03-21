import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Homepage() {
  return (
    <div>
      <h1 className="brd m-2 flex rounded bg-white p-4 shadow">
        welcome to the home page
      </h1>

      <Link className="text-blue-700" href={"/login"}>
        log in
      </Link>
      <div>
        <Link className="text-blue-700" href={"/signup"}>
          sign up
        </Link>
      </div>
    </div>
  );
}
