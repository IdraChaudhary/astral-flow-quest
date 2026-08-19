import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { AppShell } from "@/components/astro/AppShell";
import { useAstro } from "@/lib/astro-store";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: "AI Analysis — AstroLive 2.0" },
      { name: "description", content: "Your concern categorized by the AI before astrologer matching." },
      { property: "og:title", content: "AI Analysis — AstroLive 2.0" },
      { property: "og:description", content: "Career → Job Decision, matched to the right specialists." },
    ],
  }),
  component: AnalysisPage,
});

function AnalysisPage() {
  const navigate = useNavigate();
  const state = useAstro();
  const [phase, setPhase] = useState<"processing" | "result">("processing");

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("result"), 700);
    const t2 = window.setTimeout(() => navigate({ to: "/astrologers" }), 2000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [navigate]);

  return (
    <AppShell>
      <div className="mx-auto max-w-xl text-center">
        {phase === "processing" ? (
          <p className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Analyzing your concern…
          </p>
        ) : (
          <div className="space-y-6">
            <p className="text-sm font-medium text-success">We've understood your concern.</p>
            <div className="card-soft starfield p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Concern</p>
              <p className="mt-3 font-display text-2xl font-bold">Career → Job Decision</p>
              <p className="mt-3 text-sm text-muted-foreground">“{state.concern}”</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {state.priorities.map((p) => (
                  <span key={p} className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm font-medium">Let's find the best astrologers for you.</p>
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
            <p className="text-xs text-muted-foreground">
              We matched your concern with astrologers based on specialization, experience, user feedback and Trust
              Score.
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}