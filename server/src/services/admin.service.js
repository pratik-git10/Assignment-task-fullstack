import prisma from "../../configs/prisma.js";

const getDashboardStats = async () => {
  const totalUsers = await prisma.user.count();
  const totalStores = await prisma.store.count();
  const totalReviews = await prisma.rating.count();

  return { totalUsers, totalStores, totalReviews };
};

export { getDashboardStats };
