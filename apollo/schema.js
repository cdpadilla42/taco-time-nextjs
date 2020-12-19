import { makeExecutableSchema } from 'graphql-tools';
// import { typeDefs } from './type-defs'
import { resolvers } from './resolvers';
import { mergeTypeDefs } from 'graphql-tools';
import User from './User.graphql';

// const typeDefs = mergeTypeDefs([User]);

export const schema = makeExecutableSchema({
  typeDefs: User,
  resolvers,
});
