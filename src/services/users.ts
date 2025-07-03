import { eq, sql } from "drizzle-orm";
import { users } from "@/db/schema/users.js";
export const getBalance = async (userId, db) => {
  const balance = await db
    .select({ balance: users.balance })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return balance[0];
};
export const getMonthlyFinancialSummary = async (userId, db) => {
  console.log("Check balance");
  const now = new Date(Date.now());
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);

  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return db.execute(
    sql`select type,SUM(amount) from transactions where (userId = ${userId} AND  date >= ${startDate} AND date < ${endDate}) GROUP BY type`
  );
};
