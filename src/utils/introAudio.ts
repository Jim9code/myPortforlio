// Procedural Web Audio API sound engine for the Intro Preloader
// Uses a persistent singleton AudioContext so React StrictMode double-mounts
// never close or interrupt the audio pipeline on page refresh.

let sharedAudioCtx: AudioContext | null = null;
let sharedNoiseBuffer: AudioBuffer | null = null;

function getOrCreateAudioContext(): {
  ctx: AudioContext | null;
  noiseBuffer: AudioBuffer | null;
} {
  if (typeof window === 'undefined') {
    return { ctx: null, noiseBuffer: null };
  }

  try {
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return { ctx: null, noiseBuffer: null };

      sharedAudioCtx = new AudioCtx();
      sharedNoiseBuffer = null;
    }

    if (!sharedNoiseBuffer && sharedAudioCtx) {
      const sampleRate = sharedAudioCtx.sampleRate;
      const buffer = sharedAudioCtx.createBuffer(1, sampleRate, sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0,
        b1 = 0,
        b2 = 0,
        b3 = 0,
        b4 = 0,
        b5 = 0,
        b6 = 0;

      for (let i = 0; i < sampleRate; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
        b6 = white * 0.115926;
      }
      sharedNoiseBuffer = buffer;
    }

    return { ctx: sharedAudioCtx, noiseBuffer: sharedNoiseBuffer };
  } catch {
    return { ctx: null, noiseBuffer: null };
  }
}

class IntroSoundEngine {
  /**
   * Attempts to resume the shared AudioContext and returns true if audio is unlocked and running.
   */
  public async tryUnlock(): Promise<boolean> {
    const { ctx } = getOrCreateAudioContext();
    if (!ctx) return false;

    if (ctx.state === 'running') {
      return true;
    }

    try {
      // Race resume() against a short 120ms timeout in case the browser blocks unprompted autoplay
      await Promise.race([
        ctx.resume(),
        new Promise((resolve) => setTimeout(resolve, 120))
      ]);
    } catch {
      // Ignore
    }

    return ctx.state === 'running';
  }

  public isRunning(): boolean {
    const { ctx } = getOrCreateAudioContext();
    return Boolean(ctx && ctx.state === 'running');
  }

  /**
   * Plays a warm, tactile analog thock + soft sub-pulse when each intro word appears.
   */
  public playWordReveal(wordIndex: number) {
    const { ctx, noiseBuffer } = getOrCreateAudioContext();
    if (!ctx || !noiseBuffer) return;

    const scheduleNodes = () => {
      const now = ctx.currentTime + 0.005;

      // 1. Warm low-end cinematic thud
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      const startFreq = wordIndex === 0 ? 120 : wordIndex === 1 ? 108 : 94;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(34, now + 0.15);

      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.linearRampToValueAtTime(0.26, now + 0.012);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.17);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);

      // 2. Crisp matte-paper / mechanical key transient
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1150 + wordIndex * 180, now);
      filter.Q.setValueAtTime(1.8, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.22, now + 0.004);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now, Math.random() * 0.5);
      noise.stop(now + 0.055);
    };

    if (ctx.state === 'suspended') {
      ctx
        .resume()
        .then(scheduleNodes)
        .catch(() => {});
    } else {
      scheduleNodes();
    }
  }

  /**
   * Plays a subtle, crisp matte-cardstock finger tap sound panned to the tapped column.
   */
  public playTileTap(normalizedX = 0.5) {
    const { ctx, noiseBuffer } = getOrCreateAudioContext();
    if (!ctx || !noiseBuffer) return;

    const scheduleTap = () => {
      const now = ctx.currentTime + 0.002;
      const panValue = (normalizedX - 0.5) * 1.4;

      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(165, now);
      osc.frequency.exponentialRampToValueAtTime(48, now + 0.045);

      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.linearRampToValueAtTime(0.18, now + 0.004);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.Q.setValueAtTime(2.2, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.14, now + 0.003);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);

      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      if (panner) {
        panner.pan.setValueAtTime(panValue, now);
        osc.connect(oscGain);
        oscGain.connect(panner);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(panner);
        panner.connect(ctx.destination);
      } else {
        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
      }

      osc.start(now);
      osc.stop(now + 0.055);
      noise.start(now, Math.random() * 0.4);
      noise.stop(now + 0.038);
    };

    if (ctx.state === 'suspended') {
      ctx
        .resume()
        .then(scheduleTap)
        .catch(() => {});
    } else {
      scheduleTap();
    }
  }

  /**
   * Synthesizes a stereo-panned cascade of heavy cardstock / paper flicking sounds
   * timed to the organic scattered tile flips starting from the tapped tile.
   */
  public playTilePaperCascade(
    cols: number,
    rows: number,
    tileEvents?: Array<{ delay: number; col: number }>
  ) {
    const { ctx, noiseBuffer } = getOrCreateAudioContext();
    if (!ctx || !noiseBuffer) return;

    const scheduleCascade = () => {
      const baseTime = ctx.currentTime + 0.005;

      // Sample ~12-14 distinct audio bursts from the scattered tile events so the sound
      // starts immediately at the tapped tile (delay 0) and scatters organically in stereo
      const bursts: Array<{ delay: number; pan: number; isOrigin?: boolean }> = [];

      if (tileEvents && tileEvents.length > 0) {
        const sorted = [...tileEvents].sort((a, b) => a.delay - b.delay);
        const step = Math.max(1, Math.floor(sorted.length / 13));
        for (let i = 0; i < sorted.length; i += step) {
          const item = sorted[i];
          bursts.push({
            delay: item.delay,
            pan: (item.col / Math.max(cols - 1, 1) - 0.5) * 1.5,
            isOrigin: i === 0
          });
        }
      } else {
        const totalBursts = cols + rows - 1;
        for (let d = 0; d < totalBursts; d++) {
          bursts.push({
            delay: d * 0.068 + Math.random() * 0.025,
            pan: (d / Math.max(totalBursts - 1, 1) - 0.5) * 1.5,
            isOrigin: d === 0
          });
        }
      }

      bursts.forEach(({ delay, pan, isOrigin }) => {
        const startTime = baseTime + delay;

        // Part A: Paper Flick / Friction Swish ("ffft-shh" bandpass sweep)
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;

        const bandpass = ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        const pitchVariance = 0.86 + Math.random() * 0.32;
        bandpass.frequency.setValueAtTime(850 * pitchVariance, startTime);
        bandpass.frequency.exponentialRampToValueAtTime(2600 * pitchVariance, startTime + 0.038);
        bandpass.frequency.exponentialRampToValueAtTime(1100 * pitchVariance, startTime + 0.095);
        bandpass.Q.setValueAtTime(2.4, startTime);

        const flickGain = ctx.createGain();
        const peakVolume = isOrigin ? 0.25 : 0.14 + Math.random() * 0.1;
        flickGain.gain.setValueAtTime(0.0001, startTime);
        flickGain.gain.linearRampToValueAtTime(peakVolume, startTime + 0.016);
        flickGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.095);

        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

        noise.connect(bandpass);
        bandpass.connect(flickGain);

        if (panner) {
          panner.pan.setValueAtTime(pan, startTime);
          flickGain.connect(panner);
          panner.connect(ctx.destination);
        } else {
          flickGain.connect(ctx.destination);
        }

        noise.start(startTime, Math.random() * 0.6);
        noise.stop(startTime + 0.11);

        // Part B: Soft Cardstock Settle Snap (+55ms after the flick begins)
        const snapTime = startTime + 0.055;
        const snapOsc = ctx.createOscillator();
        const snapGain = ctx.createGain();

        snapOsc.type = 'triangle';
        snapOsc.frequency.setValueAtTime(190 * pitchVariance, snapTime);
        snapOsc.frequency.exponentialRampToValueAtTime(58, snapTime + 0.028);

        snapGain.gain.setValueAtTime(0.0001, snapTime);
        snapGain.gain.linearRampToValueAtTime(0.075, snapTime + 0.003);
        snapGain.gain.exponentialRampToValueAtTime(0.0001, snapTime + 0.03);

        snapOsc.connect(snapGain);
        if (panner) {
          snapGain.connect(panner);
        } else {
          snapGain.connect(ctx.destination);
        }

        snapOsc.start(snapTime);
        snapOsc.stop(snapTime + 0.035);
      });
    };

    if (ctx.state === 'suspended') {
      ctx
        .resume()
        .then(scheduleCascade)
        .catch(() => {});
    } else {
      scheduleCascade();
    }
  }

  /**
   * Suspends the shared context once the intro finishes so zero audio runs afterward,
   * while keeping it ready if the component ever remounts.
   */
  public suspend() {
    if (sharedAudioCtx && sharedAudioCtx.state === 'running') {
      sharedAudioCtx.suspend().catch(() => {});
    }
  }
}

export default IntroSoundEngine;
