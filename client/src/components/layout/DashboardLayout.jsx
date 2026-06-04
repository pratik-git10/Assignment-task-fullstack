import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Navbar />

      <main className="p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
