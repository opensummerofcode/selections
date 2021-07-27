import { useQuery } from 'urql';
import { queries } from 'common';

export default function useStudents() {
  const [{ data, fetching }] = useQuery({ query: queries.APPLICANT_LIST });

  return { isLoading: fetching, applicants: data ? data.applicants : null };
}
