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
    const filteredMovies = topRatedMoviesLoadable.data
      .filter((movie) => movie.rating >= 75)
      .map((movie) => ({
        ...movie,
        title: movie.title.trim(),
        rating: Math.round(movie.rating),
      }));

    const filteredTvSeries = tvSeries
      .filter((series) => series.rating >= 75)
      .map((series) => ({
        ...series,
        title: series.title.trim(),
        rating: Math.round(series.rating),
      }));

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
            const displayGenres = item.data.genres.join(', ');
            return (
              <View style={styles.item}>
                <Text style={styles.itemTitle}>{item.data.title}</Text>
                <Text style={styles.itemGenres}>{displayGenres}</Text>
                <Text style={styles.itemRating}>
                  Rating: {item.data.rating}
                </Text>
              </View>
            );
          }

          return null;
        }}
        contentContainerStyle={styles.root}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  item: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemGenres: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  itemRating: {
    fontSize: 14,
    fontWeight: '600',
  },
  separator: {
    height: 8,
  },
});
