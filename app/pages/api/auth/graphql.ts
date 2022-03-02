import {ApolloServer} from 'apollo-server-micro';
import type {NextApiHandler} from 'next';
import withAuth from 'next-auth/middleware';
export type NextMiddleware = (handler: NextApiHandler) => NextApiHandler;

export const config = {
  api: {
    bodyParser: false,
  },
};

export const apolloServer = new ApolloServer({
  context(ctx) {
    console.log('send context ctx', ctx);
    return ctx;
  },
});

const apolloHandler = apolloServer.createHandler({
  path: process.env.STRAPI_URL + '/graphql',
});

export default withAuth(apolloHandler, {
  callbacks: {
    authorized: async ({req}) => {
      console.log('check auth for', req.page.name);
      return true;
    },
  },
});
