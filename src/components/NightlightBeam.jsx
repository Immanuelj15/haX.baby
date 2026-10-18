import React, { useEffect, useRef } from "react";

/**
 * Nursery Nightlight Beam (T2.2)
 * Renders an illuminated flashlight beam around the pointer in Night Mode,
 * revealing hidden celestial constellations and stardust without blocking clicks or text selection.
 */
export function NightlightBeam({ enabled, theme }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!enabled || theme !== "night") return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Disable on touch devices
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handlePointerMove = (e) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--nl-x", `${e.clientX}px`);
        containerRef.current.style.setProperty("--nl-y", `${e.clientY}px`);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [enabled, theme]);

  if (!enabled || theme !== "night") return null;

  return (
    <div
      ref={containerRef}
      className="nightlight-beam-overlay"
      aria-hidden="true"
      style={{
        "--nl-x": "50vw",
        "--nl-y": "50vh",
      }}
    >
      {/* SVG Hidden Constellations Revealed by the Beam Mask */}
      <svg className="nightlight-constellation-svg" width="100%" height="100%">
        <defs>
          <radialGradient id="beamGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <mask id="beamMask">
            <circle cx="var(--nl-x)" cy="var(--nl-y)" r="180" fill="url(#beamGradient)" />
          </mask>
        </defs>

        {/* Constellation lines and stars revealed only through the circular beam mask */}
        <g mask="url(#beamMask)" stroke="rgba(245, 201, 107, 0.65)" strokeWidth="1" strokeDasharray="4 4" fill="none">
          {/* Constellation 1: Little Cloud Cradle */}
          <path d="M 120 180 L 160 150 L 220 160 L 260 200 L 200 220 Z" />
          <circle cx="120" cy="180" r="3.5" fill="#f5c96b" />
          <circle cx="160" cy="150" r="4.5" fill="#fffdfb" />
          <circle cx="220" cy="160" r="3" fill="#f8dce5" />
          <circle cx="260" cy="200" r="4" fill="#dcd2f5" />
          <circle cx="200" cy="220" r="3" fill="#f5c96b" />

          {/* Constellation 2: Pip's Star Cap */}
          <path d="M 780 140 L 840 90 L 910 120 L 870 180 Z" />
          <circle cx="780" cy="140" r="3" fill="#f5c96b" />
          <circle cx="840" cy="90" r="5" fill="#fffdfb" />
          <circle cx="910" cy="120" r="3.5" fill="#f8dce5" />
          <circle cx="870" cy="180" r="4" fill="#f5c96b" />

          {/* Constellation 3: Dream Lantern Arc */}
          <path d="M 450 420 L 510 390 L 580 410 L 610 470 L 530 480 Z" />
          <circle cx="450" cy="420" r="4" fill="#fffdfb" />
          <circle cx="510" cy="390" r="4.5" fill="#f5c96b" />
          <circle cx="580" cy="410" r="3.5" fill="#dcd2f5" />
          <circle cx="610" cy="470" r="4" fill="#f8dce5" />
          <circle cx="530" cy="480" r="3.5" fill="#f5c96b" />

          {/* Constellation 4: The Slumbering Moon */}
          <path d="M 1100 320 C 1140 280, 1180 340, 1150 390 C 1120 420, 1070 380, 1100 320 Z" />
          <circle cx="1100" cy="320" r="4.5" fill="#fffdfb" />
          <circle cx="1150" cy="390" r="4" fill="#f5c96b" />

          {/* Constellation 5: Bedtime Chime */}
          <path d="M 320 680 L 370 630 L 430 650 L 400 710 Z" />
          <circle cx="320" cy="680" r="3.5" fill="#f5c96b" />
          <circle cx="370" cy="630" r="4" fill="#fffdfb" />
          <circle cx="430" cy="650" r="3.5" fill="#f8dce5" />
          <circle cx="400" cy="710" r="4.5" fill="#dcd2f5" />

          {/* Constellation 6: Nursery Star Compass */}
          <path d="M 940 720 L 990 680 L 1050 710 L 1020 770 Z" />
          <circle cx="940" cy="720" r="4" fill="#fffdfb" />
          <circle cx="990" cy="680" r="4.5" fill="#f5c96b" />
          <circle cx="1050" cy="710" r="3.5" fill="#f8dce5" />
          <circle cx="1020" cy="770" r="4" fill="#f5c96b" />
        </g>
      </svg>
    </div>
  );
}
