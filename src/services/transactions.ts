import { and, asc, desc, eq, gte, lte, sql } from "drizzle-orm";
import { transactions } from "@/db/schema/transactions.js";

export async function getTransactions(
  userId,
  limit,
  startDate,
  endDate,
  order,
  db
) {
  const query = await db.query.transactions.findMany({
    where: and(
      eq(transactions.user_id, userId),
      startDate ? gte(transactions.date, new Date(startDate)) : undefined,
      endDate ? lte(transactions.date, new Date(endDate)) : undefined
    ),
    limit,
    orderBy: [
      order === "asc" ? asc(transactions.date) : desc(transactions.date),
    ],
  });
  return query;
}
export async function createTransaction(
  userId,
  type,
  date,
  note,
  amount,
  category_id,
  db
) {
  // Add to transactions + update budget + u
}
export async function getTopCategories(userId, limit, startDate, endDate, db) {
  const result = await db.query(sql`
  SELECT c.id AS category_id, c.name AS category_name, SUM(t.amount) AS total
  FROM transactions t
  JOIN categories c ON t.category_id = c.id
  WHERE t.user_id = ${userId}
    AND t.date BETWEEN ${startDate} AND ${endDate}
  GROUP BY c.id, c.name
  ORDER BY total DESC
  LIMIT = ${limit};
`);

  return result;
}
export async function deleteTransaction(
  id,
  userId,

  db
) {
  try {
    const result = await db
      .delete(transactions)
      .where(and(eq(transactions.user_id, userId)), eq(transactions.id, id));
    return {
      id: result.id,
      success: result.rowCount > 0,
    };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
export async function updateTransaction(
  id,
  userId,
  type,
  date,
  note,
  amount,
  category_id,
  db
) {
  try {
    const result = await db.update(transactions).set({});
  } catch (error) {}
}
