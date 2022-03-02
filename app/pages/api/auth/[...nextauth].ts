import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios, {AxiosError} from 'axios';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: {label: 'Email', type: 'text'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        const API_URL = process.env.STRAPI_URL;
        const STRAPI_TOKEN = process.env.STRAPI_TOKEN?.trim();
        if (!credentials) {
          console.log('credentials are null');
          return null;
        }
        console.log(
          `${API_URL}/api/auth/local`,
          credentials.identifier,
          credentials.password
        );
        try {
          const {data: userData} = await axios.post(
            `${API_URL}/api/auth/local`,
            {
              identifier: credentials.identifier,
              password: credentials.password,
            },
            {
              headers: {
                Authorization: 'Bearer ' + STRAPI_TOKEN,
              },
            }
          );
          if (!!userData?.user?.blocked) return null;
          return {
            sub: userData.user.id,
            name: userData.user.username,
            email: userData.user.email,
            image: null,
            accessToken: userData.jwt,
          };
        } catch (err) {
          if (!!err && !!(err as any)?.isAxiosError) {
            const axiosError = err as AxiosError;
            console.error('POST api/auth/local fails: ', axiosError.toJSON());
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.id = account.id;
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session({session, token}) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error', // Error code passed in query string as ?error=
  },
});
