import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Mic, PhoneOff, Send } from "lucide-react";
import { AppShell } from "@/components/astro/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getAstrologer } from "@/lib/astro-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Consultation — AstroLive 2.0" },
      { name: "description", content: "Live chat consultation with a matched astrologer and live cost tracking." },
      { property: "og:title", content: "Consultation — AstroLive 2.0" },
      { property: "og:description", content: "Realistic chat consultation with transparent per-minute cost." },
    ],
  }),
  component: ConsultationPage,
});

type Msg = { from: "astrologer" | "user"; text: string; time: string };

const initial: Msg[] = [
  {
    from: "astrologer",
    text: "I see strong potential in this opportunity, but there are a few things to evaluate carefully.",
    time: "10:02 AM",
  },
  { from: "user", text: "What should I keep in mind?", time: "10:03 AM" },
  {
    from: "astrologer",
    text: "Focus on long term growth and skill building. Avoid rushing the decision.",
    time: "10:04 AM",
  },
];

const replies = [
  "That's a fair concern. The next two weeks bring clearer signals — note what changes.",
  "Your chart favours steady building over quick jumps right now.",
  "Ask for the details in writing before committing. Clarity protects you here.",
];

function fmt(sec: number) {
  return `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
}

function ConsultationPage() {
  const navigate = useNavigate();
  const a = getAstrologer("a");
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [draft, setDraft] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const i = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(i);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const cost = Math.max(1, Math.ceil(elapsed / 60)) * (a.rate + a.platformFee);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((m) => [...m, { from: "user", text, time }]);
    setDraft("");
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: "astrologer", text: replies[m.length % replies.length], time },
      ]);
    }, 900);
  };

  return (
    <AppShell>
      <div className="mx-auto flex max-w-2xl flex-col">
        <header className="card-soft grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <img src={a.avatar} alt={a.name} width={512} height={512} className="h-11 w-11 shrink-0 rounded-xl object-cover" />
            <div className="min-w-0">
              <p className="truncate font-semibold">{a.name}</p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-success" /> Online · {a.specialization}
              </p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-sm font-semibold">{fmt(elapsed)}</p>
            <p className="text-xs text-muted-foreground">Est. ₹{cost}</p>
          </div>
        </header>

        <div className="card-soft mt-3 flex min-h-[45vh] flex-col gap-3 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.from === "user"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md bg-secondary text-secondary-foreground",
                )}
              >
                {m.text}
                <span
                  className={cn(
                    "mt-1 block text-[10px]",
                    m.from === "user" ? "text-primary-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form
          className="mt-3 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-12 w-12 shrink-0 rounded-xl"
            aria-label="Voice message"
            onClick={() => toast("Voice notes are available in the full product.")}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type message…"
            aria-label="Message"
            className="h-12 rounded-xl"
          />
          <Button type="submit" size="icon" className="h-12 w-12 shrink-0 rounded-xl" aria-label="Send message">
            <Send className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="h-12 w-12 shrink-0 rounded-xl"
            aria-label="End consultation"
            onClick={() => setConfirm(true)}
          >
            <PhoneOff className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>End consultation?</DialogTitle>
            <DialogDescription>
              Your summary and prediction will be saved to My Journey.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="rounded-xl" onClick={() => setConfirm(false)}>
              Continue
            </Button>
            <Button
              variant="destructive"
              className="rounded-xl"
              onClick={() => navigate({ to: "/consultation-summary" })}
            >
              End Consultation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}