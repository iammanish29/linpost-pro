import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const router = Router();

// In-memory demo user for development/production demo
const DEMO_USER = {
  id: 1,
  username: "demo",
  email: "demo@linpostpro.com",
  passwordHash: bcrypt.hashSync("password", 10),
  displayName: "Demo User",
  linkedinConnected: false,
};

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

function generateToken(userId: number, username: string): string {
  const secret = process.env.JWT_SECRET || "dev-secret-change-in-production";
  return jwt.sign({ userId, username }, secret, { expiresIn: "7d" });
}

router.post("/login", async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const { username, password } = result.data;

  // Demo user check
  if (username === DEMO_USER.username) {
    const valid = await bcrypt.compare(password, DEMO_USER.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(DEMO_USER.id, DEMO_USER.username);
    return res.json({
      token,
      user: {
        id: DEMO_USER.id,
        username: DEMO_USER.username,
        email: DEMO_USER.email,
        displayName: DEMO_USER.displayName,
        linkedinConnected: DEMO_USER.linkedinConnected,
      },
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

router.post("/register", async (req, res) => {
  const schema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    displayName: z.string().optional(),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Invalid request", errors: result.error.issues });
  }

  // In production, this would create a user in the database
  return res.status(201).json({ message: "Registration successful. Please log in." });
});

router.post("/logout", (_req, res) => {
  res.json({ message: "Logged out successfully" });
});

export default router;
