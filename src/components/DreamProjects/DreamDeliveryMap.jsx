import React, { useState, useEffect, useRef } from "react";
import { Send, RotateCcw, MapPin, CheckCircle2 } from "lucide-react";
import { DELIVERY_CHECKPOINTS } from "../../data/portfolioData";
import { dreamAudio } from "../../utils/audioSynth";

export function DreamDeliveryMap() {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState(DELIVERY_CHECKPOINTS[0]);
  const [starPos, setStarPos] = useState({ x: 80, y: 190 });
  const [isDelivering, setIsDelivering] = useState(false);
  const animationRef = useRef(null);
  const pathRef = useRef(null);

  const startDeliveryAnimation = () => {
    dreamAudio.playUiSparkle("click");
    setIsDelivering(true);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setStarPos({ x: 590, y: 80 });
      setSelectedCheckpoint(DELIVERY_CHECKPOINTS[DELIVERY_CHECKPOINTS.length - 1]);
      setIsDelivering(false);
      dreamAudio.playUiSparkle("wish");
      return;
    }

    setStarPos({ x: 80, y: 190 });

    const startTime = performance.now();
    const duration = 4000; // 4 seconds total journey

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      setStarProgress(progress);

      // Compute coordinate outside render
      if (pathRef.current) {
        try {
          const length = pathRef.current.getTotalLength();
          const point = pathRef.current.getPointAtLength(length * progress);
          setStarPos({ x: point.x, y: point.y });
        } catch {
          setStarPos({ x: 80 + progress * 510, y: 190 - progress * 110 });
        }
      }

      // Select destination along the way based on progress
      const currentIdx = Math.min(
        DELIVERY_CHECKPOINTS.length - 1,
        Math.floor(progress * DELIVERY_CHECKPOINTS.length)
      );
      setSelectedCheckpoint(DELIVERY_CHECKPOINTS[currentIdx]);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsDelivering(false);
        dreamAudio.playUiSparkle("wish");
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="delivery-map-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <span className="section-eyebrow">ROOFTOP NAVIGATION RADAR</span>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem" }}>
            Midnight Dream Delivery Routes
          </h3>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="retro-btn"
            onClick={startDeliveryAnimation}
            disabled={isDelivering}
            aria-label="Launch stardust parcel delivery"
          >
            <Send size={16} />
            <span>{isDelivering ? "In Flight..." : "Launch Delivery Star"}</span>
          </button>

          <button
            className="retro-btn secondary sm"
            onClick={() => {
              setStarPos({ x: 80, y: 190 });
              setSelectedCheckpoint(DELIVERY_CHECKPOINTS[0]);
              dreamAudio.playUiSparkle("click");
            }}
            title="Reset Route"
            aria-label="Reset route to beginning"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "20px" }}>
        Click any checkpoint node or press <strong>Launch Delivery Star</strong> to guide
        Pip's stardust parcel through chimney stacks and tree hollows.
      </p>

      {/* Interactive SVG Rooftop Route Map */}
      <div className="svg-map-wrapper">
        <svg
          viewBox="0 0 700 300"
          style={{ width: "100%", height: "auto", display: "block" }}
          aria-label="Interactive map showing delivery path over rooftops and forest creatures"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#101026" />
              <stop offset="60%" stopColor="#1c1b3a" />
              <stop offset="100%" stopColor="#2c2a55" />
            </linearGradient>

            <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f5c96b" />
              <stop offset="50%" stopColor="#f8dce5" />
              <stop offset="100%" stopColor="#dcd2f5" />
            </linearGradient>

            <filter id="starGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Sky */}
          <rect width="700" height="300" fill="url(#skyGrad)" />

          {/* Distant Stars */}
          {Array.from({ length: 30 }).map((_, i) => (
            <circle
              key={i}
              cx={(i * 23.3) % 690 + 10}
              cy={(i * 17.7) % 180 + 10}
              r={(i % 3) * 0.7 + 0.8}
              fill="#ffffff"
              opacity={(i % 5) * 0.15 + 0.3}
            />
          ))}

          {/* Crescent Moon */}
          <g transform="translate(630, 40)">
            <path
              d="M 0 0 A 24 24 0 1 0 24 40 A 20 20 0 1 1 0 0 Z"
              fill="#f5c96b"
              filter="url(#starGlowFilter)"
            />
          </g>

          {/* Rooftop Silhouettes */}
          <path
            d="M 0 300 L 0 240 L 40 210 L 80 240 L 140 230 L 180 190 L 230 250 L 300 240 L 340 200 L 400 250 L 480 220 L 520 180 L 570 230 L 630 210 L 700 240 L 700 300 Z"
            fill="#121222"
          />

          {/* Chimneys and warm glowing windows */}
          <rect x="55" y="215" width="16" height="22" fill="#201f35" />
          <rect x="195" y="200" width="18" height="26" fill="#201f35" />
          <rect x="500" y="195" width="16" height="24" fill="#201f35" />

          {/* Glowing Windows */}
          <rect x="70" y="250" width="12" height="14" rx="2" fill="#f5c96b" opacity="0.8" />
          <rect x="210" y="260" width="12" height="14" rx="2" fill="#f5c96b" opacity="0.85" />
          <rect x="330" y="255" width="14" height="16" rx="2" fill="#f8dce5" opacity="0.75" />
          <rect x="460" y="245" width="12" height="14" rx="2" fill="#f5c96b" opacity="0.9" />

          {/* Stardust Flight Path Curve */}
          <path
            ref={pathRef}
            d="M 80 190 C 130 110, 160 90, 210 110 C 270 140, 290 260, 340 220 C 390 170, 420 100, 470 130 C 520 160, 550 90, 590 80"
            fill="none"
            stroke="url(#pathGrad)"
            strokeWidth="3.5"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />

          {/* Checkpoint Destination Nodes */}
          {DELIVERY_CHECKPOINTS.map((cp) => {
            const isSelected = selectedCheckpoint.id === cp.id;
            return (
              <g
                key={cp.id}
                role="button"
                tabIndex={0}
                aria-label={`Delivery stop: ${cp.name}. Package: ${cp.dream}. Recipient: ${cp.creature}.`}
                className="map-checkpoint-node"
                transform={`translate(${cp.x}, ${cp.y})`}
                onClick={() => {
                  setSelectedCheckpoint(cp);
                  dreamAudio.playUiSparkle("click");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedCheckpoint(cp);
                    dreamAudio.playUiSparkle("click");
                  }
                }}
              >
                {/* Outer Glow Halo */}
                <circle
                  r={isSelected ? 18 : 12}
                  fill={cp.glowColor}
                  opacity={isSelected ? 0.35 : 0.15}
                  filter="url(#starGlowFilter)"
                />
                {/* Core Node */}
                <circle
                  r={isSelected ? 9 : 6.5}
                  fill={isSelected ? "#fffdfb" : cp.glowColor}
                  stroke="#17172f"
                  strokeWidth="2"
                />
                {/* Node Label */}
                <text
                  x="0"
                  y="-14"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontFamily="Fredoka"
                  fontWeight="600"
                >
                  {cp.name.split(" ")[0]}
                </text>
              </g>
            );
          })}

          {/* Traveling Dream Star Parcel */}
          <g
            transform={`translate(${starPos.x}, ${starPos.y})`}
            filter="url(#starGlowFilter)"
          >
            <circle r="9" fill="#f5c96b" />
            <circle r="4" fill="#ffffff" />
            <path
              d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z"
              fill="#ffffff"
            />
          </g>
        </svg>
      </div>

      {/* Inspector Box Showing Selected Checkpoint Details */}
      <div className="checkpoint-inspector-box">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <MapPin size={18} style={{ color: "var(--accent-primary)" }} />
            <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
              {selectedCheckpoint.name}
            </strong>
            <span className="retro-chip" style={{ fontSize: "0.8rem" }}>
              Recipient: {selectedCheckpoint.creature}
            </span>
          </div>

          <p style={{ fontFamily: "var(--font-display)", color: "var(--accent-primary)", fontSize: "1.02rem", fontWeight: 600 }}>
            Package: “{selectedCheckpoint.dream}”
          </p>

          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginTop: "4px", maxWidth: "600px" }}>
            {selectedCheckpoint.desc}
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              background: "var(--bg-accent-soft)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.92rem",
              color: "var(--accent-primary)",
              border: "1px dashed var(--border-medium)",
            }}
          >
            <CheckCircle2 size={16} />
            <span>{selectedCheckpoint.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
