import { useEffect, useState } from "react";
import { getStores } from "../../api/adminApi";

const GetStores = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalStores, setTotalStores] = useState(0);
  const LIMIT = 10;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [search]);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await getStores({ search, page, limit: LIMIT });
        if (data.success) {
          setStores(data.stores);
          setTotalStores(data.total);
        }
      } catch (error) {
        console.error("Error loading stores:", error);
      }
    };
    loadStores();
  }, [search, page]);

  const totalPages = Math.ceil(totalStores / LIMIT) || 1;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Stores</h2>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search stores..."
        className="border p-2 rounded mb-4 w-full max-w-xs"
      />

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Store Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Address</th>
            <th className="border p-2 text-left">Avg Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.length > 0 ? (
            stores.map((store) => (
              <tr key={store.id} className="hover:bg-gray-50">
                <td className="border p-2 font-medium">{store.name}</td>
                <td className="border p-2">{store.email}</td>
                <td className="border p-2">{store.address}</td>
                <td className="border p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${store.rating ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-600"}`}>
                    {store.rating ? `⭐ ${store.rating}` : "No ratings"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No stores found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4 bg-gray-50 p-4 rounded border">
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages} ({totalStores} total)
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-black text-white rounded disabled:bg-gray-300">
            Previous
          </button>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-black text-white rounded disabled:bg-gray-300">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStores;
