import React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../utils/createEmotionCache';
import Toasts from '../components/Toasts';
import '../utils/i18n';
import {SessionProvider} from 'next-auth/react';
import {Session} from 'next-auth';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface VocaCityAppProps extends AppProps {
  emotionCache?: EmotionCache;
  session: Session | null;
}
const apolloClient = new ApolloClient({
  uri: `${process.env.STRAPI_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default function VocaCityApp(props: VocaCityAppProps) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>My page</title>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
            <Toasts />
          </ThemeProvider>
        </CacheProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
