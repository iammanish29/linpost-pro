import { Router } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

router.use(authenticateToken as any);

router.get("/overview", (_req: AuthRequest, res) => {
  res.json({
    totalPosts: 124,
    totalImpressions: 48200,
    totalLikes: 1890,
    totalComments: 456,
    totalShares: 234,
    engagementRate: 4.7,
    followersGained: 156,
    weeklyData: [
      { date: "Apr 1", impressions: 2200, likes: 89, comments: 34 },
      { date: "Apr 2", impressions: 3100, likes: 127, comments: 45 },
      { date: "Apr 3", impressions: 2800, likes: 108, comments: 38 },
      { date: "Apr 4", impressions: 3500, likes: 145, comments: 56 },
    ],
  });
});

router.get("/posts/:postId", (req: AuthRequest, res) => {
  res.json({
    postId: req.params.postId,
    impressions: Math.floor(Math.random() * 5000),
    likes: Math.floor(Math.random() * 200),
    comments: Math.floor(Math.random() * 80),
    shares: Math.floor(Math.random() * 40),
    engagementRate: (Math.random() * 8).toFixed(2),
  });
});

export default router;
