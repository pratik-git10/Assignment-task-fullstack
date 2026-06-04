const RatingsTable = ({ ratings }) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>User</th>

          <th>Email</th>

          <th>Rating</th>
        </tr>
      </thead>

      <tbody>
        {ratings.map((rating) => (
          <tr key={rating.userId}>
            <td>{rating.userName}</td>

            <td>{rating.userEmail}</td>

            <td>{rating.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RatingsTable;
