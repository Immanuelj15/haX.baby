/**
 * High-Quality Native Web Audio API Synthesizer
 * Custom crafted for Pip's Midnight Dream OS Lullaby Lab
 * Pure harmonic pentatonic celesta & music box bells.
 * Zero external audio files. Clean oscillator lifecycle, ADSR envelopes.
 */

class DreamAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    let savedMuted = false;
    let savedVol = 0.35;
    try {
      savedMuted = localStorage.getItem("pip_audio_muted") === "true";
      const volStr = localStorage.getItem("pip_audio_volume");
      if (volStr) savedVol = parseFloat(volStr);
    } catch {
      // ignore
    }

    this.isMuted = savedMuted;
    this.isPlayingLullaby = false;
    this.currentTimeout = null;
    this.activeNodes = new Set();
    this.listeners = new Set();
    this.volume = isNaN(savedVol) ? 0.35 : Math.max(0, Math.min(1, savedVol));
    this.tempo = 96; // dreamy, relaxed tempo in BPM
    this.preset = "musicBox"; // "musicBox" | "starChimes" | "dreamHarp"

    // Sleepy Pentatonic Lullaby Melody (C Major / A Minor Pentatonic - Pure & Soothing)
    // Frequencies: C4 (261.63), D4 (293.66), E4 (329.63), G4 (392.00), A4 (440.00), C5 (523.25), D5 (587.33), E5 (659.25), G5 (783.99)
    this.melody = [
      { note: 523.25, dur: 1.0, rest: 0.1 }, // C5
      { note: 659.25, dur: 1.0, rest: 0.1 }, // E5
      { note: 783.99, dur: 1.2, rest: 0.2 }, // G5
      { note: 659.25, dur: 0.8, rest: 0.1 }, // E5
      { note: 587.33, dur: 1.0, rest: 0.1 }, // D5
      { note: 523.25, dur: 1.5, rest: 0.3 }, // C5
      { note: 440.00, dur: 1.0, rest: 0.1 }, // A4
      { note: 392.00, dur: 1.2, rest: 0.2 }, // G4
      { note: 440.00, dur: 1.0, rest: 0.1 }, // A4
      { note: 523.25, dur: 1.8, rest: 0.4 }, // C5
      { note: 659.25, dur: 1.0, rest: 0.1 }, // E5
      { note: 783.99, dur: 1.5, rest: 0.2 }, // G5
      { note: 880.00, dur: 1.2, rest: 0.2 }, // A5
      { note: 783.99, dur: 1.0, rest: 0.1 }, // G5
      { note: 659.25, dur: 1.2, rest: 0.2 }, // E5
      { note: 523.25, dur: 2.2, rest: 0.6 }, // C5 (restful resolution)
    ];

    this.currentNoteIndex = 0;
  }

  // Initialize or resume AudioContext safely on user gesture
  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        console.warn("Web Audio API is not supported in this browser.");
        return null;
      }
      this.ctx = new AudioContextClass();

      // Master Gain for volume and mute control
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);

      // Lowpass filter for warm, cozy dream character (cuts harsh piercing frequencies)
      this.warmFilter = this.ctx.createBiquadFilter();
      this.warmFilter.type = "lowpass";
      this.warmFilter.frequency.setValueAtTime(2400, this.ctx.currentTime);
      this.warmFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      this.masterGain.connect(this.warmFilter);
      this.warmFilter.connect(this.ctx.destination);
    }

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    return this.ctx;
  }

  setMuted(muted) {
    this.isMuted = muted;
    try {
      localStorage.setItem("pip_audio_muted", String(muted));
    } catch {
      // ignore
    }
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(muted ? 0 : this.volume, now + 0.05);
    }
    this.notify();
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    try {
      localStorage.setItem("pip_audio_volume", String(this.volume));
    } catch {
      // ignore
    }
    if (this.masterGain && this.ctx && !this.isMuted) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.volume, now);
    }
    this.notify();
  }

  setPreset(preset) {
    this.preset = preset;
    this.notify();
  }

  // Plays a single delicate music box chime with ADSR envelope
  playChime(freq, duration = 1.0, customPreset = null) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const p = customPreset || this.preset;
    const now = this.ctx.currentTime;

    // Primary bell tone
    const osc1 = this.ctx.createOscillator();
    // Subtle overtone (metallic music box tine sparkle)
    const osc2 = this.ctx.createOscillator();

    const noteGain = this.ctx.createGain();

    if (p === "musicBox") {
      osc1.type = "sine";
      osc2.type = "triangle";
      osc1.frequency.setValueAtTime(freq, now);
      // Perfect fifth or octave shimmer overtone
      osc2.frequency.setValueAtTime(freq * 2.756, now); // classic celesta chime overtone
    } else if (p === "starChimes") {
      osc1.type = "triangle";
      osc2.type = "sine";
      osc1.frequency.setValueAtTime(freq * 1.5, now);
      osc2.frequency.setValueAtTime(freq * 3, now);
    } else {
      // dreamHarp
      osc1.type = "sine";
      osc2.type = "sine";
      osc1.frequency.setValueAtTime(freq, now);
      osc2.frequency.setValueAtTime(freq * 2, now);
    }

    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.18, now); // quiet shimmer
    osc2.connect(osc2Gain);
    osc2Gain.connect(noteGain);

    osc1.connect(noteGain);
    noteGain.connect(this.masterGain);

    // ADSR Envelope: Instant sweet attack, exponential natural decay
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.28, now + 0.012); // quick pluck
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.05);
    osc2.stop(now + duration + 0.05);

    this.activeNodes.add(osc1);
    this.activeNodes.add(osc2);

    osc1.onended = () => {
      this.activeNodes.delete(osc1);
      this.activeNodes.delete(osc2);
      osc1.disconnect();
      osc2.disconnect();
      noteGain.disconnect();
    };
  }

  // Play short interactive UI sparkles (button clicks, secrets, wishes)
  playUiSparkle(type = "click") {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    if (type === "click") {
      this.playChime(880, 0.25, "starChimes");
    } else if (type === "wish") {
      // Celestial 3-note arpeggio: C5 -> G5 -> C6
      const notes = [523.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        setTimeout(() => {
          this.playChime(freq, 0.6, "starChimes");
        }, i * 90);
      });
    } else if (type === "secret") {
      // Magical fanfare
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, i) => {
        setTimeout(() => {
          this.playChime(freq, 0.8, "musicBox");
        }, i * 110);
      });
    } else if (type === "page") {
      this.playChime(659.25, 0.35, "dreamHarp");
    }
  }

  // Starts the continuous lullaby sequencer
  startLullaby() {
    this.init();
    if (this.isPlayingLullaby) return;

    this.isPlayingLullaby = true;
    this.currentNoteIndex = 0;
    this.scheduleNextNote();
    this.notify();
  }

  scheduleNextNote() {
    if (!this.isPlayingLullaby) return;

    const noteObj = this.melody[this.currentNoteIndex];
    const duration = noteObj.dur * (100 / this.tempo);
    const delayMs = (noteObj.dur + noteObj.rest) * 1000 * (100 / this.tempo);

    this.playChime(noteObj.note, duration);

    this.notifyNoteChange(this.currentNoteIndex);

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;

    this.currentTimeout = setTimeout(() => {
      this.scheduleNextNote();
    }, delayMs);
  }

  // Stops all active oscillators cleanly and clears timers
  stopLullaby() {
    this.isPlayingLullaby = false;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }

    // Stop and disconnect all tracked active nodes
    this.activeNodes.forEach((node) => {
      try {
        node.stop();
        node.disconnect();
      } catch {
        // node might have already ended
      }
    });
    this.activeNodes.clear();

    this.notify();
  }

  toggleLullaby() {
    if (this.isPlayingLullaby) {
      this.stopLullaby();
    } else {
      this.startLullaby();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) =>
      fn({
        isPlaying: this.isPlayingLullaby,
        isMuted: this.isMuted,
        volume: this.volume,
        preset: this.preset,
        currentNote: this.currentNoteIndex,
      })
    );
  }

  notifyNoteChange(noteIdx) {
    this.listeners.forEach((fn) =>
      fn({
        isPlaying: this.isPlayingLullaby,
        isMuted: this.isMuted,
        volume: this.volume,
        preset: this.preset,
        currentNote: noteIdx,
      })
    );
  }
}

// Global Singleton for easy cross-component access
export const dreamAudio = new DreamAudioEngine();
