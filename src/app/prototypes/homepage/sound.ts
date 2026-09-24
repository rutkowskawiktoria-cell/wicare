// A quiet, generative ambient bed (no audio files): detuned low sines through a slowly
// breathing low-pass, plus soft "ticks" for hovers. Off until the visitor turns it on.
export type Ambient = { setOn: (on: boolean) => void; tick: () => void; swell: (v: number) => void; dispose: () => void };

export function createAmbient(): Ambient {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let filter: BiquadFilterNode | null = null;
  const nodes: AudioScheduledSourceNode[] = [];
  const build = () => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 520;
    filter.Q.value = 0.7;
    filter.connect(master);
    master.connect(ctx.destination);
    // a low D-minor-ish drone: D2, A2, F3 (slightly detuned pairs)
    [73.42, 73.9, 110, 110.6, 174.6].forEach((f, i) => {
      const o = ctx!.createOscillator();
      o.type = i === 4 ? 'triangle' : 'sine';
      o.frequency.value = f;
      const g = ctx!.createGain();
      g.gain.value = i === 4 ? 0.05 : 0.12;
      o.connect(g).connect(filter!);
      o.start();
      nodes.push(o);
    });
    // breathing: an LFO on the filter cutoff
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lg = ctx.createGain();
    lg.gain.value = 180;
    lfo.connect(lg).connect(filter.frequency);
    lfo.start();
    nodes.push(lfo);
  };
  return {
    setOn: (on) => {
      if (on && !ctx) build();
      if (!ctx || !master) return;
      if (on) void ctx.resume();
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setTargetAtTime(on ? 0.06 : 0, t, on ? 0.8 : 0.25);
    },
    tick: () => {
      if (!ctx || !master || master.gain.value < 0.01) return;
      const t = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(1480, t);
      o.frequency.exponentialRampToValueAtTime(880, t + 0.08);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.05, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.14);
    },
    swell: (v) => {
      if (!ctx || !filter) return;
      filter.frequency.setTargetAtTime(520 + Math.min(Math.abs(v), 3) * 420, ctx.currentTime, 0.2);
    },
    dispose: () => {
      nodes.forEach((n) => {
        try {
          n.stop();
        } catch {}
      });
      void ctx?.close();
      ctx = null;
    },
  };
}
