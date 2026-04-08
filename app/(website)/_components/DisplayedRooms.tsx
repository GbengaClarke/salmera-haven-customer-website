'use client'

import { Room } from "@/types/rooms";
import Image from "next/image";
import Link from "next/link"; 
import { useState } from "react";

type DisplayedRoomsProps = {
  initialDisplay?: number;
  rooms: Room[];
};

function DisplayedRooms({ initialDisplay = 4, rooms }: DisplayedRoomsProps) {
  const [displayedCount, setdisplayedCount] = useState(initialDisplay);

  const visibleRooms = rooms.slice(0, displayedCount)
  const hasMore = displayedCount < rooms.length

  function handleShowMore() {
    if (hasMore) {
      setdisplayedCount((prev) => prev + 4)
    } else {
      setdisplayedCount(initialDisplay)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        {visibleRooms.map((room, index) => {
          const hasDiscount = room.discount > 0;
          const finalPrice = room.regularPrice - room.discount;

          return (
            <Link 
              href={`/room/${room.id}`} 
              key={room.id}
              className="group relative flex flex-col bg-indigo-950/20 border border-indigo-800/50 transition-all duration-300 
                         hover:border-indigo-400 active:scale-[0.98] active:bg-indigo-900/40 cursor-pointer"
            >
              {/*  Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image  
                  src={room.image} 
                  alt={room.name} 
                  fill
                  priority={index < 4} 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Discount Badge */}
                {hasDiscount && (
                  <div className="absolute top-4 left-4 bg-indigo-500 text-white text-[10px] uppercase tracking-widest px-3 py-1 font-bold z-10">
                    -{((room.discount / room.regularPrice) * 100).toFixed(0)}% Off
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/*  Content Area */}
              <div className="p-5 space-y-3">
                <div className="flex justify-between flex-wrap gap-2 items-center">
                  <h3 className="font-cormorant text-2xl text-white whitespace-nowrap leading-none">
                  Premium Suite {room.name}
                  </h3>
                  <span className="text-[10px] text-indigo-400 whitespace-nowrap uppercase tracking-widest border border-indigo-400/30 px-2 py-0.5">
                    {room.maxCapacity} Guests Max
                  </span>
                </div>

                <p className="text-slate-400 text-xs line-clamp-2 font-light leading-relaxed">
                  {room.description}
                </p>

                {/* Pricing Logic */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex flex-col">
                    {hasDiscount && (
                      <span className="text-xs text-slate-500 line-through">
                        ${room.regularPrice}
                      </span>
                    )}
                    <span className="text-xl text-white font-medium">
                      ${finalPrice}<span className="text-sm text-slate-400 font-light">/night</span>
                    </span>
                  </div>
                  
                  <div className="text-[10px] uppercase tracking-widest text-indigo-300 group-hover:text-white transition-colors">
                    Details →
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-end mt-8 md:mt-16">
        <button onClick={handleShowMore} className="group relative flex items-center gap-3 px-8 py-3 
        border border-indigo-400/30 text-indigo-100 
        text-sm uppercase tracking-[0.2em] font-medium 
        transition-all duration-500 ease-in-out
      hover:bg-indigo-100 hover:text-indigo-900 hover:border-indigo-100 
      active:bg-indigo-100 active:text-indigo-900">
          <span>{hasMore ? 'Show More' : "Show Less"}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-3">
            →
          </span>
        </button>
      </div>
    </>
  )
}

export default DisplayedRooms