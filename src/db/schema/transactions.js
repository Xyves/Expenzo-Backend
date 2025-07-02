import { mysqlTable, int, varchar, text, date } from "drizzle-orm/mysql-core";
import { users } from "./users.js";
import { categories } from "./categories.js";

export const transactions = mysqlTable("transactions", {
  id: int("id").primaryKey().autoincrement(),
  type: varchar("type", { length: 10 }).notNull(),
  date: date("date").notNull(),
  note: text("note"),
  amount: int("amount").notNull(),
  category_id: int("category_id")
    .notNull()
    .references(() => categories.id),
  user_id: int("user_id")
    .notNull()
    .references(() => users.id),
});
