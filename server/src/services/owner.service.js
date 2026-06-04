import prisma from "../../configs/prisma.js";

const getOwnerStores = async (ownerId) => {
  return prisma.store.findMany({
    where: {
      ownerId,
    },

    include: {
      ratings: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
};

export { getOwnerStores };
