import prisma from "../../configs/prisma.js";

const submitRating = async (req, res) => {
  try {
    const userId = req.user.id;

    const { storeId, rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const existing = await prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
    });

    if (existing) {
      return res.status(400).json({
        message: "Rating already submitted",
      });
    }

    const newRating = await prisma.rating.create({
      data: {
        rating,
        userId,
        storeId,
      },
    });

    res.status(201).json({
      success: true,
      rating: newRating,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateRating = async (req, res) => {
  try {
    const userId = req.user.id;

    const { storeId } = req.params;

    const { rating } = req.body;

    const existing = await prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
    });

    if (!existing) {
      return res.status(404).json({
        message: "Rating not found",
      });
    }

    const updated = await prisma.rating.update({
      where: {
        id: existing.id,
      },

      data: {
        rating,
      },
    });

    res.json({
      success: true,
      rating: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { submitRating, updateRating };
