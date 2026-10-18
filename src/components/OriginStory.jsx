import React, { useState, useEffect, useRef } from "react";
import { Moon, Package, Compass, Sparkles, ChevronLeft, ChevronRight, BookOpenCheck } from "lucide-react";
import { ORIGIN_SCENES } from "../data/portfolioData";
import { dreamAudio } from "../utils/audioSynth";

export function OriginStory() {
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const stepRefs = useRef([]);
  const isManualScrolling = useRef(false);

  // Setup IntersectionObserver for scroll-driven chapter updates
  useEffect(() => {
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute("data-scene-idx"), 10);
            if (!isNaN(idx)) {
              setActiveSceneIdx(idx);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-25% 0px -40% 0px",
        threshold: 0.3,
      }
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToChapter = (idx) => {
    setActiveSceneIdx(idx);
    dreamAudio.playUiSparkle("click");

    const targetEl = stepRefs.current[idx];
    if (targetEl) {
      isManualScrolling.current = true;
      targetEl.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "center",
      });
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 700);
    }
  };

  const handleNext = () => {
    if (activeSceneIdx < ORIGIN_SCENES.length - 1) {
      scrollToChapter(activeSceneIdx + 1);
    }
  };

  const handlePrev = () => {
    if (activeSceneIdx > 0) {
      scrollToChapter(activeSceneIdx - 1);
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
          engineer. Scroll down to follow Pip's journey from an empty cradle to the first rooftop delivery.
        </p>
      </div>

      {/* Screen reader live region for scroll chapter changes */}
      <div className="sr-only" role="status" aria-live="polite">
        Current chronicle: {ORIGIN_SCENES[activeSceneIdx].chapter} - {ORIGIN_SCENES[activeSceneIdx].title}
      </div>

      {/* Sticky Chapter Scrubber Timeline */}
      <div className="origin-timeline-nav" role="tablist" aria-label="Origin story chapters">
        {ORIGIN_SCENES.map((s, idx) => {
          const isActive = idx === activeSceneIdx;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              className={`origin-step-btn ${isActive ? "active" : ""}`}
              onClick={() => scrollToChapter(idx)}
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

      {/* Scroll-Driven Chronicle Steps Track */}
      <div className="origin-scroll-track">
        {ORIGIN_SCENES.map((scene, idx) => {
          const isActive = idx === activeSceneIdx;
          return (
            <div
              key={scene.id}
              ref={(el) => (stepRefs.current[idx] = el)}
              data-scene-idx={idx}
              className={`origin-scroll-step-card retro-window ${isActive ? "focused-step" : ""}`}
              style={{
                transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                borderColor: isActive ? "var(--accent-primary)" : "var(--border-medium)",
              }}
            >
              {/* Retro Window Bar */}
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

              {/* Scene Display Body */}
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
                    paddingTop: "16px",
                    borderTop: "1px dashed var(--border-medium)",
                  }}
                >
                  <button
                    className="retro-btn secondary sm"
                    onClick={handlePrev}
                    disabled={idx === 0}
                    style={{ opacity: idx === 0 ? 0.45 : 1 }}
                    aria-label={`Scroll to chapter ${idx > 0 ? idx : 1}`}
                  >
                    <ChevronLeft size={16} />
                    <span>Previous Chapter</span>
                  </button>

                  {/* Progress dots for current scene */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    {ORIGIN_SCENES.map((_, i) => (
                      <span
                        key={i}
                        style={{
                          width: i === idx ? "22px" : "8px",
                          height: "8px",
                          borderRadius: "var(--radius-full)",
                          background: i === idx ? "var(--accent-primary)" : "var(--border-medium)",
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </div>

                  <button
                    className="retro-btn sm"
                    onClick={handleNext}
                    disabled={idx === ORIGIN_SCENES.length - 1}
                    style={{ opacity: idx === ORIGIN_SCENES.length - 1 ? 0.45 : 1 }}
                    aria-label={`Scroll to chapter ${idx < ORIGIN_SCENES.length - 1 ? idx + 2 : ORIGIN_SCENES.length}`}
                  >
                    <span>Next Chapter</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Status Bar */}
              <div className="window-statusbar">
                <span className="status-indicator">
                  <span className="status-dot" />
                  <span>MIDNIGHT LORE: {scene.chapter} ARCHIVED</span>
                </span>
                <span>NURSERY ORAL TRADITION</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

