import React from "react";
import { Cloud, Sparkles, ShieldCheck } from "lucide-react";
import { PIP_CANON } from "../data/portfolioData";
import { VisitorCounter } from "./VisitorCounter";

export function Footer({ onOpenSecretRoom }) {
  return (
    <footer className="retro-footer">
      <div className="footer-inner">
        {/* Left Column: Brand & Tagline */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div className="nav-brand-icon">
              <Cloud size={18} />
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem" }}>
              Pip's Midnight Dream OS
            </h3>
          </div>

          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.1rem", color: "var(--accent-primary)", marginBottom: "10px" }}>
            “{PIP_CANON.tagline}”
          </p>

          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "520px", marginBottom: "20px" }}>
            Crafted for <strong>haX.baby: Baby's First Website — Meet the Baby</strong> hackathon sprint.
            Track 1: Pip, the Skull Baby. Designed with retro-computer nostalgia, responsive layouts,
            and gentle harmonic Web Audio synthesis.
          </p>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <VisitorCounter />

            <button
              className="retro-btn secondary sm"
              onClick={onOpenSecretRoom}
              title="Unlock Easter Egg"
            >
              <Sparkles size={14} />
              <span>Secret Room 🗝️</span>
            </button>
          </div>
        </div>

        {/* Right Column: Official Credits & Attributions */}
        <div className="footer-credits-box">
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
            <ShieldCheck size={16} style={{ color: "var(--accent-primary)" }} />
            <strong style={{ fontFamily: "var(--font-display)", color: "var(--text-main)", fontSize: "0.95rem" }}>
              Official Asset & Library Attributions
            </strong>
          </div>

          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem" }}>
            <li>
              <strong>Character & Canon:</strong> Pip, the Skull Baby © haX.baby Track 1 official canon.
            </li>
            <li>
              <strong>Official Artwork:</strong> Hero avatar (<code>pip_avatar_cloud.png</code>), Character portrait (<code>pip_portrait.png</code>), Music box (<code>pip_lullaby_box.png</code>), Dream lantern (<code>pip_dream_lantern.png</code>).
            </li>
            <li>
              <strong>Typography:</strong> Fredoka, Nunito & Lora via Google Fonts Open Font License.
            </li>
            <li>
              <strong>Icons & Effects:</strong> Lucide React, canvas-confetti, and native browser Web Audio API.
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="footer-bottom">
        <div>
          Made with care at the Midnight Nursery. Dedicated to peaceful nights.
        </div>
        <div>
          haX.baby Hackathon 2026 // Track 1 — Pip, the Skull Baby
        </div>
      </div>
    </footer>
  );
}
