import React, { useState } from "react";
import { Eye } from "lucide-react";

export function VisitorCounter() {
  const [count] = useState(() => {
    try {
      const stored = localStorage.getItem("pip_local_visits");
      let currentVisits = stored ? parseInt(stored, 10) : 1042;
      if (!sessionStorage.getItem("pip_session_counted")) {
        currentVisits += 1;
        localStorage.setItem("pip_local_visits", currentVisits.toString());
        sessionStorage.setItem("pip_session_counted", "true");
      }
      return currentVisits;
    } catch {
      return 1042;
    }
  });

  // Format count into 6-digit odometer string (e.g. 001043)
  const formatted = count.toString().padStart(6, "0");

  return (
    <div className="odometer-card" title="Demo Local Session Visitor Counter">
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Eye size={16} style={{ color: "var(--accent-primary)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          LOCAL NURSERY COUNTER
        </span>
      </div>

      <div className="odometer-digit-box" aria-label={`Visitor count: ${formatted}`}>
        {formatted.split("").map((digit, idx) => (
          <span key={idx} className="odometer-digit">
            {digit}
          </span>
        ))}
      </div>

      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic" }}>
        (Demo / Local Sessions)
      </span>
    </div>
  );
}
