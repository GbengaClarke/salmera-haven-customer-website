"use client";

import Link from "next/link";
// import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // useEffect(() => {
  //   console.error(error);
  // }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="rounded-sm border border-rose-500/10 bg-rose-500/5 p-12 shadow-2xl">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
          Something went wrong
        </h2>
        <p className="mb-8 text-slate-400">
          {error.message ||
            "We encountered an unexpected error while loading your data."}
        </p>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => reset()}
            className="rounded-sm bg-white px-8 py-3 text-xs font-bold tracking-widest text-slate-950 uppercase transition-all hover:bg-slate-200 active:scale-95"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="text-[10px] font-bold tracking-widest text-slate-500 uppercase hover:text-slate-300"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
