import { and, asc, desc, eq, gte, lte, SQL, sql } from "drizzle-orm";
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

      // Fetch the new transaction
      const insertedTransaction = await tx.query.transactions.findFirst({
        where: (
          fields: typeof transactions.$inferSelect,
          { eq }: { eq: <T>(column: SQL.Aliased<T>, value: T) => SQL }
        ) => eq(fields.id, newTransactionId),
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
        where: (
          fields: typeof users.$inferSelect,
          { eq }: { eq: <T>(column: SQL.Aliased<T>, value: T) => SQL }
        ) => eq(fields.id, userId),
        columns: { balance: true },
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
    const data = {
      ...(type !== undefined && { type }),
      ...(date !== undefined && { date }),
      ...(note !== undefined && { note }),
      ...(amount !== undefined && { amount }),
      ...(category_id !== undefined && { category_id }),
    };

    await db.update(transactions).set(data).where(eq(transactions.id, id));
    const updated = await db
      .select()
      .from(transactions)
      .where(eq(transactions.id, id));
    console.log(updated);
    return updated[0];
  } catch (error) {}
}
