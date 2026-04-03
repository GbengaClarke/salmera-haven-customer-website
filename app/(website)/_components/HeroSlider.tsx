"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const SLIDES = [
  { id: 1, src: "/hero-1.jpg", text: "Luxury Redefined" },
  { id: 2, src: "/hero-2.jpg", text: "Serene Environments" },
  { id: 3, src: "/hero-3.jpg", text: "Exclusive Suites" },
  { id: 4, src: "/hero-4.jpg", text: "World-Class Dining" },
  { id: 5, src: "/hero-5.jpg", text: "Your Haven Awaits" },
];

export default function HeroSlider() {
  // 1. Initialize Embla with the Autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  // 2. Optional: Add a function to manually trigger a slide
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  return (
    <div
      className="relative mx-auto h-[600px] w-full overflow-hidden"
      ref={emblaRef}
    >
      <div className="flex h-full">
        {SLIDES.map((slide) => (
          <div key={slide.id} className="relative min-w-full flex-[0_0_100%]">
            {/* The Image */}
            <Image
              src={slide.src}
              alt={slide.text}
              fill
              className="object-cover"
              priority={slide.id === 1}
            />

            {/* The Overlay & Text */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <h2 className="font-cormorant px-4 text-center text-4xl text-white drop-shadow-lg md:text-6xl">
                {slide.text}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Navigation Arrows (Optional) */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md hover:bg-white/20"
      >
        Prev
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md hover:bg-white/20"
      >
        Next
      </button>
    </div>
  );
}
