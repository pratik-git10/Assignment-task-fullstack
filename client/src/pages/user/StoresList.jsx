/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { getStores, submitRating, updateRating } from "../../api/storeApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import RatingModal from "../../components/user/RatingModel";
import StoreCard from "../../components/user/StoreCard";

const StoresList = () => {
  const [stores, setStores] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedStore, setSelectedStore] = useState(null);

  const loadStores = async () => {
    const data = await getStores({
      search,
    });

    setStores(data.stores);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadStores();
  }, [search, loadStores]);

  const handleRating = async (rating) => {
    try {
      if (selectedStore.myRating) {
        await updateRating(selectedStore.id, {
          rating,
        });
      } else {
        await submitRating({
          storeId: selectedStore.id,

          rating,
        });
      }

      toast.success("Rating saved");

      setSelectedStore(null);

      loadStores();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Stores"
          className="border p-2"
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} onRate={setSelectedStore} />
        ))}
      </div>
      {selectedStore && (
        <RatingModal
          store={selectedStore}
          onClose={() => setSelectedStore(null)}
          onSubmit={handleRating}
        />
      )}
    </DashboardLayout>
  );
};
export default StoresList;
