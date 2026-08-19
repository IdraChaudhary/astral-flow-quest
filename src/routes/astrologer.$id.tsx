import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { MessageSquare, Phone, Star, Video } from "lucide-react";
import { AppShell } from "@/components/astro/AppShell";
import { ScoreBar, TrustScoreRing } from "@/components/astro/TrustScore";
import { Button } from "@/components/ui/button";
import { getAstrologer } from "@/lib/astro-data";
import { useAstro } from "@/lib/astro-store";

export const Route = createFileRoute("/astrologer/$id")({
  head: () => ({
    meta: [
      { title: "Astrologer profile — AstroLive 2.0" },
      { name: "description", content: "Transparent pricing, Trust Score breakdown and consultation options." },
      { property: "og:title", content: "Astrologer profile — AstroLive 2.0" },
      { property: "og:description", content: "See fees, platform charges and trust signals before you consult." },
    ],
  }),
  component: AstrologerProfile,
});

function AstrologerProfile() {
  const { id } = useParams({ from: "/astrologer/$id" });
  const navigate = useNavigate();
  const state = useAstro();
  const a = getAstrologer(id);
  const score = a.trustScore + (state.trustDelta[a.id] ?? 0);
  const total = a.rate + a.platformFee;

  return (
    <AppShell>
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <section className="card-soft p-6">
          <div className="flex items-start gap-4">
            <img
              src={a.avatar}
              alt={a.name}
              width={512}
              height={512}
              className="h-20 w-20 shrink-0 rounded-2xl object-cover"
            />
            <div className="min-w-0">
              <h1 className="text-xl font-bold">{a.name}</h1>
              <p className="text-sm text-muted-foreground">{a.specialization}</p>
              <p className="mt-1 flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-gold text-gold" /> {a.rating} · {a.sessions.toLocaleString()} sessions
              </p>
            </div>
          </div>

          <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">About</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.about}</p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <Button variant="outline" className="rounded-xl" onClick={() => navigate({ to: "/consultation" })}>
              <MessageSquare className="mr-1.5 h-4 w-4" /> Chat
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={() => navigate({ to: "/consultation" })}>
              <Phone className="mr-1.5 h-4 w-4" /> Call
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={() => navigate({ to: "/consultation" })}>
              <Video className="mr-1.5 h-4 w-4" /> Video
            </Button>
          </div>

          <Button
            className="mt-3 h-12 w-full rounded-xl text-sm font-semibold"
            onClick={() => navigate({ to: "/consultation" })}
          >
            Start Consultation
          </Button>
        </section>

        <aside className="space-y-5">
          <div className="card-soft flex items-center gap-4 p-5">
            <TrustScoreRing score={score} />
            <div>
              <p className="text-sm font-semibold">Trust Score</p>
              <p className="text-xs text-muted-foreground">Transparent prototype metric</p>
              <Link
                to="/trust-score/$id"
                params={{ id: a.id }}
                className="mt-2 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                See breakdown
              </Link>
            </div>
          </div>

          <div className="card-soft p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Transparent pricing
            </h2>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="Astrologer fee" value={`₹${a.rate}/min`} />
              <Row label="Platform fee" value={`₹${a.platformFee}/min`} />
              <div className="border-t border-border pt-2">
                <Row label="Total" value={`₹${total}/min`} strong />
              </div>
              <Row label="Estimated cost for 10 min" value={`₹${total * 10}`} />
            </dl>
            <p className="mt-3 rounded-xl bg-secondary p-3 text-xs text-muted-foreground">
              Prototype estimate only — no payment is processed in this demo.
            </p>
          </div>

          <div className="card-soft p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Trust signals</h2>
            <div className="mt-3 space-y-3">
              {a.breakdown.slice(0, 3).map((b) => (
                <ScoreBar key={b.label} label={b.label} value={b.value} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={strong ? "font-semibold" : ""}>{value}</dd>
    </div>
  );
}