import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles, Disc, Radio } from "lucide-react";
import { dreamAudio } from "../../utils/audioSynth";

export function LullabyPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeNote, setActiveNote] = useState(0);
  const [preset, setPreset] = useState("musicBox");
  const [volume, setVolume] = useState(0.35);

  useEffect(() => {
    const unsub = dreamAudio.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
      setActiveNote(state.currentNote);
      setPreset(state.preset);
      setVolume(state.volume);
    });
    return unsub;
  }, []);

  const handlePlayToggle = () => {
    dreamAudio.init();
    dreamAudio.toggleLullaby();
  };

  const handleMuteToggle = () => {
    dreamAudio.setMuted(!isMuted);
  };

  const handlePresetChange = (newPreset) => {
    dreamAudio.setPreset(newPreset);
    dreamAudio.playUiSparkle("click");
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    dreamAudio.setVolume(val);
  };

  return (
    <div className="lullaby-player-container">
      {/* Left: Official Asset Visual & Spinning Key */}
      <div className={`lullaby-box-visual ${isPlaying ? "playing" : ""}`}>
        <img
          src={`${import.meta.env.BASE_URL}assets/pip_lullaby_box.png`}
          alt="Pip's hand-crafted Lullaby Music Box with a rainbow unicorn, golden winding key, and dreamy pastel trim."
          className="lullaby-box-img"
        />
        <div
          className={`music-key-badge ${isPlaying ? "spinning" : ""}`}
          title={isPlaying ? "Winding mechanism actively turning" : "Wound and ready"}
        >
          <Disc size={22} />
        </div>
      </div>

      {/* Right: Audio Player Controls & Waveform */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span className="retro-chip">
            <Radio size={14} /> WEBAUDIO SYNTHESIZER
          </span>
          <span className="retro-chip">
            {isPlaying ? "MELODY: ACTIVE" : "MELODY: READY"}
          </span>
        </div>

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", marginBottom: "10px" }}>
          The Lullaby Lab
        </h3>

        <p style={{ color: "var(--text-secondary)", fontSize: "0.98rem", marginBottom: "18px" }}>
          Synthesized using native Web Audio oscillators with pure pentatonic celesta
          harmonics. No harsh frequencies or heavy audio files—just soft bell tones
          engineered to calm midnight thoughts.
        </p>

        {/* Animated Waveform Visualizer */}
        <div className="waveform-display" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, idx) => {
            const isActive = isPlaying && !isMuted && activeNote % 16 === idx;
            const barHeight = isPlaying && !isMuted
              ? Math.sin(idx * 0.6 + activeNote) * 16 + 22
              : 8;

            return (
              <div
                key={idx}
                className={`waveform-bar ${isActive ? "active" : ""}`}
                style={{
                  height: `${barHeight}px`,
                  transition: "height 0.1s ease",
                }}
              />
            );
          })}
        </div>

        {/* Melody Sound Presets */}
        <div style={{ marginBottom: "18px" }}>
          <label
            style={{
              display: "block",
              fontFamily: "var(--font-display)",
              fontSize: "0.88rem",
              fontWeight: 600,
              color: "var(--text-main)",
              marginBottom: "8px",
            }}
          >
            Synthesizer Tone Character:
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              { id: "musicBox", label: "Celesta Music Box", icon: "🧸" },
              { id: "starChimes", label: "Starlight Chimes", icon: "✨" },
              { id: "dreamHarp", label: "Midnight Harp", icon: "🌙" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => handlePresetChange(p.id)}
                className={`retro-btn sm ${preset === p.id ? "" : "secondary"}`}
                style={{ fontSize: "0.85rem" }}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Controls: Play/Pause, Mute, Volume Slider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            background: "var(--bg-surface)",
            padding: "14px 18px",
            borderRadius: "var(--radius-md)",
            border: "1.5px solid var(--border-medium)",
          }}
        >
          <button
            className="retro-btn"
            onClick={handlePlayToggle}
            aria-label={isPlaying ? "Stop Lullaby Melody" : "Play Lullaby Melody"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            <span>{isPlaying ? "Stop Lullaby" : "Wind Music Box"}</span>
          </button>

          <button
            className="retro-btn secondary sm"
            onClick={handleMuteToggle}
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span>{isMuted ? "Unmute" : "Mute"}</span>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: "140px" }}>
            <span style={{ fontSize: "0.82rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
              VOL
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              style={{ width: "100%", accentColor: "var(--accent-primary)" }}
              aria-label="Lullaby synthesizer volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
