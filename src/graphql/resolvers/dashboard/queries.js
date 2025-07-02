export const dashboardQueries = {
  dashboardSummary: async (_parent, args, context) => {
    const { db } = context;
    const { userId } = args;

    const balance = await context.db.getBalance(userId);
    const incomeValue = await context.db.getIncome(userId);
    const expenseValue = await db.getExpense(userId);
    return {
      balance,
      incomeValue,
      expenseValue,
    };
  },
  recentTransactions: async (_parent, args, context) => {
    const { db } = context;

    const limit = 7;
    const { userId } = args;
    return await context.db.getTransactions(userId, limit);
  },
  recentBudgets: async (_parent, args, context) => {
    const { db } = context;

    const limit = 6;
    const { userId } = args;
    return await context.db.getBudgets(userId, limit);
  },
  recentTopCategories: async (_parent, args, context) => {
    const { db } = context;

    const { userId } = args;
  },
};
