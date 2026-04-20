// _components/ProfileFormSkeleton.tsx
export default function ProfileFormSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-3 w-20 rounded bg-slate-800"></div>
            <div className="h-12 w-full rounded-sm bg-slate-800"></div>
          </div>
        ))}
      </div>
      <div className="h-14 w-32 rounded-sm bg-slate-800"></div>
    </div>
  );
}
