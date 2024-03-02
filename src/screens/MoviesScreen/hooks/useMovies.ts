import * as React from 'react';

import { getDiscoverMovies } from '../../../modules/ApiRequest';
import { useQuery } from '@tanstack/react-query';

import dayjs from 'dayjs';

export default function useMovies() {
  const getUpcomingMovies = React.useCallback(
    async () =>
      await getDiscoverMovies({
        releaseDateGte: dayjs().format('YYYY-MM-DD'),
        releaseDateLte: dayjs().add(1, 'year').format('YYYY-MM-DD'),
      }),
    [],
  );

  const { data, isPending, error } = useQuery({
    queryKey: ['upcoming-movies'],
    queryFn: getUpcomingMovies,
  });

  const movies = data?.results ?? [];

  return { movies, isPending, error };
}
