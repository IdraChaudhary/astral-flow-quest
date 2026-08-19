import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Phone } from "lucide-react";
import { Brand } from "@/components/astro/Brand";
import { Button } from "@/components/ui/button";
import { setAstroState } from "@/lib/astro-store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — AstroLive 2.0" },
      { name: "description", content: "Sign in to AstroLive 2.0 to get personalized astrology guidance." },
      { property: "og:title", content: "Sign in — AstroLive 2.0" },
      { property: "og:description", content: "Demo sign-in for the AstroLive 2.0 prototype." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);

  const signIn = (method: string) => {
    setLoading(method);
    window.setTimeout(() => {
      setAstroState({ loggedIn: true, userName: "Idra", email: "idra@example.com" });
      navigate({ to: "/personalization" });
    }, 500);
  };

  return (
    <div className="starfield flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 py-10">
      <Brand />
      <div className="card-soft w-full max-w-sm p-6 text-center">
        <h1 className="text-xl font-bold">Sign in to continue</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Personalized insights, AI guidance and trusted astrologers.
        </p>

        <div className="mt-6 space-y-3">
          <Button
            variant="outline"
            className="h-12 w-full justify-center gap-2 rounded-xl text-sm font-semibold"
            onClick={() => signIn("google")}
            disabled={loading !== null}
          >
            {loading === "google" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span className="font-display text-base text-primary">G</span>
            )}
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="h-12 w-full justify-center gap-2 rounded-xl text-sm font-semibold"
            onClick={() => signIn("phone")}
            disabled={loading !== null}
          >
            {loading === "phone" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Phone className="h-4 w-4" />}
            Continue with Phone
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          New user?{" "}
          <button
            className="font-semibold text-primary underline-offset-4 hover:underline"
            onClick={() => signIn("google")}
          >
            Create account
          </button>
        </p>
      </div>
      <p className="text-xs text-muted-foreground">Demo Mode · no real authentication</p>
    </div>
  );
}