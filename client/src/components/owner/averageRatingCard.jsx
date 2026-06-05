const AverageRatingCard = ({ averageRating }) => {
  const stars = Math.round(averageRating || 0);

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "24px",
        boxShadow: "var(--shadow-sm)",
      }}>
      <p
        style={{
          fontSize: "12px",
          fontWeight: 500,
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "12px",
        }}>
        Overall Average Rating
      </p>
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
        <span
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1,
            letterSpacing: "-1.5px",
          }}>
          {averageRating ? Number(averageRating).toFixed(1) : "—"}
        </span>
        <div style={{ display: "flex", gap: "3px" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              style={{
                fontSize: "18px",
                color: i <= stars ? "#f59e0b" : "var(--border)",
              }}>
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AverageRatingCard;
