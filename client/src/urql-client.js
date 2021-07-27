import { API_URL } from '@/constants';
import { cacheExchange } from '@urql/exchange-graphcache';
import {
  createClient,
  ssrExchange,
  dedupExchange,
  fetchExchange,
  subscriptionExchange
} from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

// Use a normalized cache
const cache = cacheExchange({});

const isServerSide = typeof window === 'undefined';
const ssrCache = ssrExchange({ isClient: !isServerSide });

const subscriptionClient = !isServerSide
  ? new SubscriptionClient(`ws${API_URL.replace(/^http?/, '')}/graphql`, {
      reconnect: true
    })
  : null;

const client = createClient({
  url: `${API_URL}/graphql`,
  exchanges: [
    dedupExchange,
    cache,
    fetchExchange,
    ssrCache,
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation)
    })
  ]
});

export { client, ssrCache };
