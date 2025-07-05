import { and, asc, desc, eq, gte, lte, sql } from "drizzle-orm";
import { transactions } from "@/db/schema/transactions.js";
import { users } from "@/db/schema/users.js";
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
  try {
    // console.log("object:", {
    //   userId,
    //   type,
    //   date,
    //   note,
    //   amount,
    //   category_id,
    // });
    const now = new Date();
    const safeDate = date ?? now;
    const transactResponse = await db.transaction(async (tx) => {
      const [insertResult] = await tx.insert(transactions).values({
        type,
        date: safeDate,
        note,
        amount,
        category_id,
        user_id: userId,
      });
      const newTransactionId = insertResult.insertId;

      // Fetch the inserted transaction
      const insertedTransaction = await tx.query.transactions.findFirst({
        where: (fields, { eq }) => eq(fields.id, newTransactionId),
      });
      console.log(insertedTransaction);
      const [userInsertResult] = await tx
        .update(users)
        .set({
          balance: sql`
      ${users.balance} + CASE
        WHEN ${type} = 'income' THEN ${amount}
        WHEN ${type} = 'expense' THEN -${amount}
        ELSE 0
      END
    `,
        })
        .where(eq(users.id, userId));

      const updatedUser = await tx.query.users.findFirst({
        where: (fields, { eq }) => eq(fields.id, userId),
        columns: { balance: true }, // only fetch balance
      });

      return {
        userInsertResult,
        updatedUser,
      };
    });

    console.log("Created response", transactResponse);
    return transactResponse;
  } catch (error) {
    console.error(error);
    return { success: false };
  }
  // Add to transactions + update budget + u
}
export async function getTopCategories(userId, startDate, endDate, db) {
  console.log(userId, startDate, endDate);
  const [rows] = await db.execute(sql`
  SELECT c.id AS category_id, c.name AS category_name, SUM(t.amount) AS total,c.icon AS category_icon, c.isDefault as isDefault
  FROM transactions t
  JOIN categories c ON t.category_id = c.id
  WHERE t.user_id = ${userId}
    AND t.date BETWEEN ${startDate} AND ${endDate}
    AND c.type = "Expense"
  GROUP BY c.id, c.name
  ORDER BY total DESC
`);
  console.log("result is:", rows);

  return rows;
}
export async function deleteTransaction(id, userId, db) {
  try {
    const result = await db
      .delete(transactions)
      .where(and(eq(transactions.user_id, userId), eq(transactions.id, id)));
    console.log("Delete result:", result);
    return {
      success: result[0].affectedRows > 0,
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
