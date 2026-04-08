import { Metadata } from "next";
import HeroSlider from "./_components/HeroSlider";
import IntroSection from "./_components/IntroSection";
import FeaturedRooms from "./_components/FeaturedRooms";
import AdvertSection from "./_components/AdvertSection";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Homepage() {

  return (
    <div>
      <section>
        <HeroSlider />

        <main className="mx-4x">
          <IntroSection />
          
          <FeaturedRooms />
          
          <AdvertSection/>

</main>
      </section>
    </div>
  );
}
