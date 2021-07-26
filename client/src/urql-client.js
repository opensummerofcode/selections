import { API_URL } from '@/constants';
import { cacheExchange } from '@urql/exchange-graphcache';
import { createClient, ssrExchange, dedupExchange, fetchExchange } from 'urql';

// Use a normalized cache
const cache = cacheExchange({});

const isServerSide = typeof window === 'undefined';
const ssrCache = ssrExchange({ isClient: !isServerSide });
const client = createClient({
  url: `${API_URL}/graphql`,
  exchanges: [dedupExchange, cache, fetchExchange, ssrCache]
});

export { client, ssrCache };
