import * as transactions from "../db/transactions";
import * as user from "../db/users";
export function createContext() {
  return {
    db: {
      ...transactions,
      ...user,
    },
  };
}
