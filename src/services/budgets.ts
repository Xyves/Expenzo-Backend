import { budgets } from "@/db/schema/budgets.js";
import { and, eq } from "drizzle-orm";
export async function getBudgets(userId, limit, db) {
  if (limit) {
    return db.budgets.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } else {
    return db.budgets.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
}
export async function updateBudget({
  id,
  userId,
  categoryId,
  amount_limit,
  startDate,
  interval,
  endDate,
  db,
}) {
  try {
    const data = {
      ...(categoryId !== undefined && { categoryId }),
      ...(interval !== undefined && { interval }),
      ...(amount_limit !== undefined && { amount_limit }),
      ...(startDate !== undefined && { startDate }),
      ...(endDate !== undefined && { endDate }),
    };
    const result = await db
      .update(budgets)
      .set(data)
      .where(and(eq(budgets.id, id)), eq(budgets.userId, userId));
    const updatedBudget = await db
      .select()
      .from(budgets)
      .where(and(eq(budgets.id, id), eq(budgets.userId, userId)));
    return updatedBudget[0];
  } catch (error) {}
}
export async function createBudgets(
  userId,
  categoryId,
  amount_limit,
  interval,
  startDate,
  endDate,
  db
) {
  try {
    console.log({
      userId,
      categoryId,
      amount_limit,
      startDate,
      endDate,
      types: {
        userId: typeof userId,
        startDate: typeof startDate,
      },
    });
    const result = await db
      .insert(budgets)
      .values({
        userId,
        categoryId,
        amount_limit,
        startDate: startDate,
        endDate: startDate,
        isArchived: false,
        interval,
      })
      .execute();
    const budgetId = result[0].insertId ?? result.insertId;
    console.log(budgetId, result.insertId);
    const budget = await db
      .select()
      .from(budgets)
      .where(eq(budgets.id, budgetId));
    console.log(budget, budgetId, result);
    return budget[0];
  } catch (error) {}
}
export async function deleteBudget(id, userId, db) {
  try {
    const result = await db
      .delete(budgets)
      .where(and(eq(budgets.userId, userId), eq(budgets.id, id)));
    console.log(result[0].rowCount > 0 ? true : false);
    return {
      success: result[0].affectedRows > 0,
    };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
