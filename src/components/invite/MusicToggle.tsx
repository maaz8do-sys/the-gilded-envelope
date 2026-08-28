import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Discreet ambient score generated with the Web Audio API (no third-party audio),
 * only started after an explicit user interaction.
 */
export function MusicToggle({ start }: { start: boolean }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!start) return;
    setReady(true);
    void begin();
    return () => {
      void ctxRef.current?.close();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  async function begin() {
    if (ctxRef.current) {
      await ctxRef.current.resume();
      gainRef.current?.gain.setTargetAtTime(0.05, ctxRef.current.currentTime, 1.2);
      setPlaying(true);
      return;
    }
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const notes = [220, 277.18, 329.63, 440, 554.37];
    notes.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.045 + i * 0.021;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.11;
      lfo.connect(lfoGain).connect(g.gain);
      osc.connect(g).connect(master);
      osc.start();
      lfo.start();
    });

    ctxRef.current = ctx;
    gainRef.current = master;
    master.gain.setTargetAtTime(0.05, ctx.currentTime, 2.5);
    setPlaying(true);
  }

  function toggle() {
    const ctx = ctxRef.current;
    if (!ctx || !gainRef.current) {
      void begin();
      return;
    }
    if (playing) {
      gainRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
      setPlaying(false);
    } else {
      void ctx.resume();
      gainRef.current.gain.setTargetAtTime(0.05, ctx.currentTime, 1.2);
      setPlaying(true);
    }
  }

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ivory/85 text-gold-deep shadow-[var(--shadow-paper)] backdrop-blur transition-colors hover:bg-cream"
    >
      {playing ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
    </button>
  );
}
