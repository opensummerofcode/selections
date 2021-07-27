import { useSubscription } from 'urql';
import { subscriptions } from 'common';

export default function useApplicantSubscription() {
  const [{ result, fetching }] = useSubscription({ query: subscriptions.APPLICANTS_CHANGED });

  console.log(result);
  return null;
}
