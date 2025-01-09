import { getTopRatedMoviesQuery } from '@/infrastructure/repositories/movie';
import { Movie } from 'domain/movie';
import { atom } from 'jotai';

export const topRatedMovies$ = atom(async (): Promise<Movie[]> => {
  return await getTopRatedMoviesQuery();
});
