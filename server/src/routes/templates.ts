import { Router } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

router.use(authenticateToken as any);

const mockTemplates = [
  { id: 1, title: "Value-Driven Insight", content: "🔑 [KEY INSIGHT]...", category: "Educational", isFavorite: true, usageCount: 24 },
  { id: 2, title: "Personal Story Arc", content: "[TIME PERIOD] ago, I [SITUATION]...", category: "Storytelling", isFavorite: true, usageCount: 18 },
];

router.get("/", (_req: AuthRequest, res) => {
  res.json({ templates: mockTemplates });
});

router.post("/", (req: AuthRequest, res) => {
  const { title, content, category } = req.body;
  if (!title || !content) return res.status(400).json({ message: "title and content are required" });
  const template = { id: mockTemplates.length + 1, title, content, category: category || "General", isFavorite: false, usageCount: 0 };
  mockTemplates.push(template);
  res.status(201).json(template);
});

router.delete("/:id", (req: AuthRequest, res) => {
  const index = mockTemplates.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Template not found" });
  mockTemplates.splice(index, 1);
  res.json({ message: "Template deleted" });
});

export default router;
