import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, double } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const packagingMaterials = mysqlTable("packagingMaterials", {
  id: int("id").autoincrement().primaryKey(),
  materialKey: varchar("materialKey", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  oxygenBarrier: double("oxygenBarrier").notNull(),
  moistureBarrier: double("moistureBarrier").notNull(),
  sustainability: double("sustainability").notNull(),
  costPerUnit: double("costPerUnit").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const recommendationRuns = mysqlTable("recommendationRuns", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  commodity: varchar("commodity", { length: 120 }).notNull(),
  inputJson: text("inputJson").notNull(),
  resultJson: text("resultJson").notNull(),
  topMaterial: varchar("topMaterial", { length: 160 }).notNull(),
  finalScore: double("finalScore").notNull(),
  predictedShelfLife: double("predictedShelfLife").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const scanEvents = mysqlTable("scanEvents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  sourceName: varchar("sourceName", { length: 255 }),
  extractedText: text("extractedText").notNull(),
  parsedJson: text("parsedJson").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type RecommendationRun = typeof recommendationRuns.$inferSelect;
