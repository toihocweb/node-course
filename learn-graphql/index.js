import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import fs from 'fs';
import { resolvers } from './resolvers.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { jwtAuth } from './middleware/jwtAuth.js';
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarsResolvers,
} from 'graphql-scalars';

const app = express();

app.use(cors(), express.json(), jwtAuth);

const typeDefs = fs.readFileSync('./schema.graphql', 'utf8');

const server = new ApolloServer({
  typeDefs: [...scalarTypeDefs, typeDefs],
  resolvers: {
    ...scalarsResolvers,
    ...resolvers,
  },
});

await server.start();

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: ({ req }) => {
      return {
        user: req.user,
      };
    },
  }),
);

await mongoose.connect('mongodb://localhost:27017/todo-graphql');
console.log('✅ mongodb connected successfully!');

app.listen(8000, () => {
  console.log(`🚀 Server ready at http://localhost:8000/graphql`);
});
