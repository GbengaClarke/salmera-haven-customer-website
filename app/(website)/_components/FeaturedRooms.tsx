

export default function FeaturedRooms() {
  const rooms = Array.from({ length: 8 });


  return (
    <section className="bg-slate-950  py-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="font-cormorant text-4xl text-white md:text-6xl tracking-tight">
            Featured Rooms
          </h2>
          <div className="mt-4 h-px w-20 bg-indigo-400 opacity-50" />
        </div>

        {/* Responsive Grid of 8 Empty Divs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {rooms.map((_, index) => (
            <div 
              key={index}
              className="aspect-[4/5] w-full border border-indigo-800 bg-indigo-950/30 
                         hover:border-indigo-500 transition-colors duration-300
                         flex items-center justify-center text-indigo-700 font-light"
            >
              Room Slot {index + 1}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-8 md:mt-16">
  <button className="group relative flex items-center gap-3 px-8 py-3 
                     border border-indigo-400/30 text-indigo-100 
                     text-sm uppercase tracking-[0.2em] font-medium 
                     transition-all duration-500 ease-in-out
                     hover:bg-indigo-100 hover:text-indigo-900 hover:border-indigo-100 active:bg-indigo-100 active:text-indigo-900 active:border-indigo-100">
    
    <span>Show More</span>
    
    {/* Simple arrow icon that moves on hover */}
    <span className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-3">
      →
    </span>
  </button>
</div>

      </div>
    </section>
  );
}