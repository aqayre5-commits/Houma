export default function GlobalLoading() {
  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-4 h-10 w-3/4 animate-pulse rounded-2xl bg-slate-200" />
        <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-slate-100" />
        <div className="mt-2 h-4 w-5/6 animate-pulse rounded-full bg-slate-100" />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <div className="h-28 animate-pulse rounded-2xl bg-slate-100" />
          <div className="h-28 animate-pulse rounded-2xl bg-slate-100" />
        </div>
      </div>
    </div>
  )
}
