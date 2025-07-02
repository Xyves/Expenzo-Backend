import { getDb } from "./db/db.js"; // or wherever your getDb() is
import { users } from "./db/schema/users.js"; // your table

async function testDrizzle() {
  try {
    const db = await getDb();
    const result = await db.select().from(users).limit(1);
    console.log("✅ Drizzle connection works:", result);
  } catch (err) {
    console.error("❌ Drizzle DB failed:", err.message);
  }
}

testDrizzle();
