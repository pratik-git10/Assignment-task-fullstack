const AverageRatingCard = ({ averageRating }) => {
  return (
    <div className="bg-white shadow rounded p-6">
      <h3 className="text-gray-500">Overall Average Rating</h3>

      <p className="text-4xl font-bold mt-3">{averageRating || "N/A"}</p>
    </div>
  );
};

export default AverageRatingCard;
