import { DateTimeResolver } from "graphql-scalars";
import { dashboardQueries } from "./resolvers/dashboard/queries.js";
import { userMutations, userQueries } from "./resolvers/user/queries.js";

export const resolvers = {
  DateTime: DateTimeResolver,
  Query: { ...dashboardQueries, ...userQueries },
  Mutation: { ...userMutations },
};
