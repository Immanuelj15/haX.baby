import React, { useState } from "react";
import { Moon, Cloud, Sparkles, SunDim, ShieldCheck } from "lucide-react";
import { NIGHTLIGHT_MODES } from "../../data/portfolioData";
import { dreamAudio } from "../../utils/audioSynth";

export function NightlightCollection() {
  const [selectedModeId, setSelectedModeId] = useState("moon");
  const currentMode = NIGHTLIGHT_MODES.find((m) => m.id === selectedModeId) || NIGHTLIGHT_MODES[0];

  const handleSelectMode = (modeId) => {
    setSelectedModeId(modeId);
    dreamAudio.playUiSparkle("click");
  };

  return (
    <div className="lantern-showcase-container">
      {/* Left: Official Dream Lantern with Dynamic Ambient Glow */}
      <div
        className="lantern-visual-pod"
        style={{
          boxShadow: currentMode.glow,
          borderColor: currentMode.color,
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/pip_dream_lantern.png`}
          alt="Pip's hand-crafted Dream Lantern featuring a smiling crescent moon, stars, and brass ring handle."
          className="lantern-img"
          style={{
            filter: `drop-shadow(0 0 25px ${currentMode.color}88)`,
          }}
        />

        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <span
            className="retro-chip"
            style={{
              borderColor: currentMode.color,
              color: "var(--text-main)",
            }}
          >
            <SunDim size={14} style={{ color: currentMode.color }} />
            Active Radiation: {currentMode.name}
          </span>
        </div>
      </div>

      {/* Right: Mode Selector & Story Specs */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span className="section-eyebrow">NURSERY ILLUMINATION LAB</span>
        </div>

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", marginBottom: "10px" }}>
          The Nightlight Collection
        </h3>

        <p style={{ color: "var(--text-secondary)", fontSize: "0.98rem", marginBottom: "20px" }}>
          Forged with hand-gathered moonlight and twilight mist, Pip's bedside lanterns
          provide non-disruptive luminescent reassurance for babies, kittens, and
          creatures afraid of shadows.
        </p>

        {/* 3 Interactive Modes */}
        <div className="nightlight-modes-list" role="radiogroup" aria-label="Nightlight illumination modes">
          {NIGHTLIGHT_MODES.map((mode) => {
            const isSelected = mode.id === selectedModeId;
            return (
              <div
                key={mode.id}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                className={`mode-selector-card ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelectMode(mode.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectMode(mode.id);
                  }
                }}
              >
                <div
                  className="mode-icon-circle"
                  style={{
                    backgroundColor: mode.color,
                    borderColor: mode.color,
                    boxShadow: isSelected ? mode.glow : "none",
                  }}
                >
                  {mode.id === "moon" && <Moon size={18} color="#17172f" />}
                  {mode.id === "cloud" && <Cloud size={18} color="#17172f" />}
                  {mode.id === "star" && <Sparkles size={18} color="#17172f" />}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>
                      {mode.name}
                    </strong>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {mode.subtitle}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    {mode.mood}
                  </p>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "0.78rem",
                      color: "var(--accent-primary)",
                      fontWeight: 600,
                    }}
                  >
                    <ShieldCheck size={13} /> {mode.effect}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
