import { createAPIUrl } from '@/utils';

const apiUrl = createAPIUrl();

export async function findTvSeriesMatchingQuery(params) {
  const url = new URL('/tv-series', apiUrl);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value.toString());
  }

  const request = await fetch(url);
  if (!request.ok) return [];

  return await request.json();
}

export async function getTvSeriesByIdQuery(id) {
  const url = new URL(`/tv-series/${id}`, apiUrl);

  const request = await fetch(url);
  if (!request.ok) return;

  return await request.json();
}

export async function getFeaturedTvSeriesQuery() {
  const url = new URL('/tv-series/recommended', apiUrl);
  console.log(url);

  const request = await fetch(url);
  if (!request.ok) return [];

  return await request.json();
}

export async function getTopRatedTvSeriesQuery() {
  // TODO: implement on backend side
  const url = new URL('/tv-series', apiUrl);
  const request = await fetch(url);
  if (!request.ok) return [];

  const json = await request.json();

  // top rated has to have a rating above 75%
  return json.filter((it) => it.rating > 60);
}
