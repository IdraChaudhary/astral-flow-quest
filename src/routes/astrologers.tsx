import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Info, Star } from "lucide-react";
import { AppShell } from "@/components/astro/AppShell";
import { TrustBadge } from "@/components/astro/TrustScore";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { astrologers, type Astrologer } from "@/lib/astro-data";
import { useAstro } from "@/lib/astro-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/astrologers")({
  head: () => ({
    meta: [
      { title: "Top matches — AstroLive 2.0" },
      { name: "description", content: "Astrologers matched to your concern with transparent Trust Scores." },
      { property: "og:title", content: "Top matches — AstroLive 2.0" },
      { property: "og:description", content: "Compare specialists by Trust Score, price and feedback." },
    ],
  }),
  component: AstrologersPage,
});

function AstrologersPage() {
  const state = useAstro();
  const [why, setWhy] = useState<Astrologer | null>(null);

  return (
    <AppShell>
      <div className="space-y-5">
        <header>
          <h1 className="text-2xl font-bold">Top matches for you</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Recommended based on your concern · Career → Job Decision
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-3">
          {astrologers.map((a) => (
            <AstrologerCard
              key={a.id}
              astrologer={a}
              score={a.trustScore + (state.trustDelta[a.id] ?? 0)}
              onWhy={() => setWhy(a)}
            />
          ))}
        </div>
      </div>

      <Dialog open={why !== null} onOpenChange={(o) => !o && setWhy(null)}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Why this match?</DialogTitle>
            <DialogDescription>{why?.name}</DialogDescription>
          </DialogHeader>
          <ul className="space-y-2 text-sm">
            {why?.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <span className="mt-0.5 text-success">✓</span>
                {h}
              </li>
            ))}
          </ul>
          <Button className="rounded-xl" onClick={() => setWhy(null)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function AstrologerCard({
  astrologer,
  score,
  onWhy,
}: {
  astrologer: Astrologer;
  score: number;
  onWhy: () => void;
}) {
  const navigate = useNavigate();
  return (
    <article
      className={cn(
        "card-soft flex flex-col gap-3 p-5",
        astrologer.bestMatch && "border-primary/50 ring-1 ring-primary/20",
      )}
    >
      <div className="flex items-start gap-3">
        <img
          src={astrologer.avatar}
          alt={astrologer.name}
          width={512}
          height={512}
          loading="lazy"
          className="h-14 w-14 shrink-0 rounded-2xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-base font-semibold">{astrologer.name}</h2>
            {astrologer.bestMatch && (
              <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                Best Match
              </span>
            )}
          </div>
          <p className="truncate text-sm text-muted-foreground">{astrologer.specialization}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {astrologer.rating} · {astrologer.sessions.toLocaleString()} sessions
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <TrustBadge score={score} />
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">₹{astrologer.rate}/min</span>
      </div>

      <p className="text-sm text-muted-foreground">{astrologer.experience}</p>

      <button
        onClick={onWhy}
        className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        <Info className="h-4 w-4" /> Why this match?
      </button>

      <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
        <Button asChild variant="outline" className="rounded-xl">
          <Link to="/astrologer/$id" params={{ id: astrologer.id }}>
            View Profile
          </Link>
        </Button>
        <Button className="rounded-xl" onClick={() => navigate({ to: "/consultation" })}>
          Consult
        </Button>
      </div>
    </article>
  );
}