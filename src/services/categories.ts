import { categories } from "@/db/schema/categories.js";
import { and, eq, SQL } from "drizzle-orm";
export async function getCategories(userId, db) {
  try {
    const categoryList = await db
      .select()
      .from(categories)
      .where(eq(categories.userid, userId));
    return categoryList;
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
export async function updateCategories(id, userId, name, icon, db) {
  try {
    const updatedCategory = await db.update(categories).set({
      id,
      userId,
      name,
      icon,
    });
    return updatedCategory;
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
export async function deleteCategories(userId, id, db) {
  try {
    const result = await db
      .delete(categories)
      .where(and(eq(categories.userId, userId)), eq(categories.id, id));
    return {
      id: result.id,
      success: result.rowCount > 0,
    };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
export async function createCategory(name, icon, userId, type, db) {
  try {
    const categoryResponse = await db.transaction(async (tx) => {
      const [insertResult] = await tx.insert(categories).values({
        userId,
        name,
        icon,
        type,
      });
      const newCategoryId = insertResult.insertId;
      const insertedCategory = await tx.query.categories.findFirst({
        where: (
          fields: typeof categories.$inferSelect,
          { eq }: { eq: <T>(column: SQL.Aliased<T>, value: T) => SQL }
        ) => eq(fields.id, newCategoryId),
      });
      console.log(insertedCategory);
      return insertedCategory;
    });
    return categoryResponse;
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
