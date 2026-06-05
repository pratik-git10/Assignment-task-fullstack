import { Star } from "lucide-react";

const StoreCard = ({ store, onRate }) => {
  const hasRating = !!store.myRating;

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "20px",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: "border-color 0.2s, transform 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent-border)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "translateY(0)";
      }}>
      <div>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "4px",
          }}>
          {store.name}
        </h3>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
          {store.address}
        </p>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <div
          style={{
            flex: 1,
            background: "var(--bg-elevated)",
            borderRadius: "var(--radius-sm)",
            padding: "8px 12px",
            border: "1px solid var(--border-subtle)",
          }}>
          <p
            style={{
              fontSize: "10px",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "2px",
            }}>
            Overall
          </p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--text-primary)",
            }}>
            {store.overallRating
              ? "★ " + Number(store.overallRating).toFixed(1)
              : "—"}
          </p>
        </div>
        <div
          style={{
            flex: 1,
            background: hasRating ? "var(--accent-bg)" : "var(--bg-elevated)",
            borderRadius: "var(--radius-sm)",
            padding: "8px 12px",
            border: `1px solid ${hasRating ? "var(--accent-border)" : "var(--border-subtle)"}`,
          }}>
          <p
            style={{
              fontSize: "10px",
              color: hasRating ? "var(--accent)" : "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "2px",
            }}>
            Your Rating
          </p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: hasRating ? "var(--accent)" : "var(--text-primary)",
            }}>
            {store.myRating ? "★ " + store.myRating : "—"}
          </p>
        </div>
      </div>

      <button
        onClick={() => onRate(store)}
        style={{
          width: "100%",
          padding: "9px",
          background: hasRating ? "var(--bg-elevated)" : "var(--accent)",
          border: `1px solid ${hasRating ? "var(--border)" : "transparent"}`,
          color: hasRating ? "var(--text-secondary)" : "#fff",
          borderRadius: "var(--radius-sm)",
          fontSize: "13px",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.85";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}>
        <Star size={13} />
        {hasRating ? "Update Rating" : "Rate Store"}
      </button>
    </div>
  );
};

export default StoreCard;
