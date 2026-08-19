import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { AppShell } from "@/components/astro/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setAstroState } from "@/lib/astro-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/triage")({
  head: () => ({
    meta: [
      { title: "AI Triage — AstroLive 2.0" },
      { name: "description", content: "Tell the AI what's on your mind and get routed to the right astrologer." },
      { property: "og:title", content: "AI Triage — AstroLive 2.0" },
      { property: "og:description", content: "A guided AI conversation that understands your concern." },
    ],
  }),
  component: TriagePage,
});

const priorityOptions = ["Salary", "Growth", "Stability", "Work-life Balance"];

function TriagePage() {
  const navigate = useNavigate();
  const [priorities, setPriorities] = useState<string[]>(["Growth", "Stability"]);
  const [concern, setConcern] = useState("Will accepting this opportunity be good for my career?");
  const [thinking, setThinking] = useState(false);

  const submit = () => {
    setThinking(true);
    setAstroState({ priorities, concern });
    window.setTimeout(() => navigate({ to: "/analysis" }), 800);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold">What's on your mind?</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A short AI conversation so we understand your concern before recommending anyone.
        </p>

        <div className="card-soft mt-5 space-y-4 p-5">
          <Bubble role="user">I'm confused about whether I should accept this job offer.</Bubble>
          <Bubble role="ai">I understand. I'll help you with that. Let me ask a few quick questions.</Bubble>
          <Bubble role="ai">What matters most to you right now?</Bubble>

          <div className="flex flex-wrap gap-2 pl-1">
            {priorityOptions.map((p) => {
              const active = priorities.includes(p);
              return (
                <button
                  key={p}
                  aria-pressed={active}
                  onClick={() =>
                    setPriorities((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]))
                  }
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-border bg-card hover:bg-secondary",
                  )}
                >
                  {p}
                </button>
              );
            })}
          </div>

          <Bubble role="ai">Any specific concern you want clarity on?</Bubble>

          <form
            className="space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <Label htmlFor="concern" className="text-xs text-muted-foreground">
              Your concern
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="concern"
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                placeholder="Type your concern…"
                className="h-12 rounded-xl"
              />
              <Button
                type="submit"
                size="icon"
                className="h-12 w-12 shrink-0 rounded-xl"
                aria-label="Send concern to AI"
                disabled={thinking || concern.trim().length === 0}
              >
                {thinking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </form>

          {thinking && (
            <p className="flex items-center gap-2 text-sm text-primary">
              <Loader2 className="h-4 w-4 animate-spin" /> Understanding your concern…
            </p>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Bubble({ role, children }: { role: "ai" | "user"; children: React.ReactNode }) {
  return (
    <div className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
      <p
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          role === "user"
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-secondary text-secondary-foreground",
        )}
      >
        {children}
      </p>
    </div>
  );
}