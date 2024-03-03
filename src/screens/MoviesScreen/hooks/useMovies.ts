import * as React from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import dayjs from 'dayjs';
import { Movie } from '@types';
import { getDiscoverMovies } from 'modules/ApiRequest';

export default function useMovies() {
  const getUpcomingMovies = React.useCallback(
    async ({ pageParam = 1 }) =>
      await getDiscoverMovies({
        releaseDateGte: dayjs().format('YYYY-MM-DD'),
        releaseDateLte: dayjs().add(1, 'year').format('YYYY-MM-DD'),
        page: pageParam,
      }),
    [],
  );

  const { data, isPending, error, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['upcoming-movies'],
      queryFn: getUpcomingMovies,
      initialPageParam: 1,
      getNextPageParam: lastPage => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      // select: data => data.pages.flatMap(page => page.results),
    });

  const loadMore = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const refresh = React.useCallback(() => {
    refetch();
  }, [refetch]);

  const movies = React.useMemo(() => {
    return data?.pages.reduce<Movie[]>((allMovies, page) => {
      return allMovies.concat(page.results);
    }, []);
  }, [data]);

  return { movies, isPending, error, loadMore, hasNextPage, refresh };
}
