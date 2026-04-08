"use client";

import React from "react";
import { BiWifi, BiHomeAlt, BiDrink } from "react-icons/bi";
import { FaWheelchair } from "react-icons/fa";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { PiWheelchairDuotone } from "react-icons/pi";
import { TbArmchair2 } from "react-icons/tb";

const AMENITIES = [
  {
    icon: <TbArmchair2  size={24} />,
    title: "Beautifully Furnished",
  },
  {
    icon: <BiWifi size={24} />,
    title: "High-Speed Connectivity",
  },
  {
    icon: <HiOutlineBellAlert size={24} />,
    title: "Steady Room Service",
  },
  {
      icon: <PiWheelchairDuotone  size={24} />,
      title: "Inclusive Access", 
    },
  // {
  //   icon: <BiDrink size={24} />,
  //   title: "Complimentary Delights",
  // },
];

export default function IntroSection() {
  return (
    <section className="bg-slate-900 rounded-b-2xl px-5 py-20 md:py-15 ">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-cormorant  text-4xl leading-tight tracking-tight text-white md:text-7xl whitespace-nowrap">
                Experience the Art of <br />
                <span className="italic text-slate-200x text-emerald-200 ">Refined Living</span>
              </h1>
              <div className="h-px w-24 bg-slate-700" />
            </div>
            
            <p className="max-w-xl font-light leading-relaxed text-slate-300 md:text-xl">
              At Salmera Haven, we curate environments that transcend the ordinary. 
              From meticulously crafted interiors to our signature personalized services, 
              every detail invites you to immerse yourself in absolute tranquility.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:gap-x-12">
            {AMENITIES.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 group cursor-default"
              >
                <div className="text-slate-200x text-amber-500 transition-colors duration-300 group-hover:text-amber-400">
                  {item.icon}
                </div>
                
                <h3 className="text-lg font-medium tracking-wide text-slate-200 transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}