import Head from 'next/head';
import Header from '@/components/Header';
import { useAuth } from '@/services';
import { API_URL } from '@/constants';
import { Provider, Client, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';

import 'normalize.css';
import '@/assets/styles/index.css';

// Use a normalized cache
const cache = cacheExchange({});

const client = new Client({
  url: `${API_URL}/graphql`,
  exchanges: [dedupExchange, cache, fetchExchange]
});

export default function App({ Component, pageProps }) {
  const { isLoading } = useAuth();

  if (isLoading) return <p />;

  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Selections | Open Summer of Code</title>
      </Head>
      <Provider value={client}>
        <Header />
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </>
  );
}
