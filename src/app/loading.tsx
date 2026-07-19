export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="size-10 animate-pulse rounded-xl bg-electric/30" />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}
