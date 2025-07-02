import { db } from "../db/db.js";
export async function getBudgets(userId, limit) {
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
