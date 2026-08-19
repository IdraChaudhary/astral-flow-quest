import { Moon, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brand({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Moon className="h-4.5 w-4.5" />
        <Star className="absolute -right-0.5 -top-0.5 h-3 w-3 fill-gold text-gold" />
      </span>
      {!compact && (
        <span className="font-display text-lg font-700 tracking-tight">
          ASTRO<span className="text-primary">LIVE</span>
          <span className="ml-1 align-super text-[10px] font-semibold text-gold-foreground">2.0</span>
        </span>
      )}
    </div>
  );
}