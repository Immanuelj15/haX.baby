import React, { useState, useEffect } from "react";
import { MessageSquarePlus, Heart, Send, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { INITIAL_GUESTBOOK } from "../data/portfolioData";
import { dreamAudio } from "../utils/audioSynth";

export function DreamGuestbook() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTag, setSelectedTag] = useState("Warm Blanket");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const tagOptions = [
    "Warm Blanket",
    "Flying Dream",
    "Star Catching",
    "Midnight Cocoa",
    "Sweet Lullaby",
  ];

  // Load from localStorage or initialize with canonical entries
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pip_guestbook_entries");
      if (saved) {
        setEntries(JSON.parse(saved));
      } else {
        setEntries(INITIAL_GUESTBOOK);
      }
    } catch (e) {
      setEntries(INITIAL_GUESTBOOK);
    }
  }, []);

  const saveEntries = (newEntries) => {
    setEntries(newEntries);
    try {
      localStorage.setItem("pip_guestbook_entries", JSON.stringify(newEntries));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const trimmedName = name.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName) {
      setErrorMsg("Please tell Pip your sleepy nickname!");
      return;
    }

    if (trimmedMsg.length < 5) {
      setErrorMsg("Your dream wish must be at least 5 characters long.");
      return;
    }

    if (trimmedMsg.length > 140) {
      setErrorMsg("Please keep your wish within 140 characters so it fits on a stardust tag.");
      return;
    }

    const newEntry = {
      id: "entry-" + Date.now(),
      name: trimmedName,
      time: "Just now",
      tag: selectedTag,
      message: trimmedMsg,
      likes: 1,
    };

    const updated = [newEntry, ...entries];
    saveEntries(updated);

    setName("");
    setMessage("");
    setSuccessMsg("✨ Your dream wish was tucked safely into Pip's stardust logbook!");
    dreamAudio.playUiSparkle("wish");

    setTimeout(() => {
      setSuccessMsg("");
    }, 4500);
  };

  const handleLike = (id) => {
    dreamAudio.playUiSparkle("click");
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, likes: (entry.likes || 0) + 1 };
      }
      return entry;
    });
    saveEntries(updated);
  };

  return (
    <section id="guestbook" className="section-wrapper" aria-labelledby="guestbook-title">
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <span className="section-eyebrow">COMMUNITY DREAM ARCHIVE</span>
        <h2 id="guestbook-title" className="section-title">
          The Midnight Guestbook & Wish Wall
        </h2>
        <p className="section-subtitle" style={{ margin: "0 auto" }}>
          Leave a bedtime wish or message for Pip! Notes are stored safely in your browser's
          local stardust memory.
        </p>
      </div>

      <div className="retro-window">
        <div className="window-titlebar">
          <div className="window-title">
            <MessageSquarePlus size={16} />
            <span>NURSERY_COMMUNITY_WISHLIST.DAT</span>
          </div>
          <div className="window-controls">
            <span className="window-btn btn-min" />
            <span className="window-btn btn-max" />
            <span className="window-btn btn-close" />
          </div>
        </div>

        <div style={{ padding: "30px" }}>
          {/* Transparency Disclaimer Banner */}
          <div
            style={{
              background: "var(--bg-accent-soft)",
              border: "1px dashed var(--border-medium)",
              borderRadius: "var(--radius-md)",
              padding: "10px 16px",
              marginBottom: "24px",
              fontSize: "0.88rem",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Sparkles size={16} style={{ color: "var(--accent-primary)" }} />
            <span>
              <strong>Notice:</strong> This is a client-side local guestbook. Your wishes are saved
              in your browser's <code>localStorage</code> cache.
            </span>
          </div>

          <div className="guestbook-layout">
            {/* Left: Input Wish Form */}
            <form className="guestbook-form-card" onSubmit={handleSubmit} noValidate>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", marginBottom: "14px" }}>
                Leave a Dream Wish
              </h3>

              {errorMsg && (
                <div
                  style={{
                    background: "rgba(226, 109, 149, 0.15)",
                    border: "1px solid var(--accent-secondary)",
                    color: "var(--text-main)",
                    borderRadius: "var(--radius-sm)",
                    padding: "8px 12px",
                    marginBottom: "14px",
                    fontSize: "0.88rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  role="alert"
                >
                  <AlertCircle size={15} color="var(--accent-primary)" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div
                  style={{
                    background: "rgba(59, 178, 115, 0.15)",
                    border: "1px solid #3bb273",
                    color: "var(--text-main)",
                    borderRadius: "var(--radius-sm)",
                    padding: "8px 12px",
                    marginBottom: "14px",
                    fontSize: "0.88rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  role="status"
                >
                  <CheckCircle size={15} color="#3bb273" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="wish-nickname">
                  Your Sleepy Nickname:
                </label>
                <input
                  id="wish-nickname"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Slumbering Squirrel"
                  maxLength={30}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Wish Category Tag:</label>
                <div className="wish-tag-selector">
                  {tagOptions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`wish-tag-btn ${selectedTag === tag ? "active" : ""}`}
                      onClick={() => {
                        setSelectedTag(tag);
                        dreamAudio.playUiSparkle("click");
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className="form-label" htmlFor="wish-message">
                    Your Dream Request / Bedtime Note:
                  </label>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: message.length > 130 ? "var(--accent-primary)" : "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {message.length}/140
                  </span>
                </div>
                <textarea
                  id="wish-message"
                  className="form-textarea"
                  rows={3}
                  placeholder="What gentle dream would you like Pip to weave for you?"
                  maxLength={140}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="retro-btn" style={{ width: "100%" }}>
                <Send size={16} />
                <span>Send Wish to Pip's Desk</span>
              </button>
            </form>

            {/* Right: Message Wall Feed */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem" }}>
                  Tucked-In Wishes ({entries.length})
                </h3>
                <span className="retro-chip" style={{ fontSize: "0.8rem" }}>
                  Auto-Sorted
                </span>
              </div>

              <div className="guestbook-wall">
                {entries.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                    No wishes yet! Be the first creature to write to Pip.
                  </div>
                ) : (
                  entries.map((item) => (
                    <div key={item.id} className="guestbook-entry-card">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <strong style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>
                            {item.name}
                          </strong>
                          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginLeft: "8px" }}>
                            {item.time}
                          </span>
                        </div>
                        <span className="retro-chip" style={{ fontSize: "0.75rem", padding: "2px 8px" }}>
                          {item.tag}
                        </span>
                      </div>

                      {/* Render text safely without innerHTML */}
                      <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                        {item.message}
                      </p>

                      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        <button
                          type="button"
                          className="retro-btn secondary sm"
                          onClick={() => handleLike(item.id)}
                          style={{ padding: "4px 10px", fontSize: "0.8rem", gap: "4px" }}
                          aria-label={`Like wish from ${item.name}`}
                        >
                          <Heart size={13} fill="currentColor" style={{ color: "var(--accent-primary)" }} />
                          <span>{item.likes || 0}</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="window-statusbar">
          <span className="status-indicator">
            <span className="status-dot" />
            <span>LOCAL STORAGE WISH DATABASE // READY</span>
          </span>
          <span>SAFE XSS-FREE SANITIZATION</span>
        </div>
      </div>
    </section>
  );
}
