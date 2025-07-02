import { users } from "../../../db/schema/users.js";

export const userQueries = {};
export const userMutations = {
  registerNewUser: async (_parent, args, context) => {
    const { db } = context;
    const { email, username, clerkId } = args;
    console.log("email, username, clerkId", email, username, clerkId);
    await db.insert(users).values({
      email,
      username,
      clerkUserId: clerkId,
      balance: 0.0,
    });
    return { success: true };
  },
};
