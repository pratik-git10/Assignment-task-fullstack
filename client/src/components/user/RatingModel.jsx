import { useState } from "react";
import { X, Star } from "lucide-react";

const RatingModal = ({ store, onClose, onSubmit }) => {
  const [rating, setRating] = useState(store.myRating || 3);
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
      onClick={onClose}>
      <div
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "28px",
          width: "360px",
          maxWidth: "calc(100vw - 32px)",
          boxShadow: "var(--shadow-lg)",
        }}
        onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "20px",
          }}>
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "4px",
              }}>
              Rate Store
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              {store.name}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "6px",
              display: "flex",
              color: "var(--text-secondary)",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
            }}>
            <X size={14} />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "24px",
          }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "none",
                border: "none",
                padding: "4px",
                fontSize: "36px",
                color: n <= (hovered ?? rating) ? "#f59e0b" : "var(--border)",
                transform:
                  n === (hovered ?? rating) ? "scale(1.2)" : "scale(1)",
                transition: "all 0.15s",
                filter:
                  n <= (hovered ?? rating)
                    ? "drop-shadow(0 0 6px rgba(245,158,11,0.5))"
                    : "none",
              }}>
              ★
            </button>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            fontSize: "14px",
            marginBottom: "20px",
          }}>
          {["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
        </p>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              borderRadius: "var(--radius-sm)",
              fontSize: "14px",
              fontWeight: 500,
              transition: "all 0.15s",
            }}>
            Cancel
          </button>
          <button
            onClick={() => onSubmit(rating)}
            style={{
              flex: 1,
              padding: "10px",
              background: "var(--accent)",
              border: "none",
              color: "#fff",
              borderRadius: "var(--radius-sm)",
              fontSize: "14px",
              fontWeight: 600,
              transition: "all 0.15s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--accent)";
            }}>
            <Star size={13} />
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
