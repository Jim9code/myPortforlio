// Procedural Web Audio API sound engine for the Intro Preloader
// Uses a persistent singleton AudioContext + Master Compressor/Gain bus so sounds
// are rich, punchy, and clearly audible on both mobile phones and laptop speakers.

let sharedAudioCtx: AudioContext | null = null;
let sharedNoiseBuffer: AudioBuffer | null = null;
let sharedMasterBus: GainNode | null = null;

function getOrCreateAudioContext(): {
  ctx: AudioContext | null;
  noiseBuffer: AudioBuffer | null;
  masterBus: AudioNode | null;
} {
  if (typeof window === 'undefined') {
    return { ctx: null, noiseBuffer: null, masterBus: null };
  }

  try {
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return { ctx: null, noiseBuffer: null, masterBus: null };

      sharedAudioCtx = new AudioCtx();
      sharedNoiseBuffer = null;
      sharedMasterBus = null;
    }

    // Create a Master Boost + Dynamics Compressor bus so phone & laptop speakers
    // project loud, clear transients without digital clipping
    if (!sharedMasterBus && sharedAudioCtx) {
      const preGain = sharedAudioCtx.createGain();
      preGain.gain.value = 2.6;

      if (sharedAudioCtx.createDynamicsCompressor) {
        const compressor = sharedAudioCtx.createDynamicsCompressor();
        compressor.threshold.value = -14;
        compressor.knee.value = 10;
        compressor.ratio.value = 3.5;
        compressor.attack.value = 0.002;
        compressor.release.value = 0.12;

        preGain.connect(compressor);
        compressor.connect(sharedAudioCtx.destination);
      } else {
        preGain.connect(sharedAudioCtx.destination);
      }

      sharedMasterBus = preGain;
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
        // Full-bodied pink/white blend normalized for strong speaker projection
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.75) * 0.24;
        b6 = white * 0.115926;
      }
      sharedNoiseBuffer = buffer;
    }

    return {
      ctx: sharedAudioCtx,
      noiseBuffer: sharedNoiseBuffer,
      masterBus: sharedMasterBus || sharedAudioCtx.destination
    };
  } catch {
    return { ctx: null, noiseBuffer: null, masterBus: null };
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
   * Plays a warm, punchy analog thock + mid-range harmonic transient when each intro word appears.
   * Tuned specifically so small phone and laptop speakers reproduce it clearly.
   */
  public playWordReveal(wordIndex: number) {
    const { ctx, noiseBuffer, masterBus } = getOrCreateAudioContext();
    if (!ctx || !noiseBuffer || !masterBus) return;

    const scheduleNodes = () => {
      const now = ctx.currentTime + 0.005;

      // 1. Punchy triangle body thud (rich in 180-320Hz harmonics so phone speakers project it)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      const startFreq = wordIndex === 0 ? 220 : wordIndex === 1 ? 195 : 172;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.16);

      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.linearRampToValueAtTime(0.65, now + 0.008);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(oscGain);
      oscGain.connect(masterBus);
      osc.start(now);
      osc.stop(now + 0.19);

      // 2. Crisp mechanical / woody transient click (450Hz -> 130Hz)
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'sine';
      clickOsc.frequency.setValueAtTime(520 - wordIndex * 45, now);
      clickOsc.frequency.exponentialRampToValueAtTime(120, now + 0.035);

      clickGain.gain.setValueAtTime(0.001, now);
      clickGain.gain.linearRampToValueAtTime(0.42, now + 0.003);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      clickOsc.connect(clickGain);
      clickGain.connect(masterBus);
      clickOsc.start(now);
      clickOsc.stop(now + 0.045);

      // 3. Textured matte-paper transient burst
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1350 + wordIndex * 200, now);
      filter.Q.setValueAtTime(1.2, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.58, now + 0.004);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterBus);

      noise.start(now, Math.random() * 0.5);
      noise.stop(now + 0.07);
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
   * Plays a crisp matte-cardstock finger tap sound panned to the tapped column.
   */
  public playTileTap(normalizedX = 0.5) {
    const { ctx, noiseBuffer, masterBus } = getOrCreateAudioContext();
    if (!ctx || !noiseBuffer || !masterBus) return;

    const scheduleTap = () => {
      const now = ctx.currentTime + 0.002;
      const panValue = (normalizedX - 0.5) * 1.4;

      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(68, now + 0.055);

      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.linearRampToValueAtTime(0.55, now + 0.004);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1750, now);
      filter.Q.setValueAtTime(1.3, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.5, now + 0.003);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      if (panner) {
        panner.pan.setValueAtTime(panValue, now);
        osc.connect(oscGain);
        oscGain.connect(panner);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(panner);
        panner.connect(masterBus);
      } else {
        osc.connect(oscGain);
        oscGain.connect(masterBus);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(masterBus);
      }

      osc.start(now);
      osc.stop(now + 0.065);
      noise.start(now, Math.random() * 0.4);
      noise.stop(now + 0.05);
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
    const { ctx, noiseBuffer, masterBus } = getOrCreateAudioContext();
    if (!ctx || !noiseBuffer || !masterBus) return;

    const scheduleCascade = () => {
      const baseTime = ctx.currentTime + 0.005;

      const bursts: Array<{ delay: number; pan: number; isOrigin?: boolean }> = [];

      if (tileEvents && tileEvents.length > 0) {
        const sorted = [...tileEvents].sort((a, b) => a.delay - b.delay);
        const step = Math.max(1, Math.floor(sorted.length / 14));
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

        // Part A: Rich Paper Flick / Friction Swish ("ffft-shh" wider bandpass sweep)
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;

        const bandpass = ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        const pitchVariance = 0.88 + Math.random() * 0.3;
        bandpass.frequency.setValueAtTime(780 * pitchVariance, startTime);
        bandpass.frequency.exponentialRampToValueAtTime(2800 * pitchVariance, startTime + 0.042);
        bandpass.frequency.exponentialRampToValueAtTime(1050 * pitchVariance, startTime + 0.11);
        // Wider Q (1.35) lets much more mid-range paper body through on mobile speakers
        bandpass.Q.setValueAtTime(1.35, startTime);

        const flickGain = ctx.createGain();
        const peakVolume = isOrigin ? 0.78 : 0.48 + Math.random() * 0.22;
        flickGain.gain.setValueAtTime(0.0001, startTime);
        flickGain.gain.linearRampToValueAtTime(peakVolume, startTime + 0.015);
        flickGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.115);

        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

        noise.connect(bandpass);
        bandpass.connect(flickGain);

        if (panner) {
          panner.pan.setValueAtTime(pan, startTime);
          flickGain.connect(panner);
          panner.connect(masterBus);
        } else {
          flickGain.connect(masterBus);
        }

        noise.start(startTime, Math.random() * 0.6);
        noise.stop(startTime + 0.125);

        // Part B: Tactile Cardstock Settle Snap (+50ms after the flick begins)
        const snapTime = startTime + 0.05;
        const snapOsc = ctx.createOscillator();
        const snapGain = ctx.createGain();

        snapOsc.type = 'triangle';
        snapOsc.frequency.setValueAtTime(280 * pitchVariance, snapTime);
        snapOsc.frequency.exponentialRampToValueAtTime(75, snapTime + 0.036);

        snapGain.gain.setValueAtTime(0.0001, snapTime);
        snapGain.gain.linearRampToValueAtTime(0.32, snapTime + 0.004);
        snapGain.gain.exponentialRampToValueAtTime(0.0001, snapTime + 0.04);

        snapOsc.connect(snapGain);
        if (panner) {
          snapGain.connect(panner);
        } else {
          snapGain.connect(masterBus);
        }

        snapOsc.start(snapTime);
        snapOsc.stop(snapTime + 0.045);
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
