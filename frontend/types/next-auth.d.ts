import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      username: string;
      role: string;
      administratorAccounts: Array<{id: number; title: string}>;
      id: string;
    };
  }
}
