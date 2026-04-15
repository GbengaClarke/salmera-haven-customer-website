"use client";

import Image from "next/image";
import Link from "next/link";

const stats = [
  { label: "Acres of Nature", value: "450+" },
  { label: "Premium Suites", value: "8+" },
  { label: "Sustainability Rating", value: "100%" },
  { label: "Guest Satisfaction", value: "4.9/5" },
];

export default function AboutUs() {
  return (
    <section className="min-h-screen bg-slate-950 text-slate-50">
      <div className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden">
        <Image
          src="/auth-pic.jpg"
          alt="Salmera Haven Modern Luxury"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/60 via-slate-950/20 to-slate-950" />

        <div className="relative z-10 px-4 text-center">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tighter italic md:text-8xl">
            Salmera <span className="text-emerald-500 not-italic">Haven</span>
          </h1>
          <p className="text-sm font-bold tracking-[0.6em] text-slate-300 uppercase md:text-base">
            A Masterclass in Modern Luxury
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl py-24 md:py-40 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-7">
            <h2 className="mb-10 text-4xl leading-[1.1] font-bold md:text-6xl">
              Architecture that{" "}
              <span className="text-indigo-400">breathes</span>, designed for
              the <span className="text-emerald-500">elite</span>.
            </h2>
            <div className="max-w-2xl space-y-8 text-lg leading-relaxed text-slate-400 md:text-xl">
              <p>
                Salmera Haven was conceived as a pinnacle of modern
                architectural achievement. Moving away from traditional rustic
                concepts, we’ve pioneered a series of
                <strong> Premium Suites</strong> that emphasize glass, steel,
                and light, blending high-tech innovation with the raw serenity
                of the environment.
              </p>
              <p className="border-l-2 border-emerald-500 pl-6 text-slate-200 italic">
                &quot;We don&apos;t build rooms; we curate environments where
                sophistication meets the stillness of the wild.&quot;
              </p>
              <p>
                Every suite features floor-to-ceiling panoramic glass,
                locally-sourced sustainable materials, and intelligent climate
                systems, ensuring your stay is as responsible as it is
                indulgent.
              </p>
            </div>
          </div>

          <div className="grid h-full grid-cols-2 gap-4 lg:col-span-5">
            <div className="space-y-4">
              <div className="relative aspect-3/4 overflow-hidden rounded-sm border border-white/5">
                <Image
                  src="/gridpic1.webp"
                  alt="Suite Interior 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-sm border border-white/5">
                <Image
                  src="/gridpic2.webp"
                  alt="Suite Interior 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="relative aspect-square overflow-hidden rounded-sm border border-white/5">
                <Image
                  src="/gridpic3.webp"
                  alt="Suite View 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-3/4 overflow-hidden rounded-sm border border-white/5">
                <Image
                  src="/gridpic4.webp"
                  alt="Suite View 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-white/5 bg-slate-900/50 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-6 lg:grid-cols-4 lg:px-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="mb-2 text-4xl font-black tracking-tighter text-emerald-500 md:text-6xl">
                {stat.value}
              </p>
              <p className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="brdx py-32x mx-auto max-w-7xl py-17 md:py-48 lg:px-12">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <h3 className="mb-6 text-3xl font-bold md:text-4xl">
              Modern Intelligence
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-slate-400">
              Our Premium Suites are equipped with state-of-the-art automation,
              allowing you to control lighting, climate, and privacy with a
              single touch, all while maintaining our strict zero-emissions
              commitment.
            </p>
            <ul className="space-y-4">
              {[
                "Smart-Glass Privacy Tinting",
                "Advanced Geothermal Cooling",
                "Curated In-Suite Dining",
                "Direct Forest Access",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-semibold tracking-wider text-slate-200"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {item.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-white/10 lg:w-1/2">
            <Image
              src="/bottomAboutUsPic.webp"
              alt="Premium Suite View"
              fill
              className="object-cover transition-transform duration-700"
            />
          </div>
        </div>
      </div>

      <div className="px-6 pb-32 text-center">
        <div className="mx-auto mb-12 h-px w-20 bg-emerald-500" />
        <h4 className="mx-auto mb-8 max-w-xl text-2xl font-light md:text-4xl">
          Secure your sanctuary in luxury.
        </h4>
        <Link
          href="/"
          className="bg-whitex bg-indigo-400 px-12 py-5 text-xs font-bold tracking-[0.3em] text-slate-950 uppercase shadow-xl transition-all duration-150 ease-in-out hover:bg-indigo-400 hover:text-white hover:shadow-indigo-500/20 active:scale-90 active:brightness-75"
        >
          Book Your Suite
        </Link>
      </div>
    </section>
  );
}
