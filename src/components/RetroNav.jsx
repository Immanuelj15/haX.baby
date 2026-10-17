import React, { useState, useEffect } from "react";
import { Moon, Sun, Volume2, VolumeX, Music, Menu, X, Key, Cloud } from "lucide-react";
import { dreamAudio } from "../utils/audioSynth";

export function RetroNav({ theme, toggleTheme, onOpenSecretRoom }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    isMuted: false,
  });

  useEffect(() => {
    const unsub = dreamAudio.subscribe((state) => {
      setAudioState({
        isPlaying: state.isPlaying,
        isMuted: state.isMuted,
      });
    });
    return unsub;
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = ["hero", "profile", "projects", "story", "guestbook"];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offsets = sections.map((id) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: 0 };
        return { id, top: el.offsetTop - 120 };
      });

      for (let i = offsets.length - 1; i >= 0; i--) {
        if (scrollY >= offsets[i].top) {
          setActiveSection(offsets[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    dreamAudio.playUiSparkle("click");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleSound = () => {
    dreamAudio.init();
    if (!audioState.isPlaying) {
      dreamAudio.startLullaby();
    } else {
      dreamAudio.setMuted(!audioState.isMuted);
    }
  };

  return (
    <nav className="retro-nav-container" aria-label="Main Navigation">
      <div className="retro-nav-bar">
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
          className="nav-brand"
        >
          <div className="nav-brand-icon">
            <Cloud size={18} />
          </div>
          <span>Pip's Dream OS</span>
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li>
            <button
              className={`nav-link-btn ${activeSection === "profile" ? "active" : ""}`}
              onClick={() => scrollToSection("profile")}
            >
              About Pip
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activeSection === "projects" ? "active" : ""}`}
              onClick={() => scrollToSection("projects")}
            >
              Dream Projects
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activeSection === "story" ? "active" : ""}`}
              onClick={() => scrollToSection("story")}
            >
              Origin Story
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activeSection === "guestbook" ? "active" : ""}`}
              onClick={() => scrollToSection("guestbook")}
            >
              Dream Notes
            </button>
          </li>
        </ul>

        {/* Controls */}
        <div className="nav-controls">
          {/* Secret Room Trigger Button */}
          <button
            className="nav-icon-btn"
            onClick={() => {
              dreamAudio.playUiSparkle("secret");
              onOpenSecretRoom();
            }}
            title="Secret Dream Room"
            aria-label="Unlock Secret Dream Room"
          >
            <Key size={17} />
          </button>

          {/* Sound / Lullaby Toggle */}
          <button
            className={`nav-icon-btn ${audioState.isPlaying && !audioState.isMuted ? "playing" : ""}`}
            onClick={toggleSound}
            title={
              !audioState.isPlaying
                ? "Start Lullaby Chimes"
                : audioState.isMuted
                ? "Unmute Lullaby"
                : "Mute Lullaby"
            }
            aria-label={
              !audioState.isPlaying
                ? "Start Lullaby Chimes"
                : audioState.isMuted
                ? "Unmute Lullaby"
                : "Mute Lullaby"
            }
          >
            {!audioState.isPlaying ? (
              <Music size={17} />
            ) : audioState.isMuted ? (
              <VolumeX size={17} />
            ) : (
              <Volume2 size={17} />
            )}
          </button>

          {/* Day / Night Theme Toggle */}
          <button
            className="nav-icon-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === "day" ? "Night Mode" : "Day Mode"}`}
            aria-label={`Switch to ${theme === "day" ? "Night Mode" : "Day Mode"}`}
          >
            {theme === "day" ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            className="nav-icon-btn nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
          <button
            className={`mobile-nav-link ${activeSection === "hero" ? "active" : ""}`}
            onClick={() => scrollToSection("hero")}
          >
            <span>Home</span>
            <span>✦</span>
          </button>
          <button
            className={`mobile-nav-link ${activeSection === "profile" ? "active" : ""}`}
            onClick={() => scrollToSection("profile")}
          >
            <span>About Pip</span>
            <span>✦</span>
          </button>
          <button
            className={`mobile-nav-link ${activeSection === "projects" ? "active" : ""}`}
            onClick={() => scrollToSection("projects")}
          >
            <span>Dream Projects</span>
            <span>✦</span>
          </button>
          <button
            className={`mobile-nav-link ${activeSection === "story" ? "active" : ""}`}
            onClick={() => scrollToSection("story")}
          >
            <span>Origin Story</span>
            <span>✦</span>
          </button>
          <button
            className={`mobile-nav-link ${activeSection === "guestbook" ? "active" : ""}`}
            onClick={() => scrollToSection("guestbook")}
          >
            <span>Dream Notes</span>
            <span>✦</span>
          </button>
          <button
            className="mobile-nav-link"
            style={{ color: "var(--accent-gold)" }}
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSecretRoom();
            }}
          >
            <span>Secret Dream Room 🗝️</span>
            <span>✦</span>
          </button>
        </div>
      )}
    </nav>
  );
}
