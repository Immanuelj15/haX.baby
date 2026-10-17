import React from "react";
import { FolderHeart, Sparkles, Star, Award, Compass, Heart } from "lucide-react";
import { PIP_CANON } from "../data/portfolioData";

export function CharacterProfile() {
  return (
    <section id="profile" className="section-wrapper" aria-labelledby="profile-title">
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <span className="section-eyebrow">PERSONNEL DOSSIER // CLOUD-09</span>
        <h2 id="profile-title" className="section-title">
          Meet Pip, the Skull Baby
        </h2>
        <p className="section-subtitle" style={{ margin: "0 auto" }}>
          Certified Junior Dream Engineer at the Midnight Nursery. Dedicated to weaving
          the gentlest dreams for sleepy little creatures across the quiet realm.
        </p>
      </div>

      <div className="retro-window">
        {/* Retro Window Bar */}
        <div className="window-titlebar">
          <div className="window-title">
            <FolderHeart size={16} />
            <span>NURSERY_RECORD_001_PIP.DOC</span>
          </div>
          <div className="window-controls">
            <span className="window-btn btn-min" />
            <span className="window-btn btn-max" />
            <span className="window-btn btn-close" />
          </div>
        </div>

        {/* Window Body */}
        <div style={{ padding: "30px" }}>
          <div className="profile-grid">
            {/* Left: Official Character Portrait */}
            <div className="profile-portrait-box">
              <img
                src="/assets/pip_portrait.png"
                alt="Pip official portrait: cute baby with smooth round skull face, star nightcap, tiny pink bow, and warm glowing eyes holding a dream lantern and music box."
                className="profile-portrait-img"
              />
              <h3 className="profile-name">{PIP_CANON.name}</h3>
              <p className="profile-role">
                {PIP_CANON.title} // {PIP_CANON.nursery}
              </p>

              <div
                style={{
                  background: "var(--bg-accent-soft)",
                  border: "1px dashed var(--border-medium)",
                  borderRadius: "var(--radius-sm)",
                  padding: "10px 14px",
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  color: "var(--text-secondary)",
                }}
              >
                “{PIP_CANON.tagline}”
              </div>
            </div>

            {/* Right: Dossier Details & Nursery Metrics */}
            <div className="profile-info-content">
              {/* Personality Traits */}
              <div className="dossier-card">
                <h4 className="dossier-title">
                  <Heart size={18} style={{ color: "var(--accent-primary)" }} />
                  Canonical Personality
                </h4>
                <div className="personality-tags">
                  {PIP_CANON.personality.map((p, i) => (
                    <div key={i} className="personality-badge">
                      <strong>✦ {p.label}</strong>
                      <span>{p.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favorites & Quirk */}
              <div className="dossier-card">
                <h4 className="dossier-title">
                  <Star size={18} style={{ color: "var(--accent-gold)" }} />
                  Favorite Things & Quirks
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  {PIP_CANON.favorites.map((fav, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: "0.92rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span style={{ color: "var(--accent-primary)" }}>✔</span> {fav}
                    </li>
                  ))}
                </ul>
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--text-secondary)",
                    background: "var(--bg-lavender-soft)",
                    padding: "8px 12px",
                    borderRadius: "var(--radius-sm)",
                    borderLeft: "3px solid var(--accent-primary)",
                  }}
                >
                  <strong>Nursery Quirk:</strong> {PIP_CANON.quirk}
                </p>
              </div>

              {/* Dream Engineer Skill Meters */}
              <div className="dossier-card">
                <h4 className="dossier-title">
                  <Award size={18} style={{ color: "var(--accent-primary)" }} />
                  Nursery Qualification Meters
                </h4>
                <div className="skills-grid">
                  {PIP_CANON.skills.map((skill, idx) => (
                    <div key={idx} className="skill-row">
                      <div className="skill-header">
                        <span>{skill.name}</span>
                        <span style={{ color: "var(--accent-primary)" }}>{skill.level}%</span>
                      </div>
                      <div className="skill-track">
                        <div
                          className="skill-fill"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                        {skill.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="window-statusbar">
          <span className="status-indicator">
            <span className="status-dot" />
            <span>NURSERY ARCHIVE: VERIFIED CANONICAL</span>
          </span>
          <span>SECTOR CLOUD-09 // RECORD ID: #001</span>
        </div>
      </div>
    </section>
  );
}
