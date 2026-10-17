import React, { useState } from "react";
import { Moon, Package, Compass, Sparkles, ChevronLeft, ChevronRight, BookOpenCheck } from "lucide-react";
import { ORIGIN_SCENES } from "../data/portfolioData";
import { dreamAudio } from "../utils/audioSynth";

export function OriginStory() {
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const scene = ORIGIN_SCENES[activeSceneIdx];

  const handleNext = () => {
    if (activeSceneIdx < ORIGIN_SCENES.length - 1) {
      setActiveSceneIdx((prev) => prev + 1);
      dreamAudio.playUiSparkle("page");
    }
  };

  const handlePrev = () => {
    if (activeSceneIdx > 0) {
      setActiveSceneIdx((prev) => prev - 1);
      dreamAudio.playUiSparkle("page");
    }
  };

  const getSceneIcon = (iconName) => {
    switch (iconName) {
      case "Moon":
        return <Moon size={20} />;
      case "Package":
        return <Package size={20} />;
      case "Compass":
        return <Compass size={20} />;
      case "Sparkles":
        return <Sparkles size={20} />;
      default:
        return <Moon size={20} />;
    }
  };

  return (
    <section id="story" className="section-wrapper" aria-labelledby="story-title">
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <span className="section-eyebrow">CHRONICLES OF THE MIDNIGHT NURSERY</span>
        <h2 id="story-title" className="section-title">
          The Night the Moon Forgot to Glow
        </h2>
        <p className="section-subtitle" style={{ margin: "0 auto" }}>
          How a sleepy skull baby in a star nightcap became the neighborhood's chief dream
          engineer. Follow Pip's journey from an empty cradle to the first rooftop delivery.
        </p>
      </div>

      {/* Chapter Scrubber Timeline */}
      <div className="origin-timeline-nav" role="tablist" aria-label="Origin story chapters">
        {ORIGIN_SCENES.map((s, idx) => {
          const isActive = idx === activeSceneIdx;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              className={`origin-step-btn ${isActive ? "active" : ""}`}
              onClick={() => {
                setActiveSceneIdx(idx);
                dreamAudio.playUiSparkle("click");
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="origin-chapter-tag">{s.chapter}</span>
                <span style={{ color: isActive ? "var(--accent-primary)" : "var(--text-muted)" }}>
                  {getSceneIcon(s.icon)}
                </span>
              </div>
              <span className="origin-step-title">{s.title}</span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "2px" }}>
                {s.summary}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Scene Presentation Window */}
      <div className="retro-window">
        <div className="window-titlebar">
          <div className="window-title">
            <BookOpenCheck size={16} />
            <span>ORIGIN_CHRONICLE_{scene.chapter.replace(" ", "_")}.LOG</span>
          </div>
          <div className="window-controls">
            <span className="window-btn btn-min" />
            <span className="window-btn btn-max" />
            <span className="window-btn btn-close" />
          </div>
        </div>

        <div className="origin-scene-display" style={{ background: scene.ambientColor }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <span className="origin-scene-badge">{scene.badge}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.92rem", color: "var(--text-muted)" }}>
              CHRONICLE SCENE {scene.id} OF {ORIGIN_SCENES.length}
            </span>
          </div>

          <h3 className="origin-scene-heading">{scene.title}</h3>

          <p className="origin-scene-text">{scene.narrative}</p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "14px",
              paddingTop: "20px",
              borderTop: "1px dashed var(--border-medium)",
            }}
          >
            <button
              className="retro-btn secondary sm"
              onClick={handlePrev}
              disabled={activeSceneIdx === 0}
              style={{ opacity: activeSceneIdx === 0 ? 0.45 : 1 }}
              aria-label="Previous origin story scene"
            >
              <ChevronLeft size={16} />
              <span>Previous Chapter</span>
            </button>

            {/* Little Progress Dots */}
            <div style={{ display: "flex", gap: "8px" }}>
              {ORIGIN_SCENES.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === activeSceneIdx ? "24px" : "10px",
                    height: "10px",
                    borderRadius: "var(--radius-full)",
                    background: i === activeSceneIdx ? "var(--accent-primary)" : "var(--border-medium)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>

            <button
              className="retro-btn sm"
              onClick={handleNext}
              disabled={activeSceneIdx === ORIGIN_SCENES.length - 1}
              style={{ opacity: activeSceneIdx === ORIGIN_SCENES.length - 1 ? 0.45 : 1 }}
              aria-label="Next origin story scene"
            >
              <span>Next Chapter</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="window-statusbar">
          <span className="status-indicator">
            <span className="status-dot" />
            <span>MIDNIGHT LORE: ARCHIVED CHRONICLE</span>
          </span>
          <span>NURSERY ORAL TRADITION</span>
        </div>
      </div>
    </section>
  );
}
