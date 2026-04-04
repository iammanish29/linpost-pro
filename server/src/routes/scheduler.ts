import { Router } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

router.use(authenticateToken as any);

const scheduled = [
  { id: 1, postId: 1, scheduledAt: "2026-04-05T09:00:00Z", status: "pending" },
  { id: 2, postId: 2, scheduledAt: "2026-04-06T11:30:00Z", status: "pending" },
];

router.get("/", (_req: AuthRequest, res) => {
  res.json({ scheduledPosts: scheduled });
});

router.post("/", (req: AuthRequest, res) => {
  const { postId, scheduledAt } = req.body;
  if (!postId || !scheduledAt) return res.status(400).json({ message: "postId and scheduledAt are required" });
  const job = { id: scheduled.length + 1, postId, scheduledAt, status: "pending" };
  scheduled.push(job);
  res.status(201).json(job);
});

router.delete("/:id", (req: AuthRequest, res) => {
  const index = scheduled.findIndex((s) => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Scheduled post not found" });
  scheduled.splice(index, 1);
  res.json({ message: "Scheduled post cancelled" });
});

export default router;
