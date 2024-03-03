import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from 'modules/ApiRequest';

interface UseMovieParams {
  id: number;
}

export default function useMovie({ id }: UseMovieParams) {
  const getMovie = React.useCallback(() => getMovieDetails({ id }), [id]);

  const { data, isPending } = useQuery({
    queryKey: ['movie', id],
    queryFn: getMovie,
  });

  return {
    movie: data,
    isPending,
  };
}
