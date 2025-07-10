import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getDb } from "./db/db.js";
import { resolvers } from "./graphql/resolvers.js";
import { typeDefs } from "./graphql/typeDefs/user.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import dotenv from "dotenv";
// dotenv.config({
//   path: `.env.${process.env.NODE_ENV || "development"}`,
// });
async function startApolloServer() {
  try {
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    const server = new ApolloServer({ schema });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async ({ req }) => {
        const db = await getDb();
        return { db };
      },
    });

    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error("Failed to start Apollo Server:", error);
  }
}

startApolloServer();
// context: async ({ req }) => {
//   const authHeader = req.headers.authorization || "";
//   const token = authHeader.replace("Bearer ", "");

//   let user = null;

//   if (token) {
//     try {
//       const session = await Clerk.sessions.verifySessionToken(token);
//       user = await Clerk.users.getUser(session.userId);
//       console.log(user);
//     } catch (err) {
//       console.warn("Clerk auth error:", err.message);
//     }
//   }
//   return user;
// },
