import { useEffect } from "react";
import { useState } from "react";
import { getDashboardStats } from "../../api/adminApi";
import DashboardLayout from "../../components/layout/DashboardLayout";
import AdminStats from "../../components/admin/getAdminStats";
import { Link } from "react-router-dom";

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
    return <p className="flex justify-center items-center my-30">Loading...</p>;

  return (
    <DashboardLayout>
      <div className="grid md:grid-cols-3 gap-4">
        <Link to={"/admin/users"}>
          <AdminStats title="Users" value={stats.data.totalUsers} />
        </Link>

        <Link to={"/admin/stores"}>
          <AdminStats title="Stores" value={stats.data.totalStores} />
        </Link>

        <Link to={"/admin/ratings"}>
          <AdminStats title="Ratings" value={stats.data.totalReviews} />
        </Link>
      </div>
      <div className="my-20 flex gap-10 justify-center items-center">
        <Link
          className="border rounded-lg px-4 py-1 active:scale-95 "
          to={"/admin/create-store"}>
          Create Store
        </Link>
        <Link
          className="border rounded-lg px-4 py-1 active:scale-95 "
          to={"/admin/create-user"}>
          create User
        </Link>
        <Link
          className="border rounded-lg px-4 py-1 active:scale-95 "
          to={"/admin/stores"}>
          Get Stores
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
