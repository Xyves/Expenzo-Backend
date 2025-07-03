import { getBudgets } from "@/services/budgets";
import { getTransactions } from "@/services/transactions";
import { getBalance, getMonthlyFinancialSummary } from "@/services/users";

export const dashboardQueries = {
  dashboardSummary: async (_parent, args, context) => {
    const { db } = context;
    const { userId } = args;
    const balance = await getBalance(userId, db);
    const financials = await getMonthlyFinancialSummary(userId, db);
    const reducedValues = financials.reduce();
    return {
      balance,
      reducedValues,
    };
  },
  recentTransactions: async (_parent: unknown, args, context) => {
    const { db } = context;
    const { userId, startDate, endDate, order } = args;
    const limit = 7;
    return await getTransactions(userId, limit, startDate, endDate, order, db);
  },
  recentBudgets: async (_parent, args, context) => {
    const { db } = context;
    const limit = 6;
    const { userId } = args;
    return await getBudgets(userId, limit, db);
  },
  recentTopCategories: async (_parent, args, context) => {
    const { db } = context;

    const { userId } = args;
  },
};
