import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../apollo/schema';
import connectDb from '../../lib/mongoose';

const apolloServer = new ApolloServer({ schema });

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = apolloServer.createHandler({ path: '/api/graphql' });
export default connectDb(server);
