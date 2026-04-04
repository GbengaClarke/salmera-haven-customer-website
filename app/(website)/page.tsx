import Link from "next/link";
import { Metadata } from "next";
import LogoutButton from "./_components/LogoutButton";
import { auth } from "@/lib/auth";
import HeroSlider from "./_components/HeroSlider";
import IntroSection from "./_components/IntroSection";
import FeaturedRooms from "./_components/FeaturedRooms";
import AdvertSection from "./_components/AdvertSection";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Homepage() {

  //remove api and pass within as prop from layout?
  // const session = await auth();

  // const user = session?.user;

  // console.log(user);
  return (
    <div>
      <section className="">
        <HeroSlider />

        <main className="mx-4x">
          <IntroSection />
          
          <FeaturedRooms />
          
          <AdvertSection/>
        {/* <h1 className="m-2 rounded p-4 shadow">
          welcome to the home page{"   "}
          <strong>{user ? `${user?.name}, ${user?.email}` : "no user"}</strong>
        </h1> */}

        <Link className="text-blue-700" href={"/login"}>
          log in
        </Link>
        <div>
          <Link className="text-blue-700" href={"/signup"}>
            sign up
          </Link>
        </div>
        <LogoutButton />
</main>
      </section>
    </div>
  );
}
