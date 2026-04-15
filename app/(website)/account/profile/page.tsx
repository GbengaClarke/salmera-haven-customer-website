"use client";

export default function ProfilePage() {
  return (
    <div className="max-w-3xl rounded-sm border border-white/5 bg-slate-900/30 p-6 md:p-12">
      <div className="mb-10">
        <h3 className="text-xl font-bold">Personal Information</h3>
        <p className="text-sm text-slate-500">
          Ensure your details match your government-issued ID.
        </p>
      </div>

      <form className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Full Name
            </label>
            <input
              type="text"
              className="w-full rounded-sm border border-white/10 bg-slate-950 px-5 py-4 text-sm transition-all focus:border-emerald-500/50 focus:outline-none"
              placeholder="Guest Name"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Email Contact
            </label>
            <input
              type="email"
              disabled
              className="w-full cursor-not-allowed rounded-sm border border-white/5 bg-slate-900 px-5 py-4 text-sm text-slate-600"
              placeholder="guest@salmera.com"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Observations
          </label>
          <textarea
            rows={4}
            className="w-full rounded-sm border border-white/10 bg-slate-950 px-5 py-4 text-sm transition-all focus:border-emerald-500/50 focus:outline-none"
            placeholder="Any special requests for your stay?"
          />
        </div>

        <button className="w-full rounded-sm bg-emerald-600 py-5 text-[10px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-emerald-500 active:scale-95 md:w-auto md:px-12">
          Update Profile
        </button>
      </form>
    </div>
  );
}
