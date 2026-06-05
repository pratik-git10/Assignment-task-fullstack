import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/adminApi";
import DashboardLayout from "../../components/layout/DashboardLayout";
import AdminStats from "../../components/admin/getAdminStats";
import { Link } from "react-router-dom";
import { Users, Store, Plus, Search } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await getDashboardStats();
      setStats(data);
    };
    load();
  }, []);

  if (!stats)
    return (
      <DashboardLayout>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "3px solid var(--border)",
                borderTopColor: "var(--accent)",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 12px",
              }}
            />
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Loading dashboard…
            </p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </DashboardLayout>
    );

  const actions = [
    { label: "Create Store", to: "/admin/create-store", icon: Store },
    { label: "Create User", to: "/admin/create-user", icon: Plus },
    { label: "View Stores", to: "/admin/stores", icon: Search },
    { label: "View Users", to: "/admin/users", icon: Users },
  ];

  return (
    <DashboardLayout>
      <div style={{ marginBottom: "28px" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "4px",
            letterSpacing: "-0.5px",
          }}>
          Admin Dashboard
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          Overview of platform activity
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "32px",
        }}>
        <Link to="/admin/users" style={{ textDecoration: "none" }}>
          <AdminStats title="Total Users" value={stats.data.totalUsers} />
        </Link>
        <Link to="/admin/stores" style={{ textDecoration: "none" }}>
          <AdminStats title="Total Stores" value={stats.data.totalStores} />
        </Link>
        <AdminStats title="Total Ratings" value={stats.data.totalReviews} />
      </div>

      <div
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "24px",
        }}>
        <h2
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "16px",
          }}>
          Quick Actions
        </h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {actions.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 18px",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-secondary)",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-border)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}>
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
