import { atom } from 'jotai';
import { TVSeries } from '../../../domain/tv-series';
import { getFeaturedTvSeriesQuery } from '@/infrastructure/repositories/tv-series';

export const featuredTvSeries$ = atom(
  async (_, { signal }): Promise<TVSeries[]> => {
    const response = await getFeaturedTvSeriesQuery();
    return response;
  },
);
