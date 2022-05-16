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
        if (!credentials) {
          console.log('credentials are required');
          return null;
        }

        try {
          // Login in strapi
          const {data: userData} = await axios.post(
            `${API_URL}/api/auth/local`,
            {
              identifier: credentials.identifier,
              password: credentials.password,
            }
          );
          if (!!userData?.user?.blocked) return null;
          // Fetch the me endpoint (role and accountAdministrators are not fetched)
          const {data: userMe} = await axios.get(`${API_URL}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${userData.jwt}`,
            },
          });

          return {
            sub: userData.user.id,
            id: userData.user.id,
            name: userData.user.username,
            email: userData.user.email,
            role: userMe.role?.type,
            administratorAccounts: (userMe.administratorAccounts || []).map(
              ({id, title}: {id: number; title: string}) => ({
                id,
                title,
              })
            ),
            image: null,
            accessToken: userData.jwt,
          };
        } catch (err) {
          if (!!err && !!(err as any)?.isAxiosError) {
            const axiosError = err as AxiosError;
            console.error('POST api/auth/local fails: ', axiosError.message);
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
        token.role = user.role;
        token.administratorAccounts = JSON.stringify(
          user.administratorAccounts
        );
      }
      return token;
    },
    async session({session, token}) {
      // Send properties to the client.
      // The client doesn't need any token, as he will pass through our APIs first.
      if (token && session?.user) {
        session.user = {
          ...session.user,
          role: '' + token.role,
          administratorAccounts: JSON.parse(
            '' + token.administratorAccounts
          ) as any,
          id: '' + token.id,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error', // Error code passed in query string as ?error=
  },
});
