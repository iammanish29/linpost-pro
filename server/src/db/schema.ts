import { pgTable, serial, text, timestamp, boolean, integer, jsonb, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  displayName: varchar("display_name", { length: 100 }),
  linkedinId: varchar("linkedin_id", { length: 100 }),
  linkedinAccessToken: text("linkedin_access_token"),
  linkedinConnected: boolean("linkedin_connected").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  hashtags: text("hashtags").array(),
  mediaUrls: text("media_urls").array(),
  status: varchar("status", { length: 20 }).default("draft"),
  linkedinPostId: varchar("linkedin_post_id", { length: 100 }),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const scheduledPosts = pgTable("scheduled_posts", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").references(() => posts.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  scheduledAt: timestamp("scheduled_at").notNull(),
  status: varchar("status", { length: 20 }).default("pending"),
  jobId: varchar("job_id", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").references(() => posts.id),
  userId: integer("user_id").references(() => users.id).notNull(),
  impressions: integer("impressions").default(0),
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  shares: integer("shares").default(0),
  clicks: integer("clicks").default(0),
  engagementRate: text("engagement_rate"),
  recordedAt: timestamp("recorded_at").defaultNow(),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  filename: varchar("filename", { length: 255 }).notNull(),
  originalName: varchar("original_name", { length: 255 }),
  mimeType: varchar("mime_type", { length: 100 }),
  size: integer("size"),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 50 }),
  isFavorite: boolean("is_favorite").default(false),
  usageCount: integer("usage_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
