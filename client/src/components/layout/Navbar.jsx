import { logoutUser } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { LogOut, KeyRound, Store } from "lucide-react";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/");
  };

  return (
    <nav
      style={{
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "var(--shadow-sm)",
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            background: "var(--accent-bg)",
            border: "1px solid var(--accent-border)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Store size={16} color="var(--accent)" />
        </div>
        <Link
          to={"/"}
          style={{
            fontWeight: 700,
            fontSize: "15px",
            color: "var(--text-primary)",
            letterSpacing: "-0.3px",
          }}>
          Store Rating
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {user?.name && (
          <span
            style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              padding: "4px 12px",
              borderRadius: "20px",
            }}>
            {user.name}
          </span>
        )}

        <Link
          to="/profile/change-password"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            borderRadius: "var(--radius-sm)",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            fontSize: "13px",
            fontWeight: 500,
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
          <KeyRound size={13} />
          Password
        </Link>

        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            borderRadius: "var(--radius-sm)",
            background: "var(--danger-bg)",
            border: "1px solid rgba(239,68,68,0.25)",
            color: "var(--danger)",
            fontSize: "13px",
            fontWeight: 500,
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239,68,68,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--danger-bg)";
          }}>
          <LogOut size={13} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
