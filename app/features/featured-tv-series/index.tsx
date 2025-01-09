import { Poster } from '@/ui/poster';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { featuredTvSeries$ } from './state';
import { useAtom } from 'jotai';
import { loadable } from 'jotai/utils';
import { Rating } from '@/ui/rating';
import { TVSeries } from '@/../domain/tv-series';

export function FeaturedTvSeries(): JSX.Element {
  // Use loadable to handle the asynchronous nature of the atom
  const featuredTvSeriesLoadable = useAtom(loadable(featuredTvSeries$))[0];

  if (featuredTvSeriesLoadable.state === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (featuredTvSeriesLoadable.state === 'hasError') {
    return <Text>Error loading TV series.</Text>;
  }

  const featuredTvSeries = featuredTvSeriesLoadable.data;

  return (
    <View style={featuredTvSeriesStyles.root}>
      <Text style={featuredTvSeriesStyles.title}>Featured Tv Series</Text>
      <FlatList
        style={featuredTvSeriesStyles.list}
        horizontal
        data={featuredTvSeries}
        keyExtractor={(it) => it.id as string}
        renderItem={({ item }) => (
          <Entry
            title={item.title}
            rating={item.rating}
            seasons={item.seasons}
          />
        )}
      />
    </View>
  );
}

const featuredTvSeriesStyles = StyleSheet.create({
  root: {
    backgroundColor: 'pink',
  },
  title: {
    marginBottom: 20,
  },
  list: {
    backgroundColor: 'red',
  },
});

interface EntryProps {
  title: string;
  rating: number;
  seasons: TVSeries['seasons'];
}

function Entry({ title, rating, seasons }: EntryProps): JSX.Element {
  return (
    <View style={entryStyles.root}>
      <View style={entryStyles.overlay}>
        <Text style={entryStyles.text}>{title}</Text>
        <Rating style={entryStyles.text} value={rating} />
        <Text style={entryStyles.text}>seasons: {seasons.length}</Text>
      </View>
      <Poster
        title={title}
        styles={entryStyles.poster}
        src={
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/2560px-Image_created_with_a_mobile_phone.png'
        }
        onFavoritePress={() => console.log(`Favorite toggled for ${title}`)}
        isFavorite={false}
      />
    </View>
  );
}

const entryStyles = StyleSheet.create({
  root: {
    height: 200,
    aspectRatio: 1 / 2,
    backgroundColor: 'blue',
    borderWidth: 2,
    borderColor: 'yellow',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'black',
    zIndex: 1,
    width: '100%',
    height: '50%',
    bottom: 0,
    justifyContent: 'flex-start',
  },
  text: {
    color: 'white',
  },
  poster: {
    flex: 1,
    borderRadius: 8,
  },
});
