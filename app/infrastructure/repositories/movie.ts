import { createAPIUrl } from '@/utils';
import { Movie } from 'domain/movie';

const apiUrl = createAPIUrl();

export async function findMoviesMatchingQuery(
  signal: AbortSignal,
  params: Partial<Movie>,
): Promise<Movie[]> {
  const url = new URL('/movies', apiUrl);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value.toString());
  }

  const request = await fetch(url, { signal });
  if (!request.ok) return [];

  const json = (await request.json()) as Movie[];
  return json;
}

export async function getMovieByIdQuery(
  signal: AbortSignal,
  movieId: Movie['id'],
): Promise<Movie | undefined> {
  const url = new URL(`/movies/${movieId}`, apiUrl);

  const request = await fetch(url, { signal });
  if (!request.ok) return;

  return (await request.json()) as Movie;
}

// TODO: implement
export async function getFeaturedMoviesQuery(
  signal: AbortSignal,
): Promise<Movie[]> {
  return [];
}

export async function getTopRatedMoviesQuery(): Promise<Movie[]> {
  // TODO: implement on backend side
  try {
    const url = new URL('/movies', apiUrl);
    const request = await fetch(url);
    if (!request.ok) return [];

    const json = (await request.json()) as Movie[];

    // top rated has to have a rating above 75%
    return json.filter((it) => it.rating > 69);
  } catch (err) {
    console.error(err);
    return [];
  }
}
