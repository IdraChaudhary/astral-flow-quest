import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Brand } from "@/components/astro/Brand";
import { getAstroState } from "@/lib/astro-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AstroLive 2.0 — AI Astrology Discovery & Trust" },
      {
        name: "description",
        content:
          "Tell us your problem, our AI understands it and matches you with a trusted astrologer. Prototype for AstroHack 2026.",
      },
      { property: "og:title", content: "AstroLive 2.0" },
      { property: "og:description", content: "AI triage, Trust Scores and prediction accountability." },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = window.setTimeout(() => {
      navigate({ to: getAstroState().loggedIn ? "/home" : "/login" });
    }, 500);
    return () => window.clearTimeout(t);
  }, [navigate]);

  return (
    <div className="starfield grid min-h-screen place-items-center bg-background px-4">
      <div className="text-center">
        <Brand className="justify-center" />
        <h1 className="mt-6 text-2xl font-bold">AI-powered discovery, trust & habit-forming astrology</h1>
        <p className="mt-2 text-sm text-muted-foreground">Loading your experience…</p>
      </div>
    </div>
  );
}
