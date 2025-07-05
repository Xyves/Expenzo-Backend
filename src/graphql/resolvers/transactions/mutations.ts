import { createTransaction, deleteTransaction } from "@/services/transactions";

export const transactionMutations = {
  deleteTransaction: async (_parent, args, context) => {
    const { db } = context;
    const { id, userId } = args;
    const deletedTransaction = await deleteTransaction(id, userId, db);
    return deletedTransaction;
  },
  createNewTransaction: async (_parent, args, context) => {
    const { db } = context;
    const { userId, type, date, note, amount, category_id } = args;
    const createdTransaction = await createTransaction(
      userId,
      type,
      date,
      note,
      amount,
      category_id,
      db
    );
    return createTransaction;
  },
};
