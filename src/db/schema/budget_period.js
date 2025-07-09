import { categories } from "./categories";
import { users } from "./users";
import { budgets } from "./budgets";
import { date, int, mysqlTable } from "drizzle-orm/mysql-core";

export const budget_period = mysqlTable("budget_period", {
  id: int("id").primaryKey().autoincrement(),
  budgetId: int("id")
    .notNull()
    .references(() => budgets.id),
  userId: int("user_id")
    .notNull()
    .references(() => users.id),
  categoryId: int("category_id")
    .notNull()
    .references(() => categories.id),
  amountLimit: int("amount_limit").notNull(),
  amountSpent: int("amount_spent"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
});
