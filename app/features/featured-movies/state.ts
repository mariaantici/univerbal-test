import { Atom, atom } from 'jotai';
import { Movie } from '../../../domain/movie';
import { getFeaturedMoviesQuery } from '@/infrastructure/repositories/movie';

export const movies$: Atom<Promise<Movie[]>> = atom(async (get, { signal }) => {
  return getFeaturedMoviesQuery(signal);
});
