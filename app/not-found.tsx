import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-8xl font-black tracking-tighter text-white/10 md:text-9xl">
        404
      </h1>
      <div className="-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Suite Not Found
        </h2>
        <p className="mx-auto max-w-md text-slate-400">
          The page or reservation you are looking for has been moved or
          doesn&apos;t exist in our current registry.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-sm bg-emerald-600/10 px-8 py-3 text-xs font-bold tracking-widest text-emerald-500 uppercase transition-all hover:bg-emerald-600 hover:text-white active:scale-95"
        >
          Return to Haven
        </Link>
      </div>
    </main>
  );
}
