import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, RotateCcw, Award, Star } from "lucide-react";
import { dreamAudio } from "../utils/audioSynth";

/**
 * Catch Falling Dreams Mini-Game (T2.5)
 * Bounded interactive nursery playfield where players catch falling dream stars
 * within a 20-second round to weave a starlight blanket for Pip's nursery.
 * Includes keyboard controls (keys 1-4), touch support, reduced-motion static mode,
 * and persistent stardust tally.
 */
export function FallingDreamsGame({ onScoreUpdate }) {
  const [gameState, setGameState] = useState("idle"); // "idle" | "playing" | "ended"
  const [timeLeft, setTimeLeft] = useState(20);
  const [roundScore, setRoundScore] = useState(0);
  const [totalStardust, setTotalStardust] = useState(() => {
    try {
      const saved = localStorage.getItem("pip_stardust_count");
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [stars, setStars] = useState([
    { id: 1, x: 20, y: 15, speed: 0.5, symbol: "✦", color: "#f5c96b" },
    { id: 2, x: 45, y: 35, speed: 0.7, symbol: "★", color: "#f8dce5" },
    { id: 3, x: 70, y: 20, speed: 0.6, symbol: "✧", color: "#dcd2f5" },
    { id: 4, x: 85, y: 45, speed: 0.8, symbol: "⋆", color: "#fffdfb" },
  ]);

  const [catchToast, setCatchToast] = useState("");
  const animFrameRef = useRef(null);
  const timerRef = useRef(null);
  const isReducedMotion = useRef(false);
  const roundScoreRef = useRef(0);

  useEffect(() => {
    roundScoreRef.current = roundScore;
  }, [roundScore]);

  useEffect(() => {
    isReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Catch a star
  const handleCatchStar = useCallback((starId) => {
    dreamAudio.playUiSparkle("click");

    setRoundScore((prev) => prev + 1);
    setCatchToast("+1 Stardust!");
    setTimeout(() => setCatchToast(""), 800);

    // Reset this star to top with a new random X
    setStars((prevStars) =>
      prevStars.map((s) => {
        if (s.id === starId) {
          return {
            ...s,
            y: isReducedMotion.current ? 40 : 5,
            x: Math.floor(Math.random() * 70) + 15,
          };
        }
        return s;
      })
    );
  }, []);

  // Keyboard navigation for catching stars (keys 1, 2, 3, 4)
  useEffect(() => {
    if (gameState !== "playing") return;

    const handleKeyDown = (e) => {
      // Don't intercept when user is typing in inputs
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA" || document.activeElement?.isContentEditable) {
        return;
      }

      if (e.key === "1") handleCatchStar(1);
      if (e.key === "2") handleCatchStar(2);
      if (e.key === "3") handleCatchStar(3);
      if (e.key === "4") handleCatchStar(4);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, handleCatchStar]);

  // Game Loop (Animation)
  useEffect(() => {
    if (gameState !== "playing") return;

    let lastTime = performance.now();

    const loop = (currentTime) => {
      const delta = Math.min(50, currentTime - lastTime);
      lastTime = currentTime;

      if (!isReducedMotion.current) {
        setStars((prevStars) =>
          prevStars.map((s) => {
            let newY = s.y + (s.speed * delta) / 16;
            let newX = s.x;
            if (newY > 88) {
              newY = 5;
              newX = Math.floor(Math.random() * 70) + 15;
            }
            return { ...s, y: newY, x: newX };
          })
        );
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState]);

  // Round Timer (20 seconds)
  useEffect(() => {
    if (gameState !== "playing") return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameState("ended");
          dreamAudio.playUiSparkle("wish");

          const finalRound = roundScoreRef.current;
          setTotalStardust((prevTotal) => {
            const updated = prevTotal + finalRound;
            try {
              localStorage.setItem("pip_stardust_count", String(updated));
            } catch {
              // ignore
            }
            if (onScoreUpdate) onScoreUpdate(updated);
            return updated;
          });

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, onScoreUpdate]);

  const startGame = () => {
    dreamAudio.init();
    dreamAudio.playUiSparkle("click");
    setRoundScore(0);
    setTimeLeft(20);
    setGameState("playing");
  };

  const getRankQuote = (score) => {
    if (score >= 15) return "✨ Extraordinary! You wove a Grand Celestial Stardust Blanket!";
    if (score >= 8) return "🌟 Cozy Slumber! Pip's nursery cradle is warm and shining.";
    return "🌙 Sweet Dreams! Every caught star helps Pip watch over the night.";
  };

  return (
    <div className="falling-dreams-container" aria-label="Catch Falling Dreams mini-game">
      {/* Game Window Header */}
      <div className="mini-game-header">
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Star size={16} style={{ color: "var(--accent-gold)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem" }}>
            Catch Falling Dreams
          </span>
        </div>
        <span className="retro-chip" style={{ fontSize: "0.8rem", padding: "2px 8px" }}>
          ✦ Total: {totalStardust}
        </span>
      </div>

      {/* IDLE STATE: Introduction & Launch */}
      {gameState === "idle" && (
        <div className="mini-game-body idle-view">
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "12px", lineHeight: 1.45 }}>
            Help Pip catch drifting starlight motes before bedtime! Catch as many stars as you can in 20 seconds.
          </p>

          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "14px" }}>
            CONTROLS: Tap / Click falling stars or press keys [1], [2], [3], [4]
          </div>

          <button
            type="button"
            className="retro-btn sm"
            onClick={startGame}
            style={{ width: "100%" }}
            aria-label="Start 20-second Catch Falling Dreams round"
          >
            <Play size={14} />
            <span>Start 20s Weaving Round</span>
          </button>
        </div>
      )}

      {/* PLAYING STATE: Active Bounded Playfield */}
      {gameState === "playing" && (
        <div className="mini-game-body playing-view">
          {/* Top telemetry bar */}
          <div className="mini-game-hud">
            <span>
              ROUND SCORE: <strong style={{ color: "var(--accent-primary)" }}>{roundScore}</strong>
            </span>
            <span style={{ color: timeLeft <= 5 ? "var(--accent-secondary)" : "var(--text-muted)", fontWeight: 700 }}>
              ⏱ {timeLeft}s
            </span>
          </div>

          {/* Toast feedback */}
          {catchToast && <div className="mini-game-toast">{catchToast}</div>}

          {/* Falling Stars Stage */}
          <div className="stars-playfield" role="region" aria-label="Falling dream stars stage">
            {stars.map((s) => (
              <button
                key={s.id}
                type="button"
                className="falling-star-target"
                onClick={() => handleCatchStar(s.id)}
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  color: s.color,
                }}
                title={`Catch Star #${s.id} (Key ${s.id})`}
                aria-label={`Catch falling dream star number ${s.id}`}
              >
                <span className="star-icon">{s.symbol}</span>
                <span className="star-key-badge">{s.id}</span>
              </button>
            ))}
          </div>

          <div style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            Tip: Press number keys [1], [2], [3], [4] or tap directly
          </div>
        </div>
      )}

      {/* ENDED STATE: Round Score & Replay */}
      {gameState === "ended" && (
        <div className="mini-game-body ended-view">
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-gold)", marginBottom: "6px" }}>
            <Award size={20} />
            <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>
              Round Complete!
            </strong>
          </div>

          <p style={{ fontSize: "1.2rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--accent-primary)", marginBottom: "4px" }}>
            You caught {roundScore} dream stars!
          </p>

          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "14px", fontStyle: "italic" }}>
            {getRankQuote(roundScore)}
          </p>

          <button
            type="button"
            className="retro-btn sm"
            onClick={startGame}
            style={{ width: "100%" }}
            aria-label="Play another round of Catch Falling Dreams"
          >
            <RotateCcw size={14} />
            <span>Play Another Round</span>
          </button>
        </div>
      )}
    </div>
  );
}
