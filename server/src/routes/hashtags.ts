import { Router } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

router.use(authenticateToken as any);

const trendingHashtags = [
  { tag: "#LinkedInTips", followers: "2.4M", difficulty: "High", category: "Networking" },
  { tag: "#ContentMarketing", followers: "1.8M", difficulty: "High", category: "Marketing" },
  { tag: "#B2BMarketing", followers: "890K", difficulty: "Medium", category: "Marketing" },
  { tag: "#Leadership", followers: "3.2M", difficulty: "High", category: "Career" },
  { tag: "#Entrepreneurship", followers: "4.1M", difficulty: "High", category: "Business" },
  { tag: "#PersonalBranding", followers: "760K", difficulty: "Medium", category: "Branding" },
  { tag: "#DigitalMarketing", followers: "2.8M", difficulty: "High", category: "Marketing" },
  { tag: "#SaaS", followers: "540K", difficulty: "Low", category: "Technology" },
];

router.get("/trending", (_req: AuthRequest, res) => {
  res.json({ hashtags: trendingHashtags });
});

router.get("/search", (req: AuthRequest, res) => {
  const query = (req.query.q as string || "").toLowerCase();
  const results = trendingHashtags.filter((h) => h.tag.toLowerCase().includes(query));
  res.json({ hashtags: results });
});

export default router;
