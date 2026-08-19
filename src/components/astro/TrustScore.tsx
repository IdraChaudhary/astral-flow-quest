import { cn } from "@/lib/utils";

export function TrustScoreRing({ score, size = 96 }: { score: number; size?: number }) {
  const pct = Math.max(0, Math.min(100, score));
  return (
    <div
      className="relative grid shrink-0 place-items-center rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(var(--gold) ${pct * 3.6}deg, var(--secondary) 0deg)`,
      }}
    >
      <div className="grid place-items-center rounded-full bg-card" style={{ width: size - 14, height: size - 14 }}>
        <span className="font-display text-xl font-bold">{Math.round(pct)}</span>
        <span className="text-[10px] text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}

export function TrustBadge({ score, className }: { score: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-gold/50 bg-gold-soft px-2.5 py-1 text-xs font-semibold text-gold-foreground",
        className,
      )}
    >
      ★ Trust Score {Math.round(score)}
    </span>
  );
}

export function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}