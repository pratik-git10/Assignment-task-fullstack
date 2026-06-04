import bcrypt from "bcrypt";

import prisma from "../../configs/prisma.js";
import generateToken from "../utils/jwt.js";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validations/auth.validator.js";

const register = async (req, res) => {
  try {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { name, email, address, password } = validation.data;

    // We are Checking is existing user present
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    // Hashing our passowrd
    const passwordHash = await bcrypt.hash(password, 12);

    // Creating this user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        address,
        passwordHash,
        role: "USER",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.flatten().fieldErrors,
      });
    }
    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials.",
      });
    }

    const checked = await bcrypt.compare(password, user.passwordHash);

    if (!checked) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(user);

    const cookieOptions = {
      httpOnly: true, //
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        },
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const validation = resetPasswordSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { currentPassword, newPassword } = validation.data;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const valid = await bcrypt.compare(currentPassword, user.passwordHash);

    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }
    const isSamePassword = await bcrypt.compare(newPassword, user.passwordHash);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same.",
      });
    }

    const hashedPass = await bcrypt.hash(newPassword, 12);

    const newUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashedPass,
      },
    });

    res.status(200).json({
      success: true,
      message: "Password updated.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "Logged out successfully.",
      });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "INternal Server Error",
    });
  }
};

export { register, login, logout, resetPassword, getCurrentUser };
