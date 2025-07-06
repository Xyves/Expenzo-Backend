import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar DateTime
  type Query {
    _empty: String
    dashboardSummary(userId: Int!): dashboardSummaryReturn!
    recentTransactions(
      userId: Int!
      limit: Int
      startDate: DateTime
      endDate: DateTime
      order: String
    ): [newTransaction!]!
    recentBudgets: String
    recentTopCategories(
      userId: Int!
      startDate: DateTime
      endDate: DateTime
    ): [recentTopCategoriesResponse!]!
    getCategories(userId: Int!): String
  }
  type Mutation {
    registerNewUser(
      email: String!
      username: String!
      clerkId: String!
    ): MutationResponse!
    createTransactionRequest(
      type: String!
      date: DateTime
      category_id: Int!
      userId: Int!
      amount: Int!
      note: String
    ): createdTransaction
    updateTransactionRequest(
      userId: Int
      type: categoryType
      date: DateTime
      note: String
      amount: Int
      category_id: Int
    ): newTransaction
    deleteTransaction(id: Int!, userId: Int!): MutationResponse
    createNewCategory(
      name: String
      icon: String
      userId: Int
      type: categoryType
    ): newCategoryResponse
    deleteCategory(
      name: String
      icon: String
      userId: Int
      type: categoryType
    ): newCategoryResponse
    updateCategory(id: Int, userId: Int): newCategoryResponse
  }
  enum categoryType {
    income
    expense
  }
  type newCategoryResponse {
    id: Int
    name: String
    icon: String
    userId: Int
    type: categoryType
    isDefault: Boolean
  }

  type MutationResponse {
    success: Boolean!
  }

  type recentTopCategoriesResponse {
    category_id: Int
    category_name: String
    total: Int
    isDefault: Boolean
    icon: String
  }
  type newTransaction {
    type: String!
    date: DateTime
    category_id: String!
    id: Int!
    userId: String!
    amount: String!
    note: String
  }
  type createdTransaction {
    balance: Int
    createTransactionRequest: newTransaction
  }
  type dashboardSummaryReturn {
    balance: Balance!
    financials: MonthlyFinancialSummary
  }
  type Balance {
    balance: Int!
  }

  # type Query {
  #   recentExpenses(limit: Int = 20): [Expense!]!
  # }
  type MonthlyFinancialSummary {
    income: Int
    expense: Int
  }
`;
