import { budgets } from "@/db/schema/budgets";
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
export async function updateBudget(id, userId, db) {
  try {
    const result = db.update(budgets).set;
  } catch (error) {}
}
export async function deleteBudget(id, userId, db) {
  try {
    const result = db
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
