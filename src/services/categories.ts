import { categories } from "@/db/schema/categories.js";
import { and, eq } from "drizzle-orm";
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
    const updatedCategory = await db.update(categories).set();
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
export async function createCategory(userId, name, icon, type, db) {
  try {
    const result = await db.insert(categories).values({
      userId,
      name,
      icon,
      type,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
