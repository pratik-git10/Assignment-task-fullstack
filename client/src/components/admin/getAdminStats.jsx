const AdminStats = ({ title, value }) => {
  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "20px 24px",
        boxShadow: "var(--shadow-sm)",
        transition: "border-color 0.2s, transform 0.15s, box-shadow 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent-border)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
      }}>
      <p
        style={{
          fontSize: "12px",
          fontWeight: 500,
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "10px",
        }}>
        {title}
      </p>
      <p
        style={{
          fontSize: "36px",
          fontWeight: 700,
          color: "var(--text-primary)",
          lineHeight: 1,
          letterSpacing: "-1px",
        }}>
        {value ?? "—"}
      </p>
    </div>
  );
};

export default AdminStats;
