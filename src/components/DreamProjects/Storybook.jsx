import React, { useState, useEffect, useCallback } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import { STORYBOOK_PAGES } from "../../data/portfolioData";
import { dreamAudio } from "../../utils/audioSynth";

export function Storybook() {
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const totalPages = STORYBOOK_PAGES.length;
  const page = STORYBOOK_PAGES[currentPageIdx];

  const goToNextPage = useCallback(() => {
    setCurrentPageIdx((prev) => {
      if (prev < totalPages - 1) {
        dreamAudio.playUiSparkle("page");
        return prev + 1;
      }
      return prev;
    });
  }, [totalPages]);

  const goToPrevPage = useCallback(() => {
    setCurrentPageIdx((prev) => {
      if (prev > 0) {
        dreamAudio.playUiSparkle("page");
        return prev - 1;
      }
      return prev;
    });
  }, []);

  // Keyboard navigation support (Arrow keys) - safely ignores typing in input fields
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA" || document.activeElement?.isContentEditable) {
        return;
      }
      if (e.key === "ArrowRight") goToNextPage();
      if (e.key === "ArrowLeft") goToPrevPage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextPage, goToPrevPage]);

  return (
    <div className="storybook-container">
      {/* Screen reader live region for page changes */}
      <div className="sr-only" role="status" aria-live="polite">
        Page {page.page} of {totalPages}: {page.title}
      </div>

      <div className="storybook-page-card" key={page.page}>
        {/* Storybook Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <BookOpen size={20} style={{ color: "var(--accent-primary)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
              MIDNIGHT NURSERY BEDTIME TALES // FOLIO #{page.page}
            </span>
          </div>

          <span className="retro-chip">
            <Bookmark size={13} /> Page {page.page} of {totalPages}
          </span>
        </div>

        {/* Page Content */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontSize: "2.4rem" }}>{page.illustration}</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", color: "var(--text-main)" }}>
              {page.title}
            </h3>
          </div>

          <p className="story-narrative-text">
            <span className="story-dropcap">{page.text.charAt(0)}</span>
            {page.text.slice(1)}
          </p>

          <div
            style={{
              background: "var(--bg-accent-soft)",
              borderLeft: "3px solid var(--accent-primary)",
              padding: "10px 16px",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              marginTop: "20px",
            }}
          >
            {page.caption}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="storybook-controls">
          <button
            className="retro-btn secondary sm"
            onClick={goToPrevPage}
            disabled={currentPageIdx === 0}
            style={{ opacity: currentPageIdx === 0 ? 0.45 : 1 }}
            aria-label="Previous story page"
          >
            <ChevronLeft size={16} />
            <span>Previous Page</span>
          </button>

          {/* Page Indicators */}
          <div style={{ display: "flex", gap: "6px" }}>
            {STORYBOOK_PAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentPageIdx(idx);
                  dreamAudio.playUiSparkle("page");
                }}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  border: "1px solid var(--border-medium)",
                  background: idx === currentPageIdx ? "var(--accent-primary)" : "var(--bg-surface)",
                  cursor: "pointer",
                }}
                aria-label={`Jump to page ${idx + 1}`}
              />
            ))}
          </div>

          <button
            className="retro-btn sm"
            onClick={goToNextPage}
            disabled={currentPageIdx === totalPages - 1}
            style={{ opacity: currentPageIdx === totalPages - 1 ? 0.45 : 1 }}
            aria-label="Next story page"
          >
            <span>Next Page</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
