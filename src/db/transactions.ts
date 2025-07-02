import { and, asc, desc, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "./db";
import { transactions } from "./schema";

export async function getTransactions(
  userId,
  limit,
  startDate,
  endDate,
  order
) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const query = db.query.transactions.findMany({
    where: and(
      eq(transactions.user_id, userId),
      gte(transactions.date, startDate || startOfMonth),
      lte(transactions.date, endDate || endOfMonth)
    ),
    limit: limit,
    orderBy: [
      order === "asc" ? asc(transactions.date) : desc(transactions.date),
    ],
  });
  return query;
}
export async function getTopCategories(userId, limit, startDate, endDate) {
  const result = await db.execute(sql`
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
