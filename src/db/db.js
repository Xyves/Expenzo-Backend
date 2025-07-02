import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema/index.js";
import dotenv from "dotenv";
dotenv.config();
let db = null;

export async function getDb() {
  if (db) return db;

  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  db = drizzle(connection, { schema, mode: "default" });

  return db;
}
