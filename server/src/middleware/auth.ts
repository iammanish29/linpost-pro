import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: number;
  username?: string;
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access token required" });
    return;
  }

  const secret = process.env.JWT_SECRET || "dev-secret-change-in-production";

  try {
    const payload = jwt.verify(token, secret) as { userId: number; username: string };
    req.userId = payload.userId;
    req.username = payload.username;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
