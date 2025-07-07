import { getBudgets } from "@/services/budgets";
import { getTransactions } from "@/services/transactions";
import { getBalance, getMonthlyFinancialSummary } from "@/services/users";
import { getTopCategories } from "@/services/categories";

export const dashboardQueries = {
  dashboardSummary: async (_parent, args, context) => {
    const { db } = context;
    const { userId } = args;
    const balance = await getBalance(userId, db);
    const financials = await getMonthlyFinancialSummary(userId, db);
    const safeFinancials = {
      income: financials.income ?? 0,
      expense: financials.expense ?? 0,
    };

    console.log(balance, financials);
    return {
      balance: balance ?? 0,
      financials: safeFinancials,
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
    const { userId, startDate, endDate } = args;
    const now = new Date();
    const defaultStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const defaultEnd = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const safeStartDate = startDate ? new Date(startDate) : defaultStart;
    const safeEndDate = endDate ? new Date(endDate) : defaultEnd;

    const formattedStart = safeStartDate.toISOString();
    const formattedEnd = safeEndDate.toISOString();

    return await getTopCategories(userId, formattedStart, formattedEnd, db);
  },
};
