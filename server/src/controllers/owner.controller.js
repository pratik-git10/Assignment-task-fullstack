import { getOwnerStores } from "../services/owner.service.js";

const getDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const stores = await getOwnerStores(ownerId);

    let totalRatings = 0;

    let totalScore = 0;

    const formattedStores = stores.map((store) => {
      const averageRating = store.ratings.length
        ? (
            store.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
            store.ratings.length
          ).toFixed(1)
        : null;

      store.ratings.forEach((rating) => {
        totalRatings++;

        totalScore += rating.rating;
      });

      return {
        id: store.id,

        name: store.name,

        averageRating,

        ratings: store.ratings.map((rating) => ({
          userId: rating.user.id,

          userName: rating.user.name,

          userEmail: rating.user.email,

          rating: rating.rating,
        })),
      };
    });

    const overallAverage = totalRatings
      ? (totalScore / totalRatings).toFixed(1)
      : null;

    res.json({
      success: true,

      averageRating: overallAverage,

      stores: formattedStores,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { getDashboard };
