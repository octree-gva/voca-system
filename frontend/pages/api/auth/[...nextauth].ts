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
      /**
       * Authorize a user to login.
       * Will save in session the bare minimum for UI purpose,
       * and in an encrypted cookie the essentials informations like the jwt.
       */
      async authorize(credentials) {
        const {STRAPI_URL: API_URL} = process.env;
        const STRAPI_TOKEN = process.env.STRAPI_TOKEN?.trim();
        if (!credentials) {
          console.log('credentials are required');
          return null;
        }

        try {
          // Login in strapi, with our machine-to-machine token.
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
    async jwt(props) {
      // Set the token, accessible from NextAPIHandlers only.
      // @see next-auth/jwt/getToken()
      const {token, user} = props;
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({session}) {
      // Send properties to the client.
      // The client doesn't need any token, as he will pass through our APIs first.
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error', // Error code passed in query string as ?error=
  },
});
