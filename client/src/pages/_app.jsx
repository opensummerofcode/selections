import Head from 'next/head';
import Header from '@/components/Header';
import { Provider } from 'urql';
import { client } from '../urql-client';
import 'normalize.css';
import '@/assets/styles/index.css';

export default function App({ Component, pageProps }) {
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
