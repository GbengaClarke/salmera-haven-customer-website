


export default function AdvertSection() {
  return (
    <section className="bg-indigo-950 px-6 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Copywriting */}
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <h1 className="font-cormorant text-5xl md:text-7xl leading-tight tracking-tight">
                A Bespoke <br /> 
                <span className="italic text-indigo-300 font-light">Living Experience</span>
              </h1>
              <div className="h-px w-24 bg-indigo-500/50" />
            </div>
            
            <p className="text-indigo-100/80 text-lg md:text-xl leading-relaxed max-w-xl font-light">
              Discover a sanctuary where every detail is tailored to your comfort. 
              From our world-class amenities to the quiet elegance of our private suites, 
              Salmera Haven offers more than just a stay, it offers a lifestyle 
              defined by sophistication and peace.
            </p>
          </div>

          {/* Right Side: Image Composition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Image 1: Sharp Edges */}
            <div className="h-[450px] w-full overflow-hidden shadow-2xl">
              <img 
                src="/mansion.webp" 
                alt="Luxury Interior Detail" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Image 2: With Overlaying Text */}
            <div className="relative h-[450px] w-full overflow-hidden shadow-2xl group">
              <img 
                src="/mansion2.webp" 
                alt="Exclusive Haven Access" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay: Centered Text with Glassmorphism */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="bg-indigo-950/60 backdrop-blur-sm border border-white/10 w-full h-full flex flex-col justify-center items-center text-center p-8 transition-colors duration-500 group-hover:bg-indigo-950/40">
                  <h2 className="text-white font-cormorant text-4xl mb-3 italic tracking-wide">
                    Exclusive Access Coming Soon
                  </h2>
                  <div className="h-px w-12 bg-white/30 mb-4" />
                  <p className="text-indigo-200 text-xs uppercase tracking-[0.4em] font-semibold">
                    Members Only
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}