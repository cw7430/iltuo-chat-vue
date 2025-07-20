import { sql } from "drizzle-orm";
import { mysqlTable, bigint, varchar, timestamp, boolean } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  userIdx: bigint("user_idx", { mode: "bigint" }).primaryKey().autoincrement(),
  userId: varchar("user_id", { length: 100 }).notNull().unique(),
  email: varchar("email", { length: 100 }),
  authority: varchar("authority", { length: 100 }).notNull().default("USER"),
  registrationMethod: varchar("registration_method", { length: 100 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
  isValid: boolean("is_valid").notNull().default(true),
});

export const nativeAuths = mysqlTable("native_auths", {
  nativeAuthId: bigint("native_auth_id", { mode: "bigint" }).primaryKey().autoincrement(),
  userIdx: bigint("user_idx", { mode: "bigint" })
    .notNull()
    .references(() => users.userIdx, { onDelete: "cascade", onUpdate: "cascade" }),
  password: varchar("password", { length: 100 }).notNull(),
});

export const socialAuths = mysqlTable("social_auths", {
  socialAuthId: bigint("social_auth_id", { mode: "bigint" }).primaryKey().autoincrement(),
  userIdx: bigint("user_idx", { mode: "bigint" })
    .notNull()
    .references(() => users.userIdx, { onDelete: "cascade", onUpdate: "cascade" }),
  authProvider: varchar("auth_provider", { length: 100 }).notNull(),
  providerUserId: varchar("provider_user_id", { length: 100 }).notNull(),
  isValid: boolean("is_valid").notNull().default(true),
});
