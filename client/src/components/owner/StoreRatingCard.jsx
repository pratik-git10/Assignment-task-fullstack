import RatingsTable from "./RatingTable";

const StoreRatingsCard = ({ store }) => {
  return (
    <div className="bg-white shadow rounded p-5">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">{store.name}</h2>

        <p>Rating: {store.averageRating || "N/A"}</p>
      </div>

      <RatingsTable ratings={store.ratings} />
    </div>
  );
};

export default StoreRatingsCard;
