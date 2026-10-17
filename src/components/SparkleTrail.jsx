import React, { useEffect, useState } from "react";

export function SparkleTrail() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Disable sparkle trail if user prefers reduced motion or on touch devices
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let lastTime = 0;
    const starSymbols = ["✦", "✧", "⋆", "★", "·"];
    const colors = ["#f5c96b", "#f8dce5", "#dcd2f5", "#fffdfb"];

    const handleMouseMove = (e) => {
      const now = Date.now();
      // Throttle particle creation to once every 45ms to protect performance & memory
      if (now - lastTime < 45) return;
      lastTime = now;

      const newSparkle = {
        id: Math.random().toString(36).substring(2, 9),
        x: e.clientX,
        y: e.clientY,
        symbol: starSymbols[Math.floor(Math.random() * starSymbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.floor(Math.random() * 10) + 12,
      };

      setSparkles((prev) => {
        // Keep active particles capped at 15
        const updated = [...prev.slice(-14), newSparkle];
        return updated;
      });

      // Automatically remove particle after animation completes
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 750);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div aria-hidden="true" style={{ pointerEvents: "none" }}>
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle-particle"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            color: s.color,
            fontSize: `${s.size}px`,
          }}
        >
          {s.symbol}
        </span>
      ))}
    </div>
  );
}
