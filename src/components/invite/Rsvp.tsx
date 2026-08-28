import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Rsvp() {
  const [sent, setSent] = useState(false);
  const [attending, setAttending] = useState<"yes" | "no">("yes");

  function submit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const field =
    "w-full border-0 border-b border-gold/40 bg-transparent px-0 py-2 font-sans text-sm text-ink outline-none placeholder:text-muted-foreground/70 focus:border-gold";

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.p
          key="thanks"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-sm text-center font-display text-xl italic text-ink"
        >
          Thank you — your response has been noted with joy.
        </motion.p>
      ) : (
        <motion.form
          key="form"
          onSubmit={submit}
          exit={{ opacity: 0, y: -10 }}
          className="mx-auto flex max-w-sm flex-col gap-7 text-left"
        >
          <label className="block">
            <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
              Guest name
            </span>
            <input required name="name" className={field} placeholder="Your full name" />
          </label>

          <div>
            <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
              Will you attend?
            </span>
            <div className="mt-3 flex gap-3">
              {(["yes", "no"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAttending(v)}
                  className={`flex-1 border px-3 py-2.5 font-sans text-[10px] uppercase tracking-[0.2em] transition-colors ${
                    attending === v
                      ? "border-gold bg-champagne/50 text-ink"
                      : "border-gold/30 text-muted-foreground hover:border-gold/60"
                  }`}
                >
                  {v === "yes" ? "Attending" : "Not attending"}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
              Number of guests
            </span>
            <input
              type="number"
              min={1}
              max={12}
              defaultValue={1}
              disabled={attending === "no"}
              className={`${field} disabled:opacity-40`}
            />
          </label>

          <label className="block">
            <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
              A message for the couple
            </span>
            <textarea rows={3} className={`${field} resize-none`} placeholder="Warmest wishes…" />
          </label>

          <button
            type="submit"
            className="mt-1 border border-gold bg-transparent px-6 py-3 font-sans text-[10px] uppercase tracking-luxe text-gold-deep transition-colors hover:bg-champagne/40"
          >
            Send response
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
