import {
  createCategory,
  deleteCategories,
  updateCategories,
} from "@/services/categories";

export const categoryMutations = {
  createNewCategory: async (_parent, args, context) => {
    const { name, icon, userId, type } = args;
    const { db } = context;
    console.log(db);
    const newCategory = await createCategory(name, icon, userId, type, db);
    console.log(newCategory);
    return newCategory;
  },
  deleteCategory: async (_parent, args, context) => {
    const { id, userId } = args;
    const { db } = context;
    const deletedCategory = await deleteCategories(id, userId, db);
    return deletedCategory;
  },
  updateCategory: async (_parent, args, context) => {
    const { id, userId, name, icon } = args;
    const { db } = context;
    const updatedCategory = await updateCategories(id, userId, name, icon, db);
    return updatedCategory;
  },
};
