import { createAPIUrl } from '@/utils';
import { TVSeries } from '@/../domain/tv-series';

const apiUrl = createAPIUrl();

export interface FindTvSeriesParams {
  [key: string]: string | number;
}

export async function findTvSeriesMatchingQuery(
  params: FindTvSeriesParams,
): Promise<TVSeries[]> {
  const url = new URL('/tv-series', apiUrl);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value.toString());
  }

  const request = await fetch(url);
  if (!request.ok) return [];

  return await request.json();
}

export async function getTvSeriesByIdQuery(
  id: string,
): Promise<TVSeries | undefined> {
  const url = new URL(`/tv-series/${id}`, apiUrl);

  const request = await fetch(url);
  if (!request.ok) return;

  return await request.json();
}

export async function getFeaturedTvSeriesQuery(): Promise<TVSeries[]> {
  const url = new URL('/tv-series/recommended', apiUrl);
  console.log(url);

  const request = await fetch(url);
  if (!request.ok) return [];

  return await request.json();
}

export async function getTopRatedTvSeriesQuery(): Promise<TVSeries[]> {
  const url = new URL('/tv-series', apiUrl);
  const request = await fetch(url);
  if (!request.ok) return [];

  const json: TVSeries[] = await request.json();

  // Top rated has to have a rating above 75%
  return json.filter((it) => it.rating > 75);
}
