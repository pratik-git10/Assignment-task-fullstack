const StoreCard = ({ store, onRate }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-semibold">{store.name}</h3>

      <p>{store.address}</p>

      <p>Overall Rating: {store.overallRating || "N/A"}</p>

      <p>My Rating: {store.myRating || "-"}</p>

      <button
        onClick={() => onRate(store)}
        className="mt-3 px-3 py-2 bg-black text-white rounded">
        {store.myRating ? "Update Rating" : "Rate Store"}
      </button>
    </div>
  );
};

export default StoreCard;
