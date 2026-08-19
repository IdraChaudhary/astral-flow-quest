import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Flame, MessageCircleHeart, ShieldCheck, Sparkles, Sun } from "lucide-react";
import { AppShell } from "@/components/astro/AppShell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { existingServices } from "@/lib/astro-data";
import { setAstroState, useAstro } from "@/lib/astro-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — AstroLive 2.0" },
      { name: "description", content: "Your daily insight, streak and AI guidance in one dashboard." },
      { property: "og:title", content: "Home — AstroLive 2.0" },
      { property: "og:description", content: "Daily insight, AI guidance and trusted astrologer discovery." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const state = useAstro();
  const [insightOpen, setInsightOpen] = useState(false);
  const [service, setService] = useState<string | null>(null);
  const focus = state.categories[0] ?? "Career";

  const checkIn = () => {
    if (state.checkedInToday) {
      toast("You've already checked in today ✨");
      return;
    }
    setAstroState((s) => ({ streak: s.streak + 1, checkedInToday: true }));
    toast.success("Daily check-in complete. Streak extended!");
  };

  return (
    <AppShell>
      <div className="space-y-8">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold md:text-3xl">Good morning, {state.userName} 👋</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Focus areas: {state.categories.join(" · ") || "Career"}
            </p>
          </div>
          <span className="hidden shrink-0 rounded-full border border-gold/50 bg-gold-soft px-3 py-1 text-xs font-semibold text-gold-foreground md:inline-flex">
            Demo Mode
          </span>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="card-soft starfield relative overflow-hidden p-5 md:col-span-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sun className="h-4 w-4" /> Your Daily Insight
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Focus: {focus}</p>
            <p className="mt-3 max-w-xl text-lg font-medium leading-relaxed">
              You may find new opportunities if you take one small step today.
            </p>
            <Button className="mt-5 rounded-xl" onClick={() => setInsightOpen(true)}>
              View Full Insight
            </Button>
          </article>

          <article className="card-soft p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-foreground">
              <Flame className="h-4 w-4" /> {state.streak} Day Streak
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  aria-label={`Day ${i + 1} ${i < state.streak ? "completed" : "pending"}`}
                  className={cn(
                    "h-6 w-6 rounded-full border",
                    i < state.streak ? "border-success bg-success" : "border-border bg-secondary",
                  )}
                />
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">You're doing great! Keep your streak going 🔥</p>
            <Button variant="outline" className="mt-4 w-full rounded-xl" onClick={checkIn}>
              {state.checkedInToday ? "Checked in today" : "Daily check-in"}
            </Button>
          </article>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Pillar
            icon={<Sparkles className="h-5 w-5" />}
            title="AI Guidance"
            body="Tell us what's on your mind. Our AI understands and routes you to the right help."
            cta={
              <Button asChild className="w-full rounded-xl">
                <Link to="/triage">What's on my mind?</Link>
              </Button>
            }
            highlight
          />
          <Pillar
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Trusted Discovery"
            body="Compare astrologers with a transparent Trust Score built on feedback and prediction accountability."
            cta={
              <Button asChild variant="outline" className="w-full rounded-xl">
                <Link to="/astrologers">See top matches</Link>
              </Button>
            }
          />
          <Pillar
            icon={<MessageCircleHeart className="h-5 w-5" />}
            title="Prediction Accountability"
            body="Every prediction is saved, followed up and scored — so trust is earned, not claimed."
            cta={
              <Button asChild variant="outline" className="w-full rounded-xl">
                <Link to="/journey">Open My Journey</Link>
              </Button>
            }
          />
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            More AstroLive Services
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {existingServices.map((s) => (
              <button
                key={s}
                onClick={() => setService(s)}
                className="rounded-2xl border border-border bg-secondary/60 px-3 py-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary"
              >
                {s}
              </button>
            ))}
          </div>
        </section>
      </div>

      <Link
        to="/triage"
        className="fixed bottom-20 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg md:hidden"
      >
        <Sparkles className="h-4 w-4" /> What's on my mind?
      </Link>

      <Dialog open={insightOpen} onOpenChange={setInsightOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Today's focus: {focus}</DialogTitle>
            <DialogDescription>Personalized reading for {state.userName}</DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Movement in your career house suggests conversations that were stuck may reopen this week. Progress will
            come from clarity, not speed — you are being asked to choose direction over urgency.
          </p>
          <div className="rounded-xl border border-gold/40 bg-gold-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-foreground">Suggested action</p>
            <p className="mt-1 text-sm">Write down the one question you'd want answered before deciding.</p>
          </div>
          <Button className="rounded-xl" onClick={() => setInsightOpen(false)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={service !== null} onOpenChange={(o) => !o && setService(null)}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>{service}</DialogTitle>
            <DialogDescription>Existing AstroLive service</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This existing AstroLive service is available in the full product. It's kept as-is in the 2.0 prototype.
          </p>
          <Button className="rounded-xl" onClick={() => setService(null)}>
            Got it
          </Button>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function Pillar({
  icon,
  title,
  body,
  cta,
  highlight,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  cta: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <article
      className={cn(
        "card-soft flex flex-col gap-3 p-5",
        highlight && "border-primary/40 bg-primary-soft/40",
      )}
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">{icon}</span>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="flex-1 text-sm text-muted-foreground">{body}</p>
      {cta}
    </article>
  );
}