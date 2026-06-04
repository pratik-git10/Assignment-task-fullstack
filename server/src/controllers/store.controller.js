import prisma from "../../configs/prisma.js";

const getStores = async (req, res) => {
  try {
    const userId = req.user.id;

    const { search = "", page = 1, limit = 10 } = req.query;

    const stores = await prisma.store.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            address: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },

      include: {
        ratings: true,
      },

      skip: (Number(page) - 1) * Number(limit),

      take: Number(limit),
    });

    const response = stores.map((store) => {
      const overallRating = store.ratings.length
        ? (
            store.ratings.reduce((sum, r) => sum + r.rating, 0) /
            store.ratings.length
          ).toFixed(1)
        : null;

      const myRating = store.ratings.find((r) => r.userId === userId);

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        overallRating,
        myRating: myRating?.rating || null,
      };
    });

    res.json({
      success: true,
      stores: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { getStores };
