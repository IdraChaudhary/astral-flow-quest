import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Route as RouteIcon, Sparkle, User } from "lucide-react";
import type { ReactNode } from "react";
import { Brand } from "./Brand";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/home", label: "Home", mobile: "Home", icon: Home },
  { to: "/journey", label: "My Journey", mobile: "Journey", icon: RouteIcon },
  { to: "/astrologers", label: "Astrologers", mobile: "Astrologers", icon: Sparkle },
  { to: "/profile", label: "Profile", mobile: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3">
          <Link to="/home" className="min-w-0">
            <Brand />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary-soft text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <span className="rounded-full border border-gold/50 bg-gold-soft px-3 py-1 text-[11px] font-semibold text-gold-foreground md:hidden">
            Demo
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1200px] px-4 pb-28 pt-6 md:pb-16">{children}</main>

      <footer className="hidden border-t border-border/70 py-6 text-center text-xs text-muted-foreground md:block">
        Demo Mode · AstroHack 2026 prototype. Mock data only — no real predictions, payments or accounts.
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur md:hidden">
        <div className="grid grid-cols-4">
          {nav.map((item) => {
            const active = pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.mobile}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}