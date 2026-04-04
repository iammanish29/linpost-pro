import { Router } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

router.use(authenticateToken as any);

const mockPosts = [
  { id: 1, content: "Excited to share our latest insights on AI-driven content strategies...", status: "published", createdAt: new Date().toISOString() },
  { id: 2, content: "5 proven techniques to boost your LinkedIn engagement rate by 300%...", status: "scheduled", createdAt: new Date().toISOString() },
];

router.get("/", (req: AuthRequest, res) => {
  res.json({ posts: mockPosts, total: mockPosts.length });
});

router.get("/:id", (req: AuthRequest, res) => {
  const post = mockPosts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

router.post("/", (req: AuthRequest, res) => {
  const { content, hashtags, mediaUrls } = req.body;
  if (!content) return res.status(400).json({ message: "Content is required" });
  const newPost = { id: mockPosts.length + 1, content, status: "draft", createdAt: new Date().toISOString() };
  mockPosts.push(newPost);
  res.status(201).json(newPost);
});

router.put("/:id", (req: AuthRequest, res) => {
  const post = mockPosts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  Object.assign(post, req.body);
  res.json(post);
});

router.delete("/:id", (req: AuthRequest, res) => {
  const index = mockPosts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });
  mockPosts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

export default router;
