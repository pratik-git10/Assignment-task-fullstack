import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100svh",
        background: "var(--bg-base)",
        display: "flex",
        flexDirection: "column",
      }}>
      <Navbar />
      <main
        style={{
          flex: 1,
          padding: "28px 24px",
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
