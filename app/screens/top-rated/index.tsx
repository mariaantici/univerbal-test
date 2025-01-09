import { List } from '@/ui/list';
import { useAtom } from 'jotai';
import { loadable } from 'jotai/utils';
import { useEffect, useState, type ReactNode } from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import { topRatedMovies$ } from './state';
import { TVSeries } from 'domain/tv-series';
import { getTopRatedTvSeriesQuery } from '@/infrastructure/repositories/tv-series';
import { Loader } from '@/ui/loader';
import { Movie } from 'domain/movie';

// Combined data item type
type CombinedDataItem =
  | { key: string; type: 'header'; title: string }
  | { key: string; type: 'movie'; data: Movie }
  | { key: string; type: 'tv-series'; data: TVSeries };

// Displays movies with rating above 75%
export default function TopRatedScreen(): ReactNode {
  const [topRatedMoviesLoadable] = useAtom(loadable(topRatedMovies$));
  const [tvSeries, setTvSeries] = useState<TVSeries[]>([]);

  // Fetches data for TV series
  useEffect(() => {
    getTopRatedTvSeriesQuery().then((res) => {
      setTvSeries(res as TVSeries[]);
    });
  }, []);

  if (topRatedMoviesLoadable.state === 'loading') {
    return <Loader />;
  }

  if (topRatedMoviesLoadable.state === 'hasError') {
    return <Text>{JSON.stringify(topRatedMoviesLoadable.error)}</Text>;
  }

  if (topRatedMoviesLoadable.state === 'hasData') {
    // Filter movies with ratings >= 75
    const filteredMovies = topRatedMoviesLoadable.data.filter(
      (movie) => movie.rating >= 75,
    );

    // Filter TV series with ratings >= 75
    const filteredTvSeries = tvSeries.filter((series) => series.rating >= 75);

    const combinedData: CombinedDataItem[] = [
      { key: 'movies-header', type: 'header', title: 'Top rated movies' },
      ...filteredMovies.map((movie, index) => ({
        key: `movie-${index}`,
        type: 'movie' as const,
        data: movie,
      })),
      { key: 'tv-header', type: 'header', title: 'Top rated TV series' },
      ...filteredTvSeries.map((series, index) => ({
        key: `tv-${index}`,
        type: 'tv-series' as const,
        data: series,
      })),
    ];

    return (
      <FlatList
        data={combinedData}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          if (item.type === 'header') {
            return (
              <View style={styles.header}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            );
          }

          if (item.type === 'movie' || item.type === 'tv-series') {
            return <List data={[item.data]} />;
          }

          return null;
        }}
        contentContainerStyle={styles.root}
      />
    );
  }

  return null;
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
