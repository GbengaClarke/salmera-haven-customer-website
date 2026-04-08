import { createBooking } from "@/app/actions/actions";
import { Room } from "@/types/rooms";
import { HiCheck, HiOutlineInformationCircle } from "react-icons/hi2";

interface MakeReservationProps {
  room: Room;
}

export default function MakeReservation({ room }: MakeReservationProps) {
  const { maxCapacity, name } = room;

  return (
    <section className="mt-8 pt-8 mb-24  border-t border-white/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-5xl font-cormorant text-white leading-tight">
            Reserve Suite <span className="text-amber-200/90">{name}</span>
          </h2>
          <div className="flex items-center gap-2 mt-2 text-amber-500/80">
            <HiOutlineInformationCircle className="text-lg" />
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold">
              Payment handled upon arrival
            </p>
          </div>
        </div>
        
        <div className="hidden md:block text-right">
          <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Status</p>
          <p className="text-emerald-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Available for Booking
          </p>
        </div>
      </div>

      {/* The Unified Card */}
      <div className="overflow-hidden bg-[#0a0f1d] border border-white/5 rounded-lg shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px]">
          
          {/* Left Side: Large Integrated Calendar Space */}
          <div className="p-8 lg:p-12 bg-white/[0.02]">
             <div className="w-full h-full min-h-[450px] flex flex-col items-center justify-center border border-dashed border-white/10 rounded-sm">
                <span className="text-slate-600 text-[10px] uppercase tracking-[0.4em] mb-4">Select Dates</span>
                <div className="h-px w-12 bg-white/10"></div>
                {/* CALENDAR WILL RENDER HERE */}
             </div>
          </div>

          {/* Right Side: Action Sidebar */}
          <div className="bg-white/5 border-l border-white/5 p-8 lg:p-10">
            <form action={createBooking} className="flex flex-col h-full space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                    Guest Count
                  </label>
                  <select 
                    name="numGuests"
                    className="w-full bg-black/40 border border-white/10 text-white p-4 rounded-sm focus:border-indigo-500 outline-none transition-all hover:border-indigo-500/30 cursor-pointer text-sm"
                    required
                  >
                    <option value="">Choose number of guests</option>
                    {[...Array(maxCapacity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i + 1 === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

{/* Breakfast Toggle */}
<label htmlFor="breakfast"  className="group flex  has-checked:bg-black/40 has-checked:border-white/10 items-center justify-between p-4 bg-black/20  rounded-sm hover:border-indigo-500/30 transition-all cursor-pointer border border-white/5">
                  <div className="flex flex-col">
                    <label htmlFor="breakfast" className="text-white text-[10px] uppercase tracking-[0.2em] font-bold cursor-pointer">
                    Tasty Breakfast
                    </label>
                    <p className="text-slate-500 text-[9px] uppercase tracking-widest  mt-1">
                      Chef-prepared local delicacies
                    </p>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="breakfast"
                      name="hasBreakfast"
                      className="peer h-6 w-6 cursor-pointer appearance-none border border-white/20 rounded-sm bg-[#0a0f1d] checked:bg-indigo-600 checked:border-indigo-600 transition-all"
                    />
                    <HiCheck className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block text-white left-1" />
                  </div>
                </label>

                <div className="space-y-3">
                  <label className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                    Additional Message
                  </label>
                  <textarea 
                    placeholder="Anything we should prepare for your arrival?"
                    rows={6}
                    name="observations"
                    className="w-full hover:border-indigo-500/30 bg-black/40 border border-white/10 text-white px-4 py-4 rounded-sm focus:border-indigo-500 outline-none transition-all resize-none placeholder:text-slate-700 "
                  />
                </div>
              </div>

              <div className="mt-auto pt-8">
                <button 
                  type="submit"
                  className="w-full bg-white text-black hover:bg-indigo-400 hover:text-black py-5 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 shadow-xl active:scale-[0.98]"
                >
                  Reserve Suite
                </button>
                <p className="text-center text-slate-600 text-[9px] mt-4 tracking-widest uppercase">
                  No credit card required today
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}