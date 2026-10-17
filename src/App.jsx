import React, { useState, useEffect } from "react";
import "./styles/theme.css";
import "./styles/components.css";
import { SparkleTrail } from "./components/SparkleTrail";
import { RetroNav } from "./components/RetroNav";
import { Hero } from "./components/Hero";
import { CharacterProfile } from "./components/CharacterProfile";
import { DreamProjects } from "./components/DreamProjects/DreamProjects";
import { OriginStory } from "./components/OriginStory";
import { DreamGuestbook } from "./components/DreamGuestbook";
import { SecretRoomModal } from "./components/SecretRoomModal";
import { Footer } from "./components/Footer";
import { dreamAudio } from "./utils/audioSynth";

export default function App() {
  // Theme state: initialized from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("pip_theme");
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";
    } catch (e) {
      return "night";
    }
  });

  const [secretRoomOpen, setSecretRoomOpen] = useState(false);
  const [pipClickCount, setPipClickCount] = useState(0);

  // Apply data-theme to root element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("pip_theme", theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "day" ? "night" : "day";
    setTheme(nextTheme);
    dreamAudio.playUiSparkle("click");
  };

  // Easter egg: Clicking Pip 5 times unlocks secret room
  const handlePipClick = () => {
    const newCount = pipClickCount + 1;
    setPipClickCount(newCount);

    if (newCount >= 5) {
      setSecretRoomOpen(true);
      setPipClickCount(0); // reset after trigger
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app-layout">
      {/* Decorative pointer sparkle trail */}
      <SparkleTrail />

      {/* Floating Retro OS Navigation Dock */}
      <RetroNav
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenSecretRoom={() => setSecretRoomOpen(true)}
      />

      <main id="main-content">
        {/* Section 1: Hero Experience */}
        <Hero
          clickCount={pipClickCount}
          onPipClick={handlePipClick}
          onExploreDreams={() => scrollTo("projects")}
          onMeetPip={() => scrollTo("profile")}
        />

        {/* Section 2: Character Profile (Meet Pip) */}
        <CharacterProfile />

        {/* Section 3: Dream Projects (4 interactive projects) */}
        <DreamProjects />

        {/* Section 4: Multi-scene Origin Story */}
        <OriginStory />

        {/* Section 5: Community Dream Guestbook & Wish Wall */}
        <DreamGuestbook />
      </main>

      {/* Footer & Official Credits */}
      <Footer onOpenSecretRoom={() => setSecretRoomOpen(true)} />

      {/* Easter Egg Modal */}
      <SecretRoomModal
        isOpen={secretRoomOpen}
        onClose={() => setSecretRoomOpen(false)}
      />
    </div>
  );
}
