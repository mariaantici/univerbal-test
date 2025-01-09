import { Opaque } from './utils';

type Episode = {
  episodeId: Opaque<'episode-id'>;
  seasonId: Opaque<'season-id'>;
  title: string;
  runtimeMinutes: number;
};

type Season = {
  seasonId: number;
  releaseYear: number;
  episodes: Episode[];
};

export type TVSeries = {
  id: Opaque<'tv-series-id'>;
  title: string;
  creator: string;
  releaseYear: number;
  genres: string[];
  rating: number;
  seasons: Season[];
};
