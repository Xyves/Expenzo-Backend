import { gql } from "apollo-server";

export const typeDefs = gql`
scalar Date
  type Query {
    _empty: String
    dashboardSummary: String
    recentTransactions: String
    recentBudgets: String
    recentTopCategories: String
  }
  type Mutation {
    registerNewUser(
      email: String!
      username: String!
      clerkId: String!
    ): MutationResponse!
    createTransaction(
      type: String!
      date: DateTime!
      category_id:String!
      user_id:String!
      amount:String!
      note:String
    ):
  }

  type MutationResponse {
    success: Boolean!
  }
  type newTransaction {
      type: String!
      date: DateTime!
      category_id:String!
      id:Number
      user_id:String!
      amount:String!
      note:String
  }
  type Query {
    recentExpenses(limit: Int = 20): [Expense!]!
  }

`;
