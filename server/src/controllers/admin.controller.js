import bcrypt from "bcrypt";
import { getDashboardStats } from "../services/admin.service.js";
import prisma from "../../configs/prisma.js";
import {
  createStoreSchema,
  createUserSchema,
} from "../validations/admin.validator.js";
// import {
//   createStoreSchema,
//   createUserSchema,
// } from "../../../client/src/utils/authValidationSchema.js";

const getStats = async (req, res) => {
  try {
    const data = await getDashboardStats();
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Get Stats Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    const validation = createUserSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { name, email, address, password, role } = validation.data;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name, email, address, role, passwordHash },
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully by admin.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Admin Create User Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const {
      search = "",
      role,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const queryConditions = {
      AND: [
        role ? { role } : {},
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { address: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    };

    const users = await prisma.user.findMany({
      where: queryConditions,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { [sortBy]: order },
    });

    const total = await prisma.user.count({ where: queryConditions });

    return res.json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        stores: {
          include: { ratings: true },
        },
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let averageRating = null;

    if (user.role === "STORE_OWNER" && user.stores.length > 0) {
      const ratings = user.stores.flatMap((store) => store.ratings);
      if (ratings.length > 0) {
        averageRating = (
          ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        ).toFixed(1);
      }
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
        averageRating: averageRating ? Number(averageRating) : null,
      },
    });
  } catch (error) {
    console.error("Get User Details Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const createStore = async (req, res) => {
  try {
    const validation = createStoreSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { name, email, address, ownerId } = validation.data;

    const owner = await prisma.user.findUnique({ where: { id: ownerId } });

    if (!owner) {
      return res
        .status(404)
        .json({ success: false, message: "Store owner not found" });
    }

    if (owner.role !== "STORE_OWNER") {
      return res.status(400).json({
        success: false,
        message: "User is not mapped as a store owner",
      });
    }

    const store = await prisma.store.create({
      data: { name, email, address, ownerId },
    });

    return res.status(201).json({
      success: true,
      store,
    });
  } catch (error) {
    console.error("Create Store Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getStores = async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 10,
      sortBy = "name",
      order = "asc",
    } = req.query;

    const queryConditions = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { address: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const stores = await prisma.store.findMany({
      where: queryConditions,
      include: { ratings: true },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { [sortBy]: order },
    });

    const total = await prisma.store.count({ where: queryConditions });

    const formattedStores = stores.map((store) => {
      const averageRating =
        store.ratings.length > 0
          ? (
              store.ratings.reduce((sum, r) => sum + r.rating, 0) /
              store.ratings.length
            ).toFixed(1)
          : null;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        rating: averageRating ? Number(averageRating) : null,
      };
    });

    return res.json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      stores: formattedStores,
    });
  } catch (error) {
    console.error("Get Stores Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export {
  getStats,
  createUser,
  getUsers,
  getUserDetails,
  createStore,
  getStores,
};
