export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="grid animate-pulse grid-cols-1 overflow-hidden rounded-sm border border-white/5 bg-slate-900/20 md:grid-cols-[220px_1fr]"
        >
          <div className="h-40 bg-slate-800 md:h-auto" />

          <div className="flex flex-col justify-between p-6 lg:p-10">
            <div className="space-y-4">
              <div className="h-4 w-24 rounded-sm bg-slate-800" />
              <div className="h-8 w-2/3 rounded-sm bg-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-8 lg:grid-cols-5">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="space-y-2">
                  <div className="h-3 w-12 rounded-sm bg-slate-800" />
                  <div className="h-4 w-20 rounded-sm bg-slate-800" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
