import { Room } from "@/types/rooms";
import Image from "next/image";
import { HiOutlineUsers, HiStar } from "react-icons/hi2";
import { IoDiamondOutline } from "react-icons/io5";

interface RoomProps {
  room: Room;
}

export default function RoomDetails({ room }: RoomProps) {
  const { name, maxCapacity, image, description, regularPrice, discount } = room;


//   console.log([...Array(maxCapacity)])
// console.log(Array(maxCapacity))
  

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-0 overflow-hidden border border-white/5 bg-[#0a0f1d] shadow-2xl rounded-lg">
      

      <div className="relative h-87.5 sm:h-112.5 lg:h-162.5 w-full overflow-hidden">
        <Image
          src={image}
          alt={`Luxury Suite ${name}`}
          fill
          priority
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transformduration-1000hover:scale-105"
        />
        
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-xl px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/10 text-white">
          <HiOutlineUsers className="text-lg sm:text-xl text-amber-400" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            Accommodates Maximun of {maxCapacity} Guests
          </span>
        </div>

        <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 flex items-center gap-2 text-white/70">
          <IoDiamondOutline className="text-amber-500 text-sm sm:text-base" />
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium">
            Salmera Signature Collection
          </span>
        </div>
      </div>


      <div className="flex flex-col p-6 sm:p-10 lg:p-16 justify-center">
        
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <HiStar key={i} className="text-amber-500 text-base sm:text-lg" />
            ))}
          </div>
          <div className="hidden xs:block h-px w-6 sm:w-8 bg-white/20"></div>
          <span className="text-slate-400 text-[10px] sm:text-xs uppercase tracking-widest font-bold">
            5.0 Verified Excellence
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant text-white mb-6 sm:mb-8 leading-tight">
          Suite <span className="text-amber-200/90">{name}</span>
        </h2>

        <div className="relative mb-8 sm:mb-10">
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            {description}
          </p>
          <div className="absolute -left-4 sm:-left-6 top-0 h-full w-0.5 bg-linear-to-b from-amber-500/50 to-transparent"></div>
        </div>

        <div className="mt-auto pt-8 sm:pt-10 border-t border-white/5 flex flex-col sm:flex-row gap-8 sm:items-center sm:justify-between">
          <div>
            <p className="text-slate-500 text-[9px] sm:text-[10px] uppercase tracking-widest mb-2 font-bold text-center sm:text-left">
              Nightly Rate
            </p>
            <div className="flex items-baseline justify-center sm:justify-start gap-3 sm:gap-4">
              <span className="text-3xl sm:text-4xl font-light text-white">
                ${regularPrice - discount}
              </span>
              {discount > 0 && (
                <span className="text-lg sm:text-xl text-slate-500 line-through font-light decoration-amber-700/70">
                  ${regularPrice}
                </span>
              )}
            </div>
          </div>

          <button className="w-full sm:w-auto bg-white text-black hover:bg-amber-400 hover:text-black px-8 py-4 sm:px-10 sm:py-5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-lg active:scale-95">
            Book Experience &#9660;
          </button>
        </div>
      </div>
    </section>
  );
}