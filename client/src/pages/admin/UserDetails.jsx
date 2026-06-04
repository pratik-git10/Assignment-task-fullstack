// src/pages/admin/Users.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../api/adminApi";
import DashboardLayout from "../../components/layout/DashboardLayout";
import toast from "react-hot-toast";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await getUserDetails(id);

        if (response.success) {
          setUserData(response.user);
        }
      } catch (error) {
        console.error("Failed to load user information:", error);
        toast.error(error.response?.data?.message || "User profile not found.");
        navigate("/admin/dashboard"); // Safe fallback redirect if the ID is corrupt/invalid
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id, navigate]); // Triggers reload if the URL ID switches

  if (loading) return <p className="p-6 text-center">Loading User Data...</p>;
  if (!userData) return null;

  return (
    <DashboardLayout>
      <div className=" p-6 rounded shadow-md max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:underline mb-4 block">
          ← Back to List
        </button>

        <div className="border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
          <span className="inline-block bg-black text-white text-xs px-2 py-1 rounded mt-1">
            {userData.role}
          </span>
        </div>

        <div className="space-y-3">
          <p>
            <strong>Email Address:</strong> {userData.email}
          </p>
          <p>
            <strong>Physical Address:</strong> {userData.address}
          </p>

          {/* Render extra fields if this specific user happens to own stores */}
          {userData.role === "STORE_OWNER" && (
            <p>
              <strong>Overall Store Rating:</strong>{" "}
              {userData.averageRating || "No ratings yet"}
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDetails;
