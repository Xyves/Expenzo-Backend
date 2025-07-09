import {
  boolean,
  date,
  decimal,
  int,
  mysqlEnum,
  mysqlTable,
  timestamp,
} from "drizzle-orm/mysql-core";
import { users } from "./users.js";
import { categories } from "./categories.js";
export const budgets = mysqlTable("budgets", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id),
  categoryId: int("category_id")
    .notNull()
    .references(() => categories.id),
  isArchived: boolean("is_archived").notNull(),
  amount_limit: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  startDate: date("start_date").notNull(),
  interval: mysqlEnum(["daily", "weekly", "monthly"]).default("weekly"),
  endDate: date("end_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
