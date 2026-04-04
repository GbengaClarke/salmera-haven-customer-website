"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const SLIDES = [
  { 
    id: 1, 
    src: "/gym.webp", 
    h1: "The Wellness Sanctuary", 
    p: "Experience elite strength and cardio training in our workout facility." 
  },
  { 
    id: 2, 
    src: "/kitchen.webp", 
    h1: "The Culinary Atelier", 
    p: "Master gourmet flavors at our professional quartz islands and workspace." 
  },
  { 
    id: 3, 
    src: "/lounge.webp", 
    h1: "The Designer Lounge", 
    p: "Settle into plush velvet seating for refined conversation and repose." 
  },
  { 
    id: 4, 
    src: "/rooftop.webp", 
    h1: "The Skyview Terrace", 
    p: "Artisanal cocktails served against a breathtaking panoramic city skyline." 
  },
  { 
    id: 5, 
    src: "/cinema.webp", 
    h1: "Private Screening Suite", 
    p: "Immersive acoustic perfection paired with bespoke, oversized leather recliners." 
  },
];

export default function HeroSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: false }),
  ]);

  // scroll to a specific index when a dot is clicked
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  // update the dot state whenever slide changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(); 
    emblaApi.on("select", onSelect); 
    emblaApi.on("reInit", onSelect); 
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative -mt-6.5 left-1/2 right-1/2 -ml-[50vw] w-screen h-[50vh] md:h-100 overflow-hidden" ref={emblaRef}>


{/* <div 
  className="relative -mt-6.5 left-1/2 -ml-[50vw] w-screen h-[50vh] md:h-100 xl:h-120 overflow-hidden 
             xl:static xl:ml-0 xl:mx-auto xl:max-w-7xl xl:w-full rounded-none" 
  ref={emblaRef}
> */}

      <div className="flex h-full">
        {SLIDES.map((slide) => (
          <div key={slide.id} className="relative min-w-full flex-[0_0_100%]">
            <Image
              src={slide.src}
              alt={slide.h1}
              fill
              className="object-cover"
              priority={slide.id === 1}
              loading={slide.id === 1 ? undefined : "lazy"}
              sizes="100vw"
            />
            <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-black/30">
              <h2 className="font-cormorant px-4 font-semibold whitespace-nowrap text-center text-4xl text-white drop-shadow-lg md:text-6xl">
                {slide.h1}
              </h2 >
              <p className="text-center text-slate-200 text-sm w-[20rem] shadow-2xl">{slide.p}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button onClick={scrollPrev} className="hidden md:block absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md hover:bg-white/20"><BiChevronLeft/></button>
      <button onClick={scrollNext} className="hidden md:block absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md hover:bg-white/20"><BiChevronRight/></button>

      {/* dots pagination */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === selectedIndex 
                ? "bg-slate-200 w-8" 
                : "bg-white/40 hover:bg-white/60" 
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}