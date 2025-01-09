import { Poster } from '@/ui/poster';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { movies$ } from './state';
import { useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';

type Props = {
  style?: any;
};

export function FeaturedMovies({ style }: Props): JSX.Element | null {
  const stateLoadable = useAtomValue(loadable(movies$));

  switch (stateLoadable.state) {
    case 'hasError':
    case 'loading': {
      return null;
    }

    case 'hasData': {
      return (
        <View style={[styles.root, style]}>
          <Text style={styles.title}>Featured Movies</Text>
          <ScrollView horizontal style={styles.list}>
            {stateLoadable.data.map((it, index) => (
              <Poster
                key={index}
                isFavorite
                title={it.title}
                onFavoritePress={undefined as any}
              />
            ))}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  root: {},

  title: {
    marginBottom: 20,
  },

  list: {},
});
