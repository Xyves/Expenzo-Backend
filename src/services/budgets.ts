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
export async function updateBudget(
  id,
  userId,
  categoryId,
  amount_limit,
  startDate,
  endDate,
  db
) {
  try {
    const data = {
      ...(categoryId !== undefined && { categoryId }),
      ...(amount_limit !== undefined && { amount_limit }),
      ...(startDate !== undefined && { startDate }),
      ...(endDate !== undefined && { endDate }),
    };
    await db
      .update(budgets)
      .set(data)
      .where(and(eq(budgets.id, id)), eq(budgets.userId, userId));
    const updatedBudget = await db
      .select()
      .from(budgets)
      .where(and(eq(budgets.id, id), eq(budgets.userId, userId)));
    console.log(updatedBudget);
    return updatedBudget[0];
  } catch (error) {}
}
export async function createBudgets(
  id,
  userId,
  categoryId,
  amount_limit,
  startDate,
  endDate,
  db
) {
  try {
    const newBudget = await db
      .insert(budgets)
      .values({ id, userId, categoryId, amount_limit, startDate, endDate });
    const budget = await db.select().from(budgets).where(eq(budgets.id, id));
    console.log(budget);
    return budget[0];
  } catch (error) {}
}
export async function deleteBudget(id, userId, db) {
  try {
    const result = await db
      .delete(budgets)
      .where(and(eq(budgets.userId, userId)), eq(budgets.id, id));
    return {
      id: result.id,
      success: result.rowCount > 0,
    };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
