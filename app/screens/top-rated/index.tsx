import { List } from '@/ui/list';
import { useAtom } from 'jotai';
import { loadable } from 'jotai/utils';
import { useEffect, useState, type ReactNode } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { topRatedMovies$ } from './state';
import { TVSeries } from 'domain/tv-series';
import { getTopRatedTvSeriesQuery } from '@/infrastructure/repositories/tv-series';
import { Loader } from '@/ui/loader';

// Displays movies with rating above 75%
export default function TopRatedScreen(): ReactNode {
  const [topRatedMoviesLoadable] = useAtom(loadable(topRatedMovies$));

  const [tvSeres, set] = useState<TVSeries[]>([]);

  // fetches data for tv series
  useEffect(() => {
    getTopRatedTvSeriesQuery().then((res) => {
      set(res as TVSeries[]);
    });
  }, []);

  if (topRatedMoviesLoadable.state === 'loading') {
    return <Loader />;
  }

  // error
  if (topRatedMoviesLoadable.state === 'hasError') {
    return <Text>{JSON.stringify(topRatedMoviesLoadable.error)}</Text>;
  }

  if (topRatedMoviesLoadable.state === 'hasData') {
    return (
      <ScrollView style={styles.root}>
        {/* movies */}
        <Text style={styles.title}>Top rated movies</Text>
        <List data={topRatedMoviesLoadable.data} style={{ marginBottom: 40 }} />

        {/* tv series */}
        <Text style={styles.title}>Top rated tv series</Text>
        <List data={tvSeres} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },

  title: {
    marginBottom: 24,
  },
});
