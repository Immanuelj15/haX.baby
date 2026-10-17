import React, { useState, useRef } from "react";
import { Sparkles, Heart, ChevronDown, Moon, Cloud, Wand2 } from "lucide-react";
import { PIP_CANON } from "../data/portfolioData";
import { dreamAudio } from "../utils/audioSynth";

export function Hero({ onPipClick, onExploreDreams, onMeetPip, clickCount }) {
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const avatarRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate clamped rotation offsets (+/- 6 deg max)
    const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
    const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

    setTilt({
      x: Math.max(-6, Math.min(6, deltaY * -7)),
      y: Math.max(-6, Math.min(6, deltaX * 7)),
    });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleAvatarClick = () => {
    dreamAudio.playUiSparkle("click");
    // Cycle dialogue speech bubble
    setBubbleIndex((prev) => (prev + 1) % PIP_CANON.speechBubbles.length);
    // Call parent handler for Easter Egg counting
    onPipClick();
  };

  return (
    <header
      id="hero"
      className="hero-section"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <div className="hero-stars-bg" aria-hidden="true" />

      <div className="section-wrapper" style={{ width: "100%", paddingBottom: "40px" }}>
        <div className="hero-grid">
          {/* Left Column: Text & Story Framing */}
          <div className="hero-content-col">
            <div className="hero-badge-row">
              <span className="section-eyebrow">
                MIDNIGHT NURSERY // DREAM ENGINEER NO. 001
              </span>
              <span className="retro-chip">
                <span className="status-dot" /> {PIP_CANON.status}
              </span>
            </div>

            <h1 className="hero-title">
              Your dreams are in tiny, careful hands.
            </h1>

            <p className="hero-tagline-quote">
              “{PIP_CANON.tagline}”
            </p>

            <p className="hero-desc">
              Meet <strong>Pip</strong>, the sweet skull baby with warm amber eyes who
              works night-shifts at the Midnight Nursery. Armed with a brass moon lantern
              and a music box, Pip weaves soft starlight, dispels scary shadows, and
              delivers cozy bedtime dreams to every sleeping creature in the neighborhood.
            </p>

            <div className="hero-actions">
              <button
                className="retro-btn"
                onClick={() => {
                  dreamAudio.playUiSparkle("click");
                  onExploreDreams();
                }}
              >
                <Sparkles size={18} />
                Explore Pip's Dreams
              </button>

              <button
                className="retro-btn secondary"
                onClick={() => {
                  dreamAudio.playUiSparkle("click");
                  onMeetPip();
                }}
              >
                <Heart size={18} />
                Meet the Dream Engineer
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Pip Focal Point */}
          <div className="hero-avatar-card">
            {/* Dynamic Speech Bubble */}
            <div
              className="pip-dialogue-bubble"
              role="status"
              aria-live="polite"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <span style={{ fontSize: "1.1rem" }}>✨</span>
                <span style={{ color: "var(--accent-primary)", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Pip says:
                </span>
              </div>
              <p>{PIP_CANON.speechBubbles[bubbleIndex]}</p>
            </div>

            {/* Official Pip Avatar with soft 3D clay rendering */}
            <div
              ref={avatarRef}
              className="hero-avatar-wrapper"
              onClick={handleAvatarClick}
              style={{
                transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
              title="Click Pip to say hello! (Or tap 5 times to unlock a secret)"
              aria-label="Official character artwork of Pip the skull baby sitting on a cloud. Click to interact."
            >
              <img
                src="/assets/pip_avatar_cloud.png"
                alt="Pip the sweet skull baby in cozy starry nightcap sitting happily on a fluffy cloud, waving gently."
                className="hero-pip-img"
              />
            </div>

            <div className="pip-click-hint">
              <Wand2 size={14} />
              <span>
                {clickCount === 0
                  ? "Tap Pip to chat"
                  : clickCount < 5
                  ? `Secret Room Key: ${clickCount}/5 taps`
                  : "Secret Room Unlocked! ✨"}
              </span>
            </div>
          </div>
        </div>

        {/* Scroll down prompt */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <button
            onClick={() => {
              dreamAudio.playUiSparkle("click");
              onMeetPip();
            }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--text-muted)",
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
            aria-label="Scroll to Pip's profile"
          >
            <span>DISCOVER PIP'S NURSERY RECORD</span>
            <ChevronDown size={18} className="animate-bounce" />
          </button>
        </div>
      </div>
    </header>
  );
}
