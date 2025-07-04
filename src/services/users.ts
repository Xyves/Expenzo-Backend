import { eq, gte, lt, sql } from "drizzle-orm";
import { users } from "@/db/schema/users.js";
import { transactions } from "@/db/schema/transactions.js";
export const getBalance = async (userId, db) => {
  const balance = await db
    .select({ balance: users.balance })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  console.log(balance);
  return balance[0];
};
export const getMonthlyFinancialSummary = async (userId, db) => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();

  const startDate = new Date(Date.UTC(year, month, 1));
  const endDate = new Date(Date.UTC(year, month + 1, 0));
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  try {
    const result = await db
      .select({
        type: transactions.type,
        totalAmount: sql`SUM(${transactions.amount})`,
      })
      .from(transactions)
      .where(
        eq(transactions.user_id, userId),
        gte(transactions.date, formattedStartDate),
        lt(transactions.date, formattedEndDate)
      )
      .groupBy(transactions.type);
    let income = null;
    let expense = null;
    for (const item of result) {
      if (item.type === "income") {
        income = item.totalAmount ?? null;
      } else if (item.type === "expense") {
        expense = item.totalAmount ?? null;
      }
    }
    return {
      income,
      expense,
    };
  } catch (error) {
    console.error("Failed to fetch monthly summary:", error);
    throw error;
  }
};
