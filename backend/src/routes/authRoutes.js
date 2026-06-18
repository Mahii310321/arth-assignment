import bcrypt from "bcrypt";
import express from "express";
import rateLimit from "express-rate-limit";

import { requireAuth } from "../middleware/auth.js";
import { prisma } from "../lib/prisma.js";
import { blacklistToken } from "../lib/tokenBlacklist.js";
import { verifyToken } from "../lib/tokens.js";
import { signToken } from "../lib/tokens.js";
import { validateBody } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Please try again later."
  }
});

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

router.post("/register", validateBody(registerSchema), async (req, res, next) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        message: "A user with this email already exists."
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        profileImageUrl
      }
    });

    const token = signToken(user);

    return res.status(201).json({
      message: "Registration successful.",
      token,
      user: publicUser(user)
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", loginLimiter, validateBody(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const token = signToken(user);

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: publicUser(user)
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/logout", requireAuth, (req, res) => {
  const payload = verifyToken(req.token);
  const expiresAt = payload.exp ? payload.exp * 1000 : Date.now() + 24 * 60 * 60 * 1000;
  blacklistToken(req.token, expiresAt);

  return res.status(200).json({
    message: "Logout successful."
  });
});

router.get("/me", requireAuth, (req, res) => {
  return res.status(200).json({
    user: req.user
  });
});

export default router;
