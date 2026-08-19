import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Brand } from "@/components/astro/Brand";
import { Button } from "@/components/ui/button";
import { personalizationCategories } from "@/lib/astro-data";
import { setAstroState, useAstro } from "@/lib/astro-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/personalization")({
  head: () => ({
    meta: [
      { title: "Personalize your guidance — AstroLive 2.0" },
      { name: "description", content: "Pick the life areas you want astrology guidance on." },
      { property: "og:title", content: "Personalize your guidance — AstroLive 2.0" },
      { property: "og:description", content: "Choose Career, Love, Money, Family and more." },
    ],
  }),
  component: PersonalizationPage,
});

function PersonalizationPage() {
  const navigate = useNavigate();
  const state = useAstro();
  const [selected, setSelected] = useState<string[]>(state.categories.length ? state.categories : ["Career"]);

  const toggle = (c: string) =>
    setSelected((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const onContinue = () => {
    if (selected.length === 0) {
      toast.error("Choose at least one area to continue.");
      return;
    }
    setAstroState({ categories: selected });
    navigate({ to: "/home" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 py-10">
      <Brand />
      <div className="card-soft w-full max-w-lg p-6 md:p-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step 1 of 2</span>
        <h1 className="mt-2 text-2xl font-bold">What brings you here today?</h1>
        <p className="mt-1 text-sm text-muted-foreground">Choose one or more areas you'd like guidance on.</p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {personalizationCategories.map((c) => {
            const active = selected.includes(c);
            return (
              <button
                key={c}
                onClick={() => toggle(c)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary",
                )}
              >
                {active && <Check className="h-3.5 w-3.5" />}
                {c}
              </button>
            );
          })}
        </div>

        <Button className="mt-8 h-12 w-full rounded-xl text-sm font-semibold" onClick={onContinue}>
          Continue
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {selected.length} selected · you can change this anytime in Profile
        </p>
      </div>
    </div>
  );
}