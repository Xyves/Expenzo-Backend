import { createBudgets, deleteBudget, updateBudget } from "@/services/budgets";

export const budgetMutations = {
  createNewBudget: async (_parent, args, context) => {
    const { userId, categoryId, amount_limit, startDate, endDate, interval } =
      args;
    const { db } = context;
    const newBudget = await createBudgets(
      userId,
      categoryId,
      amount_limit,
      interval,
      startDate,
      endDate,
      db
    );
    return newBudget;
  },
  updateBudget: async (_parent, args, context) => {
    const {
      id,
      userId,
      categoryId,
      amount_limit,
      startDate,
      endDate,
      interval,
    } = args;
    const { db } = context;
    const updatedBudget = await updateBudget({
      id,
      userId,
      categoryId,
      interval,
      amount_limit,
      startDate,
      endDate,
      db,
    });
    return updatedBudget;
  },
  deleteBudget: async (_parent, args, context) => {
    const { id, userId } = args;
    const { db } = context;
    const deletedBudget = await deleteBudget(id, userId, db);
    return deletedBudget;
  },
};
