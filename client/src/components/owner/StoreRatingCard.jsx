import RatingsTable from "./RatingTable";

const StoreRatingsCard = ({ store }) => {
  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "24px",
        boxShadow: "var(--shadow-sm)",
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}>
          {store.name}
        </h2>
        <div
          style={{
            background: "var(--accent-bg)",
            border: "1px solid var(--accent-border)",
            color: "var(--accent)",
            padding: "4px 14px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: 600,
          }}>
          ★{" "}
          {store.averageRating ? Number(store.averageRating).toFixed(1) : "N/A"}
        </div>
      </div>
      <RatingsTable ratings={store.ratings} />
    </div>
  );
};

export default StoreRatingsCard;
