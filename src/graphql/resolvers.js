import { DateTimeResolver } from "graphql-scalars";
import { dashboardQueries } from "./resolvers/dashboard/queries.ts";
import { userMutations, userQueries } from "./resolvers/user/queries.js";
import { transactionMutations } from "./resolvers/transactions/mutations.ts";
import { categoryMutations } from "./resolvers/categories/mutations.ts";
export const resolvers = {
  DateTime: DateTimeResolver,
  Query: { ...dashboardQueries, ...userQueries },
  Mutation: { ...userMutations, ...transactionMutations, ...categoryMutations },
};
