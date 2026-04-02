import Link from "next/link";
import { Metadata } from "next";
import LogoutButton from "./_components/LogoutButton";
import Header from "./_components/Header";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Home",
};

// export default async function Homepage() {
//   const session = await auth();

//   const user = session?.user;

//   return (
//     <div>
//       <h1 className="brd m-2 rounded bg-white p-4 shadow">
//         welcome to the home page{"   "}
//         {
//           // use name from database instead
//         }
//         <strong>{user ? `${user?.name}, ${user?.email}` : "no user"}</strong>
//       </h1>

//       <Link className="text-blue-700" href={"/login"}>
//         log in
//       </Link>
//       <div>
//         <Link className="text-blue-700" href={"/signup"}>
//           sign up
//         </Link>
//       </div>
//       <LogoutButton />
//     </div>
//   );
// }
export default async function Homepage() {
  const session = await auth();

  const user = session?.user;
  return (
    <div>
      <Header />

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
    </div>
  );
}
