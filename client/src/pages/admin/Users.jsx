import { useEffect, useState } from "react";
import { getUsers } from "../../api/adminApi";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const LIMIT = 10;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [search, role]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers({
          search,
          role,
          page,
          limit: LIMIT,
        });

        if (data.success) {
          setUsers(data.users);
          setTotalUsers(data.total);
        }
      } catch (error) {
        console.error("Error loading user dataset:", error);
      }
    };
    loadUsers();
  }, [search, role, page]);

  const totalPages = Math.ceil(totalUsers / LIMIT) || 1;

  return (
    <div className="p-6">
      {/* Filters Section */}
      <div className="flex gap-4 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border p-2 rounded"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded">
          <option value="">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="STORE_OWNER">Store Owner</option>
        </select>
      </div>

      {/* Users Data Table */}
      <table className="w-full border-collapse border border-gray-200 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Role</th>
            <th className="border p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2 text-sm">{user.role}</td>
                <td className="border p-2 text-sm">{user.id}</td>
                <td className="border p-2 text-blue-600 hover:underline">
                  <Link to={`/admin/users/${user.id}`}>View Profile</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No users found matching requirements.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/*  Pagination */}
      <div className="flex items-center justify-between mt-4 bg-gray-50 p-4 rounded border">
        <span className="text-sm text-gray-600">
          Showing page <strong>{page}</strong> of <strong>{totalPages}</strong>{" "}
          ({totalUsers} total users)
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed">
            Previous
          </button>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
