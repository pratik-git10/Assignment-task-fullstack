import { useEffect } from "react";
import { useState } from "react";
import { getOwnerDashboard } from "../../api/ownerApi";
import DashboardLayout from "../../components/layout/DashboardLayout";
import AverageRatingCard from "../../components/owner/averageRatingCard";
import StoreRatingsCard from "../../components/owner/StoreRatingCard";

const OwnerDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const result = await getOwnerDashboard();

      setData(result);
    };

    load();
  }, []);

  if (!data) {
    return <p className="flex my-30 justify-center items-center">Loading...</p>;
  }
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <AverageRatingCard averageRating={data.averageRating} />

        {data.stores.map((store) => (
          <StoreRatingsCard key={store.id} store={store} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default OwnerDashboard;
