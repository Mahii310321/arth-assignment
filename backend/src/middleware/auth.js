import { HttpError } from "../lib/httpError.js";
import { prisma } from "../lib/prisma.js";
import { getSession } from "../lib/sessionStore.js";
import { isTokenBlacklisted } from "../lib/tokenBlacklist.js";
import { verifyToken } from "../lib/tokens.js";

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      throw new HttpError(401, "Missing bearer token.");
    }

    const token = header.slice("Bearer ".length);

    if (isTokenBlacklisted(token)) {
      throw new HttpError(401, "Token has been logged out.");
    }

    const payload = verifyToken(token);
    const session = getSession(token);

    if (!session || session.userId !== payload.sub) {
      throw new HttpError(401, "Session has expired. Please login again.");
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        name: true,
        email: true,
        profileImageUrl: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw new HttpError(401, "User for token no longer exists.");
    }

    req.user = user;
    req.token = token;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new HttpError(401, "Token has expired."));
    }

    if (error.name === "JsonWebTokenError") {
      return next(new HttpError(401, "Invalid token."));
    }

    return next(error);
  }
}
