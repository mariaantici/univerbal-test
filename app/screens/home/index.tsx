import { FeaturedMovies } from '@/features/featured-movies';
import { FeaturedTvSeries } from '@/features/featured-tv-series';
import { Search } from '@/features/search';
import { Suspense, type ReactNode } from 'react';
import { View } from 'react-native';

export default function HomeScreen(): ReactNode {
  return (
    <View style={{ backgroundColor: 'gray' }}>
      <View style={{ marginBottom: 40 }}>
        <Search />
      </View>

      <FeaturedMovies style={{ marginBottom: 40 }} />
      {/* <FeaturedTvSeries /> */}
    </View>
  );
}
