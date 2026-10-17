import React, { useState } from "react";
import { FolderGit2, Music, SunDim, Map, BookOpen } from "lucide-react";
import { LullabyPlayer } from "./LullabyPlayer";
import { NightlightCollection } from "./NightlightCollection";
import { DreamDeliveryMap } from "./DreamDeliveryMap";
import { Storybook } from "./Storybook";
import { dreamAudio } from "../../utils/audioSynth";

export function DreamProjects() {
  const [activeTab, setActiveTab] = useState("lullaby");

  const projects = [
    { id: "lullaby", name: "01. The Lullaby Lab", icon: Music, badge: "WebAudio Synth" },
    { id: "lantern", name: "02. Nightlight Collection", icon: SunDim, badge: "Dynamic Aura" },
    { id: "delivery", name: "03. Delivery Routes", icon: Map, badge: "SVG Telemetry" },
    { id: "storybook", name: "04. Bedtime Storybook", icon: BookOpen, badge: "Folio Tales" },
  ];

  const handleTabChange = (id) => {
    setActiveTab(id);
    dreamAudio.playUiSparkle("click");
  };

  return (
    <section id="projects" className="section-wrapper" aria-labelledby="projects-title">
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <span className="section-eyebrow">DREAM ENGINEERING INVENTIONS</span>
        <h2 id="projects-title" className="section-title">
          Pip's Dream Project Showcase
        </h2>
        <p className="section-subtitle" style={{ margin: "0 auto" }}>
          Four fully-interactive instruments designed at the Midnight Nursery. Test melodies,
          adjust bedroom lanterns, trace rooftop delivery routes, and read bedtime folios.
        </p>
      </div>

      <div className="retro-window">
        {/* Retro Window Bar */}
        <div className="window-titlebar">
          <div className="window-title">
            <FolderGit2 size={16} />
            <span>MIDNIGHT_INVENTIONS_BROWSER.EXE</span>
          </div>
          <div className="window-controls">
            <span className="window-btn btn-min" />
            <span className="window-btn btn-max" />
            <span className="window-btn btn-close" />
          </div>
        </div>

        {/* Window Content */}
        <div style={{ padding: "30px" }}>
          {/* Tab Selector Buttons */}
          <div className="projects-nav-tabs" role="tablist" aria-label="Dream Projects Tabs">
            {projects.map((p) => {
              const Icon = p.icon;
              const isActive = activeTab === p.id;
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`project-tab-btn ${isActive ? "active" : ""}`}
                  onClick={() => handleTabChange(p.id)}
                >
                  <Icon size={18} />
                  <span>{p.name}</span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      opacity: isActive ? 0.9 : 0.6,
                      background: isActive ? "rgba(255,255,255,0.2)" : "var(--bg-accent-soft)",
                      padding: "2px 6px",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    {p.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Showcase Pane */}
          <div role="tabpanel" tabIndex={0}>
            {activeTab === "lullaby" && <LullabyPlayer />}
            {activeTab === "lantern" && <NightlightCollection />}
            {activeTab === "delivery" && <DreamDeliveryMap />}
            {activeTab === "storybook" && <Storybook />}
          </div>
        </div>

        {/* Status Bar */}
        <div className="window-statusbar">
          <span className="status-indicator">
            <span className="status-dot" />
            <span>ACTIVE PROJECT: {activeTab.toUpperCase()} ENGINE // 100% OPERATIONAL</span>
          </span>
          <span>HAX.BABY TRACK 1 CANON</span>
        </div>
      </div>
    </section>
  );
}
