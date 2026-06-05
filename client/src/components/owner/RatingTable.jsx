const RatingsTable = ({ ratings }) => {
  if (!ratings || ratings.length === 0) {
    return (
      <div
        style={{
          padding: "32px",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "14px",
        }}>
        No ratings yet
      </div>
    );
  }

  return (
    <div
      style={{
        overflowX: "auto",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border)",
      }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--bg-elevated)" }}>
            <th>User</th>
            <th>Email</th>
            <th style={{ textAlign: "center" }}>Rating</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((rating) => (
            <tr key={rating.userId}>
              <td style={{ fontWeight: 500 }}>{rating.userName}</td>
              <td style={{ color: "var(--text-secondary)" }}>
                {rating.userEmail}
              </td>
              <td style={{ textAlign: "center" }}>
                <span
                  style={{
                    background: "var(--warning)" + "22",
                    border: `1px solid var(--warning)44`,
                    color: "var(--warning)",
                    padding: "2px 10px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}>
                  {"★ " + rating.rating}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RatingsTable;
