import { createCategory, deleteCategories } from "@/services/categories";

export const categoryMutations = {
  createNewCategory: async (_parent, args, context) => {
    const { name, icon, userId, type } = args;
    const { db } = context;
    const newCategory = await createCategory(name, icon, userId, type, db);
  },
  deleteCategory: async (_parent, args, context) => {
    const { id, userId } = args;
    const { db } = context;
    const deletedCategory = await deleteCategories(id, userId, db);
  },
  updateCategory: async (_parent, args, context) => {},
};
