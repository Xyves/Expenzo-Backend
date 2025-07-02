import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./users.js";

export const categories = mysqlTable("categories", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 30 }).notNull(),
  icon: varchar("icon", { length: 50 }),
  color: varchar("color", { length: 20 }),
  isDefault: boolean(),
  userId: int("user_id", { mode: "nullable" }).references(() => users.id),
  type: mysqlEnum("type", ["income", "expense"]),
});
