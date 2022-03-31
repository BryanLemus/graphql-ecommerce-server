import express from "express";
import { ApolloServer } from "apollo-server-express";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { typeDefs, resolvers } from "./graphql/schema.js";

async function startApolloServer() {
  config();

  await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((e) => {
      throw new Error(e);
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
