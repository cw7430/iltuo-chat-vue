import { sql } from "drizzle-orm";
import {
  mysqlTable,
  bigint,
  varchar,
  timestamp,
  date,
  text,
  boolean,
} from "drizzle-orm/mysql-core";

import { users } from "./auths";

export const profiles = mysqlTable("profiles", {
  profileId: bigint("profile_id", { mode: "bigint" }).primaryKey().autoincrement(),
  userIdx: bigint("user_idx", { mode: "bigint" })
    .notNull()
    .references(() => users.userIdx, { onDelete: "cascade", onUpdate: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  mbti: varchar("mbti", { length: 100 }).notNull(),
  birthDate: date("birth_date").notNull(),
  gender: varchar("gender", { length: 100 }).notNull(),
  bio: text("bio").notNull(),
  createdAt: timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const profileImages = mysqlTable("profile_images", {
  profileImageId: bigint("profile_image_id", { mode: "bigint" }).primaryKey().autoincrement(),
  profileId: bigint("profile_id", { mode: "bigint" })
    .notNull()
    .references(() => profiles.profileId, { onDelete: "cascade", onUpdate: "cascade" }),
  originalFileName: varchar("original_file_name", { length: 255 }).notNull(),
  storedFileName: varchar("stored_file_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isMain: boolean("is_main").notNull().default(false),
});
