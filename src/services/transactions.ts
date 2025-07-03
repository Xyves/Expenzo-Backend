import { and, asc, desc, eq, gte, lte, sql } from "drizzle-orm";
import { transactions } from "@/db/schema";

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
export async function getTopCategories(userId, limit, startDate, endDate, db) {
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
