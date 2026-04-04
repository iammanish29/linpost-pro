import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth";
import postRoutes from "./routes/posts";
import schedulerRoutes from "./routes/scheduler";
import analyticsRoutes from "./routes/analytics";
import mediaRoutes from "./routes/media";
import templateRoutes from "./routes/templates";
import hashtagRoutes from "./routes/hashtags";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/scheduler", schedulerRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/hashtags", hashtagRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../../client/dist");
  app.use(express.static(clientPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`LinPost Pro server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
