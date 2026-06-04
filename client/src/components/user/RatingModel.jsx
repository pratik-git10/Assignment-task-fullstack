import { useState } from "react";

const RatingModal = ({ store, onClose, onSubmit }) => {
  const [rating, setRating] = useState(store.myRating || 1);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <h2 className="text-xl font-bold">{store.name}</h2>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 mt-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <div className="flex gap-2 mt-4">
          <button onClick={() => onSubmit(rating)}>Save</button>

          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
