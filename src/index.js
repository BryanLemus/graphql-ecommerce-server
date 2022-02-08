import express from "express";
import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { typeDefs } from "./typeDefs/index.js";
import { resolvers } from "./resolvers/index.js";

async function startApolloServer() {
  dotenv.config();

  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("☁ Database connection is ready");
    })
    .catch((e) => {
      console.error(`🔥 Failded connection: ${e}`, process.env.MONGODB_URI);
    });

  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth) {
        const token = auth.replace("Bearer ", "");
        if (token) {
          const { user } = jwt.verify(token, process.env.TOKEN_SECRET);
          return {
            ...req,
            user,
          };
        }
      }
    },
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(4000, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
}

startApolloServer().catch((error) => {
  console.error("🔥 Failed to initialize server:", error);
});
