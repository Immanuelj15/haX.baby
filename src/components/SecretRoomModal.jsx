import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { X, Sparkles, Gift } from "lucide-react";
import { SECRET_WISHES } from "../data/portfolioData";
import { dreamAudio } from "../utils/audioSynth";

export function SecretRoomModal({ isOpen, onClose }) {
  const [currentWish, setCurrentWish] = useState(SECRET_WISHES[0]);
  const [dispensedCount, setDispensedCount] = useState(0);
  const closeButtonRef = useRef(null);

  // Trigger confetti and secret sound upon opening
  useEffect(() => {
    if (isOpen) {
      dreamAudio.playUiSparkle("secret");

      // Check prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefersReducedMotion) {
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#f5c96b", "#f8dce5", "#dcd2f5", "#a34063"],
          });
        } catch {
          // ignore if canvas-confetti fails
        }
      }

      // Auto-focus close button when modal opens
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      // Handle Escape key
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDispenseNewWish = () => {
    const nextIdx = (dispensedCount + 1) % SECRET_WISHES.length;
    setDispensedCount(nextIdx);
    setCurrentWish(SECRET_WISHES[nextIdx]);
    dreamAudio.playUiSparkle("wish");
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="secret-room-heading"
    >
      <div className="secret-room-dialog">
        {/* Retro Window Header */}
        <div className="window-titlebar" style={{ background: "linear-gradient(90deg, #17172f 0%, #353366 100%)", color: "#f5c96b" }}>
          <div className="window-title">
            <Sparkles size={16} />
            <span>PIP'S_SECRET_DREAM_ARCHIVE // CONFIDENTIAL</span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            style={{ color: "#f5c96b", padding: "4px" }}
            aria-label="Close secret dream room"
          >
            <X size={18} />
          </button>
        </div>

        {/* Secret Content */}
        <div className="secret-room-content">
          <div className="secret-key-icon">
            <Sparkles size={32} />
          </div>

          <span className="section-eyebrow" style={{ color: "var(--accent-gold)", borderColor: "var(--accent-gold)" }}>
            ✦ UNLOCKED EASTER EGG // SECTOR 001 ✦
          </span>

          <h3 id="secret-room-heading" style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem" }}>
            The Secret Midnight Nursery Stash
          </h3>

          <div className="secret-quote-box">
            <p>
              “You found the dream I was saving just for you. Keep a little wonder in your pocket.”
            </p>
            <div style={{ marginTop: "8px", fontSize: "0.88rem", color: "var(--accent-primary)", fontStyle: "normal", fontWeight: 700 }}>
              — Pip, Junior Dream Engineer
            </div>
          </div>

          {/* Interactive Starlight Charm Dispenser */}
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1.5px solid var(--border-medium)",
              borderRadius: "var(--radius-md)",
              padding: "16px",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.85rem", fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>
                POCKET CHARM DISPENSER
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Charm #{dispensedCount + 1}
              </span>
            </div>

            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", color: "var(--text-main)", marginBottom: "12px", minHeight: "48px" }}>
              {currentWish}
            </p>

            <button
              className="retro-btn sm"
              onClick={handleDispenseNewWish}
              style={{ width: "100%" }}
            >
              <Gift size={15} />
              <span>Draw Another Midnight Charm</span>
            </button>
          </div>

          <button
            className="retro-btn secondary"
            onClick={onClose}
            style={{ width: "100%", marginTop: "10px" }}
          >
            Close & Keep Secret
          </button>
        </div>
      </div>
    </div>
  );
}
