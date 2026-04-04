import { Router } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

router.use(authenticateToken as any);

const mockMedia = [
  { id: 1, filename: "linkedin-banner.jpg", type: "image", size: 245000, url: "/media/linkedin-banner.jpg" },
  { id: 2, filename: "product-demo.mp4", type: "video", size: 12400000, url: "/media/product-demo.mp4" },
];

router.get("/", (_req: AuthRequest, res) => {
  res.json({ media: mockMedia });
});

router.delete("/:id", (req: AuthRequest, res) => {
  const index = mockMedia.findIndex((m) => m.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Media not found" });
  mockMedia.splice(index, 1);
  res.json({ message: "Media deleted" });
});

export default router;
