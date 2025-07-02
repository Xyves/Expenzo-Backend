import {
  mysqlTable,
  varchar,
  datetime,
  float,
  int,
} from "drizzle-orm/mysql-core";
export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  clerkUserId: varchar("clerk_user_id", { length: 191 }).notNull().unique(),
  email: varchar("email", { length: 36 }),
  username: varchar("username", { length: 36 }),
  createdAt: datetime("created_at", { mode: "string" }).default(),
  balance: float("balance"),
});
